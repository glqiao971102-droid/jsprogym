import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSPROGYM Champions — Hall of Fame",
  description:
    "Meet the JSPROGYM Champions — our members of the month, transformation stories and monthly leaderboard.",
};

const HALL = [
  { initial: "A", name: "Amir Hakim", cat: "Transformation", medal: "Champion", ph: "ph-g1", story: "Lost 18kg and became our most consistent 6am regular. A true inspiration to the floor.", stats: [{ b: "−18kg", s: "6 months" }, { b: "142", s: "Sessions" }] },
  { initial: "S", name: "Serena Wong", cat: "Most Classes", medal: "Runner-up", ph: "ph-g2", story: "26 classes in a single month while working full-time. Serena never misses a beat.", stats: [{ b: "26", s: "Classes / mo" }, { b: "310", s: "Day streak" }] },
  { initial: "K", name: "Kavin Raj", cat: "Strength", medal: "Runner-up", ph: "ph-g3", story: "Pulled a 180kg deadlift at his last meet — a 40kg gain since joining JSPROGYM.", stats: [{ b: "180kg", s: "Deadlift" }, { b: "+40kg", s: "In 1 year" }] },
];

const BOARD = [
  { rk: "1", name: "Amir Hakim", cls: "142 sessions", streak: "310 days", pts: "3,120" },
  { rk: "2", name: "Serena Wong", cls: "128 sessions", streak: "290 days", pts: "2,480" },
  { rk: "3", name: "Kavin Raj", cls: "119 sessions", streak: "205 days", pts: "2,310" },
  { rk: "4", name: "Farah Aziz", cls: "104 sessions", streak: "180 days", pts: "1,940" },
  { rk: "5", name: "Daniel Tan", cls: "97 sessions", streak: "150 days", pts: "1,760" },
];

export default function ChampionPage() {
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
            <Link href="/#experience">Home</Link>
            <Link href="/#programs">Programs</Link>
            <a href="#hall">Hall of Fame</a>
            <a href="#board">Leaderboard</a>
          </nav>
          <Link className="btn gold" href="/#tour">
            Free Tour
          </Link>
        </div>
      </header>

      {/* hero */}
      <section className="champ-hero">
        <div className="wrap">
          <div className="eyebrow r">Hall of fame</div>
          <h1 className="r">
            JSPROGYM <span className="gold">Champions</span>
          </h1>
          <p className="r">
            Every rep counts. Every month we crown the members who train hardest,
            show up most and lift the whole community with them.
          </p>
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
              <div className="tagline">Champion of the Month</div>
              <h3>Amir Hakim</h3>
              <div className="role">Transformation · −18kg in 6 months</div>
              <p>
                &ldquo;JSPROGYM didn&apos;t just change my body — it changed my
                mindset. The coaches and the crew made me believe I could do it.&rdquo;
              </p>
            </div>
            <div className="champ-side r">
              <div className="champ-mini">
                <span className="rank">142</span>
                <div>
                  <b>Sessions this year</b>
                  <span>Almost 3 a week, every week</span>
                </div>
              </div>
              <div className="champ-mini">
                <span className="rank">18</span>
                <div>
                  <b>Kilograms lost</b>
                  <span>In just six months</span>
                </div>
              </div>
              <div className="champ-mini">
                <span className="rank">1st</span>
                <div>
                  <b>On the leaderboard</b>
                  <span>3,120 champion points</span>
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
            <div className="eyebrow">This month&apos;s winners</div>
            <h2>The Hall of Fame</h2>
            <p>Real members, real results. Your name could be here next month.</p>
          </div>
          <div className="hall-grid">
            {HALL.map((h) => (
              <div className="hall r" key={h.name}>
                <div className={`ph ${h.ph}`}>
                  <span className="medal">{h.medal}</span>
                  <b>{h.initial}</b>
                </div>
                <div className="hall-b">
                  <div className="cat">{h.cat}</div>
                  <h3>{h.name}</h3>
                  <p>{h.story}</p>
                  <div className="hall-stats">
                    {h.stats.map((s) => (
                      <div key={s.s}>
                        <b>{s.b}</b>
                        <span>{s.s}</span>
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
            <div className="eyebrow">Live standings</div>
            <h2>Monthly Leaderboard</h2>
            <p>Earn points for every visit, class and PR. Climb the ranks and claim the crown.</p>
          </div>
          <div className="board r">
            <div className="board-row">
              <span>Rank</span>
              <span>Member</span>
              <span className="streak">Streak</span>
              <span>Points</span>
            </div>
            {BOARD.map((b) => (
              <div className="board-row" key={b.rk}>
                <span className="rk">{b.rk}</span>
                <span>
                  <b>{b.name}</b>
                  <br />
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{b.cls}</span>
                </span>
                <span className="streak" style={{ color: "var(--muted)" }}>
                  {b.streak}
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
          <div className="eyebrow">Your turn</div>
          <h2>
            Think you&apos;ve got what it <span className="gold">takes?</span>
          </h2>
          <p style={{ marginBottom: 26 }}>
            Every champion started with a single session. Book your free tour and
            begin your climb to the top.
          </p>
          <Link className="btn gold" href="/#tour">
            Start your journey
          </Link>
        </div>
      </section>

      {/* footer */}
      <footer className="foot">
        <div className="wrap foot-bottom" style={{ marginTop: 0, borderTop: 0 }}>
          <span>© 2026 JSPROGYM · Champions are made here.</span>
          <Link href="/" className="back">
            ← Back to JSPROGYM
          </Link>
        </div>
      </footer>
    </div>
  );
}
