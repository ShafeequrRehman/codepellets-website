import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { content, CONTACT } from './content.js'

export default function App() {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  const waLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.hero.waMessage)}`
  const links = [
    ['features', t.nav.features],
    ['products', t.nav.products],
    ['why', t.nav.why],
    ['contact', t.nav.contact],
  ]

  return (
    <div className={`site lang-${lang}`}>
      {/* ---------- Navbar ---------- */}
      <header className="nav">
        <div className="container nav-inner">
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
      </header>

      {/* ---------- Hero ---------- */}
      <section id="top" className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="badge">{t.hero.badge}</span>
            <h1>
              {t.hero.title1}
              <br />
              {t.hero.title2} <span className="accent">{t.hero.highlight}</span>
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-ctas">
              <a className="btn btn-wa" href={waLink} target="_blank" rel="noreferrer">
                <Icon name="chat" size={24} color="#fff" /> {t.hero.whatsapp}
              </a>
              <a className="btn btn-accent" href={CONTACT.phoneLink}>
                <Icon name="phone" size={22} color="#0B2A4A" /> {t.hero.call}
              </a>
            </div>
            <p className="hero-phone" dir="ltr">{CONTACT.phone}</p>
          </div>

          {/* Simple illustration: a POS screen with a printed slip */}
          <div className="hero-art" aria-hidden="true">
            <div className="screen">
              <div className="screen-bar"><i></i><i></i><i></i></div>
              <div className="screen-body">
                <div className="rows">
                  <div className="row w80"></div>
                  <div className="row w60"></div>
                  <div className="row w70"></div>
                  <div className="row w50"></div>
                </div>
                <div className="bars">
                  <span style={{ height: '40%' }}></span>
                  <span style={{ height: '70%' }}></span>
                  <span style={{ height: '55%' }}></span>
                  <span style={{ height: '90%' }}></span>
                  <span style={{ height: '65%' }}></span>
                </div>
              </div>
            </div>
            <div className="slip">
              <div className="slip-line w90"></div>
              <div className="slip-line w70"></div>
              <div className="slip-line w80"></div>
              <div className="slip-line w60"></div>
              <div className="slip-total"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section id="features" className="section">
        <div className="container">
          <SectionHead title={t.features.title} sub={t.features.sub} />
          <div className="grid grid-4">
            {t.features.items.map((f) => (
              <article key={f.icon} className="card feature">
                <div className="icon-box"><Icon name={f.icon} size={36} color="#FFC531" /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Products ---------- */}
      <section id="products" className="section section-alt">
        <div className="container">
          <SectionHead title={t.products.title} sub={t.products.sub} />
          <div className="grid grid-4">
            {t.products.items.map((p) => (
              <article key={p.icon} className="card product">
                <Icon name={p.icon} size={54} color="#FFC531" strokeWidth={1.6} />
                <span className="tag" dir="ltr">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why us ---------- */}
      <section id="why" className="section">
        <div className="container">
          <SectionHead title={t.why.title} />
          <div className="grid grid-3">
            {t.why.items.map((w) => (
              <article key={w.icon} className="why">
                <div className="why-icon"><Icon name={w.icon} size={34} color="#0B2A4A" /></div>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Yellow banner ---------- */}
      <div className="ribbon">
        <div className="container ribbon-inner">
          <Icon name="cloud" size={38} color="#0B2A4A" />
          <span>{t.banner}</span>
          <a className="btn btn-navy" href={waLink} target="_blank" rel="noreferrer">
            <Icon name="chat" size={22} color="#fff" /> {t.hero.whatsapp}
          </a>
        </div>
      </div>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="contact">
        <div className="container">
          <SectionHead title={t.contact.title} sub={t.contact.sub} light />
          <div className="contact-grid">
            <a className="contact-card big" href={CONTACT.phoneLink}>
              <div className="contact-icons">
                <span className="circle accent-bg"><Icon name="phone" size={26} color="#0B2A4A" strokeWidth={2} /></span>
                <span className="circle wa-bg"><Icon name="chat" size={28} color="#fff" /></span>
              </div>
              <small>{t.contact.phone}</small>
              <strong dir="ltr" className="phone">{CONTACT.phone}</strong>
            </a>
            <div className="contact-card">
              <Icon name="pin" size={30} color="#FFC531" />
              <small>{t.contact.address1}</small>
              <span dir="ltr">{CONTACT.address1}</span>
            </div>
            <div className="contact-card">
              <Icon name="pin" size={30} color="#FFC531" />
              <small>{t.contact.address2}</small>
              <span dir="ltr">{CONTACT.address2}</span>
            </div>
            <div className="contact-card">
              <Icon name="user" size={30} color="#FFC531" />
              <small>{t.contact.ceo}</small>
              <span dir="ltr">{CONTACT.ceo}</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
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

function SectionHead({ title, sub, light }) {
  return (
    <div className={`section-head ${light ? 'light' : ''}`}>
      <div className="head-row">
        <span className="dash"></span>
        <h2>{title}</h2>
        <span className="dash"></span>
      </div>
      {sub && <p>{sub}</p>}
    </div>
  )
}
