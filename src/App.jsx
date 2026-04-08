import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

const LOGO_PATH = "/logo.jpg";
const FACEBOOK_URL = "https://www.facebook.com/share/17hs84vmpk/?mibextid=wwXIfr";
const INSTAGRAM_URL = "https://www.instagram.com/lifelonglearningcentres?igsh=eDF3aG03ZzJicm5w";
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/sqh5As62kySuvkSG7?g_st=ic";
const EMAIL = "mailto:info@lifelonglearningcentre.com";
const PHONE = "tel:9052405433";
const MAPS_URL = "https://maps.app.goo.gl/sqh5As62kySuvkSG7?g_st=ic";
const BOOK_TOUR_URL = "https://api.leadconnectorhq.com/widget/form/7vUWN4jaEDQpyLiR3SHT?notrack=true";

const openForm = () => window.open(BOOK_TOUR_URL, "_blank");

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600;700&display=swap');

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

.header { position:fixed; top:0; left:0; right:0; z-index:1000; background:rgba(253,251,248,0.97); backdrop-filter:blur(20px); border-bottom:1px solid rgba(224,123,57,0.1); transition:box-shadow 0.3s; }
.header.scrolled { box-shadow: 0 2px 30px rgba(0,0,0,0.08); }
.header-inner { max-width:1200px; margin:0 auto; padding:10px 32px; display:flex; align-items:center; justify-content:space-between; }
.header-logo { height:54px; width:auto; object-fit:contain; display:block; cursor:pointer; transition:transform 0.3s, opacity 0.3s; border-radius:6px; }
.header-logo:hover { transform:scale(1.04); opacity:0.88; }
.nav-links { display:flex; gap:32px; align-items:center; list-style:none; }
.nav-links a { text-decoration:none; color:var(--text2); font-weight:500; font-size:0.92rem; transition:color 0.2s; cursor:pointer; letter-spacing:0.01em; position:relative; }
.nav-links a::after { content:''; position:absolute; bottom:-3px; left:0; right:0; height:2px; background:var(--gold); border-radius:2px; transform:scaleX(0); transition:transform 0.25s; }
.nav-links a:hover { color:var(--gold); }
.nav-links a:hover::after { transform:scaleX(1); }
.nav-cta { background:var(--gold) !important; color:white !important; padding:10px 26px !important; border-radius:50px !important; font-weight:600 !important; box-shadow:0 4px 16px rgba(224,123,57,0.3) !important; transition:all 0.22s !important; animation:pulseGlow 3s ease-in-out infinite; text-decoration:none !important; border:none; cursor:pointer; font-family:var(--body); font-size:0.92rem; }
.nav-cta::after { display:none !important; }
.nav-cta:hover { background:var(--gold-dark) !important; transform:translateY(-2px) !important; box-shadow:0 8px 24px rgba(224,123,57,0.45) !important; }
.hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:4px; }
.hamburger span { width:24px; height:2.5px; background:var(--text); border-radius:2px; transition:all 0.3s; }
.hamburger.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity:0; }
.hamburger.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }
.mobile-menu { display:none; flex-direction:column; background:var(--bg); position:absolute; top:100%; left:0; right:0; padding:20px 32px; border-bottom:1px solid rgba(224,123,57,0.1); box-shadow:0 8px 32px rgba(0,0,0,0.07); }
.mobile-menu.open { display:flex; }
.mobile-menu a { padding:12px 0; text-decoration:none; color:var(--text2); font-weight:500; font-size:1rem; border-bottom:1px solid rgba(0,0,0,0.05); cursor:pointer; }
.mobile-menu a:last-child { border:none; }
@media (max-width:768px) { .nav-links{display:none} .hamburger{display:flex} .header-inner{padding:10px 20px} .header-logo{height:42px} }

.section { position:relative; overflow:hidden; padding:88px 24px; }
.section-inner { max-width:1100px; margin:0 auto; }
.section-label { display:inline-flex; align-items:center; gap:8px; font-size:0.75rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--gold); margin-bottom:14px; }
.section-label::before { content:''; display:block; width:22px; height:2px; background:var(--gold); border-radius:2px; }
.section-title { font-family:var(--heading); font-size:clamp(1.9rem,4vw,2.75rem); color:var(--text); line-height:1.18; margin-bottom:16px; }
.section-sub { font-size:1.05rem; color:var(--text2); max-width:580px; line-height:1.82; }

.hero { padding-top:110px; padding-bottom:84px; background:linear-gradient(160deg,#FFF9F5 0%,#FDFBF8 45%,#F0F7FF 100%); min-height:93vh; display:flex; align-items:center; }
.hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
.hero-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:0.78rem; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:var(--gold-dark); background:rgba(224,123,57,0.09); padding:7px 18px; border-radius:50px; margin-bottom:24px; border:1px solid rgba(224,123,57,0.18); }
.hero h1 { font-family:var(--heading); font-size:clamp(2.5rem,5.5vw,3.7rem); line-height:1.15; color:var(--text); margin-bottom:22px; }
.hero h1 em { color:var(--gold); font-style:normal; }
.hero-desc { font-size:1.08rem; color:var(--text2); line-height:1.84; margin-bottom:12px; max-width:460px; }
.hero-sub { font-size:0.88rem; color:var(--text3); margin-bottom:36px; max-width:430px; line-height:1.72; }
.hero-btns { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:44px; }
.hero-proof { display:flex; align-items:stretch; border:1px solid rgba(224,123,57,0.14); border-radius:18px; overflow:hidden; background:white; box-shadow:var(--shadow); }
.hero-proof-item { flex:1; padding:18px 16px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:4px; transition:background 0.2s; }
.hero-proof-item:hover { background:rgba(224,123,57,0.03); }
.hero-proof-item + .hero-proof-item { border-left:1px solid rgba(224,123,57,0.11); }
.hero-proof-num { font-family:var(--heading); font-size:1.45rem; color:var(--gold); line-height:1; }
.hero-proof-label { font-size:0.75rem; font-weight:600; color:var(--text2); line-height:1.3; }
.hero-visual { position:relative; }
.hero-img-wrap { border-radius:28px; overflow:hidden; box-shadow:var(--shadow-lg); position:relative; transition:transform 0.5s ease; }
.hero-img-wrap:hover { transform:scale(1.01); }
.hero-img-wrap::after { content:''; position:absolute; inset:0; border-radius:28px; box-shadow:inset 0 -70px 70px rgba(0,0,0,0.09); }
@media (max-width:900px) { .hero-grid{grid-template-columns:1fr;gap:44px} .hero{min-height:auto;padding-top:96px} }

.btn { display:inline-flex; align-items:center; gap:8px; padding:14px 32px; border-radius:50px; font-family:var(--body); font-weight:600; font-size:0.97rem; border:none; cursor:pointer; transition:all 0.22s; text-decoration:none; }
.btn-primary { background:var(--gold); color:white; box-shadow:0 4px 18px rgba(224,123,57,0.32); }
.btn-primary:hover { background:var(--gold-dark); transform:translateY(-2px); box-shadow:0 8px 28px rgba(224,123,57,0.44); }
.btn-outline { background:transparent; color:var(--gold); border:2px solid var(--gold); }
.btn-outline:hover { background:rgba(224,123,57,0.06); transform:translateY(-2px); }
.btn-white { background:white; color:var(--gold-dark); box-shadow:0 4px 18px rgba(0,0,0,0.12); }
.btn-white:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.18); }
.btn-ghost { background:rgba(255,255,255,0.14); color:white; border:1.5px solid rgba(255,255,255,0.38); }
.btn-ghost:hover { background:rgba(255,255,255,0.24); transform:translateY(-2px); }

.img-ph { width:100%; background:linear-gradient(135deg,#EDE8E2 0%,#E0D8CF 60%,#EDE8E2 100%); border-radius:var(--radius); display:flex; align-items:center; justify-content:center; color:var(--text3); font-size:0.85rem; font-weight:500; overflow:hidden; transition:transform 0.4s ease; }
.img-ph:hover { transform:scale(1.015); }
.img-ph-inner { display:flex; flex-direction:column; align-items:center; gap:12px; opacity:0.6; }
.img-ph-icon { font-size:2.2rem; }

.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
.grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
.grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
@media (max-width:1100px) { .grid-4{grid-template-columns:repeat(2,1fr)} }
@media (max-width:900px) { .grid-2{grid-template-columns:1fr;gap:36px} .grid-3{grid-template-columns:1fr} }
@media (max-width:600px) { .grid-4{grid-template-columns:1fr} }

.card { background:white; border-radius:var(--radius); padding:32px; box-shadow:var(--shadow); border:1px solid rgba(0,0,0,0.04); transition:transform 0.3s,box-shadow 0.3s; }
.card:hover { transform:translateY(-5px); box-shadow:var(--shadow-md); }

.feat-card { background:white; border-radius:var(--radius); padding:30px 28px 32px; box-shadow:var(--shadow); border:1px solid rgba(0,0,0,0.04); transition:transform 0.3s,box-shadow 0.3s; position:relative; overflow:hidden; }
.feat-card:hover { transform:translateY(-6px); box-shadow:var(--shadow-md); }
.feat-card h3 { font-family:var(--heading); font-size:1.12rem; margin-bottom:9px; color:var(--text); }
.feat-card p { font-size:0.92rem; color:var(--text2); line-height:1.72; }

.prog-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; align-items:stretch; }
@media (max-width:1100px) { .prog-grid{grid-template-columns:repeat(2,1fr)} }
@media (max-width:600px) { .prog-grid{grid-template-columns:1fr} }

.prog-card-full { background: white; border-radius: 22px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.32s, box-shadow 0.32s; }
.prog-card-full:hover { transform: translateY(-8px); }
.prog-card-full-body { padding: 22px 24px 24px; flex: 1; display: flex; flex-direction: column; }
.prog-card-full-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; min-height: 36px; }
.prog-card-icon-wrap { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.prog-tag { display: inline-block; padding: 3px 11px; border-radius: 50px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.02em; }
.prog-card-full-body h3 { font-family: var(--heading); font-size: 1.1rem; color: var(--text); margin-bottom: 8px; min-height: 2.2em; display: flex; align-items: flex-start; }
.prog-card-full-body .prog-desc { font-size: 0.87rem; color: var(--text2); line-height: 1.68; margin-bottom: 0; min-height: 4.2em; }
.prog-divider { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 10px 0 14px; }
.prog-bullet-list { list-style: none; display: flex; flex-direction: column; gap: 7px; padding-top: 0; }
.prog-bullet-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 0.84rem; color: var(--text2); line-height: 1.5; }
.prog-bullet-check { width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.55rem; color: white; flex-shrink: 0; margin-top: 1px; }
.prog-card-full-btn { margin-top: 20px; flex-shrink: 0; }
.prog-card-full-btn button { width: 100%; justify-content: center; padding: 11px 20px; font-size: 0.87rem; }

.prog-card-simple { background: white; border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s, box-shadow 0.3s; }
.prog-card-simple:hover { transform: translateY(-6px); }
.prog-card-simple-accent { height: 4px; flex-shrink: 0; }
.prog-card-simple-body { padding: 22px 22px 24px; flex: 1; display: flex; flex-direction: column; }
.prog-card-simple-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.prog-card-simple-body h3 { font-family: var(--heading); font-size: 1.05rem; color: var(--text); margin-bottom: 6px; }
.prog-card-simple-body .prog-summary { font-size: 0.88rem; color: var(--text2); line-height: 1.65; }

.testi-card { background:white; border-radius:var(--radius); padding:30px; box-shadow:var(--shadow); border:1px solid rgba(0,0,0,0.04); display:flex; flex-direction:column; gap:16px; transition:transform 0.3s,box-shadow 0.3s; }
.testi-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-md); }
.testi-star { width:15px; height:15px; color:var(--yellow); }
.testi-text { font-size:0.97rem; color:var(--text); line-height:1.82; font-style:italic; }
.testi-author { font-size:0.85rem; font-weight:700; color:var(--gold-dark); }

.cta-banner { background:linear-gradient(135deg,var(--gold) 0%,var(--gold-dark) 100%); border-radius:28px; padding:64px 52px; text-align:center; color:white; position:relative; overflow:hidden; }
.cta-banner h2 { font-family:var(--heading); font-size:clamp(1.7rem,3.5vw,2.3rem); margin-bottom:14px; }
.cta-banner p { font-size:1.03rem; opacity:0.88; margin-bottom:30px; max-width:460px; margin-left:auto; margin-right:auto; }
.cta-banner-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

.schedule-row { display:flex; align-items:flex-start; gap:18px; padding:14px 0; }
.schedule-row + .schedule-row { border-top:1px solid rgba(0,0,0,0.05); }
.schedule-time { font-family:var(--heading); font-size:0.85rem; color:var(--gold); min-width:110px; padding-top:3px; flex-shrink:0; }
.schedule-dot { width:10px; height:10px; border-radius:50%; background:var(--gold); margin-top:7px; flex-shrink:0; }
.schedule-content h4 { font-family:var(--heading); font-size:0.95rem; margin-bottom:2px; }
.schedule-content p { font-size:0.83rem; color:var(--text2); }

.ready-item { background:white; border-radius:18px; padding:26px 20px; text-align:center; box-shadow:var(--shadow); border:1px solid rgba(0,0,0,0.04); transition:transform 0.3s; }
.ready-item:hover { transform:translateY(-4px); }
.ready-icon-wrap { width:54px; height:54px; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 13px; }
.ready-item h4 { font-family:var(--heading); font-size:0.93rem; margin-bottom:5px; }
.ready-item p { font-size:0.8rem; color:var(--text2); line-height:1.5; }

.team-card { background:white; border-radius:var(--radius); padding:32px; text-align:center; box-shadow:var(--shadow); border:1px solid rgba(0,0,0,0.04); transition:transform 0.3s,box-shadow 0.3s; }
.team-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-md); }
.team-avatar { width:76px; height:76px; border-radius:50%; margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:1.9rem; }
.team-card h3 { font-family:var(--heading); font-size:1.05rem; margin-bottom:3px; }
.team-role { font-size:0.8rem; font-weight:700; color:var(--gold); margin-bottom:10px; }
.team-card p { font-size:0.86rem; color:var(--text2); line-height:1.6; }

.social-links { display:flex; gap:12px; flex-wrap:wrap; }
.social-btn { display:flex; align-items:center; gap:8px; padding:10px 18px; border-radius:50px; font-size:0.84rem; font-weight:600; text-decoration:none; transition:all 0.22s; border:1.5px solid; cursor:pointer; background:transparent; }
.social-btn:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(0,0,0,0.1); }

.lillio-feature { display:flex; align-items:center; gap:10px; font-size:0.92rem; color:var(--text2); padding:6px 0; }
.lillio-check { width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.65rem; color:white; flex-shrink:0; }

.goal-item { display:flex; align-items:flex-start; gap:15px; background:white; padding:20px 24px; border-radius:16px; box-shadow:var(--shadow); transition:transform 0.3s; }
.goal-item:hover { transform:translateY(-3px); }
.goal-num { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.83rem; color:white; flex-shrink:0; }
.goal-item h4 { font-family:var(--heading); font-size:0.98rem; margin-bottom:3px; }
.goal-item p { font-size:0.86rem; color:var(--text2); }

.about-story { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
@media (max-width:900px) { .about-story{grid-template-columns:1fr} }

.location-row { display:flex; align-items:flex-start; gap:14px; font-size:0.93rem; color:var(--text2); }
.location-icon { width:36px; height:36px; border-radius:10px; background:var(--gold-light); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.contact-link { color:var(--text2); text-decoration:none; transition:color 0.2s; }
.contact-link:hover { color:var(--gold); }

.footer { background:#1E1A17; color:rgba(255,255,255,0.65); padding:64px 24px 28px; }
.footer-inner { max-width:1100px; margin:0 auto; }
.footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px; }
.footer-logo { height:50px; width:auto; object-fit:contain; display:block; margin-bottom:14px; transition:opacity 0.3s; filter:brightness(1.1); border-radius:5px; }
.footer-logo:hover { opacity:0.85; }
.footer-brand p { font-size:0.87rem; line-height:1.78; max-width:265px; margin-top:10px; }
.footer h4 { color:white; font-family:var(--heading); font-size:1rem; margin-bottom:18px; }
.footer ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
.footer a { color:rgba(255,255,255,0.52); text-decoration:none; font-size:0.87rem; transition:color 0.2s; cursor:pointer; }
.footer a:hover { color:var(--peach); }
.footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding-top:22px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; font-size:0.8rem; color:rgba(255,255,255,0.32); }
@media (max-width:768px) { .footer-grid{grid-template-columns:1fr;gap:28px} }

.fade-in { opacity:0; transform:translateY(24px); transition:opacity 0.7s ease,transform 0.7s ease; }
.fade-in.visible { opacity:1; transform:translateY(0); }
`;

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, style, delay = 0 }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function ImgPh({ h = 380, label = "Photo", icon = "📸", style = {} }) {
  return (
    <div className="img-ph" style={{ height: h, ...style }}>
      <div className="img-ph-inner">
        <div className="img-ph-icon">{icon}</div>
        <span>{label}</span>
      </div>
    </div>
  );
}

function IBox({ children, bg, size = 52 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, flexShrink: 0 }}>
      {children}
    </div>
  );
}

const SvgShield = ({ color = "#E05252", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6L12 2z" fill={color} opacity="0.85"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SvgStar2 = ({ color = "#F5C842", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/>
  </svg>
);
const SvgHeart2 = ({ color = "#E05252", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/>
  </svg>
);
const SvgBook = ({ color = "#5B9FD4", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const SvgUsers = ({ color = "#6DB87A", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.9"/>
    <path d="M16 3.1a4 4 0 0 1 0 7.8"/>
  </svg>
);
const SvgPhone2 = ({ color = "#9B7FD4", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.5A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7A2 2 0 0 1 22 16.9z"/>
  </svg>
);
const SvgMapPin = ({ color = "#E07B39", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const SvgClock2 = ({ color = "#5B9FD4", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const SvgMail = ({ color = "#6DB87A", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const SvgGradCap = ({ color = "#6DB87A", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const SvgHome = ({ color = "#F5C842", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const SvgSmile = ({ color = "#E07B39", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const SvgFb = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const SvgIg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const SvgGoogle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const IconBabyHand = ({ color = "white", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/>
    <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  </svg>
);
const IconPalette = ({ color = "white", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill={color}/>
    <circle cx="17.5" cy="10.5" r=".5" fill={color}/>
    <circle cx="8.5" cy="7.5" r=".5" fill={color}/>
    <circle cx="6.5" cy="12.5" r=".5" fill={color}/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);
const IconRocket = ({ color = "white", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const IconStar3 = ({ color = "white", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/>
  </svg>
);

const DStar = ({ size=70, color, style={}, anim="float-a" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <path d="M50 5L61 35H95L68 55L79 90L50 68L21 90L32 55L5 35H39Z" fill={color}/>
  </svg>
);
const DSun = ({ size=100, color, style={}, anim="float-b" }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <circle cx="60" cy="60" r="20" fill={color}/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(
      <line key={a} x1="60" y1="60" x2={60+36*Math.cos(a*Math.PI/180)} y2={60+36*Math.sin(a*Math.PI/180)} stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
    ))}
  </svg>
);
const DMoon = ({ size=65, color, style={}, anim="float-c" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <path d="M60 10 A40 40 0 1 0 60 90 A28 28 0 1 1 60 10Z" fill={color}/>
  </svg>
);
const DCloud = ({ size=160, color, style={}, anim="float-b" }) => (
  <svg width={size} height={size*0.55} viewBox="0 0 160 88" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <ellipse cx="55" cy="56" rx="38" ry="26" fill={color}/><ellipse cx="95" cy="52" rx="34" ry="29" fill={color}/>
    <ellipse cx="42" cy="48" rx="26" ry="20" fill={color}/><ellipse cx="78" cy="38" rx="26" ry="22" fill={color}/>
    <ellipse cx="115" cy="58" rx="22" ry="18" fill={color}/>
  </svg>
);
const DHeart = ({ size=70, color, style={}, anim="float-a" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <path d="M50 85C25 63 5 48 5 28C5 14 18 4 32 4C40 4 46 9 50 15C54 9 60 4 68 4C82 4 95 14 95 28C95 48 75 63 50 85Z" fill={color}/>
  </svg>
);
const DCrayon = ({ size=28, h=110, color, style={}, anim="float-c" }) => (
  <svg width={size} height={h} viewBox="0 0 32 120" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <polygon points="5,32 16,6 27,32" fill={color}/>
    <rect x="5" y="32" width="22" height="76" rx="4" fill={color}/>
    <rect x="5" y="32" width="22" height="12" rx="2" fill="rgba(0,0,0,0.12)"/>
    <rect x="5" y="88" width="22" height="8" rx="2" fill="rgba(0,0,0,0.08)"/>
  </svg>
);
const DScribble = ({ w=160, color, style={}, anim="float-b" }) => (
  <svg width={w} height={48} viewBox="0 0 160 48" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <path d="M8 24Q26 8 44 24Q62 40 80 24Q98 8 116 24Q134 40 152 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);
const DTriangle = ({ size=55, color, style={}, anim="float-d" }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <polygon points="30,4 56,54 4,54" fill={color}/>
  </svg>
);
const DDiamond = ({ size=44, color, style={}, anim="float-a" }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <polygon points="25,2 48,25 25,48 2,25" fill={color}/>
  </svg>
);
const DDots = ({ color, style={}, anim="float-b" }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    {[0,1,2,3].map(r=>[0,1,2,3].map(c=>(
      <circle key={`${r}${c}`} cx={10+c*20} cy={10+r*20} r="3.5" fill={color}/>
    )))}
  </svg>
);
const DZigzag = ({ w=110, color, style={}, anim="float-c" }) => (
  <svg width={w} height={28} viewBox="0 0 110 28" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <polyline points="0,22 18,5 36,22 54,5 72,22 90,5 110,22" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const DCircle = ({ size=50, color, style={}, anim="float-a" }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <circle cx="25" cy="25" r="22" fill="none" stroke={color} strokeWidth="4" strokeDasharray="8 5"/>
  </svg>
);
const DSquare = ({ size=44, color, style={}, anim="float-d" }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <rect x="4" y="4" width="36" height="36" rx="8" fill={color}/>
  </svg>
);
const DLego = ({ size=56, color, style={}, anim="float-b" }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <rect x="6" y="20" width="48" height="32" rx="6" fill={color}/>
    <rect x="14" y="12" width="10" height="12" rx="5" fill={color}/>
    <rect x="36" y="12" width="10" height="12" rx="5" fill={color}/>
    <rect x="6" y="20" width="48" height="8" fill="rgba(0,0,0,0.08)"/>
  </svg>
);
const DPaintbrush = ({ size=36, h=100, color, style={}, anim="float-c" }) => (
  <svg width={size} height={h} viewBox="0 0 36 100" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <rect x="15" y="0" width="6" height="70" rx="3" fill={color}/>
    <ellipse cx="18" cy="78" rx="10" ry="14" fill={color}/>
    <ellipse cx="18" cy="88" rx="7" ry="8" fill="rgba(0,0,0,0.12)"/>
  </svg>
);
const DMarker = ({ size=28, h=90, color, style={}, anim="float-a" }) => (
  <svg width={size} height={h} viewBox="0 0 28 90" style={{position:"absolute",pointerEvents:"none",...style}} className={anim}>
    <rect x="4" y="0" width="20" height="64" rx="8" fill={color}/>
    <polygon points="4,64 14,90 24,64" fill={color}/>
    <rect x="4" y="0" width="20" height="14" rx="8" fill="rgba(0,0,0,0.12)"/>
  </svg>
);

const PROGRAMS = [
  {
    title: "Toddler Program",
    age: "18 months – 2.5 years",
    summary: "A gentle, warm introduction to group learning through sensory play, early language, and secure connections.",
    iconEl: <IconBabyHand color="white" size={16}/>,
    accentColor: "#E07B39",
    tagBg: "rgba(224,123,57,0.1)",
    glowColor: "rgba(224,123,57,0.15)",
    borderColor: "rgba(224,123,57,0.28)",
    desc: "A gentle, nurturing introduction to group learning. Focused on sensory exploration, early language, and building secure, trusting relationships.",
    image: "/images/toddler.JPG",
    items: ["Sensory play & hands-on discovery", "Early language development", "Music, movement & creative expression", "Safe, nurturing small-group environment"],
  },
  {
    title: "Preschool Program",
    age: "2.5 – 3.5 years",
    summary: "Creative, confidence-building learning that weaves early academics into engaging, purposeful activities that children love.",
    iconEl: <IconPalette color="white" size={16}/>,
    accentColor: "#5B9FD4",
    tagBg: "rgba(91,159,212,0.1)",
    glowColor: "rgba(91,159,212,0.15)",
    borderColor: "rgba(91,159,212,0.28)",
    desc: "Creative, confidence-building learning with early academic foundations woven into engaging, purposeful activities that children love.",
    image: "/images/preschool.JPG",
    items: ["Creative arts, crafts & storytelling", "Early literacy & number concepts", "Cooperative play & group activities", "Independence & self-help skill building"],
  },
  {
    title: "Pre-Kindergarten Prep",
    age: "3.5 – 4 years",
    summary: "A focused school-readiness program that builds independence, confidence, and early academic skills.",
    iconEl: <IconRocket color="white" size={16}/>,
    accentColor: "#6DBE7B",
    tagBg: "rgba(109,190,123,0.1)",
    glowColor: "rgba(109,190,123,0.15)",
    borderColor: "rgba(109,190,123,0.28)",
    desc: "A focused school-readiness program that builds independence, confidence, and all the academic and social skills needed for a smooth kindergarten transition.",
    image: "/images/outdoor2.JPG",
    items: ["Reading readiness & early phonics", "Math concepts & logical reasoning", "Critical thinking & problem solving", "Kindergarten transition preparation"],
  },
  {
    title: "School Age Program",
    age: "4 – 7 years",
    summary: "An enriching, structured program nurturing academic growth, creativity, and social confidence in school-age children.",
    iconEl: <IconStar3 color="white" size={16}/>,
    accentColor: "#9B7FD4",
    tagBg: "rgba(155,127,212,0.1)",
    glowColor: "rgba(155,127,212,0.15)",
    borderColor: "rgba(155,127,212,0.28)",
    desc: "An enriching, structured program for school-age children that nurtures academic growth, creativity, and social confidence in a warm, supportive setting.",
    image: "/images/outdoor3.JPG",
    items: ["Academic enrichment & guided projects", "STEM exploration & discovery", "Leadership, teamwork & resilience", "Seamless after-school continuity"],
  },
];

function ProgDivider({ prog }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, margin: "10px 0 14px", opacity: 0.55 }}>
      <div style={{ height: 1, flex: 1, background: prog.glowColor, maxWidth: 36 }}/>
      <span style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: prog.tagBg, color: prog.accentColor, fontSize: "0.72rem" }}>✦</span>
      <div style={{ height: 1, flex: 1, background: prog.glowColor, maxWidth: 36 }}/>
    </div>
  );
}

function ProgCardFull({ prog, delay = 0 }) {
  return (
    <FadeIn delay={delay}>
      <div className="prog-card-full" style={{ border: `1.5px solid ${prog.borderColor}`, boxShadow: `0 4px 28px ${prog.glowColor}`, height: "100%" }}>
        <div style={{ height: 5, background: prog.accentColor, flexShrink: 0 }}/>
        {prog.image ? (
          <img src={prog.image} alt={prog.title} style={{ width: "100%", height: "155px", objectFit: "cover", display: "block" }}/>
        ) : (
          <ImgPh h={155} label={prog.title} icon={prog.title[0]} style={{ borderRadius: 0 }}/>
        )}
        <div className="prog-card-full-body">
          <div className="prog-card-full-header">
            <span className="prog-card-icon-wrap" style={{ background: prog.accentColor }}>{prog.iconEl}</span>
            <span className="prog-tag" style={{ background: prog.tagBg, color: prog.accentColor }}>{prog.age}</span>
          </div>
          <h3>{prog.title}</h3>
          <p className="prog-desc">{prog.desc}</p>
          <ProgDivider prog={prog}/>
          <ul className="prog-bullet-list">
            {prog.items.map((item, j) => (
              <li key={j}>
                <span className="prog-bullet-check" style={{ background: prog.accentColor }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="prog-card-full-btn">
            <button className="btn btn-primary" onClick={openForm}>Register Now</button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ProgCardSimple({ prog, delay = 0 }) {
  return (
    <FadeIn delay={delay}>
      <div className="prog-card-simple" style={{ border: `1.5px solid ${prog.borderColor}`, boxShadow: `0 4px 20px ${prog.glowColor}`, height: "100%" }}>
        <div className="prog-card-simple-accent" style={{ background: prog.accentColor }}/>
        <div className="prog-card-simple-body">
          <div className="prog-card-simple-header">
            <span className="prog-card-icon-wrap" style={{ background: prog.accentColor }}>{prog.iconEl}</span>
            <span className="prog-tag" style={{ background: prog.tagBg, color: prog.accentColor }}>{prog.age}</span>
          </div>
          <h3>{prog.title}</h3>
          <p className="prog-summary">{prog.summary}</p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── HEADER ─── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const page = location.pathname;

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <img src={LOGO_PATH} alt="Lifelong Learning Centre" className="header-logo" onClick={() => go("/")}/>
        <ul className="nav-links">
          <li><a onClick={() => go("/")} style={{ color: page === "/" ? "var(--gold)" : undefined }}>Home</a></li>
          <li><a onClick={() => go("/about")} style={{ color: page === "/about" ? "var(--gold)" : undefined }}>About</a></li>
          <li><a onClick={() => go("/programs")} style={{ color: page === "/programs" ? "var(--gold)" : undefined }}>Programs</a></li>
          <li><button className="nav-cta" onClick={openForm}>Register Now</button></li>
        </ul>
        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a onClick={() => go("/")}>Home</a>
        <a onClick={() => go("/about")}>About</a>
        <a onClick={() => go("/programs")}>Programs</a>
        <a onClick={openForm} style={{ color: "var(--gold)", fontWeight: 700 }}>Register Now →</a>
      </div>
    </header>
  );
}

/* ─── HOME PAGE ─── */
function HomePage() {
  const navigate = useNavigate();
  const goPrograms = () => { navigate("/programs"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goAbout = () => { navigate("/about"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <section className="hero section">
        <DSun size={140} color="rgba(245,200,66,0.12)" style={{ top:"6%", right:"3%", zIndex:0 }} anim="float-b"/>
        <DCloud size={220} color="rgba(91,159,212,0.08)" style={{ top:"2%", left:"8%", zIndex:0 }} anim="float-c"/>
        <DCloud size={140} color="rgba(109,184,122,0.07)" style={{ bottom:"8%", left:"2%", zIndex:0 }} anim="float-b"/>
        <DStar size={65} color="rgba(224,123,57,0.09)" style={{ bottom:"20%", left:"3%", zIndex:0 }} anim="float-a"/>
        <DStar size={45} color="rgba(245,200,66,0.1)" style={{ top:"18%", right:"14%", zIndex:0 }} anim="float-d"/>
        <DHeart size={48} color="rgba(224,82,82,0.08)" style={{ top:"28%", right:"10%", zIndex:0 }} anim="float-a"/>
        <DCrayon size={26} h={90} color="rgba(109,184,122,0.11)" style={{ bottom:"12%", right:"7%", transform:"rotate(18deg)", zIndex:0 }} anim="float-c"/>
        <DDots color="rgba(224,123,57,0.09)" style={{ bottom:"6%", left:"10%", zIndex:0 }} anim="float-b"/>
        <DMoon size={55} color="rgba(245,200,66,0.1)" style={{ top:"8%", left:"38%", zIndex:0 }} anim="float-d"/>
        <DCircle size={60} color="rgba(91,159,212,0.1)" style={{ bottom:"22%", right:"3%", zIndex:0 }} anim="float-a"/>
        <div className="section-inner" style={{ position:"relative", zIndex:1 }}>
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow">✦ Serving Families Across Durham Region · Est. 2009</div>
              <h1>A Warm Start for<br/><em>Curious Minds</em></h1>
              <p className="hero-desc">Lifelong Learning Centre is a locally owned, family-run childcare serving families across Durham Region. Our certified educators help children build confidence, curiosity, and a genuine love of learning.</p>
              <p className="hero-sub">Licensed by the Ministry of Education · Ages 18 months – 7 years · Located in Whitby, Ontario</p>
              <div className="hero-btns">
                <button className="btn btn-primary" onClick={openForm}>Book a Tour</button>
                <button className="btn btn-outline" onClick={goAbout}>Learn More</button>
              </div>
              <div className="hero-proof">
                <div className="hero-proof-item">
                  <div className="hero-proof-num">40+</div>
                  <div className="hero-proof-label">Years Experience</div>
                </div>
                <div className="hero-proof-item">
                  <div className="hero-proof-num">✓</div>
                  <div className="hero-proof-label">School-Ready Learning</div>
                </div>
                <div className="hero-proof-item">
                  <div className="hero-proof-num">🏡</div>
                  <div className="hero-proof-label">Family Operated</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-img-wrap">
                <img src="/images/hero.JPG" alt="Children learning together" style={{ width:"100%", height:"470px", objectFit:"cover", display:"block" }}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DStar size={80} color="rgba(224,82,82,0.07)" style={{ top:"5%", right:"3%" }} anim="float-d"/>
        <DCloud size={180} color="rgba(91,159,212,0.06)" style={{ bottom:"4%", left:"1%" }} anim="float-b"/>
        <DZigzag w={120} color="rgba(245,200,66,0.13)" style={{ top:"10%", left:"4%" }} anim="float-c"/>
        <DDots color="rgba(109,184,122,0.09)" style={{ bottom:"8%", right:"4%" }} anim="float-a"/>
        <DMoon size={50} color="rgba(245,200,66,0.09)" style={{ top:"15%", right:"20%" }} anim="float-a"/>
        <DSquare size={36} color="rgba(224,123,57,0.07)" style={{ bottom:"15%", left:"6%" }} anim="float-d"/>
        <div className="section-inner">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Why Families Choose Us</div>
              <h2 className="section-title">Childcare Families Trust</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Families across Durham Region have trusted us with their children. Here's what makes us different.</p>
            </div>
          </FadeIn>
          <div className="grid-3">
            {[
              { icon:<SvgShield color="#E05252" size={22}/>, title:"Licensed & Inspected", desc:"Fully licensed by the Ministry of Education. Inspected regularly so you always know your child is in safe hands.", bar:"#E05252", bg:"rgba(224,82,82,0.09)" },
              { icon:<SvgGradCap color="#5B9FD4" size={22}/>, title:"Certified Educators", desc:"Every educator is certified and brings genuine warmth and expertise to every interaction with your child.", bar:"#5B9FD4", bg:"rgba(91,159,212,0.09)" },
              { icon:<SvgHome color="#F5C842" size={22}/>, title:"Family Operated", desc:"Family roots in Durham Region since 1989 — established in 2009 and proudly serving the community ever since.", bar:"#F5C842", bg:"rgba(245,200,66,0.11)" },
              { icon:<SvgSmile color="#E07B39" size={22}/>, title:"Daily Updates via Lillio", desc:"Photos, reports, and notes sent straight to your phone throughout the day so you're always in the loop.", bar:"#6DB87A", bg:"rgba(109,184,122,0.09)" },
              { icon:<SvgHeart2 color="#E07B39" size={22}/>, title:"Confidence-Building Learning", desc:"Hands-on, structured activities that spark curiosity and build life-ready skills from the very first day.", bar:"#E07B39", bg:"rgba(224,123,57,0.09)" },
              { icon:<SvgStar2 color="#F5C842" size={22}/>, title:"School Readiness Focus", desc:"Social skills, literacy, numeracy, and independence — everything needed for a confident start to kindergarten.", bar:"#E05252", bg:"rgba(224,82,82,0.08)" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="feat-card">
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:c.bar, borderRadius:"3px 3px 0 0" }}/>
                  <IBox bg={c.bg}>{c.icon}</IBox>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DMoon size={75} color="rgba(245,200,66,0.11)" style={{ top:"8%", right:"5%" }} anim="float-c"/>
        <DScribble w={160} color="rgba(224,123,57,0.09)" style={{ bottom:"10%", left:"2%" }} anim="float-b"/>
        <DTriangle size={52} color="rgba(91,159,212,0.08)" style={{ bottom:"5%", right:"7%" }} anim="float-d"/>
        <DHeart size={42} color="rgba(224,82,82,0.07)" style={{ top:"16%", left:"4%" }} anim="float-a"/>
        <DDiamond size={38} color="rgba(109,184,122,0.08)" style={{ top:"40%", right:"2%" }} anim="float-b"/>
        <div className="section-inner">
          <div className="grid-2">
            <FadeIn>
              <img src="/images/learning.JPG" alt="Children learning in classroom" style={{ width:"100%", height:"420px", borderRadius:"24px", objectFit:"cover" }}/>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="section-label">Our Philosophy</div>
              <h2 className="section-title">Structured, Joyful Learning Every Day</h2>
              <p className="section-sub" style={{ marginBottom:18 }}>We believe children thrive when they feel safe, seen, and genuinely curious. Our approach blends structured activities with hands-on discovery — building skills through experience, not just instruction.</p>
              <p className="section-sub" style={{ marginBottom:30 }}>Established in 2009, our experienced team serves families across Durham Region from our centre in Whitby — bringing deep knowledge and genuine care to every child, every day.</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button className="btn btn-primary" onClick={goPrograms}>Explore Our Programs →</button>
                <button className="btn btn-outline" onClick={goAbout}>About Us</button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DCrayon size={24} h={88} color="rgba(224,82,82,0.09)" style={{ bottom:"6%", left:"2%", transform:"rotate(-14deg)" }} anim="float-a"/>
        <DDots color="rgba(91,159,212,0.08)" style={{ top:"7%", left:"4%" }} anim="float-c"/>
        <DLego size={52} color="rgba(245,200,66,0.1)" style={{ top:"4%", right:"4%" }} anim="float-b"/>
        <DMarker size={24} h={80} color="rgba(155,127,212,0.1)" style={{ bottom:"8%", right:"4%", transform:"rotate(15deg)" }} anim="float-d"/>
        <DPaintbrush size={28} h={88} color="rgba(109,184,122,0.1)" style={{ top:"15%", right:"10%", transform:"rotate(-10deg)" }} anim="float-c"/>
        <div className="section-inner">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Our Programs</div>
              <h2 className="section-title">Every Stage, Every Child</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Four age-tailored programs for children 18 months to 7 years, each designed to meet your child exactly where they are.</p>
            </div>
          </FadeIn>
          <div className="prog-grid">
            {PROGRAMS.map((p, i) => <ProgCardSimple key={i} prog={p} delay={i * 0.1}/>)}
          </div>
          <FadeIn delay={0.45}>
            <div style={{ textAlign:"center", marginTop:36 }}>
              <button className="btn btn-outline" onClick={goPrograms}>View All Programs →</button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DCloud size={200} color="rgba(91,159,212,0.07)" style={{ top:"4%", right:"1%" }} anim="float-b"/>
        <DHeart size={48} color="rgba(224,82,82,0.07)" style={{ bottom:"8%", left:"4%" }} anim="float-a"/>
        <DScribble w={110} color="rgba(245,200,66,0.1)" style={{ top:"14%", left:"2%" }} anim="float-c"/>
        <DDiamond size={36} color="rgba(109,184,122,0.08)" style={{ bottom:"20%", right:"6%" }} anim="float-d"/>
        <div className="section-inner">
          <div className="grid-2">
            <FadeIn>
              <div className="section-label">Parent Communication</div>
              <h2 className="section-title">Stay Connected All Day with Lillio</h2>
              <p className="section-sub" style={{ marginBottom:24 }}>Spending the day apart is tough. That's why we use Lillio — a parent communication app that keeps you connected throughout the day without interrupting your work.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:2, marginBottom:28 }}>
                {["Daily photos & short videos","Activity & learning reports","Meal, nap & mood updates","Direct messaging with educators","Milestone tracking & notes"].map((f, i) => (
                  <div className="lillio-feature" key={i}>
                    <span className="lillio-check" style={{ background: i % 2 === 0 ? "var(--blue)" : "var(--green)" }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={openForm}>Book a Tour to See Lillio in Action</button>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/images/lillio.PNG" alt="Lillio parent communication app" style={{ width:"100%", height:"400px", borderRadius:"24px", objectFit:"contain", background:"white" }}/>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DSun size={96} color="rgba(245,200,66,0.1)" style={{ top:"5%", left:"3%" }} anim="float-b"/>
        <DDiamond size={42} color="rgba(91,159,212,0.09)" style={{ bottom:"10%", right:"5%" }} anim="float-a"/>
        <DTriangle size={48} color="rgba(224,123,57,0.07)" style={{ top:"20%", right:"3%" }} anim="float-d"/>
        <DSquare size={34} color="rgba(155,127,212,0.08)" style={{ bottom:"20%", left:"6%" }} anim="float-c"/>
        <div className="section-inner">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <div className="section-label" style={{ justifyContent:"center" }}>School Readiness</div>
              <h2 className="section-title">Confident, Capable Kindergarteners</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Everything we do prepares children for a smooth, joyful transition to school.</p>
            </div>
          </FadeIn>
          <div className="grid-4">
            {[
              { icon:<SvgBook color="#E05252" size={22}/>, title:"Language & Literacy", desc:"Letters, sounds, early reading foundations", color:"rgba(224,82,82,0.11)" },
              { icon:<SvgStar2 color="#5B9FD4" size={22}/>, title:"Math & Reasoning", desc:"Numbers, patterns, shapes & logic", color:"rgba(91,159,212,0.11)" },
              { icon:<SvgUsers color="#6DB87A" size={22}/>, title:"Social Skills", desc:"Sharing, cooperating, building friendships", color:"rgba(109,184,122,0.11)" },
              { icon:<SvgHeart2 color="#D4AA00" size={22}/>, title:"Independence", desc:"Self-care, routines, personal responsibility", color:"rgba(245,200,66,0.14)" },
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
        <DMoon size={72} color="rgba(245,200,66,0.1)" style={{ top:"4%", right:"4%" }} anim="float-c"/>
        <DScribble w={140} color="rgba(109,184,122,0.09)" style={{ bottom:"5%", left:"2%" }} anim="float-b"/>
        <DCrayon size={24} h={84} color="rgba(245,200,66,0.12)" style={{ top:"10%", left:"2%", transform:"rotate(8deg)" }} anim="float-a"/>
        <DDots color="rgba(91,159,212,0.08)" style={{ bottom:"15%", right:"3%" }} anim="float-d"/>
        <div className="section-inner">
          <div className="grid-2">
            <FadeIn>
              <div className="section-label">A Typical Day</div>
              <h2 className="section-title">Every Hour Counts</h2>
              <p className="section-sub" style={{ marginBottom:28 }}>A balanced rhythm of learning, play, nourishment, and creativity — structured to help every child thrive.</p>
              {[
                { time:"7:30 – 9:00", title:"Early Care & Welcome", desc:"Warm arrivals, free choice activities, settling in" },
                { time:"9:00 – 9:20", title:"Circle Time", desc:"Songs, stories, calendar, and group sharing" },
                { time:"9:20 – 9:35", title:"Snack Time", desc:"Nutritious morning snack and social connection" },
                { time:"9:35 – 10:35", title:"Structured Learning & Activities", desc:"Educator-led activities and hands-on discovery" },
                { time:"10:35 – 11:35", title:"Outdoor Play", desc:"Fresh air, movement, and nature exploration" },
                { time:"11:35 – 12:05", title:"Lunch Time", desc:"Nutritious meal, conversation, and connection" },
                { time:"12:05 – 2:05", title:"Rest & Quiet Time", desc:"Naps for younger children, quiet reading for older" },
                { time:"2:15 – 2:30", title:"Afternoon Snack", desc:"Healthy snack and afternoon reset" },
                { time:"2:30 – 3:30", title:"Creative & Group Activities", desc:"Art, music, dramatic play, and free exploration" },
                { time:"3:30 – 4:30", title:"Outdoor Play", desc:"Second outdoor session for movement and fresh air" },
                { time:"4:30 – 5:30", title:"Aftercare & Pickup", desc:"Wind-down activities, snack, and parent pickup" },
              ].map((s, i) => (
                <div className="schedule-row" key={i}>
                  <div className="schedule-time">{s.time}</div>
                  <div className="schedule-dot"/>
                  <div className="schedule-content">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/images/daily.JPG" alt="Children participating in daily activities" style={{ width:"100%", height:"560px", borderRadius:"24px", objectFit:"cover", display:"block" }}/>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DStar size={76} color="rgba(245,200,66,0.09)" style={{ top:"7%", right:"3%" }} anim="float-d"/>
        <DScribble w={130} color="rgba(224,82,82,0.07)" style={{ bottom:"6%", left:"2%" }} anim="float-a"/>
        <DDots color="rgba(91,159,212,0.08)" style={{ top:"5%", left:"5%" }} anim="float-b"/>
        <DHeart size={44} color="rgba(224,82,82,0.07)" style={{ bottom:"12%", right:"5%" }} anim="float-c"/>
        <DHeart size={30} color="rgba(224,82,82,0.06)" style={{ top:"30%", left:"2%" }} anim="float-a"/>
        <div className="section-inner">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Parent Stories</div>
              <h2 className="section-title">What Parents Are Saying</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Real words from real families across Durham Region who trust us every day.</p>
            </div>
          </FadeIn>
          <div className="grid-3">
            {[
              { quote:"From the moment we walked through the door, we felt it was the right place. The warmth and care our daughter receives every day gives us such peace of mind.", name:"Sarah M.", role:"Parent of a 3-year-old" },
              { quote:"The Lillio updates truly make my day. Seeing photos of my son learning and laughing — he's grown in confidence so much since joining. We couldn't be happier.", name:"David R.", role:"Parent of a 2.5-year-old" },
              { quote:"As a first-time mom, leaving my child was terrifying. The educators at Lifelong made the transition so gentle and caring. It honestly feels like an extension of home.", name:"Priya K.", role:"Parent of a 2-year-old" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="testi-card">
                  <div style={{ display:"flex", gap:3 }}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="testi-star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="testi-text">"{t.quote}"</p>
                  <div>
                    <div className="testi-author">{t.name}</div>
                    <div style={{ fontSize:"0.78rem", color:"var(--text3)", marginTop:2 }}>{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop:44, textAlign:"center" }}>
              <div style={{ marginBottom:16, fontSize:"0.88rem", color:"var(--text2)", fontWeight:500 }}>Find us and leave a review</div>
              <div className="social-links" style={{ justifyContent:"center" }}>
                <a className="social-btn" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#1877F2", borderColor:"#1877F2" }}><SvgFb/> Facebook</a>
                <a className="social-btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#E1306C", borderColor:"#E1306C" }}><SvgIg/> Instagram</a>
                <a className="social-btn" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#333", borderColor:"#777" }}><SvgGoogle/> Google Reviews</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DCloud size={180} color="rgba(91,159,212,0.07)" style={{ top:"3%", right:"1%" }} anim="float-b"/>
        <DCrayon size={22} h={78} color="rgba(109,184,122,0.11)" style={{ bottom:"5%", left:"3%", transform:"rotate(-16deg)" }} anim="float-c"/>
        <DZigzag w={100} color="rgba(224,123,57,0.08)" style={{ top:"20%", left:"3%" }} anim="float-a"/>
        <div className="section-inner">
          <div className="grid-2">
            <FadeIn>
              <div className="section-label">Visit & Contact</div>
              <h2 className="section-title">Serving Durham Region from Whitby</h2>
              <p className="section-sub" style={{ marginBottom:28 }}>Established in 2009, we've been a trusted childcare choice for families across Durham Region. Our centre is easily accessible from throughout the region.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:32 }}>
                {[
                  { icon:<SvgMapPin color="var(--gold)"/>, content:<a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="contact-link">1830 Rossland Rd E, Whitby, ON L1N 3P2</a> },
                  { icon:<SvgClock2 color="var(--blue)"/>, content:<span>Monday – Friday · 7:30 AM – 5:30 PM</span> },
                  { icon:<SvgPhone2 color="var(--purple)"/>, content:<a href={PHONE} className="contact-link">905 240 5433</a> },
                  { icon:<SvgMail color="var(--green)"/>, content:<a href={EMAIL} className="contact-link">info@lifelonglearningcentre.com</a> },
                  { icon:<SvgUsers color="var(--red)"/>, content:<span>Ages 18 months – 7 years</span> },
                ].map((row, i) => (
                  <div className="location-row" key={i}>
                    <div className="location-icon">{row.icon}</div>
                    <span>{row.content}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                <button className="btn btn-primary" onClick={openForm}>Register Now</button>
                <a href={PHONE} className="btn btn-outline" style={{ textDecoration:"none" }}>Call Us</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/images/centre.jpeg" alt="Daycare exterior or location" style={{ width:"100%", height:"320px", borderRadius:"24px", objectFit:"cover", display:"block" }}/>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <FadeIn>
            <div className="cta-banner">
              <DStar size={88} color="rgba(255,255,255,0.07)" style={{ top:-18, left:"3%" }}/>
              <DHeart size={56} color="rgba(255,255,255,0.06)" style={{ bottom:-8, right:"5%" }}/>
              <DCloud size={160} color="rgba(255,255,255,0.05)" style={{ top:-8, right:"14%" }}/>
              <div style={{ position:"relative", zIndex:1 }}>
                <h2>Spots Are Limited — Don't Wait</h2>
                <p>Book a tour today and see why families across Durham Region trust Lifelong Learning Centre with their most important people.</p>
                <div className="cta-banner-btns">
                  <button className="btn btn-white" onClick={openForm}>Register Now</button>
                  <a href={PHONE} className="btn btn-ghost" style={{ textDecoration:"none" }}>Call Us</a>
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
  const goPrograms = () => { navigate("/programs"); window.scrollTo({ top:0, behavior:"smooth" }); };

  return (
    <>
      <section className="hero section" style={{ minHeight:"60vh", background:"linear-gradient(160deg,#FFF9F5 0%,#FDFBF8 60%,#F0F7FF 100%)" }}>
        <DSun size={115} color="rgba(245,200,66,0.1)" style={{ top:"8%", right:"5%" }} anim="float-b"/>
        <DCloud size={180} color="rgba(91,159,212,0.07)" style={{ bottom:"5%", left:"2%" }} anim="float-c"/>
        <DStar size={60} color="rgba(224,123,57,0.08)" style={{ top:"20%", left:"5%" }} anim="float-a"/>
        <DHeart size={44} color="rgba(224,82,82,0.07)" style={{ bottom:"15%", right:"8%" }} anim="float-d"/>
        <div className="section-inner" style={{ textAlign:"center", paddingTop:48, position:"relative", zIndex:1 }}>
          <FadeIn>
            <div className="section-label" style={{ justifyContent:"center" }}>Our Story</div>
            <h1 style={{ fontFamily:"var(--heading)", fontSize:"clamp(2.1rem,5vw,3.2rem)", maxWidth:660, margin:"0 auto 20px" }}>
              Built on Community, Driven by <span style={{ color:"var(--gold)" }}>Care</span>
            </h1>
            <p style={{ fontSize:"1.06rem", color:"var(--text2)", maxWidth:530, margin:"0 auto", lineHeight:1.84 }}>
              We're not a chain. We're a locally owned, family-run childcare centre — established in 2009, proudly serving families across Durham Region from our centre in Whitby.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DHeart size={52} color="rgba(224,82,82,0.07)" style={{ top:"8%", right:"4%" }} anim="float-a"/>
        <DScribble w={130} color="rgba(224,123,57,0.09)" style={{ bottom:"6%", left:"2%" }} anim="float-b"/>
        <DSquare size={32} color="rgba(109,184,122,0.08)" style={{ top:"30%", left:"3%" }} anim="float-d"/>
        <div className="section-inner">
          <div className="about-story">
            <FadeIn>
              <img src="/images/warm.jpg" alt="Family and child connection" style={{ width:"100%", height:"420px", borderRadius:"24px", objectFit:"cover", display:"block" }}/>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="section-label">Established 2009</div>
              <h2 className="section-title">Community Roots. A Vision for Children.</h2>
              <p className="section-sub" style={{ marginBottom:16 }}>Lifelong Learning Centre was founded in 2009 with one simple belief: every child deserves a warm, nurturing place to grow. Our family's roots in Durham Region go back to 1989 — this community has been home for a long time.</p>
              <p className="section-sub" style={{ marginBottom:24 }}>From our centre in Whitby, we serve families across Durham Region who want more than just childcare — a place where children feel safe, parents feel confident, and learning happens naturally every day.</p>
              <button className="btn btn-primary" onClick={goPrograms}>See Our Programs →</button>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DMoon size={72} color="rgba(245,200,66,0.1)" style={{ top:"6%", right:"5%" }} anim="float-c"/>
        <DTriangle size={46} color="rgba(91,159,212,0.08)" style={{ bottom:"8%", left:"3%" }} anim="float-d"/>
        <DDots color="rgba(224,123,57,0.08)" style={{ top:"10%", left:"5%" }} anim="float-a"/>
        <DLego size={48} color="rgba(224,82,82,0.08)" style={{ bottom:"14%", right:"5%" }} anim="float-b"/>
        <div className="section-inner">
          <div className="about-story">
            <FadeIn>
              <div className="section-label">Our Approach</div>
              <h2 className="section-title">How We Support Every Child</h2>
              <p className="section-sub" style={{ marginBottom:16 }}>We follow a structured, confidence-building approach to early learning — blending educator-led activities with hands-on discovery that children lead themselves.</p>
              <p className="section-sub" style={{ marginBottom:24 }}>Every certified educator on our team brings professional training and a genuine passion for early childhood development. We don't just care for children — we invest in them.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                {["Structured daily routines that build confidence","Age-appropriate, engaging activities","Strong parent communication & partnership","Individualized attention for every child"].map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:"0.93rem", color:"var(--text2)" }}>
                    <span style={{ color:"var(--gold)", fontWeight:700, marginTop:1 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/images/creative.JPG" alt="Children learning with educator" style={{ width:"100%", height:"420px", borderRadius:"24px", objectFit:"cover", display:"block" }}/>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DStar size={76} color="rgba(224,82,82,0.07)" style={{ top:"5%", right:"3%" }} anim="float-d"/>
        <DCloud size={160} color="rgba(91,159,212,0.06)" style={{ bottom:"4%", left:"1%" }} anim="float-b"/>
        <div className="section-inner">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Our Spaces</div>
              <h2 className="section-title">A Place Children Love to Be</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Bright, safe, and thoughtfully designed for curious minds.</p>
            </div>
          </FadeIn>
          <div className="grid-3">
            {[
              { label:"Bright Classrooms", desc:"Natural light, organized learning stations, age-appropriate materials.", image:"/images/care.JPG" },
              { label:"Outdoor Play Areas", desc:"Safe, fully enclosed spaces for running, climbing, and exploring.", image:"/images/outdoor1.JPG" },
              { label:"Creative Spaces", desc:"Dedicated areas for art, music, dramatic play, and hands-on projects.", image:"/images/daily2.JPG" },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card" style={{ padding:0, overflow:"hidden" }}>
                  {c.image ? (
                    <img src={c.image} alt={c.label} style={{ width:"100%", height:"180px", objectFit:"cover", display:"block" }}/>
                  ) : (
                    <ImgPh h={180} label={c.label} style={{ borderRadius:0 }}/>
                  )}
                  <div style={{ padding:"22px 26px" }}>
                    <h3 style={{ fontFamily:"var(--heading)", marginBottom:7, fontSize:"1.1rem" }}>{c.label}</h3>
                    <p style={{ fontSize:"0.88rem", color:"var(--text2)", lineHeight:1.68 }}>{c.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DCrayon size={24} h={84} color="rgba(224,123,57,0.1)" style={{ top:"8%", right:"5%", transform:"rotate(10deg)" }} anim="float-b"/>
        <DScribble w={110} color="rgba(109,184,122,0.09)" style={{ bottom:"8%", left:"3%" }} anim="float-c"/>
        <div className="section-inner">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Our Educators</div>
              <h2 className="section-title">A Team Built on Experience & Heart</h2>
            </div>
          </FadeIn>
          <div className="grid-3">
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
              <DStar size={78} color="rgba(255,255,255,0.07)" style={{ top:-14, left:"4%" }}/>
              <DHeart size={52} color="rgba(255,255,255,0.06)" style={{ bottom:-8, right:"6%" }}/>
              <h2>Come See Our Centre for Yourself</h2>
              <p>We'd love to show you around, introduce our team, and answer every question you have.</p>
              <div className="cta-banner-btns">
                <button className="btn btn-white" onClick={openForm}>Register Now</button>
                <a href={PHONE} className="btn btn-ghost" style={{ textDecoration:"none" }}>Call Us</a>
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
  return (
    <>
      <section className="hero section" style={{ minHeight:"60vh", background:"linear-gradient(160deg,#FFF9F5 0%,#FDFBF8 60%,#F0FFF4 100%)" }}>
        <DCloud size={180} color="rgba(109,184,122,0.09)" style={{ top:"6%", left:"3%" }} anim="float-c"/>
        <DStar size={66} color="rgba(224,123,57,0.08)" style={{ top:"15%", right:"5%" }} anim="float-a"/>
        <DCrayon size={26} h={94} color="rgba(224,82,82,0.09)" style={{ bottom:"8%", right:"7%", transform:"rotate(18deg)" }} anim="float-b"/>
        <DLego size={50} color="rgba(155,127,212,0.09)" style={{ top:"8%", right:"22%" }} anim="float-d"/>
        <DMarker size={22} h={75} color="rgba(245,200,66,0.1)" style={{ bottom:"16%", left:"5%", transform:"rotate(-8deg)" }} anim="float-a"/>
        <div className="section-inner" style={{ textAlign:"center", paddingTop:48, position:"relative", zIndex:1 }}>
          <FadeIn>
            <div className="section-label" style={{ justifyContent:"center" }}>Our Programs</div>
            <h1 style={{ fontFamily:"var(--heading)", fontSize:"clamp(2.1rem,5vw,3.2rem)", maxWidth:660, margin:"0 auto 20px" }}>
              Tailored for Every <span style={{ color:"var(--gold)" }}>Stage of Growth</span>
            </h1>
            <p style={{ fontSize:"1.06rem", color:"var(--text2)", maxWidth:530, margin:"0 auto", lineHeight:1.84 }}>
              Four age-specific programs for children 18 months to 7 years — each designed to meet your child's natural developmental stage with confidence-building learning and genuine care.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <DSun size={104} color="rgba(245,200,66,0.1)" style={{ top:"4%", right:"4%" }} anim="float-b"/>
        <DHeart size={46} color="rgba(224,82,82,0.07)" style={{ bottom:"5%", left:"3%" }} anim="float-a"/>
        <DDots color="rgba(91,159,212,0.08)" style={{ top:"8%", left:"4%" }} anim="float-c"/>
        <DPaintbrush size={26} h={82} color="rgba(155,127,212,0.09)" style={{ top:"12%", left:"12%", transform:"rotate(-12deg)" }} anim="float-d"/>
        <DMarker size={22} h={72} color="rgba(109,184,122,0.09)" style={{ bottom:"12%", right:"4%", transform:"rotate(10deg)" }} anim="float-b"/>
        <div className="section-inner">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="section-label" style={{ justifyContent:"center" }}>Age-Appropriate Programs</div>
              <h2 className="section-title">Choose the Right Fit</h2>
              <p className="section-sub" style={{ margin:"0 auto" }}>Each program is built around the unique needs, milestones, and energy of your child's age group.</p>
            </div>
          </FadeIn>
          <div className="prog-grid">
            {PROGRAMS.map((p, i) => <ProgCardFull key={i} prog={p} delay={i * 0.1}/>)}
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg3)" }}>
        <DMoon size={68} color="rgba(245,200,66,0.1)" style={{ top:"7%", right:"4%" }} anim="float-c"/>
        <DScribble w={120} color="rgba(224,123,57,0.08)" style={{ bottom:"6%", left:"3%" }} anim="float-b"/>
        <DDots color="rgba(155,127,212,0.08)" style={{ top:"20%", left:"4%" }} anim="float-a"/>
        <div className="section-inner">
          <div className="grid-2">
            <FadeIn>
              <img src="/images/social.JPG" alt="Educators interacting with children" style={{ width:"100%", height:"400px", borderRadius:"24px", objectFit:"cover" }}/>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="section-label">Our Goals</div>
              <h2 className="section-title">What We're Building Together</h2>
              <p className="section-sub" style={{ marginBottom:8 }}>Beyond letters and numbers, we're building confident, resilient, joyful children ready for the world.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:13, marginTop:20 }}>
                {[
                  { title:"Confidence & Independence", desc:"Encouraging children to try, persist, and believe in themselves.", color:"#E05252" },
                  { title:"A Genuine Love of Learning", desc:"Making every day feel like a new and exciting opportunity.", color:"#5B9FD4" },
                  { title:"Social & Emotional Growth", desc:"Teaching empathy, communication, and healthy self-expression.", color:"#6DB87A" },
                  { title:"True School Readiness", desc:"Sending children to kindergarten prepared, excited, and confident.", color:"#E07B39" },
                ].map((g, i) => (
                  <div className="goal-item" key={i}>
                    <div className="goal-num" style={{ background:g.color }}>{i+1}</div>
                    <div>
                      <h4>{g.title}</h4>
                      <p>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background:"var(--bg2)" }}>
        <div className="section-inner">
          <FadeIn>
            <div className="cta-banner">
              <DCloud size={155} color="rgba(255,255,255,0.05)" style={{ top:-6, right:"5%" }}/>
              <DHeart size={52} color="rgba(255,255,255,0.06)" style={{ bottom:-8, left:"4%" }}/>
              <h2>Find the Right Program for Your Child</h2>
              <p>Book a tour to visit our classrooms, meet our educators, and see which program is the perfect fit.</p>
              <div className="cta-banner-btns">
                <button className="btn btn-white" onClick={openForm}>Register Now</button>
                <a href={PHONE} className="btn btn-ghost" style={{ textDecoration:"none" }}>Call Us</a>
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
  const go = (path) => { navigate(path); window.scrollTo({ top:0, behavior:"smooth" }); };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={LOGO_PATH} alt="Lifelong Learning Centre" className="footer-logo"/>
            <p>A locally owned and operated, licensed childcare centre established in 2009. Serving families across Durham Region from our centre in Whitby, Ontario — with family roots in this community since 1989.</p>
            <div className="social-links" style={{ marginTop:18 }}>
              <a className="social-btn" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#90B8F0", borderColor:"rgba(255,255,255,0.25)" }}><SvgFb/> Facebook</a>
              <a className="social-btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color:"#F5A8C8", borderColor:"rgba(255,255,255,0.25)" }}><SvgIg/> Instagram</a>
            </div>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              <li><a onClick={() => go("/")}>Home</a></li>
              <li><a onClick={() => go("/about")}>About Us</a></li>
              <li><a onClick={() => go("/programs")}>Programs</a></li>
            </ul>
          </div>
          <div>
            <h4>Programs</h4>
            <ul>
              <li><a onClick={() => go("/programs")}>Toddler (18m – 2.5yr)</a></li>
              <li><a onClick={() => go("/programs")}>Preschool (2.5 – 3.5yr)</a></li>
              <li><a onClick={() => go("/programs")}>Pre-K Prep (3.5 – 4yr)</a></li>
              <li><a onClick={() => go("/programs")}>School Age (4 – 7yr)</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={MAPS_URL} target="_blank" rel="noopener noreferrer">1830 Rossland Rd E, Whitby, ON L1N 3P2</a></li>
              <li><a href={EMAIL}>info@lifelonglearningcentre.com</a></li>
              <li><a href={PHONE}>905 240 5433</a></li>
              <li><a>Mon – Fri · 7:30 – 5:30</a></li>
              <li><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Google Reviews</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lifelong Learning Centre. All rights reserved.</span>
          <span>Est. 2009 · Whitby, Ontario · Licensed childcare provider serving Durham Region</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── SCROLL TO TOP ON ROUTE CHANGE ─── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─── APP ─── */
export default function App() {
  return (
    <BrowserRouter>
      <style>{styles}</style>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/programs" element={<ProgramsPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}