<script lang="ts">
    import { onMount } from 'svelte';
    import { game } from '$lib/stores/game';
    import Hand from '$lib/components/Hand.svelte';
    import Shop from '$lib/components/Shop.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import BlindSelect from '$lib/components/BlindSelect.svelte';
    import BackgroundShader from '$lib/components/BackgroundShader.svelte';
    import { evaluateHand } from '$lib/utils/poker';
    import type { PokerHand } from '$lib/types';

    // Initialize game
    onMount(() => {
        game.startGame();
    });

    // Reactive derived state
    $: selectedCards = $game.hand.filter(c => c.is_selected);
    $: currentHand = selectedCards.length > 0 ? evaluateHand(selectedCards) : null;
    
    function playHand() {
        if (!currentHand) return;
        
        // Play the hand via the store
        game.playHand(currentHand.cards, currentHand.chips, currentHand.mult, currentHand.name);
    }

    function discardHand() {
        game.discard();
    }

    // Dev mode: Quick access to shop
    function devSkipToShop() {
        game.enterShop();
    }

    function devSkipToBoss() {
        game.debugBoss();
    }
</script>

<div class="game-container">
    <BackgroundShader />
    
    <div class="dev-controls">
        <button on:click={devSkipToShop}>Shop</button>
        <button on:click={devSkipToBoss}>Boss</button>
    </div>
    
    {#if $game.state === 'shop'}
        <Shop />
    {:else if $game.state === 'blind_select'}
        <!-- Sidebar for Blind Select -->
        <Sidebar mode="blind_select" />
        
        <!-- Blind Selection Area -->
        <div class="main-area">
            <!-- Top Section: Jokers and Consumables -->
            <div class="top-section">
                <!-- Jokers Area -->
                <div class="jokers-area">
                    <div class="area-label">Jokers ({$game.jokers.length}/5)</div>
                    <div class="slots-row">
                        {#each $game.jokers as joker}
                            <div class="joker-card" title="{joker.name}: {joker.description}">
                                <div class="joker-name">{joker.name}</div>
                                <div class="joker-rarity {joker.rarity.toLowerCase()}">{joker.rarity}</div>
                            </div>
                        {/each}
                        {#each Array(5 - $game.jokers.length) as _}
                            <div class="empty-slot"></div>
                        {/each}
                    </div>
                </div>

                <!-- Consumables Area -->
                <div class="consumables-area">
                    <div class="area-label">Consumables ({$game.consumables.length}/{$game.max_consumables})</div>
                    <div class="slots-row">
                        {#each $game.consumables as consumable}
                            <div class="consumable-card">
                                {consumable.name}
                            </div>
                        {/each}
                        {#each Array($game.max_consumables - $game.consumables.length) as _}
                            <div class="empty-slot"></div>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Blind Selection Panels -->
            <BlindSelect />
        </div>
    {:else}
        <!-- Sidebar (HUD) -->
        <Sidebar mode="game" />

        <!-- Main Game Area -->
        <div class="main-area">
            <!-- Top Section: Jokers and Consumables -->
            <div class="top-section">
                <!-- Jokers Area -->
                <div class="jokers-area">
                    <div class="area-label">Jokers ({$game.jokers.length}/5)</div>
                    <div class="slots-row">
                        {#each $game.jokers as joker}
                            <div class="joker-card" title="{joker.name}: {joker.description}">
                                <div class="joker-name">{joker.name}</div>
                                <div class="joker-rarity {joker.rarity.toLowerCase()}">{joker.rarity}</div>
                            </div>
                        {/each}
                        {#each Array(5 - $game.jokers.length) as _}
                            <div class="empty-slot"></div>
                        {/each}
                    </div>
                </div>

                <!-- Consumables Area -->
                <div class="consumables-area">
                    <div class="area-label">Consumables ({$game.consumables.length}/{$game.max_consumables})</div>
                    <div class="slots-row">
                        {#each $game.consumables as consumable}
                            <div class="consumable-card">
                                {consumable.name}
                            </div>
                        {/each}
                        {#each Array($game.max_consumables - $game.consumables.length) as _}
                            <div class="empty-slot"></div>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Play Area (Center) -->
            <div class="play-area">
                {#if $game.state === 'game_over'}
                    <div class="game-over-modal">
                        <h1>GAME OVER</h1>
                        <button class="btn play" on:click={() => game.startGame()}>New Run</button>
                    </div>
                {:else if $game.state === 'won_blind'}
                    <div class="won-blind-modal">
                        <h1>BLIND DEFEATED</h1>
                        <p>Score: {$game.current_score}</p>
                        <button class="btn play" on:click={() => game.enterShop()}>Go to Shop</button>
                    </div>
                {:else}
                    <!-- Played Cards Animation Area -->
                    {#if $game.played_hand.length > 0}
                         <!-- This would be where played cards are shown, but for now we just show the hand below -->
                    {/if}
                {/if}
            </div>

            <!-- Bottom Section: Hand and Actions -->
            <div class="bottom-section">
                <div class="hand-container">
                    <Hand cards={$game.hand} />
                </div>
                
                <div class="actions-container">
                    <div class="play-controls">
                        <button class="action-btn play-btn" on:click={playHand} disabled={!currentHand || selectedCards.length > 5 || $game.hands <= 0}>
                            Play Hand
                        </button>
                        <button class="action-btn discard-btn" on:click={discardHand} disabled={selectedCards.length === 0 || $game.discards <= 0}>
                            Discard
                        </button>
                    </div>
                    <div class="sort-controls">
                        <button class="sort-btn" on:click={() => game.sortHand('rank')}>Sort Rank</button>
                        <button class="sort-btn" on:click={() => game.sortHand('suit')}>Sort Suit</button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .game-container {
        display: flex;
        height: 100vh;
        width: 100vw;
        font-family: var(--font-pixel);
        overflow: hidden; /* Prevent scrollbars if shader is slightly off */
    }

    /* Main Area */
    .main-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        position: relative;
        /* Ensure main area content is above background but below modals if any */
        z-index: 1; 
    }

    .top-section {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        gap: 20px;
    }

    .area-label {
        font-size: 0.8rem;
        color: #aaa;
        text-transform: uppercase;
        margin-bottom: 5px;
        margin-left: 5px;
        text-shadow: 1px 1px 0 #000;
    }

    .slots-row {
        display: flex;
        gap: 10px;
    }

    .jokers-area {
        flex: 2;
    }

    .consumables-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .consumables-area .area-label {
        align-self: flex-start; /* Keep label left aligned relative to the group if desired, or flex-end */
        margin-left: 0;
        margin-right: 5px;
    }
    .consumables-area .slots-row {
        justify-content: flex-end;
    }

    .joker-card, .consumable-card, .empty-slot {
        width: 70px;
        height: 95px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 0.7rem;
        position: relative;
        box-sizing: border-box;
        box-shadow: 0 4px 0 rgba(0,0,0,0.3);
    }

    .joker-card {
        background: #333;
        border: 2px solid #555;
        color: white;
        flex-direction: column;
        padding: 5px;
    }

    .joker-name { font-weight: bold; margin-bottom: 5px; color: var(--primary-orange); }
    .joker-rarity { 
        font-size: 0.6rem; 
        padding: 1px 4px; 
        border-radius: 3px; 
        background: #000;
        margin-top: auto;
    }
    .joker-rarity.common { color: white; }
    .joker-rarity.uncommon { color: #457B9D; }
    .joker-rarity.rare { color: #E63946; }

    .consumable-card {
        background: #2a2a4a;
        border: 2px solid #4a4a8a;
        color: #aaddff;
    }

    .empty-slot {
        border: 2px dashed rgba(255,255,255,0.1);
        background: rgba(0,0,0,0.2);
    }

    .play-area {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bottom-section {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .actions-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }

    .play-controls {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .sort-controls {
        display: flex;
        gap: 5px;
    }

    .action-btn {
        padding: 15px 30px;
        font-family: var(--font-pixel);
        font-size: 1.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        box-shadow: 0 4px 0 rgba(0,0,0,0.3);
        transition: transform 0.1s, box-shadow 0.1s;
        width: 100%;
        font-weight: bold;
        color: white;
    }
    .action-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 rgba(0,0,0,0.3); }
    .action-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

    .play-btn { background-color: var(--primary-blue); }
    .discard-btn { background-color: var(--primary-red); }

    .sort-btn {
        padding: 8px 12px;
        font-family: var(--font-pixel);
        font-size: 1rem;
        background: #444;
        color: #ccc;
        border: 1px solid #666;
        border-radius: 4px;
        cursor: pointer;
        text-transform: uppercase;
    }
    .sort-btn:hover { background: #555; color: white; }
    .sort-btn:active { background: #333; }

    .btn {
        padding: 12px 40px;
        font-size: 1.5rem;
        font-family: var(--font-pixel);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.1s;
        text-transform: uppercase;
        font-weight: bold;
        color: white;
        box-shadow: 0 6px 0 rgba(0,0,0,0.3);
    }
    .btn:active { transform: translateY(4px); box-shadow: 0 2px 0 rgba(0,0,0,0.3); }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

    .game-over-modal, .won-blind-modal {
        background: rgba(0,0,0,0.9);
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        border: 4px solid white;
        box-shadow: 0 0 20px rgba(0,0,0,0.8);
    }

    .dev-controls {
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: flex;
        gap: 5px;
        z-index: 100;
        opacity: 0.5;
    }
    .dev-controls:hover { opacity: 1; }
    .dev-controls button {
        background: #333;
        color: #fff;
        border: 1px solid #555;
        padding: 5px 10px;
        cursor: pointer;
        font-family: var(--font-pixel);
        font-size: 0.8rem;
    }
</style>
