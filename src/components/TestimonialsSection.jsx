import React, { useEffect, useRef } from 'react';
import reviewBg from '../assets/review-bg/peakpx.jpg';

// ——————————————————————————————————————————————————
// TextScramble Engine
// ——————————————————————————————————————————————————
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="opacity-65 text-white/60 font-light">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// ——————————————————————————————————————————————————
// WebGL Shader Sources
// ——————————————————————————————————————————————————
const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Wave propagation logic (physics loop running on 256x256 texture grid)
const waveShaderSource = `
  precision mediump float;
  uniform sampler2D u_current;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_mouseStrength;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 texel = 1.0 / u_resolution;
    
    // Read heights offset by 0.5 (representing zero-height) to support 8-bit unsigned formats
    float left  = texture2D(u_current, uv - vec2(texel.x, 0.0)).r - 0.5;
    float right = texture2D(u_current, uv + vec2(texel.x, 0.0)).r - 0.5;
    float up    = texture2D(u_current, uv - vec2(0.0, texel.y)).r - 0.5;
    float down  = texture2D(u_current, uv + vec2(0.0, texel.y)).r - 0.5;
    
    vec4 current = texture2D(u_current, uv);
    float height = current.r - 0.5;
    float previousHeight = current.g - 0.5;
    
    // Wave physics loop
    float newHeight = (left + right + up + down) * 0.5 - previousHeight;
    newHeight *= 0.97; // Wave damping (decay rate)
    
    // Inject stronger mouse cursor wave pressure
    if (u_mouseStrength > 0.0) {
      float dist = distance(gl_FragCoord.xy, u_mouse);
      if (dist < 12.0) {
        newHeight += u_mouseStrength * (1.0 - dist / 12.0) * 0.42;
      }
    }
    
    // Clamp inside normalized heightmap boundaries [-0.5, 0.5]
    newHeight = clamp(newHeight, -0.5, 0.5);
    
    // Save back to R (current) and G (previous)
    gl_FragColor = vec4(newHeight + 0.5, height + 0.5, 0.0, 1.0);
  }
`;

// Visual render logic with displacement refraction and specular sunlight glints
const renderShaderSource = `
  precision mediump float;
  uniform sampler2D u_heightmap;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;

  void main() {
    // Heightmap is generated in standard WebGL FBO space (Y goes up)
    vec2 heightmapUv = gl_FragCoord.xy / u_resolution;
    vec2 texel = 1.0 / u_resolution;
    
    // Compute gradient in WebGL heightmap space
    float left  = texture2D(u_heightmap, heightmapUv - vec2(texel.x, 0.0)).r - 0.5;
    float right = texture2D(u_heightmap, heightmapUv + vec2(texel.x, 0.0)).r - 0.5;
    float up    = texture2D(u_heightmap, heightmapUv - vec2(0.0, texel.y)).r - 0.5;
    float down  = texture2D(u_heightmap, heightmapUv - vec2(0.0, texel.y)).r - 0.5;
    
    vec2 distortion = vec2(right - left, down - up);
    
    // Flip Y coordinate inside the shader to sample the 2D HTML source image right-side up
    vec2 uv = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y) / u_resolution;
    
    // Displace the flipped UV (invert Y distortion to match flipped space)
    vec2 distortedUv = uv + vec2(distortion.x, -distortion.y) * 0.42; 
    distortedUv = clamp(distortedUv, 0.001, 0.999);
    
    vec4 color = texture2D(u_image, distortedUv);
    
    // Add specular sunlight reflection glints
    vec3 normal = normalize(vec3(-distortion.x * 3.5, 1.0, -distortion.y * 3.5));
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
    float specular = pow(max(0.0, dot(normal, lightDir)), 35.0);
    
    color.rgb += vec3(specular) * 0.35; // Specular glints
    
    gl_FragColor = color;
  }
`;

// Helper to draw cover fit background image (mathematical CSS object-cover)
const drawCoverImage = (ctx, img, canvasWidth, canvasHeight) => {
  if (!img) return;
  const imgWidth = img.width;
  const imgHeight = img.height;
  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  let drawWidth, drawHeight, x, y;
  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    x = 0;
    y = (canvasHeight - drawHeight) / 2;
  } else {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    x = (canvasWidth - drawWidth) / 2;
    y = 0;
  }
  ctx.drawImage(img, x, y, drawWidth, drawHeight);
};

// ——————————————————————————————————————————————————
// React Testimonials Component
// ——————————————————————————————————————————————————
const TestimonialsSection = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const bgImageRef = useRef(null);

  const phrases = [
    "We skipped",
    "the fake",
    "review part."
  ];

  // Dynamically load Google Roboto Mono font & background image
  useEffect(() => {
    if (!document.getElementById('roboto-mono-font')) {
      const link = document.createElement('link');
      link.id = 'roboto-mono-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;700&display=swap';
      document.head.appendChild(link);
    }

    const img = new Image();
    img.src = reviewBg;
    img.onload = () => {
      bgImageRef.current = img;
    };
  }, []);

  // TextScramble loop initializer
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const fx = new TextScramble(el);
    let counter = 0;
    let timeoutId;
    let isMounted = true;

    const next = () => {
      if (!isMounted) return;
      fx.setText(phrases[counter]).then(() => {
        if (isMounted) {
          timeoutId = setTimeout(next, 1800);
        }
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      cancelAnimationFrame(fx.frameRequest);
    };
  }, []);

  // WebGL Water Ripple Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Helper functions for WebGL compiling
    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (vsSource, fsSource) => {
      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const waveProgram = createProgram(vertexShaderSource, waveShaderSource);
    const renderProgram = createProgram(vertexShaderSource, renderShaderSource);

    // Setup coordinates quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]), gl.STATIC_DRAW);

    // WebGL attributes & uniforms setup
    const positionAttributeWave = gl.getAttribLocation(waveProgram, 'position');
    const positionAttributeRender = gl.getAttribLocation(renderProgram, 'position');

    // Heightmap textures swap system (physics runs on lightweight grid for absolute peak 60fps performance)
    const heightmapWidth = 256;
    const heightmapHeight = 256;
    const initialData = new Uint8Array(heightmapWidth * heightmapHeight * 4);
    for (let i = 0; i < initialData.length; i += 4) {
      initialData[i]     = 128; // height = 0.5
      initialData[i + 1] = 128; // prev height = 0.5
      initialData[i + 2] = 0;
      initialData[i + 3] = 255;
    }

    const createTexture = (w, h, data) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    };

    let textureA = createTexture(heightmapWidth, heightmapHeight, initialData);
    let textureB = createTexture(heightmapWidth, heightmapHeight, initialData);

    const createFramebuffer = (texture) => {
      const fb = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return fb;
    };

    let framebufferA = createFramebuffer(textureA);
    let framebufferB = createFramebuffer(textureB);

    // Dynamic Image source canvas (used ONLY for the background image)
    const sourceCanvas = document.createElement('canvas');
    const sourceCtx = sourceCanvas.getContext('2d');
    const imageTexture = gl.createTexture();

    // Mouse Interaction States
    let mouseX = 0;
    let mouseY = 0;
    let mouseStrength = 0;
    let targetMouseStrength = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width;
      const dy = (e.clientY - rect.top) / rect.height;
      mouseX = dx * heightmapWidth;
      mouseY = (1.0 - dy) * heightmapHeight;
      targetMouseStrength = 1.25; // Stronger starting trigger pressure
    };

    const handleMouseLeave = () => {
      targetMouseStrength = 0.0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;
    let canvasWidth = 0;
    let canvasHeight = 0;

    const tick = () => {
      // Handle canvas resize dynamically
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width !== canvasWidth || height !== canvasHeight) {
        canvasWidth = width;
        canvasHeight = height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        sourceCanvas.width = canvasWidth;
        sourceCanvas.height = canvasHeight;
      }

      // Smooth decay mouse interaction
      mouseStrength += (targetMouseStrength - mouseStrength) * 0.12;

      // ────────────────────────────────────────────────────────
      // Step 1: Draw ONLY background image to Canvas 2D
      // ────────────────────────────────────────────────────────
      sourceCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Draw Cover image
      if (bgImageRef.current) {
        drawCoverImage(sourceCtx, bgImageRef.current, canvasWidth, canvasHeight);
      } else {
        sourceCtx.fillStyle = '#0a0a0a';
        sourceCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // Upload the background canvas to u_image WebGL Texture
      gl.bindTexture(gl.TEXTURE_2D, imageTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // ────────────────────────────────────────────────────────
      // Step 2: Update wave simulation heightmap texture A/B
      // ────────────────────────────────────────────────────────
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferA);
      gl.viewport(0, 0, heightmapWidth, heightmapHeight);

      gl.useProgram(waveProgram);
      gl.bindTexture(gl.TEXTURE_2D, textureB);

      gl.uniform2f(gl.getUniformLocation(waveProgram, 'u_resolution'), heightmapWidth, heightmapHeight);
      gl.uniform2f(gl.getUniformLocation(waveProgram, 'u_mouse'), mouseX, mouseY);
      gl.uniform1f(gl.getUniformLocation(waveProgram, 'u_mouseStrength'), mouseStrength);

      gl.enableVertexAttribArray(positionAttributeWave);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeWave, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Swap heightmaps references
      const tempTex = textureA;
      textureA = textureB;
      textureB = tempTex;

      const tempFB = framebufferA;
      framebufferA = framebufferB;
      framebufferB = tempFB;

      // ────────────────────────────────────────────────────────
      // Step 3: Draw distorted background to main WebGL screen
      // ────────────────────────────────────────────────────────
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvasWidth, canvasHeight);

      gl.useProgram(renderProgram);
      
      // Bind heightmap (textureB holds latest computed physics)
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureB);
      gl.uniform1i(gl.getUniformLocation(renderProgram, 'u_heightmap'), 0);

      // Bind dynamic image canvas
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, imageTexture);
      gl.uniform1i(gl.getUniformLocation(renderProgram, 'u_image'), 1);

      gl.uniform2f(gl.getUniformLocation(renderProgram, 'u_resolution'), canvasWidth, canvasHeight);

      gl.enableVertexAttribArray(positionAttributeRender);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeRender, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-48 bg-black relative overflow-hidden z-10 transition-colors duration-300 select-none cursor-pointer"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* ── WebGL Interactive Fluid Wave Overlay (renders ONLY the background) ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* Subtle pulsing background glow underneath the WebGL canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-[#7163E9]/12 to-[#4B3AD9]/12 rounded-full blur-[80px] md:blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      {/* Active DOM Text on top of WebGL canvas (z-20) - completely sharp, clean, non-distorted */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-20 text-center flex flex-col items-center justify-center min-h-[160px] md:min-h-[260px] pointer-events-none">
        
        {/* Scramble Text Container */}
        <div className="relative w-full h-[120px] md:h-[200px] flex items-center justify-center select-none">
          <span 
            ref={textRef}
            className="w-full text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white select-none leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] font-mono"
            style={{ fontFamily: "'Roboto Mono', monospace" }}
          />
        </div>

        {/* Subtle light reflect line underneath */}
        <div className="h-px w-full max-w-sm mx-auto bg-gradient-to-r from-transparent via-[#7163E9]/40 to-transparent mt-8 md:mt-12" />
        
      </div>
    </section>
  );
};

export default TestimonialsSection;
