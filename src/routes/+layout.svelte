<script>
    import '../app.css';
    import CRTShader from '$lib/components/CRTShader.svelte';
</script>

<CRTShader />
<slot />

<style :global>
    @import url('https://fonts.googleapis.com/css2?family=Jersey+10&family=Outfit:wght@400;700&display=swap');

    :root {
        --bg-color: #355E3B; /* Hunter Green */
        --sidebar-bg: #2A2D34;
        --primary-red: #E63946;
        --primary-blue: #457B9D;
        --primary-orange: #E9C46A;
        --accent-gold: #D4AF37;
        --text-color: #F1FAEE;
        
        --suit-spades: #457B9D;
        --suit-hearts: #E63946;
        --suit-clubs: #1D3557;
        --suit-diamonds: #E9C46A;
        
        --font-main: 'm6x11plus', monospace;
        --font-pixel: 'm6x11plus', monospace;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: var(--font-main);
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        /* Abstract swirl pattern simulation */
        background-image: 
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 0%, transparent 50%);
    }
</style>
