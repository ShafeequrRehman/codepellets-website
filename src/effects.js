import { useEffect } from 'react'
import { prefersReducedMotion } from './gl.js'

// Scroll reveal, 3D tilt + spotlight cards, magnetic buttons,
// cursor glow and the scroll progress bar.
export function useInteractions(dep) {
  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((e) => { if (!e.classList.contains('in')) io.observe(e) })
    return () => io.disconnect()
  }, [dep])

  // Tilt cards + magnetic buttons (mouse devices only)
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return
    const tilts = [...document.querySelectorAll('.tilt')]
    const mags = [...document.querySelectorAll('.magnetic')]

    const tMove = (e) => {
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
      el.style.setProperty('--ry', `${(x - 0.5) * 12}deg`)
    }
    const tLeave = (e) => {
      e.currentTarget.style.setProperty('--rx', '0deg')
      e.currentTarget.style.setProperty('--ry', '0deg')
    }
    const mMove = (e) => {
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`
    }
    const mLeave = (e) => { e.currentTarget.style.transform = '' }

    tilts.forEach((el) => { el.addEventListener('pointermove', tMove); el.addEventListener('pointerleave', tLeave) })
    mags.forEach((el) => { el.addEventListener('pointermove', mMove); el.addEventListener('pointerleave', mLeave) })
    return () => {
      tilts.forEach((el) => { el.removeEventListener('pointermove', tMove); el.removeEventListener('pointerleave', tLeave) })
      mags.forEach((el) => { el.removeEventListener('pointermove', mMove); el.removeEventListener('pointerleave', mLeave) })
    }
  }, [dep])

  // Cursor glow + scroll progress
  useEffect(() => {
    const glow = document.querySelector('.cursor-glow')
    const bar = document.querySelector('.progress')
    let tx = -600, ty = -600, x = tx, y = ty, raf = 0
    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`
    }
    const loop = () => {
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15
      if (glow) glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    onScroll()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!prefersReducedMotion()) raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
