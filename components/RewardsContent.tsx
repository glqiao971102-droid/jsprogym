"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const TOUR_WA = "60137111613";

// Ways to earn points.
const EARN: { big: string; title: string; desc: string; badge?: string; feature?: boolean }[] = [
  { big: "RM1 = 1 pt", title: "Spend & earn", desc: "Memberships, PT, gear, drinks — every ringgit counts towards your next reward." },
  { big: "+10 pts / day", title: "Daily check-in", desc: "Just come in and train. Check in once a day, every day — move more, earn more.", badge: "Once daily", feature: true },
  { big: "+500 pts", title: "Refer a friend", desc: "When a friend joins, you get 500 points and they get 250 to start with.", badge: "You + them" },
  { big: "2× points", title: "Birthday bonus", desc: "Every ringgit you spend on your birthday earns double points. Happy birthday!", badge: "Your day" },
];

// Earn examples — spend/activity → points → redeem value (100 pts = RM5).
const EXAMPLES: { what: string; points: string; value: string; feature?: boolean }[] = [
  { what: "Spend RM100", points: "100 pts", value: "RM5" },
  { what: "Renew a RM219 month", points: "219 pts", value: "≈ RM10" },
  { what: "Check in for 30 days", points: "300 pts", value: "RM15" },
  { what: "Spend RM1,000", points: "1,000 pts", value: "RM50", feature: true },
];

const TERMS: string[] = [
  "Minimum 100 points to redeem.",
  "Redeemable on everything — gear, drinks, PT and monthly membership renewal.",
  "Points can't be combined with other promotions.",
  "Purchases made under a promotion don't earn points.",
  "Daily check-in counts once per day.",
  "Referral points are credited once your friend completes their sign-up.",
  "Birthday double points apply on your birthday only.",
];

function num(v: string) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export default function RewardsContent() {

  // points calculator
  const [spend, setSpend] = useState(219);
  const [days, setDays] = useState(12);
  const [referrals, setReferrals] = useState(1);
  const [bday, setBday] = useState(0);
  const points = spend * 1 + days * 10 + referrals * 500 + bday * 2;
  const value = Math.floor(points / 100) * 5;

  return (
    <div className="t-premium">
      <div className="progress" />

      {/* nav */}
      <SiteNav />

      {/* hero */}
      <section className="champ-hero">
        <div className="wrap">
          <div className="eyebrow">JSPROGYM Rewards</div>
          <h1>
            Train more. <span className="gold">Earn more.</span>
          </h1>
          <p>
            Every ringgit you spend and every day you show up earns points — turn
            them into real savings on anything at JSPROGYM.
          </p>
          <div className="rw-hero-stats">
            <div><b>RM1</b><span>= 1 point</span></div>
            <div><b>100 pts</b><span>= RM5 off</span></div>
            <div><b>+10 pts</b><span>every check-in</span></div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="sec" id="how">
        <div className="wrap">
          <div className="sec-h center">
            <div className="eyebrow">How it works</div>
            <h2>Three simple steps</h2>
            <p>Earn as you go, then cash in your points whenever you like.</p>
          </div>
          <div className="rw-steps">
            <div className="rw-step">
              <span className="rw-step-n">1</span>
              <h3>Earn</h3>
              <p>Get 1 point for every RM1 you spend at JSPROGYM.</p>
            </div>
            <div className="rw-step">
              <span className="rw-step-n">2</span>
              <h3>Check in</h3>
              <p>Show up and train — earn 10 bonus points a day.</p>
            </div>
            <div className="rw-step">
              <span className="rw-step-n">3</span>
              <h3>Redeem</h3>
              <p>100 points = RM5 off. Use it on anything you like.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ways to earn */}
      <section className="sec alt">
        <div className="wrap">
          <div className="sec-h center">
            <div className="eyebrow">Ways to earn</div>
            <h2>Four ways to <span className="gold">stack points</span></h2>
          </div>
          <div className="rw-earn">
            {EARN.map((e) => (
              <div className={`rw-earn-card${e.feature ? " feature" : ""}`} key={e.title}>
                {e.badge && <span className="rw-badge">{e.badge}</span>}
                <div className="rw-earn-big">{e.big}</div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* redeem */}
      <section className="sec">
        <div className="wrap">
          <div className="rw-redeem">
            <div className="rw-redeem-head">
              <div className="eyebrow">Redeem</div>
              <h2>Points that pay you back</h2>
              <div className="rw-redeem-rate">
                <b>100 points</b>
                <span>=</span>
                <b className="gold">RM5</b>
              </div>
            </div>
            <ul className="rw-redeem-list">
              <li>Redeem on <b>everything</b> — including your monthly membership renewal.</li>
              <li>Minimum <b>100 points</b> to start redeeming.</li>
              <li>No cap — the more you train and spend, the more you save.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* examples */}
      <section className="sec alt">
        <div className="wrap">
          <div className="sec-h center">
            <div className="eyebrow">See it add up</div>
            <h2>Your points in action</h2>
          </div>
          <div className="rw-table">
            <div className="rw-row rw-row-head">
              <span>You do this</span>
              <span>You earn</span>
              <span>Worth</span>
            </div>
            {EXAMPLES.map((e) => (
              <div className={`rw-row${e.feature ? " feature" : ""}`} key={e.what}>
                <span>{e.what}</span>
                <span>{e.points}</span>
                <span className="rw-worth">{e.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* points calculator */}
      <section className="sec" id="calc">
        <div className="wrap">
          <div className="sec-h center">
            <div className="eyebrow">Points calculator</div>
            <h2>See what you&apos;d <span className="gold">earn</span></h2>
            <p>Pop in your numbers — your points and savings add up live.</p>
          </div>
          <div className="rw-calc">
            <div className="rw-calc-inputs">
              <label className="rw-field">
                <span>Monthly spend (RM)</span>
                <input type="number" min="0" inputMode="numeric" value={spend} onChange={(e) => setSpend(num(e.target.value))} />
                <em>× 1 pt</em>
              </label>
              <label className="rw-field">
                <span>Check-in days</span>
                <input type="number" min="0" inputMode="numeric" value={days} onChange={(e) => setDays(num(e.target.value))} />
                <em>× 10 pts</em>
              </label>
              <label className="rw-field">
                <span>Friends referred</span>
                <input type="number" min="0" inputMode="numeric" value={referrals} onChange={(e) => setReferrals(num(e.target.value))} />
                <em>× 500 pts</em>
              </label>
              <label className="rw-field">
                <span>Birthday spend (RM)</span>
                <input type="number" min="0" inputMode="numeric" value={bday} onChange={(e) => setBday(num(e.target.value))} />
                <em>× 2 pts</em>
              </label>
            </div>
            <div className="rw-calc-result">
              <div className="rw-calc-pts">
                <b>{points.toLocaleString("en-MY")}</b>
                <span>points</span>
              </div>
              <div className="rw-calc-val">
                ≈ <b>RM{value.toLocaleString("en-MY")}</b> to redeem
              </div>
              <div className="rw-calc-note">
                {points < 100
                  ? "Just 100 points unlocks your first RM5."
                  : "Redeemable on anything — including your membership."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* terms */}
      <section className="sec alt">
        <div className="wrap">
          <div className="sec-h center">
            <div className="eyebrow">Good to know</div>
            <h2>The fine print</h2>
          </div>
          <ul className="rw-terms">
            {TERMS.map((tm) => (
              <li key={tm}>{tm}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* cta */}
      <section className="sec tour">
        <div className="wrap sec-h center" style={{ maxWidth: 640 }}>
          <div className="eyebrow">Start earning</div>
          <h2>Come train, start stacking points</h2>
          <p style={{ marginBottom: 26 }}>
            Join JSPROGYM and every workout brings you closer to your next reward.
          </p>
          <div className="rw-cta-row">
            <Link className="btn gold" href="/#tour">
              Book a Free Tour
            </Link>
            <a
              className="btn outline"
              href={`https://wa.me/${TOUR_WA}?text=${encodeURIComponent(
                "Hi JSPROGYM! I'd like to know more about the Rewards points program."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask on WhatsApp
            </a>
          </div>
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
