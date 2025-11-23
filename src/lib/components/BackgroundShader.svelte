<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext | null;
    let animationFrameId: number;

    // Shader sources
    const vertexShaderSource = `
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    // Converted from Love2D shader
    const fragmentShaderSource = `
        precision mediump float;

        uniform float u_time;
        uniform float u_spin_time;
        uniform vec4 u_colour_1;
        uniform vec4 u_colour_2;
        uniform vec4 u_colour_3;
        uniform float u_contrast;
        uniform float u_spin_amount;
        uniform vec2 u_resolution;

        #define PIXEL_SIZE_FAC 700.0
        #define SPIN_EASE 0.5

        void main() {
            vec2 screen_coords = gl_FragCoord.xy;
            
            // Convert to UV coords (0-1) and floor for pixel effect
            float pixel_size = length(u_resolution.xy) / PIXEL_SIZE_FAC;
            vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * u_resolution.xy) / length(u_resolution.xy) - vec2(0.12, 0.0);
            float uv_len = length(uv);

            // Adding in a center swirl
            float speed = (u_spin_time * SPIN_EASE * 0.2) + 302.2;
            float new_pixel_angle = (atan(uv.y, uv.x)) + speed - SPIN_EASE * 20.0 * (1.0 * u_spin_amount * uv_len + (1.0 - 1.0 * u_spin_amount));
            vec2 mid = (u_resolution.xy / length(u_resolution.xy)) / 2.0;
            uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);

            // Now add the paint effect
            uv *= 30.0;
            speed = u_time * (2.0);
            vec2 uv2 = vec2(uv.x + uv.y);

            for(int i = 0; i < 5; i++) {
                uv2 += sin(max(uv.x, uv.y)) + uv;
                uv  += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121), sin(uv2.x - 0.113 * speed));
                uv  -= 1.0 * cos(uv.x + uv.y) - 1.0 * sin(uv.x * 0.711 - uv.y);
            }

            // Make the paint amount range from 0 - 2
            float contrast_mod = (0.25 * u_contrast + 0.5 * u_spin_amount + 1.2);
            float paint_res = min(2.0, max(0.0, length(uv) * (0.035) * contrast_mod));
            float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
            float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
            float c3p = 1.0 - min(1.0, c1p + c2p);

            vec4 ret_col = (0.3 / u_contrast) * u_colour_1 + (1.0 - 0.3 / u_contrast) * (u_colour_1 * c1p + u_colour_2 * c2p + vec4(c3p * u_colour_3.rgb, c3p * u_colour_1.a));

            gl_FragColor = ret_col;
        }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = gl.createProgram();
        if (!program) return null;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    onMount(() => {
        gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        
        if (!vertexShader || !fragmentShader) return;

        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        gl.useProgram(program);

        // Set up full-screen quad
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
             1.0,  1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const positionAttributeLocation = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        const uTimeLoc = gl.getUniformLocation(program, 'u_time');
        const uSpinTimeLoc = gl.getUniformLocation(program, 'u_spin_time');
        const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
        const uColour1Loc = gl.getUniformLocation(program, 'u_colour_1');
        const uColour2Loc = gl.getUniformLocation(program, 'u_colour_2');
        const uColour3Loc = gl.getUniformLocation(program, 'u_colour_3');
        const uContrastLoc = gl.getUniformLocation(program, 'u_contrast');
        const uSpinAmountLoc = gl.getUniformLocation(program, 'u_spin_amount');

        // Set static uniforms (Balatro Green Theme)
        // Colour 1: Dark Green Background
        gl.uniform4f(uColour1Loc, 0.10, 0.23, 0.18, 1.0); 
        // Colour 2: Lighter Swirl
        gl.uniform4f(uColour2Loc, 0.18, 0.35, 0.28, 1.0);
        // Colour 3: Accent
        gl.uniform4f(uColour3Loc, 0.08, 0.18, 0.14, 1.0);
        
        gl.uniform1f(uContrastLoc, 1.0);
        gl.uniform1f(uSpinAmountLoc, 0.0); // 0 for background, 1 for swirl

        let startTime = Date.now();

        function resize() {
            if (!canvas || !gl) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
        }

        window.addEventListener('resize', resize);
        resize();

        function render() {
            if (!gl) return;
            const currentTime = (Date.now() - startTime) / 1000;
            
            gl.uniform1f(uTimeLoc, currentTime);
            gl.uniform1f(uSpinTimeLoc, currentTime * 0.5); // Slower spin

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationFrameId = requestAnimationFrame(render);
        }

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    });

    onDestroy(() => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
</script>

<canvas bind:this={canvas} class="background-shader"></canvas>

<style>
    .background-shader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        pointer-events: none;
    }
</style>