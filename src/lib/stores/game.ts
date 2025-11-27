import { writable } from 'svelte/store';
import type { GameState, Card, Suit, Rank, Joker, Consumable, Voucher, Pack, ShopItem } from '../types';

const SUITS: Suit[] = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

import { IMPORTED_JOKERS } from './jokers_data';
import { IMPORTED_TAROTS } from './tarots_data';
import { IMPORTED_PLANETS } from './planets_data';
import { IMPORTED_SPECTRAL } from './spectral_data';
import { IMPORTED_VOUCHERS } from './vouchers_data';
import { IMPORTED_PACKS } from './boosterpacks_data';
import { BOSS_BLINDS } from '../data/blinds';
import { getRandomTag, type Tag } from '../data/tags';

// Placeholder Jokers for Shop (Now using imported ones)
const AVAILABLE_JOKERS: Joker[] = IMPORTED_JOKERS.map(j => ({
    ...j,
    image: `/images/jokers/${j.id}.png`
}));

const AVAILABLE_CONSUMABLES: Consumable[] = [
    ...IMPORTED_TAROTS.map(c => ({ ...c, image: `/images/tarots/${c.id}.png` })),
    ...IMPORTED_PLANETS.map(c => ({ ...c, image: `/images/planets/${c.id}.png` })),
    ...IMPORTED_SPECTRAL.map(c => ({ ...c, image: `/images/spectral/${c.id}.png` }))
];

const AVAILABLE_VOUCHERS: Voucher[] = IMPORTED_VOUCHERS.map(v => ({
    ...v,
    image: `/images/vouchers/${v.id}.png`
}));

const AVAILABLE_PACKS: Pack[] = IMPORTED_PACKS.map(p => ({
    ...p,
    image: `/images/boosterpacks/${p.id}.png`
}));

function createDeck(): Card[] {
    const deck: Card[] = [];
    let id = 0;
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            let score = 0;
            if (['J', 'Q', 'K'].includes(rank)) score = 10;
            else if (rank === 'A') score = 11;
            else score = parseInt(rank);

            deck.push({
                id: `card_${id++}`,
                suit,
                rank,
                score,
                is_selected: false
            });
        }
    }
    return deck;
}

function shuffle(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function sortCards(cards: Card[], type: 'rank' | 'suit'): Card[] {
    return [...cards].sort((a, b) => {
        if (type === 'rank') {
            // Sort by Rank (High to Low)
            const rankA = RANKS.indexOf(a.rank);
            const rankB = RANKS.indexOf(b.rank);
            if (rankA !== rankB) return rankB - rankA;
            // Secondary sort by Suit
            return SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit);
        } else {
            // Sort by Suit
            const suitA = SUITS.indexOf(a.suit);
            const suitB = SUITS.indexOf(b.suit);
            if (suitA !== suitB) return suitA - suitB;
            // Secondary sort by Rank (High to Low)
            return RANKS.indexOf(b.rank) - RANKS.indexOf(a.rank);
        }
    });
}

type BlindState = 'available' | 'skipped' | 'upcoming' | 'completed';

interface ExtendedGameState extends GameState {
    state: 'playing' | 'won_blind' | 'game_over' | 'shop' | 'blind_select';
    blind_states: {
        small: BlindState;
        big: BlindState;
        boss: BlindState;
    };
    small_blind_tag: Tag | null;
    big_blind_tag: Tag | null;
    upcoming_boss: { name: string } | null;
    tags: Tag[];
    blinds_skipped: number;
    hands_played_total: number;
    discards_unused_total: number;
}

const initialState: ExtendedGameState = {
    money: 0,
    round: 1,
    ante: 1,
    hands: 4,
    discards: 3,
    deck: [],
    hand: [],
    played_hand: [],
    jokers: [],
    consumables: [],
    max_consumables: 2,
    shop_items: [],
    sort_preference: 'rank',
    current_blind: {
        name: 'Small Blind',
        score_to_beat: 300,
        reward: 3
    },
    current_score: 0,
    target_score: 300,
    state: 'blind_select',
    blind_states: {
        small: 'available',
        big: 'upcoming',
        boss: 'upcoming'
    },
    small_blind_tag: null,
    big_blind_tag: null,
    upcoming_boss: null,
    tags: [],
    blinds_skipped: 0,
    hands_played_total: 0,
    discards_unused_total: 0
};

function createGameStore() {
    const { subscribe, set, update } = writable<ExtendedGameState>(initialState);

    return {
        subscribe,
        startGame: () => {
            const upcomingBoss = BOSS_BLINDS[Math.floor(Math.random() * BOSS_BLINDS.length)];
            update(state => ({
                ...initialState,
                state: 'blind_select',
                blind_states: {
                    small: 'available',
                    big: 'upcoming',
                    boss: 'upcoming'
                },
                small_blind_tag: getRandomTag(1),
                big_blind_tag: getRandomTag(1),
                upcoming_boss: { name: upcomingBoss },
                tags: [],
                blinds_skipped: 0,
                hands_played_total: 0,
                discards_unused_total: 0
            }));
        },
        enterBlindSelect: () => {
            update(state => {
                const ante = state.ante;
                const round = state.round;
                const nextBlindIndex = (round - 1) % 3; // 0: Small, 1: Big, 2: Boss

                // Determine which blind is next
                let blindStates = { ...state.blind_states };
                
                if (nextBlindIndex === 0) {
                    // Starting new ante - reset all blinds
                    blindStates = {
                        small: 'available',
                        big: 'upcoming',
                        boss: 'upcoming'
                    };
                } else if (nextBlindIndex === 1) {
                    blindStates.big = 'available';
                } else {
                    blindStates.boss = 'available';
                }

                const upcomingBoss = state.upcoming_boss || { name: BOSS_BLINDS[Math.floor(Math.random() * BOSS_BLINDS.length)] };

                return {
                    ...state,
                    state: 'blind_select',
                    blind_states: blindStates,
                    small_blind_tag: getRandomTag(ante),
                    big_blind_tag: getRandomTag(ante),
                    upcoming_boss: upcomingBoss
                };
            });
        },
        selectBlind: (blindType: 'small' | 'big' | 'boss') => {
            update(state => {
                const ante = state.ante;
                const baseScore = 300 * Math.pow(2, ante - 1);
                
                let blindName = 'Small Blind';
                let newTarget = baseScore;
                let reward = 3;

                if (blindType === 'big') {
                    blindName = 'Big Blind';
                    newTarget = baseScore * 1.5;
                    reward = 4;
                } else if (blindType === 'boss') {
                    blindName = state.upcoming_boss?.name || BOSS_BLINDS[Math.floor(Math.random() * BOSS_BLINDS.length)];
                    newTarget = baseScore * 2;
                    reward = 5;
                }

                const deck = shuffle(createDeck());
                const hand = deck.splice(0, 8);

                return {
                    ...state,
                    deck,
                    hand: sortCards(hand, state.sort_preference),
                    current_score: 0,
                    target_score: Math.floor(newTarget),
                    hands: 4,
                    discards: 3,
                    state: 'playing',
                    current_blind: {
                        name: blindName,
                        score_to_beat: Math.floor(newTarget),
                        reward
                    }
                };
            });
        },
        skipBlind: (blindType: 'small' | 'big') => {
            update(state => {
                const tag = blindType === 'small' ? state.small_blind_tag : state.big_blind_tag;
                const newTags = tag ? [...state.tags, tag] : state.tags;
                
                const blindStates = { ...state.blind_states };
                blindStates[blindType] = 'skipped';
                
                // Make the next blind available
                if (blindType === 'small') {
                    blindStates.big = 'available';
                } else {
                    blindStates.boss = 'available';
                }

                // Generate new tags for the skipped position
                const newSmallTag = blindType === 'small' ? null : state.small_blind_tag;
                const newBigTag = blindType === 'big' ? null : state.big_blind_tag;

                return {
                    ...state,
                    blind_states: blindStates,
                    tags: newTags,
                    blinds_skipped: state.blinds_skipped + 1,
                    small_blind_tag: newSmallTag,
                    big_blind_tag: newBigTag
                };
            });
        },
        enterShop: () => {
            update(state => {
                const shopItems: ShopItem[] = [];

                // 1. Add 2 Jokers
                for (let i = 0; i < 2; i++) {
                    const joker = AVAILABLE_JOKERS[Math.floor(Math.random() * AVAILABLE_JOKERS.length)];
                    shopItems.push({ type: 'joker', item: { ...joker, id: `${joker.id}_${Date.now()}_${i}` } });
                }

                // 2. Add 1 Consumable (Planet/Tarot)
                const consumable = AVAILABLE_CONSUMABLES[Math.floor(Math.random() * AVAILABLE_CONSUMABLES.length)];
                shopItems.push({ type: 'consumable', item: { ...consumable, id: `${consumable.id}_${Date.now()}` } });

                // 3. Add 1 Voucher
                const voucher = AVAILABLE_VOUCHERS[Math.floor(Math.random() * AVAILABLE_VOUCHERS.length)];
                shopItems.push({ type: 'voucher', item: { ...voucher } });

                // 4. Add 2 Packs
                for (let i = 0; i < 2; i++) {
                    const pack = AVAILABLE_PACKS[Math.floor(Math.random() * AVAILABLE_PACKS.length)];
                    shopItems.push({ type: 'pack', item: { ...pack, id: `${pack.id}_${Date.now()}_${i}` } });
                }

                return {
                    ...state,
                    state: 'shop',
                    shop_items: shopItems
                };
            });
        },
        buyItem: (shopItem: ShopItem) => {
            update(state => {
                let cost = 0;
                if (shopItem.type === 'joker') cost = shopItem.item.cost;
                else if (shopItem.type === 'consumable') cost = 3; // Fixed cost for now, add to type later
                else if (shopItem.type === 'voucher') cost = shopItem.item.cost;
                else if (shopItem.type === 'pack') cost = shopItem.item.cost;

                if (state.money < cost) return state;

                let newState = { ...state, money: state.money - cost };

                if (shopItem.type === 'joker') {
                    if (state.jokers.length >= 5) return state;
                    newState.jokers = [...state.jokers, shopItem.item as Joker];
                } else if (shopItem.type === 'consumable') {
                    if (state.consumables.length >= state.max_consumables) return state;
                    newState.consumables = [...state.consumables, shopItem.item as Consumable];
                } else if (shopItem.type === 'voucher') {
                    // Apply voucher effect immediately
                    (shopItem.item as Voucher).effect(newState);
                } else if (shopItem.type === 'pack') {
                    // TODO: Open pack logic
                }

                // Remove bought item from shop
                newState.shop_items = state.shop_items.filter(i => {
                    if (i.type === 'joker') return (i.item as Joker).id !== (shopItem.item as any).id;
                    if (i.type === 'consumable') return (i.item as Consumable).id !== (shopItem.item as any).id;
                    if (i.type === 'voucher') return (i.item as Voucher).id !== (shopItem.item as any).id;
                    if (i.type === 'pack') return (i.item as Pack).id !== (shopItem.item as any).id;
                    return true;
                });

                return newState;
            });
        },
        nextRound: () => {
            update(state => {
                let { round, ante } = state;

                round++;
                const nextBlindIndex = (round - 1) % 3; // 0: Small, 1: Big, 2: Boss

                if (nextBlindIndex === 0) {
                    ante++;
                }

                // Generate new boss for next ante if starting small blind
                const upcomingBoss = nextBlindIndex === 0 
                    ? { name: BOSS_BLINDS[Math.floor(Math.random() * BOSS_BLINDS.length)] }
                    : state.upcoming_boss;

                // Determine blind states based on which blind is next
                let blindStates = { ...state.blind_states };
                
                if (nextBlindIndex === 0) {
                    // Starting new ante - reset all blinds
                    blindStates = {
                        small: 'available' as BlindState,
                        big: 'upcoming' as BlindState,
                        boss: 'upcoming' as BlindState
                    };
                } else if (nextBlindIndex === 1) {
                    blindStates.small = 'completed' as BlindState;
                    blindStates.big = 'available' as BlindState;
                } else {
                    blindStates.big = 'completed' as BlindState;
                    blindStates.boss = 'available' as BlindState;
                }

                return {
                    ...state,
                    round,
                    ante,
                    state: 'blind_select',
                    blind_states: blindStates,
                    small_blind_tag: getRandomTag(ante),
                    big_blind_tag: getRandomTag(ante),
                    upcoming_boss: upcomingBoss
                };
            });
        },
        selectCard: (cardId: string) => {
            update(state => ({
                ...state,
                hand: state.hand.map(c =>
                    c.id === cardId ? { ...c, is_selected: !c.is_selected } : c
                )
            }));
        },
        discard: () => {
            update(state => {
                if (state.discards <= 0) return state;

                const selectedCards = state.hand.filter(c => c.is_selected);
                if (selectedCards.length === 0 || selectedCards.length > 5) return state;

                const remainingHand = state.hand.filter(c => !c.is_selected);
                const newCards = state.deck.splice(0, selectedCards.length);
                const newHand = [...remainingHand, ...newCards];

                return {
                    ...state,
                    hand: sortCards(newHand, state.sort_preference),
                    discards: state.discards - 1
                };
            });
        },
        useConsumable: (consumable: Consumable) => {
            update(state => {
                // Apply effect
                consumable.effect(state);

                // Remove from inventory
                return {
                    ...state,
                    consumables: state.consumables.filter(c => c.id !== consumable.id)
                };
            });
        },
        playHand: (playedCards: Card[], chips: number, mult: number, handName: string) => {
            update(state => {
                if (state.hands <= 0) return state;

                let finalChips = chips;
                let finalMult = mult;

                // 1. Boss Blind Debuffs
                // let debuffedCards = playedCards.map(c => c.id);
                const isBossBlind = state.round % 3 === 0;

                // Example Boss Effects (to be expanded)
                // For now, we'll just simulate a generic debuff if it's a boss blind
                // In a real implementation, we'd check specific boss names

                // 2. Card Enhancements & Editions
                playedCards.forEach(card => {
                    // Skip if debuffed (logic to be refined with specific bosses)
                    // if (isBossBlind && ...) return;

                    // Enhancements
                    if (card.enhancement === 'Bonus') {
                        finalChips += 30;
                    } else if (card.enhancement === 'Mult') {
                        finalMult += 4;
                    } else if (card.enhancement === 'Stone') {
                        finalChips += 50;
                    } else if (card.enhancement === 'Glass') {
                        finalMult *= 2;
                        // TODO: Implement destruction chance
                    }

                    // Editions
                    if (card.edition === 'Foil') {
                        finalChips += 50;
                    } else if (card.edition === 'Holographic') {
                        finalMult += 10;
                    } else if (card.edition === 'Polychrome') {
                        finalMult *= 1.5;
                    }
                });

                // 2. Joker Effects
                state.jokers.forEach(joker => {
                    // Basic +Mult
                    if (joker.name === 'Joker') {
                        finalMult += 4;
                    }

                    // Suit-specific Jokers
                    if (joker.name === 'Greedy Joker') {
                        const diamondCount = playedCards.filter(c => c.suit === 'Diamonds').length;
                        if (diamondCount > 0) finalMult += 4 * diamondCount;
                    }
                    if (joker.name === 'Lusty Joker') {
                        const heartCount = playedCards.filter(c => c.suit === 'Hearts').length;
                        if (heartCount > 0) finalMult += 4 * heartCount;
                    }
                    if (joker.name === 'Wrathful Joker') {
                        const spadeCount = playedCards.filter(c => c.suit === 'Spades').length;
                        if (spadeCount > 0) finalMult += 4 * spadeCount;
                    }
                    if (joker.name === 'Gluttonous Joker') {
                        const clubCount = playedCards.filter(c => c.suit === 'Clubs').length;
                        if (clubCount > 0) finalMult += 4 * clubCount;
                    }

                    // Hand-specific Jokers
                    if (joker.name === 'Jolly Joker' && handName === 'Pair') {
                        finalMult += 8;
                    }
                    if (joker.name === 'Zany Joker' && handName === 'Three of a Kind') {
                        finalMult += 12;
                    }
                    if (joker.name === 'Mad Joker' && handName === 'Two Pair') {
                        finalMult += 20;
                    }
                    if (joker.name === 'Crazy Joker' && handName === 'Straight') {
                        finalMult += 12;
                    }
                    if (joker.name === 'Droll Joker' && handName === 'Flush') {
                        finalMult += 10;
                    }
                    if (joker.name === 'Sly Joker' && handName === 'Pair') {
                        finalChips += 50;
                    }
                    if (joker.name === 'Wily Joker' && handName === 'Three of a Kind') {
                        finalChips += 100;
                    }
                    if (joker.name === 'Clever Joker' && handName === 'Two Pair') {
                        finalChips += 150;
                    }
                });

                const score = finalChips * finalMult;

                const remainingHand = state.hand.filter(c => !playedCards.some(pc => pc.id === c.id));

                const cardsNeeded = 8 - remainingHand.length;
                const newCards = state.deck.splice(0, cardsNeeded);
                const newHand = [...remainingHand, ...newCards];

                const newState = {
                    ...state,
                    current_score: state.current_score + score,
                    hands: state.hands - 1,
                    hand: sortCards(newHand, state.sort_preference),
                    played_hand: playedCards
                };

                if (newState.current_score >= newState.target_score) {
                    newState.state = 'won_blind';
                    newState.money += newState.current_blind.reward;
                } else if (newState.hands <= 0) {
                    newState.state = 'game_over';
                }

                return newState;
            });
        },
        sortHand: (type: 'rank' | 'suit') => {
            update(state => {
                return {
                    ...state,
                    sort_preference: type,
                    hand: sortCards(state.hand, type)
                };
            });
        },
        debugBoss: () => {
            update(state => {
                const ante = state.ante;
                const round = (ante - 1) * 3 + 3; // Force to 3rd round of current ante

                // Scaling logic (copied from nextRound for Boss Blind)
                const baseScore = 300 * Math.pow(2, ante - 1);
                const newTarget = baseScore * 2;
                const reward = 5;
                const blindName = BOSS_BLINDS[Math.floor(Math.random() * BOSS_BLINDS.length)];

                const deck = shuffle(createDeck());
                const hand = deck.splice(0, 8);

                return {
                    ...state,
                    round,
                    ante,
                    current_score: 0,
                    target_score: Math.floor(newTarget),
                    hands: 4,
                    discards: 3,
                    deck,
                    hand: sortCards(hand, state.sort_preference),
                    state: 'playing',
                    current_blind: {
                        name: blindName,
                        score_to_beat: Math.floor(newTarget),
                        reward
                    }
                };
            });
        }
    };
}

export const game = createGameStore();
