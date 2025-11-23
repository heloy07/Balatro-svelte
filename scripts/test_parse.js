import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDir = path.join(__dirname, '../static');

// Generic Parser
function processAssetType(config) {
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
    items.forEach(item => {
        console.log(`ID: ${item.id}, Name: "${item.name}"`);
    });
}

// Configurations
const configs = [
    {
        name: 'Spectral',
        htmlFile: 'spectral.html',
        regex: /<tr[^>]*>\s*<td>[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<\/td>\s*<td[^>]*>[\s\S]*?<a[^>]+>([\s\S]*?)<\/a><\/td>\s*<td>([\s\S]*?)<\/td>/g,
        parseMatch: (match) => {
            const [_, imgUrl, nameHtml, descHtml] = match;
            const name = nameHtml.replace(/<[^>]+>/g, '').trim();
            const id = 'c_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            return { id, name };
        }
    }
];

(async () => {
    for (const config of configs) {
        processAssetType(config);
    }
})();
