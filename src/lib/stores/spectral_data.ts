import type { Consumable } from '../types';

export const IMPORTED_SPECTRAL: Consumable[] = [
    {
        id: 'c_familiar',
        name: "Familiar",
        description: "Destroy 1 random card in your hand, add 3 random Enhanced face cards to your hand",
        type: 'Spectral',
        image: '/images/spectral/c_familiar.png',
        effect: () => { /* TODO: Implement Familiar */ }
    },
    {
        id: 'c_grim',
        name: "Grim",
        description: "Destroy 1 random card in your hand, add 2 random Enhanced Aces to your hand",
        type: 'Spectral',
        image: '/images/spectral/c_grim.png',
        effect: () => { /* TODO: Implement Grim */ }
    },
    {
        id: 'c_incantation',
        name: "Incantation",
        description: "Destroy 1 random card in your hand, add 4 random Enhanced numbered cards to your hand",
        type: 'Spectral',
        image: '/images/spectral/c_incantation.png',
        effect: () => { /* TODO: Implement Incantation */ }
    },
    {
        id: 'c_talisman',
        name: "Talisman",
        description: "Add a Gold Seal to 1 selected card in your hand",
        type: 'Spectral',
        image: '/images/spectral/c_talisman.png',
        effect: () => { /* TODO: Implement Talisman */ }
    },
    {
        id: 'c_aura',
        name: "Aura",
        description: "Add Foil, Holographic, or Polychrome effect to 1 selected card in hand",
        type: 'Spectral',
        image: '/images/spectral/c_aura.png',
        effect: () => { /* TODO: Implement Aura */ }
    },
    {
        id: 'c_wraith',
        name: "Wraith",
        description: "Creates a random Rare Joker, sets money to $0",
        type: 'Spectral',
        image: '/images/spectral/c_wraith.png',
        effect: () => { /* TODO: Implement Wraith */ }
    },
    {
        id: 'c_sigil',
        name: "Sigil",
        description: "Converts all cards in hand to a single random suit",
        type: 'Spectral',
        image: '/images/spectral/c_sigil.png',
        effect: () => { /* TODO: Implement Sigil */ }
    },
    {
        id: 'c_ouija',
        name: "Ouija",
        description: "Converts all cards in hand to a single random rank-1 hand size",
        type: 'Spectral',
        image: '/images/spectral/c_ouija.png',
        effect: () => { /* TODO: Implement Ouija */ }
    },
    {
        id: 'c_ectoplasm',
        name: "Ectoplasm",
        description: "Add Negative to a random Joker, -1 hand size",
        type: 'Spectral',
        image: '/images/spectral/c_ectoplasm.png',
        effect: () => { /* TODO: Implement Ectoplasm */ }
    },
    {
        id: 'c_immolate',
        name: "Immolate",
        description: "Destroys 5 random cards in hand, gain $20",
        type: 'Spectral',
        image: '/images/spectral/c_immolate.png',
        effect: () => { /* TODO: Implement Immolate */ }
    },
    {
        id: 'c_ankh',
        name: "Ankh",
        description: "Create a copy of a random Joker, destroy all other Jokers (Removes Negative from copy)",
        type: 'Spectral',
        image: '/images/spectral/c_ankh.png',
        effect: () => { /* TODO: Implement Ankh */ }
    },
    {
        id: 'c_deja_vu',
        name: "Deja Vu",
        description: "Add a Red Seal to 1 selected card in your hand",
        type: 'Spectral',
        image: '/images/spectral/c_deja_vu.png',
        effect: () => { /* TODO: Implement Deja Vu */ }
    },
    {
        id: 'c_hex',
        name: "Hex",
        description: "Add Polychrome to a random Joker, destroy all other Jokers",
        type: 'Spectral',
        image: '/images/spectral/c_hex.png',
        effect: () => { /* TODO: Implement Hex */ }
    },
    {
        id: 'c_trance',
        name: "Trance",
        description: "Add a Blue Seal to 1 selected card in your hand",
        type: 'Spectral',
        image: '/images/spectral/c_trance.png',
        effect: () => { /* TODO: Implement Trance */ }
    },
    {
        id: 'c_medium',
        name: "Medium",
        description: "Add a Purple Seal to 1 selected card in your hand",
        type: 'Spectral',
        image: '/images/spectral/c_medium.png',
        effect: () => { /* TODO: Implement Medium */ }
    },
    {
        id: 'c_cryptid',
        name: "Cryptid",
        description: "Create 2 copies of 1 selected card in your hand",
        type: 'Spectral',
        image: '/images/spectral/c_cryptid.png',
        effect: () => { /* TODO: Implement Cryptid */ }
    },
    {
        id: 'c_the_soul',
        name: "The Soul",
        description: "Creates a Legendary Joker (Must have room)",
        type: 'Spectral',
        image: '/images/spectral/c_the_soul.png',
        effect: () => { /* TODO: Implement The Soul */ }
    },
    {
        id: 'c_black_hole',
        name: "Black Hole",
        description: "Upgrade every poker hand by 1 level",
        type: 'Spectral',
        image: '/images/spectral/c_black_hole.png',
        effect: () => { /* TODO: Implement Black Hole */ }
    },
];