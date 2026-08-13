"use client";

import Link from "next/link";
import { useState, type ReactNode, type FormEvent } from "react";
import Stars from "@/components/Stars";
import Trans from "@/components/Trans";
import LangSwitcher from "@/components/LangSwitcher";
import MerdekaPopup from "@/components/MerdekaPopup";
import { useLang } from "@/components/LanguageProvider";
import type { ReviewData } from "@/lib/reviews";
import type { Lang } from "@/lib/i18n";

export type AreaCover = {
  slug: string;
  name: Partial<Record<Lang, string>>;
  cover: string | null;
  count: number;
};

const BRANDS = [
  "eleiko", "hammer-strength", "life-fitness", "cybex",
  "nautilus", "hoist", "icarian", "impulse",
];

const IG_HANDLE = "jspro_gym";
const IG_URL = "https://www.instagram.com/jspro_gym/";
const FB_URL = "https://web.facebook.com/jsprogym";

const NAV: { k: string; href: string }[] = [
  { k: "nav.pt", href: "/personal-training" },
  { k: "nav.gc", href: "#group-class" },
  { k: "nav.membership", href: "/membership" },
  { k: "nav.reviews", href: "#reviews" },
  { k: "nav.gallery", href: "/area" },
  { k: "nav.contact", href: "#tour" },
];

const EXP: { n: number; cls: string; href: string; icon: ReactNode }[] = [
  { n: 1, cls: "e1", href: "/personal-training", icon: <><circle cx="9" cy="7" r="3" strokeWidth="1.6" /><path d="M3 21c0-4 3-6 6-6s6 2 6 6M17 8l2 2 4-4" strokeWidth="1.6" /></> },
  { n: 2, cls: "e2", href: "#group-class", icon: <><circle cx="7" cy="6" r="2.4" strokeWidth="1.6" /><circle cx="17" cy="6" r="2.4" strokeWidth="1.6" /><path d="M2 20c0-3 2.5-5 5-5s5 2 5 5M12 20c0-3 2.5-5 5-5s5 2 5 5" strokeWidth="1.6" /></> },
  { n: 3, cls: "e3", href: "/rewards", icon: <path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" strokeWidth="1.6" /> },
  { n: 4, cls: "e4", href: "/area", icon: <><rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.6" /><path d="M3 16l5-5 4 3 3-3 6 6" strokeWidth="1.6" /><circle cx="8.5" cy="9" r="1.4" strokeWidth="1.6" /></> },
];

const PROGRAMS: { n: number; icon: ReactNode }[] = [
  // 1 — Strength Training: dumbbell
  { n: 1, icon: <path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8" strokeWidth="1.8" /> },
  // 2 — HIIT & Conditioning: lightning bolt
  { n: 2, icon: <path d="M13 2 4 14h7l-1 8 9-12h-7z" strokeWidth="1.8" /> },
  // 3 — Boxing: glove
  { n: 3, icon: <><path d="M9 6a3 3 0 0 1 6 0v4" strokeWidth="1.8" /><path d="M15 8.5h1.5a2.5 2.5 0 0 1 0 5H15" strokeWidth="1.8" /><path d="M6 9a2 2 0 0 1 2-2h7v6a4 4 0 0 1-4 4H9a3 3 0 0 1-3-3V9Z" strokeWidth="1.8" /><path d="M6 13h9" strokeWidth="1.8" /></> },
  // 4 — Indoor Ride: bicycle
  { n: 4, icon: <><circle cx="6" cy="17" r="3" strokeWidth="1.8" /><circle cx="18" cy="17" r="3" strokeWidth="1.8" /><path d="M6 17 11 8h4l3 9M11 8 9 6" strokeWidth="1.8" /></> },
  // 5 — Cardio Zone: treadmill
  { n: 5, icon: <><path d="M2 18h13l4-12" strokeWidth="1.8" /><path d="M4 18l1.2-4.5H15.5" strokeWidth="1.8" /><path d="M17.5 10.5H21" strokeWidth="1.8" /></> },
  // 6 — Recovery Zone: stretching figure
  { n: 6, icon: <><circle cx="10" cy="4.5" r="1.7" strokeWidth="1.8" /><path d="M10 6.5v6M10 12.5l-3 5M10 12.5l3 5M10 8.5l4-2M10 9l-3-1.5" strokeWidth="1.8" /></> },
];

const IG_POSTS = [
  { cls: "ig-i1", likes: "1.2k", cap: "Leg day 🔥" },
  { cls: "ig-i2", likes: "980", cap: "6am crew" },
  { cls: "ig-i3", likes: "2.1k", cap: "New PR!" },
  { cls: "ig-i4", likes: "1.5k", cap: "Class vibes" },
  { cls: "ig-i5", likes: "870", cap: "Recovery day" },
  { cls: "ig-i6", likes: "1.9k", cap: "Big lifts 🏆" },
];

// Enquiry WhatsApp: 013-711 1613 -> international 6013-711 1613
const TOUR_WA = "60137111613";

const G_LOGO = (
  <>
    <path fill="#4285F4" d="M45 24.5c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.8-1.5 4.6-4.3 6.4l6.6 5.1C42.2 35.6 45 30.6 45 24.5Z" />
    <path fill="#34A853" d="M24 46c5.9 0 10.8-1.9 14.4-5.3l-6.6-5.1c-1.8 1.2-4.2 2.1-7.8 2.1-6 0-11-4-12.8-9.5l-6.8 5.3C7.9 40.9 15.3 46 24 46Z" />
    <path fill="#FBBC05" d="M11.2 28.2c-.5-1.4-.7-2.8-.7-4.2s.3-2.9.7-4.2l-6.8-5.3C2.9 17.3 2 20.5 2 24s.9 6.7 2.4 9.5l6.8-5.3Z" />
    <path fill="#EA4335" d="M24 10.3c3.3 0 5.5 1.4 6.8 2.6l5.9-5.7C33.1 3.9 28.7 2 24 2 15.3 2 7.9 7.1 4.4 14.5l6.8 5.3C13 14.3 18 10.3 24 10.3Z" />
  </>
);

export default function HomeContent({
  rv,
  areas = [],
}: {
  rv: ReviewData;
  areas?: AreaCover[];
}) {
  const { t, lang, img } = useLang();
  const heroVideo = img("hero.video") || "/hero.mp4";
  const heroPoster = img("hero.poster") || "/hero-poster.jpg";
  const [menuOpen, setMenuOpen] = useState(false);

  const onEnquire = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const msg =
      "Hi JSPROGYM! I'd like to enquire.\n" +
      `Name: ${d.get("name") || ""}\n` +
      `Phone: ${d.get("phone") || ""}\n` +
      `Email: ${d.get("email") || ""}\n` +
      `Interested in: ${d.get("interest") || ""}`;
    window.open(
      `https://wa.me/${TOUR_WA}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <div className="t-premium">
      <MerdekaPopup />
      <div className="progress" />

      {/* nav */}
      <header className="nav">
        <div className="wrap nav-in">
          <span className="logo">
            <span className="dot" />
            JSPROGYM
          </span>
          <nav className="nav-links">
            {NAV.map((n) =>
              n.href.startsWith("/") ? (
                <Link href={n.href} key={n.k}>
                  {t(n.k)}
                </Link>
              ) : (
                <a href={n.href} key={n.k}>
                  {t(n.k)}
                </a>
              )
            )}
          </nav>
          <div className="nav-right">
            <LangSwitcher />
            <a className="btn gold" href="#tour">
              {t("nav.freetour")}
            </a>
            <button
              className={`nav-burger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="nav-mobile">
            <div className="wrap">
              {NAV.map((n) =>
                n.href.startsWith("/") ? (
                  <Link href={n.href} key={n.k} onClick={() => setMenuOpen(false)}>
                    {t(n.k)}
                  </Link>
                ) : (
                  <a href={n.href} key={n.k} onClick={() => setMenuOpen(false)}>
                    {t(n.k)}
                  </a>
                )
              )}
              <a className="btn gold" href="#tour" onClick={() => setMenuOpen(false)}>
                {t("nav.freetour")}
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* hero */}
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-hidden="true"
          key={heroVideo}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-scrim" />
        <div className="wrap hero-in">
          <Trans id="hero.eyebrow" as="div" className="eyebrow r" />
          <Trans id="hero.title" as="h1" className="r" />
          <Trans id="hero.p" as="p" className="r" />
          <div className="hero-cta r">
            <a className="btn gold" href="#tour">
              {t("hero.cta1")}
            </a>
            <a className="btn outline" href="#experience">
              {t("hero.cta2")}
            </a>
          </div>
        </div>
        <div className="hero-cue">{t("hero.cue")}</div>
      </section>

      {/* equipment brands marquee */}
      <section className="brands">
        <div className="wrap">
          <p className="brands-title">
            {{ en: "Equipment by the world's best brands", "zh-Hans": "我们采用世界顶级器材品牌", "zh-Hant": "我們採用世界頂級器材品牌", ms: "Peralatan daripada jenama terbaik dunia" }[lang]}
          </p>
        </div>
        <div className="brand-track">
          <div className="brand-row">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div className="brand-chip" key={b + i} aria-hidden={i >= BRANDS.length}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/brands/${b}.png`} alt={b.replace(/-/g, " ")} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* experience cards */}
      <section className="wrap exp" id="experience">
        <div className="exp-grid">
          {EXP.map((e) => {
            const photo = img(`exp.${e.n}`);
            return (
            <a className="exp-card" href={e.href} key={e.n}>
              <div className={`exp-img ${e.cls}`}>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="slot-photo" src={photo} alt="" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    {e.icon}
                  </svg>
                )}
              </div>
              <div className="exp-body">
                <h3>{t(`exp${e.n}.t`)}</h3>
                <p>{t(`exp${e.n}.d`)}</p>
                <span className="go">{t("card.discover")}</span>
              </div>
            </a>
            );
          })}
        </div>
      </section>

      {/* mission / vision */}
      <section className="sec alt" id="group-class">
        <div className="wrap mv">
          <div className="mv-media r">
            <video
              className="mv-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src="/groupclass.mp4" type="video/mp4" />
            </video>
            <div className="mv-video-scrim" />
            <div className="mk">
              JS<span className="gold">PRO</span>
              <Trans id="mv.mk" as="small" />
            </div>
          </div>
          <div className="r">
            <Trans id="mv.who" as="div" className="eyebrow" />
            <div className="sec-h">
              <Trans id="mv.movement" as="h2" />
            </div>
            <div className="mv-block">
              <h3>{t("mv.mission.t")}</h3>
              <div className="mv-sub">{t("mv.mission.sub")}</div>
              <p>{t("mv.mission.p")}</p>
            </div>
            <div className="mv-block">
              <h3>{t("mv.vision.t")}</h3>
              <div className="mv-sub">{t("mv.vision.sub")}</div>
              <p>{t("mv.vision.p")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* programs */}
      <section className="sec" id="programs">
        <div className="wrap">
          <div className="sec-h center r">
            <Trans id="prog.eyebrow" as="div" className="eyebrow" />
            <Trans id="prog.title" as="h2" />
            <Trans id="prog.p" as="p" />
          </div>
          <div className="prog-grid">
            {PROGRAMS.map((p) => (
              <div className="prog r" key={p.n}>
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  {p.icon}
                </svg>
                <h3>{t(`prog${p.n}.t`)}</h3>
                <p>{t(`prog${p.n}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* explore by area */}
      {areas.length > 0 && (
        <section className="sec alt" id="areas">
          <div className="wrap">
            <div className="sec-h center r">
              <div className="eyebrow">{t("nav.gallery")}</div>
              <h2>
                {{ en: "Explore our gym", "zh-Hans": "探索我们的健身房", "zh-Hant": "探索我們的健身房", ms: "Terokai gim kami" }[lang]}
              </h2>
              <p>
                {{ en: "Every zone in one place — tap an area to see the full gallery.", "zh-Hans": "每个区域一网打尽 —— 点击查看完整相册。", "zh-Hant": "每個區域一覽無遺 —— 點擊查看完整相簿。", ms: "Setiap zon di satu tempat — ketik untuk lihat galeri penuh." }[lang]}
              </p>
            </div>
            <div className="area-cards">
              {areas.map((a) => (
                <Link className="area-card r" href={`/area#${a.slug}`} key={a.slug}>
                  {a.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="slot-photo" src={a.cover} alt="" loading="lazy" />
                  )}
                  <div className="area-card-b">
                    <h3>{a.name[lang] || a.name.en || a.slug}</h3>
                    <span>{a.count} photos</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* google reviews */}
      <section className="sec" id="reviews">
        <div className="wrap">
          <div className="sec-h center r">
            <Trans id="reviews.eyebrow" as="div" className="eyebrow" />
            <Trans id="reviews.title" as="h2" />
          </div>
          <div className="rev-top r">
            <div className="rev-score">
              <b>{rv.rating.toFixed(1)}</b>
              <Stars n={rv.rating} />
              <span>{t("reviews.based", { n: rv.total.toLocaleString() })}</span>
            </div>
            <div className="rev-brand">
              <svg className="g-logo" viewBox="0 0 48 48" aria-hidden="true">{G_LOGO}</svg>
              <div>
                <div className="rb-t">{t("reviews.google")}</div>
                <div className="rb-s">JSPROGYM · Malaysia</div>
              </div>
            </div>
          </div>
          <div className="rev-grid">
            {rv.reviews.slice(0, 6).map((r, i) => (
              <div className="rev-card r" key={`${r.author}-${i}`}>
                <div className="rev-head">
                  <span className="rev-av">
                    {r.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.photo} alt="" />
                    ) : (
                      r.author.charAt(0)
                    )}
                  </span>
                  <div>
                    <b>{r.author}</b>
                    <span className="when">{r.when}</span>
                  </div>
                </div>
                <Stars n={r.rating} />
                <p>{r.text}</p>
                <div className="gmark">
                  <svg viewBox="0 0 48 48" aria-hidden="true">{G_LOGO}</svg>
                  {t("reviews.posted")}
                </div>
              </div>
            ))}
          </div>
          <div className="rev-cta">
            <a className="btn outline" href={rv.profileUrl} target="_blank" rel="noopener">
              {t("reviews.readall")}
            </a>
          </div>
        </div>
      </section>

      {/* instagram */}
      <section className="sec alt" id="instagram">
        <div className="wrap">
          <div className="ig-head r">
            <div className="ig-id">
              <div className="ig-ring">
                <span>JS</span>
              </div>
              <div>
                <b>@{IG_HANDLE}</b>
                <span className="h">{t("ig.sub")}</span>
              </div>
            </div>
            <a className="btn gold" href={IG_URL} target="_blank" rel="noopener">
              {t("ig.follow")}
            </a>
          </div>
          <div className="ig-grid">
            {IG_POSTS.map((p, i) => (
              <a className="ig-tile r" href={IG_URL} target="_blank" rel="noopener" key={p.cls}>
                {img(`ig.${i + 1}`) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="slot-photo" src={img(`ig.${i + 1}`)} alt="" />
                ) : (
                  <span className={`ph ${p.cls}`} />
                )}
                <span className="ov">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21Z" />
                  </svg>
                  {p.likes} · {p.cap}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* free tour form */}
      <section className="sec tour" id="tour">
        <div className="wrap tour-grid">
          <div className="lead r">
            <Trans id="tour.eyebrow" as="div" className="eyebrow" />
            <div className="sec-h">
              <Trans id="tour.title" as="h2" />
            </div>
            <p>{t("tour.p")}</p>
            <ul className="tour-points">
              <li>{t("tour.point1")}</li>
              <li>{t("tour.point2")}</li>
              <li>{t("tour.point3")}</li>
            </ul>
          </div>
          <div className="form-card r">
            <h3>{t("tour.reserve")}</h3>
            <form className="form" onSubmit={onEnquire}>
              <input type="text" name="name" placeholder={t("form.name")} required />
              <input type="tel" name="phone" placeholder={t("form.phone")} required />
              <input type="email" name="email" placeholder={t("form.email")} />
              <select name="interest" defaultValue="" required>
                <option value="" disabled>
                  {t("form.interest")}
                </option>
                <option value={t("form.opt.walkin")}>{t("form.opt.walkin")}</option>
                <option value={t("form.opt.membership")}>{t("form.opt.membership")}</option>
                <option value={t("form.opt.pt")}>{t("form.opt.pt")}</option>
                <option value={t("form.opt.class")}>{t("form.opt.class")}</option>
                <option value={t("form.opt.other")}>{t("form.opt.other")}</option>
              </select>
              <button className="btn gold" type="submit">
                {t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <span className="logo">
                <span className="dot" />
                JSPROGYM
              </span>
              <p>{t("foot.desc")}</p>
              <div className="socials">
                <a href={FB_URL} target="_blank" rel="noopener" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.2C18.4 2 17 2 15.9 2 13 2 11 3.7 11 6.7V10H8v4h3v8z" /></svg>
                </a>
                <a href={IG_URL} target="_blank" rel="noopener" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4>{t("foot.explore")}</h4>
              <ul>
                <li><a href="/personal-training">{t("nav.pt")}</a></li>
                <li><a href="#programs">{t("nav.gc")}</a></li>
                <li><a href="/area">{t("nav.gallery")}</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>{t("foot.rights")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
