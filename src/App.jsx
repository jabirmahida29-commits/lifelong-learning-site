import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

const SITE_URL = "https://lifelonglearningcentre.com";

const LOGO_PATH = "/logo.jpg";
const FACEBOOK_URL = "https://www.facebook.com/share/17hs84vmpk/?mibextid=wwXIfr";
const INSTAGRAM_URL = "https://www.instagram.com/lifelonglearningcentres?igsh=eDF3aG03ZzJicm5w";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/sqh5As62kySuvkSG7?g_st=ic";
const EMAIL = "mailto:info@lifelonglearningcentre.com";
const PHONE = "tel:9052405433";
const MAPS_URL = "https://maps.app.goo.gl/sqh5As62kySuvkSG7?g_st=ic";
const BOOK_TOUR_URL = "https://api.leadconnectorhq.com/widget/form/7vUWN4jaEDQpyLiR3SHT?notrack=true";

const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d249.3636450214468!2d0!3d0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51d9c17e94553%3A0xdc4ee99a7872633f!2sLifelong%20Learning%20Centre%20Whitby!5e0!3m2!1sen!2sca!4v1775787145679!5m2!1sen!2sca";

function isValidMapUrl(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed === "") return false;
  if (trimmed.includes("YOUR_REAL_EMBED_URL_HERE")) return false;
  if (!trimmed.startsWith("https://www.google.com/maps/embed")) return false;
  return true;
}

const SEO_META = {
  "/": {
    title: "Lifelong Learning Centre | Daycare in Durham Region",
    description: "Licensed daycare serving families across Durham Region, including Whitby, Oshawa, Ajax, and Pickering. Safe, nurturing care for children 18 months to 7 years.",
    keywords: "daycare Durham Region, childcare Whitby, daycare Oshawa, daycare Ajax, daycare Pickering, licensed daycare Ontario, toddler preschool program Whitby",
  },
  "/about": {
    title: "About Lifelong Learning Centre | Whitby Daycare Serving Durham Region",
    description: "Learn about Lifelong Learning Centre, a locally owned licensed daycare in Whitby serving families across Durham Region with nurturing early childhood programs.",
    keywords: "about Lifelong Learning Centre, Whitby daycare, Durham Region childcare, family daycare Ontario, licensed childcare Whitby",
  },
  "/programs": {
    title: "Childcare Programs in Durham Region | Lifelong Learning Centre",
    description: "Explore toddler, preschool, pre-kindergarten, and school-age childcare programs at Lifelong Learning Centre, serving families across Whitby and Durham Region.",
    keywords: "childcare programs Durham Region, toddler program Whitby, preschool Oshawa Ajax Pickering, pre-kindergarten Durham, school age childcare Whitby",
  },
};

const styles = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #FDFBF8;
  --bg2: #F8F4EE;
  --bg3: #FFF9F4;
  --text: #2C2420;
  --text2: #6B5E54;
  --text3: #9C8D84;
  --gold: #E07B39;
  --gold-dark: #C4672A;
  --gold-light: rgba(224,123,57,0.1);
  --red: #E05252;
  --yellow: #F5C842;
  --blue: #5B9FD4;
  --green: #6DB87A;
  --purple: #9B7FD4;
  --peach: #F5C9A8;
  --heading: 'DM Serif Display', serif;
  --body: 'Outfit', sans-serif;
  --radius: 20px;
  --shadow: 0 4px 24px rgba(0,0,0,0.06);
  --shadow-md: 0 8px 36px rgba(0,0,0,0.09);
  --shadow-lg: 0 16px 56px rgba(0,0,0,0.12);
  --max-w: 1100px;
  --px: 24px;
  --py: 80px;
  --transition: 0.28s cubic-bezier(0.4,0,0.2,1);
}

html { scroll-behavior: smooth; }
body { font-family: var(--body); color: var(--text); background: var(--bg); line-height: 1.7; overflow-x: hidden; }

@keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(3deg)} }
@keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(-4deg)} }
@keyframes floatC { 0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)} }
@keyframes floatD { 0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-8px) rotate(2deg)}66%{transform:translateY(-16px) rotate(-2deg)} }
@keyframes pulseGlow { 0%,100%{box-shadow:0 4px 18px rgba(224,123,57,0.32)}50%{box-shadow:0 6px 28px rgba(224,123,57,0.52)} }

.float-a { animation: floatA 6s ease-in-out infinite; }
.float-b { animation: floatB 8s ease-in-out infinite; }
.float-c { animation: floatC 7s ease-in-out infinite; }
.float-d { animation: floatD 9s ease-in-out infinite; }

/* ── HEADER ── */
.header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(253,251,248,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(224,123,57,0.1); transition: box-shadow var(--transition); }
.header.scrolled { box-shadow: 0 2px 30px rgba(0,0,0,0.08); }
.header-inner { max-width: 1200px; margin: 0 auto; padding: 10px 24px; display: flex; align-items: center; justify-content: space-between; }
.header-logo-btn { background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; flex-shrink: 0; border-radius: 6px; transition: transform var(--transition), opacity var(--transition); }
.header-logo-btn:hover { transform: scale(1.04); opacity: 0.88; }
.header-logo-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
.header-logo { height: 50px; width: auto; object-fit: contain; display: block; border-radius: 6px; }
.nav-links { display: flex; gap: 28px; align-items: center; list-style: none; }
.nav-link-btn { background: none; border: none; padding: 0; color: var(--text2); font-weight: 500; font-size: 0.92rem; transition: color var(--transition); cursor: pointer; letter-spacing: 0.01em; position: relative; font-family: var(--body); }
.nav-link-btn::after { content: ''; position: absolute; bottom: -3px; left: 0; right: 0; height: 2px; background: var(--gold); border-radius: 2px; transform: scaleX(0); transition: transform var(--transition); }
.nav-link-btn:hover { color: var(--gold); }
.nav-link-btn:hover::after { transform: scaleX(1); }
.nav-link-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 2px; }
.nav-cta { background: var(--gold); color: white; padding: 10px 22px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; border: none; cursor: pointer; font-family: var(--body); box-shadow: 0 4px 16px rgba(224,123,57,0.3); transition: all var(--transition); animation: pulseGlow 3s ease-in-out infinite; white-space: nowrap; }
.nav-cta:hover { background: var(--gold-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(224,123,57,0.45); }
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
.hamburger span { width: 24px; height: 2.5px; background: var(--text); border-radius: 2px; transition: all 0.3s; }
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
.mobile-menu { display: none; flex-direction: column; align-items: center; background: var(--bg); position: absolute; top: 100%; left: 0; right: 0; padding: 16px 24px 20px; border-bottom: 1px solid rgba(224,123,57,0.1); box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
.mobile-menu.open { display: flex; }
.mobile-menu-link { background: none; border: none; padding: 12px 0; color: var(--text2); font-weight: 500; font-size: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05); cursor: pointer; width: 100%; text-align: center; transition: color var(--transition); font-family: var(--body); }
.mobile-menu-link:last-of-type { border: none; }
.mobile-menu-link:hover { color: var(--gold); }
.mobile-menu-cta { margin-top: 12px; padding: 14px 24px; border-radius: 50px; background: var(--gold); color: white; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; font-family: var(--body); width: 100%; max-width: 300px; animation: pulseGlow 3s ease-in-out infinite; transition: background var(--transition), transform var(--transition); }
.mobile-menu-cta:hover { background: var(--gold-dark); transform: translateY(-1px); }

/* ── STICKY MOBILE CTA ── */
.sticky-mobile-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; padding: 12px 20px 16px; background: rgba(253,251,248,0.97); backdrop-filter: blur(16px); border-top: 1px solid rgba(224,123,57,0.15); box-shadow: 0 -4px 24px rgba(0,0,0,0.08); }
.sticky-mobile-cta button { width: 100%; max-width: 420px; display: block; margin: 0 auto; animation: pulseGlow 3s ease-in-out infinite; }

/* ── SECTION ── */
.section { position: relative; overflow: hidden; padding: var(--py) var(--px); }
.section-inner { max-width: var(--max-w); margin: 0 auto; }
.section-label { display: inline-flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
.section-label::before { content: ''; display: block; width: 22px; height: 2px; background: var(--gold); border-radius: 2px; }
.section-title { font-family: var(--heading); font-size: clamp(1.8rem,4vw,2.75rem); color: var(--text); line-height: 1.18; margin-bottom: 14px; }
.section-sub { font-size: 1.02rem; color: var(--text2); line-height: 1.82; }
.sec-hdr { margin-bottom: 48px; }
.sec-hdr.center { text-align: center; display: flex; flex-direction: column; align-items: center; }
.sec-hdr.center .section-label { justify-content: center; }
.sec-hdr.center .section-sub { max-width: 580px; }

/* ── HERO ── */
.hero { padding-top: 100px; padding-bottom: 72px; background: linear-gradient(160deg,#FFF9F5 0%,#FDFBF8 45%,#F0F7FF 100%); min-height: 100vh; display: flex; align-items: center; }
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.hero-content { display: flex; flex-direction: column; align-items: flex-start; }
.hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--gold-dark); background: rgba(224,123,57,0.09); padding: 7px 16px; border-radius: 50px; margin-bottom: 20px; border: 1px solid rgba(224,123,57,0.18); }
.hero h1 { font-family: var(--heading); font-size: clamp(2.2rem,5vw,3.6rem); line-height: 1.15; color: var(--text); margin-bottom: 18px; }
.hero h1 em { color: var(--gold); font-style: normal; }
.hero-desc { font-size: 1.05rem; color: var(--text2); line-height: 1.84; margin-bottom: 10px; max-width: 480px; }
.hero-sub { font-size: 0.86rem; color: var(--text3); margin-bottom: 8px; max-width: 440px; line-height: 1.72; }
.hero-urgency { font-size: 0.82rem; font-weight: 600; color: var(--gold-dark); margin-bottom: 28px; max-width: 440px; display: flex; align-items: center; gap: 6px; }
.hero-urgency::before { content: ''; display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--red); flex-shrink: 0; box-shadow: 0 0 0 2px rgba(224,82,82,0.25); }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; align-items: center; }
.hero-proof { display: flex; align-items: stretch; border: 1px solid rgba(224,123,57,0.14); border-radius: 16px; overflow: hidden; background: white; box-shadow: var(--shadow); width: 100%; }
.hero-proof-item { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 3px; transition: background var(--transition); }
.hero-proof-item:hover { background: rgba(224,123,57,0.04); }
.hero-proof-item + .hero-proof-item { border-left: 1px solid rgba(224,123,57,0.11); }
.hero-proof-num { font-family: var(--heading); font-size: 1.35rem; color: var(--gold); line-height: 1; }
.hero-proof-label { font-size: 0.72rem; font-weight: 600; color: var(--text2); line-height: 1.3; }
.hero-img-wrap { border-radius: 24px; overflow: hidden; box-shadow: var(--shadow-lg); position: relative; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
.hero-img-wrap:hover { transform: scale(1.015); }
.hero-img-wrap::after { content: ''; position: absolute; inset: 0; border-radius: 24px; box-shadow: inset 0 -60px 60px rgba(0,0,0,0.08); pointer-events: none; }

/* ── BUTTONS ── */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 28px; border-radius: 50px; font-family: var(--body); font-weight: 600; font-size: 0.95rem; border: none; cursor: pointer; transition: all var(--transition); text-decoration: none; white-space: nowrap; }
.btn-primary { background: var(--gold); color: white; box-shadow: 0 4px 18px rgba(224,123,57,0.32); }
.btn-primary:hover { background: var(--gold-dark); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(224,123,57,0.44); }
.btn-outline { background: transparent; color: var(--gold); border: 2px solid var(--gold); }
.btn-outline:hover { background: rgba(224,123,57,0.06); transform: translateY(-2px); }
.btn-white { background: white; color: var(--gold-dark); box-shadow: 0 4px 18px rgba(0,0,0,0.12); }
.btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.18); }
.btn-ghost { background: rgba(255,255,255,0.14); color: white; border: 1.5px solid rgba(255,255,255,0.38); }
.btn-ghost:hover { background: rgba(255,255,255,0.24); transform: translateY(-2px); }

/* ── GRIDS ── */
.feat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.prog-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; align-items: stretch; }
.ready-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
.testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.space-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: center; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: center; }
.goals-list { display: flex; flex-direction: column; gap: 12px; margin-top: 18px; }
.steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }

/* ── CONTACT TWO-COL ── */
.contact-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: center; }
.contact-right { display: flex; flex-direction: column; gap: 20px; }

/* ── MAP FALLBACK ── */
.map-fallback { border-radius: 18px; overflow: hidden; box-shadow: var(--shadow); width: 100%; background: var(--bg2); border: 1.5px solid rgba(224,123,57,0.12); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 32px 24px; text-align: center; }
.map-fallback p { font-size: 0.88rem; color: var(--text3); }

/* ── AREA GRID ── */
.area-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
.area-card { background: white; border-radius: 18px; padding: 28px 20px 24px; text-align: center; box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.04); transition: transform var(--transition), box-shadow var(--transition); }
.area-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.area-card-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
.area-card h3 { font-family: var(--heading); font-size: 1.05rem; margin-bottom: 6px; color: var(--text); }
.area-card p { font-size: 0.84rem; color: var(--text2); line-height: 1.6; }

/* ── FEAT CARD ── */
.feat-card { background: white; border-radius: var(--radius); padding: 28px 26px 30px; box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.04); transition: transform var(--transition), box-shadow var(--transition); position: relative; overflow: hidden; }
.feat-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
.feat-card-icon { display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.feat-card h3 { font-family: var(--heading); font-size: 1.1rem; margin-bottom: 8px; color: var(--text); text-align: center; }
.feat-card p { font-size: 0.91rem; color: var(--text2); line-height: 1.72; text-align: center; }

/* ── PROGRAM CARDS ── */
.prog-card-full { background: white; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: transform var(--transition), box-shadow var(--transition); }
.prog-card-full:hover { transform: translateY(-8px); box-shadow: var(--shadow-md); }
.prog-card-full-body { padding: 20px 22px 22px; flex: 1; display: flex; flex-direction: column; }
.prog-card-full-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
.prog-card-icon-wrap { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.prog-tag { display: inline-block; padding: 3px 10px; border-radius: 50px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.02em; }
.prog-card-full-body h3 { font-family: var(--heading); font-size: 1.05rem; color: var(--text); margin-bottom: 7px; }
.prog-card-full-body .prog-desc { font-size: 0.85rem; color: var(--text2); line-height: 1.65; margin-bottom: 0; }
.prog-divider { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 10px 0 12px; opacity: 0.5; }
.prog-bullet-list { list-style: none; display: flex; flex-direction: column; gap: 6px; margin-top: auto; padding-top: 2px; }
.prog-bullet-list li { display: flex; align-items: flex-start; gap: 7px; font-size: 0.82rem; color: var(--text2); line-height: 1.5; }
.prog-bullet-check { width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.55rem; color: white; flex-shrink: 0; margin-top: 1px; }
.prog-card-full-btn { margin-top: 18px; flex-shrink: 0; }
.prog-card-simple { background: white; border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; transition: transform var(--transition), box-shadow var(--transition); }
.prog-card-simple:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
.prog-card-simple-accent { height: 4px; flex-shrink: 0; }
.prog-card-simple-body { padding: 20px 20px 22px; flex: 1; display: flex; flex-direction: column; }
.prog-card-simple-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.prog-card-simple-body h3 { font-family: var(--heading); font-size: 1rem; color: var(--text); margin-bottom: 6px; }
.prog-card-simple-body .prog-summary { font-size: 0.86rem; color: var(--text2); line-height: 1.62; }

/* ── MICROCOPY ── */
.scarcity-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(224,82,82,0.08); color: var(--red); border: 1px solid rgba(224,82,82,0.18); border-radius: 50px; padding: 6px 14px; font-size: 0.78rem; font-weight: 600; margin-bottom: 24px; }
.scarcity-badge::before { content:''; width: 7px; height: 7px; border-radius: 50%; background: var(--red); flex-shrink: 0; animation: pulseGlow 2s ease-in-out infinite; box-shadow: 0 0 0 2px rgba(224,82,82,0.2); }
.pricing-note { font-size: 0.82rem; color: var(--text3); text-align: center; margin-top: 20px; font-style: italic; }

/* ── READY ── */
.ready-item { background: white; border-radius: 18px; padding: 24px 18px; text-align: center; box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.04); transition: transform var(--transition), box-shadow var(--transition); }
.ready-item:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.ready-icon-wrap { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.ready-item h4 { font-family: var(--heading); font-size: 0.9rem; margin-bottom: 5px; }
.ready-item p { font-size: 0.78rem; color: var(--text2); line-height: 1.5; }

/* ── SCHEDULE ── */
.schedule-row { display: flex; align-items: flex-start; gap: 16px; padding: 13px 0; }
.schedule-row + .schedule-row { border-top: 1px solid rgba(0,0,0,0.05); }
.schedule-time { font-family: var(--heading); font-size: 0.82rem; color: var(--gold); min-width: 108px; padding-top: 3px; flex-shrink: 0; }
.schedule-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gold); margin-top: 7px; flex-shrink: 0; }
.schedule-content h4 { font-family: var(--heading); font-size: 0.93rem; margin-bottom: 2px; }
.schedule-content p { font-size: 0.81rem; color: var(--text2); }

/* ── TESTIMONIALS ── */
.testi-card { background: white; border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 14px; transition: transform var(--transition), box-shadow var(--transition); }
.testi-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.testi-stars { display: flex; gap: 3px; }
.testi-star { width: 15px; height: 15px; color: var(--yellow); }
.testi-text { font-size: 0.95rem; color: var(--text); line-height: 1.8; font-style: italic; }
.testi-author { font-size: 0.84rem; font-weight: 700; color: var(--gold-dark); }
.testi-role { font-size: 0.77rem; color: var(--text3); margin-top: 2px; }

/* ── CTA BANNER ── */
.cta-banner { background: linear-gradient(135deg,var(--gold) 0%,var(--gold-dark) 100%); border-radius: 24px; padding: 56px 48px; text-align: center; color: white; position: relative; overflow: hidden; }
.cta-banner h2 { font-family: var(--heading); font-size: clamp(1.6rem,3vw,2.2rem); margin-bottom: 12px; }
.cta-banner p { font-size: 1rem; opacity: 0.88; margin-bottom: 28px; max-width: 440px; margin-left: auto; margin-right: auto; }
.cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* ── TEAM ── */
.team-card { background: white; border-radius: var(--radius); padding: 30px; text-align: center; box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.04); transition: transform var(--transition), box-shadow var(--transition); }
.team-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.team-avatar { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; }
.team-card h3 { font-family: var(--heading); font-size: 1rem; margin-bottom: 3px; }
.team-role { font-size: 0.78rem; font-weight: 700; color: var(--gold); margin-bottom: 10px; }
.team-card p { font-size: 0.84rem; color: var(--text2); line-height: 1.6; }

/* ── SOCIAL ── */
.social-links { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.social-btn { display: flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 50px; font-size: 0.83rem; font-weight: 600; text-decoration: none; transition: all var(--transition); border: 1.5px solid; cursor: pointer; background: transparent; }
.social-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.1); }

/* ── LILLIO ── */
.lillio-features { display: flex; flex-direction: column; }
.lillio-feature { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--text2); padding: 5px 0; }
.lillio-check { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: white; flex-shrink: 0; }

/* ── GOAL ITEM ── */
.goal-item { display: flex; align-items: flex-start; gap: 14px; background: white; padding: 18px 22px; border-radius: 14px; box-shadow: var(--shadow); transition: transform var(--transition), box-shadow var(--transition); }
.goal-item:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.goal-num { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.82rem; color: white; flex-shrink: 0; }
.goal-item h4 { font-family: var(--heading); font-size: 0.96rem; margin-bottom: 3px; }
.goal-item p { font-size: 0.84rem; color: var(--text2); }

/* ── STEP CARD ── */
.step-card { background: white; border-radius: var(--radius); padding: 32px 28px; box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.04); text-align: center; transition: transform var(--transition), box-shadow var(--transition); position: relative; }
.step-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
.step-num { width: 52px; height: 52px; border-radius: 50%; background: var(--gold); color: white; font-family: var(--heading); font-size: 1.3rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; box-shadow: 0 4px 14px rgba(224,123,57,0.35); transition: transform var(--transition), box-shadow var(--transition); }
.step-card:hover .step-num { transform: scale(1.08); box-shadow: 0 6px 20px rgba(224,123,57,0.45); }
.step-card h3 { font-family: var(--heading); font-size: 1.1rem; margin-bottom: 8px; color: var(--text); }
.step-card p { font-size: 0.9rem; color: var(--text2); line-height: 1.68; }

/* ── CONTACT ── */
.location-rows { display: flex; flex-direction: column; gap: 14px; }
.location-row { display: flex; align-items: flex-start; gap: 12px; font-size: 0.91rem; color: var(--text2); }
.location-icon { width: 34px; height: 34px; border-radius: 10px; background: var(--gold-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background var(--transition); }
.location-row:hover .location-icon { background: rgba(224,123,57,0.18); }
.contact-link { color: var(--text2); text-decoration: none; transition: color var(--transition); }
.contact-link:hover { color: var(--gold); }
.contact-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
.map-embed { border-radius: 18px; overflow: hidden; box-shadow: var(--shadow); width: 100%; border: none; display: block; }

/* ── SPACE CARD ── */
.space-card { background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.04); transition: transform var(--transition), box-shadow var(--transition); }
.space-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.space-card-body { padding: 20px 24px; }
.space-card-body h3 { font-family: var(--heading); font-size: 1.05rem; margin-bottom: 6px; }
.space-card-body p { font-size: 0.87rem; color: var(--text2); line-height: 1.65; }

/* ── FOOTER ── */
.footer { background: #1E1A17; color: rgba(255,255,255,0.65); padding: 60px 24px 28px; }
.footer-inner { max-width: var(--max-w); margin: 0 auto; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.footer-logo { height: 46px; width: auto; object-fit: contain; display: block; margin-bottom: 12px; transition: opacity var(--transition); filter: brightness(1.1); border-radius: 5px; }
.footer-logo:hover { opacity: 0.85; }
.footer-social { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
.footer h4 { color: white; font-family: var(--heading); font-size: 0.98rem; margin-bottom: 16px; }
.footer ul { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.footer-nav-btn { background: none; border: none; padding: 0; color: rgba(255,255,255,0.52); font-size: 0.85rem; transition: color var(--transition); cursor: pointer; font-family: var(--body); text-align: left; }
.footer-nav-btn:hover { color: var(--peach); }
.footer a { color: rgba(255,255,255,0.52); text-decoration: none; font-size: 0.85rem; transition: color var(--transition); cursor: pointer; }
.footer a:hover { color: var(--peach); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 0.78rem; color: rgba(255,255,255,0.32); }

/* ── FADE IN ── */
.fade-in { opacity: 0; transform: translateY(22px); transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1); }
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* ═══════════════════════════════════════
   TABLET  ≤ 960px
═══════════════════════════════════════ */
@media (max-width: 960px) {
  :root { --py: 68px; }
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero { min-height: auto; padding-top: 92px; padding-bottom: 56px; }
  .hero-content { align-items: center; text-align: center; width: 100%; }
  .hero-desc, .hero-sub { max-width: 100%; text-align: center; }
  .hero-btns { justify-content: center; width: 100%; }
  .hero-proof { max-width: 460px; }
  .hero-eyebrow { text-align: center; }
  .hero h1 { text-align: center; }
  .hero-urgency { justify-content: center; text-align: center; }
  .feat-grid { grid-template-columns: repeat(2,1fr); }
  .prog-grid { grid-template-columns: repeat(2,1fr); }
  .ready-grid { grid-template-columns: repeat(2,1fr); }
  .area-grid { grid-template-columns: repeat(2,1fr); }
  .testi-grid { grid-template-columns: 1fr; max-width: 520px; margin-left: auto; margin-right: auto; }
  .team-grid { grid-template-columns: repeat(2,1fr); }
  .space-grid { grid-template-columns: repeat(2,1fr); }
  .two-col { grid-template-columns: 1fr; gap: 36px; }
  .about-grid { grid-template-columns: 1fr; gap: 36px; }
  .contact-two-col { grid-template-columns: 1fr; gap: 36px; align-items: start; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .steps-grid { grid-template-columns: 1fr; gap: 20px; max-width: 480px; margin: 0 auto; }
  .prog-card-full-header { justify-content: center; }
  .prog-card-simple-header { justify-content: center; }
  .prog-card-full-body h3 { text-align: center; }
  .prog-card-simple-body h3 { text-align: center; }
  .prog-card-full-body .prog-desc { text-align: center; }
  .prog-card-simple-body .prog-summary { text-align: center; }
}

/* ═══════════════════════════════════════
   MOBILE  ≤ 600px
═══════════════════════════════════════ */
@media (max-width: 600px) {
  :root { --px: 16px; --py: 56px; }
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .header-inner { padding: 10px 16px; }
  .header-logo { height: 40px; }
  .sticky-mobile-cta { display: block; }
  .hero { padding-top: 80px; padding-bottom: 96px; }
  .hero-content { align-items: center; text-align: center; }
  .hero h1 { font-size: clamp(1.85rem,7.5vw,2.6rem); text-align: center; }
  .hero-urgency { justify-content: center; font-size: 0.78rem; }
  .hero-btns { flex-direction: column; align-items: center; width: 100%; gap: 10px; }
  .hero-btns .btn { width: 100%; max-width: 320px; }
  .hero-proof { flex-direction: row; }
  .hero-proof-item { padding: 13px 8px; }
  .hero-proof-num { font-size: 1.1rem; }
  .hero-proof-label { font-size: 0.64rem; }
  .sec-hdr { text-align: center; display: flex; flex-direction: column; align-items: center; }
  .sec-hdr .section-label { justify-content: center; }
  .sec-hdr .section-sub { max-width: 100%; }
  .feat-grid { grid-template-columns: 1fr; gap: 16px; }
  .feat-card { text-align: center; }
  .feat-card-icon { justify-content: center; }
  .prog-grid { grid-template-columns: 1fr; gap: 16px; }
  .area-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .prog-card-full-header { justify-content: center; flex-wrap: wrap; gap: 8px; }
  .prog-card-simple-header { justify-content: center; flex-wrap: wrap; gap: 8px; }
  .prog-card-full-body h3 { text-align: center; }
  .prog-card-simple-body h3 { text-align: center; }
  .prog-card-full-body .prog-desc { text-align: center; }
  .prog-card-simple-body .prog-summary { text-align: center; }
  .prog-bullet-list li { text-align: left; }
  .ready-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .testi-grid { grid-template-columns: 1fr; max-width: 100%; }
  .team-grid { grid-template-columns: 1fr; }
  .space-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; gap: 16px; }
  .two-col { grid-template-columns: 1fr; gap: 28px; }
  .about-grid { grid-template-columns: 1fr; gap: 28px; }
  .contact-two-col { grid-template-columns: 1fr; gap: 28px; align-items: start; }
  .cta-banner { padding: 40px 20px; }
  .cta-btns { flex-direction: column; align-items: center; width: 100%; }
  .cta-btns .btn { width: 100%; max-width: 300px; }
  .contact-btns { flex-direction: column; align-items: center; width: 100%; }
  .contact-btns .btn { width: 100%; max-width: 300px; justify-content: center; }
  .schedule-time { min-width: 88px; font-size: 0.75rem; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .footer-bottom { flex-direction: column; text-align: center; gap: 6px; }
  .footer-grid > div:first-child { display: flex; flex-direction: column; align-items: center; text-align: center; }
  .footer-grid > div:first-child .footer-logo { margin-left: auto; margin-right: auto; }
  .footer-grid > div:first-child p { max-width: 100%; text-align: center; }
  .footer-social { justify-content: center; }
  .section-title { font-size: clamp(1.6rem,6vw,2.1rem); }
  .map-fallback { min-height: 140px; }
  .approach-btns { flex-direction: column; align-items: center; width: 100%; }
  .approach-btns .btn { width: 100%; max-width: 320px; }
  .prog-cta-wrap { display: flex; justify-content: center; width: 100%; }
  .prog-cta-wrap .btn { width: 100%; max-width: 300px; }
  .about-cta-btns { flex-direction: column; align-items: center; width: 100%; }
  .about-cta-btns .btn { width: 100%; max-width: 300px; }
  .social-links { justify-content: center; }
  .scarcity-badge { font-size: 0.74rem; }
  .area-card { padding: 22px 14px 18px; }
}
`;

/* ─── HELPERS ─── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function FadeIn({ children, style, delay = 0 }) {
  const ref = useFadeIn();
  return <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}s`, ...style }}>{children}</div>;
}
function ImgPh({ h = 380, label = "Photo", icon = "📸", style = {} }) {
  return (
    <div style={{ width:"100%", height:h, background:"linear-gradient(135deg,#EDE8E2,#E0D8CF,#EDE8E2)", borderRadius:"var(--radius)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12, color:"var(--text3)", fontSize:"0.85rem", overflow:"hidden", ...style }}>
      <span style={{ fontSize:"2.2rem", opacity:0.6 }}>{icon}</span>
      <span style={{ opacity:0.6 }}>{label}</span>
    </div>
  );
}
function IBox({ children, bg }) {
  return <div style={{ width:48, height:48, borderRadius:14, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{children}</div>;
}

/* ─── MAP COMPONENT ─── */
function MapOrFallback() {
  if (isValidMapUrl(GOOGLE_MAPS_EMBED_URL)) {
    return (
      <iframe
        src={GOOGLE_MAPS_EMBED_URL}
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Lifelong Learning Centre Whitby location"
      />
    );
  }
  return (
    <div className="map-fallback" role="region" aria-label="Map location fallback">
      <SvgMapPin c="var(--gold)" s={28}/>
      <p>1830 Rossland Rd E, Whitby, ON L1N 3P2</p>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize:"0.88rem", padding:"10px 22px" }} aria-label="View Lifelong Learning Centre on Google Maps">
        View on Google Maps
      </a>
    </div>
  );
}

/* ─── SVG ICONS ─── */
const SvgShield = ({ c="#E05252", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6L12 2z" fill={c} opacity=".85"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgStar2 = ({ c="#F5C842", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/></svg>;
const SvgHeart2 = ({ c="#E05252", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>;
const SvgBook = ({ c="#5B9FD4", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const SvgUsers = ({ c="#6DB87A", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>;
const SvgPhone2 = ({ c="#9B7FD4", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.5A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7A2 2 0 0 1 22 16.9z"/></svg>;
const SvgMapPin = ({ c="#E07B39", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const SvgClock2 = ({ c="#5B9FD4", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const SvgMail = ({ c="#6DB87A", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const SvgGradCap = ({ c="#6DB87A", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const SvgHome = ({ c="#F5C842", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const SvgSmile = ({ c="#E07B39", s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const SvgFb = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const SvgIg = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
const SvgGoogle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>;
const IconBabyHand = ({ color="white", size=15 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>;
const IconPalette = ({ color="white", size=15 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill={color}/><circle cx="17.5" cy="10.5" r=".5" fill={color}/><circle cx="8.5" cy="7.5" r=".5" fill={color}/><circle cx="6.5" cy="12.5" r=".5" fill={color}/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const IconRocket = ({ color="white", size=15 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
const IconStar3 = ({ color="white", size=15 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/></svg>;

const DStar = ({ size=70, color, style={}, anim="float-a" }) => <svg width={size} height={size} viewBox="0 0 100 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><path d="M50 5L61 35H95L68 55L79 90L50 68L21 90L32 55L5 35H39Z" fill={color}/></svg>;
const DSun = ({ size=100, color, style={}, anim="float-b" }) => <svg width={size} height={size} viewBox="0 0 120 120" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><circle cx="60" cy="60" r="20" fill={color}/>{[0,30,60,90,120,150,180,210,240,270,300,330].map(a=><line key={a} x1="60" y1="60" x2={60+36*Math.cos(a*Math.PI/180)} y2={60+36*Math.sin(a*Math.PI/180)} stroke={color} strokeWidth="3.5" strokeLinecap="round"/>)}</svg>;
const DMoon = ({ size=65, color, style={}, anim="float-c" }) => <svg width={size} height={size} viewBox="0 0 100 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><path d="M60 10 A40 40 0 1 0 60 90 A28 28 0 1 1 60 10Z" fill={color}/></svg>;
const DCloud = ({ size=160, color, style={}, anim="float-b" }) => <svg width={size} height={size*0.55} viewBox="0 0 160 88" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><ellipse cx="55" cy="56" rx="38" ry="26" fill={color}/><ellipse cx="95" cy="52" rx="34" ry="29" fill={color}/><ellipse cx="42" cy="48" rx="26" ry="20" fill={color}/><ellipse cx="78" cy="38" rx="26" ry="22" fill={color}/><ellipse cx="115" cy="58" rx="22" ry="18" fill={color}/></svg>;
const DHeart = ({ size=70, color, style={}, anim="float-a" }) => <svg width={size} height={size} viewBox="0 0 100 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><path d="M50 85C25 63 5 48 5 28C5 14 18 4 32 4C40 4 46 9 50 15C54 9 60 4 68 4C82 4 95 14 95 28C95 48 75 63 50 85Z" fill={color}/></svg>;
const DCrayon = ({ size=28, h=110, color, style={}, anim="float-c" }) => <svg width={size} height={h} viewBox="0 0 32 120" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><polygon points="5,32 16,6 27,32" fill={color}/><rect x="5" y="32" width="22" height="76" rx="4" fill={color}/><rect x="5" y="32" width="22" height="12" rx="2" fill="rgba(0,0,0,0.12)"/></svg>;
const DScribble = ({ w=160, color, style={}, anim="float-b" }) => <svg width={w} height={48} viewBox="0 0 160 48" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><path d="M8 24Q26 8 44 24Q62 40 80 24Q98 8 116 24Q134 40 152 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"/></svg>;
const DTriangle = ({ size=55, color, style={}, anim="float-d" }) => <svg width={size} height={size} viewBox="0 0 60 60" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><polygon points="30,4 56,54 4,54" fill={color}/></svg>;
const DDiamond = ({ size=44, color, style={}, anim="float-a" }) => <svg width={size} height={size} viewBox="0 0 50 50" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><polygon points="25,2 48,25 25,48 2,25" fill={color}/></svg>;
const DDots = ({ color, style={}, anim="float-b" }) => <svg width="80" height="80" viewBox="0 0 80 80" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>{[0,1,2,3].map(r=>[0,1,2,3].map(c=><circle key={`${r}${c}`} cx={10+c*20} cy={10+r*20} r="3.5" fill={color}/>))}</svg>;
const DZigzag = ({ w=110, color, style={}, anim="float-c" }) => <svg width={w} height={28} viewBox="0 0 110 28" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><polyline points="0,22 18,5 36,22 54,5 72,22 90,5 110,22" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const DCircle = ({ size=50, color, style={}, anim="float-a" }) => <svg width={size} height={size} viewBox="0 0 50 50" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><circle cx="25" cy="25" r="22" fill="none" stroke={color} strokeWidth="4" strokeDasharray="8 5"/></svg>;
const DSquare = ({ size=44, color, style={}, anim="float-d" }) => <svg width={size} height={size} viewBox="0 0 44 44" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><rect x="4" y="4" width="36" height="36" rx="8" fill={color}/></svg>;
const DLego = ({ size=56, color, style={}, anim="float-b" }) => <svg width={size} height={size} viewBox="0 0 60 60" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><rect x="6" y="20" width="48" height="32" rx="6" fill={color}/><rect x="14" y="12" width="10" height="12" rx="5" fill={color}/><rect x="36" y="12" width="10" height="12" rx="5" fill={color}/><rect x="6" y="20" width="48" height="8" fill="rgba(0,0,0,0.08)"/></svg>;
const DPaintbrush = ({ size=36, h=100, color, style={}, anim="float-c" }) => <svg width={size} height={h} viewBox="0 0 36 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><rect x="15" y="0" width="6" height="70" rx="3" fill={color}/><ellipse cx="18" cy="78" rx="10" ry="14" fill={color}/></svg>;
const DMarker = ({ size=28, h=90, color, style={}, anim="float-a" }) => <svg width={size} height={h} viewBox="0 0 28 90" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}><rect x="4" y="0" width="20" height="64" rx="8" fill={color}/><polygon points="4,64 14,90 24,64" fill={color}/></svg>;

const PROGRAMS = [
  { title:"Toddler Program", age:"18 months – 2.5 years", summary:"A gentle, warm introduction to group learning through sensory play, early language, and secure connections.", iconEl:<IconBabyHand color="white" size={15}/>, accentColor:"#E07B39", tagBg:"rgba(224,123,57,0.1)", glowColor:"rgba(224,123,57,0.15)", borderColor:"rgba(224,123,57,0.28)", desc:"A gentle, nurturing introduction to group learning. Focused on sensory exploration, early language, and building secure, trusting relationships.", image:"/images/toddler.JPG", items:["Sensory play & hands-on discovery","Early language development","Music, movement & creative expression","Safe, nurturing small-group environment"] },
  { title:"Preschool Program", age:"2.5 – 3.5 years", summary:"Creative, confidence-building learning that weaves early academics into engaging, purposeful activities.", iconEl:<IconPalette color="white" size={15}/>, accentColor:"#5B9FD4", tagBg:"rgba(91,159,212,0.1)", glowColor:"rgba(91,159,212,0.15)", borderColor:"rgba(91,159,212,0.28)", desc:"Creative, confidence-building learning with early academic foundations woven into engaging, purposeful activities that children love.", image:"/images/preschool.JPG", items:["Creative arts, crafts & storytelling","Early literacy & number concepts","Cooperative play & group activities","Independence & self-help skill building"] },
  { title:"Pre-Kindergarten Prep", age:"3.5 – 4 years", summary:"A focused school-readiness program that builds independence, confidence, and early academic skills.", iconEl:<IconRocket color="white" size={15}/>, accentColor:"#6DBE7B", tagBg:"rgba(109,190,123,0.1)", glowColor:"rgba(109,190,123,0.15)", borderColor:"rgba(109,190,123,0.28)", desc:"A focused school-readiness program that builds independence, confidence, and all the academic and social skills needed for a smooth kindergarten transition.", image:"/images/outdoor2.JPG", items:["Reading readiness & early phonics","Math concepts & logical reasoning","Critical thinking & problem solving","Kindergarten transition preparation"] },
  { title:"School Age Program", age:"4 – 7 years", summary:"An enriching, structured program nurturing academic growth, creativity, and social confidence.", iconEl:<IconStar3 color="white" size={15}/>, accentColor:"#9B7FD4", tagBg:"rgba(155,127,212,0.1)", glowColor:"rgba(155,127,212,0.15)", borderColor:"rgba(155,127,212,0.28)", desc:"An enriching, structured program for school-age children that nurtures academic growth, creativity, and social confidence in a warm, supportive setting.", image:"/images/outdoor3.JPG", items:["Academic enrichment & guided projects","STEM exploration & discovery","Leadership, teamwork & resilience","Seamless after-school continuity"] },
];

function ProgDivider({ prog }) {
  return (
    <div className="prog-divider">
      <div style={{ height:1, flex:1, background:prog.glowColor, maxWidth:32 }}/>
      <span style={{ width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background:prog.tagBg, color:prog.accentColor, fontSize:"0.68rem" }}>✦</span>
      <div style={{ height:1, flex:1, background:prog.glowColor, maxWidth:32 }}/>
    </div>
  );
}

function ProgCardFull({ prog, delay=0, onBook }) {
  return (
    <FadeIn delay={delay} style={{ height:"100%" }}>
      <div className="prog-card-full" style={{ border:`1.5px solid ${prog.borderColor}`, boxShadow:`0 4px 24px ${prog.glowColor}`, height:"100%" }}>
        <div style={{ height:5, background:prog.accentColor, flexShrink:0 }}/>
        {prog.image
          ? <img src={prog.image} alt={`${prog.title} classroom at Lifelong Learning Centre, Whitby`} loading="lazy" style={{ width:"100%", height:155, objectFit:"cover", display:"block" }}/>
          : <ImgPh h={155} label={prog.title} style={{ borderRadius:0 }}/>
        }
        <div className="prog-card-full-body">
          <div className="prog-card-full-header">
            <span className="prog-card-icon-wrap" style={{ background:prog.accentColor }}>{prog.iconEl}</span>
            <span className="prog-tag" style={{ background:prog.tagBg, color:prog.accentColor }}>{prog.age}</span>
          </div>
          <h3>{prog.title}</h3>
          <p className="prog-desc">{prog.desc}</p>
          <ProgDivider prog={prog}/>
          <ul className="prog-bullet-list">
            {prog.items.map((item, j) => (
              <li key={j}><span className="prog-bullet-check" style={{ background:prog.accentColor }}>✓</span>{item}</li>
            ))}
          </ul>
          <div className="prog-card-full-btn">
            <button type="button" className="btn btn-primary" style={{ width:"100%", justifyContent:"center" }} onClick={onBook}>Register Now</button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ProgCardSimple({ prog, delay=0 }) {
  return (
    <FadeIn delay={delay} style={{ height:"100%" }}>
      <div className="prog-card-simple" style={{ border:`1.5px solid ${prog.borderColor}`, boxShadow:`0 4px 18px ${prog.glowColor}`, height:"100%" }}>
        <div className="prog-card-simple-accent" style={{ background:prog.accentColor }}/>
        <div className="prog-card-simple-body">
          <div className="prog-card-simple-header">
            <span className="prog-card-icon-wrap" style={{ background:prog.accentColor }}>{prog.iconEl}</span>
            <span className="prog-tag" style={{ background:prog.tagBg, color:prog.accentColor }}>{prog.age}</span>
          </div>
          <h3>{prog.title}</h3>
          <p className="prog-summary">{prog.summary}</p>
        </div>
      </div>
    </FadeIn>
  );
}

function WhatToExpectSection({ openForm }) {
  return (
    <section className="section" style={{ background:"var(--bg2)" }}>
      <DStar size={70} color="rgba(224,123,57,0.07)" style={{ top:"4%", right:"4%" }} anim="float-d"/>
      <DCloud size={160} color="rgba(91,159,212,0.06)" style={{ bottom:"5%", left:"2%" }} anim="float-b"/>
      <DHeart size={42} color="rgba(224,82,82,0.06)" style={{ top:"20%", left:"3%" }} anim="float-a"/>
      <div className="section-inner">
        <FadeIn>
          <div className="sec-hdr center">
            <div className="section-label">Getting Started</div>
            <h2 className="section-title">What to Expect</h2>
            <p className="section-sub">Joining our centre is simple. Here's how families get started.</p>
          </div>
        </FadeIn>
        <div className="steps-grid">
          {[
            { num:"1", title:"Book a Tour", desc:"Fill out our quick form and we'll reach out to schedule a time that works for your family. Tours are free and low-pressure." },
            { num:"2", title:"Visit & Meet Our Educators", desc:"Come see our classrooms, meet our certified team, and ask all your questions in person. We want you to feel completely confident." },
            { num:"3", title:"Secure Your Child's Spot", desc:"Choose the program that fits your child's age and your schedule. We'll walk you through enrollment and get everything set up." },
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="step-card">
                <div className="step-num" aria-hidden="true">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div style={{ textAlign:"center", marginTop:36 }}>
            <button type="button" className="btn btn-primary" onClick={openForm}>Book a Tour Now →</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── DURHAM REGION SERVICE AREA SECTION ─── */
function DurhamRegionSection({ openForm }) {
  const areas = [
    {
      city: "Whitby",
      note: "Our home base",
      desc: "Conveniently located at 1830 Rossland Rd E — easy access from throughout Whitby and central Durham Region.",
      icon: "📍",
      color: "rgba(224,123,57,0.11)",
      accent: "#E07B39",
    },
    {
      city: "Oshawa",
      note: "easy drive away",
      desc: "Many of our families commute from Oshawa and appreciate the short drive to a truly nurturing environment.",
      icon: "🚗",
      color: "rgba(91,159,212,0.11)",
      accent: "#5B9FD4",
    },
    {
      city: "Ajax",
      note: "Just next door",
      desc: "Ajax families enjoy the convenience of Whitby's location right on the Durham Region border.",
      icon: "🌿",
      color: "rgba(109,190,123,0.11)",
      accent: "#6DBE7B",
    },
    {
      city: "Pickering",
      note: "Welcome too",
      desc: "Families from Pickering find us an easy and worthwhile commute for quality licensed care.",
      icon: "⭐",
      color: "rgba(155,127,212,0.11)",
      accent: "#9B7FD4",
    },
  ];

  return (
    <section className="section" style={{ background:"var(--bg2)" }}>
      <DSun size={90} color="rgba(245,200,66,0.09)" style={{ top:"5%", right:"3%" }} anim="float-b"/>
      <DDots color="rgba(91,159,212,0.07)" style={{ bottom:"8%", left:"3%" }} anim="float-a"/>
      <DZigzag w={100} color="rgba(224,123,57,0.07)" style={{ top:"12%", left:"3%" }} anim="float-c"/>
      <div className="section-inner">
        <FadeIn>
          <div className="sec-hdr center">
            <div className="section-label">Service Area</div>
            <h2 className="section-title">Serving Families Across Durham Region</h2>
            <p className="section-sub">
              Based in Whitby, we proudly welcome families from across Durham Region — including Oshawa, Ajax, and Pickering. Our centre is centrally located and easy to reach from throughout the region.
            </p>
          </div>
        </FadeIn>
        <div className="area-grid">
          {areas.map((a, i) => (
            <FadeIn key={i} delay={i * 0.09}>
              <div className="area-card">
                <div className="area-card-icon" style={{ background: a.color }}>
                  <span style={{ fontSize:"1.4rem" }}>{a.icon}</span>
                </div>
                <h3>{a.city}</h3>
                <div style={{ fontSize:"0.72rem", fontWeight:700, color:a.accent, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>{a.note}</div>
                <p>{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <p style={{ textAlign:"center", marginTop:32, fontSize:"0.88rem", color:"var(--text3)" }}>
            Wherever you are in Durham Region — we'd love to meet your family.{" "}
            <button type="button" onClick={openForm} style={{ background:"none", border:"none", color:"var(--gold)", fontWeight:700, cursor:"pointer", fontSize:"0.88rem", fontFamily:"var(--body)", textDecoration:"underline", padding:0 }}>
              Book a free tour →
            </button>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── PAGE-SPECIFIC SEO with hardcoded SITE_URL canonical ─── */
function SeoHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = SEO_META[pathname] || SEO_META["/"];

    document.title = meta.title;

    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", meta.description);

    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) {
      kw = document.createElement("meta");
      kw.setAttribute("name", "keywords");
      document.head.appendChild(kw);
    }
    kw.setAttribute("content", meta.keywords);

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    const canonicalPath = pathname === "/" ? "" : pathname;
    canon.setAttribute("href", `${SITE_URL}${canonicalPath}`);

    return () => {
      if (canon && canon.parentNode) canon.parentNode.removeChild(canon);
    };
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function StickyMobileCta({ onClick }) {
  return (
    <div className="sticky-mobile-cta" aria-label="Floating call to action">
      <button type="button" className="btn btn-primary" onClick={onClick} aria-label="Book a tour at Lifelong Learning Centre">
        Book a Tour
      </button>
    </div>
  );
}

/* ─── HEADER ─── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const openForm = useCallback(() => window.open(BOOK_TOUR_URL, "_blank"), []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = useCallback((path) => {
    navigate(path); setMenuOpen(false); window.scrollTo({ top:0, behavior:"smooth" });
  }, [navigate]);

  const page = location.pathname;

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <button type="button" className="header-logo-btn" onClick={() => go("/")} aria-label="Lifelong Learning Centre — go to homepage">
          <img src={LOGO_PATH} alt="Lifelong Learning Centre logo" className="header-logo"/>
        </button>
        <ul className="nav-links">
          <li><button type="button" className="nav-link-btn" onClick={() => go("/")} style={{ color: page==="/" ? "var(--gold)" : undefined }}>Home</button></li>
          <li><button type="button" className="nav-link-btn" onClick={() => go("/about")} style={{ color: page==="/about" ? "var(--gold)" : undefined }}>About</button></li>
          <li><button type="button" className="nav-link-btn" onClick={() => go("/programs")} style={{ color: page==="/programs" ? "var(--gold)" : undefined }}>Programs</button></li>
          <li><button type="button" className="nav-cta" onClick={openForm}>Register Now</button></li>
        </ul>
        <button type="button" className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation menu">
          <span/><span/><span/>
        </button>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="navigation" aria-label="Mobile navigation">
        <button type="button" className="mobile-menu-link" onClick={() => go("/")}>Home</button>
        <button type="button" className="mobile-menu-link" onClick={() => go("/about")}>About</button>
        <button type="button" className="mobile-menu-link" onClick={() => go("/programs")}>Programs</button>
        <button type="button" className="mobile-menu-cta" onClick={() => { openForm(); setMenuOpen(false); }}>Register Now</button>
      </div>
    </header>
  );
}

/* ─── HOME PAGE ─── */
function HomePage() {
  const navigate = useNavigate();
  const openForm = useCallback(() => window.open(BOOK_TOUR_URL, "_blank"), []);
  const goPrograms = useCallback(() => { navigate("/programs"); window.scrollTo({ top:0, behavior:"smooth" }); }, [navigate]);
  const goAbout = useCallback(() => { navigate("/about"); window.scrollTo({ top:0, behavior:"smooth" }); }, [navigate]);

  return (
    <>
      <section className="hero section">
        <DSun size={130} color="rgba(245,200,66,0.12)" style={{ top:"8%", right:"3%", zIndex:0 }} anim="float-b"/>
        <DCloud size={200} color="rgba(91,159,212,0.08)" style={{ top:"2%", left:"6%", zIndex:0 }} anim="float-c"/>
        <DStar size={60} color="rgba(224,123,57,0.09)" style={{ bottom:"20%", left:"3%", zIndex:0 }} anim="float-a"/>
        <DHeart size={44} color="rgba(224,82,82,0.08)" style={{ top:"25%", right:"10%", zIndex:0 }} anim="float-a"/>
        <DCrayon size={24} h={84} color="rgba(109,184,122,0.11)" style={{ bottom:"10%", right:"6%", transform:"rotate(18deg)", zIndex:0 }} anim="float-c"/>
        <DDots color="rgba(224,123,57,0.09)" style={{ bottom:"6%", left:"8%", zIndex:0 }} anim="float-b"/>
        <DMoon size={50} color="rgba(245,200,66,0.1)" style={{ top:"8%", left:"36%", zIndex:0 }} anim="float-d"/>
        <DCircle size={55} color="rgba(91,159,212,0.1)" style={{ bottom:"22%", right:"3%", zIndex:0 }} anim="float-a"/>
        <div className="section-inner" style={{ position:"relative", zIndex:1 }}>
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">✦ Whitby · Oshawa · Ajax · Pickering · Est. 2009</div>
              <h1>A Warm Start for<br/><em>Curious Minds</em></h1>
              <p className="hero-desc">Lifelong Learning Centre is a locally owned, family-run daycare based in Whitby and serving families across Durham Region. Our certified educators help children build confidence, curiosity, and a genuine love of learning.</p>
              <p className="hero-sub">Licensed by the Ministry of Education · Ages 18 months – 7 years · Serving Whitby, Oshawa, Ajax & Pickering</p>
              <p className="hero-urgency">Limited spots available · Waitlist forming for Fall 2026</p>
              <div className="hero-btns">
                <button type="button" className="btn btn-primary" onClick={openForm}>Book a Tour</button>
                <button type="button" className="btn btn-outline" onClick={goAbout}>Learn More</button>
              </div>
              <div className="hero-proof">
                <div className="hero-proof-item"><div className="hero-proof-num">40+</div><div className="hero-proof-label">Years Experience</div></div>
                <div className="hero-proof-item"><div className="hero-proof-num">✓</div><div className="hero-proof-label">School-Ready Learning</div></div>
                <div className="hero-proof-item"><div className="hero-proof-num">🏡</div><div className="hero-proof-label">Family Operated</div></div>
              </div>
            </div>
            <div>
              <div className="hero-img-wrap">
                <img src="/images/hero.JPG" alt="Children engaged in learning activities at Lifelong Learning Centre daycare in Whitby, serving Durham Region" style={{ width:"100%", height:460, objectFit:"cover", display:"block" }}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DStar size={75} color="rgba(224,82,82,0.07)" style={{ top:"5%", right:"3%" }} anim="float-d"/>
        <DCloud size={170} color="rgba(91,159,212,0.06)" style={{ bottom:"4%", left:"1%" }} anim="float-b"/>
        <DZigzag w={110} color="rgba(245,200,66,0.12)" style={{ top:"10%", left:"4%" }} anim="float-c"/>
        <DDots color="rgba(109,184,122,0.09)" style={{ bottom:"8%", right:"4%" }} anim="float-a"/>
        <div className="section-inner">
          <FadeIn>
            <div className="sec-hdr center">
              <div className="section-label">Why Families Choose Us</div>
              <h2 className="section-title">Childcare Families Trust</h2>
              <p className="section-sub">Families across Whitby, Oshawa, Ajax, and Pickering have trusted us with their children. Here's what makes us different.</p>
            </div>
          </FadeIn>
          <div className="feat-grid">
            {[
              { icon:<SvgShield c="#E05252" s={22}/>, title:"Licensed & Inspected", desc:"Fully licensed by the Ministry of Education. Inspected regularly so you always know your child is in safe hands.", bar:"#E05252", bg:"rgba(224,82,82,0.09)" },
              { icon:<SvgGradCap c="#5B9FD4" s={22}/>, title:"Certified Educators", desc:"Every educator is certified and brings genuine warmth and expertise to every interaction with your child.", bar:"#5B9FD4", bg:"rgba(91,159,212,0.09)" },
              { icon:<SvgHome c="#F5C842" s={22}/>, title:"Family Operated", desc:"Family roots in Durham Region since 1989 — established in 2009 and proudly serving the community ever since.", bar:"#F5C842", bg:"rgba(245,200,66,0.11)" },
              { icon:<SvgSmile c="#E07B39" s={22}/>, title:"Daily Updates via Lillio", desc:"Photos, reports, and notes sent straight to your phone throughout the day so you're always in the loop.", bar:"#6DB87A", bg:"rgba(109,184,122,0.09)" },
              { icon:<SvgHeart2 c="#E07B39" s={22}/>, title:"Confidence-Building Learning", desc:"Hands-on, structured activities that spark curiosity and build life-ready skills from the very first day.", bar:"#E07B39", bg:"rgba(224,123,57,0.09)" },
              { icon:<SvgStar2 c="#F5C842" s={22}/>, title:"School Readiness Focus", desc:"Social skills, literacy, numeracy, and independence — everything needed for a confident start to kindergarten.", bar:"#E05252", bg:"rgba(224,82,82,0.08)" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="feat-card">
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:c.bar, borderRadius:"3px 3px 0 0" }}/>
                  <div className="feat-card-icon"><IBox bg={c.bg}>{c.icon}</IBox></div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DMoon size={70} color="rgba(245,200,66,0.11)" style={{ top:"8%", right:"5%" }} anim="float-c"/>
        <DScribble w={150} color="rgba(224,123,57,0.09)" style={{ bottom:"10%", left:"2%" }} anim="float-b"/>
        <DTriangle size={48} color="rgba(91,159,212,0.08)" style={{ bottom:"5%", right:"7%" }} anim="float-d"/>
        <div className="section-inner">
          <div className="two-col">
            <FadeIn>
              <img src="/images/learning.JPG" alt="Certified educator guiding children through a structured learning activity at Lifelong Learning Centre in Whitby" loading="lazy" style={{ width:"100%", height:400, borderRadius:22, objectFit:"cover", display:"block" }}/>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div className="section-label">Our Philosophy</div>
                <h2 className="section-title">Structured, Joyful Learning Every Day</h2>
                <p className="section-sub" style={{ marginBottom:16 }}>We believe children thrive when they feel safe, seen, and genuinely curious. Our approach blends structured activities with hands-on discovery — building skills through experience, not just instruction.</p>
                <p className="section-sub" style={{ marginBottom:28 }}>Established in 2009, our experienced team serves families across Durham Region from our centre in Whitby — bringing deep knowledge and genuine care to every child, every day.</p>
                <div className="approach-btns" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  <button type="button" className="btn btn-primary" onClick={goPrograms}>Explore Our Programs →</button>
                  <button type="button" className="btn btn-outline" onClick={goAbout}>About Us</button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DCrayon size={22} h={82} color="rgba(224,82,82,0.09)" style={{ bottom:"6%", left:"2%", transform:"rotate(-14deg)" }} anim="float-a"/>
        <DDots color="rgba(91,159,212,0.08)" style={{ top:"7%", left:"4%" }} anim="float-c"/>
        <DLego size={48} color="rgba(245,200,66,0.1)" style={{ top:"4%", right:"4%" }} anim="float-b"/>
        <DMarker size={22} h={75} color="rgba(155,127,212,0.1)" style={{ bottom:"8%", right:"4%", transform:"rotate(15deg)" }} anim="float-d"/>
        <DPaintbrush size={26} h={82} color="rgba(109,184,122,0.1)" style={{ top:"15%", right:"10%", transform:"rotate(-10deg)" }} anim="float-c"/>
        <div className="section-inner">
          <FadeIn>
            <div className="sec-hdr center">
              <div className="section-label">Our Programs</div>
              <h2 className="section-title">Every Stage, Every Child</h2>
              <p className="section-sub">Four age-tailored programs for children 18 months to 7 years — serving families in Whitby and throughout Durham Region.</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
              <div className="scarcity-badge">Only a few spots remaining in select programs</div>
            </div>
          </FadeIn>
          <div className="prog-grid">
            {PROGRAMS.map((p, i) => <ProgCardSimple key={i} prog={p} delay={i * 0.09}/>)}
          </div>
          <FadeIn delay={0.4}>
            <p className="pricing-note">Flexible full-time and part-time options available. Contact us for current rates.</p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="prog-cta-wrap" style={{ marginTop:20, display:"flex", justifyContent:"center" }}>
              <button type="button" className="btn btn-outline" onClick={goPrograms}>View All Programs →</button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DCloud size={190} color="rgba(91,159,212,0.07)" style={{ top:"4%", right:"1%" }} anim="float-b"/>
        <DHeart size={44} color="rgba(224,82,82,0.07)" style={{ bottom:"8%", left:"4%" }} anim="float-a"/>
        <DScribble w={100} color="rgba(245,200,66,0.1)" style={{ top:"14%", left:"2%" }} anim="float-c"/>
        <div className="section-inner">
          <div className="two-col">
            <FadeIn>
              <div>
                <div className="section-label">Parent Communication</div>
                <h2 className="section-title">Stay Connected All Day with Lillio</h2>
                <p className="section-sub" style={{ marginBottom:22 }}>Spending the day apart is tough. That's why we use Lillio — a parent communication app that keeps you connected throughout the day without interrupting your work.</p>
                <div className="lillio-features" style={{ marginBottom:24 }}>
                  {["Daily photos & short videos","Activity & learning reports","Meal, nap & mood updates","Direct messaging with educators","Milestone tracking & notes"].map((f, i) => (
                    <div className="lillio-feature" key={i}>
                      <span className="lillio-check" style={{ background: i%2===0 ? "var(--blue)" : "var(--green)" }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <button type="button" className="btn btn-primary" onClick={openForm}>Book a Tour to See Lillio in Action</button>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/images/lillio.PNG" alt="Lillio parent communication app showing daily updates from Lifelong Learning Centre" loading="lazy" style={{ width:"100%", height:380, borderRadius:22, objectFit:"contain", background:"white", display:"block" }}/>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DSun size={90} color="rgba(245,200,66,0.1)" style={{ top:"5%", left:"3%" }} anim="float-b"/>
        <DDiamond size={40} color="rgba(91,159,212,0.09)" style={{ bottom:"10%", right:"5%" }} anim="float-a"/>
        <DTriangle size={44} color="rgba(224,123,57,0.07)" style={{ top:"20%", right:"3%" }} anim="float-d"/>
        <div className="section-inner">
          <FadeIn>
            <div className="sec-hdr center">
              <div className="section-label">School Readiness</div>
              <h2 className="section-title">Confident, Capable Kindergarteners</h2>
              <p className="section-sub">Everything we do prepares children for a smooth, joyful transition to school.</p>
            </div>
          </FadeIn>
          <div className="ready-grid">
            {[
              { icon:<SvgBook c="#E05252" s={22}/>, title:"Language & Literacy", desc:"Letters, sounds, early reading foundations", color:"rgba(224,82,82,0.11)" },
              { icon:<SvgStar2 c="#5B9FD4" s={22}/>, title:"Math & Reasoning", desc:"Numbers, patterns, shapes & logic", color:"rgba(91,159,212,0.11)" },
              { icon:<SvgUsers c="#6DB87A" s={22}/>, title:"Social Skills", desc:"Sharing, cooperating, building friendships", color:"rgba(109,184,122,0.11)" },
              { icon:<SvgHeart2 c="#D4AA00" s={22}/>, title:"Independence", desc:"Self-care, routines, personal responsibility", color:"rgba(245,200,66,0.14)" },
            ].map((r, i) => (
              <FadeIn key={i} delay={i * 0.09}>
                <div className="ready-item">
                  <div className="ready-icon-wrap" style={{ background:r.color }}>{r.icon}</div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DMoon size={68} color="rgba(245,200,66,0.1)" style={{ top:"4%", right:"4%" }} anim="float-c"/>
        <DScribble w={130} color="rgba(109,184,122,0.09)" style={{ bottom:"5%", left:"2%" }} anim="float-b"/>
        <DCrayon size={22} h={78} color="rgba(245,200,66,0.12)" style={{ top:"10%", left:"2%", transform:"rotate(8deg)" }} anim="float-a"/>
        <div className="section-inner">
          <div className="two-col">
            <FadeIn>
              <div>
                <div className="section-label">A Typical Day</div>
                <h2 className="section-title">Every Hour Counts</h2>
                <p className="section-sub" style={{ marginBottom:24 }}>A balanced rhythm of learning, play, nourishment, and creativity — structured to help every child thrive.</p>
                {[
                  { time:"7:30 – 9:00", title:"Early Care & Welcome", desc:"Warm arrivals, free choice activities, settling in" },
                  { time:"9:00 – 9:20", title:"Circle Time", desc:"Songs, stories, calendar, and group sharing" },
                  { time:"9:20 – 9:35", title:"Snack Time", desc:"Nutritious morning snack and social connection" },
                  { time:"9:35 – 10:35", title:"Structured Learning", desc:"Educator-led activities and hands-on discovery" },
                  { time:"10:35 – 11:35", title:"Outdoor Play", desc:"Fresh air, movement, and nature exploration" },
                  { time:"11:35 – 12:05", title:"Lunch Time", desc:"Nutritious meal, conversation, and connection" },
                  { time:"12:05 – 2:05", title:"Rest & Quiet Time", desc:"Naps for younger children, quiet reading for older" },
                  { time:"2:15 – 2:30", title:"Afternoon Snack", desc:"Healthy snack and afternoon reset" },
                  { time:"2:30 – 3:30", title:"Creative Activities", desc:"Art, music, dramatic play, and free exploration" },
                  { time:"3:30 – 4:30", title:"Outdoor Play", desc:"Second outdoor session for movement and fresh air" },
                  { time:"4:30 – 5:30", title:"Aftercare & Pickup", desc:"Wind-down activities, snack, and parent pickup" },
                ].map((s, i) => (
                  <div className="schedule-row" key={i}>
                    <div className="schedule-time">{s.time}</div>
                    <div className="schedule-dot"/>
                    <div className="schedule-content"><h4>{s.title}</h4><p>{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/images/daily1.WEBP" alt="Children following the structured daily schedule at Lifelong Learning Centre in Whitby" loading="lazy" style={{ width:"100%", height:540, borderRadius:22, objectFit:"cover", display:"block" }}/>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DStar size={72} color="rgba(245,200,66,0.09)" style={{ top:"7%", right:"3%" }} anim="float-d"/>
        <DScribble w={120} color="rgba(224,82,82,0.07)" style={{ bottom:"6%", left:"2%" }} anim="float-a"/>
        <DDots color="rgba(91,159,212,0.08)" style={{ top:"5%", left:"5%" }} anim="float-b"/>
        <DHeart size={40} color="rgba(224,82,82,0.07)" style={{ bottom:"12%", right:"5%" }} anim="float-c"/>
        <div className="section-inner">
          <FadeIn>
            <div className="sec-hdr center">
              <div className="section-label">Parent Stories</div>
              <h2 className="section-title">What Parents Are Saying</h2>
              <p className="section-sub">Real words from real families across Durham Region who trust us every day.</p>
            </div>
          </FadeIn>
          <div className="testi-grid">
            {[
              { quote:"From the moment we walked through the door, we felt it was the right place. The warmth and care our daughter receives every day gives us such peace of mind.", name:"Parent, Whitby", role:"Parent of a 3-year-old" },
              { quote:"The Lillio updates truly make my day. Seeing photos of my son learning and laughing — he's grown in confidence so much since joining. We couldn't be happier.", name:"Parent, Whitby", role:"Parent of a 2.5-year-old" },
              { quote:"As a first-time mom, leaving my child was terrifying. The educators at Lifelong made the transition so gentle and caring. It honestly feels like an extension of home.", name:"Parent, Whitby", role:"Parent of a 2-year-old" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="testi-card">
                  <div className="testi-stars">{[1,2,3,4,5].map(s=><svg key={s} className="testi-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/></svg>)}</div>
                  <p className="testi-text">"{t.quote}"</p>
                  <div><div className="testi-author">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop:40, textAlign:"center" }}>
              <div style={{ marginBottom:14, fontSize:"0.88rem", color:"var(--text2)", fontWeight:500 }}>Find us and leave a review</div>
              <div className="social-links">
                <a className="social-btn" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#1877F2", borderColor:"#1877F2" }} aria-label="Visit our Facebook page"><SvgFb/> Facebook</a>
                <a className="social-btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#E1306C", borderColor:"#E1306C" }} aria-label="Visit our Instagram page"><SvgIg/> Instagram</a>
                <a className="social-btn" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#333", borderColor:"#777" }} aria-label="Read our Google reviews"><SvgGoogle/> Google Reviews</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <DurhamRegionSection openForm={openForm}/>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DCloud size={170} color="rgba(91,159,212,0.07)" style={{ top:"3%", right:"1%" }} anim="float-b"/>
        <DCrayon size={20} h={72} color="rgba(109,184,122,0.11)" style={{ bottom:"5%", left:"3%", transform:"rotate(-16deg)" }} anim="float-c"/>
        <DZigzag w={95} color="rgba(224,123,57,0.08)" style={{ top:"20%", left:"3%" }} anim="float-a"/>
        <div className="section-inner">
          <div className="contact-two-col">
            <FadeIn>
              <div>
                <div className="section-label">Visit & Contact</div>
                <h2 className="section-title">Conveniently Located for Families Across Durham Region</h2>
                <p className="section-sub" style={{ marginBottom:24 }}>Our centre at 1830 Rossland Rd E in Whitby is easily accessible for families throughout Durham Region — including Oshawa, Ajax, and Pickering. Established in 2009, we've been a trusted childcare partner for the community ever since.</p>
                <div className="location-rows">
                  {[
                    { icon:<SvgMapPin c="var(--gold)"/>, content:<a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="View our location on Google Maps">1830 Rossland Rd E, Whitby, ON L1N 3P2</a> },
                    { icon:<SvgClock2 c="var(--blue)"/>, content:<span>Monday – Friday · 7:30 AM – 5:30 PM</span> },
                    { icon:<SvgPhone2 c="var(--purple)"/>, content:<a href={PHONE} className="contact-link" aria-label="Call us at 905 240 5433">905 240 5433</a> },
                    { icon:<SvgMail c="var(--green)"/>, content:<a href={EMAIL} className="contact-link" aria-label="Email us">info@lifelonglearningcentre.com</a> },
                    { icon:<SvgUsers c="var(--red)"/>, content:<span>Ages 18 months – 7 years</span> },
                  ].map((row, i) => (
                    <div className="location-row" key={i}>
                      <div className="location-icon">{row.icon}</div>
                      <span>{row.content}</span>
                    </div>
                  ))}
                </div>
                <div className="contact-btns">
                  <button type="button" className="btn btn-primary" onClick={openForm}>Register Now</button>
                  <a href={PHONE} className="btn btn-outline" style={{ textDecoration:"none" }} aria-label="Call Lifelong Learning Centre">Call Us</a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="contact-right">
                <img
                  src="/images/centre.jpeg"
                  alt="Exterior of Lifelong Learning Centre childcare at 1830 Rossland Rd E in Whitby, Ontario — serving Durham Region"
                  loading="lazy"
                  style={{ width:"100%", height:220, borderRadius:18, objectFit:"cover", display:"block", boxShadow:"var(--shadow)" }}
                />
                <MapOrFallback/>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <FadeIn>
            <div className="cta-banner">
              <DStar size={84} color="rgba(255,255,255,0.07)" style={{ top:-16, left:"3%" }}/>
              <DHeart size={52} color="rgba(255,255,255,0.06)" style={{ bottom:-8, right:"5%" }}/>
              <DCloud size={150} color="rgba(255,255,255,0.05)" style={{ top:-8, right:"14%" }}/>
              <div style={{ position:"relative", zIndex:1 }}>
                <h2>Spots Are Limited — Don't Wait</h2>
                <p>Book a tour today and see why families across Whitby, Oshawa, Ajax, and Pickering trust Lifelong Learning Centre with their most important people.</p>
                <div className="cta-btns">
                  <button type="button" className="btn btn-white" onClick={openForm}>Register Now</button>
                  <a href={PHONE} className="btn btn-ghost" style={{ textDecoration:"none" }} aria-label="Call Lifelong Learning Centre">Call Us</a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ─── ABOUT PAGE ─── */
function AboutPage() {
  const navigate = useNavigate();
  const openForm = useCallback(() => window.open(BOOK_TOUR_URL, "_blank"), []);
  const goPrograms = useCallback(() => { navigate("/programs"); window.scrollTo({ top:0, behavior:"smooth" }); }, [navigate]);

  return (
    <>
      <section className="hero section" style={{ minHeight:"60vh", background:"linear-gradient(160deg,#FFF9F5 0%,#FDFBF8 60%,#F0F7FF 100%)" }}>
        <DSun size={110} color="rgba(245,200,66,0.1)" style={{ top:"8%", right:"5%" }} anim="float-b"/>
        <DCloud size={170} color="rgba(91,159,212,0.07)" style={{ bottom:"5%", left:"2%" }} anim="float-c"/>
        <DStar size={56} color="rgba(224,123,57,0.08)" style={{ top:"20%", left:"5%" }} anim="float-a"/>
        <DHeart size={40} color="rgba(224,82,82,0.07)" style={{ bottom:"15%", right:"8%" }} anim="float-d"/>
        <div className="section-inner" style={{ textAlign:"center", paddingTop:40, position:"relative", zIndex:1 }}>
          <FadeIn>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Our Story</div>
              <h1 style={{ fontFamily:"var(--heading)", fontSize:"clamp(2rem,5vw,3.1rem)", maxWidth:640, margin:"0 auto 18px" }}>
                Built on Community, Driven by <span style={{ color:"var(--gold)" }}>Care</span>
              </h1>
              <p style={{ fontSize:"1.03rem", color:"var(--text2)", maxWidth:520, lineHeight:1.84 }}>
                We're not a chain. We're a locally owned, family-run childcare centre — established in 2009, based in Whitby and proudly serving families across Durham Region.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DHeart size={48} color="rgba(224,82,82,0.07)" style={{ top:"8%", right:"4%" }} anim="float-a"/>
        <DScribble w={120} color="rgba(224,123,57,0.09)" style={{ bottom:"6%", left:"2%" }} anim="float-b"/>
        <DSquare size={30} color="rgba(109,184,122,0.08)" style={{ top:"30%", left:"3%" }} anim="float-d"/>
        <div className="section-inner">
          <div className="about-grid">
            <FadeIn>
              <img src="/images/warm.jpg" alt="Warm connection between an educator and child at Lifelong Learning Centre in Whitby" loading="lazy" style={{ width:"100%", height:400, borderRadius:22, objectFit:"cover", display:"block" }}/>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div className="section-label">Established 2009</div>
                <h2 className="section-title">Community Roots. A Vision for Children.</h2>
                <p className="section-sub" style={{ marginBottom:14 }}>Lifelong Learning Centre was founded in 2009 with one simple belief: every child deserves a warm, nurturing place to grow. Our family's roots in Durham Region go back to 1989 — this community has been home for a long time.</p>
                <p className="section-sub" style={{ marginBottom:24 }}>From our centre in Whitby, we serve families across Durham Region — including Oshawa, Ajax, and Pickering — who want more than just childcare: a place where children feel safe, parents feel confident, and learning happens naturally every day.</p>
                <button type="button" className="btn btn-primary" onClick={goPrograms}>See Our Programs →</button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DMoon size={68} color="rgba(245,200,66,0.1)" style={{ top:"6%", right:"5%" }} anim="float-c"/>
        <DTriangle size={44} color="rgba(91,159,212,0.08)" style={{ bottom:"8%", left:"3%" }} anim="float-d"/>
        <DDots color="rgba(224,123,57,0.08)" style={{ top:"10%", left:"5%" }} anim="float-a"/>
        <div className="section-inner">
          <div className="about-grid">
            <FadeIn>
              <div>
                <div className="section-label">Our Approach</div>
                <h2 className="section-title">How We Support Every Child</h2>
                <p className="section-sub" style={{ marginBottom:14 }}>We follow a structured, confidence-building approach to early learning — blending educator-led activities with hands-on discovery that children lead themselves.</p>
                <p className="section-sub" style={{ marginBottom:22 }}>Every certified educator on our team brings professional training and a genuine passion for early childhood development. We don't just care for children — we invest in them.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {["Structured daily routines that build confidence","Age-appropriate, engaging activities","Strong parent communication & partnership","Individualized attention for every child"].map((item, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:"0.91rem", color:"var(--text2)" }}>
                      <span style={{ color:"var(--gold)", fontWeight:700, marginTop:1 }}>✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/images/creative.JPG" alt="Children engaged in creative hands-on learning with an educator at Lifelong Learning Centre" loading="lazy" style={{ width:"100%", height:400, borderRadius:22, objectFit:"cover", display:"block" }}/>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DStar size={72} color="rgba(224,82,82,0.07)" style={{ top:"5%", right:"3%" }} anim="float-d"/>
        <DCloud size={155} color="rgba(91,159,212,0.06)" style={{ bottom:"4%", left:"1%" }} anim="float-b"/>
        <div className="section-inner">
          <FadeIn>
            <div className="sec-hdr center">
              <div className="section-label">Our Spaces</div>
              <h2 className="section-title">A Place Children Love to Be</h2>
              <p className="section-sub">Bright, safe, and thoughtfully designed for curious minds.</p>
            </div>
          </FadeIn>
          <div className="space-grid">
            {[
              { label:"Bright Classrooms", desc:"Natural light, organized learning stations, age-appropriate materials.", image:"/images/care.JPG", alt:"Bright, organized classroom at Lifelong Learning Centre in Whitby" },
              { label:"Outdoor Play Areas", desc:"Safe, fully enclosed spaces for running, climbing, and exploring.", image:"/images/outdoor1.JPG", alt:"Safe outdoor play area at Lifelong Learning Centre in Whitby" },
              { label:"Creative Spaces", desc:"Dedicated areas for art, music, dramatic play, and hands-on projects.", image:"/images/daily2.JPG", alt:"Creative arts space at Lifelong Learning Centre" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="space-card">
                  {c.image
                    ? <div style={{ overflow:"hidden", height:180 }}><img src={c.image} alt={c.alt} loading="lazy" style={{ width:"100%", height:180, objectFit:"cover", display:"block" }}/></div>
                    : <ImgPh h={180} label={c.label} style={{ borderRadius:0 }}/>
                  }
                  <div className="space-card-body"><h3>{c.label}</h3><p>{c.desc}</p></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DCrayon size={22} h={78} color="rgba(224,123,57,0.1)" style={{ top:"8%", right:"5%", transform:"rotate(10deg)" }} anim="float-b"/>
        <DScribble w={105} color="rgba(109,184,122,0.09)" style={{ bottom:"8%", left:"3%" }} anim="float-c"/>
        <div className="section-inner">
          <FadeIn>
            <div className="sec-hdr center">
              <div className="section-label">Our Educators</div>
              <h2 className="section-title">A Team Built on Experience & Heart</h2>
            </div>
          </FadeIn>
          <div className="team-grid">
            {[
              { name:"Centre Director", role:"Certified Educator · 20+ Years", desc:"Leading our centre with expertise, warmth, and a deep commitment to every child's growth.", bg:"rgba(224,82,82,0.1)", emoji:"👩‍💼" },
              { name:"Program Lead", role:"Certified Educator", desc:"Designing engaging, structured learning activities that make every day an adventure.", bg:"rgba(91,159,212,0.1)", emoji:"👩‍🏫" },
              { name:"Lead Educator", role:"Certified Educator", desc:"Building warm, trusting relationships with children and their families every day.", bg:"rgba(109,184,122,0.1)", emoji:"👩‍🎓" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="team-card">
                  <div className="team-avatar" style={{ background:t.bg }}>{t.emoji}</div>
                  <h3>{t.name}</h3>
                  <div className="team-role">{t.role}</div>
                  <p>{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <div className="section-inner">
          <FadeIn>
            <div className="cta-banner">
              <DStar size={76} color="rgba(255,255,255,0.07)" style={{ top:-14, left:"4%" }}/>
              <DHeart size={48} color="rgba(255,255,255,0.06)" style={{ bottom:-8, right:"6%" }}/>
              <h2>Come See Our Centre for Yourself</h2>
              <p>We'd love to welcome your family — whether you're in Whitby, Oshawa, Ajax, or Pickering. Come see what we're all about.</p>
              <div className="cta-btns about-cta-btns">
                <button type="button" className="btn btn-white" onClick={openForm}>Register Now</button>
                <a href={PHONE} className="btn btn-ghost" style={{ textDecoration:"none" }} aria-label="Call Lifelong Learning Centre">Call Us</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ─── PROGRAMS PAGE ─── */
function ProgramsPage() {
  const openForm = useCallback(() => window.open(BOOK_TOUR_URL, "_blank"), []);

  return (
    <>
      <section className="hero section" style={{ minHeight:"60vh", background:"linear-gradient(160deg,#FFF9F5 0%,#FDFBF8 60%,#F0FFF4 100%)" }}>
        <DCloud size={170} color="rgba(109,184,122,0.09)" style={{ top:"6%", left:"3%" }} anim="float-c"/>
        <DStar size={62} color="rgba(224,123,57,0.08)" style={{ top:"15%", right:"5%" }} anim="float-a"/>
        <DCrayon size={24} h={88} color="rgba(224,82,82,0.09)" style={{ bottom:"8%", right:"7%", transform:"rotate(18deg)" }} anim="float-b"/>
        <DLego size={46} color="rgba(155,127,212,0.09)" style={{ top:"8%", right:"22%" }} anim="float-d"/>
        <DMarker size={20} h={70} color="rgba(245,200,66,0.1)" style={{ bottom:"16%", left:"5%", transform:"rotate(-8deg)" }} anim="float-a"/>
        <div className="section-inner" style={{ textAlign:"center", paddingTop:40, position:"relative", zIndex:1 }}>
          <FadeIn>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Our Programs</div>
              <h1 style={{ fontFamily:"var(--heading)", fontSize:"clamp(2rem,5vw,3.1rem)", maxWidth:640, margin:"0 auto 18px" }}>
                Tailored for Every <span style={{ color:"var(--gold)" }}>Stage of Growth</span>
              </h1>
              <p style={{ fontSize:"1.03rem", color:"var(--text2)", maxWidth:520, lineHeight:1.84 }}>
                Four age-specific programs for children 18 months to 7 years — serving families in Whitby, Oshawa, Ajax, Pickering, and throughout Durham Region with confidence-building learning and genuine care.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DSun size={100} color="rgba(245,200,66,0.1)" style={{ top:"4%", right:"4%" }} anim="float-b"/>
        <DHeart size={44} color="rgba(224,82,82,0.07)" style={{ bottom:"5%", left:"3%" }} anim="float-a"/>
        <DDots color="rgba(91,159,212,0.08)" style={{ top:"8%", left:"4%" }} anim="float-c"/>
        <DPaintbrush size={24} h={78} color="rgba(155,127,212,0.09)" style={{ top:"12%", left:"10%", transform:"rotate(-12deg)" }} anim="float-d"/>
        <DMarker size={20} h={68} color="rgba(109,184,122,0.09)" style={{ bottom:"12%", right:"4%", transform:"rotate(10deg)" }} anim="float-b"/>
        <div className="section-inner">
          <FadeIn>
            <div className="sec-hdr center">
              <div className="section-label">Age-Appropriate Programs</div>
              <h2 className="section-title">Choose the Right Fit</h2>
              <p className="section-sub">Each program is built around the unique needs, milestones, and energy of your child's age group.</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
              <div className="scarcity-badge">Only a few spots remaining in select programs</div>
            </div>
          </FadeIn>
          <div className="prog-grid">
            {PROGRAMS.map((p, i) => <ProgCardFull key={i} prog={p} delay={i * 0.09} onBook={openForm}/>)}
          </div>
          <FadeIn delay={0.4}>
            <p className="pricing-note">Flexible full-time and part-time options available. Contact us for current rates.</p>
          </FadeIn>
        </div>
      </section>

      <WhatToExpectSection openForm={openForm}/>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DMoon size={65} color="rgba(245,200,66,0.1)" style={{ top:"7%", right:"4%" }} anim="float-c"/>
        <DScribble w={115} color="rgba(224,123,57,0.08)" style={{ bottom:"6%", left:"3%" }} anim="float-b"/>
        <DDots color="rgba(155,127,212,0.08)" style={{ top:"20%", left:"4%" }} anim="float-a"/>
        <div className="section-inner">
          <div className="two-col">
            <FadeIn>
              <img src="/images/social.JPG" alt="Educators playing and interacting with children in a social learning environment at Lifelong Learning Centre" loading="lazy" style={{ width:"100%", height:400, borderRadius:22, objectFit:"cover" }}/>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div className="section-label">Our Goals</div>
                <h2 className="section-title">What We're Building Together</h2>
                <p className="section-sub" style={{ marginBottom:8 }}>Beyond letters and numbers, we're building confident, resilient, joyful children ready for the world.</p>
                <div className="goals-list">
                  {[
                    { title:"Confidence & Independence", desc:"Encouraging children to try, persist, and believe in themselves.", color:"#E05252" },
                    { title:"A Genuine Love of Learning", desc:"Making every day feel like a new and exciting opportunity.", color:"#5B9FD4" },
                    { title:"Social & Emotional Growth", desc:"Teaching empathy, communication, and healthy self-expression.", color:"#6DB87A" },
                    { title:"True School Readiness", desc:"Sending children to kindergarten prepared, excited, and confident.", color:"#E07B39" },
                  ].map((g, i) => (
                    <div className="goal-item" key={i}>
                      <div className="goal-num" style={{ background:g.color }}>{i+1}</div>
                      <div><h4>{g.title}</h4><p>{g.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <div className="section-inner">
          <FadeIn>
            <div className="cta-banner">
              <DCloud size={148} color="rgba(255,255,255,0.05)" style={{ top:-6, right:"5%" }}/>
              <DHeart size={48} color="rgba(255,255,255,0.06)" style={{ bottom:-8, left:"4%" }}/>
              <h2>Find the Right Program for Your Child</h2>
              <p>Book a tour to visit our classrooms, meet our educators, and see which program is the perfect fit — wherever you are in Durham Region.</p>
              <div className="cta-btns">
                <button type="button" className="btn btn-white" onClick={openForm}>Register Now</button>
                <a href={PHONE} className="btn btn-ghost" style={{ textDecoration:"none" }} aria-label="Call Lifelong Learning Centre">Call Us</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  const navigate = useNavigate();
  const go = useCallback((path) => { navigate(path); window.scrollTo({ top:0, behavior:"smooth" }); }, [navigate]);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <img src={LOGO_PATH} alt="Lifelong Learning Centre — licensed daycare in Whitby, serving Durham Region" className="footer-logo"/>
            <p style={{ fontSize:"0.86rem", lineHeight:1.78, maxWidth:260, marginTop:10, color:"rgba(255,255,255,0.65)" }}>
              A locally owned, licensed childcare centre established in 2009. Based in Whitby and serving families across Durham Region — including Oshawa, Ajax, and Pickering — with family roots in this community since 1989.
            </p>
            <div className="footer-social social-links" style={{ justifyContent:"flex-start" }}>
              <a className="social-btn" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#90B8F0", borderColor:"rgba(255,255,255,0.25)" }} aria-label="Facebook"><SvgFb/> Facebook</a>
              <a className="social-btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#F5A8C8", borderColor:"rgba(255,255,255,0.25)" }} aria-label="Instagram"><SvgIg/> Instagram</a>
            </div>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              <li><button type="button" className="footer-nav-btn" onClick={() => go("/")}>Home</button></li>
              <li><button type="button" className="footer-nav-btn" onClick={() => go("/about")}>About Us</button></li>
              <li><button type="button" className="footer-nav-btn" onClick={() => go("/programs")}>Programs</button></li>
            </ul>
          </div>
          <div>
            <h4>Programs</h4>
            <ul>
              <li><button type="button" className="footer-nav-btn" onClick={() => go("/programs")}>Toddler (18m – 2.5yr)</button></li>
              <li><button type="button" className="footer-nav-btn" onClick={() => go("/programs")}>Preschool (2.5 – 3.5yr)</button></li>
              <li><button type="button" className="footer-nav-btn" onClick={() => go("/programs")}>Pre-K Prep (3.5 – 4yr)</button></li>
              <li><button type="button" className="footer-nav-btn" onClick={() => go("/programs")}>School Age (4 – 7yr)</button></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">1830 Rossland Rd E, Whitby, ON</a></li>
              <li><a href={EMAIL}>info@lifelonglearningcentre.com</a></li>
              <li><a href={PHONE}>905 240 5433</a></li>
              <li><span style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.52)" }}>Mon – Fri · 7:30 – 5:30</span></li>
              <li><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Google Reviews</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lifelong Learning Centre. All rights reserved.</span>
          <span>Est. 2009 · Whitby, ON · Licensed daycare serving Whitby, Oshawa, Ajax & Pickering</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  const openForm = useCallback(() => window.open(BOOK_TOUR_URL, "_blank"), []);

  return (
    <BrowserRouter>
      <style>{styles}</style>
      <SeoHead/>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/programs" element={<ProgramsPage/>}/>
      </Routes>
      <Footer/>
      <StickyMobileCta onClick={openForm}/>
    </BrowserRouter>
  );
}