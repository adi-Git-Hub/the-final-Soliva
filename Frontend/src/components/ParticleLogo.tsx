import { useEffect, useRef } from "react";

/**
 * Particle-logo — a WebGL simulation that turns a transparent logo PNG into
 * thousands of particles which "shatter and reform" around the cursor.
 *
 * Ported from the standalone `3D-Soliva-log` project and adapted for React:
 *  - sized to its CONTAINER (not the window),
 *  - transparent background (blends into the brown About section),
 *  - tinted (the image alpha is the shape; particles take a brand colour),
 *  - mouse-reactive via a window listener (works while hovering the section),
 *  - full teardown on unmount (rAF + listeners + GL context).
 */

interface ParticleLogoProps {
  src?: string;
  color?: string;
  className?: string;
}

const VERTEX_SHADER = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_size;
attribute vec2 a_position;
attribute vec4 a_color;
varying vec4 v_color;
void main() {
  vec2 clip = (a_position / u_resolution) * 2.0 - 1.0;
  v_color = a_color;
  gl_Position = vec4(clip * vec2(1.0, -1.0), 0.0, 1.0);
  gl_PointSize = u_size;
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec4 v_color;
void main() {
  if (v_color.a < 0.01) discard;
  vec2 coord = gl_PointCoord - vec2(0.5);
  float alpha = 1.0 - smoothstep(0.0, 0.5, length(coord));
  gl_FragColor = vec4(v_color.rgb, v_color.a * alpha);
}
`;

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? {
        r: parseInt(m[1], 16) / 255,
        g: parseInt(m[2], 16) / 255,
        b: parseInt(m[3], 16) / 255,
      }
    : { r: 1, g: 1, b: 1 };
}

export function ParticleLogo({
  src = "/soliva-particle-logo.png",
  color = "#e3c187",
  className,
}: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const compile = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const tint = hexToRgb(color);

    const SCAN = 440; // logo scan resolution → particle density
    const FILL = 1.0; // logo size as a fraction of the smaller container side

    type P = { sx: number; sy: number; vx: number; vy: number; ox: number; oy: number };
    let particles: P[] = [];
    let positions: Float32Array | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let colorBuffer: WebGLBuffer | null = null;
    let scale = 1;
    let raf = 0;
    let energy = 0;
    const mouse = { x: -1e9, y: -1e9 };

    // physics tuning (scaled to the on-screen logo size)
    let maxDisplacement = 80 * dpr;
    let radius = 240 * dpr;
    const forceStrength = 0.0042;
    const returnForce = 0.04;

    const sizeCanvas = () => {
      const cw = Math.max(1, container.clientWidth);
      const ch = Math.max(1, container.clientHeight);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      const display = Math.min(canvas.width, canvas.height) * FILL;
      scale = display / SCAN;
      radius = Math.min(canvas.width, canvas.height) * 0.55;
      maxDisplacement = Math.min(canvas.width, canvas.height) * 0.14;
    };

    const recenter = () => {
      if (!positions) return;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.ox = cx + p.sx * scale;
        p.oy = cy + p.sy * scale;
        p.vx = 0;
        p.vy = 0;
        positions[i * 2] = p.ox;
        positions[i * 2 + 1] = p.oy;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);
    };

    const build = (pixels: Uint8ClampedArray) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pos: number[] = [];
      const col: number[] = [];
      for (let i = 0; i < SCAN; i++) {
        for (let j = 0; j < SCAN; j++) {
          const a = pixels[(i * SCAN + j) * 4 + 3];
          if (a > 12) {
            const sx = j - SCAN / 2;
            const sy = i - SCAN / 2;
            const ox = cx + sx * scale;
            const oy = cy + sy * scale;
            pos.push(ox, oy);
            col.push(tint.r, tint.g, tint.b, a / 255);
            particles.push({ sx, sy, vx: 0, vy: 0, ox, oy });
          }
        }
      }
      positions = new Float32Array(pos);
      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(col), gl.STATIC_DRAW);
      render(); // draw the static logo once; the loop only runs on interaction
    };

    const step = () => {
      if (energy <= 0 || !positions) return;
      energy--;
      const r2 = radius * radius;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const x = positions[i * 2];
        const y = positions[i * 2 + 1];
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2 && d2 > 0) {
          const force = -r2 / d2;
          const ang = Math.atan2(dy, dx);
          const fromHome = Math.hypot(x - p.ox, y - p.oy);
          const mult = Math.max(0.1, 1 - fromHome / (maxDisplacement * 2));
          p.vx += force * Math.cos(ang) * forceStrength * mult;
          p.vy += force * Math.sin(ang) * forceStrength * mult;
        }
        p.vx *= 0.82;
        p.vy *= 0.82;
        let tx = x + p.vx + (p.ox - x) * returnForce;
        let ty = y + p.vy + (p.oy - y) * returnForce;
        const offX = tx - p.ox;
        const offY = ty - p.oy;
        const dist = Math.hypot(offX, offY);
        if (dist > maxDisplacement) {
          const excess = dist - maxDisplacement;
          const sc = maxDisplacement / dist;
          const damped = sc + (1 - sc) * Math.exp(-excess * 0.02);
          tx = p.ox + offX * damped;
          ty = p.oy + offY * damped;
          p.vx *= 0.7;
          p.vy *= 0.7;
        }
        positions[i * 2] = tx;
        positions[i * 2 + 1] = ty;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);
    };

    const render = () => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); // transparent — blends into the section
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (!particles.length) return;
      gl.useProgram(program);
      gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(program, "u_size"), Math.max(2.2, 3.2 * dpr * 0.5 + 1.4));
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const posLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      const colLoc = gl.getAttribLocation(program, "a_color");
      gl.enableVertexAttribArray(colLoc);
      gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, particles.length);
    };

    let inView = true;
    const loop = () => {
      step();
      render();
      // Keep ticking only while there's energy AND the section is on-screen —
      // at idle / when scrolled away, no rAF runs (zero cost).
      raf = energy > 0 && inView ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf && inView) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      if (!inView) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      energy = 240;
      kick();
    };

    const ro = new ResizeObserver(() => {
      sizeCanvas();
      recenter();
      render();
    });

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) render();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );

    // boot
    sizeCanvas();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const tmp = document.createElement("canvas");
      tmp.width = SCAN;
      tmp.height = SCAN;
      const ctx = tmp.getContext("2d");
      if (!ctx) return;
      const s = SCAN * 0.97; // minimal padding so the mark reads large
      const off = (SCAN - s) / 2;
      ctx.drawImage(img, off, off, s, s);
      build(ctx.getImageData(0, 0, SCAN, SCAN).data);
      ro.observe(container);
      io.observe(container);
      window.addEventListener("mousemove", onMove);
    };
    img.src = src;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
