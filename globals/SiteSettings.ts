import type { GlobalConfig } from "payload";

// Non-translated site-wide settings.
export const SiteSettings: GlobalConfig = {
  slug: "settings",
  label: "Site Settings",
  access: { read: () => true },
  fields: [
    {
      name: "whatsapp",
      type: "text",
      label: "Enquiry WhatsApp (international, e.g. 60137111613)",
      defaultValue: "60137111613",
    },
    {
      name: "instagramHandle",
      type: "text",
      label: "Instagram handle (without @)",
      defaultValue: "jsprogym",
    },
  ],
};
