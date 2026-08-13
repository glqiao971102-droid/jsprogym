"use client";

import { useState } from "react";
import Link from "next/link";
import LangSwitcher from "@/components/LangSwitcher";
import { useLang } from "@/components/LanguageProvider";

// Absolute links so the nav works identically from every page.
const NAV: { k: string; href: string }[] = [
  { k: "nav.pt", href: "/personal-training" },
  { k: "nav.gc", href: "/#group-class" },
  { k: "nav.membership", href: "/membership" },
  { k: "nav.rewards", href: "/rewards" },
  { k: "nav.reviews", href: "/#reviews" },
  { k: "nav.gallery", href: "/area" },
  { k: "nav.contact", href: "/#tour" },
];

export default function SiteNav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="logo">
          <span className="dot" />
          JSPROGYM
        </Link>
        <nav className="nav-links">
          {NAV.map((n) => (
            <Link href={n.href} key={n.k}>
              {t(n.k)}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <LangSwitcher />
          <Link className="btn gold" href="/#tour">
            {t("nav.freetour")}
          </Link>
          <button
            className={`nav-burger${open ? " open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav-mobile">
          <div className="wrap">
            {NAV.map((n) => (
              <Link href={n.href} key={n.k} onClick={() => setOpen(false)}>
                {t(n.k)}
              </Link>
            ))}
            <Link className="btn gold" href="/#tour" onClick={() => setOpen(false)}>
              {t("nav.freetour")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
