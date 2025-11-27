<script lang="ts">
    import type { Card } from '$lib/types';
    import Tooltip from './Tooltip.svelte';

    export let card: Card;
    export let onClick: () => void;

    // Calculate sprite position based on rank and suit
    function getSpritePosition(rank: string, suit: string): { x: number, y: number } {
        // Sprite sheet layout:
        // Row 0 (y=0): Hearts - 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
        // Row 1 (y=1): Clubs - 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
        // Row 2 (y=2): Diamonds - 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
        // Row 3 (y=3): Spades - 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
        
        const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const suitOrder = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
        
        const rankIndex = rankOrder.indexOf(rank);
        const suitIndex = suitOrder.indexOf(suit);
        
        // Original sprite dimensions
        const originalCardWidth = 71;
        const originalCardHeight = 96;
        
        // Scale factor (we're displaying at 2x)
        const scale = 2;
        
        return {
            x: rankIndex * originalCardWidth * scale,
            y: suitIndex * originalCardHeight * scale
        };
    }

    $: spritePos = getSpritePosition(card.rank, card.suit);
    $: tooltipItem = { type: 'card' as const, data: card };

    function toggleSelect() {
        if (onClick) onClick();
    }

    // Tooltip state
    let isHovered = false;
    let tooltipX = 0;
    let tooltipY = 0;

    function handleMouseEnter(e: MouseEvent) {
        isHovered = true;
        updateTooltipPosition(e);
    }

    function handleMouseMove(e: MouseEvent) {
        if (isHovered) updateTooltipPosition(e);
    }

    function handleMouseLeave() {
        isHovered = false;
    }

    function updateTooltipPosition(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        tooltipX = rect.left + rect.width / 2;
        tooltipY = rect.top;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="card {card.edition ? card.edition.toLowerCase() : ''}" 
    class:selected={card.is_selected}
    on:click={toggleSelect}
    on:mouseenter={handleMouseEnter}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
>
    <div 
        class="card-sprite"
        style="background-position: -{spritePos.x}px -{spritePos.y}px"
    ></div>
    
    {#if card.enhancement}
        <div class="enhancement">{card.enhancement}</div>
    {/if}
    {#if card.edition}
        <div class="edition">{card.edition}</div>
    {/if}
</div>

<Tooltip item={tooltipItem} visible={isHovered} x={tooltipX} y={tooltipY} />

<style>
    .card {
        width: 142px;  /* 71px * 2 */
        height: 192px; /* 96px * 2 */
        position: relative;
        cursor: pointer;
        transition: transform 0.1s, box-shadow 0.1s;
        user-select: none;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
        background-color: white;
        border-style: solid;
        border-width: 2px;
        border-color: #ccc;
    }

    .card-sprite {
        width: 100%;
        height: 100%;
        background-image: url('/images/Playing Cards.png');
        background-size: 1846px 768px; /* 13 cards * 142px width, 4 suits * 192px height (2x scale) */
        background-repeat: no-repeat;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
    }

    .card:hover {
        transform: translateY(-15px);
        z-index: 10;
    }

    .card.selected {
        transform: translateY(-25px);
        box-shadow: 0 0 0 4px var(--primary-orange);
        z-index: 20;
    }

    /* Modifiers */
    .enhancement {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.7rem;
        color: #333;
        background: var(--accent-gold);
        padding: 2px 6px;
        border-radius: 10px;
        white-space: nowrap;
        z-index: 2;
        border: 1px solid #fff;
        box-shadow: 0 2px 0 rgba(0,0,0,0.2);
        font-family: 'Jersey 10', monospace;
        font-weight: bold;
    }

    .edition {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.7rem;
        color: white;
        background: #333;
        padding: 2px 6px;
        border-radius: 10px;
        white-space: nowrap;
        z-index: 2;
        border: 1px solid #fff;
        box-shadow: 0 2px 0 rgba(0,0,0,0.2);
        font-family: 'Jersey 10', monospace;
        font-weight: bold;
    }
    
    .card.foil .card-sprite {
        filter: brightness(1.2) contrast(1.1);
        box-shadow: inset 0 0 20px rgba(255,255,255,0.5);
    }
    
    .card.holographic .card-sprite {
        filter: hue-rotate(180deg) saturate(1.5);
        box-shadow: inset 0 0 20px cyan;
    }
    
    .card.polychrome .card-sprite {
        filter: hue-rotate(270deg) saturate(1.5);
        box-shadow: inset 0 0 20px violet;
    }
</style>
