<script lang="ts">
    import { onMount } from 'svelte';
    import { game } from '$lib/stores/game';
    import Hand from '$lib/components/Hand.svelte';
    import Shop from '$lib/components/Shop.svelte';
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
</script>

<div class="game-container">
    {#if $game.state === 'shop'}
        <Shop />
    {:else}
        <!-- Sidebar (HUD) -->
        <div class="sidebar">
            <!-- Blind Info -->
            <div class="blind-box">
                <div class="blind-name">{$game.current_blind.name}</div>
                <div class="blind-target">
                    <div class="score-label">Score at least</div>
                    <div class="target-value">
                        <span class="chip-icon">❂</span>
                        {$game.current_blind.score_to_beat.toLocaleString()}
                    </div>
                    <div class="reward-label">to earn <span class="money-text">${$game.current_blind.reward}</span></div>
                </div>
            </div>

            <!-- Round Score -->
            <div class="score-box">
                <div class="label">Round Score</div>
                <div class="value">
                    <span class="chip-icon">❂</span>
                    {$game.current_score.toLocaleString()}
                </div>
            </div>

            <!-- Hand Info (Current Hand) -->
            <div class="hand-info-box">
                {#if currentHand}
                    <div class="hand-name">{currentHand.name} <span class="level">lvl.1</span></div>
                    <div class="hand-score">
                        <span class="chips">{currentHand.chips}</span>
                        <span class="x">X</span>
                        <span class="mult">{currentHand.mult}</span>
                    </div>
                {:else}
                    <div class="hand-name">Choose Cards</div>
                    <div class="hand-score">
                        <span class="chips">0</span>
                        <span class="x">X</span>
                        <span class="mult">0</span>
                    </div>
                {/if}
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid">
                <!-- Dev Mode Button -->
                <button class="dev-shop-btn" on:click={devSkipToShop} title="Dev: Skip to Shop">
                    🛠️ Shop
                </button>
                
                <div class="stat-btn red">
                    <div class="stat-label">Run Info</div>
                </div>
                <div class="stat-group">
                    <div class="stat-item blue">
                        <div class="stat-label">Hands</div>
                        <div class="stat-value">{$game.hands}</div>
                    </div>
                    <div class="stat-item blue">
                        <div class="stat-label">Discards</div>
                        <div class="stat-value">{$game.discards}</div>
                    </div>
                </div>
                <div class="money-box">
                    <div class="money-value">${$game.money}</div>
                </div>
                <div class="stat-btn orange">
                    <div class="stat-label">Options</div>
                </div>
                <div class="stat-group">
                    <div class="stat-item dark">
                        <div class="stat-label">Ante</div>
                        <div class="stat-value">
                            <span class="accent">{$game.ante}</span>/8
                        </div>
                    </div>
                    <div class="stat-item dark">
                        <div class="stat-label">Round</div>
                        <div class="stat-value">{$game.round}</div>
                    </div>
                </div>
            </div>
        </div>

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
    }

    /* Sidebar Styles */
    .sidebar {
        width: 250px;
        background-color: var(--sidebar-bg);
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 10px;
        border-right: 4px solid #1a1a1a;
        box-shadow: 5px 0 15px rgba(0,0,0,0.5);
        z-index: 100;
    }

    .blind-box {
        background-color: var(--accent-gold);
        border-radius: 10px;
        padding: 10px;
        color: #333;
        text-align: center;
        border: 3px solid #8a6d1f;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
    }

    .blind-name {
        font-size: 1.8rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 5px;
        text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
    }

    .blind-target {
        background-color: rgba(0,0,0,0.8);
        border-radius: 8px;
        padding: 8px;
        color: white;
    }

    .score-label { font-size: 0.8rem; color: #aaa; }
    .target-value { font-size: 2rem; color: white; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 5px; }
    .reward-label { font-size: 0.8rem; color: #aaa; }
    .money-text { color: var(--accent-gold); font-weight: bold; }

    .score-box {
        background-color: #111;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        border: 2px solid #444;
    }
    .score-box .label { color: #aaa; font-size: 0.9rem; }
    .score-box .value { font-size: 1.8rem; color: white; display: flex; align-items: center; justify-content: center; gap: 5px; }

    .hand-info-box {
        background-color: #111;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        border: 2px solid #444;
        margin-bottom: 10px;
    }
    .hand-name { font-size: 1.4rem; color: white; margin-bottom: 5px; }
    .level { font-size: 0.8rem; color: #aaa; }
    .hand-score { 
        background-color: #222; 
        border-radius: 5px; 
        padding: 5px; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        gap: 5px; 
        font-size: 1.8rem;
    }
    .chips { color: #457B9D; background: #111; padding: 0 5px; border-radius: 3px; }
    .mult { color: #E63946; background: #111; padding: 0 5px; border-radius: 3px; }
    .x { color: #aaa; font-size: 1rem; }

    /* Stats Grid */
    .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: auto;
    }

    .stat-btn {
        grid-column: span 1;
        height: 60px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: white;
        border: 2px solid rgba(0,0,0,0.2);
        cursor: pointer;
        box-shadow: 0 4px 0 rgba(0,0,0,0.3);
    }
    .stat-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,0.3); }
    .stat-btn.red { background-color: var(--primary-red); }
    .stat-btn.orange { background-color: var(--primary-orange); color: #333; }

    .stat-group {
        display: flex;
        gap: 5px;
    }
    .stat-item {
        flex: 1;
        border-radius: 8px;
        padding: 5px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .stat-item.blue { background-color: var(--primary-blue); color: white; }
    .stat-item.dark { background-color: #111; border: 1px solid #444; }
    
    .stat-label { font-size: 0.7rem; text-transform: uppercase; opacity: 0.8; }
    .stat-value { font-size: 1.4rem; font-weight: bold; }
    .accent { color: var(--primary-orange); }

    .money-box {
        grid-column: span 2;
        background-color: #111;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        border: 2px solid #444;
    }
    .money-value { font-size: 2rem; color: var(--accent-gold); text-shadow: 0 0 5px rgba(212, 175, 55, 0.5); }

    /* Main Area */
    .main-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20px;
        position: relative;
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
    }

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

    .action-buttons {
        display: flex;
        gap: 20px;
    }

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

    .play-btn { background-color: var(--primary-blue); }
    .discard-btn { background-color: var(--primary-red); }

    .dev-shop-btn {
        padding: 8px 16px;
        font-size: 1rem;
        font-family: var(--font-pixel);
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        border: 2px solid #fff;
        border-radius: 6px;
        cursor: pointer;
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 0 rgba(0,0,0,0.3);
        transition: all 0.1s;
        grid-column: span 2;
    }
    .dev-shop-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 0 rgba(0,0,0,0.3);
    }
    .dev-shop-btn:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 rgba(0,0,0,0.3);
    }

    .game-over-modal, .won-blind-modal {
        background: rgba(0,0,0,0.9);
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        border: 4px solid white;
    }
</style>
