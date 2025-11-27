<script lang="ts">
    import type { Tag } from '$lib/data/tags';
    import Tooltip from './Tooltip.svelte';

    export let tag: Tag;
    export let size: number = 68; // Default size matches sprite size
    export let showTooltip: boolean = true; // Enable tooltip by default
    
    // Sprite sheet is 408x340 pixels but we only use 4 rows (24 tags)
    // 6 columns x 4 rows = 24 tags (row 5 has question mark, ignored)
    // Each tag is 68x68 pixels
    const COLUMNS = 6;
    const ROWS = 4;
    const SPRITE_WIDTH = 68;  // 408 / 6 = 68
    const SPRITE_HEIGHT = 68; // Using 68px per row (4 rows of content)
    
    $: row = Math.floor(tag.spriteIndex / COLUMNS);
    $: col = tag.spriteIndex % COLUMNS;
    $: scale = size / SPRITE_WIDTH;
    $: tooltipItem = { type: 'tag' as const, data: tag };

    let isHovered = false;
    let tooltipX = 0;
    let tooltipY = 0;

    function handleMouseEnter(e: MouseEvent) {
        if (!showTooltip) return;
        isHovered = true;
        updateTooltipPosition(e);
    }

    function handleMouseMove(e: MouseEvent) {
        if (!showTooltip || !isHovered) return;
        updateTooltipPosition(e);
    }

    function handleMouseLeave() {
        isHovered = false;
    }

    function updateTooltipPosition(e: MouseEvent) {
        const element = e.currentTarget as HTMLElement;
        const rect = element.getBoundingClientRect();
        tooltipX = rect.left + rect.width / 2;
        tooltipY = rect.top;
    }
</script>

<div 
    class="tag-sprite" 
    style="
        --size: {size}px;
        --bg-x: {-col * SPRITE_WIDTH * scale}px;
        --bg-y: {-row * SPRITE_HEIGHT * scale}px;
        --bg-size: {408 * scale}px {340 * scale}px;
    "
    on:mouseenter={handleMouseEnter}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    role="img"
    aria-label="{tag.name}"
></div>

{#if showTooltip}
    <Tooltip item={tooltipItem} visible={isHovered} x={tooltipX} y={tooltipY} />
{/if}

<style>
    .tag-sprite {
        width: var(--size);
        height: var(--size);
        background-image: url('/images/sprites/tags.png');
        background-repeat: no-repeat;
        background-position: var(--bg-x) var(--bg-y);
        background-size: var(--bg-size);
        image-rendering: pixelated;
        cursor: pointer;
    }

    .tag-sprite:hover {
        filter: brightness(1.2);
    }
</style>
