import type { Consumable } from '../types';

export const IMPORTED_TAROTS: Consumable[] = [
    {
        id: 'c_the_fool',
        name: "The Fool",
        description: "Creates the last Tarot or Planet card used during this runThe Fool excluded",
        type: 'Tarot',
        image: '/images/tarots/c_the_fool.png',
        effect: () => { /* TODO: Implement The Fool */ }
    },
    {
        id: 'c_the_magician',
        name: "The Magician",
        description: "Enhances 2 selected cards to Lucky Cards",
        type: 'Tarot',
        image: '/images/tarots/c_the_magician.png',
        effect: () => { /* TODO: Implement The Magician */ }
    },
    {
        id: 'c_the_high_priestess',
        name: "The High Priestess",
        description: "Creates up to 2 random Planet cards(Must have room)",
        type: 'Tarot',
        image: '/images/tarots/c_the_high_priestess.png',
        effect: () => { /* TODO: Implement The High Priestess */ }
    },
    {
        id: 'c_the_empress',
        name: "The Empress",
        description: "Enhances 2 selected cards to Mult Cards",
        type: 'Tarot',
        image: '/images/tarots/c_the_empress.png',
        effect: () => { /* TODO: Implement The Empress */ }
    },
    {
        id: 'c_the_emperor',
        name: "The Emperor",
        description: "Creates up to 2 random Tarot cards(Must have room)",
        type: 'Tarot',
        image: '/images/tarots/c_the_emperor.png',
        effect: () => { /* TODO: Implement The Emperor */ }
    },
    {
        id: 'c_the_hierophant',
        name: "The Hierophant",
        description: "Enhances 2 selected cards to Bonus Cards",
        type: 'Tarot',
        image: '/images/tarots/c_the_hierophant.png',
        effect: () => { /* TODO: Implement The Hierophant */ }
    },
    {
        id: 'c_the_lovers',
        name: "The Lovers",
        description: "Enhances 1 selected card into a Wild Card",
        type: 'Tarot',
        image: '/images/tarots/c_the_lovers.png',
        effect: () => { /* TODO: Implement The Lovers */ }
    },
    {
        id: 'c_the_chariot',
        name: "The Chariot",
        description: "Enhances 1 selected card into a Steel Card",
        type: 'Tarot',
        image: '/images/tarots/c_the_chariot.png',
        effect: () => { /* TODO: Implement The Chariot */ }
    },
    {
        id: 'c_justice',
        name: "Justice",
        description: "Enhances 1 selected card into a Glass Card",
        type: 'Tarot',
        image: '/images/tarots/c_justice.png',
        effect: () => { /* TODO: Implement Justice */ }
    },
    {
        id: 'c_the_hermit',
        name: "The Hermit",
        description: "Doubles money(Max of $20)",
        type: 'Tarot',
        image: '/images/tarots/c_the_hermit.png',
        effect: () => { /* TODO: Implement The Hermit */ }
    },
    {
        id: 'c_the_wheel_of_fortune',
        name: "The Wheel of Fortune",
        description: "1 in 4 chance to add Foil, Holographic, or Polychrome edition to a random Joker",
        type: 'Tarot',
        image: '/images/tarots/c_the_wheel_of_fortune.png',
        effect: () => { /* TODO: Implement The Wheel of Fortune */ }
    },
    {
        id: 'c_strength',
        name: "Strength",
        description: "Increases rank of up to 2 selected cards by 1",
        type: 'Tarot',
        image: '/images/tarots/c_strength.png',
        effect: () => { /* TODO: Implement Strength */ }
    },
    {
        id: 'c_the_hanged_man',
        name: "The Hanged Man",
        description: "Destroys up to 2 selected cards",
        type: 'Tarot',
        image: '/images/tarots/c_the_hanged_man.png',
        effect: () => { /* TODO: Implement The Hanged Man */ }
    },
    {
        id: 'c_death',
        name: "Death",
        description: "Select 2 cards, convert the left card into the right card(Drag to rearrange)",
        type: 'Tarot',
        image: '/images/tarots/c_death.png',
        effect: () => { /* TODO: Implement Death */ }
    },
    {
        id: 'c_temperance',
        name: "Temperance",
        description: "Gives the total sell value of all current Jokers(Max of $50)",
        type: 'Tarot',
        image: '/images/tarots/c_temperance.png',
        effect: () => { /* TODO: Implement Temperance */ }
    },
    {
        id: 'c_the_devil',
        name: "The Devil",
        description: "Enhances 1 selected card into a Gold Card",
        type: 'Tarot',
        image: '/images/tarots/c_the_devil.png',
        effect: () => { /* TODO: Implement The Devil */ }
    },
    {
        id: 'c_the_tower',
        name: "The Tower",
        description: "Enhances 1 selected card into a Stone Card",
        type: 'Tarot',
        image: '/images/tarots/c_the_tower.png',
        effect: () => { /* TODO: Implement The Tower */ }
    },
    {
        id: 'c_the_star',
        name: "The Star",
        description: "Converts up to 3 selected cards to &nbsp;Diamonds",
        type: 'Tarot',
        image: '/images/tarots/c_the_star.png',
        effect: () => { /* TODO: Implement The Star */ }
    },
    {
        id: 'c_the_moon',
        name: "The Moon",
        description: "Converts up to 3 selected cards to &nbsp;Clubs",
        type: 'Tarot',
        image: '/images/tarots/c_the_moon.png',
        effect: () => { /* TODO: Implement The Moon */ }
    },
    {
        id: 'c_the_sun',
        name: "The Sun",
        description: "Converts up to 3 selected cards to &nbsp;Hearts",
        type: 'Tarot',
        image: '/images/tarots/c_the_sun.png',
        effect: () => { /* TODO: Implement The Sun */ }
    },
    {
        id: 'c_judgement',
        name: "Judgement",
        description: "Creates a random Joker card(Must have room)",
        type: 'Tarot',
        image: '/images/tarots/c_judgement.png',
        effect: () => { /* TODO: Implement Judgement */ }
    },
    {
        id: 'c_the_world',
        name: "The World",
        description: "Converts up to 3 selected cards to &nbsp;Spades",
        type: 'Tarot',
        image: '/images/tarots/c_the_world.png',
        effect: () => { /* TODO: Implement The World */ }
    },
];