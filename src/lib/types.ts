export type Suit = 'Spades' | 'Hearts' | 'Clubs' | 'Diamonds';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
    id: string;
    suit: Suit;
    rank: Rank;
    score: number; // Base chips value
    enhancement?: 'Bonus' | 'Mult' | 'Wild' | 'Glass' | 'Steel' | 'Stone' | 'Gold' | 'Lucky';
    edition?: 'Foil' | 'Holographic' | 'Polychrome' | 'Negative';
    is_selected: boolean;
}

export type PokerHandName =
    | 'High Card'
    | 'Pair'
    | 'Two Pair'
    | 'Three of a Kind'
    | 'Straight'
    | 'Flush'
    | 'Full House'
    | 'Four of a Kind'
    | 'Straight Flush'
    | 'Royal Flush';

export interface PokerHand {
    name: PokerHandName;
    cards: Card[];
    chips: number;
    mult: number;
    level: number;
}

export interface Joker {
    id: string;
    name: string;
    description: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
    cost: number;
    effect: (gameState: GameState) => void;
    image?: string;
}

export interface Consumable {
    id: string;
    name: string;
    description: string;
    type: 'Tarot' | 'Planet' | 'Spectral';
    effect: (gameState: GameState) => void;
    image?: string;
}

export interface Voucher {
    id: string;
    name: string;
    description: string;
    cost: number;
    effect: (gameState: GameState) => void;
    image?: string;
}

export interface Pack {
    id: string;
    name: string;
    description: string;
    cost: number;
    type: 'Buffoon' | 'Celestial' | 'Standard' | 'Arcana' | 'Spectral';
    effect: (gameState: GameState) => void;
    image?: string;
}

export type ShopItem =
    | { type: 'joker', item: Joker }
    | { type: 'consumable', item: Consumable }
    | { type: 'voucher', item: Voucher }
    | { type: 'pack', item: Pack };

export interface GameState {
    money: number;
    round: number;
    ante: number;
    hands: number;
    discards: number;
    deck: Card[];
    hand: Card[];
    played_hand: Card[];
    jokers: Joker[];
    consumables: Consumable[];
    max_consumables: number;
    sort_preference: 'rank' | 'suit';
    shop_items: ShopItem[];
    current_blind: {
        name: string;
        score_to_beat: number;
        reward: number;
    };
    current_score: number;
    target_score: number;
}
