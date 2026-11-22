import { useEffect, useRef } from 'react'
import { createProgram, prefersReducedMotion } from './gl.js'

// Full-screen animated WebGL background: flowing navy/gold "aurora" + tech grid,
// reacts to mouse and scroll. Rendered at half resolution to stay smooth.

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;
  float t = uTime * 0.06;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);

  p += m * 0.08;
  p.y -= uScroll * 0.00035;

  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 4.3));
  vec2 r = vec2(fbm(p * 2.0 + 2.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 2.0 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.8 + 2.5 * r);

  vec3 navy = vec3(0.02, 0.06, 0.12);
  vec3 deep = vec3(0.05, 0.16, 0.29);
  vec3 teal = vec3(0.06, 0.42, 0.52);
  vec3 gold = vec3(1.0, 0.77, 0.19);

  vec3 col = mix(navy, deep, clamp(f * 1.5, 0.0, 1.0));
  col = mix(col, teal, clamp(length(q) * 0.5 - 0.2, 0.0, 1.0) * 0.35);
  col += gold * pow(clamp(r.x * f * 1.4, 0.0, 1.0), 3.0) * 0.85;

  // soft glow following the mouse
  float d = length(p - m);
  col += gold * 0.06 / (d * 6.0 + 0.6);

  // subtle tech grid
  vec2 g = abs(fract(p * 7.0) - 0.5);
  float line = smoothstep(0.485, 0.5, max(g.x, g.y));
  col += vec3(0.25, 0.4, 0.6) * line * 0.05;

  // vignette + film grain
  col *= 1.0 - 0.5 * length(uv - 0.5);
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}
`

export default function WebGLBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) { canvas.style.display = 'none'; return }
    const prog = createProgram(gl, VERT, FRAG)
    if (!prog) { canvas.style.display = 'none'; return }

    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')

    const SCALE = 0.5
    const reduce = prefersReducedMotion()
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const start = performance.now()
    let raf = 0

    const draw = (now) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, reduce ? 20 : (now - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uScroll, window.scrollY)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE))
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE))
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (reduce) draw(performance.now())
    }
    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = 1 - e.clientY / window.innerHeight
    }
    const loop = (now) => { draw(now); raf = requestAnimationFrame(loop) }

    resize()
    if (!reduce) raf = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />
}
