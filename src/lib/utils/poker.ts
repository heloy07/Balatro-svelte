import type { Card, PokerHand, PokerHandName } from '../types';

const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function getRankValue(rank: string): number {
    return RANKS.indexOf(rank);
}

function sortCards(cards: Card[]): Card[] {
    return [...cards].sort((a, b) => getRankValue(a.rank) - getRankValue(b.rank));
}

function isFlush(cards: Card[]): boolean {
    if (cards.length < 5) return false;
    const suit = cards[0].suit;
    return cards.every(card => card.suit === suit);
}

function isStraight(cards: Card[]): boolean {
    if (cards.length < 5) return false;

    // Get unique ranks to handle duplicates if any
    const ranks = Array.from(new Set(cards.map(c => getRankValue(c.rank)))).sort((a, b) => a - b);

    if (ranks.length < 5) return false;

    // Check for standard straight (consecutive ranks)
    // We only check the first 5 unique ranks if we have more (though in Balatro standard play you play 5 cards)
    // But let's assume we are evaluating exactly 5 cards for now as per game rules.

    let isStandard = true;
    for (let i = 0; i < ranks.length - 1; i++) {
        if (ranks[i + 1] !== ranks[i] + 1) {
            isStandard = false;
            break;
        }
    }
    if (isStandard) return true;

    // Check for Ace Low Straight (A, 2, 3, 4, 5)
    // A is 12, 2 is 0, 3 is 1, 4 is 2, 5 is 3
    // Sorted ranks would be: 0, 1, 2, 3, 12
    if (ranks.length === 5 &&
        ranks[0] === 0 &&
        ranks[1] === 1 &&
        ranks[2] === 2 &&
        ranks[3] === 3 &&
        ranks[4] === 12) {
        return true;
    }

    return false;
}

// Helper to count rank frequencies
function getRankCounts(cards: Card[]): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const card of cards) {
        counts[card.rank] = (counts[card.rank] || 0) + 1;
    }
    return counts;
}

export function evaluateHand(cards: Card[]): PokerHand {
    const sorted = sortCards(cards);
    const flush = isFlush(sorted);
    const straight = isStraight(sorted);
    const counts = getRankCounts(sorted);
    const countValues = Object.values(counts).sort((a, b) => b - a);

    let name: PokerHandName = 'High Card';
    let chips = 5;
    let mult = 1;

    if (flush && straight) {
        // Check for Royal Flush
        // Royal flush is T, J, Q, K, A suited.
        // Ranks: 8, 9, 10, 11, 12
        const ranks = sorted.map(c => getRankValue(c.rank));
        if (ranks[0] === 8 && ranks[4] === 12) {
            name = 'Royal Flush';
            chips = 100;
            mult = 8;
        } else {
            name = 'Straight Flush';
            chips = 100;
            mult = 8;
        }
    } else if (countValues[0] === 4) {
        name = 'Four of a Kind';
        chips = 60;
        mult = 7;
    } else if (countValues[0] === 3 && countValues[1] === 2) {
        name = 'Full House';
        chips = 40;
        mult = 4;
    } else if (flush) {
        name = 'Flush';
        chips = 35;
        mult = 4;
    } else if (straight) {
        name = 'Straight';
        chips = 30;
        mult = 4;
    } else if (countValues[0] === 3) {
        name = 'Three of a Kind';
        chips = 30;
        mult = 3;
    } else if (countValues[0] === 2 && countValues[1] === 2) {
        name = 'Two Pair';
        chips = 20;
        mult = 2;
    } else if (countValues[0] === 2) {
        name = 'Pair';
        chips = 10;
        mult = 2;
    }

    // Calculate base chips from card values
    let cardChips = 0;
    for (const card of cards) {
        cardChips += card.score;
    }

    return {
        name,
        cards,
        chips: chips + cardChips,
        mult,
        level: 1
    };
}
