"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Stars from "@/components/Stars";
import Trans from "@/components/Trans";
import LangSwitcher from "@/components/LangSwitcher";
import { useLang } from "@/components/LanguageProvider";
import type { ReviewData } from "@/lib/reviews";

const IG_HANDLE = "jsprogym";

const NAV: { k: string; href: string }[] = [
  { k: "nav.pt", href: "#programs" },
  { k: "nav.gc", href: "#programs" },
  { k: "nav.champions", href: "/champion" },
  { k: "nav.rewards", href: "#experience" },
  { k: "nav.reviews", href: "#reviews" },
  { k: "nav.gallery", href: "#instagram" },
  { k: "nav.blog", href: "#blog" },
  { k: "nav.contact", href: "#tour" },
];

const EXP: { n: number; cls: string; icon: ReactNode }[] = [
  { n: 1, cls: "e1", icon: <><circle cx="9" cy="7" r="3" strokeWidth="1.6" /><path d="M3 21c0-4 3-6 6-6s6 2 6 6M17 8l2 2 4-4" strokeWidth="1.6" /></> },
  { n: 2, cls: "e2", icon: <><circle cx="7" cy="6" r="2.4" strokeWidth="1.6" /><circle cx="17" cy="6" r="2.4" strokeWidth="1.6" /><path d="M2 20c0-3 2.5-5 5-5s5 2 5 5M12 20c0-3 2.5-5 5-5s5 2 5 5" strokeWidth="1.6" /></> },
  { n: 3, cls: "e3", icon: <path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" strokeWidth="1.6" /> },
  { n: 4, cls: "e4", icon: <><rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.6" /><path d="M3 16l5-5 4 3 3-3 6 6" strokeWidth="1.6" /><circle cx="8.5" cy="9" r="1.4" strokeWidth="1.6" /></> },
];

const PROGRAMS: { n: number; icon: ReactNode }[] = [
  { n: 1, icon: <path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8" strokeWidth="1.8" /> },
  { n: 2, icon: <path d="M13 2 4 14h7l-1 8 9-12h-7z" strokeWidth="1.8" /> },
  { n: 3, icon: <path d="M7 11V7a3 3 0 0 1 6 0M7 11h9a3 3 0 0 1 3 3v2a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3a2 2 0 0 1 2-2Z" strokeWidth="1.8" /> },
  { n: 4, icon: <><circle cx="12" cy="5" r="2.2" strokeWidth="1.8" /><path d="M5 21c1.5-5 4-7 7-7s5.5 2 7 7M12 14v-3" strokeWidth="1.8" /></> },
  { n: 5, icon: <><circle cx="6" cy="17" r="3" strokeWidth="1.8" /><circle cx="18" cy="17" r="3" strokeWidth="1.8" /><path d="M6 17 11 8h4l3 9M11 8 9 6" strokeWidth="1.8" /></> },
  { n: 6, icon: <><path d="M12 3c2 3 3 5 3 7a3 3 0 0 1-6 0c0-2 1-4 3-7Z" strokeWidth="1.8" /><path d="M5 21c1.5-2 4-3 7-3s5.5 1 7 3" strokeWidth="1.8" /></> },
];

const IG_POSTS = [
  { cls: "ig-i1", likes: "1.2k", cap: "Leg day 🔥" },
  { cls: "ig-i2", likes: "980", cap: "6am crew" },
  { cls: "ig-i3", likes: "2.1k", cap: "New PR!" },
  { cls: "ig-i4", likes: "1.5k", cap: "Class vibes" },
  { cls: "ig-i5", likes: "870", cap: "Recovery day" },
  { cls: "ig-i6", likes: "1.9k", cap: "Champion 🏆" },
];

const BRANCHES = ["USJ 1, Subang Jaya", "Mont Kiara, KL", "SS15, Subang", "Damansara, PJ"];

const G_LOGO = (
  <>
    <path fill="#4285F4" d="M45 24.5c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.8-1.5 4.6-4.3 6.4l6.6 5.1C42.2 35.6 45 30.6 45 24.5Z" />
    <path fill="#34A853" d="M24 46c5.9 0 10.8-1.9 14.4-5.3l-6.6-5.1c-1.8 1.2-4.2 2.1-7.8 2.1-6 0-11-4-12.8-9.5l-6.8 5.3C7.9 40.9 15.3 46 24 46Z" />
    <path fill="#FBBC05" d="M11.2 28.2c-.5-1.4-.7-2.8-.7-4.2s.3-2.9.7-4.2l-6.8-5.3C2.9 17.3 2 20.5 2 24s.9 6.7 2.4 9.5l6.8-5.3Z" />
    <path fill="#EA4335" d="M24 10.3c3.3 0 5.5 1.4 6.8 2.6l5.9-5.7C33.1 3.9 28.7 2 24 2 15.3 2 7.9 7.1 4.4 14.5l6.8 5.3C13 14.3 18 10.3 24 10.3Z" />
  </>
);

export default function HomeContent({ rv }: { rv: ReviewData }) {
  const { t } = useLang();

  return (
    <div className="t-premium">
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
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="hero">
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

      {/* experience cards */}
      <section className="wrap exp" id="experience">
        <div className="exp-grid">
          {EXP.map((e) => (
            <a className="exp-card" href="#" key={e.n}>
              <div className={`exp-img ${e.cls}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  {e.icon}
                </svg>
              </div>
              <div className="exp-body">
                <h3>{t(`exp${e.n}.t`)}</h3>
                <p>{t(`exp${e.n}.d`)}</p>
                <span className="go">{t("card.discover")}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* mission / vision */}
      <section className="sec alt">
        <div className="wrap mv">
          <div className="mv-media r">
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
              <p>{t("mv.mission.p")}</p>
            </div>
            <div className="mv-block">
              <h3>{t("mv.vision.t")}</h3>
              <p>{t("mv.vision.p")}</p>
            </div>
            <div className="mv-stats">
              <div className="mv-stat"><b>10K+</b><span>{t("mv.stat.members")}</span></div>
              <div className="mv-stat"><b>4</b><span>{t("mv.stat.branches")}</span></div>
              <div className="mv-stat"><b>40+</b><span>{t("mv.stat.coaches")}</span></div>
              <div className="mv-stat"><b>60+</b><span>{t("mv.stat.classes")}</span></div>
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

      {/* champions teaser */}
      <section className="sec" id="champion">
        <div className="wrap">
          <div className="sec-h center r">
            <Trans id="champ.eyebrow" as="div" className="eyebrow" />
            <Trans id="champ.title" as="h2" />
            <Trans id="champ.p" as="p" />
          </div>
          <div className="champ-teaser">
            <div className="champ-feature r">
              <svg className="crown" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z" />
              </svg>
              <div className="tagline">{t("champ.cotm")}</div>
              <h3>Amir Hakim</h3>
              <div className="role">{t("champ.role")}</div>
              <p>{t("champ.feature.p")}</p>
            </div>
            <div className="champ-side r">
              <div className="champ-mini">
                <span className="rank">2</span>
                <div>
                  <b>Serena Wong</b>
                  <span>{t("champ.mini2.sub")}</span>
                </div>
                <span className="val">2,480 {t("unit.pts")}</span>
              </div>
              <div className="champ-mini">
                <span className="rank">3</span>
                <div>
                  <b>Kavin Raj</b>
                  <span>{t("champ.mini3.sub")}</span>
                </div>
                <span className="val">2,310 {t("unit.pts")}</span>
              </div>
              <div className="champ-mini" style={{ alignItems: "center", justifyContent: "center" }}>
                <Link className="btn gold" href="/champion">
                  {t("champ.meetall")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <a className="btn gold" href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener">
              {t("ig.follow")}
            </a>
          </div>
          <div className="ig-grid">
            {IG_POSTS.map((p) => (
              <a className="ig-tile r" href={`https://instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener" key={p.cls}>
                <span className={`ph ${p.cls}`} />
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

      {/* blog */}
      <section className="sec alt" id="blog">
        <div className="wrap">
          <div className="sec-h center r">
            <Trans id="blog.eyebrow" as="div" className="eyebrow" />
            <Trans id="blog.title" as="h2" />
            <Trans id="blog.p" as="p" />
          </div>
          <div className="blog-grid">
            {[1, 2, 3].map((n) => (
              <article className="post r" key={n}>
                <div className="post-thumb">
                  <span>{t(`blog${n}.cat`)}</span>
                </div>
                <div className="post-body">
                  <h3>{t(`blog${n}.t`)}</h3>
                  <p>{t(`blog${n}.d`)}</p>
                  <span className="go">{t("blog.readmore")}</span>
                </div>
              </article>
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
            <form className="form">
              <input type="text" placeholder={t("form.name")} />
              <input type="tel" placeholder={t("form.phone")} />
              <input type="email" placeholder={t("form.email")} />
              <select defaultValue="">
                <option value="" disabled>
                  {t("form.branch")}
                </option>
                {BRANCHES.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <button className="btn gold" type="button">
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
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.2C18.4 2 17 2 15.9 2 13 2 11 3.7 11 6.7V10H8v4h3v8z" /></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>
                </a>
                <a href="#" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2 1.6 3.6 3.5 4v3c-1.3 0-2.5-.4-3.5-1v6.5A5.5 5.5 0 1 1 10.5 10v3a2.5 2.5 0 1 0 2.5 2.5V3z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4>{t("foot.branches")}</h4>
              <ul>
                {BRANCHES.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{t("foot.explore")}</h4>
              <ul>
                <li><a href="#programs">{t("nav.pt")}</a></li>
                <li><a href="#programs">{t("nav.gc")}</a></li>
                <li><a href="#experience">{t("nav.rewards")}</a></li>
                <li><a href="#instagram">{t("nav.gallery")}</a></li>
                <li><a href="#blog">{t("nav.blog")}</a></li>
              </ul>
            </div>
            <div>
              <h4>{t("foot.getapp")}</h4>
              <div className="apps">
                <a className="app-badge" href="#">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 2c.1 1.2-.4 2.4-1.1 3.2-.8.9-2 1.5-3.1 1.4-.1-1.1.4-2.3 1.1-3.1C13.7 2.6 15 2 16 2Zm3.3 7.6c-1.1.7-1.8 1.9-1.8 3.2 0 1.5.9 2.9 2.2 3.5-.3.9-.7 1.7-1.3 2.6-.8 1.1-1.6 2.2-2.9 2.2-1.2 0-1.6-.7-3-.7s-1.9.7-3 .7c-1.3 0-2.3-1.2-3.1-2.3C3.9 18 3 14.8 4.3 12.5c.7-1.2 2-2 3.4-2 1.2 0 2 .8 3 .8 1 0 1.6-.8 3-.8 1 0 2.1.4 3 1.1Z" /></svg>
                  <span>{t("foot.appstore")}<small>{t("foot.appstore.small")}</small></span>
                </a>
                <a className="app-badge" href="#">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 3.5 14.5 12 4 20.5c-.3-.2-.5-.6-.5-1v-15c0-.4.2-.8.5-1Zm12 5.9 2.9 2.3c.8.5.8 1.6 0 2.1L16 16.1 13.5 12 16 9.4ZM5.7 3l9.1 5.3L12.7 10 5.7 3Zm0 18 7-7 2.1 1.7L5.7 21Z" /></svg>
                  <span>{t("foot.play")}<small>{t("foot.play.small")}</small></span>
                </a>
              </div>
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
