# Balatro Web Clone

A web-based recreation of the shop interface from the game **Balatro**, built with **Svelte 5** and **TypeScript**. This project aims to replicate the visual style and feel of the original game, including pixel-perfect UI layouts and custom WebGL shaders.

## Features

*   **Shop UI**: A faithful recreation of the in-game shop, including the sidebar, card wells, and inventory slots.
*   **WebGL Shaders**:
    *   **Background Swirl**: A custom fragment shader (`BackgroundShader.svelte`) that mimics the game's hypnotic background.
    *   **CRT/Old TV Effect**: A global post-processing shader (`CRTShader.svelte`) that applies scanlines, chromatic aberration, distortion, and noise to the entire screen.
*   **Reactive Game State**: Uses Svelte stores (`game.ts`) to manage money, hands, discards, ante, round, and inventory items.
*   **Asset Pipeline**: Custom scripts to scrape and import game assets (Jokers, Tarots, Planets, etc.) directly from the wiki.
*   **Custom Fonts**: Integrated `m6x11plus` font for authentic retro typography.

## Tech Stack

*   **Framework**: [Svelte 5](https://svelte.dev/) (Vite-powered)
*   **Language**: TypeScript
*   **Styling**: CSS Variables, Flexbox, Grid
*   **Graphics**: WebGL (GLSL Shaders)

## Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd balatro
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## Asset Management

This project includes a script to automate the fetching of game assets (images and data) from the Balatro Wiki.

### How it works

The script `scripts/import_assets.js` parses HTML files located in the `static/` directory (e.g., `joikers.html`, `tarots.html`), extracts item information (name, cost, description, image URL), downloads the images to `static/images/`, and generates TypeScript data files in `src/lib/stores/`.

### Running the Import Script

If you need to refresh assets or import new ones:

1.  Ensure you have the source HTML files (e.g., `joikers.html`) in the `static/` folder.
2.  Run the script:
    ```bash
    node scripts/import_assets.js
    ```

## Shader Implementation

The project uses raw WebGL within Svelte components to render shaders.

*   **`src/lib/components/BackgroundShader.svelte`**: Renders the background swirl. It uses `static/shaders/background.fs` logic ported to a string within the component.
*   **`src/lib/components/CRTShader.svelte`**: Renders a full-screen overlay for the CRT effect. It uses `static/shaders/CRT.fs` logic.
    *   **Adjusting Intensity**: You can tweak the `crt_intensity` constant inside `CRTShader.svelte` to change the strength of the scanlines and distortion.

## Disclaimer

This is a fan project created for educational purposes. All game assets (images, designs, names) are property of **LocalThunk** and **Playstack**. If you haven't played Balatro yet, go buy it on Steam!
