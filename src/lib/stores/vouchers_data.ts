import type { Voucher } from '../types';

export const IMPORTED_VOUCHERS: Voucher[] = [
    {
        id: 'v_overstock',
        name: "Overstock",
        description: "+1 card slot available in shop (to 3 slots)",
        cost: 10,
        image: '/images/vouchers/v_overstock.png',
        effect: () => { /* TODO: Implement Overstock */ }
    },
    {
        id: 'v_overstock_plus',
        name: "Overstock Plus",
        description: "+1 card slot available in shop (to 4 slots)",
        cost: 10,
        image: '/images/vouchers/v_overstock_plus.png',
        effect: () => { /* TODO: Implement Overstock Plus */ }
    },
    {
        id: 'v_clearance_sale',
        name: "Clearance Sale",
        description: "All cards and packs in shop are 25% off",
        cost: 10,
        image: '/images/vouchers/v_clearance_sale.png',
        effect: () => { /* TODO: Implement Clearance Sale */ }
    },
    {
        id: 'v_liquidation',
        name: "Liquidation",
        description: "All cards and packs in shop are 50% off",
        cost: 10,
        image: '/images/vouchers/v_liquidation.png',
        effect: () => { /* TODO: Implement Liquidation */ }
    },
    {
        id: 'v_hone',
        name: "Hone",
        description: "Foil, Holographic, and Polychrome cards appear 2X more often",
        cost: 10,
        image: '/images/vouchers/v_hone.png',
        effect: () => { /* TODO: Implement Hone */ }
    },
    {
        id: 'v_glow_up',
        name: "Glow Up",
        description: "Foil, Holographic, and Polychrome cards appear 4X more often",
        cost: 10,
        image: '/images/vouchers/v_glow_up.png',
        effect: () => { /* TODO: Implement Glow Up */ }
    },
    {
        id: 'v_reroll_surplus',
        name: "Reroll Surplus",
        description: "Rerolls cost $2 less",
        cost: 10,
        image: '/images/vouchers/v_reroll_surplus.png',
        effect: () => { /* TODO: Implement Reroll Surplus */ }
    },
    {
        id: 'v_reroll______________________glut',
        name: "Reroll Glut",
        description: "Rerolls cost an additional $2 less",
        cost: 10,
        image: '/images/vouchers/v_reroll______________________glut.png',
        effect: () => { /* TODO: Implement Reroll Glut */ }
    },
    {
        id: 'v_crystal_ball',
        name: "Crystal Ball",
        description: "+1 consumable slot",
        cost: 10,
        image: '/images/vouchers/v_crystal_ball.png',
        effect: () => { /* TODO: Implement Crystal Ball */ }
    },
    {
        id: 'v_omen______________________globe',
        name: "Omen Globe",
        description: "Spectral cards may appear in any of the Arcana Packs",
        cost: 10,
        image: '/images/vouchers/v_omen______________________globe.png',
        effect: () => { /* TODO: Implement Omen Globe */ }
    },
    {
        id: 'v_telescope',
        name: "Telescope",
        description: "Celestial Packs always contain the Planet card for your most played poker hand",
        cost: 10,
        image: '/images/vouchers/v_telescope.png',
        effect: () => { /* TODO: Implement Telescope */ }
    },
    {
        id: 'v_observatory',
        name: "Observatory",
        description: "Planet cards in your consumable area give X1.5&nbsp;Mult for their specified poker hand",
        cost: 10,
        image: '/images/vouchers/v_observatory.png',
        effect: () => { /* TODO: Implement Observatory */ }
    },
    {
        id: 'v_grabber',
        name: "Grabber",
        description: "Permanently gain +1 hand per round",
        cost: 10,
        image: '/images/vouchers/v_grabber.png',
        effect: () => { /* TODO: Implement Grabber */ }
    },
    {
        id: 'v_nacho______________________tong',
        name: "Nacho Tong",
        description: "Permanently gain an additional +1 hand per round",
        cost: 10,
        image: '/images/vouchers/v_nacho______________________tong.png',
        effect: () => { /* TODO: Implement Nacho Tong */ }
    },
    {
        id: 'v_wasteful',
        name: "Wasteful",
        description: "Permanently gain +1 discard each round",
        cost: 10,
        image: '/images/vouchers/v_wasteful.png',
        effect: () => { /* TODO: Implement Wasteful */ }
    },
    {
        id: 'v_recyclomancy',
        name: "Recyclomancy",
        description: "Permanently gain an additional +1 discard each round",
        cost: 10,
        image: '/images/vouchers/v_recyclomancy.png',
        effect: () => { /* TODO: Implement Recyclomancy */ }
    },
    {
        id: 'v_tarot_merchant',
        name: "Tarot Merchant",
        description: "Tarot cards appear 2X more frequently in the shop",
        cost: 10,
        image: '/images/vouchers/v_tarot_merchant.png',
        effect: () => { /* TODO: Implement Tarot Merchant */ }
    },
    {
        id: 'v_tarot______________________tycoon',
        name: "Tarot Tycoon",
        description: "Tarot cards appear 4X more frequently in the shop",
        cost: 10,
        image: '/images/vouchers/v_tarot______________________tycoon.png',
        effect: () => { /* TODO: Implement Tarot Tycoon */ }
    },
    {
        id: 'v_planet_merchant',
        name: "Planet Merchant",
        description: "Planet cards appear 2X more frequently in the shop",
        cost: 10,
        image: '/images/vouchers/v_planet_merchant.png',
        effect: () => { /* TODO: Implement Planet Merchant */ }
    },
    {
        id: 'v_planet_tycoon',
        name: "Planet Tycoon",
        description: "Planet cards appear 4X more frequently in the shop",
        cost: 10,
        image: '/images/vouchers/v_planet_tycoon.png',
        effect: () => { /* TODO: Implement Planet Tycoon */ }
    },
    {
        id: 'v_seed______________________money',
        name: "Seed Money",
        description: "Raise the cap on interest earned in each round to $10",
        cost: 10,
        image: '/images/vouchers/v_seed______________________money.png',
        effect: () => { /* TODO: Implement Seed Money */ }
    },
    {
        id: 'v_money______________________tree',
        name: "Money Tree",
        description: "Raise the cap on interest earned in each round to $20",
        cost: 10,
        image: '/images/vouchers/v_money______________________tree.png',
        effect: () => { /* TODO: Implement Money Tree */ }
    },
    {
        id: 'v_blank',
        name: "Blank",
        description: "Does nothing?",
        cost: 10,
        image: '/images/vouchers/v_blank.png',
        effect: () => { /* TODO: Implement Blank */ }
    },
    {
        id: 'v_antimatter',
        name: "Antimatter",
        description: "+1 Joker slot",
        cost: 10,
        image: '/images/vouchers/v_antimatter.png',
        effect: () => { /* TODO: Implement Antimatter */ }
    },
    {
        id: 'v_magic______________________trick',
        name: "Magic Trick",
        description: "Playing cards can be purchased from the shop",
        cost: 10,
        image: '/images/vouchers/v_magic______________________trick.png',
        effect: () => { /* TODO: Implement Magic Trick */ }
    },
    {
        id: 'v_illusion',
        name: "Illusion",
        description: "Playing cards in shop may have an Enhancement, Edition, and/or a Seal",
        cost: 10,
        image: '/images/vouchers/v_illusion.png',
        effect: () => { /* TODO: Implement Illusion */ }
    },
    {
        id: 'v_hieroglyph',
        name: "Hieroglyph",
        description: "-1 Ante, -1 hand each round",
        cost: 10,
        image: '/images/vouchers/v_hieroglyph.png',
        effect: () => { /* TODO: Implement Hieroglyph */ }
    },
    {
        id: 'v_petroglyph',
        name: "Petroglyph",
        description: "-1 Ante again, -1 discard each round",
        cost: 10,
        image: '/images/vouchers/v_petroglyph.png',
        effect: () => { /* TODO: Implement Petroglyph */ }
    },
    {
        id: 'v_director_s_cut',
        name: "Director's Cut",
        description: "Reroll Boss Blind 1 time per Ante, $10 per roll",
        cost: 10,
        image: '/images/vouchers/v_director_s_cut.png',
        effect: () => { /* TODO: Implement Director's Cut */ }
    },
    {
        id: 'v_retcon',
        name: "Retcon",
        description: "Reroll Boss Blind unlimited times, $10 per roll",
        cost: 10,
        image: '/images/vouchers/v_retcon.png',
        effect: () => { /* TODO: Implement Retcon */ }
    },
    {
        id: 'v_paint______________________brush',
        name: "Paint Brush",
        description: "+1 hand size",
        cost: 10,
        image: '/images/vouchers/v_paint______________________brush.png',
        effect: () => { /* TODO: Implement Paint Brush */ }
    },
    {
        id: 'v_palette',
        name: "Palette",
        description: "+1 hand size again",
        cost: 10,
        image: '/images/vouchers/v_palette.png',
        effect: () => { /* TODO: Implement Palette */ }
    },
];