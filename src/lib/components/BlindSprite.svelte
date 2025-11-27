<script lang="ts">
    import { BLIND_MAP } from '$lib/data/blinds';

    export let name: string;
    
    $: rowIndex = BLIND_MAP[name] ?? 0;
</script>

<div class="blind-wrapper">
    <div class="blind-sprite" style="--row: {rowIndex}"></div>
</div>

<style>
    .blind-wrapper {
        width: 85px; /* 34px * 2.5 */
        height: 85px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .blind-sprite {
        width: 85px;
        height: 85px;
        background-image: url('/images/blind/BlindChips.png');
        background-repeat: no-repeat;
        background-size: 1785px 2635px; /* 714*2.5, 1054*2.5 (31 rows) */
        
        animation: play 0.8s steps(21) infinite;
        
        background-position-y: calc(var(--row) * -85px);
        
        image-rendering: pixelated;
    }

    @keyframes play {
        from { background-position-x: 0; }
        to { background-position-x: -1785px; }
    }
</style>