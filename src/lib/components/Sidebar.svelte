<script lang="ts">
    import { game } from '$lib/stores/game';
    import ShopSign from './ShopSign.svelte';
    import BlindSprite from './BlindSprite.svelte';
    import { BLIND_DATA } from '$lib/data/blinds';

    export let mode: 'shop' | 'game' | 'blind_select' = 'shop';
</script>

<div class="left-sidebar">
    <div class="sidebar-header">
        {#if mode === 'shop'}
            <div class="sign-container">
                <ShopSign />
                <div class="shop-subtitle">Improve your run!</div>
            </div>
        {:else if mode === 'blind_select'}
            <div class="blind-select-header">
                <div class="choose-title">Choose your</div>
                <div class="next-blind-title">next Blind</div>
            </div>
        {:else}
            <div class="blind-container">
                <div class="blind-title">{$game.current_blind.name}</div>
                <div class="blind-logo">
                    <BlindSprite name={$game.current_blind.name} />
                </div>
                <div class="blind-info">
                    {#if BLIND_DATA[$game.current_blind.name]?.description}
                        <div class="blind-desc">
                            {BLIND_DATA[$game.current_blind.name].description}
                        </div>
                    {/if}
                    <div class="score-target">
                        <div class="target-label">Score at least</div>
                        <div class="target-value">
                            <span class="chip-icon">❂</span>
                            <span class="target-num">{$game.current_blind.score_to_beat.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="reward-info">
                        Reward: <span class="money-text">$$$$</span>
                    </div>
                </div>
            </div>
        {/if}
    </div>
    
    <div class="score-area">
        <div class="round-score-box">
            <div class="score-label">Round<br>score</div>
            <div class="score-value">
                <span class="star-icon">❂</span> {$game.current_score.toLocaleString()}
            </div>
        </div>

        <div class="mult-score-box">
            <!-- TODO: Connect to actual hand evaluation -->
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

<style>
    :root {
        --sidebar-width: 300px;
        --sidebar-bg: #2f363d;
        --sidebar-border: #ff4d4d;
        --btn-red: #ff4d4d;
        --btn-orange: #ff9933;
        --btn-green: #00cc66;
        --btn-blue: #0099ff;
        --text-gold: #ffcc00;
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

    /* SHOP SIGN MODE */
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

    /* BLIND SELECT MODE */
    .blind-select-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
    }

    .choose-title {
        color: white;
        font-size: 1.8rem;
        font-weight: bold;
        text-shadow: 2px 2px 0 #000;
    }

    .next-blind-title {
        color: white;
        font-size: 2rem;
        font-weight: bold;
        text-shadow: 2px 2px 0 #000;
    }

    /* GAME BLIND MODE */
    .blind-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .blind-title {
        background: #e69500; /* Orange-ish background for Big Blind */
        color: white;
        width: 100%;
        text-align: center;
        font-weight: bold;
        padding: 5px 0;
        border-radius: 5px;
        font-size: 1.2rem;
        text-shadow: 1px 1px 0 #000;
        box-shadow: 0 2px 0 #b37400;
    }

    .blind-logo {
        margin: 10px 0;
    }

    .blind-info {
        background: #111;
        border-radius: 8px;
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .blind-desc {
        color: #ddd;
        font-size: 0.8rem;
        text-align: center;
        margin-bottom: 5px;
        line-height: 1.2;
        font-style: italic;
    }

    .score-target {
        text-align: center;
    }

    .target-label { color: #aaa; font-size: 0.8rem; }
    .target-value { 
        color: var(--btn-red); 
        font-size: 1.8rem; 
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .chip-icon { font-size: 1.2rem; }

    .reward-info {
        text-align: center;
        font-size: 0.9rem;
        color: #aaa;
    }
    .money-text { color: var(--text-gold); font-weight: bold; }


    /* SHARED STATS AREA */
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
</style>