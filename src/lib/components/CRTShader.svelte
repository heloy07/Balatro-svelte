<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext | null;
    let animationFrameId: number;

    const vertexShaderSource = `
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;

        uniform float u_time;
        uniform vec2 u_resolution;

        // CRT Parameters
        const float crt_intensity = 0.2; // CHANGE THIS VALUE (0.0 to 1.0) to adjust effect strength
        const vec2 distortion_fac = vec2(1.06, 1.065);
        const vec2 scale_fac = vec2(1.0, 1.0);
        const float feather_fac = 0.02;
        const float noise_fac = 0.1; // Reduced noise
        const float scanline_count = 150.0; // Lines across screen

        #define BUFF 0.01

        void main() {
            vec2 tc = gl_FragCoord.xy / u_resolution.xy;
            
            // Flip Y because WebGL coords are different from Love2D/Texture coords sometimes
            // But gl_FragCoord is bottom-left. Let's keep it standard.
            
            // Recenter
            vec2 centered_tc = tc * 2.0 - 1.0;
            centered_tc *= scale_fac;

            // Bulge (Distortion)
            centered_tc += (centered_tc.yx * centered_tc.yx) * centered_tc * (distortion_fac - 1.0);

            // Mask (Vignette)
            float mask = (1.0 - smoothstep(1.0 - feather_fac, 1.0, abs(centered_tc.x) - BUFF))
                       * (1.0 - smoothstep(1.0 - feather_fac, 1.0, abs(centered_tc.y) - BUFF));

            // Undo recenter to get distorted UVs
            vec2 distorted_tc = (centered_tc + 1.0) / 2.0;

            // Base color (Neutral Gray for Overlay blending)
            vec3 color = vec3(0.5);

            // Scanlines
            // We want RGB separation for that phosphor look
            float scan_y = distorted_tc.y * scanline_count * 3.14159 * 2.0;
            float scan_x = distorted_tc.x * scanline_count * 5.0; // Higher freq horizontal

            vec3 rgb_scanline = vec3(
                clamp(0.3 + 0.7 * sin(scan_y + 0.0), 0.0, 1.0),
                clamp(0.3 + 0.7 * sin(scan_y + 2.09), 0.0, 1.0), // 2.09 is approx 2*PI/3
                clamp(0.3 + 0.7 * sin(scan_y + 4.18), 0.0, 1.0)  // 4.18 is approx 4*PI/3
            );
            
            // Apply scanlines (scaled by intensity)
            color *= mix(vec3(1.0), rgb_scanline, crt_intensity);

            // Apply Vignette Mask (scaled by intensity)
            // If intensity is 0, mask effect is 1.0 (no darkening)
            float effective_mask = mix(1.0, mask, crt_intensity);
            color *= effective_mask;

            // Noise
            float x = (distorted_tc.x - mod(distorted_tc.x, 0.002)) * (distorted_tc.y - mod(distorted_tc.y, 0.0013)) * u_time * 1000.0;
            x = mod(x, 13.0) * mod(x, 123.0);
            float dx = mod(x, 0.11) / 0.11;
            
            // Add noise (scaled by intensity)
            color += vec3(dx * noise_fac * crt_intensity);

            // Output
            // If we are outside the mask (vignette), we want black.
            // Inside, we want the calculated color.
            // However, for the overlay to work, "outside" should probably be black (darkening the screen edges).
            // The mask calculation above already handles the color value.
            
            gl_FragColor = vec4(color, 1.0);
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
        if (!gl) return;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;

        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const uTimeLoc = gl.getUniformLocation(program, 'u_time');
        const uResLoc = gl.getUniformLocation(program, 'u_resolution');

        let startTime = Date.now();

        function resize() {
            if (!canvas || !gl) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResLoc, canvas.width, canvas.height);
        }
        window.addEventListener('resize', resize);
        resize();

        function render() {
            if (!gl) return;
            gl.uniform1f(uTimeLoc, (Date.now() - startTime) / 1000);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationFrameId = requestAnimationFrame(render);
        }
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    });
</script>

<canvas bind:this={canvas} class="crt-shader"></canvas>

<style>
    .crt-shader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
        mix-blend-mode: hard-light; /* This allows both darkening and lightening */
        opacity: 1.0;
    }
</style>
