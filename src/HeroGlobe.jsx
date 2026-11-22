import { useEffect, useRef } from 'react'
import { createProgram, prefersReducedMotion } from './gl.js'

// 3D particle globe with two orbit rings, drawn with raw WebGL points.
// Rotates on its own, follows the mouse and turns a little more as you scroll.

const VERT = `
attribute vec3 aPos;
attribute float aRand;
uniform float uTime;
uniform vec2 uRot;
uniform float uAspect;
uniform float uPR;
varying float vDepth;
varying float vRand;
void main() {
  vec3 p = aPos * (1.0 + 0.02 * sin(uTime * 1.5 + aRand * 6.2831));
  float ay = uTime * 0.15 + uRot.x;
  float cy = cos(ay);
  float sy = sin(ay);
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  float ax = 0.35 + uRot.y;
  float cx = cos(ax);
  float sx = sin(ax);
  p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
  float dist = 3.4 - p.z;
  vec2 proj = p.xy / dist * 2.2;
  proj.x /= uAspect;
  gl_Position = vec4(proj, 0.0, 1.0);
  vDepth = clamp((p.z + 1.5) / 3.0, 0.0, 1.0);
  vRand = aRand;
  float big = step(0.985, aRand) * 2.5;
  gl_PointSize = (1.2 + 2.8 * vDepth + big) * uPR;
}
`

const FRAG = `
precision mediump float;
varying float vDepth;
varying float vRand;
uniform float uTime;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  vec3 blue = vec3(0.45, 0.68, 0.95);
  vec3 gold = vec3(1.0, 0.77, 0.19);
  vec3 col = mix(blue, gold, step(0.72, vRand));
  float tw = 0.75 + 0.25 * sin(uTime * 3.0 + vRand * 40.0);
  gl_FragColor = vec4(col, a * (0.15 + 0.85 * vDepth) * tw);
}
`

function buildPoints() {
  const pos = []
  const rnd = []
  const N = 1800
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    pos.push(Math.cos(th) * r, y, Math.sin(th) * r)
    rnd.push(Math.random() * 0.97)
  }
  const ring = (count, radius, tilt, jitter) => {
    const c = Math.cos(tilt)
    const s = Math.sin(tilt)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const rr = radius + (Math.random() - 0.5) * jitter
      const x = Math.cos(a) * rr
      const y = (Math.random() - 0.5) * 0.03
      const z = Math.sin(a) * rr
      pos.push(c * x - s * y, s * x + c * y, z)
      rnd.push(0.75 + Math.random() * 0.25)
    }
  }
  ring(520, 1.35, 0, 0.06)
  ring(360, 1.5, 0.4, 0.12)
  return { pos: new Float32Array(pos), rnd: new Float32Array(rnd), count: rnd.length }
}

export default function HeroGlobe() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true })
    if (!gl) return
    const prog = createProgram(gl, VERT, FRAG)
    if (!prog) return
    gl.useProgram(prog)

    const { pos, rnd, count } = buildPoints()
    const pb = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, pb)
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0)

    const rb = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, rb)
    gl.bufferData(gl.ARRAY_BUFFER, rnd, gl.STATIC_DRAW)
    const aRand = gl.getAttribLocation(prog, 'aRand')
    gl.enableVertexAttribArray(aRand)
    gl.vertexAttribPointer(aRand, 1, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uRot = gl.getUniformLocation(prog, 'uRot')
    const uAspect = gl.getUniformLocation(prog, 'uAspect')
    const uPR = gl.getUniformLocation(prog, 'uPR')

    gl.enable(gl.BLEND)
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE)
    gl.clearColor(0, 0, 0, 0)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = prefersReducedMotion()
    const rot = { x: 0, y: 0, tx: 0, ty: 0 }
    const start = performance.now()
    let raf = 0
    let visible = true

    const draw = (now) => {
      const sx = rot.tx + window.scrollY * 0.0015
      rot.x += (sx - rot.x) * 0.06
      rot.y += (rot.ty - rot.y) * 0.06
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, reduce ? 4 : (now - start) / 1000)
      gl.uniform2f(uRot, rot.x, rot.y)
      gl.uniform1f(uAspect, canvas.width / canvas.height)
      gl.uniform1f(uPR, dpr)
      gl.drawArrays(gl.POINTS, 0, count)
    }
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(r.width * dpr))
      canvas.height = Math.max(1, Math.floor(r.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (reduce) draw(performance.now())
    }
    const onMove = (e) => {
      rot.tx = (e.clientX / window.innerWidth - 0.5) * 1.0
      rot.ty = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    const loop = (now) => {
      if (visible) draw(now)
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    resize()
    if (!reduce) raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="globe" />
}
