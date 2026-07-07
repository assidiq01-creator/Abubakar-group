"use client";

import { useEffect, useRef, useState } from "react";

const SUBSIDIARIES = [
  {
    name: "Abubakar Shopping Mall",
    tag: "E-Commerce & Retail",
    desc: "A modern e-commerce and retail platform connecting global products with local markets across Africa and beyond — focused on accessibility, quality, and seamless customer experience.",
    logo: "https://abubakarmall.com/wp-content/uploads/2024/11/cropped-Untitled-design-10.png",
    url: "https://abubakarmall.com",
    urlLabel: "abubakarmall.com",
    bg: "#F7F8FA",
  },
  {
    name: "Abubakar Global Trade Solutions Ltd",
    tag: "Import & Export",
    desc: "A trusted import and export company facilitating international trade, connecting suppliers and markets across Turkey, Africa, and beyond with reliability and expertise.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/Global-Trade-Solutions-Logo-copy-3-e1773802066411.png",
    url: "https://abubakarmall.com/trade",
    urlLabel: "Learn more",
    bg: "#FFFFFF",
  },
  {
    name: "ASM Academy",
    tag: "Education & Training",
    desc: "Committed to education and capacity building through professional training, skill development, and academic preparation — equipping individuals for global opportunities.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ACADEMY-LOGO-scaled-e1773801253995.png",
    url: "http://www.asm-academy.com.ng",
    urlLabel: "asm-academy.com.ng",
    bg: "#F7F8FA",
  },
  {
    name: "ASM Consultancy",
    tag: "Consultancy & Immigration",
    desc: "Expert support in international education admissions and immigration processes — helping clients navigate global systems and achieve academic and professional goals abroad.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-C-last-%E2%9C%85.png",
    url: "https://asm-consultancy.abubakarmall.com",
    urlLabel: "asm-consultancy.abubakarmall.com",
    bg: "#FFFFFF",
  },
  {
    name: "ASM Real Estate",
    tag: "Property & Investment",
    desc: "Specialising in property development, investment, and management across key markets — delivering reliable and profitable real estate solutions for individuals and institutions.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-REAL-ESTATE.png",
    url: "https://real-estate.abubakarmall.com",
    urlLabel: "real-estate.abubakarmall.com",
    bg: "#F7F8FA",
  },
  {
    name: "Arewa Digital Solutions",
    tag: "Digital & Software Development",
    desc: "A forward-thinking digital agency delivering web development, software solutions, and AI-powered products to help brands grow and compete in the global digital economy.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/gfhf-2.png",
    url: "https://www.digital.abubakarmall.com",
    urlLabel: "digital.abubakarmall.com",
    bg: "#FFFFFF",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  // Nav scroll state
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section for progress dots
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.5 }
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
          <ul className="nav-links">
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="mailto:info@abubakar-group.com">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Progress dots */}
      <div className="dots" aria-hidden="true">
        {SUBSIDIARIES.map((_, i) => (
          <button
            key={i}
            className={`dot-btn${active === i ? " active" : ""}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-ghost" aria-hidden="true">ABUBAKAR GROUP</div>
        <div className="hero-content">
          <div className="hero-eyebrow">Global Holdings</div>
          <h1 className="hero-headline">Building across borders,<br />sectors, and generations.</h1>
          <p className="hero-sub">
            A diversified holding company with subsidiaries spanning e-commerce, international trade,
            digital technology, education, real estate, and consulting.
          </p>
          <button className="hero-cta" onClick={() => scrollTo(0)}>
            View our portfolio
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
            </svg>
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-n">6</span><span className="stat-l">Subsidiaries</span></div>
          <div className="stat"><span className="stat-n">3+</span><span className="stat-l">Continents</span></div>
          <div className="stat"><span className="stat-n">10+</span><span className="stat-l">Years</span></div>
        </div>
      </section>

      {/* Subsidiaries — full-screen scroll sections */}
      <div id="portfolio">
        {SUBSIDIARIES.map((s, i) => (
          <section
            key={s.name}
            ref={el => { sectionRefs.current[i] = el; }}
            className="sub"
            style={{ background: s.bg }}
          >
            <div className={`sub-inner${i % 2 !== 0 ? " sub-flip" : ""}`}>
              {/* Logo side */}
              <div className="sub-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.logo} alt={s.name} className="sub-logo" />
              </div>

              {/* Text side */}
              <div className="sub-text">
                <span className="sub-tag">{s.tag}</span>
                <h2 className="sub-name">{s.name}</h2>
                <p className="sub-desc">{s.desc}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="sub-link">
                  {s.urlLabel}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Section counter */}
            <div className="sub-counter" aria-hidden="true">
              <span className="counter-n">0{i + 1}</span>
              <span className="counter-slash">/</span>
              <span className="counter-total">0{SUBSIDIARIES.length}</span>
            </div>
          </section>
        ))}
      </div>

      {/* About */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-left">
            <div className="about-label">Our Mission</div>
            <h2 className="about-heading">Bridging markets.<br />Creating lasting value.</h2>
          </div>
          <div className="about-right">
            <p>Abubakar Group Ltd is a dynamic holding company committed to creating sustainable value across multiple sectors. By bridging markets and leveraging deep industry expertise, we deliver innovative solutions that connect people, capital, and opportunity.</p>
            <p>With operations spanning Turkey, Nigeria, and international markets, we take a long-term view — building businesses that serve real needs and stand the test of time.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Abubakar Group Ltd</div>
            <div className="footer-sub">Global Holdings & Investments</div>
          </div>
          <ul className="footer-links">
            {SUBSIDIARIES.map(s => (
              <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
            ))}
          </ul>
          <div className="footer-copy">© {new Date().getFullYear()} Abubakar Group Ltd</div>
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
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom-color: #E2E8F0;
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 66px; max-width: 1300px; margin: 0 auto;
        }
        .nav-logo { display: flex; align-items: center; }
        .nav-group-logo { height: 36px; max-width: 180px; width: auto; object-fit: contain; display: block; }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a {
          font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: #5C6B7A; transition: color 0.2s;
        }
        .nav-links a:hover { color: #0D1B2A; }
        @media (max-width: 640px) { .nav-links { display: none; } }

        /* ── Progress dots ── */
        .dots {
          position: fixed; right: 1.2rem; top: 50%; transform: translateY(-50%);
          z-index: 150; display: flex; flex-direction: column; gap: 10px;
        }
        .dot-btn {
          width: 8px; height: 8px; border-radius: 50%;
          border: 1.5px solid #B8860B; background: transparent;
          cursor: pointer; padding: 0;
          transition: background 0.25s, transform 0.25s;
        }
        .dot-btn.active { background: #B8860B; transform: scale(1.3); }
        /* On mobile: move dots to bottom-center, horizontal */
        @media (max-width: 640px) {
          .dots {
            right: unset; top: unset;
            bottom: 1.4rem; left: 50%;
            transform: translateX(-50%);
            flex-direction: row; gap: 12px;
          }
        }

        /* ── Hero ── */
        .hero {
          min-height: 100svh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 100px clamp(2rem, 8vw, 10rem) 80px;
          background: #fff; position: relative; overflow: hidden;
        }
        .hero-ghost {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: Georgia, serif;
          font-size: clamp(5rem, 14vw, 16rem);
          font-weight: normal; white-space: nowrap;
          color: #0D1B2A; opacity: 0.028;
          pointer-events: none; user-select: none;
          letter-spacing: -0.02em;
        }
        .hero-content { max-width: 800px; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #B8860B; margin-bottom: 2rem;
        }
        .hero-eyebrow::before { content:''; display:block; width:28px; height:1px; background:#B8860B; }
        .hero-headline {
          font-family: Georgia, serif;
          font-size: clamp(2.8rem, 6vw, 6.5rem);
          font-weight: normal; line-height: 1.06;
          letter-spacing: -0.025em; color: #0D1B2A;
          margin-bottom: 1.8rem; text-wrap: balance;
        }
        .hero-sub {
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          color: #5C6B7A; line-height: 1.75; max-width: 500px;
          margin-bottom: 3rem;
        }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: #0D1B2A; color: #fff;
          font-size: 0.85rem; letter-spacing: 0.06em;
          padding: 14px 28px; border-radius: 2px;
          border: none; cursor: pointer;
          transition: background 0.2s, gap 0.2s;
        }
        .hero-cta:hover { background: #1a3050; gap: 16px; }
        .hero-stats {
          display: flex; gap: clamp(2.5rem, 5vw, 6rem);
          position: absolute; bottom: 3rem;
          left: clamp(2rem, 8vw, 10rem);
        }
        .stat { display: flex; flex-direction: column; }
        .stat-n {
          font-family: Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #0D1B2A; line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .stat-l {
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: #5C6B7A; margin-top: 4px;
        }

        /* ── Subsidiary sections ── */
        .sub {
          min-height: 100svh;
          display: flex; align-items: center; justify-content: center;
          padding: 80px clamp(2rem, 8vw, 10rem);
          position: relative;
        }
        .sub-inner {
          max-width: 1200px; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 7vw, 8rem); align-items: center;
        }
        .sub-flip { direction: rtl; }
        .sub-flip > * { direction: ltr; }
        .sub-visual {
          display: flex; align-items: center; justify-content: center;
          padding: clamp(2.5rem, 4vw, 4.5rem);
          background: #fff;
          border: 1px solid #E8ECF2;
          border-radius: 3px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.06);
        }
        .sub-logo {
          max-width: 280px; max-height: 220px;
          width: 100%; height: auto; object-fit: contain;
        }
        .sub-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #B8860B; margin-bottom: 1.1rem;
        }
        .sub-tag::before { content:''; display:block; width:20px; height:1px; background:#B8860B; }
        .sub-name {
          font-family: Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 3rem);
          font-weight: normal; line-height: 1.1;
          letter-spacing: -0.02em; color: #0D1B2A;
          margin-bottom: 1.2rem; text-wrap: balance;
        }
        .sub-desc {
          font-size: clamp(0.95rem, 1vw, 1.05rem);
          color: #5C6B7A; line-height: 1.8;
          max-width: 440px; margin-bottom: 2rem;
        }
        .sub-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.82rem; letter-spacing: 0.05em;
          color: #0D1B2A; border-bottom: 1px solid #B8860B;
          padding-bottom: 2px; transition: gap 0.2s, color 0.2s;
        }
        .sub-link:hover { gap: 14px; color: #B8860B; }

        /* Counter */
        .sub-counter {
          position: absolute; bottom: 2.5rem; right: clamp(2rem, 8vw, 10rem);
          display: flex; align-items: baseline; gap: 4px;
          font-variant-numeric: tabular-nums;
        }
        .counter-n { font-family: Georgia, serif; font-size: 2rem; color: #0D1B2A; line-height: 1; }
        .counter-slash { font-size: 0.8rem; color: #DDE2E8; margin: 0 2px; }
        .counter-total { font-size: 0.75rem; color: #B0BAC4; }

        @media (max-width: 900px) {
          .sub-inner, .sub-flip { grid-template-columns: 1fr; direction: ltr; }
          .sub-visual { padding: 2rem; }
          .sub-logo { max-width: 200px; }
          .sub-counter { display: none; }
        }

        /* ── About ── */
        .about {
          min-height: 60vh; display: flex; align-items: center;
          background: #0D1B2A; color: #EEF2F7;
          padding: clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem);
        }
        .about-inner {
          max-width: 1200px; width: 100%; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: clamp(3rem, 7vw, 8rem); align-items: start;
        }
        .about-label { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: #B8860B; margin-bottom: 1.5rem; }
        .about-heading {
          font-family: Georgia, serif;
          font-size: clamp(1.7rem, 3vw, 2.8rem);
          font-weight: normal; line-height: 1.2; letter-spacing: -0.015em;
        }
        .about-right { font-size: clamp(0.9rem, 1vw, 1rem); color: rgba(238,242,247,0.6); line-height: 1.82; padding-top: 0.5rem; }
        .about-right p + p { margin-top: 1.2em; }
        @media (max-width: 768px) { .about-inner { grid-template-columns: 1fr; } }

        /* ── Footer ── */
        .footer { padding: clamp(3rem, 5vw, 4rem) clamp(2rem, 8vw, 10rem); border-top: 1px solid #E2E8F0; background: #fff; }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 2rem;
        }
        .footer-logo { font-family: Georgia, serif; font-size: 1.05rem; color: #0D1B2A; }
        .footer-sub { font-size: 0.75rem; color: #5C6B7A; margin-top: 4px; letter-spacing: 0.04em; }
        .footer-links { display: flex; flex-wrap: wrap; gap: 0.4rem 1.8rem; list-style: none; max-width: 540px; }
        .footer-links a { font-size: 0.8rem; color: #5C6B7A; transition: color 0.2s; }
        .footer-links a:hover { color: #0D1B2A; }
        .footer-copy { font-size: 0.75rem; color: #5C6B7A; align-self: flex-end; }
        @media (max-width: 640px) { .footer-inner { flex-direction: column; } }
      `}</style>
    </>
  );
}
