<script lang="ts">
    import { flip } from 'svelte/animate';
    import { game } from '$lib/stores/game';
    import type { Card } from '$lib/types';
    import CardComponent from './Card.svelte';

    export let cards: Card[] = [];

    function handleCardClick(cardId: string) {
        game.selectCard(cardId);
    }
</script>

<div class="hand-container">
    {#each cards as card (card.id)}
        <div animate:flip={{ duration: 300 }} class="card-wrapper">
            <CardComponent 
                {card} 
                onClick={() => handleCardClick(card.id)} 
            />
        </div>
    {/each}
</div>

<style>
    .hand-container {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: -40px; /* Overlap cards */
        padding: 20px;
        height: 200px;
        width: 100%;
        overflow-x: auto; /* In case of too many cards */
    }

    .card-wrapper {
        margin-right: -30px; /* Overlap effect */
        transition: margin 0.2s;
    }

    .card-wrapper:hover {
        margin-right: 0px; /* Expand on hover */
        z-index: 100;
    }

    .card-wrapper:last-child {
        margin-right: 0;
    }
</style>
