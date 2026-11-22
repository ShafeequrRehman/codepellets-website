// Small WebGL helpers (no extra libraries needed)

export function createProgram(gl, vsSrc, fsSrc) {
  const compile = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(s))
      gl.deleteShader(s)
      return null
    }
    return s
  }
  const vs = compile(gl.VERTEX_SHADER, vsSrc)
  const fs = compile(gl.FRAGMENT_SHADER, fsSrc)
  if (!vs || !fs) return null
  const p = gl.createProgram()
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(p))
    return null
  }
  return p
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
