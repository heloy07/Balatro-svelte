import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDir = path.join(__dirname, '../static');
const imagesDir = path.join(staticDir, 'images');
const storesDir = path.join(__dirname, '../src/lib/stores');

// Ensure directories exist
['jokers', 'tarots', 'planets', 'spectral', 'vouchers', 'boosterpacks'].forEach(dir => {
    const p = path.join(imagesDir, dir);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Helper to download image
async function downloadImage(url, localPath) {
    if (url.startsWith('/')) url = 'https://balatrowiki.org' + url;
    
    console.log(`Downloading ${url} to ${localPath}`);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(localPath);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        
        const request = https.get(url, options, response => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(localPath, () => {}); // Delete partial file
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
            file.on('error', (err) => {
                console.error(`File write error for ${localPath}:`, err);
                file.close();
                fs.unlink(localPath, () => {});
                reject(err);
            });
        }).on('error', err => {
            console.error(`Request error for ${url}:`, err);
            file.close();
            fs.unlink(localPath, () => {});
            reject(err);
        });
        
        request.end();
    });
}

// Generic Parser
async function processAssetType(config) {
    console.log(`Processing ${config.name}...`);
    const htmlPath = path.join(staticDir, config.htmlFile);
    if (!fs.existsSync(htmlPath)) {
        console.error(`File not found: ${htmlPath}`);
        return;
    }
    
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const items = [];
    let match;
    
    while ((match = config.regex.exec(html)) !== null) {
        const item = config.parseMatch(match);
        if (item) {
            if (Array.isArray(item)) {
                items.push(...item);
            } else {
                items.push(item);
            }
        }
    }
    
    console.log(`Found ${items.length} ${config.name}.`);
    
    // Download images
    for (const item of items) {
        if (item.imgUrl) {
            const imgExt = path.extname(item.imgUrl.split('?')[0]) || '.png';
            const imgFilename = `${item.id}${imgExt}`;
            const localImgPath = path.join(imagesDir, config.imgSubDir, imgFilename);
            item.image = `/images/${config.imgSubDir}/${imgFilename}`;
            
            console.log(`Parsed item: ID=${item.id}, Name="${item.name}", ImgFile=${imgFilename}`);

            if (!fs.existsSync(localImgPath)) {
                try {
                    await downloadImage(item.imgUrl, localImgPath);
                } catch (e) {
                    console.error(`Failed to download ${item.name}: ${e.message}`);
                }
            }
        }
    }
    
    // Generate TS
    const tsContent = config.generateTS(items);
    fs.writeFileSync(path.join(storesDir, config.tsFile), tsContent);
    console.log(`Generated ${config.tsFile}`);
}

// Configurations
const configs = [
    {
        name: 'Jokers',
        htmlFile: 'joikers.html',
        imgSubDir: 'jokers',
        tsFile: 'jokers_data.ts',
        regex: /<tr>\s*<td>\d+\s*<\/td>\s*<td>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<a[^>]+>([^<]+)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td><span[^>]*>(\$?\d+)<\/span>\s*<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/g,
        parseMatch: (match) => {
            const [_, imgUrl, nameRaw, descHtml, costStr, rarityHtml] = match;
            const name = nameRaw.trim();
            const id = 'j_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const cost = parseInt(costStr.replace('$', ''));
            const description = descHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            let rarity = 'Common';
            if (rarityHtml.includes('Uncommon')) rarity = 'Uncommon';
            if (rarityHtml.includes('Rare')) rarity = 'Rare';
            if (rarityHtml.includes('Legendary')) rarity = 'Legendary';
            
            return { id, name, description, rarity, cost, imgUrl };
        },
        generateTS: (items) => `import type { Joker } from '../types';

export const IMPORTED_JOKERS: Joker[] = [
${items.map(j => `    {
        id: '${j.id}',
        name: "${j.name}",
        description: "${j.description.replace(/"/g, '\\"')}",
        rarity: '${j.rarity}',
        cost: ${j.cost},
        image: '${j.image}',
        effect: () => { /* TODO: Implement ${j.name} */ }
    },`).join('\n')}
];`
    },
    {
        name: 'Tarots',
        htmlFile: 'tarots.html',
        imgSubDir: 'tarots',
        tsFile: 'tarots_data.ts',
        regex: /<tr[^>]*>\s*<td>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<\/td>\s*<td[^>]*>[\s\S]*?<a[^>]+>([\s\S]*?)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>/g,
        parseMatch: (match) => {
            const [_, imgUrl, nameHtml, descHtml] = match;
            const name = nameHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            const id = 'c_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const description = descHtml.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            return { id, name, description, type: 'Tarot', imgUrl };
        },
        generateTS: (items) => `import type { Consumable } from '../types';

export const IMPORTED_TAROTS: Consumable[] = [
${items.map(i => `    {
        id: '${i.id}',
        name: "${i.name}",
        description: "${i.description.replace(/"/g, '\\"')}",
        type: 'Tarot',
        image: '${i.image}',
        effect: () => { /* TODO: Implement ${i.name} */ }
    },`).join('\n')}
];`
    },
    {
        name: 'Planets',
        htmlFile: 'planets.html',
        imgSubDir: 'planets',
        tsFile: 'planets_data.ts',
        regex: /<tr[^>]*>\s*<td>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<\/td>\s*<td[^>]*>[\s\S]*?<a[^>]+>([\s\S]*?)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>/g,
        parseMatch: (match) => {
            const [_, imgUrl, nameHtml, descHtml] = match;
            const name = nameHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            const id = 'c_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const description = descHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            return { id, name, description, type: 'Planet', imgUrl };
        },
        generateTS: (items) => `import type { Consumable } from '../types';

export const IMPORTED_PLANETS: Consumable[] = [
${items.map(i => `    {
        id: '${i.id}',
        name: "${i.name}",
        description: "${i.description.replace(/"/g, '\\"')}",
        type: 'Planet',
        image: '${i.image}',
        effect: () => { /* TODO: Implement ${i.name} */ }
    },`).join('\n')}
];`
    },
    {
        name: 'Spectral',
        htmlFile: 'spectral.html',
        imgSubDir: 'spectral',
        tsFile: 'spectral_data.ts',
        regex: /<tr[^>]*>\s*<td>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<\/td>\s*<td[^>]*>[\s\S]*?<a[^>]+>([\s\S]*?)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>/g,
        parseMatch: (match) => {
            const [_, imgUrl, nameHtml, descHtml] = match;
            const name = nameHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            const id = 'c_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const description = descHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            return { id, name, description, type: 'Spectral', imgUrl };
        },
        generateTS: (items) => `import type { Consumable } from '../types';

export const IMPORTED_SPECTRAL: Consumable[] = [
${items.map(i => `    {
        id: '${i.id}',
        name: "${i.name}",
        description: "${i.description.replace(/"/g, '\\"')}",
        type: 'Spectral',
        image: '${i.image}',
        effect: () => { /* TODO: Implement ${i.name} */ }
    },`).join('\n')}
];`
    },
    {
        name: 'Vouchers',
        htmlFile: 'vouchers.html',
        imgSubDir: 'vouchers',
        tsFile: 'vouchers_data.ts',
        // <tr>...<td>...<img src="(URL1)">...<a ...>(NAME1)</a>...</td>...<td>(DESC1)</td>...<td>...<img src="(URL2)">...<a ...>(NAME2)</a>...</td>...<td>(DESC2)</td>...</tr>
        regex: /<tr>\s*<td[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<a[^>]+>([^<]+)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<a[^>]+>([^<]+)<\/a>\s*<\/td>\s*<td>([\s\S]*?)<\/td>/g,
        parseMatch: (match) => {
            const [_, imgUrl1, name1, desc1, imgUrl2, name2, desc2] = match;
            
            const v1 = {
                id: 'v_' + name1.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                name: name1.replace(/\s+/g, ' ').trim(),
                description: desc1.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
                cost: 10,
                imgUrl: imgUrl1
            };
            
            const v2 = {
                id: 'v_' + name2.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                name: name2.replace(/\s+/g, ' ').trim(),
                description: desc2.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
                cost: 10,
                imgUrl: imgUrl2
            };
            
            return [v1, v2];
        },
        generateTS: (items) => `import type { Voucher } from '../types';

export const IMPORTED_VOUCHERS: Voucher[] = [
${items.map(v => `    {
        id: '${v.id}',
        name: "${v.name}",
        description: "${v.description.replace(/"/g, '\\"')}",
        cost: ${v.cost},
        image: '${v.image}',
        effect: () => { /* TODO: Implement ${v.name} */ }
    },`).join('\n')}
];`
    },
    {
        name: 'Booster Packs',
        htmlFile: 'boosterpacks.html',
        imgSubDir: 'boosterpacks',
        tsFile: 'boosterpacks_data.ts',
        // <tr>...<img src="(URL)">...</td>...<td>...($COST)...</td>...<td>(SIZE)</td>...<td>(DESC)</td>...</tr>
        // Note: Some packs have multiple images, we'll just take the first one for now
        regex: /<tr>\s*<td[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<\/td>\s*<td>[\s\S]*?\$(\d+)[\s\S]*?<\/td>\s*<td>([^<]+)<\/td>\s*<td>([\s\S]*?)<\/td>/g,
        parseMatch: (match) => {
            const [_, imgUrl, cost, size, descHtml] = match;
            // Infer type from description or surrounding context (harder with regex)
            // But we can guess from the image URL or description
            let type = 'Standard';
            if (imgUrl.includes('Arcana')) type = 'Arcana';
            if (imgUrl.includes('Celestial')) type = 'Celestial';
            if (imgUrl.includes('Buffoon')) type = 'Buffoon';
            if (imgUrl.includes('Spectral')) type = 'Spectral';
            if (imgUrl.includes('Standard')) type = 'Standard';

            const name = `${type} Pack`; // Simplified name
            const id = `p_${type.toLowerCase()}_${size.trim().toLowerCase()}`;
            const description = descHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            
            return { id, name: `${size.trim()} ${name}`, description, cost: parseInt(cost), type, imgUrl };
        },
        generateTS: (items) => `import type { Pack } from '../types';

export const IMPORTED_PACKS: Pack[] = [
${items.map(p => `    {
        id: '${p.id}',
        name: "${p.name}",
        description: "${p.description.replace(/"/g, '\\"')}",
        cost: ${p.cost},
        type: '${p.type}',
        image: '${p.image}',
        effect: () => { /* TODO: Implement ${p.name} */ }
    },`).join('\n')}
];`
    }
];

(async () => {
    for (const config of configs) {
        await processAssetType(config);
    }
})();
