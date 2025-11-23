<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    let currentFrame = 0;
    const totalFrames = 4;
    const frameWidth = 200; // Adjust based on your sprite sheet
    const frameHeight = 100; // Adjust based on your sprite sheet
    let intervalId: number;
    
    onMount(() => {
        // Animate through frames
        intervalId = window.setInterval(() => {
            currentFrame = (currentFrame + 1) % totalFrames;
        }, 200); // Change frame every 200ms
    });
    
    onDestroy(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });
    
    $: backgroundPositionX = -(currentFrame * frameWidth);
</script>

<div class="shop-sign">
    <div 
        class="shop-sign-sprite" 
        style="background-position: {backgroundPositionX}px 0"
    ></div>
</div>

<style>
    .shop-sign {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
    }
    
    .shop-sign-sprite {
        width: 200px;
        height: 100px;
        background-image: url('/images/sprites/ShopSignAnimation.png');
        background-repeat: no-repeat;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        background-size: 800px 100px; /* 4 frames * 200px width */
    }
</style>
