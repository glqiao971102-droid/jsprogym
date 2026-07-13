"use client";

import Link from "next/link";
import Trans from "@/components/Trans";
import LangSwitcher from "@/components/LangSwitcher";
import { useLang } from "@/components/LanguageProvider";

const HALL = [
  { n: 1, initial: "A", name: "Amir Hakim", ph: "ph-g1", stat: [{ b: "−18kg", sk: "hall1.s1" }, { b: "142", sk: "hall1.s2" }] },
  { n: 2, initial: "S", name: "Serena Wong", ph: "ph-g2", stat: [{ b: "26", sk: "hall2.s1" }, { b: "310", sk: "hall2.s2" }] },
  { n: 3, initial: "K", name: "Kavin Raj", ph: "ph-g3", stat: [{ b: "180kg", sk: "hall3.s1" }, { b: "+40kg", sk: "hall3.s2" }] },
];

const BOARD = [
  { rk: "1", name: "Amir Hakim", sessions: 142, days: 310, pts: "3,120" },
  { rk: "2", name: "Serena Wong", sessions: 128, days: 290, pts: "2,480" },
  { rk: "3", name: "Kavin Raj", sessions: 119, days: 205, pts: "2,310" },
  { rk: "4", name: "Farah Aziz", sessions: 104, days: 180, pts: "1,940" },
  { rk: "5", name: "Daniel Tan", sessions: 97, days: 150, pts: "1,760" },
];

export default function ChampionContent() {
  const { t, img } = useLang();

  return (
    <div className="t-premium">
      <div className="progress" />

      {/* nav */}
      <header className="nav">
        <div className="wrap nav-in">
          <Link href="/" className="logo">
            <span className="dot" />
            JSPROGYM
          </Link>
          <nav className="nav-links">
            <Link href="/#experience">{t("nav.home")}</Link>
            <Link href="/#programs">{t("nav.programs")}</Link>
            <a href="#hall">{t("nav.halloffame")}</a>
            <a href="#board">{t("nav.leaderboard")}</a>
          </nav>
          <div className="nav-right">
            <LangSwitcher />
            <Link className="btn gold" href="/#tour">
              {t("nav.freetour")}
            </Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="champ-hero">
        <div className="wrap">
          <Trans id="champ.eyebrow" as="div" className="eyebrow r" />
          <Trans id="champ.title" as="h1" className="r" />
          <Trans id="cpage.hero.p" as="p" className="r" />
        </div>
      </section>

      {/* champion of the month */}
      <section className="sec">
        <div className="wrap">
          <div className="champ-teaser">
            <div className="champ-feature r">
              <svg className="crown" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8Z" />
              </svg>
              <div className="tagline">{t("champ.cotm")}</div>
              <h3>Amir Hakim</h3>
              <div className="role">{t("champ.role")}</div>
              <p>{t("cpage.feature.quote")}</p>
            </div>
            <div className="champ-side r">
              <div className="champ-mini">
                <span className="rank">142</span>
                <div>
                  <b>{t("cpage.mini1.b")}</b>
                  <span>{t("cpage.mini1.s")}</span>
                </div>
              </div>
              <div className="champ-mini">
                <span className="rank">18</span>
                <div>
                  <b>{t("cpage.mini2.b")}</b>
                  <span>{t("cpage.mini2.s")}</span>
                </div>
              </div>
              <div className="champ-mini">
                <span className="rank">1st</span>
                <div>
                  <b>{t("cpage.mini3.b")}</b>
                  <span>{t("cpage.mini3.s")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* hall of fame */}
      <section className="sec alt" id="hall">
        <div className="wrap">
          <div className="sec-h center r">
            <Trans id="cpage.hall.eyebrow" as="div" className="eyebrow" />
            <Trans id="cpage.hall.title" as="h2" />
            <Trans id="cpage.hall.p" as="p" />
          </div>
          <div className="hall-grid">
            {HALL.map((h) => (
              <div className="hall r" key={h.name}>
                <div className={`ph ${h.ph}`}>
                  {img(`hall.${h.n}`) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="slot-photo" src={img(`hall.${h.n}`)} alt="" />
                  )}
                  <span className="medal" style={{ position: "relative", zIndex: 1 }}>
                    {t(`hall${h.n}.medal`)}
                  </span>
                  {!img(`hall.${h.n}`) && <b>{h.initial}</b>}
                </div>
                <div className="hall-b">
                  <div className="cat">{t(`hall${h.n}.cat`)}</div>
                  <h3>{h.name}</h3>
                  <p>{t(`hall${h.n}.story`)}</p>
                  <div className="hall-stats">
                    {h.stat.map((s) => (
                      <div key={s.sk}>
                        <b>{s.b}</b>
                        <span>{t(s.sk)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* leaderboard */}
      <section className="sec" id="board">
        <div className="wrap">
          <div className="sec-h center r">
            <Trans id="cpage.board.eyebrow" as="div" className="eyebrow" />
            <Trans id="cpage.board.title" as="h2" />
            <Trans id="cpage.board.p" as="p" />
          </div>
          <div className="board r">
            <div className="board-row">
              <span>{t("board.rank")}</span>
              <span>{t("board.member")}</span>
              <span className="streak">{t("board.streak")}</span>
              <span>{t("board.points")}</span>
            </div>
            {BOARD.map((b) => (
              <div className="board-row" key={b.rk}>
                <span className="rk">{b.rk}</span>
                <span>
                  <b>{b.name}</b>
                  <br />
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>
                    {b.sessions} {t("unit.sessions")}
                  </span>
                </span>
                <span className="streak" style={{ color: "var(--muted)" }}>
                  {b.days} {t("unit.days")}
                </span>
                <span className="pts">{b.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="sec tour">
        <div className="wrap sec-h center r" style={{ maxWidth: 640 }}>
          <Trans id="cpage.cta.eyebrow" as="div" className="eyebrow" />
          <Trans id="cpage.cta.title" as="h2" />
          <p style={{ marginBottom: 26 }}>{t("cpage.cta.p")}</p>
          <Link className="btn gold" href="/#tour">
            {t("cpage.cta.btn")}
          </Link>
        </div>
      </section>

      {/* footer */}
      <footer className="foot">
        <div className="wrap foot-bottom" style={{ marginTop: 0, borderTop: 0 }}>
          <span>{t("cpage.foot.rights")}</span>
          <Link href="/" className="back">
            {t("cpage.back")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
