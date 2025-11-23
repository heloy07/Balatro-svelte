import type { Consumable } from '../types';

export const IMPORTED_PLANETS: Consumable[] = [
    {
        id: 'c_pluto',
        name: "Pluto",
        description: "Increases High Card hand value by +1&nbsp;Mult and +10&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_pluto.png',
        effect: () => { /* TODO: Implement Pluto */ }
    },
    {
        id: 'c_mercury',
        name: "Mercury",
        description: "Increases Pair hand value by +1&nbsp;Mult and +15&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_mercury.png',
        effect: () => { /* TODO: Implement Mercury */ }
    },
    {
        id: 'c_uranus',
        name: "Uranus",
        description: "Increases Two Pair hand value by +1&nbsp;Mult and +20&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_uranus.png',
        effect: () => { /* TODO: Implement Uranus */ }
    },
    {
        id: 'c_venus',
        name: "Venus",
        description: "Increases Three of a Kind hand value by +2&nbsp;Mult and +20&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_venus.png',
        effect: () => { /* TODO: Implement Venus */ }
    },
    {
        id: 'c_saturn',
        name: "Saturn",
        description: "Increases Straight hand value by +3&nbsp;Mult and +30&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_saturn.png',
        effect: () => { /* TODO: Implement Saturn */ }
    },
    {
        id: 'c_jupiter',
        name: "Jupiter",
        description: "Increases Flush hand value by +2&nbsp;Mult and +15&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_jupiter.png',
        effect: () => { /* TODO: Implement Jupiter */ }
    },
    {
        id: 'c_earth',
        name: "Earth",
        description: "Increases Full House hand value by +2&nbsp;Mult and +25&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_earth.png',
        effect: () => { /* TODO: Implement Earth */ }
    },
    {
        id: 'c_mars',
        name: "Mars",
        description: "Increases Four of a Kind hand value by +3&nbsp;Mult and +30&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_mars.png',
        effect: () => { /* TODO: Implement Mars */ }
    },
    {
        id: 'c_neptune',
        name: "Neptune",
        description: "Increases Straight Flush hand value by +4&nbsp;Mult and +40&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_neptune.png',
        effect: () => { /* TODO: Implement Neptune */ }
    },
    {
        id: 'c_planet_x',
        name: "Planet X",
        description: "Increases Five of a Kind hand value by +3&nbsp;Mult and +35&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_planet_x.png',
        effect: () => { /* TODO: Implement Planet X */ }
    },
    {
        id: 'c_ceres',
        name: "Ceres",
        description: "Increases Flush House hand value by +4&nbsp;Mult and +40&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_ceres.png',
        effect: () => { /* TODO: Implement Ceres */ }
    },
    {
        id: 'c_eris',
        name: "Eris",
        description: "Increases Flush Five hand value by +3&nbsp;Mult and +50&nbsp;Chips",
        type: 'Planet',
        image: '/images/planets/c_eris.png',
        effect: () => { /* TODO: Implement Eris */ }
    },
];