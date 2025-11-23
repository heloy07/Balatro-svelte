<script lang="ts">
    import { game } from '$lib/stores/game';
    import type { ShopItem } from '$lib/types';
    import ShopSign from './ShopSign.svelte';
    import BackgroundShader from './BackgroundShader.svelte';

    function buy(item: ShopItem) {
        game.buyItem(item);
    }

    function reroll() {
        // TODO: Implement reroll logic with cost
        game.enterShop(); // For now, just regenerate shop
    }

    $: jokersAndConsumables = $game.shop_items.filter(i => i.type === 'joker' || i.type === 'consumable').slice(0, 2);
    $: vouchers = $game.shop_items.filter(i => i.type === 'voucher');
    $: packs = $game.shop_items.filter(i => i.type === 'pack').slice(0, 2);
</script>

<BackgroundShader />

<div class="shop-layout">
    <!-- Left Sidebar -->
    <div class="left-sidebar">
        <div class="sidebar-header">
            <div class="sign-container">
                <ShopSign />
                <div class="shop-subtitle">Improve your run!</div>
            </div>
        </div>
        
        <div class="score-area">
            <div class="round-score-box">
                <div class="score-label">Round<br>score</div>
                <div class="score-value">
                    <span class="star-icon">❂</span> 0
                </div>
            </div>

            <div class="mult-score-box">
                <div class="score-part blue">0</div>
                <div class="score-x">X</div>
                <div class="score-part red">0</div>
            </div>
        </div>

        <!-- Main Grid: Buttons left, Stats right -->
        <div class="main-grid">
            <!-- Left column: Buttons -->
            <div class="buttons-column">
                <button class="run-info-btn">Run<br>Info</button>
                <button class="options-btn">Options</button>
            </div>

            <!-- Right column: 3 rows -->
            <div class="stats-column">
                <!-- Row 1: Hands and Discards -->
                <div class="counters-row-top">
                    <div class="stat-display blue">
                        <div class="stat-label">Hands</div>
                        <div class="stat-num">{$game.hands}</div>
                    </div>
                    <div class="stat-display red">
                        <div class="stat-label">Discards</div>
                        <div class="stat-num">{$game.discards}</div>
                    </div>
                </div>

                <!-- Row 2: Money -->
                <div class="money-container">
                    <span class="money-symbol">$</span>{$game.money}
                </div>

                <!-- Row 3: Ante and Round -->
                <div class="ante-round-container">
                    <div class="ar-box">
                        <div class="ar-label">Ante</div>
                        <div class="ar-value">
                            <span class="highlight">{$game.ante}</span>/8
                        </div>
                    </div>
                    <div class="ar-box">
                        <div class="ar-label">Round</div>
                        <div class="ar-value">
                            <span class="highlight">{$game.round}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Center Shop Area -->
    <div class="shop-content-wrapper">
        <div class="shop-center">
            <!-- Inventory Row: Jokers and Consumables side by side -->
            <div class="inventory-row">
                <!-- Owned Jokers Section -->
                <div class="inventory-group">
                    <div class="inventory-header-text">
                        <span class="inv-title">Jokers</span>
                        <span class="inv-count">{$game.jokers.length}/5</span>
                    </div>
                    <div class="inventory-slots">
                        {#each Array(5) as _, i}
                            {#if $game.jokers[i]}
                                <div class="inventory-item filled">
                                    <img src={$game.jokers[i].image} alt={$game.jokers[i].name} class="inventory-image" />
                                </div>
                            {:else}
                                <div class="inventory-item empty">
                                    <div class="empty-label">Empty</div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>

                <!-- Owned Consumables Section -->
                <div class="inventory-group">
                    <div class="inventory-header-text">
                        <span class="inv-title">Consumables</span>
                        <span class="inv-count">{$game.consumables.length}/{$game.max_consumables}</span>
                    </div>
                    <div class="inventory-slots">
                        {#each Array($game.max_consumables) as _, i}
                            {#if $game.consumables[i]}
                                <div class="inventory-item filled">
                                    <img src={$game.consumables[i].image} alt={$game.consumables[i].name} class="inventory-image" />
                                </div>
                            {:else}
                                <div class="inventory-item empty">
                                    <div class="empty-label">Empty</div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Shop Wrapper: Container + Deck -->
            <div class="shop-wrapper">
                <!-- Main Shop Container -->
                <div class="shop-container">
                    <!-- Top Row: Buttons + Items -->
                    <div class="shop-row top-row">
                        <!-- Action Buttons -->
                        <div class="action-buttons">
                            <button class="next-round-btn" on:click={() => game.nextRound()}>
                                Next<br>Round
                            </button>
                            <button class="reroll-btn" on:click={reroll}>
                                Reroll<br>
                                <span class="reroll-cost">$5</span>
                            </button>
                        </div>

                        <!-- Shop Items (Jokers/Consumables) -->
                        <div class="shop-items-well">
                            {#each jokersAndConsumables as item}
                                <div class="shop-item">
                                    <div class="price-tag">${item.type === 'joker' ? item.item.cost : 3}</div>
                                    <img src={item.item.image} alt={item.item.name} class="item-image" />
                                    <button 
                                        class="buy-btn" 
                                        on:click={() => buy(item)}
                                        disabled={$game.money < (item.type === 'joker' ? item.item.cost : 3)}
                                    >
                                        BUY
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Bottom Row: Voucher + Packs -->
                    <div class="shop-row bottom-row">
                        <!-- Voucher Section -->
                        <div class="voucher-well">
                            <div class="voucher-label">ANTE 1 VOUCHER</div>
                            <div class="voucher-items">
                                {#each vouchers as item}
                                    <div class="shop-item">
                                        <div class="price-tag">${item.item.cost}</div>
                                        <img src={item.item.image} alt={item.item.name} class="item-image" />
                                        <button 
                                            class="buy-btn" 
                                            on:click={() => buy(item)}
                                            disabled={$game.money < item.item.cost}
                                        >
                                            BUY
                                        </button>
                                    </div>
                                {/each}
                            </div>
                        </div>

                        <!-- Packs Section -->
                        <div class="packs-well">
                            {#each packs as item}
                                <div class="shop-item">
                                    <div class="price-tag">${item.item.cost}</div>
                                    <img src={item.item.image} alt={item.item.name} class="item-image" />
                                    <button 
                                        class="buy-btn" 
                                        on:click={() => buy(item)}
                                        disabled={$game.money < item.item.cost}
                                    >
                                        BUY
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>

                <!-- Deck Section (Outside Shop Container) -->
                <div class="deck-section">
                    <div class="card-back"></div>
                    <div class="deck-counter">{$game.deck.length + $game.hand.length}/52</div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :root {
        --sidebar-width: 300px;
        --sidebar-bg: #2f363d;
        --sidebar-border: #ff4d4d;
        --shop-bg: #2f363d;
        --shop-border: #ff4d4d;
        --btn-red: #ff4d4d;
        --btn-orange: #ff9933;
        --btn-green: #00cc66;
        --btn-blue: #0099ff;
        --text-gold: #ffcc00;
        --well-bg: #262b30;
    }

    .shop-layout {
        display: flex;
        width: 100vw;
        height: 100vh;
        background: transparent; /* Shader background */
        color: white;
        font-family: var(--font-pixel);
        overflow: hidden;
        padding: 0;
    }

    /* LEFT SIDEBAR */
    .left-sidebar {
        width: var(--sidebar-width);
        height: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: var(--sidebar-bg);
        border-right: 4px solid var(--sidebar-border);
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
        margin-left: 40px;
    }

    .sidebar-header {
        border: 4px solid var(--sidebar-border);
        border-radius: 15px;
        padding: 10px;
        background: #222;
        margin-bottom: 5px;
        margin-top: 40px;
    }

    .sign-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .shop-subtitle {
        color: var(--text-gold);
        font-size: 1.1rem;
        margin-top: -5px;
        font-weight: bold;
        text-shadow: 2px 2px 0 #000;
    }

    .score-area {
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: #222;
        border-radius: 10px;
        padding: 10px;
        border: 2px solid #444;
    }

    .round-score-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    .score-label {
        font-size: 0.9rem;
        line-height: 1;
        color: #fff;
    }

    .score-value {
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .star-icon {
        font-size: 1.2rem;
    }

    .mult-score-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: #111;
        padding: 5px;
        border-radius: 8px;
    }

    .score-part {
        flex: 1;
        text-align: center;
        font-size: 1.8rem;
        font-weight: bold;
        border-radius: 5px;
        padding: 5px 0;
    }

    .score-part.blue { background: var(--btn-blue); box-shadow: 0 3px 0 #005599; }
    .score-part.red { background: var(--btn-red); box-shadow: 0 3px 0 #990000; }

    .score-x {
        color: var(--btn-red);
        font-size: 1.5rem;
        font-weight: bold;
    }

    /* GRID LAYOUT */
    .main-grid {
        display: grid;
        grid-template-columns: 1fr 1.4fr;
        gap: 8px;
    }

    .buttons-column {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .stats-column {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .counters-row-top {
        display: flex;
        gap: 8px;
    }

    .run-info-btn {
        background: var(--btn-red);
        border: none;
        border-radius: 8px;
        padding: 15px 5px;
        font-family: var(--font-pixel);
        font-size: 1rem;
        color: white;
        cursor: pointer;
        text-align: center;
        line-height: 1.1;
        box-shadow: 0 4px 0 #990000;
        font-weight: bold;
        flex: 1;
    }

    .options-btn {
        background: var(--btn-orange);
        border: none;
        border-radius: 8px;
        padding: 15px 5px;
        font-family: var(--font-pixel);
        font-size: 1rem;
        color: white;
        cursor: pointer;
        text-align: center;
        box-shadow: 0 4px 0 #cc6600;
        font-weight: bold;
        flex: 1;
    }

    .stat-display {
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
        text-align: center;
        height: 60px;
        flex: 1;
    }

    .stat-display.blue { background: #222; border: 2px solid var(--btn-blue); }
    .stat-display.red { background: #222; border: 2px solid var(--btn-red); }

    .stat-label { font-size: 0.7rem; color: #ccc; margin-bottom: 2px; }
    .stat-num { font-size: 1.5rem; font-weight: bold; }
    .stat-display.blue .stat-num { color: var(--btn-blue); }
    .stat-display.red .stat-num { color: var(--btn-red); }

    .money-container {
        background: #222;
        border-radius: 8px;
        padding: 10px;
        font-size: 1.8rem;
        text-align: center;
        color: var(--text-gold);
        font-weight: bold;
        border: 2px solid #444;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        margin-top: 0;
    }

    .ante-round-container {
        display: flex;
        gap: 8px;
        margin-top: 0;
    }

    .ar-box {
        flex: 1;
        background: #222;
        border-radius: 6px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid #444;
    }

    .ar-label { color: #888; font-size: 0.7rem; }
    .ar-value { color: white; font-weight: bold; font-size: 1.1rem; }

    /* CENTER SHOP WRAPPER */
    .shop-content-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        padding: 40px;
        height: 100%;
        box-sizing: border-box;
    }

    .shop-center {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        max-width: 1100px;
    }

    /* INVENTORY */
    .inventory-row {
        display: flex;
        gap: 40px;
        width: 100%;
    }

    .inventory-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .inventory-header-text {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 0.9rem;
        padding: 0 5px;
    }

    .inv-title { font-weight: bold; color: var(--text-gold); }
    .inv-count { color: #aaa; }

    .inventory-slots {
        display: flex;
        gap: 10px;
    }

    .inventory-item {
        width: 80px;
        height: 110px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .inventory-item.empty {
        border: 2px dashed #555;
        background: transparent;
    }

    .inventory-item.filled {
        border: 2px solid #555;
        background: rgba(0,0,0,0.3);
        overflow: hidden;
    }

    .empty-label { color: #555; font-size: 0.8rem; }
    .inventory-image { width: 100%; height: 100%; object-fit: cover; }

    /* SHOP WRAPPER */
    .shop-wrapper {
        display: flex;
        gap: 20px;
        align-items: flex-end;
    }

    /* MAIN SHOP CONTAINER */
    .shop-container {
        flex: 1;
        background: var(--shop-bg);
        border: 4px solid var(--shop-border);
        border-radius: 15px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        box-shadow: 0 0 0 2px #000;
    }

    .shop-row { display: flex; gap: 20px; }
    .top-row { min-height: 250px; }

    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 140px;
        flex-shrink: 0;
    }

    .next-round-btn {
        background: var(--btn-red);
        border: none;
        border-radius: 10px;
        padding: 0;
        font-family: var(--font-pixel);
        font-size: 1.3rem;
        color: white;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 6px 0 #990000;
        text-align: center;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
    }

    .reroll-btn {
        background: var(--btn-green);
        border: none;
        border-radius: 10px;
        padding: 0;
        font-family: var(--font-pixel);
        font-size: 1.3rem;
        color: white;
        cursor: pointer;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 6px 0 #008844;
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .reroll-cost { color: white; font-size: 1.5rem; }

    /* WELLS (Inset Backgrounds) */
    .shop-items-well {
        flex: 1;
        background: var(--well-bg);
        border-radius: 10px;
        padding: 15px;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        min-width: 480px;
    }

    .voucher-well {
        flex: 0.8;
        background: var(--well-bg);
        border-radius: 10px;
        padding: 10px;
        display: flex;
        gap: 10px;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        align-items: center;
    }

    .packs-well {
        flex: 1.2;
        background: var(--well-bg);
        border-radius: 10px;
        padding: 10px;
        display: flex;
        gap: 15px;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
    }

    .voucher-label {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
        color: #666;
        font-weight: bold;
        font-size: 0.9rem;
        text-align: center;
        padding: 5px 0;
    }

    .voucher-items { 
        display: flex; 
        flex: 1;
        justify-content: center;
    }

    /* ITEMS */
    .shop-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        position: relative;
    }

    .price-tag {
        position: absolute;
        top: -10px;
        right: -5px;
        background: #000;
        color: var(--text-gold);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 1rem;
        border: 2px solid var(--text-gold);
        z-index: 10;
        font-weight: bold;
        transform: rotate(5deg);
    }

    .item-image {
        width: 100px;
        height: 140px;
        border-radius: 8px;
        object-fit: cover;
        box-shadow: 4px 4px 0 rgba(0,0,0,0.4);
        image-rendering: crisp-edges;
        background: #444;
    }

    .buy-btn {
        background: #888;
        border: none;
        border-radius: 4px;
        padding: 4px 15px;
        font-family: var(--font-pixel);
        font-size: 0.8rem;
        color: white;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 3px 0 #555;
    }
    
    .buy-btn:not(:disabled) {
        background: var(--btn-orange);
        box-shadow: 0 3px 0 #cc6600;
    }

    .buy-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* DECK SECTION */
    .deck-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding-bottom: 20px;
    }

    .card-back {
        width: 100px;
        height: 140px;
        background: linear-gradient(135deg, #cc3333, #990000);
        border: 4px solid #fff;
        border-radius: 8px;
        box-shadow: 4px 4px 0 rgba(0,0,0,0.4);
        position: relative;
    }

    .card-back::before {
        content: '';
        position: absolute;
        inset: 8px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 4px;
    }

    .deck-counter {
        background: #000;
        border: 1px solid #444;
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 0.8rem;
        color: #ccc;
    }
</style>
