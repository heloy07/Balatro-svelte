<script lang="ts">
    import { game } from '$lib/stores/game';
    import BlindSprite from './BlindSprite.svelte';
    import TagSprite from './TagSprite.svelte';
    import { BLIND_DATA } from '$lib/data/blinds';
    import type { Tag } from '$lib/data/tags';

    // Calculate scores for each blind type based on current ante
    $: baseScore = 300 * Math.pow(2, $game.ante - 1);
    $: smallBlindScore = Math.floor(baseScore);
    $: bigBlindScore = Math.floor(baseScore * 1.5);
    $: bossBlindScore = Math.floor(baseScore * 2);

    // Get blind states
    $: smallBlindState = $game.blind_states?.small || 'available';
    $: bigBlindState = $game.blind_states?.big || 'upcoming';
    $: bossBlindState = $game.blind_states?.boss || 'upcoming';

    function selectBlind(blindType: 'small' | 'big' | 'boss') {
        game.selectBlind(blindType);
    }

    function skipBlind(blindType: 'small' | 'big') {
        game.skipBlind(blindType);
    }
</script>

<div class="blind-select-container">
    <!-- Small Blind Panel -->
    <div class="blind-panel {smallBlindState === 'skipped' ? 'skipped' : ''} {smallBlindState === 'available' ? 'available' : ''}">
        <div class="panel-header {smallBlindState}">
            {#if smallBlindState === 'skipped'}
                Skipped
            {:else if smallBlindState === 'available'}
                Select
            {:else}
                Upcoming
            {/if}
        </div>
        
        <div class="blind-name">Small Blind</div>
        
        <div class="blind-sprite-container">
            {#if smallBlindState === 'skipped'}
                <div class="skipped-overlay">SKIPPED</div>
            {/if}
            <BlindSprite name="Small Blind" />
        </div>
        
        <div class="blind-info">
            <div class="score-requirement">
                <div class="score-label">Score at least</div>
                <div class="score-value">
                    <span class="chip-icon">❂</span> {smallBlindScore.toLocaleString()}
                </div>
            </div>
            <div class="reward">Reward: <span class="money">$$$</span></div>
        </div>

        {#if smallBlindState === 'available'}
            <div class="panel-actions">
                <button class="select-btn" on:click={() => selectBlind('small')}>
                    Select
                </button>
                <div class="or-text">or</div>
                <div class="skip-row">
                    {#if $game.small_blind_tag}
                        <TagSprite tag={$game.small_blind_tag} size={50} />
                    {/if}
                    <button class="skip-btn" on:click={() => skipBlind('small')}>
                        Skip Blind
                    </button>
                </div>
            </div>
        {/if}
    </div>

    <!-- Big Blind Panel -->
    <div class="blind-panel {bigBlindState === 'skipped' ? 'skipped' : ''} {bigBlindState === 'available' ? 'available' : ''}">
        <div class="panel-header {bigBlindState}">
            {#if bigBlindState === 'skipped'}
                Skipped
            {:else if bigBlindState === 'available'}
                Select
            {:else}
                Upcoming
            {/if}
        </div>
        
        <div class="blind-name big">Big Blind</div>
        
        <div class="blind-sprite-container">
            {#if bigBlindState === 'skipped'}
                <div class="skipped-overlay">SKIPPED</div>
            {/if}
            <BlindSprite name="Big Blind" />
        </div>
        
        <div class="blind-info">
            <div class="score-requirement">
                <div class="score-label">Score at least</div>
                <div class="score-value">
                    <span class="chip-icon">❂</span> {bigBlindScore.toLocaleString()}
                </div>
            </div>
            <div class="reward">Reward: <span class="money">$$$$</span>+</div>
        </div>

        {#if bigBlindState === 'available'}
            <div class="panel-actions">
                <button class="select-btn" on:click={() => selectBlind('big')}>
                    Select
                </button>
                <div class="or-text">or</div>
                <div class="skip-row">
                    {#if $game.big_blind_tag}
                        <TagSprite tag={$game.big_blind_tag} size={50} />
                    {/if}
                    <button class="skip-btn" on:click={() => skipBlind('big')}>
                        Skip Blind
                    </button>
                </div>
            </div>
        {/if}
    </div>

    <!-- Boss Blind Panel -->
    <div class="blind-panel boss {bossBlindState === 'available' ? 'available' : ''}">
        <div class="panel-header {bossBlindState}">
            Upcoming
        </div>
        
        <div class="blind-name boss">{$game.upcoming_boss?.name || 'Boss Blind'}</div>
        
        <div class="blind-sprite-container">
            <BlindSprite name={$game.upcoming_boss?.name || 'Mystery Blind'} />
        </div>
        
        <div class="blind-info">
            {#if $game.upcoming_boss && BLIND_DATA[$game.upcoming_boss.name]?.description}
                <div class="boss-effect">
                    {BLIND_DATA[$game.upcoming_boss.name].description}
                </div>
            {/if}
            <div class="score-requirement">
                <div class="score-label">Score at least</div>
                <div class="score-value">
                    <span class="chip-icon">❂</span> {bossBlindScore.toLocaleString()}
                </div>
            </div>
            <div class="reward">Reward: <span class="money">$$$$$</span>+</div>
        </div>

        <div class="ante-info">
            <div class="ante-title">Up the Ante</div>
            <div class="ante-desc">Raise all Blinds</div>
            <div class="ante-desc">Refresh Blinds</div>
        </div>
    </div>
</div>

<style>
    .blind-select-container {
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
        height: 100%;
    }

    .blind-panel {
        background: #1a1a2e;
        border: 3px solid #333;
        border-radius: 15px;
        padding: 15px;
        width: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        position: relative;
        opacity: 0.7;
        transition: all 0.2s;
    }

    .blind-panel.available {
        opacity: 1;
        border-color: #ff9933;
        box-shadow: 0 0 20px rgba(255, 153, 51, 0.3);
    }

    .blind-panel.skipped {
        opacity: 0.5;
    }

    .blind-panel.boss {
        background: #1a1a2e;
        border-color: #444;
    }

    .panel-header {
        background: #333;
        color: #888;
        padding: 5px 20px;
        border-radius: 5px;
        font-size: 0.9rem;
        text-transform: uppercase;
        font-weight: bold;
    }

    .panel-header.available {
        background: #ff9933;
        color: white;
        box-shadow: 0 3px 0 #cc6600;
    }

    .panel-header.skipped {
        background: #666;
        color: #aaa;
    }

    .blind-name {
        background: #555;
        color: white;
        padding: 8px 20px;
        border-radius: 5px;
        font-weight: bold;
        font-size: 1.1rem;
        text-shadow: 1px 1px 0 #000;
        width: 100%;
        text-align: center;
        box-sizing: border-box;
    }

    .blind-name.big {
        background: #e69500;
        box-shadow: 0 3px 0 #b37400;
    }

    .blind-name.boss {
        background: #cc3333;
        box-shadow: 0 3px 0 #992222;
    }

    .blind-sprite-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 90px;
    }

    .skipped-overlay {
        position: absolute;
        font-size: 2rem;
        font-weight: bold;
        color: #ff4444;
        text-shadow: 2px 2px 0 #000;
        transform: rotate(-15deg);
        z-index: 10;
        letter-spacing: 3px;
    }

    .blind-info {
        background: #111;
        border-radius: 8px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .boss-effect {
        color: #ff6666;
        font-size: 0.85rem;
        text-align: center;
        padding-bottom: 8px;
        border-bottom: 1px solid #333;
        margin-bottom: 5px;
    }

    .score-requirement {
        text-align: center;
    }

    .score-label {
        color: #888;
        font-size: 0.8rem;
    }

    .score-value {
        color: #ff4444;
        font-size: 1.5rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .chip-icon {
        font-size: 1.2rem;
    }

    .reward {
        text-align: center;
        color: #888;
        font-size: 0.85rem;
    }

    .money {
        color: #ffcc00;
        font-weight: bold;
    }

    .panel-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
        margin-top: 5px;
    }

    .select-btn {
        background: #ff9933;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px 30px;
        font-family: var(--font-pixel);
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 0 #cc6600;
        text-transform: uppercase;
        width: 100%;
        transition: all 0.1s;
    }

    .select-btn:hover {
        background: #ffaa44;
    }

    .select-btn:active {
        transform: translateY(4px);
        box-shadow: 0 0 0 #cc6600;
    }

    .or-text {
        color: #666;
        font-size: 0.9rem;
    }

    .skip-row {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .skip-btn {
        background: #2a5a2a;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        font-family: var(--font-pixel);
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 3px 0 #1a3a1a;
        transition: all 0.1s;
    }

    .skip-btn:hover {
        background: #3a6a3a;
    }

    .skip-btn:active {
        transform: translateY(3px);
        box-shadow: 0 0 0 #1a3a1a;
    }

    .ante-info {
        background: #222;
        border-radius: 8px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        margin-top: auto;
    }

    .ante-title {
        color: #ff9933;
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: 5px;
    }

    .ante-desc {
        color: #888;
        font-size: 0.8rem;
    }
</style>
