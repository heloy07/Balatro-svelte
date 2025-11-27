<script lang="ts">
    import { onMount } from 'svelte';
    import type { Card, Joker, Consumable, Voucher, Pack } from '$lib/types';
    import type { Tag } from '$lib/data/tags';

    // Union type for all items that can have tooltips
    type TooltipItem = 
        | { type: 'card'; data: Card }
        | { type: 'joker'; data: Joker }
        | { type: 'consumable'; data: Consumable }
        | { type: 'voucher'; data: Voucher }
        | { type: 'pack'; data: Pack }
        | { type: 'tag'; data: Tag };

    export let item: TooltipItem;
    export let visible: boolean = false;
    export let x: number = 0;
    export let y: number = 0;

    // Parse HTML entities and clean up description text
    function cleanDescription(text: string): string {
        if (!text) return '';
        return text
            .replace(/&nbsp;/g, ' ')
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/\.mw-parser-output[^}]+}/g, '') // Remove wiki CSS
            .trim();
    }

    // Get display info based on item type
    function getDisplayInfo(item: TooltipItem) {
        switch (item.type) {
            case 'card': {
                const card = item.data;
                const suitColors: Record<string, string> = {
                    'Hearts': '#ff6b6b',
                    'Diamonds': '#4dabf7',
                    'Clubs': '#51cf66',
                    'Spades': '#868e96'
                };
                return {
                    title: `${card.rank} of ${card.suit}`,
                    titleColor: suitColors[card.suit] || '#fff',
                    description: `+${card.score} chips`,
                    extra: [
                        card.enhancement ? `Enhancement: ${card.enhancement}` : null,
                        card.edition ? `Edition: ${card.edition}` : null
                    ].filter(Boolean)
                };
            }
            case 'joker': {
                const joker = item.data;
                const rarityColors: Record<string, string> = {
                    'Common': '#6c757d',
                    'Uncommon': '#51cf66',
                    'Rare': '#ff6b6b',
                    'Legendary': '#da77f2'
                };
                return {
                    title: joker.name,
                    titleColor: rarityColors[joker.rarity] || '#fff',
                    description: cleanDescription(joker.description),
                    rarity: joker.rarity,
                    extra: []
                };
            }
            case 'consumable': {
                const consumable = item.data;
                const typeColors: Record<string, string> = {
                    'Tarot': '#da77f2',
                    'Planet': '#4dabf7',
                    'Spectral': '#868e96'
                };
                return {
                    title: consumable.name,
                    titleColor: typeColors[consumable.type] || '#fff',
                    description: cleanDescription(consumable.description),
                    subtitle: consumable.type,
                    extra: []
                };
            }
            case 'voucher': {
                const voucher = item.data;
                return {
                    title: voucher.name,
                    titleColor: '#ffd43b',
                    description: cleanDescription(voucher.description),
                    extra: []
                };
            }
            case 'pack': {
                const pack = item.data;
                const packColors: Record<string, string> = {
                    'Buffoon': '#ff6b6b',
                    'Celestial': '#4dabf7',
                    'Standard': '#868e96',
                    'Arcana': '#da77f2',
                    'Spectral': '#495057'
                };
                return {
                    title: pack.name,
                    titleColor: packColors[pack.type] || '#fff',
                    description: cleanDescription(pack.description),
                    subtitle: `${pack.type} Pack`,
                    extra: []
                };
            }
            case 'tag': {
                const tag = item.data;
                return {
                    title: tag.name,
                    titleColor: '#4ecdc4',
                    description: tag.effect,
                    extra: []
                };
            }
            default:
                return {
                    title: 'Unknown',
                    titleColor: '#fff',
                    description: '',
                    extra: []
                };
        }
    }

    $: displayInfo = getDisplayInfo(item);
</script>

{#if visible}
    <div 
        class="tooltip"
        style="left: {x}px; top: {y}px;"
    >
        <div class="tooltip-header">
            {#if displayInfo.subtitle}
                <span class="tooltip-subtitle">{displayInfo.subtitle}</span>
            {/if}
            <span class="tooltip-title" style="color: {displayInfo.titleColor}">{displayInfo.title}</span>
            {#if displayInfo.rarity}
                <span class="tooltip-rarity {displayInfo.rarity.toLowerCase()}">{displayInfo.rarity}</span>
            {/if}
        </div>
        <div class="tooltip-body">
            <p class="tooltip-description">{displayInfo.description}</p>
            {#if displayInfo.extra && displayInfo.extra.length > 0}
                <div class="tooltip-extra">
                    {#each displayInfo.extra as info}
                        <span class="extra-info">{info}</span>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .tooltip {
        position: fixed;
        z-index: 10000;
        background: linear-gradient(180deg, #2a2a3e 0%, #1a1a2e 100%);
        border: 3px solid #555;
        border-radius: 8px;
        padding: 0;
        min-width: 180px;
        max-width: 280px;
        box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        pointer-events: none;
        transform: translate(-50%, -100%);
        margin-top: -10px;
    }

    .tooltip-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        background: linear-gradient(180deg, #3a3a50 0%, #2a2a40 100%);
        border-radius: 5px 5px 0 0;
        border-bottom: 2px solid #444;
        gap: 2px;
    }

    .tooltip-subtitle {
        color: #888;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .tooltip-title {
        font-size: 1.1rem;
        font-weight: bold;
        text-shadow: 1px 1px 2px #000;
        text-align: center;
    }

    .tooltip-rarity {
        font-size: 0.7rem;
        padding: 2px 8px;
        border-radius: 10px;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 2px;
    }

    .tooltip-rarity.common {
        background: #6c757d;
        color: white;
    }

    .tooltip-rarity.uncommon {
        background: #2b8a3e;
        color: white;
    }

    .tooltip-rarity.rare {
        background: #c92a2a;
        color: white;
    }

    .tooltip-rarity.legendary {
        background: #7048e8;
        color: white;
    }

    .tooltip-body {
        padding: 10px 12px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0 0 5px 5px;
    }

    .tooltip-description {
        color: #ddd;
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0;
        text-align: center;
    }

    .tooltip-extra {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #444;
    }

    .extra-info {
        color: #aaa;
        font-size: 0.75rem;
        text-align: center;
    }
</style>
