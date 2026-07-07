// Site-wide maintenance gate. Visitors must enter the password to view the site.
// Change the password via the SITE_PASSWORD env var (falls back to the default).
export const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "JSPROGYM1234@";

export const UNLOCK_COOKIE = "jspro_unlock";
// Opaque token stored in the cookie once unlocked (never the password itself).
export const UNLOCK_TOKEN = "jsprogym-unlocked-2026";
