"use client";

import { useEffect, useRef, useState } from "react";

const SUBSIDIARIES = [
  {
    name: "Abubakar Shopping Mall",
    tag: "E-Commerce & Retail",
    short: "Global products, local access.",
    logo: "https://abubakarmall.com/wp-content/uploads/2024/11/cropped-Untitled-design-10.png",
    url: "https://abubakarmall.com/shop",
    bg: "#F7F8FA",
    accent: "#1A5276",
  },
  {
    name: "Global Trade Solutions",
    tag: "Import & Export",
    short: "Cross-border trade made seamless.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/Global-Trade-Solutions-Logo-copy-3-e1773802066411.png",
    url: "https://abubakarmall.com",
    bg: "#FFFFFF",
    accent: "#1E8449",
  },
  {
    name: "ASM Academy",
    tag: "Education & Training",
    short: "Skills and knowledge for a global future.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ACADEMY-LOGO-scaled-e1773801253995.png",
    url: "http://www.asm-academy.com.ng",
    bg: "#F7F8FA",
    accent: "#6C3483",
  },
  {
    name: "ASM Consultancy",
    tag: "Consultancy & Immigration",
    short: "Your guide to international opportunities.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-C-last-%E2%9C%85.png",
    url: "https://asm-consultancy.abubakarmall.com",
    bg: "#FFFFFF",
    accent: "#B7950B",
  },
  {
    name: "ASM Real Estate",
    tag: "Property & Investment",
    short: "Prime properties across key markets.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-REAL-ESTATE.png",
    url: "https://real-estate.abubakarmall.com",
    bg: "#F7F8FA",
    accent: "#784212",
  },
  {
    name: "Arewa Digital",
    tag: "Digital & Software",
    short: "Technology that drives growth.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/gfhf-2.png",
    url: "https://www.digital.abubakarmall.com",
    bg: "#FFFFFF",
    accent: "#1A252F",
  },
];

export default function Home() {
  const [active, setActive] = useState(-1); // -1 = hero
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Track hero
    if (heroRef.current) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(-1); },
        { threshold: 0.4 }
      );
      obs.observe(heroRef.current);
    }
    // Track subsidiaries
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Nav */}
      <nav ref={navRef} className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://abubakarmall.com/wp-content/uploads/2025/04/ABUPNG.png"
              alt="Abubakar Group Ltd"
              className="nav-group-logo"
            />
          </a>
          <div className="nav-right">
            <span className="nav-tagline">Gateway to the Group</span>
          </div>
        </div>
      </nav>

      {/* Progress indicator — side rail */}
      <nav className="rail" aria-label="Subsidiaries">
        <button
          className={`rail-item${active === -1 ? " rail-active" : ""}`}
          onClick={() => heroRef.current?.scrollIntoView({ behavior: "smooth" })}
          title="Home"
        >
          <span className="rail-dot" />
          <span className="rail-label">Home</span>
        </button>
        {SUBSIDIARIES.map((s, i) => (
          <button
            key={i}
            className={`rail-item${active === i ? " rail-active" : ""}`}
            onClick={() => scrollTo(i)}
            title={s.name}
          >
            <span className="rail-dot" />
            <span className="rail-label">{s.name}</span>
          </button>
        ))}
      </nav>

      {/* Hero — Gateway entry */}
      <section ref={heroRef} className="hero">
        <div className="hero-ghost" aria-hidden="true">GATEWAY</div>
        <div className="hero-content">
          <div className="hero-eyebrow">Abubakar Group Ltd</div>
          <h1 className="hero-headline">
            Six ventures.<br />One gateway.
          </h1>
          <p className="hero-sub">
            Select a subsidiary below to enter.
          </p>
        </div>

        {/* Quick-access grid — the gateway itself */}
        <div className="gateway-grid">
          {SUBSIDIARIES.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gateway-card"
              onMouseEnter={() => {}}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.logo} alt={s.name} className="gateway-logo" />
              <div className="gateway-card-body">
                <span className="gateway-tag">{s.tag}</span>
                <span className="gateway-name">{s.name}</span>
              </div>
              <span className="gateway-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll to explore each subsidiary</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
          </svg>
        </div>
      </section>

      {/* Fullscreen subsidiary sections */}
      <div id="portfolio">
        {SUBSIDIARIES.map((s, i) => (
          <section
            key={s.name}
            ref={el => { sectionRefs.current[i] = el; }}
            className="sub"
            style={{ background: s.bg }}
          >
            <div className={`sub-inner${i % 2 !== 0 ? " sub-flip" : ""}`}>
              <div className="sub-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.logo} alt={s.name} className="sub-logo" />
              </div>
              <div className="sub-text">
                <span className="sub-tag">{s.tag}</span>
                <h2 className="sub-name">{s.name}</h2>
                <p className="sub-short">{s.short}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="sub-enter">
                  Enter
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="sub-counter" aria-hidden="true">
              <span className="counter-n">0{i + 1}</span>
              <span className="counter-slash"> / </span>
              <span className="counter-total">06</span>
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://abubakarmall.com/wp-content/uploads/2025/04/ABUPNG.png"
            alt="Abubakar Group Ltd"
            className="footer-logo-img"
          />
          <ul className="footer-links">
            {SUBSIDIARIES.map(s => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name} →
                </a>
              </li>
            ))}
          </ul>
          <div className="footer-copy">© {new Date().getFullYear()} Abubakar Group Ltd · All rights reserved</div>
        </div>
      </footer>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        /* ── Nav ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          transition: background 0.3s, border-color 0.3s;
          border-bottom: 1px solid transparent;
        }
        .nav.scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom-color: #E2E8F0;
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; max-width: 1400px; margin: 0 auto;
        }
        .nav-logo { display: flex; align-items: center; }
        .nav-group-logo { height: 34px; max-width: 170px; width: auto; object-fit: contain; display: block; }
        .nav-tagline { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: #B8860B; }
        @media (max-width: 480px) { .nav-tagline { display: none; } }

        /* ── Side rail nav ── */
        .rail {
          position: fixed; right: 1.2rem; top: 50%; transform: translateY(-50%);
          z-index: 150; display: flex; flex-direction: column; gap: 6px;
          align-items: flex-end;
        }
        .rail-item {
          display: flex; align-items: center; gap: 8px; flex-direction: row-reverse;
          background: none; border: none; cursor: pointer; padding: 4px 0;
          opacity: 0.5; transition: opacity 0.2s;
        }
        .rail-item:hover, .rail-item.rail-active { opacity: 1; }
        .rail-dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: 1.5px solid #B8860B; background: transparent;
          transition: background 0.2s, transform 0.2s; flex-shrink: 0;
        }
        .rail-active .rail-dot { background: #B8860B; transform: scale(1.3); }
        .rail-label {
          font-size: 0.65rem; letter-spacing: 0.06em; color: #0D1B2A;
          white-space: nowrap; opacity: 0; transform: translateX(4px);
          transition: opacity 0.2s, transform 0.2s; pointer-events: none;
        }
        .rail-item:hover .rail-label { opacity: 1; transform: translateX(0); }
        @media (max-width: 640px) {
          .rail {
            right: unset; top: unset; bottom: 1.2rem; left: 50%;
            transform: translateX(-50%); flex-direction: row; gap: 14px;
            background: rgba(255,255,255,0.9); backdrop-filter: blur(10px);
            padding: 10px 18px; border-radius: 40px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          }
          .rail-item { flex-direction: column; gap: 0; }
          .rail-label { display: none; }
          .rail-dot { width: 8px; height: 8px; }
        }

        /* ── Hero ── */
        .hero {
          min-height: 100svh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 90px clamp(1.5rem, 7vw, 8rem) 6rem;
          background: #fff; position: relative; overflow: hidden;
        }
        .hero-ghost {
          position: absolute; bottom: -0.1em; right: -0.05em;
          font-family: Georgia, serif;
          font-size: clamp(8rem, 22vw, 22rem);
          font-weight: normal; white-space: nowrap;
          color: #0D1B2A; opacity: 0.025;
          pointer-events: none; user-select: none;
          letter-spacing: -0.03em; line-height: 1;
        }
        .hero-content { max-width: 600px; margin-bottom: 3.5rem; }
        .hero-eyebrow {
          font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #B8860B; margin-bottom: 1.2rem;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .hero-eyebrow::before { content:''; display:block; width:24px; height:1px; background:#B8860B; }
        .hero-headline {
          font-family: Georgia, serif;
          font-size: clamp(3rem, 6.5vw, 7rem);
          font-weight: normal; line-height: 1.04;
          letter-spacing: -0.03em; color: #0D1B2A;
          margin-bottom: 1rem;
        }
        .hero-sub {
          font-size: 0.9rem; letter-spacing: 0.06em; text-transform: uppercase;
          color: #5C6B7A;
        }

        /* ── Gateway grid ── */
        .gateway-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: #E2E8F0;
          border: 1px solid #E2E8F0; border-radius: 4px;
          overflow: hidden; max-width: 900px;
          position: relative; z-index: 1;
        }
        .gateway-card {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.2rem 1.4rem;
          background: #fff; text-decoration: none;
          transition: background 0.18s;
          position: relative;
        }
        .gateway-card:hover { background: #FAFBFC; }
        .gateway-card:hover .gateway-arrow { opacity: 1; transform: translateX(0); }
        .gateway-logo {
          width: 44px; height: 44px; object-fit: contain; flex-shrink: 0;
        }
        .gateway-card-body { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
        .gateway-tag { font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: #B8860B; }
        .gateway-name { font-size: 0.82rem; color: #0D1B2A; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .gateway-arrow {
          font-size: 1rem; color: #B8860B;
          opacity: 0; transform: translateX(-4px);
          transition: opacity 0.18s, transform 0.18s;
          flex-shrink: 0;
        }

        .hero-scroll-hint {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: #B0BAC4; margin-top: 2.5rem;
          position: relative; z-index: 1;
        }

        @media (max-width: 700px) {
          .gateway-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 420px) {
          .gateway-grid { grid-template-columns: 1fr; }
          .gateway-card { padding: 1rem 1.2rem; }
        }

        /* ── Subsidiary full sections ── */
        .sub {
          min-height: 100svh;
          display: flex; align-items: center; justify-content: center;
          padding: 80px clamp(1.5rem, 7vw, 8rem);
          position: relative;
        }
        .sub-inner {
          max-width: 1100px; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 7vw, 8rem); align-items: center;
        }
        .sub-flip { direction: rtl; }
        .sub-flip > * { direction: ltr; }
        .sub-visual {
          display: flex; align-items: center; justify-content: center;
          padding: clamp(2rem, 4vw, 4rem);
          background: #fff; border: 1px solid #E8ECF2;
          border-radius: 3px; box-shadow: 0 4px 40px rgba(0,0,0,0.06);
        }
        .sub-logo { max-width: 260px; max-height: 200px; width: 100%; height: auto; object-fit: contain; }
        .sub-tag {
          display: block; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #B8860B; margin-bottom: 0.8rem;
        }
        .sub-name {
          font-family: Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 3.2rem);
          font-weight: normal; line-height: 1.1;
          letter-spacing: -0.02em; color: #0D1B2A;
          margin-bottom: 1rem;
        }
        .sub-short {
          font-size: 1rem; color: #5C6B7A; line-height: 1.7;
          margin-bottom: 2rem;
        }
        .sub-enter {
          display: inline-flex; align-items: center; gap: 10px;
          background: #0D1B2A; color: #fff;
          font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 2px;
          transition: background 0.2s, gap 0.2s;
        }
        .sub-enter:hover { background: #1a3050; gap: 18px; }

        .sub-counter {
          position: absolute; bottom: 2rem; right: clamp(1.5rem, 7vw, 8rem);
          font-variant-numeric: tabular-nums;
          font-family: Georgia, serif; font-size: 1.6rem;
          color: rgba(13,27,42,0.12); line-height: 1;
          letter-spacing: -0.02em;
        }
        .counter-slash { font-family: system-ui; font-size: 0.9rem; }

        @media (max-width: 860px) {
          .sub-inner, .sub-flip { grid-template-columns: 1fr; direction: ltr; }
          .sub-visual { padding: 2rem; }
          .sub-logo { max-width: 180px; }
          .sub-counter { display: none; }
        }

        /* ── Footer ── */
        .footer {
          padding: clamp(3rem, 5vw, 4.5rem) clamp(1.5rem, 7vw, 8rem);
          border-top: 1px solid #E2E8F0; background: #fff;
        }
        .footer-inner { max-width: 1100px; margin: 0 auto; }
        .footer-logo-img { height: 32px; width: auto; object-fit: contain; margin-bottom: 2rem; }
        .footer-links {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem 2rem; list-style: none; margin-bottom: 2.5rem;
        }
        .footer-links a { font-size: 0.82rem; color: #5C6B7A; transition: color 0.2s; }
        .footer-links a:hover { color: #B8860B; }
        .footer-copy { font-size: 0.72rem; color: #B0BAC4; }
        @media (max-width: 640px) {
          .footer-links { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </>
  );
}
