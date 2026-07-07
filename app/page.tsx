"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SUBSIDIARIES = [
  {
    name: "Abubakar Shopping Mall",
    tag: "E-Commerce & Retail",
    desc: "A modern e-commerce and retail platform connecting global products with local markets across Africa and beyond. Focused on accessibility, quality, and a seamless customer experience.",
    logo: "https://abubakarmall.com/wp-content/uploads/2024/11/cropped-Untitled-design-10.png",
    url: "https://abubakarmall.com",
    urlLabel: "abubakarmall.com",
  },
  {
    name: "Abubakar Global Trade Solutions Ltd",
    tag: "Import & Export",
    desc: "A trusted import and export company facilitating international trade, connecting suppliers and markets across Turkey, Africa, and beyond with reliability and expertise.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/Global-Trade-Solutions-Logo-copy-3-e1773802066411.png",
    url: "https://abubakarmall.com",
    urlLabel: "Learn more",
  },
  {
    name: "ASM Academy",
    tag: "Education & Training",
    desc: "Committed to education and capacity building through professional training, skill development, and academic preparation — equipping individuals for global opportunities.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ACADEMY-LOGO-scaled-e1773801253995.png",
    url: "https://asm-academy.com",
    urlLabel: "asm-academy.com",
  },
  {
    name: "ASM Consultancy",
    tag: "Consultancy & Immigration",
    desc: "Expert support in international education admissions and immigration processes — helping clients navigate global systems and achieve academic and professional goals abroad.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-C-last-%E2%9C%85.png",
    url: "https://abubakarmall.com",
    urlLabel: "Learn more",
  },
  {
    name: "ASM Real Estate",
    tag: "Property & Investment",
    desc: "Specialising in property development, investment, and management across key markets — delivering reliable and profitable real estate solutions for individuals and institutions.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-REAL-ESTATE.png",
    url: "https://abubakarmall.com",
    urlLabel: "Learn more",
  },
  {
    name: "Arewa Digital Solutions",
    tag: "Digital & Software Development",
    desc: "A forward-thinking digital agency delivering web development, software solutions, and AI-powered products to help brands grow and compete in the global digital economy.",
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/gfhf-2.png",
    url: "https://arewa-digital.com",
    urlLabel: "arewa-digital.com",
  },
];

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function SubsidiarySection({ s, index }: { s: typeof SUBSIDIARIES[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reverse = index % 2 !== 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`sub-section${reverse ? " sub-reverse" : ""}${index % 2 !== 0 ? " sub-alt" : ""}`}
    >
      <div className="sub-inner">
        <div className="sub-text">
          <span className="sub-tag">{s.tag}</span>
          <h2 className="sub-name">{s.name}</h2>
          <p className="sub-desc">{s.desc}</p>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="sub-link">
            {s.urlLabel} <ArrowRight />
          </a>
        </div>
        <div className="sub-logo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.logo}
            alt={s.name}
            className="sub-logo"
          />
        </div>
      </div>

      <style jsx>{`
        .sub-section {
          padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 7vw, 8rem);
          background: #fff;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sub-section.visible { opacity: 1; transform: none; }
        .sub-alt { background: #F5F7FA; }
        .sub-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 6vw, 7rem);
          align-items: center;
        }
        .sub-reverse .sub-inner { direction: rtl; }
        .sub-reverse .sub-inner > * { direction: ltr; }
        .sub-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8860B;
          margin-bottom: 1.1rem;
        }
        .sub-tag::before {
          content: '';
          display: block;
          width: 22px; height: 1px;
          background: #B8860B;
        }
        .sub-name {
          font-family: Georgia, "Palatino Linotype", serif;
          font-size: clamp(1.8rem, 3.2vw, 3rem);
          font-weight: normal;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-wrap: balance;
          color: #0D1B2A;
          margin-bottom: 1.2rem;
        }
        .sub-desc {
          font-size: clamp(0.95rem, 1.05vw, 1.05rem);
          color: #5C6B7A;
          line-height: 1.78;
          max-width: 460px;
          margin-bottom: 2rem;
        }
        .sub-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.825rem;
          letter-spacing: 0.05em;
          color: #0D1B2A;
          border-bottom: 1px solid #B8860B;
          padding-bottom: 2px;
          transition: gap 0.2s, color 0.2s;
        }
        .sub-link:hover { gap: 14px; color: #B8860B; }
        .sub-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2rem, 4vw, 4rem);
          background: #fff;
          border: 1px solid #E8ECF0;
          border-radius: 4px;
        }
        .sub-alt .sub-logo-wrap { background: #fff; }
        .sub-logo {
          max-width: 280px;
          max-height: 200px;
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .sub-inner, .sub-reverse .sub-inner { grid-template-columns: 1fr; direction: ltr; }
          .sub-logo-wrap { padding: 2rem; }
          .sub-logo { max-width: 220px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sub-section { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
    </section>
  );
}

export default function Home() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Nav */}
      <nav ref={navRef} className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            Abubakar Group<span className="nav-dot" />Ltd
          </a>
          <ul className="nav-links">
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="mailto:info@abubakar-group.com">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-ghost" aria-hidden="true">ABUBAKAR GROUP</div>
        <div className="hero-inner">
          <div className="hero-eyebrow">Global Holdings</div>
          <h1 className="hero-headline">Building across borders, sectors, and generations.</h1>
          <p className="hero-sub">
            Abubakar Group Ltd is a diversified holding company with subsidiaries spanning e-commerce,
            international trade, digital technology, education, real estate, and consulting.
          </p>
          <div className="hero-stats">
            <div><div className="stat-n">6</div><div className="stat-l">Subsidiaries</div></div>
            <div><div className="stat-n">3+</div><div className="stat-l">Continents</div></div>
            <div><div className="stat-n">10+</div><div className="stat-l">Years operating</div></div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      <hr className="divider" />

      {/* Subsidiaries */}
      <div id="portfolio">
        {SUBSIDIARIES.map((s, i) => (
          <div key={s.name}>
            <SubsidiarySection s={s} index={i} />
            {i < SUBSIDIARIES.length - 1 && <hr className="divider" />}
          </div>
        ))}
      </div>

      {/* About */}
      <section className="about" id="about">
        <div className="about-inner">
          <div>
            <div className="about-label">Our Mission</div>
            <h2 className="about-heading">Bridging markets.<br />Creating lasting value.</h2>
          </div>
          <div className="about-body">
            <p>
              Abubakar Group Ltd is a dynamic holding company committed to creating sustainable value across
              multiple sectors. By bridging markets and leveraging deep industry expertise, we deliver
              innovative solutions that connect people, capital, and opportunity.
            </p>
            <p>
              With operations spanning Turkey, Nigeria, and international markets, we take a long-term view —
              building businesses that serve real needs and stand the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Abubakar Group Ltd</div>
            <div className="footer-tagline">Global Holdings & Investments</div>
          </div>
          <ul className="footer-links">
            {SUBSIDIARIES.map(s => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
              </li>
            ))}
          </ul>
          <div className="footer-copy">© {new Date().getFullYear()} Abubakar Group Ltd</div>
        </div>
      </footer>

      <style jsx global>{`
        /* Nav */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
        }
        .nav.scrolled { border-bottom-color: #E2E8F0; }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; max-width: 1300px; margin: 0 auto;
        }
        .nav-logo {
          font-family: Georgia, "Palatino Linotype", serif;
          font-size: 1rem; letter-spacing: 0.01em; color: #0D1B2A;
        }
        .nav-dot {
          display: inline-block; width: 5px; height: 5px;
          background: #B8860B; border-radius: 50%;
          margin: 0 5px 1px; vertical-align: middle;
        }
        .nav-links {
          display: flex; gap: 2.5rem; list-style: none;
        }
        .nav-links a {
          font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: #5C6B7A; transition: color 0.2s;
        }
        .nav-links a:hover { color: #0D1B2A; }
        @media (max-width: 640px) { .nav-links { display: none; } }

        /* Hero */
        .hero {
          min-height: 100svh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 120px clamp(1.5rem, 7vw, 8rem) 80px;
          position: relative; overflow: hidden;
        }
        .hero-ghost {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: Georgia, "Palatino Linotype", serif;
          font-size: clamp(5rem, 15vw, 17rem);
          font-weight: normal; white-space: nowrap;
          color: #0D1B2A; opacity: 0.03;
          pointer-events: none; user-select: none;
          letter-spacing: -0.02em;
        }
        .hero-inner { max-width: 1300px; margin: 0 auto; width: 100%; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #B8860B; margin-bottom: 2rem;
        }
        .hero-eyebrow::before {
          content: ''; display: block; width: 30px; height: 1px; background: #B8860B;
        }
        .hero-headline {
          font-family: Georgia, "Palatino Linotype", serif;
          font-size: clamp(2.6rem, 6vw, 6.5rem);
          font-weight: normal; line-height: 1.06;
          letter-spacing: -0.02em; text-wrap: balance;
          color: #0D1B2A; max-width: 800px; margin-bottom: 2rem;
        }
        .hero-sub {
          font-size: clamp(1rem, 1.25vw, 1.15rem);
          color: #5C6B7A; max-width: 500px; line-height: 1.72; margin-bottom: 3.5rem;
        }
        .hero-stats { display: flex; gap: clamp(2rem, 5vw, 5rem); flex-wrap: wrap; }
        .stat-n {
          font-family: Georgia, "Palatino Linotype", serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #0D1B2A; line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .stat-l {
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: #5C6B7A; margin-top: 4px;
        }
        .hero-scroll {
          position: absolute; bottom: 2.5rem;
          left: clamp(1.5rem, 7vw, 8rem);
          display: flex; align-items: center; gap: 10px;
          font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: #5C6B7A;
        }
        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #B8860B, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; } 50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) { .scroll-line { animation: none; } }

        /* Divider */
        .divider { border: none; height: 1px; background: #E2E8F0; }

        /* About */
        .about {
          background: #0D1B2A; color: #EEF2F7;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 7vw, 8rem);
        }
        .about-inner {
          max-width: 1300px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: clamp(3rem, 6vw, 7rem); align-items: start;
        }
        .about-label {
          font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #B8860B; margin-bottom: 1.5rem;
        }
        .about-heading {
          font-family: Georgia, "Palatino Linotype", serif;
          font-size: clamp(1.6rem, 2.8vw, 2.6rem);
          font-weight: normal; line-height: 1.2;
          letter-spacing: -0.01em; text-wrap: balance;
        }
        .about-body { font-size: clamp(0.9rem, 1vw, 1rem); color: rgba(238,242,247,0.6); line-height: 1.8; }
        .about-body p + p { margin-top: 1.2em; }
        @media (max-width: 768px) { .about-inner { grid-template-columns: 1fr; } }

        /* Footer */
        .footer { padding: clamp(3rem, 5vw, 4rem) clamp(1.5rem, 7vw, 8rem); border-top: 1px solid #E2E8F0; }
        .footer-inner {
          max-width: 1300px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 2rem;
        }
        .footer-logo {
          font-family: Georgia, "Palatino Linotype", serif;
          font-size: 1.05rem; color: #0D1B2A;
        }
        .footer-tagline { font-size: 0.75rem; color: #5C6B7A; margin-top: 4px; letter-spacing: 0.04em; }
        .footer-links { display: flex; flex-wrap: wrap; gap: 0.4rem 1.8rem; list-style: none; max-width: 560px; }
        .footer-links a { font-size: 0.8rem; color: #5C6B7A; transition: color 0.2s; }
        .footer-links a:hover { color: #0D1B2A; }
        .footer-copy { font-size: 0.75rem; color: #5C6B7A; align-self: flex-end; }
        @media (max-width: 640px) { .footer-inner { flex-direction: column; } }
      `}</style>
    </>
  );
}
