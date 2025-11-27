export interface Tag {
    id: string;
    name: string;
    description: string;
    effect: string;
    minAnte: number; // Minimum ante this tag can appear (1 = Ante 1, 2 = Ante 2+)
    spriteIndex: number; // Position in tags.png sprite sheet
}

// Tags sprite sheet is 408x340 pixels
// 6 columns x 4 rows = 24 tags (ignoring row 5 with question mark)
// Each tag is 68x68 pixels
// Sprite order (left to right, top to bottom):
// Row 0: Uncommon, Rare, Negative, Foil, Coupon, Double
// Row 1: Holographic, Polychrome, Investment, Voucher, Top-up, Juggle
// Row 2: Boss, Standard, Charm, Meteor, Buffoon, Orbital
// Row 3: Speed, Handy, Garbage, Ethereal, Economy, D6

export const TAGS: Tag[] = [
    // Row 0 (indices 0-5)
    {
        id: 'tag_uncommon',
        name: 'Uncommon Tag',
        description: 'Shop has a free Uncommon Joker',
        effect: 'The next shop will have a free Uncommon Joker.',
        minAnte: 1,
        spriteIndex: 0
    },
    {
        id: 'tag_rare',
        name: 'Rare Tag',
        description: 'Shop has a free Rare Joker',
        effect: 'The next shop will have a free Rare Joker.',
        minAnte: 1,
        spriteIndex: 1
    },
    {
        id: 'tag_negative',
        name: 'Negative Tag',
        description: 'Next Joker becomes Negative and free',
        effect: 'Next base edition shop Joker is free and becomes Negative.',
        minAnte: 2,
        spriteIndex: 2
    },
    {
        id: 'tag_foil',
        name: 'Foil Tag',
        description: 'Next Joker becomes Foil and free',
        effect: 'Next base edition shop Joker is free and becomes Foil.',
        minAnte: 1,
        spriteIndex: 3
    },
    {
        id: 'tag_coupon',
        name: 'Coupon Tag',
        description: 'Initial shop items are free',
        effect: 'Initial cards and Booster Packs in next shop are free.',
        minAnte: 1,
        spriteIndex: 4
    },
    {
        id: 'tag_double',
        name: 'Double Tag',
        description: 'Copies next Tag selected',
        effect: 'Gives a copy of the next selected Tag.',
        minAnte: 1,
        spriteIndex: 5
    },
    // Row 1 (indices 6-11)
    {
        id: 'tag_holo',
        name: 'Holographic Tag',
        description: 'Next Joker becomes Holographic and free',
        effect: 'Next base edition shop Joker is free and becomes Holographic.',
        minAnte: 1,
        spriteIndex: 6
    },
    {
        id: 'tag_polychrome',
        name: 'Polychrome Tag',
        description: 'Next Joker becomes Polychrome and free',
        effect: 'Next base edition shop Joker is free and becomes Polychrome.',
        minAnte: 1,
        spriteIndex: 7
    },
    {
        id: 'tag_investment',
        name: 'Investment Tag',
        description: 'Gain $25 after Boss Blind',
        effect: 'After defeating the Boss Blind, gain $25.',
        minAnte: 1,
        spriteIndex: 8
    },
    {
        id: 'tag_voucher',
        name: 'Voucher Tag',
        description: 'Adds a Voucher to next shop',
        effect: 'Adds one Voucher to the next shop.',
        minAnte: 1,
        spriteIndex: 9
    },
    {
        id: 'tag_topup',
        name: 'Top-up Tag',
        description: 'Create up to 2 Common Jokers',
        effect: 'Creates up to 2 Common Jokers (must have room).',
        minAnte: 2,
        spriteIndex: 10
    },
    {
        id: 'tag_juggle',
        name: 'Juggle Tag',
        description: '+3 Hand Size next round',
        effect: '+3 hand size next round.',
        minAnte: 1,
        spriteIndex: 11
    },
    // Row 2 (indices 12-17)
    {
        id: 'tag_boss',
        name: 'Boss Tag',
        description: 'Re-rolls the Boss Blind',
        effect: 'Rerolls the Boss Blind.',
        minAnte: 1,
        spriteIndex: 12
    },
    {
        id: 'tag_standard',
        name: 'Standard Tag',
        description: 'Free Mega Standard Pack',
        effect: 'Gives a free Mega Standard Pack.',
        minAnte: 2,
        spriteIndex: 13
    },
    {
        id: 'tag_charm',
        name: 'Charm Tag',
        description: 'Free Mega Arcana Pack',
        effect: 'Gives a free Mega Arcana Pack.',
        minAnte: 1,
        spriteIndex: 14
    },
    {
        id: 'tag_meteor',
        name: 'Meteor Tag',
        description: 'Free Mega Celestial Pack',
        effect: 'Gives a free Mega Celestial Pack.',
        minAnte: 2,
        spriteIndex: 15
    },
    {
        id: 'tag_buffoon',
        name: 'Buffoon Tag',
        description: 'Free Mega Buffoon Pack',
        effect: 'Gives a free Mega Buffoon Pack.',
        minAnte: 2,
        spriteIndex: 16
    },
    {
        id: 'tag_orbital',
        name: 'Orbital Tag',
        description: 'Upgrade a poker hand by 3 levels',
        effect: 'Upgrade a poker hand by 3 levels.',
        minAnte: 2,
        spriteIndex: 17
    },
    // Row 3 (indices 18-23)
    {
        id: 'tag_speed',
        name: 'Speed Tag',
        description: '$5 per Blind skipped this run',
        effect: 'Gives $5 per skipped Blind this run.',
        minAnte: 1,
        spriteIndex: 18
    },
    {
        id: 'tag_handy',
        name: 'Handy Tag',
        description: '$1 per hand played this run',
        effect: 'Gives $1 for every hand played this run.',
        minAnte: 2,
        spriteIndex: 19
    },
    {
        id: 'tag_garbage',
        name: 'Garbage Tag',
        description: '$1 per unused discard this run',
        effect: 'Gives $1 for every unused discard this run.',
        minAnte: 2,
        spriteIndex: 20
    },
    {
        id: 'tag_ethereal',
        name: 'Ethereal Tag',
        description: 'Free Spectral Pack',
        effect: 'Gives a free Spectral Pack.',
        minAnte: 2,
        spriteIndex: 21
    },
    {
        id: 'tag_economy',
        name: 'Economy Tag',
        description: 'Double your money (max +$40)',
        effect: 'Doubles your money (up to $40).',
        minAnte: 1,
        spriteIndex: 22
    },
    {
        id: 'tag_d6',
        name: 'D6 Tag',
        description: 'Next shop rerolls start at $0',
        effect: 'Rerolls in next shop start at $0.',
        minAnte: 1,
        spriteIndex: 23
    }
];

// Get tags available for a given ante
export function getAvailableTags(ante: number): Tag[] {
    return TAGS.filter(tag => tag.minAnte <= ante);
}

// Get a random tag for skipping a blind
export function getRandomTag(ante: number): Tag {
    const available = getAvailableTags(ante);
    return available[Math.floor(Math.random() * available.length)];
}
