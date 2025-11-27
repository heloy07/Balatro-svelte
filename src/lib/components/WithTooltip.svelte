<script lang="ts">
    import Tooltip from './Tooltip.svelte';
    import type { Card, Joker, Consumable, Voucher, Pack } from '$lib/types';
    import type { Tag } from '$lib/data/tags';

    // Accept different item types
    export let card: Card | undefined = undefined;
    export let joker: Joker | undefined = undefined;
    export let consumable: Consumable | undefined = undefined;
    export let voucher: Voucher | undefined = undefined;
    export let pack: Pack | undefined = undefined;
    export let tag: Tag | undefined = undefined;

    let isHovered = false;
    let tooltipX = 0;
    let tooltipY = 0;

    // Determine the tooltip item based on props
    $: tooltipItem = card ? { type: 'card' as const, data: card }
        : joker ? { type: 'joker' as const, data: joker }
        : consumable ? { type: 'consumable' as const, data: consumable }
        : voucher ? { type: 'voucher' as const, data: voucher }
        : pack ? { type: 'pack' as const, data: pack }
        : tag ? { type: 'tag' as const, data: tag }
        : null;

    function handleMouseEnter(e: MouseEvent) {
        if (!tooltipItem) return;
        isHovered = true;
        updatePosition(e);
    }

    function handleMouseMove(e: MouseEvent) {
        if (!isHovered) return;
        updatePosition(e);
    }

    function handleMouseLeave() {
        isHovered = false;
    }

    function updatePosition(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        tooltipX = rect.left + rect.width / 2;
        tooltipY = rect.top;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="with-tooltip"
    on:mouseenter={handleMouseEnter}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
>
    <slot />
</div>

{#if tooltipItem}
    <Tooltip item={tooltipItem} visible={isHovered} x={tooltipX} y={tooltipY} />
{/if}

<style>
    .with-tooltip {
        display: contents;
    }
</style>
