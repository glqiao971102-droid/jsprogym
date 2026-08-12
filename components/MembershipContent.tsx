"use client";

import Link from "next/link";
import LangSwitcher from "@/components/LangSwitcher";
import { useLang } from "@/components/LanguageProvider";

// Enquiry WhatsApp: 013-711 1613 -> international 6013-711 1613
const TOUR_WA = "60137111613";

type Pkg = {
  term: string;
  months: number;
  price: number;
  feature?: boolean;
};

// Prices from the JSPRO GYM membership flyer.
const PACKAGES: Pkg[] = [
  { term: "1 Month", months: 1, price: 219 },
  { term: "3 Months", months: 3, price: 538 },
  { term: "6 Months", months: 6, price: 959 },
  { term: "12 Months", months: 12, price: 1788, feature: true },
];

const BASE_MONTHLY = 219; // 1-month rate, used to show savings

const HOURS: { days: string; time: string }[] = [
  { days: "Mon – Fri", time: "7:00 AM – 1:00 AM" },
  { days: "Sat & Sun", time: "7:00 AM – 12:00 PM" },
];

function money(n: number) {
  return "RM" + n.toLocaleString("en-MY");
}

export default function MembershipContent() {
  const { t } = useLang();

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
            <a href="#packages">{t("nav.membership")}</a>
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
          <div className="eyebrow">JSPROGYM · Malaysia</div>
          <h1>
            Membership <span className="gold">Packages.</span>
          </h1>
          <p>
            Flexible plans built for real progress — the longer you commit, the
            more you save. Pick the term that fits your goals and start today.
          </p>
        </div>
      </section>

      {/* packages */}
      <section className="sec" id="packages">
        <div className="wrap">
          <div className="sec-h center">
            <div className="eyebrow">Choose your plan</div>
            <h2>Membership Plans</h2>
            <p>All plans give you full access to the gym floor, equipment and facilities.</p>
          </div>

          <div className="mem-grid">
            {PACKAGES.map((p) => {
              const perMonth = Math.round(p.price / p.months);
              const save = BASE_MONTHLY * p.months - p.price;
              return (
                <div className={`mem-card${p.feature ? " feature" : ""}`} key={p.term}>
                  {p.feature && <span className="mem-badge">Best value</span>}
                  <div className="mem-term">{p.term}</div>
                  <div className="mem-price">{money(p.price)}</div>
                  <div className="mem-per">
                    {p.months > 1 ? `${money(perMonth)} / month` : "per month"}
                  </div>
                  {save > 0 && (
                    <div className="mem-save">Save {money(save)}</div>
                  )}
                  <a
                    className={`btn ${p.feature ? "gold" : "outline"} mem-cta`}
                    href={`https://wa.me/${TOUR_WA}?text=${encodeURIComponent(
                      `Hi JSPROGYM! I'd like to sign up for the ${p.term} membership (${money(p.price)}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join now
                  </a>
                </div>
              );
            })}
          </div>

          {/* fees */}
          <div className="mem-info">
            <div className="mem-info-tile">
              <div className="mem-info-label">1st Registration Fee</div>
              <div className="mem-info-value gold">{money(60)}</div>
              <div className="mem-info-note">One-time, for new members</div>
            </div>
            <div className="mem-info-tile">
              <div className="mem-info-label">Walk-in</div>
              <div className="mem-info-value gold">{money(30)}</div>
              <div className="mem-info-note">Per visit · no registration needed</div>
            </div>
          </div>
        </div>
      </section>

      {/* operational hours */}
      <section className="sec alt" id="hours">
        <div className="wrap">
          <div className="sec-h center">
            <div className="eyebrow">Opening times</div>
            <h2>Operational Hours</h2>
          </div>
          <div className="mem-hours">
            {HOURS.map((h) => (
              <div className="mem-hours-row" key={h.days}>
                <span className="mem-hours-day">{h.days}</span>
                <span className="mem-hours-time">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="sec tour">
        <div className="wrap sec-h center" style={{ maxWidth: 640 }}>
          <div className="eyebrow">Ready to start?</div>
          <h2>Come train with us</h2>
          <p style={{ marginBottom: 26 }}>
            Book a free tour or message us on WhatsApp — we&apos;ll help you pick
            the right plan.
          </p>
          <Link className="btn gold" href="/#tour">
            Book a Free Tour
          </Link>
        </div>
      </section>

      {/* footer */}
      <footer className="foot">
        <div className="wrap foot-bottom" style={{ marginTop: 0, borderTop: 0 }}>
          <span>© 2026 JSPROGYM · Malaysia</span>
          <Link href="/" className="back">
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
