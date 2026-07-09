"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────── DATA ── */

const SUBSIDIARIES = [
  {
    num: "01",
    name: "Abubakar Global Trade Solutions",
    tag: "International Procurement & Logistics",
    desc: "Specialized in international trade, procurement services and logistics solutions for businesses and government institutions across the globe.",
    features: ["Procurement", "Logistics", "Supply Chain"],
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/Global-Trade-Solutions-Logo-copy-3-e1773802066411.png",
    url: "https://abubakarmall.com",
    accent: "#1B8C4E",
    imgBg: "linear-gradient(135deg,#041408 0%,#0A3020 50%,#041408 100%)",
    imgIcon: "🌍",
  },
  {
    num: "02",
    name: "Abubakar Shopping Mall",
    tag: "Import, Export & E-commerce Marketplace",
    desc: "Africa's growing marketplace connecting global suppliers with African businesses and consumers through seamless B2B and B2C commerce solutions.",
    features: ["E-commerce", "Wholesale", "Global Sourcing"],
    logo: "https://abubakarmall.com/wp-content/uploads/2024/11/cropped-Untitled-design-10.png",
    url: "https://abubakarmall.com/shop",
    accent: "#1A72C2",
    imgBg: "linear-gradient(135deg,#061628 0%,#0E3060 50%,#061628 100%)",
    imgIcon: "🛒",
  },
  {
    num: "03",
    name: "ASM Academy",
    tag: "Professional Online Learning",
    desc: "Empowering individuals and organizations with in-demand skills through affordable, accessible and practical online learning and professional training.",
    features: ["Online Courses", "Certifications", "Skill Development"],
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ACADEMY-LOGO-scaled-e1773801253995.png",
    url: "http://www.asm-academy.com.ng",
    accent: "#7B3FA0",
    imgBg: "linear-gradient(135deg,#0E0520 0%,#2A1050 50%,#0E0520 100%)",
    imgIcon: "🎓",
  },
  {
    num: "04",
    name: "ASM Consultancy",
    tag: "International Education Consultancy",
    desc: "Guiding students to global opportunities through expert admissions support, visa guidance and comprehensive educational consulting services.",
    features: ["Admissions", "Visa Guidance", "Consulting"],
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-C-last-%E2%9C%85.png",
    url: "https://asm-consultancy.abubakarmall.com",
    accent: "#0E8C8A",
    imgBg: "linear-gradient(135deg,#021520 0%,#054050 50%,#021520 100%)",
    imgIcon: "📋",
  },
  {
    num: "05",
    name: "ASM Real Estate",
    tag: "Property Development & Investment",
    desc: "Delivering smart real estate solutions through property development, investment advisory and comprehensive management services across key growth markets.",
    features: ["Property Development", "Investment", "Management"],
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/ASM-REAL-ESTATE.png",
    url: "https://real-estate.abubakarmall.com",
    accent: "#C49A00",
    imgBg: "linear-gradient(135deg,#140E00 0%,#382800 50%,#140E00 100%)",
    imgIcon: "🏢",
  },
  {
    num: "06",
    name: "Yerwa Global",
    tag: "News, Media & Current Affairs",
    desc: "Breaking news and in-depth coverage across Nigeria, Africa, Türkiye and the Middle East — keeping communities informed and connected to the world.",
    features: ["Breaking News", "Africa Coverage", "Middle East"],
    logo: "https://news.abubakarmall.com/wp-content/uploads/2024/11/cropped-Side-identity.png",
    url: "https://news.abubakarmall.com",
    accent: "#C0392B",
    imgBg: "linear-gradient(135deg,#0d0505 0%,#1e0a0a 50%,#0d0505 100%)",
    imgIcon: "📰",
  },
  {
    num: "07",
    name: "Comme S One Ltd",
    tag: "International Trade & Export Consulting",
    desc: "Based in Samsun, Turkey — specialising in import-export consulting, building materials, medical supplies, agro products and connecting West African entrepreneurs with global markets.",
    features: ["Export Consulting", "Agro Products", "Global Trade"],
    logo: "https://commes-one.com/wp-content/uploads/2026/06/CSO-LOGO.png",
    url: "https://commes-one.com",
    accent: "#8B6914",
    imgBg: "linear-gradient(135deg,#0a0f1a 0%,#1a2540 50%,#0a0f1a 100%)",
    imgIcon: "🚢",
  },
  {
    num: "08",
    name: "Arewa Digital Solutions",
    tag: "Software, AI & Digital Innovation",
    desc: "Building digital solutions that empower businesses with custom software, web and mobile apps, AI tools and comprehensive digital marketing services.",
    features: ["Software Dev", "Web & Apps", "Digital Marketing"],
    logo: "https://abubakarmall.com/wp-content/uploads/2026/03/gfhf-2.png",
    url: "https://www.digital.abubakarmall.com",
    accent: "#2060C0",
    imgBg: "linear-gradient(135deg,#020810 0%,#081830 50%,#020810 100%)",
    imgIcon: "💻",
  },
];

const WHY = [
  { icon: "🌐", title: "Global Reach", desc: "Operations spanning Africa, Turkey and international markets with deep local expertise in every region we serve." },
  { icon: "💡", title: "Innovation Driven", desc: "Continuously adopting technology and forward-thinking strategies to deliver cutting-edge solutions across all sectors." },
  { icon: "🤝", title: "Integrity First", desc: "Built on trust, transparency and unwavering commitment to ethical business practices in every partnership." },
  { icon: "🔗", title: "Partnership Model", desc: "A collaborative approach that creates lasting value for partners, clients, communities and investors alike." },
  { icon: "📈", title: "Impact Focused", desc: "Committed to measurable positive impact — economic, social and environmental — across every market we enter." },
];

/* ─────────────────────────────────────── BUILDING ── */

function HeroBuilding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Preload logo
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "https://abubakarmall.com/wp-content/uploads/2025/04/ABUPNG.png";
    img.onload = () => { logoImgRef.current = img; };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const W = 800, H = 900;
    canvas.width = W;
    canvas.height = H;

    // ── Precomputed randoms (stable across frames) ──
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * 360,
      r: Math.random() * 1.3 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const FLOORS = 18, COLS = 11;
    const winLit = Array.from({ length: FLOORS }, () =>
      Array.from({ length: COLS }, () => Math.random() > 0.10)
    );
    const winPhase = Array.from({ length: FLOORS }, () =>
      Array.from({ length: COLS }, () => Math.random() * Math.PI * 2)
    );

    type GDot = { theta: number; phi: number; dTheta: number };
    const gdots: GDot[] = Array.from({ length: 55 }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      dTheta: (Math.random() - 0.5) * 0.003,
    }));

    const skylineRects = [
      [20, 430, 48, 100], [56, 408, 55, 122], [100, 390, 42, 140],
      [132, 420, 32, 100], [158, 400, 38, 120],
      [468, 415, 52, 115], [508, 395, 65, 135], [560, 410, 42, 110],
      [592, 380, 50, 150], [632, 405, 45, 115],
    ] as [number, number, number, number][];

    function draw() {
      const t = frameRef.current;

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.72);
      sky.addColorStop(0, "#010B16");
      sky.addColorStop(0.55, "#051A2C");
      sky.addColorStop(1, "#082238");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const a = 0.25 + 0.55 * Math.sin(s.phase + t * 0.014);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      // ── Globe ──
      const GX = 490, GY = 240, GR = 240;

      // Outer halo
      const halo = ctx.createRadialGradient(GX, GY, GR * 0.4, GX, GY, GR * 1.5);
      halo.addColorStop(0, "rgba(18,90,200,0.14)");
      halo.addColorStop(1, "rgba(18,90,200,0)");
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(GX, GY, GR * 1.5, 0, Math.PI * 2); ctx.fill();

      // Globe inner fill
      ctx.save();
      ctx.beginPath(); ctx.arc(GX, GY, GR, 0, Math.PI * 2); ctx.clip();
      const gFill = ctx.createRadialGradient(GX - GR * 0.3, GY - GR * 0.2, 0, GX, GY, GR);
      gFill.addColorStop(0, "rgba(12,50,100,0.2)");
      gFill.addColorStop(1, "rgba(4,16,36,0.08)");
      ctx.fillStyle = gFill; ctx.fillRect(GX - GR, GY - GR, GR * 2, GR * 2);
      ctx.restore();

      // Outer ring
      ctx.beginPath(); ctx.arc(GX, GY, GR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(30,120,220,0.38)"; ctx.lineWidth = 1.2; ctx.stroke();

      // Latitude ellipses
      [-60, -30, 0, 30, 60].forEach(deg => {
        const rad = deg * Math.PI / 180;
        const ly = GY + GR * Math.sin(rad);
        const lr = GR * Math.cos(rad);
        if (lr > 2) {
          ctx.beginPath();
          ctx.ellipse(GX, ly, lr, lr * 0.065, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(30,120,220,${0.18 + Math.abs(deg) * 0.001})`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }
      });

      // Longitude arcs (slow rotation)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI + t * 0.0008;
        ctx.beginPath();
        ctx.ellipse(GX, GY, GR * Math.abs(Math.cos(angle)), GR, angle % Math.PI, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(30,120,220,0.18)"; ctx.lineWidth = 0.7; ctx.stroke();
      }

      // Network dots on globe
      gdots.forEach(d => {
        d.theta += d.dTheta;
        const localTheta = d.theta + t * 0.0004;
        const x = GX + GR * Math.sin(d.phi) * Math.cos(localTheta);
        const y = GY + GR * Math.cos(d.phi);
        const depth = Math.sin(d.phi) * Math.cos(localTheta);
        if (depth > 0.05) {
          const a = 0.3 + depth * 0.65;
          ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80,200,255,${a})`; ctx.fill();
          const dg = ctx.createRadialGradient(x, y, 0, x, y, 7);
          dg.addColorStop(0, `rgba(80,200,255,${a * 0.28})`);
          dg.addColorStop(1, "rgba(80,200,255,0)");
          ctx.fillStyle = dg;
          ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        }
      });

      // ── Background skyline ──
      skylineRects.forEach(([x, y, w, h]) => {
        ctx.fillStyle = "rgba(5,14,24,0.97)";
        ctx.fillRect(x, y, w, h);
        for (let row = y + 8; row < y + h - 8; row += 12) {
          for (let col = x + 4; col < x + w - 4; col += 9) {
            if (Math.sin(row * 9.1 + col * 4.3 + 17) > 0.25) {
              ctx.fillStyle = "rgba(255,200,80,0.16)";
              ctx.fillRect(col, row, 4, 5);
            }
          }
        }
      });

      // ── Main building ──
      const BX = 170, BY = 180, BW = 420, BH = 580;

      // Body gradient
      const bGrad = ctx.createLinearGradient(BX, 0, BX + BW, 0);
      bGrad.addColorStop(0, "#0B1E32");
      bGrad.addColorStop(0.35, "#14304A");
      bGrad.addColorStop(0.65, "#14304A");
      bGrad.addColorStop(1, "#0B1E32");
      ctx.fillStyle = bGrad;
      ctx.fillRect(BX, BY, BW, BH);

      // Side walls (perspective effect)
      const sGrad = ctx.createLinearGradient(BX - 28, 0, BX, 0);
      sGrad.addColorStop(0, "#060F1A"); sGrad.addColorStop(1, "#0E1E2E");
      ctx.fillStyle = sGrad; ctx.fillRect(BX - 28, BY + 28, 28, BH - 28);
      const sGrad2 = ctx.createLinearGradient(BX + BW, 0, BX + BW + 28, 0);
      sGrad2.addColorStop(0, "#0E1E2E"); sGrad2.addColorStop(1, "#060F1A");
      ctx.fillStyle = sGrad2; ctx.fillRect(BX + BW, BY + 28, 28, BH - 28);

      // Vertical mullions
      for (let i = 1; i < 9; i++) {
        const lx = BX + (BW / 9) * i;
        ctx.strokeStyle = "rgba(20,60,100,0.45)"; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(lx, BY); ctx.lineTo(lx, BY + BH); ctx.stroke();
      }
      // Floor lines
      for (let f = 0; f <= 20; f++) {
        const fy = BY + (BH / 20) * f;
        ctx.strokeStyle = "rgba(20,55,90,0.32)"; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(BX, fy); ctx.lineTo(BX + BW, fy); ctx.stroke();
      }

      // Windows
      const WW = 17, WH = 9;
      const mX = 22, mY = 26;
      const gX = (BW - 2 * mX - COLS * WW) / (COLS - 1);
      const gY = (BH - 2 * mY - FLOORS * WH) / (FLOORS - 1);

      for (let r = 0; r < FLOORS; r++) {
        for (let c = 0; c < COLS; c++) {
          const wx = BX + mX + c * (WW + gX);
          const wy = BY + mY + r * (WH + gY);
          if (winLit[r][c]) {
            const b = 0.4 + 0.35 * Math.sin(winPhase[r][c] + t * 0.007);
            const al = 0.5 + b * 0.4;
            const g2 = Math.floor(165 + b * 45);
            ctx.fillStyle = `rgba(255,${g2},55,${al})`;
            ctx.shadowColor = `rgba(255,${g2},55,0.35)`;
            ctx.shadowBlur = 5;
            ctx.fillRect(wx, wy, WW, WH);
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = "rgba(5,14,24,0.85)";
            ctx.fillRect(wx, wy, WW, WH);
          }
        }
      }

      // ── Billboard ──
      const BBX = BX + 30, BBY = BY - 118, BBW = BW - 60, BBH = 100;

      // Support poles
      ctx.fillStyle = "#18354E";
      ctx.fillRect(BBX + 45, BBY + BBH, 9, 98);
      ctx.fillRect(BBX + BBW - 54, BBY + BBH, 9, 98);

      // Billboard white halo
      const bHalo = ctx.createRadialGradient(BBX + BBW / 2, BBY + BBH / 2, 0, BBX + BBW / 2, BBY + BBH / 2, BBW * 0.85);
      bHalo.addColorStop(0, "rgba(255,255,235,0.18)");
      bHalo.addColorStop(1, "rgba(255,255,235,0)");
      ctx.fillStyle = bHalo;
      ctx.fillRect(BBX - 35, BBY - 35, BBW + 70, BBH + 70);

      // Billboard panel
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(BBX, BBY, BBW, BBH);
      ctx.strokeStyle = "rgba(200,200,200,0.25)"; ctx.lineWidth = 1;
      ctx.strokeRect(BBX, BBY, BBW, BBH);

      // Logo
      if (logoImgRef.current?.complete) {
        const lo = logoImgRef.current;
        const pad = 14;
        const lW = BBW - pad * 2, lH = BBH - pad * 2;
        const asp = lo.naturalWidth / lo.naturalHeight;
        let dW = lW, dH = lW / asp;
        if (dH > lH) { dH = lH; dW = lH * asp; }
        ctx.drawImage(lo, BBX + pad + (lW - dW) / 2, BBY + pad + (lH - dH) / 2, dW, dH);
      } else {
        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("ABUBAKAR GROUP", BBX + BBW / 2, BBY + BBH / 2 - 4);
        ctx.fillStyle = "#0D2035";
        ctx.font = "10px sans-serif";
        ctx.fillText("Group Ltd. Co.", BBX + BBW / 2, BBY + BBH / 2 + 13);
        ctx.textAlign = "left";
      }

      // ── Ground ──
      const BY2 = BY + BH;
      const ground = ctx.createLinearGradient(0, BY2, 0, H);
      ground.addColorStop(0, "#091A28"); ground.addColorStop(1, "#020810");
      ctx.fillStyle = ground; ctx.fillRect(0, BY2, W, H - BY2);

      // Pavement perspective grid
      ctx.save(); ctx.globalAlpha = 0.28;
      for (let i = 0; i < 7; i++) {
        const frac = i / 6;
        const lineY = BY2 + frac * (H - BY2);
        const spread = 60 + frac * 260;
        ctx.strokeStyle = `rgba(18,70,130,${0.55 - frac * 0.45})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.moveTo(W / 2 - spread, lineY); ctx.lineTo(W / 2 + spread, lineY); ctx.stroke();
      }
      for (let i = -4; i <= 4; i++) {
        ctx.strokeStyle = "rgba(18,70,130,0.2)";
        ctx.beginPath(); ctx.moveTo(W / 2 + i * 28, BY2); ctx.lineTo(W / 2 + i * 120, H); ctx.stroke();
      }
      ctx.restore();

      // Building reflection
      ctx.save(); ctx.globalAlpha = 0.13;
      ctx.transform(1, 0, 0, -0.22, 0, BY2 * 1.22 + BY2);
      ctx.fillStyle = "#14304A"; ctx.fillRect(BX, BY, BW, BH); ctx.restore();

      // Ambient light pools
      [[195, BY2 + 4, "#1060A0"], [445, BY2 + 4, "#1060A0"]].forEach(([lx, ly, col]) => {
        const pool = ctx.createRadialGradient(+lx, +ly, 0, +lx, +ly, 90);
        pool.addColorStop(0, "rgba(16,80,160,0.3)"); pool.addColorStop(1, "rgba(16,80,160,0)");
        ctx.fillStyle = pool;
        ctx.beginPath(); ctx.arc(+lx, +ly, 90, 0, Math.PI * 2); ctx.fill();
      });

      frameRef.current++;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
      aria-hidden="true"
    />
  );
}

/* ──────────────────────────────────── MAIN PAGE ── */

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // Nav transparency → solid on scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal: generic .reveal elements
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // 3D page-flip: watch the parent sub-page section so snap-scroll doesn't flicker
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        const card = e.target.querySelector(".sub-card") as HTMLElement | null;
        if (card) card.classList.toggle("visible", e.isIntersecting);
      }),
      { threshold: 0.5 }
    );
    document.querySelectorAll(".sub-page").forEach(p => obs.observe(p));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── SPLASH LOADER ── */}
      <div className={`splash${loaded ? " splash--out" : ""}`} aria-hidden="true">
        <div className="splash-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://abubakarmall.com/wp-content/uploads/2025/04/ABUPNG.png" alt="" className="splash-logo" />
          <div className="splash-bar"><div className="splash-fill" /></div>
          <p className="splash-tag">Abubakar Group Ltd.</p>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav ref={navRef} className="nav">
        <div className="nav-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/" className="nav-brand">
            <img
              src="https://abubakarmall.com/wp-content/uploads/2025/04/ABUPNG.png"
              alt="Abubakar Group Ltd"
              className="nav-logo"
            />
          </a>

          <ul className="nav-links">
            {[
              { label: "Home",          href: "/" },
              { label: "About Us",      href: "#about" },
              { label: "Subsidiaries",  href: "#subsidiaries" },
              { label: "Our Impact",    href: "#impact" },
              { label: "Contact",       href: "#contact" },
            ].map(l => (
              <li key={l.label}>
                <a href={l.href} className="nav-link">{l.label}</a>
              </li>
            ))}
          </ul>

          <a href="mailto:sales@abubakarmall.com" className="btn btn-gold">Get In Touch</a>

          <button className="nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="nav-mobile">
            {[
              { label: "Home",         href: "/" },
              { label: "About",        href: "#about" },
              { label: "Subsidiaries", href: "#subsidiaries" },
              { label: "Impact",       href: "#impact" },
              { label: "Contact",      href: "#contact" },
            ].map(l => (
              <a key={l.label} href={l.href} className="nav-mobile-link"
                onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="mailto:sales@abubakarmall.com" className="btn btn-gold" style={{marginTop:"1rem"}}>Get In Touch</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        {/* Full-bleed building panel — right half, absolute positioned */}
        <div className="hero-building-panel" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-building.png" alt="" className="hero-building-img" />
          <div className="hero-building-fade" />
        </div>

        <div className="hero-inner">
          {/* Left — all content */}
          <div className="hero-left">
            <div className="hero-eyebrow reveal">
              <span className="eyebrow-line" />
              ONE VISION. MULTIPLE SOLUTIONS.
            </div>

            <h1 className="hero-headline reveal reveal-delay-1">
              <span className="hero-headline-border">
                <span className="hero-headline-est-tag">EST. 2018</span>
                <span className="hero-headline-gold">ABUBAKAR</span>
                <span className="hero-headline-group">GROUP <span className="hero-headline-dot">·</span> LTD.</span>
              </span>
            </h1>

            <p className="hero-para reveal reveal-delay-2">
              A diversified international holding company delivering excellence across
              international trade, education, technology, procurement, real estate
              and innovation throughout Africa and beyond.
            </p>

            <div className="hero-btns reveal reveal-delay-3">
              <a href="#subsidiaries" className="btn btn-gold">Explore Companies</a>
              <a href="#about" className="btn btn-outline">About Abubakar Group</a>
            </div>

            <div className="hero-stats reveal reveal-delay-4">
              {[
                { n: "6+",   l: "Subsidiaries" },
                { n: "5+",   l: "Countries" },
                { n: "100+", l: "Partners" },
                { n: "1",    l: "Vision · Endless Possibilities" },
              ].map(s => (
                <div key={s.l} className="stat-card">
                  <span className="stat-n">{s.n}</span>
                  <span className="stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span>Scroll to explore</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <polyline points="19 12 12 19 5 12"/>
          </svg>
        </div>
      </section>

      {/* ── SUBSIDIARIES ── */}
      {/* Subsidiaries intro */}
      <section className="subs-intro" id="subsidiaries">
        <div className="section-head">
          <span className="section-label">OUR COMPANIES</span>
          <h2 className="section-title">Our Subsidiaries</h2>
          <p className="section-desc">
            Six dynamic companies. One united vision. Discover how each subsidiary
            drives innovation, creates impact and delivers value across industries.
          </p>
        </div>
        <div className="subs-scroll-hint">Scroll to explore each company ↓</div>
      </section>

      {/* Each subsidiary as its own fullscreen snap page */}
      {SUBSIDIARIES.map((s, i) => (
        <section key={s.num} className="sub-page">
          <div className={`sub-card${i % 2 !== 0 ? " sub-card--flip" : ""}`}>
            <div className="sub-text">
              <span className="sub-num">{s.num}</span>
              <span className="sub-tag" style={{ color: s.accent }}>{s.tag}</span>
              <h3 className="sub-name">{s.name}</h3>
              <p className="sub-desc">{s.desc}</p>
              <div className="sub-features">
                {s.features.map(f => (
                  <span key={f} className="sub-feat">{f}</span>
                ))}
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer"
                className="btn btn-dark" style={{ marginTop: "1.8rem" }}>
                Learn More →
              </a>
            </div>
            <div className="sub-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.logo} alt={s.name} className="sub-logo-img" />
              <div className="sub-icon-bg">{s.imgIcon}</div>
            </div>
          </div>
        </section>
      ))}

      {/* ── WHY CHOOSE ── */}
      <section className="why-section" id="impact">
        <div className="why-inner">
          <div className="section-head reveal" style={{ textAlign: "center" }}>
            <span className="section-label" style={{ color: "var(--gold)" }}>WHY CHOOSE ABUBAKAR GROUP</span>
            <h2 className="section-title" style={{ color: "#fff" }}>Built on excellence.<br />Driven by purpose.</h2>
          </div>

          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={w.title} className={`why-card reveal reveal-delay-${i + 1}`}>
                <div className="why-icon">{w.icon}</div>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-left reveal">
            <span className="section-label">ABOUT THE GROUP</span>
            <h2 className="section-title">Bridging markets.<br />Creating lasting value.</h2>
          </div>
          <div className="about-right reveal reveal-delay-2">
            <p>Abubakar Group Ltd is a dynamic international holding company committed to creating sustainable value across multiple sectors. By bridging global markets and leveraging deep industry expertise, we deliver innovative solutions that connect people, capital and opportunity.</p>
            <p>With a presence spanning Turkey, Nigeria and international markets, we take a long-term view — building businesses that serve real needs, empower communities and stand the test of time.</p>
            <div className="about-tags">
              {["International Trade","Education","Technology","Real Estate","Consulting","E-Commerce"].map(t => (
                <span key={t} className="about-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-col footer-col--brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://abubakarmall.com/wp-content/uploads/2025/04/ABUPNG.png"
              alt="Abubakar Group Ltd"
              className="footer-logo"
            />
            <p className="footer-tagline">
              Building tomorrow through innovation, integrity and international collaboration.
            </p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/AbubakarShoppingMall" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://x.com/abubakar_mall" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.instagram.com/abubakarmall/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/abubakar-ibrahim-abubakar-8688ab177/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.youtube.com/@AbubakarGroup" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--navy)"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-list">
              {[
                { label: "Home",          href: "#home" },
                { label: "About Us",      href: "#about" },
                { label: "Subsidiaries",  href: "#subsidiaries" },
                { label: "Our Values",    href: "#impact" },
                { label: "Contact Us",    href: "#contact" },
              ].map(l => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Our Companies</h4>
            <ul className="footer-list">
              {SUBSIDIARIES.map(s => (
                <li key={s.num}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-list footer-contact">

              <li>
                <a href="mailto:sales@abubakarmall.com">sales@abubakarmall.com</a>
              </li>
              <li>
                <a href="https://www.abubakarmall.com" target="_blank" rel="noopener noreferrer">www.abubakarmall.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Abubakar Group Ltd. All Rights Reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* ── ALL STYLES ── */}
      <style jsx global>{`

        /* ══ NAV ══ */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 300;
          transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
          border-bottom: 1px solid transparent;
        }
        .nav--scrolled {
          background: rgba(8,21,34,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(212,175,55,0.15);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }
        .nav-inner {
          max-width: var(--max-w); margin: 0 auto;
          padding: 0 var(--pad);
          display: flex; align-items: center; gap: 2rem;
          height: 72px;
        }
        .nav-brand { flex-shrink: 0; }
        .nav-logo { height: 38px; width: auto; object-fit: contain; display: block; }
        .nav-links {
          display: flex; gap: 2rem; list-style: none; margin-left: auto;
        }
        .nav-link {
          font-family: var(--font-nav);
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.75); transition: color 0.2s;
        }
        .nav-link:hover { color: var(--gold); }
        .nav-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .nav-burger span {
          display: block; width: 22px; height: 1.5px;
          background: rgba(255,255,255,0.8);
        }
        .nav-mobile {
          display: flex; flex-direction: column; gap: 0.5rem;
          background: rgba(8,21,34,0.98);
          padding: 1.5rem var(--pad) 2rem;
          border-top: 1px solid rgba(212,175,55,0.12);
        }
        .nav-mobile-link {
          font-family: var(--font-nav);
          font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.8); padding: 0.6rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s;
        }
        .nav-mobile-link:hover { color: var(--gold); }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .nav-burger { display: flex; margin-left: auto; }
          .btn.btn-gold.nav-cta { display: none; }
        }

        /* ══ BUTTONS ══ */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-nav); font-weight: 600;
          font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 13px 26px; border-radius: 4px;
          border: none; cursor: pointer; white-space: nowrap;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .btn-gold {
          background: var(--gold);
          color: var(--navy);
          box-shadow: 0 4px 20px rgba(212,175,55,0.25);
        }
        .btn-gold:hover {
          background: var(--gold-light);
          box-shadow: 0 6px 28px rgba(212,175,55,0.4);
          transform: translateY(-1px);
        }
        .btn-outline {
          background: transparent;
          color: rgba(255,255,255,0.88);
          border: 1px solid rgba(255,255,255,0.25);
        }
        .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        .btn-dark {
          background: var(--navy);
          color: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .btn-dark:hover {
          background: var(--navy-mid);
          box-shadow: 0 6px 28px rgba(0,0,0,0.3);
          transform: translateY(-1px);
        }

        /* ══ HERO ══ */
        .hero {
          height: 100svh;
          scroll-snap-align: start;
          background: var(--navy);
          display: flex; flex-direction: column;
          justify-content: center;
          padding-top: 72px;
          position: relative; overflow: hidden;
        }
        /* Hero elements are above the fold — skip reveal animation */
        .hero .reveal { opacity: 1; transform: none; transition: none; }

        /* Full-bleed building — covers entire hero */
        .hero-building-panel {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          overflow: hidden;
        }
        .hero-building-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center center;
        }
        /* Very light overlay — just enough for text legibility */
        .hero-building-fade {
          position: absolute; inset: 0;
          background: rgba(8,21,34,0.75);
          pointer-events: none;
        }

        .hero-inner {
          max-width: var(--max-w); margin: 0 auto;
          padding: clamp(3rem, 8vh, 6rem) var(--pad);
          display: flex; align-items: center;
          width: 100%; position: relative; z-index: 2;
        }
        .hero-left { max-width: 600px; }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 14px;
          font-family: var(--font-nav);
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
          color: var(--gold); margin-bottom: 1.8rem;
        }
        .eyebrow-line {
          display: block; width: 32px; height: 1px; background: var(--gold); flex-shrink: 0;
        }
        @media (max-width: 540px) {
          .hero-eyebrow {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            writing-mode: vertical-lr;
            text-orientation: mixed;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            margin-bottom: 0;
            font-size: 0.5rem;
            letter-spacing: 0.22em;
            color: rgba(212,175,55,0.6);
            z-index: 3;
          }
          .eyebrow-line {
            width: 1px;
            height: 28px;
            background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent);
          }
        }
        .hero-headline {
          font-family: var(--font-display);
          font-size: clamp(2.24rem, 3.85vw, 5.25rem);
          font-weight: 700; line-height: 1.02;
          letter-spacing: -0.03em; color: #fff;
          margin-bottom: 1.6rem;
        }
        .hero-headline-border {
          display: block;
          border-left: 2px solid rgba(212,175,55,0.35);
          padding-left: 1.1rem;
        }
        .hero-headline-est-tag {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.13em;
          font-weight: 700;
          letter-spacing: 0.4em;
          color: rgba(212,175,55,0.65);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .hero-headline-gold {
          display: block;
          font-size: 1em;
          letter-spacing: 0.08em;
          line-height: 1;
          color: rgba(8,21,34,0.42);
          text-shadow:
            0 -1px 0 rgba(255,255,255,0.22),
            0 1px 3px rgba(0,0,0,0.5);
        }
        .hero-headline-group {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.26em;
          font-weight: 700;
          letter-spacing: 0.38em;
          color: rgba(8,21,34,0.35);
          text-shadow:
            0 -1px 0 rgba(255,255,255,0.18),
            0 1px 2px rgba(0,0,0,0.4);
          text-transform: uppercase;
          line-height: 1;
          margin-top: 0.5rem;
        }
        .hero-headline-dot {
          font-weight: 400;
        }
        .hero-para {
          font-size: clamp(0.95rem, 1.1vw, 1.1rem);
          color: rgba(255,255,255,0.62); line-height: 1.78;
          max-width: 460px; margin-bottom: 2.4rem;
        }
        .hero-btns {
          display: flex; flex-wrap: wrap; gap: 1rem;
          margin-bottom: 3.5rem;
        }
        .hero-stats {
          display: grid; grid-template-columns: repeat(4, auto);
          gap: 0; border: 1px solid rgba(255,255,255,0.10);
          border-radius: 8px; overflow: hidden;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          max-width: fit-content;
        }
        .stat-card {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 1.3rem 1.8rem; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .stat-card:last-child { border-right: none; }
        .stat-n {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 2.5vw, 2.4rem);
          font-weight: 700; color: var(--gold); line-height: 1;
          margin-bottom: 4px;
        }
        .stat-l {
          font-family: var(--font-nav);
          font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .hero-scroll-hint {
          position: absolute; bottom: 2rem; left: var(--pad);
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-nav); font-size: 0.62rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          z-index: 2;
          animation: bounceX 2.5s ease-in-out infinite;
        }
        @keyframes bounceX {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(5px); }
        }
        @media (max-width: 860px) {
          .hero-building-fade { background: linear-gradient(to right, rgba(8,21,34,0.82) 0%, rgba(8,21,34,0.55) 45%, rgba(8,21,34,0.15) 75%, rgba(8,21,34,0.05) 100%); }
          .hero-stats { grid-template-columns: repeat(2,1fr); max-width: 100%; }
          .stat-card:nth-child(2) { border-right: none; }
          .stat-card:nth-child(3),
          .stat-card:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.08); }
        }
        @media (max-width: 540px) {
          .btn { font-size: 0.55rem; padding: 8px 14px; letter-spacing: 0.08em; }
          .hero-btns { gap: 0.6rem; margin-bottom: 2rem; }
          .hero-stats { max-width: 100%; }
          .stat-card { padding: 0.75rem 1rem; }
          .stat-n { font-size: 1.25rem; }
          .stat-l { font-size: 0.52rem; }
          /* Allow 3D flip to show without clipping on mobile */
          .sub-page { overflow: clip; }
          .sub-card {
            transition:
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
              opacity   0.7s ease,
              box-shadow 0.3s;
            transition-delay: 2s;
          }
        }

        /* ══ SECTION SHARED ══ */
        .section-label {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 3.4rem);
          font-weight: 700; line-height: 1.12;
          letter-spacing: -0.02em; color: #fff;
          margin-bottom: 1.2rem;
        }
        .section-desc {
          font-size: clamp(0.9rem, 1vw, 1rem);
          color: rgba(255,255,255,0.55); line-height: 1.8; max-width: 560px;
        }

        /* ══ SUBSIDIARIES ══ */
        .subs-intro {
          height: 100vh;
          scroll-snap-align: start;
          overflow: hidden;
          padding: var(--pad);
          background: var(--navy);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
        }
        .subs-intro .section-label { color: var(--gold); }
        .subs-intro .section-title { color: #fff; }
        .subs-intro .section-desc  { color: rgba(255,255,255,0.65); max-width: 540px; margin: 0 auto; }
        .subs-scroll-hint {
          margin-top: 3rem;
          font-family: var(--font-nav);
          font-size: 0.75rem; letter-spacing: 0.12em;
          color: var(--gold); opacity: 0.7;
          animation: bounceX 1.8s ease-in-out infinite;
        }
        .sub-page {
          height: 100vh;
          scroll-snap-align: start;
          overflow: hidden;
          padding: clamp(2rem, 5vh, 4rem) var(--pad);
          background: var(--navy-mid);
          perspective: 2400px;
          display: flex; align-items: center; justify-content: center;
        }
        .section-head {
          max-width: var(--max-w); margin: 0 auto 3rem;
        }

        /* ── 3D page-flip base state ── */
        .sub-card {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 5vw, 6rem); align-items: center;
          padding: clamp(2rem, 4vw, 3.5rem);
          background: var(--navy-light);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 20px;
          box-shadow: 0 8px 60px rgba(0,0,0,0.4);
          width: 100%; max-width: 1100px;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          position: relative;

          /* Start as closed book page — hinge on the left */
          transform-origin: left center;
          transform: perspective(2400px) rotateY(-70deg);
          opacity: 0;
          transition:
            transform 1s cubic-bezier(0.16, 1, 0.3, 1),
            opacity   0.55s ease,
            box-shadow 0.3s;
        }
        /* Page-curl shadow during flip */
        .sub-card::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          background: linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 40%);
          pointer-events: none; z-index: 3;
          opacity: 1;
          transition: opacity 1s ease;
        }

        /* Flipped cards hinge on the right */
        .sub-card--flip {
          transform-origin: right center;
          transform: perspective(2400px) rotateY(70deg);
        }
        .sub-card--flip::after {
          background: linear-gradient(to left, rgba(0,0,0,0.18) 0%, transparent 40%);
        }

        /* Settled — page is open flat */
        .sub-card.visible {
          transform: perspective(2400px) rotateY(0deg) !important;
          opacity: 1 !important;
        }
        .sub-card.visible::after { opacity: 0; }

        /* Hover lift only after card has landed */
        .sub-card.visible:hover {
          box-shadow: 0 20px 80px rgba(0,0,0,0.13);
          transform: perspective(2400px) rotateY(0deg) translateY(-5px) !important;
        }
        .sub-card--flip { direction: rtl; }
        .sub-card--flip > * { direction: ltr; }
        .sub-num {
          display: block;
          font-family: var(--font-display);
          font-size: 0.8rem; font-weight: 700;
          color: var(--gold); letter-spacing: 0.06em;
          margin-bottom: 0.5rem;
        }
        .sub-tag {
          display: block;
          font-family: var(--font-nav);
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .sub-name {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 2.5vw, 2.4rem);
          font-weight: 700; line-height: 1.12;
          letter-spacing: -0.02em; color: #fff;
          margin-bottom: 1rem;
        }
        .sub-desc {
          font-size: clamp(0.88rem, 1vw, 0.98rem);
          color: rgba(255,255,255,0.55); line-height: 1.8;
          margin-bottom: 1.4rem;
        }
        .sub-features {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
        }
        .sub-feat {
          font-family: var(--font-nav);
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 5px 12px; border-radius: 2px;
        }

        /* Visual panel */
        .sub-visual {
          position: relative;
          border-radius: 14px; overflow: hidden;
          aspect-ratio: 4/3;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(145deg, rgba(200,210,220,0.18) 0%, rgba(160,175,190,0.10) 40%, rgba(120,140,160,0.06) 100%);
          border: 1px solid rgba(200,215,230,0.25);
          box-shadow: inset 0 1px 0 rgba(220,230,240,0.2), inset 0 -1px 0 rgba(80,100,120,0.15), 0 8px 32px rgba(0,0,0,0.45);
        }
        .sub-logo-img {
          max-width: 55%; max-height: 55%;
          object-fit: contain; position: relative; z-index: 2;
          filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5));
        }
        .sub-icon-bg {
          position: absolute; bottom: 1rem; right: 1.2rem;
          font-size: 3.5rem; opacity: 0.12; z-index: 1;
          line-height: 1;
        }
        .sub-visual-glow {
          position: absolute; inset: 0; z-index: 0;
        }

        @media (max-width: 780px) {
          .sub-card, .sub-card--flip { grid-template-columns: 1fr; direction: ltr; }
          .sub-visual { aspect-ratio: 16/9; }
        }

        /* ══ WHY CHOOSE ══ */
        .why-section {
          height: 100vh;
          scroll-snap-align: start;
          background: var(--navy);
          padding: clamp(3rem, 6vh, 5rem) var(--pad);
          position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
        }
        .why-section::before {
          content: '';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 800px; height: 800px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .why-inner { max-width: var(--max-w); margin: 0 auto; }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem; margin-top: 4rem;
        }
        .why-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 18px; padding: 2.2rem 1.8rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background 0.3s, transform 0.3s, border-color 0.3s;
        }
        .why-card:hover {
          background: rgba(212,175,55,0.06);
          border-color: rgba(212,175,55,0.25);
          transform: translateY(-6px);
        }
        .why-icon { font-size: 2.2rem; margin-bottom: 1.2rem; }
        .why-title {
          font-family: var(--font-display);
          font-size: 1.15rem; font-weight: 700;
          color: #fff; margin-bottom: 0.8rem;
        }
        .why-desc {
          font-size: 0.85rem; color: rgba(255,255,255,0.52); line-height: 1.75;
        }
        @media (max-width: 1100px) { .why-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 640px) {
          .why-section { height: auto; min-height: 100svh; overflow-y: auto; scroll-snap-align: start; }
          .why-grid { grid-template-columns: 1fr; gap: 12px; }
          .why-card { height: auto; min-height: 0; overflow: visible; padding: 1.4rem 1.2rem; }
        }

        /* ══ ABOUT ══ */
        .about-section {
          height: 100vh;
          scroll-snap-align: start;
          overflow: hidden;
          padding: clamp(3rem, 6vh, 5rem) var(--pad);
          background: var(--navy);
          display: flex; flex-direction: column; justify-content: center;
        }
        .about-inner {
          max-width: var(--max-w); margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: clamp(3rem, 6vw, 8rem); align-items: start;
        }
        .about-right p {
          font-size: clamp(0.9rem, 1vw, 1rem);
          color: rgba(255,255,255,0.55); line-height: 1.85;
        }
        .about-right p + p { margin-top: 1.2rem; }
        .about-tags {
          display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem;
        }
        .about-tag {
          font-family: var(--font-nav);
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--gold);
          border: 1px solid rgba(212,175,55,0.3);
          padding: 6px 14px; border-radius: 2px;
          transition: background 0.2s, color 0.2s;
        }
        .about-tag:hover { background: rgba(212,175,55,0.12); color: var(--gold-light); }
        @media (max-width: 720px) { .about-inner { grid-template-columns: 1fr; } }

        /* ══ FOOTER ══ */
        .footer {
          height: 100vh;
          scroll-snap-align: start;
          overflow: hidden;
          background: var(--navy);
          padding: clamp(3rem, 6vh, 5rem) var(--pad) 0;
          border-top: 1px solid rgba(212,175,55,0.12);
          display: flex; flex-direction: column; justify-content: center;
        }
        .footer-inner {
          max-width: var(--max-w); margin: 0 auto;
          display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
          gap: clamp(2rem, 4vw, 5rem);
          padding-bottom: 4rem;
        }
        .footer-logo {
          height: 36px; width: auto; object-fit: contain;
          display: block; margin-bottom: 1.2rem;
          filter: brightness(1.1);
        }
        .footer-tagline {
          font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.7;
          max-width: 240px; margin-bottom: 1.6rem;
        }
        .footer-socials { display: flex; gap: 0.6rem; }
        .social-icon {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.15);
          font-family: var(--font-nav); font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.06em; color: rgba(255,255,255,0.55);
          transition: border-color 0.2s, color 0.2s;
        }
        .social-icon:hover { border-color: var(--gold); color: var(--gold); }
        .footer-col-title {
          font-family: var(--font-nav);
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1.4rem;
        }
        .footer-list { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
        .footer-list a {
          font-size: 0.85rem; color: rgba(255,255,255,0.5);
          transition: color 0.2s;
        }
        .footer-list a:visited { color: rgba(255,255,255,0.5); }
        .footer-list a:hover { color: var(--gold); }
        .footer-contact { gap: 1rem; }
        .footer-contact li { display: flex; gap: 10px; align-items: flex-start; }
        .contact-icon { font-size: 0.85rem; margin-top: 2px; flex-shrink: 0; }
        .footer-contact li span:last-child,
        .footer-contact li a {
          font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.6;
          transition: color 0.2s;
        }
        .footer-contact li a:hover { color: var(--gold); }

        .footer-bottom {
          max-width: var(--max-w); margin: 0 auto;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 1rem;
        }
        .footer-bottom span, .footer-bottom-links a {
          font-size: 0.75rem; color: rgba(255,255,255,0.3);
        }
        .footer-bottom-links { display: flex; gap: 1.5rem; }
        .footer-bottom-links a:hover { color: var(--gold); }

        @media (max-width: 1000px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px)  {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem 1.2rem;
            padding-bottom: 1.2rem;
          }
          /* Row 1: brand full width */
          .footer-col--brand { grid-column: 1 / -1; grid-row: 1; }
          /* Row 2: Quick Links left, Contact Us right */
          .footer-col:nth-child(2) { grid-column: 1; grid-row: 2; }
          .footer-col:nth-child(4) { grid-column: 2; grid-row: 2; }
          /* Row 3: Our Companies full width, 2-col list */
          .footer-col:nth-child(3) { grid-column: 1 / -1; grid-row: 3; }
          .footer-col:nth-child(3) .footer-list {
            display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem 0.8rem;
          }
          .footer-col-title { margin-bottom: 0.4rem; font-size: 0.52rem; }
          .footer-list { gap: 0.25rem; }
          .footer-list a { font-size: 0.62rem; }
          .footer-contact { gap: 0.35rem; }
          .footer-contact li { gap: 6px; }
          .footer-contact li span:last-child, .footer-contact li a { font-size: 0.6rem; line-height: 1.4; }
          .contact-icon { font-size: 0.65rem; }
          .footer-tagline { margin-bottom: 0.6rem; font-size: 0.65rem; line-height: 1.5; }
          .footer-bottom span, .footer-bottom-links a { font-size: 0.55rem; }
          .footer-logo { height: 26px; margin-bottom: 0.5rem; }
          .footer-socials { gap: 0.4rem; }
          .social-icon { width: 26px; height: 26px; font-size: 0.48rem; }
          .footer-bottom { flex-direction: column; text-align: center; }
          .hero-building-fade { background: rgba(8,21,34,0.75) !important; }
        }

        /* ══ SPLASH LOADER ══ */
        .splash {
          position: fixed; inset: 0; z-index: 99999;
          background: var(--navy);
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.7s ease, visibility 0.7s ease;
        }
        .splash--out { opacity: 0; visibility: hidden; pointer-events: none; }
        /* Hide nav until splash exits so only one logo shows */
        .splash:not(.splash--out) ~ * .nav,
        .splash:not(.splash--out) ~ .nav { opacity: 0; pointer-events: none; }
        .splash-inner {
          display: flex; flex-direction: column; align-items: center; gap: 1.8rem;
        }
        .splash-logo {
          width: 160px; height: auto;
          animation: splashLogoIn 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }
        .splash-tag {
          font-family: var(--font-nav);
          font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(212,175,55,0.7);
          animation: splashLogoIn 0.9s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }
        .splash-bar {
          width: 160px; height: 2px;
          background: rgba(212,175,55,0.15);
          border-radius: 2px; overflow: hidden;
        }
        .splash-fill {
          height: 100%; width: 0;
          background: linear-gradient(to right, var(--gold), var(--gold-light));
          border-radius: 2px;
          animation: splashProgress 1.5s 0.1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes splashLogoIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashProgress {
          from { width: 0; }
          to   { width: 100%; }
        }

      `}</style>
    </>
  );
}
