import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSPROGYM — Coming Soon",
  robots: { index: false, follow: false },
};

export default async function Maintenance({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="maint">
      <div className="maint-card">
        <span className="maint-logo">
          <span className="dot" />
          JSPROGYM
        </span>

        <div style={{ marginTop: 4 }}>
          <span className="maint-badge">Under construction</span>
        </div>

        <h1>
          Something <span>strong</span> is coming.
        </h1>
        <p>
          Our new site is getting its final reps in. Enter the access password to
          take a look inside.
        </p>

        <form className="maint-form" action="/api/unlock" method="post">
          <input
            type="password"
            name="password"
            placeholder="Access password"
            autoFocus
            aria-label="Access password"
          />
          <button type="submit">Enter</button>
        </form>

        {error && <p className="maint-err">Wrong password — please try again.</p>}

        <p className="maint-foot">© 2026 JSPROGYM · Malaysia</p>
      </div>
    </main>
  );
}
