import { Fragment, useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { content, CONTACT } from './content.js'
import WebGLBackground from './WebGLBackground.jsx'
import HeroGlobe from './HeroGlobe.jsx'
import { useInteractions } from './effects.js'

export default function App() {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useInteractions(lang)

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.hero.waMessage)}`
  const links = [
    ['features', t.nav.features],
    ['products', t.nav.products],
    ['why', t.nav.why],
    ['contact', t.nav.contact],
  ]
  const n1 = t.hero.title1.split(' ').length
  const n2 = t.hero.title2.split(' ').length
  const band1 = [...t.features.items, ...t.products.items]
  const band2 = [...t.why.items, ...t.features.items].reverse()

  return (
    <div className={`site lang-${lang}`}>
      <div className="bg-fallback" aria-hidden="true" />
      <WebGLBackground />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="progress" aria-hidden="true" />

      {/* ---------- Navbar ---------- */}
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#top" className="brand" aria-label={CONTACT.company}>
              <span className="brand-mark"><Icon name="code" size={22} color="#0B2A4A" strokeWidth={2.4} /></span>
              <span className="brand-text">Codepellets <b>Technologies</b></span>
            </a>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main">
              {links.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
            </nav>

            <div className="nav-actions">
              <button className="lang-btn" onClick={() => setLang(lang === 'ur' ? 'en' : 'ur')}>
                {t.switchLabel}
              </button>
              <a className="btn btn-wa btn-sm" href={waLink} target="_blank" rel="noreferrer">
                <Icon name="chat" size={20} color="#fff" /> <span className="hide-sm">WhatsApp</span>
              </a>
              <button
                className="menu-btn"
                aria-label="Menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Icon name={menuOpen ? 'close' : 'menu'} size={26} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section id="top" className="hero">
          <div className="container hero-inner">
            <div className="hero-text" key={lang}>
              <span className="badge hero-in" style={{ '--d': 0 }}>
                <span className="pulse-dot" />
                {t.hero.badge}
              </span>
              <h1>
                <Words text={t.hero.title1} start={0} />
                <br />
                <Words text={t.hero.title2} start={n1} />{' '}
                <span className="word">
                  <span style={{ '--i': n1 + n2 }}><span className="shine">{t.hero.highlight}</span></span>
                </span>
              </h1>
              <p className="hero-sub hero-in" style={{ '--d': 5 }}>{t.hero.sub}</p>
              <div className="hero-ctas hero-in" style={{ '--d': 6 }}>
                <a className="btn btn-wa magnetic" href={waLink} target="_blank" rel="noreferrer">
                  <Icon name="chat" size={24} color="#fff" /> {t.hero.whatsapp}
                </a>
                <a className="btn btn-accent magnetic" href={CONTACT.phoneLink}>
                  <Icon name="phone" size={22} color="#0B2A4A" /> {t.hero.call}
                </a>
              </div>
              <a className="hero-phone hero-in" style={{ '--d': 7 }} href={CONTACT.phoneLink} dir="ltr">
                <span className="ph-ic"><Icon name="phone" size={20} color="#FFC531" /></span>
                {CONTACT.phone}
              </a>
            </div>

            {/* 3D WebGL globe with floating glass cards */}
            <div className="hero-art" aria-hidden="true">
              <div className="globe-glow" />
              <HeroGlobe />
              <div className="float-card fc-1">
                <span className="fc-icon"><Icon name="receipt" size={22} color="#FFC531" /></span>
                <div>
                  <b>{t.features.items[0].title}</b>
                  <small dir="ltr">#00248 · Rs 3,450</small>
                </div>
                <span className="fc-ok">✓</span>
              </div>
              <div className="float-card fc-2">
                <span className="fc-icon"><Icon name="chart" size={22} color="#FFC531" /></span>
                <div>
                  <b>{t.features.items[2].title}</b>
                  <div className="mini-bars">
                    {[55, 80, 45, 95, 70, 88].map((h, i) => (
                      <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="float-card fc-3">
                <span className="fc-icon"><Icon name="cloud" size={22} color="#FFC531" /></span>
                <div>
                  <b>{t.why.items[0].title}</b>
                  <small><span className="live-dot" />{t.why.items[0].desc}</small>
                </div>
              </div>
            </div>
          </div>
          <a href="#features" className="scroll-hint" aria-label={t.nav.features} />
        </section>

        {/* ---------- Moving text bands ---------- */}
        <div className="bands" aria-hidden="true">
          <Marquee items={band1} className="band-a" />
          <Marquee items={band2} className="band-b reverse" />
        </div>

        {/* ---------- Features ---------- */}
        <section id="features" className="section">
          <div className="container">
            <SectionHead eyebrow={t.nav.features} title={t.features.title} sub={t.features.sub} />
            <div className="grid grid-4">
              {t.features.items.map((f, i) => (
                <div key={f.icon} data-reveal style={{ '--d': i }}>
                  <article className="card tilt feature">
                    <span className="card-num" dir="ltr">0{i + 1}</span>
                    <div className="icon-box"><Icon name={f.icon} size={32} color="#FFC531" /></div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Products ---------- */}
        <section id="products" className="section">
          <div className="container">
            <SectionHead eyebrow={t.nav.products} title={t.products.title} sub={t.products.sub} />
            <div className="grid grid-4">
              {t.products.items.map((p, i) => (
                <div key={p.icon} data-reveal style={{ '--d': i }}>
                  <article className="card tilt product">
                    <div className="product-orb">
                      <Icon name={p.icon} size={50} color="#FFC531" strokeWidth={1.6} />
                    </div>
                    <span className="tag" dir="ltr">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <a className="card-link" href={waLink} target="_blank" rel="noreferrer">
                      {t.hero.whatsapp}
                      <span className="flip-rtl"><Icon name="arrow" size={18} color="#FFC531" strokeWidth={2.2} /></span>
                    </a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Why us ---------- */}
        <section id="why" className="section">
          <div className="container">
            <SectionHead eyebrow={t.nav.why} title={t.why.title} />
            <div className="why-wrap">
              <span className="why-line" aria-hidden="true" />
              <div className="grid grid-3">
                {t.why.items.map((w, i) => (
                  <div key={w.icon} data-reveal style={{ '--d': i }}>
                    <article className="card tilt why">
                      <div className="why-icon"><Icon name={w.icon} size={32} color="#0B2A4A" strokeWidth={2} /></div>
                      <h3>{w.title}</h3>
                      <p>{w.desc}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Big CTA ---------- */}
        <section className="cta">
          <div className="container">
            <div data-reveal>
              <div className="cta-box">
                <span className="eyebrow">{t.nav.contact}</span>
                <h2>{t.banner}</h2>
                <div className="cta-actions">
                  <a className="btn btn-wa magnetic" href={waLink} target="_blank" rel="noreferrer">
                    <Icon name="chat" size={22} color="#fff" /> {t.hero.whatsapp}
                  </a>
                  <a className="btn btn-ghost magnetic" href={CONTACT.phoneLink}>
                    <Icon name="phone" size={20} color="#FFC531" /> <span dir="ltr">{CONTACT.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="section contact">
          <div className="container">
            <SectionHead eyebrow={t.nav.contact} title={t.contact.title} sub={t.contact.sub} />
            <div className="contact-grid">
              <div data-reveal style={{ '--d': 0 }}>
                <a className="card tilt contact-card big" href={CONTACT.phoneLink}>
                  <div className="contact-icons">
                    <span className="circle accent-bg"><Icon name="phone" size={26} color="#0B2A4A" strokeWidth={2} /></span>
                    <span className="circle wa-bg"><Icon name="chat" size={28} color="#fff" /></span>
                  </div>
                  <small>{t.contact.phone}</small>
                  <strong dir="ltr" className="phone">{CONTACT.phone}</strong>
                </a>
              </div>
              <div data-reveal style={{ '--d': 1 }}>
                <div className="card tilt contact-card">
                  <Icon name="pin" size={30} color="#FFC531" />
                  <small>{t.contact.address1}</small>
                  <span dir="ltr">{CONTACT.address1}</span>
                </div>
              </div>
              <div data-reveal style={{ '--d': 2 }}>
                <div className="card tilt contact-card">
                  <Icon name="pin" size={30} color="#FFC531" />
                  <small>{t.contact.address2}</small>
                  <span dir="ltr">{CONTACT.address2}</span>
                </div>
              </div>
              <div data-reveal style={{ '--d': 3 }}>
                <div className="card tilt contact-card">
                  <Icon name="user" size={30} color="#FFC531" />
                  <small>{t.contact.ceo}</small>
                  <span dir="ltr">{CONTACT.ceo}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-giant" aria-hidden="true">CODEPELLETS</div>
        <div className="container footer-inner">
          <span dir="ltr">© {new Date().getFullYear()} {CONTACT.company}</span>
          <span>{t.footer}</span>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a className="wa-float" href={waLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <Icon name="chat" size={32} color="#fff" />
      </a>
    </div>
  )
}

// Splits a line into words that slide up one after another
function Words({ text, start }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      <span className="word"><span style={{ '--i': start + i }}>{w}</span></span>{' '}
    </Fragment>
  ))
}

function Marquee({ items, className }) {
  const half = [...items, ...items]
  const list = [...half, ...half]
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        {list.map((m, i) => (
          <span className="mq-item" key={i}>
            <Icon name={m.icon} size={26} color="#FFC531" />
            {m.title}
            <span className="mq-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div data-reveal>
      <div className="section-head">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  )
}
