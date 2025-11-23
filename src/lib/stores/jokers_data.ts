import type { Joker } from '../types';

export const IMPORTED_JOKERS: Joker[] = [
    {
        id: 'j_joker',
        name: "Joker",
        description: "+4&nbsp;Mult",
        rarity: 'Common',
        cost: 2,
        image: '/images/jokers/j_joker.png',
        effect: () => { /* TODO: Implement Joker */ }
    },
    {
        id: 'j_greedy_joker',
        name: "Greedy Joker",
        description: "Played cards with .mw-parser-output .suit-diamond{color:var(--suit-diamond)}.mw-parser-output .suit-heart{color:var(--suit-heart)}.mw-parser-output .suit-spade{color:var(--suit-spade)}.mw-parser-output .suit-club{color:var(--suit-club)}&nbsp;Diamond suit give +3&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_greedy_joker.png',
        effect: () => { /* TODO: Implement Greedy Joker */ }
    },
    {
        id: 'j_lusty_joker',
        name: "Lusty Joker",
        description: "Played cards with &nbsp;Heart suit give +3&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_lusty_joker.png',
        effect: () => { /* TODO: Implement Lusty Joker */ }
    },
    {
        id: 'j_wrathful_joker',
        name: "Wrathful Joker",
        description: "Played cards with &nbsp;Spade suit give +3&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_wrathful_joker.png',
        effect: () => { /* TODO: Implement Wrathful Joker */ }
    },
    {
        id: 'j_gluttonous_joker',
        name: "Gluttonous Joker",
        description: "Played cards with &nbsp;Club suit give +3&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_gluttonous_joker.png',
        effect: () => { /* TODO: Implement Gluttonous Joker */ }
    },
    {
        id: 'j_jolly_joker',
        name: "Jolly Joker",
        description: "+8&nbsp;Mult if played hand contains a Pair",
        rarity: 'Common',
        cost: 3,
        image: '/images/jokers/j_jolly_joker.png',
        effect: () => { /* TODO: Implement Jolly Joker */ }
    },
    {
        id: 'j_zany_joker',
        name: "Zany Joker",
        description: "+12&nbsp;Mult if played hand contains a Three of a Kind",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_zany_joker.png',
        effect: () => { /* TODO: Implement Zany Joker */ }
    },
    {
        id: 'j_mad_joker',
        name: "Mad Joker",
        description: "+10&nbsp;Mult if played hand contains a Two Pair",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_mad_joker.png',
        effect: () => { /* TODO: Implement Mad Joker */ }
    },
    {
        id: 'j_crazy_joker',
        name: "Crazy Joker",
        description: "+12&nbsp;Mult if played hand contains a Straight",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_crazy_joker.png',
        effect: () => { /* TODO: Implement Crazy Joker */ }
    },
    {
        id: 'j_droll_joker',
        name: "Droll Joker",
        description: "+10&nbsp;Mult if played hand contains a Flush",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_droll_joker.png',
        effect: () => { /* TODO: Implement Droll Joker */ }
    },
    {
        id: 'j_sly_joker',
        name: "Sly Joker",
        description: "+50&nbsp;Chips if played hand contains a Pair",
        rarity: 'Common',
        cost: 3,
        image: '/images/jokers/j_sly_joker.png',
        effect: () => { /* TODO: Implement Sly Joker */ }
    },
    {
        id: 'j_wily_joker',
        name: "Wily Joker",
        description: "+100&nbsp;Chips if played hand contains a Three of a Kind",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_wily_joker.png',
        effect: () => { /* TODO: Implement Wily Joker */ }
    },
    {
        id: 'j_clever_joker',
        name: "Clever Joker",
        description: "+80&nbsp;Chips if played hand contains a Two Pair",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_clever_joker.png',
        effect: () => { /* TODO: Implement Clever Joker */ }
    },
    {
        id: 'j_devious_joker',
        name: "Devious Joker",
        description: "+100&nbsp;Chips if played hand contains a Straight",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_devious_joker.png',
        effect: () => { /* TODO: Implement Devious Joker */ }
    },
    {
        id: 'j_crafty_joker',
        name: "Crafty Joker",
        description: "+80&nbsp;Chips if played hand contains a Flush",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_crafty_joker.png',
        effect: () => { /* TODO: Implement Crafty Joker */ }
    },
    {
        id: 'j_half_joker',
        name: "Half Joker",
        description: "+20&nbsp;Mult if played hand contains 3 or fewer cards",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_half_joker.png',
        effect: () => { /* TODO: Implement Half Joker */ }
    },
    {
        id: 'j_joker_stencil',
        name: "Joker Stencil",
        description: "X1&nbsp;Mult for each empty Joker slot. Joker Stencil included (Currently X1)",
        rarity: 'Uncommon',
        cost: 8,
        image: '/images/jokers/j_joker_stencil.png',
        effect: () => { /* TODO: Implement Joker Stencil */ }
    },
    {
        id: 'j_four_fingers',
        name: "Four Fingers",
        description: "All Flushes and Straights can be made with 4 cards",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_four_fingers.png',
        effect: () => { /* TODO: Implement Four Fingers */ }
    },
    {
        id: 'j_mime',
        name: "Mime",
        description: "Retrigger all card held in hand abilities",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_mime.png',
        effect: () => { /* TODO: Implement Mime */ }
    },
    {
        id: 'j_credit_card',
        name: "Credit Card",
        description: "Go up to -$20 in debt",
        rarity: 'Common',
        cost: 1,
        image: '/images/jokers/j_credit_card.png',
        effect: () => { /* TODO: Implement Credit Card */ }
    },
    {
        id: 'j_ceremonial_dagger',
        name: "Ceremonial Dagger",
        description: "When Blind is selected, destroy Joker to the right and permanently add double its sell value to this Mult (Currently +0&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_ceremonial_dagger.png',
        effect: () => { /* TODO: Implement Ceremonial Dagger */ }
    },
    {
        id: 'j_banner',
        name: "Banner",
        description: "+30&nbsp;Chips for each remaining discard",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_banner.png',
        effect: () => { /* TODO: Implement Banner */ }
    },
    {
        id: 'j_mystic_summit',
        name: "Mystic Summit",
        description: "+15&nbsp;Mult when 0 discards remaining",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_mystic_summit.png',
        effect: () => { /* TODO: Implement Mystic Summit */ }
    },
    {
        id: 'j_marble_joker',
        name: "Marble Joker",
        description: "Adds one Stone card to the deck when Blind is selected",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_marble_joker.png',
        effect: () => { /* TODO: Implement Marble Joker */ }
    },
    {
        id: 'j_loyalty_card',
        name: "Loyalty Card",
        description: "X4&nbsp;Mult every 6 hands played5 remaining",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_loyalty_card.png',
        effect: () => { /* TODO: Implement Loyalty Card */ }
    },
    {
        id: 'j_8_ball',
        name: "8 Ball",
        description: "1 in 4 chance for each played 8 to create a Tarot card when scored(Must have room)",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_8_ball.png',
        effect: () => { /* TODO: Implement 8 Ball */ }
    },
    {
        id: 'j_misprint',
        name: "Misprint",
        description: "+0-23&nbsp;Mult",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_misprint.png',
        effect: () => { /* TODO: Implement Misprint */ }
    },
    {
        id: 'j_dusk',
        name: "Dusk",
        description: "Retrigger all played cards in final hand of the round",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_dusk.png',
        effect: () => { /* TODO: Implement Dusk */ }
    },
    {
        id: 'j_raised_fist',
        name: "Raised Fist",
        description: "Adds double the rank of lowest ranked card held in hand to Mult",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_raised_fist.png',
        effect: () => { /* TODO: Implement Raised Fist */ }
    },
    {
        id: 'j_chaos_the_clown',
        name: "Chaos the Clown",
        description: "1 free Reroll per shop",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_chaos_the_clown.png',
        effect: () => { /* TODO: Implement Chaos the Clown */ }
    },
    {
        id: 'j_fibonacci',
        name: "Fibonacci",
        description: "Each played Ace, 2, 3, 5, or 8 gives +8&nbsp;Mult when scored",
        rarity: 'Uncommon',
        cost: 8,
        image: '/images/jokers/j_fibonacci.png',
        effect: () => { /* TODO: Implement Fibonacci */ }
    },
    {
        id: 'j_steel_joker',
        name: "Steel Joker",
        description: "Gives X0.2&nbsp;Mult for each Steel Card in your full deck (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_steel_joker.png',
        effect: () => { /* TODO: Implement Steel Joker */ }
    },
    {
        id: 'j_scary_face',
        name: "Scary Face",
        description: "Played face cards give +30&nbsp;Chips when scored",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_scary_face.png',
        effect: () => { /* TODO: Implement Scary Face */ }
    },
    {
        id: 'j_abstract_joker',
        name: "Abstract Joker",
        description: "+3&nbsp;Mult for each Joker card(Currently +0&nbsp;Mult)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_abstract_joker.png',
        effect: () => { /* TODO: Implement Abstract Joker */ }
    },
    {
        id: 'j_delayed_gratification',
        name: "Delayed Gratification",
        description: "Earn $2 per discard if no discards are used by end of the round",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_delayed_gratification.png',
        effect: () => { /* TODO: Implement Delayed Gratification */ }
    },
    {
        id: 'j_hack',
        name: "Hack",
        description: "Retrigger each played 2, 3, 4, or 5",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_hack.png',
        effect: () => { /* TODO: Implement Hack */ }
    },
    {
        id: 'j_pareidolia',
        name: "Pareidolia",
        description: "All cards are considered face cards",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_pareidolia.png',
        effect: () => { /* TODO: Implement Pareidolia */ }
    },
    {
        id: 'j_gros_michel',
        name: "Gros Michel",
        description: "+15&nbsp;Mult1 in 6 chance this is destroyed at the end of round.",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_gros_michel.png',
        effect: () => { /* TODO: Implement Gros Michel */ }
    },
    {
        id: 'j_even_steven',
        name: "Even Steven",
        description: "Played cards with even rank give +4&nbsp;Mult when scored (10, 8, 6, 4, 2)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_even_steven.png',
        effect: () => { /* TODO: Implement Even Steven */ }
    },
    {
        id: 'j_odd_todd',
        name: "Odd Todd",
        description: "Played cards with odd rank give +31&nbsp;Chips when scored (A, 9, 7, 5, 3)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_odd_todd.png',
        effect: () => { /* TODO: Implement Odd Todd */ }
    },
    {
        id: 'j_scholar',
        name: "Scholar",
        description: "Played Aces give +20&nbsp;Chips and +4&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_scholar.png',
        effect: () => { /* TODO: Implement Scholar */ }
    },
    {
        id: 'j_business_card',
        name: "Business Card",
        description: "Played face cards have a 1 in 2 chance to give $2 when scored",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_business_card.png',
        effect: () => { /* TODO: Implement Business Card */ }
    },
    {
        id: 'j_supernova',
        name: "Supernova",
        description: "Adds the number of times poker hand has been played this run to Mult",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_supernova.png',
        effect: () => { /* TODO: Implement Supernova */ }
    },
    {
        id: 'j_ride_the_bus',
        name: "Ride the Bus",
        description: "This Joker gains +1&nbsp;Mult per consecutive hand played without a scoring face card (Currently +0&nbsp;Mult)",
        rarity: 'Common',
        cost: 6,
        image: '/images/jokers/j_ride_the_bus.png',
        effect: () => { /* TODO: Implement Ride the Bus */ }
    },
    {
        id: 'j_space_joker',
        name: "Space Joker",
        description: "1 in 4 chance to upgrade level of played poker hand",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_space_joker.png',
        effect: () => { /* TODO: Implement Space Joker */ }
    },
    {
        id: 'j_egg',
        name: "Egg",
        description: "Gains $3 of sell value at end of round",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_egg.png',
        effect: () => { /* TODO: Implement Egg */ }
    },
    {
        id: 'j_burglar',
        name: "Burglar",
        description: "When Blind is selected, gain +3 Hands and lose all discards",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_burglar.png',
        effect: () => { /* TODO: Implement Burglar */ }
    },
    {
        id: 'j_blackboard',
        name: "Blackboard",
        description: "X3&nbsp;Mult if all cards held in hand are &nbsp;Spades or &nbsp;Clubs",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_blackboard.png',
        effect: () => { /* TODO: Implement Blackboard */ }
    },
    {
        id: 'j_runner',
        name: "Runner",
        description: "Gains +15&nbsp;Chips if played hand contains a Straight (Currently +0&nbsp;Chips)",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_runner.png',
        effect: () => { /* TODO: Implement Runner */ }
    },
    {
        id: 'j_ice_cream',
        name: "Ice Cream",
        description: "+100&nbsp;Chips-5&nbsp;Chips for every hand played",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_ice_cream.png',
        effect: () => { /* TODO: Implement Ice Cream */ }
    },
    {
        id: 'j_dna',
        name: "DNA",
        description: "If first hand of round has only 1 card, add a permanent copy to deck and draw it to hand",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_dna.png',
        effect: () => { /* TODO: Implement DNA */ }
    },
    {
        id: 'j_splash',
        name: "Splash",
        description: "Every played card counts in scoring",
        rarity: 'Common',
        cost: 3,
        image: '/images/jokers/j_splash.png',
        effect: () => { /* TODO: Implement Splash */ }
    },
    {
        id: 'j_blue_joker',
        name: "Blue Joker",
        description: "+2&nbsp;Chips for each remaining card in deck (Currently +104&nbsp;Chips)",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_blue_joker.png',
        effect: () => { /* TODO: Implement Blue Joker */ }
    },
    {
        id: 'j_sixth_sense',
        name: "Sixth Sense",
        description: "If first hand of round is a single 6, destroy it and create a Spectral card (Must have room)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_sixth_sense.png',
        effect: () => { /* TODO: Implement Sixth Sense */ }
    },
    {
        id: 'j_constellation',
        name: "Constellation",
        description: "This Joker gains X0.1&nbsp;Mult every time a Planet card is used (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_constellation.png',
        effect: () => { /* TODO: Implement Constellation */ }
    },
    {
        id: 'j_hiker',
        name: "Hiker",
        description: "Every played card permanently gains +5&nbsp;Chips when scored",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_hiker.png',
        effect: () => { /* TODO: Implement Hiker */ }
    },
    {
        id: 'j_faceless_joker',
        name: "Faceless Joker",
        description: "Earn $5 if 3 or more face cards are discarded at the same time",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_faceless_joker.png',
        effect: () => { /* TODO: Implement Faceless Joker */ }
    },
    {
        id: 'j_green_joker',
        name: "Green Joker",
        description: "+1&nbsp;Mult per hand played -1&nbsp;Mult per discard (Currently +0&nbsp;Mult)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_green_joker.png',
        effect: () => { /* TODO: Implement Green Joker */ }
    },
    {
        id: 'j_superposition',
        name: "Superposition",
        description: "Create a Tarot card if poker hand contains an Ace and a Straight (Must have room)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_superposition.png',
        effect: () => { /* TODO: Implement Superposition */ }
    },
    {
        id: 'j_to_do_list',
        name: "To Do List",
        description: "Earn $4 if poker hand is a [Poker&nbsp;Hand], poker hand changes at end of round",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_to_do_list.png',
        effect: () => { /* TODO: Implement To Do List */ }
    },
    {
        id: 'j_cavendish',
        name: "Cavendish",
        description: "X3&nbsp;Mult 1 in 1000 chance this card is destroyed at the end of round",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_cavendish.png',
        effect: () => { /* TODO: Implement Cavendish */ }
    },
    {
        id: 'j_card_sharp',
        name: "Card Sharp",
        description: "X3&nbsp;Mult if played poker hand has already been played this round",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_card_sharp.png',
        effect: () => { /* TODO: Implement Card Sharp */ }
    },
    {
        id: 'j_red_card',
        name: "Red Card",
        description: "This Joker gains +3&nbsp;Mult when any Booster Pack is skipped (Currently +0&nbsp;Mult)",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_red_card.png',
        effect: () => { /* TODO: Implement Red Card */ }
    },
    {
        id: 'j_madness',
        name: "Madness",
        description: "When Small Blind or Big Blind is selected, gain X0.5&nbsp;Mult and destroy a random Joker (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_madness.png',
        effect: () => { /* TODO: Implement Madness */ }
    },
    {
        id: 'j_square_joker',
        name: "Square Joker",
        description: "This Joker gains +4&nbsp;Chips if played hand has exactly 4 cards (Currently 0&nbsp;Chips)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_square_joker.png',
        effect: () => { /* TODO: Implement Square Joker */ }
    },
    {
        id: 'j_s_ance',
        name: "Séance",
        description: "If poker hand is a Straight Flush, create a random Spectral card (Must have room)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_s_ance.png',
        effect: () => { /* TODO: Implement Séance */ }
    },
    {
        id: 'j_riff_raff',
        name: "Riff-Raff",
        description: "When Blind is selected, create 2 Common Jokers (Must have room)",
        rarity: 'Common',
        cost: 6,
        image: '/images/jokers/j_riff_raff.png',
        effect: () => { /* TODO: Implement Riff-Raff */ }
    },
    {
        id: 'j_vampire',
        name: "Vampire",
        description: "This Joker gains X0.1&nbsp;Mult per scoring Enhanced card played, removes card Enhancement (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_vampire.png',
        effect: () => { /* TODO: Implement Vampire */ }
    },
    {
        id: 'j_shortcut',
        name: "Shortcut",
        description: "Allows Straights to be made with gaps of 1 rank (ex: 10 8 6 5 3)",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_shortcut.png',
        effect: () => { /* TODO: Implement Shortcut */ }
    },
    {
        id: 'j_hologram',
        name: "Hologram",
        description: "This Joker gains X0.25&nbsp;Mult every time a playing card is added to your deck (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_hologram.gif',
        effect: () => { /* TODO: Implement Hologram */ }
    },
    {
        id: 'j_vagabond',
        name: "Vagabond",
        description: "Create a Tarot card if hand is played with $4 or less",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_vagabond.png',
        effect: () => { /* TODO: Implement Vagabond */ }
    },
    {
        id: 'j_baron',
        name: "Baron",
        description: "Each King held in hand gives X1.5&nbsp;Mult",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_baron.png',
        effect: () => { /* TODO: Implement Baron */ }
    },
    {
        id: 'j_cloud_9',
        name: "Cloud 9",
        description: "Earn $1 for each 9 in your full deck at end of round (Currently $4)",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_cloud_9.png',
        effect: () => { /* TODO: Implement Cloud 9 */ }
    },
    {
        id: 'j_rocket',
        name: "Rocket",
        description: "Earn $1 at end of round. Payout increases by $2 when Boss Blind is defeated",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_rocket.png',
        effect: () => { /* TODO: Implement Rocket */ }
    },
    {
        id: 'j_obelisk',
        name: "Obelisk",
        description: "This Joker gains X0.2&nbsp;Mult per consecutive hand played without playing your most played poker hand (Currently X1&nbsp;Mult)",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_obelisk.png',
        effect: () => { /* TODO: Implement Obelisk */ }
    },
    {
        id: 'j_midas_mask',
        name: "Midas Mask",
        description: "All played face cards become Gold cards when scored",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_midas_mask.png',
        effect: () => { /* TODO: Implement Midas Mask */ }
    },
    {
        id: 'j_luchador',
        name: "Luchador",
        description: "Sell this card to disable the current Boss Blind",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_luchador.png',
        effect: () => { /* TODO: Implement Luchador */ }
    },
    {
        id: 'j_photograph',
        name: "Photograph",
        description: "First played face card gives X2&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_photograph.png',
        effect: () => { /* TODO: Implement Photograph */ }
    },
    {
        id: 'j_gift_card',
        name: "Gift Card",
        description: "Add $1 of sell value to every Joker and Consumable card at end of round",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_gift_card.png',
        effect: () => { /* TODO: Implement Gift Card */ }
    },
    {
        id: 'j_turtle_bean',
        name: "Turtle Bean",
        description: "+5 hand size, reduces by 1 each round",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_turtle_bean.png',
        effect: () => { /* TODO: Implement Turtle Bean */ }
    },
    {
        id: 'j_erosion',
        name: "Erosion",
        description: "+4&nbsp;Mult for each card below [the deck's starting size] in your full deck (Currently +0&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_erosion.png',
        effect: () => { /* TODO: Implement Erosion */ }
    },
    {
        id: 'j_reserved_parking',
        name: "Reserved Parking",
        description: "Each face card held in hand has a 1 in 2 chance to give $1",
        rarity: 'Common',
        cost: 6,
        image: '/images/jokers/j_reserved_parking.png',
        effect: () => { /* TODO: Implement Reserved Parking */ }
    },
    {
        id: 'j_mail_in_rebate',
        name: "Mail-In Rebate",
        description: "Earn $5 for each discarded [rank], rank changes every round",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_mail_in_rebate.png',
        effect: () => { /* TODO: Implement Mail-In Rebate */ }
    },
    {
        id: 'j_to_the_moon',
        name: "To the Moon",
        description: "Earn an extra $1 of interest for every $5 you have at end of round",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_to_the_moon.png',
        effect: () => { /* TODO: Implement To the Moon */ }
    },
    {
        id: 'j_hallucination',
        name: "Hallucination",
        description: "1 in 2 chance to create a Tarot card when any Booster Pack is opened (Must have room)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_hallucination.png',
        effect: () => { /* TODO: Implement Hallucination */ }
    },
    {
        id: 'j_fortune_teller',
        name: "Fortune Teller",
        description: "+1&nbsp;Mult per Tarot card used this run (Currently +0)",
        rarity: 'Common',
        cost: 6,
        image: '/images/jokers/j_fortune_teller.png',
        effect: () => { /* TODO: Implement Fortune Teller */ }
    },
    {
        id: 'j_juggler',
        name: "Juggler",
        description: "+1 hand size",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_juggler.png',
        effect: () => { /* TODO: Implement Juggler */ }
    },
    {
        id: 'j_drunkard',
        name: "Drunkard",
        description: "+1 discard each round",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_drunkard.png',
        effect: () => { /* TODO: Implement Drunkard */ }
    },
    {
        id: 'j_stone_joker',
        name: "Stone Joker",
        description: "Gives +25&nbsp;Chips for each Stone Card in your full deck (Currently +0&nbsp;Chips)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_stone_joker.png',
        effect: () => { /* TODO: Implement Stone Joker */ }
    },
    {
        id: 'j_golden_joker',
        name: "Golden Joker",
        description: "Earn $4 at end of round",
        rarity: 'Common',
        cost: 6,
        image: '/images/jokers/j_golden_joker.png',
        effect: () => { /* TODO: Implement Golden Joker */ }
    },
    {
        id: 'j_lucky_cat',
        name: "Lucky Cat",
        description: "This Joker gains X0.25&nbsp;Mult every time a Lucky card successfully triggers (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_lucky_cat.png',
        effect: () => { /* TODO: Implement Lucky Cat */ }
    },
    {
        id: 'j_baseball_card',
        name: "Baseball Card",
        description: "Uncommon Jokers each give X1.5&nbsp;Mult",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_baseball_card.png',
        effect: () => { /* TODO: Implement Baseball Card */ }
    },
    {
        id: 'j_bull',
        name: "Bull",
        description: "+2&nbsp;Chips for each $1 you have (Currently +0&nbsp;Chips)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_bull.png',
        effect: () => { /* TODO: Implement Bull */ }
    },
    {
        id: 'j_diet_cola',
        name: "Diet Cola",
        description: "Sell this card to create a free Double Tag",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_diet_cola.png',
        effect: () => { /* TODO: Implement Diet Cola */ }
    },
    {
        id: 'j_trading_card',
        name: "Trading Card",
        description: "If first discard of round has only 1 card, destroy it and earn $3",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_trading_card.png',
        effect: () => { /* TODO: Implement Trading Card */ }
    },
    {
        id: 'j_flash_card',
        name: "Flash Card",
        description: "This Joker gains +2&nbsp;Mult per reroll in the shop (Currently +0&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_flash_card.png',
        effect: () => { /* TODO: Implement Flash Card */ }
    },
    {
        id: 'j_popcorn',
        name: "Popcorn",
        description: "+20&nbsp;Mult -4&nbsp;Mult per round played",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_popcorn.png',
        effect: () => { /* TODO: Implement Popcorn */ }
    },
    {
        id: 'j_spare_trousers',
        name: "Spare Trousers",
        description: "This Joker gains +2&nbsp;Mult if played hand contains a Two Pair (Currently +0&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_spare_trousers.png',
        effect: () => { /* TODO: Implement Spare Trousers */ }
    },
    {
        id: 'j_ancient_joker',
        name: "Ancient Joker",
        description: "Each played card with [suit] gives X1.5&nbsp;Mult when scored, suit changes at end of round",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_ancient_joker.png',
        effect: () => { /* TODO: Implement Ancient Joker */ }
    },
    {
        id: 'j_ramen',
        name: "Ramen",
        description: "X2&nbsp;Mult, loses X0.01&nbsp;Mult per card discarded",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_ramen.png',
        effect: () => { /* TODO: Implement Ramen */ }
    },
    {
        id: 'j_walkie_talkie',
        name: "Walkie Talkie",
        description: "Each played 10 or 4 gives +10&nbsp;Chips and +4&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_walkie_talkie.png',
        effect: () => { /* TODO: Implement Walkie Talkie */ }
    },
    {
        id: 'j_seltzer',
        name: "Seltzer",
        description: "Retrigger all cards played for the next 10 hands",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_seltzer.png',
        effect: () => { /* TODO: Implement Seltzer */ }
    },
    {
        id: 'j_castle',
        name: "Castle",
        description: "This Joker gains +3&nbsp;Chips per discarded [suit] card, suit changes every round (Currently +0&nbsp;Chips)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_castle.png',
        effect: () => { /* TODO: Implement Castle */ }
    },
    {
        id: 'j_smiley_face',
        name: "Smiley Face",
        description: "Played face cards give +5&nbsp;Mult when scored",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_smiley_face.png',
        effect: () => { /* TODO: Implement Smiley Face */ }
    },
    {
        id: 'j_campfire',
        name: "Campfire",
        description: "This Joker gains X0.25&nbsp;Mult for each card sold, resets when Boss Blind is defeated (Currently X1&nbsp;Mult)",
        rarity: 'Rare',
        cost: 9,
        image: '/images/jokers/j_campfire.png',
        effect: () => { /* TODO: Implement Campfire */ }
    },
    {
        id: 'j_golden_ticket',
        name: "Golden Ticket",
        description: "Played Gold cards earn $4 when scored",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_golden_ticket.png',
        effect: () => { /* TODO: Implement Golden Ticket */ }
    },
    {
        id: 'j_mr__bones',
        name: "Mr. Bones",
        description: "Prevents Death if chips scored are at least 25% of required chips self destructs",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_mr__bones.png',
        effect: () => { /* TODO: Implement Mr. Bones */ }
    },
    {
        id: 'j_acrobat',
        name: "Acrobat",
        description: "X3&nbsp;Mult on final hand of round",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_acrobat.png',
        effect: () => { /* TODO: Implement Acrobat */ }
    },
    {
        id: 'j_sock_and_buskin',
        name: "Sock and Buskin",
        description: "Retrigger all played face cards",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_sock_and_buskin.png',
        effect: () => { /* TODO: Implement Sock and Buskin */ }
    },
    {
        id: 'j_swashbuckler',
        name: "Swashbuckler",
        description: "Adds the sell value of all other owned Jokers to Mult (Currently +1&nbsp;Mult)",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_swashbuckler.png',
        effect: () => { /* TODO: Implement Swashbuckler */ }
    },
    {
        id: 'j_troubadour',
        name: "Troubadour",
        description: "+2 hand size, -1 hand each round",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_troubadour.png',
        effect: () => { /* TODO: Implement Troubadour */ }
    },
    {
        id: 'j_certificate',
        name: "Certificate",
        description: "When round begins, add a random playing card with a random seal to your hand",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_certificate.png',
        effect: () => { /* TODO: Implement Certificate */ }
    },
    {
        id: 'j_smeared_joker',
        name: "Smeared Joker",
        description: "&nbsp;Hearts and &nbsp;Diamonds count as the same suit, &nbsp;Spades and &nbsp;Clubs count as the same suit",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_smeared_joker.png',
        effect: () => { /* TODO: Implement Smeared Joker */ }
    },
    {
        id: 'j_throwback',
        name: "Throwback",
        description: "X0.25&nbsp;Mult for each Blind skipped this run (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_throwback.png',
        effect: () => { /* TODO: Implement Throwback */ }
    },
    {
        id: 'j_hanging_chad',
        name: "Hanging Chad",
        description: "Retrigger first played card used in scoring 2 additional times",
        rarity: 'Common',
        cost: 4,
        image: '/images/jokers/j_hanging_chad.png',
        effect: () => { /* TODO: Implement Hanging Chad */ }
    },
    {
        id: 'j_rough_gem',
        name: "Rough Gem",
        description: "Played cards with &nbsp;Diamond suit earn $1 when scored",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_rough_gem.png',
        effect: () => { /* TODO: Implement Rough Gem */ }
    },
    {
        id: 'j_bloodstone',
        name: "Bloodstone",
        description: "1 in 2 chance for played cards with &nbsp;Heart suit to give X1.5&nbsp;Mult when scored",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_bloodstone.png',
        effect: () => { /* TODO: Implement Bloodstone */ }
    },
    {
        id: 'j_arrowhead',
        name: "Arrowhead",
        description: "Played cards with &nbsp;Spade suit give +50&nbsp;Chips when scored",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_arrowhead.png',
        effect: () => { /* TODO: Implement Arrowhead */ }
    },
    {
        id: 'j_onyx_agate',
        name: "Onyx Agate",
        description: "Played cards with &nbsp;Club suit give +7&nbsp;Mult when scored",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_onyx_agate.png',
        effect: () => { /* TODO: Implement Onyx Agate */ }
    },
    {
        id: 'j_glass_joker',
        name: "Glass Joker",
        description: "This Joker gains X0.75&nbsp;Mult for every Glass Card that is destroyed (Currently X1&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_glass_joker.png',
        effect: () => { /* TODO: Implement Glass Joker */ }
    },
    {
        id: 'j_showman',
        name: "Showman",
        description: "Joker, Tarot, Planet, and Spectral cards may appear multiple times",
        rarity: 'Uncommon',
        cost: 5,
        image: '/images/jokers/j_showman.png',
        effect: () => { /* TODO: Implement Showman */ }
    },
    {
        id: 'j_flower_pot',
        name: "Flower Pot",
        description: "X3&nbsp;Mult if poker hand contains a &nbsp;Diamond card, &nbsp;Club card, &nbsp;Heart card, and &nbsp;Spade card",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_flower_pot.png',
        effect: () => { /* TODO: Implement Flower Pot */ }
    },
    {
        id: 'j_blueprint',
        name: "Blueprint",
        description: "Copies ability of Joker to the right",
        rarity: 'Rare',
        cost: 10,
        image: '/images/jokers/j_blueprint.png',
        effect: () => { /* TODO: Implement Blueprint */ }
    },
    {
        id: 'j_wee_joker',
        name: "Wee Joker",
        description: "This Joker gains +8&nbsp;Chips when each played 2 is scored (Currently +0&nbsp;Chips)",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_wee_joker.png',
        effect: () => { /* TODO: Implement Wee Joker */ }
    },
    {
        id: 'j_merry_andy',
        name: "Merry Andy",
        description: "+3 discards each round, -1 hand size",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_merry_andy.png',
        effect: () => { /* TODO: Implement Merry Andy */ }
    },
    {
        id: 'j_oops__all_6s',
        name: "Oops! All 6s",
        description: "Doubles all listed probabilities (ex: 1 in 3 -&gt; 2 in 3)",
        rarity: 'Uncommon',
        cost: 4,
        image: '/images/jokers/j_oops__all_6s.png',
        effect: () => { /* TODO: Implement Oops! All 6s */ }
    },
    {
        id: 'j_the_idol',
        name: "The Idol",
        description: "Each played [rank] of [suit] gives X2&nbsp;Mult when scoredRank and Suit of a Card changes every round",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_the_idol.png',
        effect: () => { /* TODO: Implement The Idol */ }
    },
    {
        id: 'j_seeing_double',
        name: "Seeing Double",
        description: "X2&nbsp;Mult if played hand has a scoring &nbsp;Club card and a scoring card of any other suit",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_seeing_double.png',
        effect: () => { /* TODO: Implement Seeing Double */ }
    },
    {
        id: 'j_matador',
        name: "Matador",
        description: "Earn $8 if played hand triggers the Boss Blind ability",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_matador.png',
        effect: () => { /* TODO: Implement Matador */ }
    },
    {
        id: 'j_hit_the_road',
        name: "Hit the Road",
        description: "This Joker gains X0.5&nbsp;Mult for every Jack discarded this round (Currently X1&nbsp;Mult)",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_hit_the_road.png',
        effect: () => { /* TODO: Implement Hit the Road */ }
    },
    {
        id: 'j_the_duo',
        name: "The Duo",
        description: "X2&nbsp;Mult if played hand contains a Pair",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_the_duo.png',
        effect: () => { /* TODO: Implement The Duo */ }
    },
    {
        id: 'j_the_trio',
        name: "The Trio",
        description: "X3&nbsp;Mult if played hand contains a Three of a Kind",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_the_trio.png',
        effect: () => { /* TODO: Implement The Trio */ }
    },
    {
        id: 'j_the_family',
        name: "The Family",
        description: "X4&nbsp;Mult if played hand contains a Four of a Kind",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_the_family.png',
        effect: () => { /* TODO: Implement The Family */ }
    },
    {
        id: 'j_the_order',
        name: "The Order",
        description: "X3&nbsp;Mult if played hand contains a Straight",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_the_order.png',
        effect: () => { /* TODO: Implement The Order */ }
    },
    {
        id: 'j_the_tribe',
        name: "The Tribe",
        description: "X2&nbsp;Mult if played hand contains a Flush",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_the_tribe.png',
        effect: () => { /* TODO: Implement The Tribe */ }
    },
    {
        id: 'j_stuntman',
        name: "Stuntman",
        description: "+250&nbsp;Chips,-2 hand size",
        rarity: 'Rare',
        cost: 7,
        image: '/images/jokers/j_stuntman.png',
        effect: () => { /* TODO: Implement Stuntman */ }
    },
    {
        id: 'j_invisible_joker',
        name: "Invisible Joker",
        description: "After 2 rounds, sell this card to Duplicate a random Joker (Currently 0/2) (Removes Negative from copy)",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_invisible_joker.png',
        effect: () => { /* TODO: Implement Invisible Joker */ }
    },
    {
        id: 'j_brainstorm',
        name: "Brainstorm",
        description: "Copies the ability of leftmost Joker",
        rarity: 'Rare',
        cost: 10,
        image: '/images/jokers/j_brainstorm.png',
        effect: () => { /* TODO: Implement Brainstorm */ }
    },
    {
        id: 'j_satellite',
        name: "Satellite",
        description: "Earn $1 at end of round per unique Planet card used this run",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_satellite.png',
        effect: () => { /* TODO: Implement Satellite */ }
    },
    {
        id: 'j_shoot_the_moon',
        name: "Shoot the Moon",
        description: "Each Queen held in hand gives +13&nbsp;Mult",
        rarity: 'Common',
        cost: 5,
        image: '/images/jokers/j_shoot_the_moon.png',
        effect: () => { /* TODO: Implement Shoot the Moon */ }
    },
    {
        id: 'j_driver_s_license',
        name: "Driver's License",
        description: "X3&nbsp;Mult if you have at least 16 Enhanced cards in your full deck (Currently 0)",
        rarity: 'Rare',
        cost: 7,
        image: '/images/jokers/j_driver_s_license.png',
        effect: () => { /* TODO: Implement Driver's License */ }
    },
    {
        id: 'j_cartomancer',
        name: "Cartomancer",
        description: "Create a Tarot card when Blind is selected (Must have room)",
        rarity: 'Uncommon',
        cost: 6,
        image: '/images/jokers/j_cartomancer.png',
        effect: () => { /* TODO: Implement Cartomancer */ }
    },
    {
        id: 'j_astronomer',
        name: "Astronomer",
        description: "All Planet cards and Celestial Packs in the shop are free",
        rarity: 'Uncommon',
        cost: 8,
        image: '/images/jokers/j_astronomer.png',
        effect: () => { /* TODO: Implement Astronomer */ }
    },
    {
        id: 'j_burnt_joker',
        name: "Burnt Joker",
        description: "Upgrade the level of the first discarded poker hand each round",
        rarity: 'Rare',
        cost: 8,
        image: '/images/jokers/j_burnt_joker.png',
        effect: () => { /* TODO: Implement Burnt Joker */ }
    },
    {
        id: 'j_bootstraps',
        name: "Bootstraps",
        description: "+2&nbsp;Mult for every $5 you have (Currently +0&nbsp;Mult)",
        rarity: 'Uncommon',
        cost: 7,
        image: '/images/jokers/j_bootstraps.png',
        effect: () => { /* TODO: Implement Bootstraps */ }
    },
];