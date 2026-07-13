import type { GlobalConfig } from "payload";

const ROW_LABEL = {
  admin: {
    components: { RowLabel: "@/components/KeyRowLabel#KeyRowLabel" },
    initCollapsed: true,
  },
} as const;

// Homepage content. "Strings" = every text on the page, editable per language.
// "Images" = per-slot uploads (S3). Keys match the site's translation keys.
export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: { read: () => true },
  admin: {
    description:
      "Edit every homepage text (switch language with the locale selector, top-right) and upload images.",
  },
  fields: [
    {
      name: "strings",
      type: "array",
      label: "Text strings (editable per language)",
      labels: { singular: "String", plural: "Strings" },
      ...ROW_LABEL,
      fields: [
        { name: "key", type: "text", required: true, admin: { readOnly: true } },
        { name: "value", type: "textarea", localized: true },
      ],
    },
    {
      name: "images",
      type: "array",
      label: "Images (uploaded to S3)",
      labels: { singular: "Image slot", plural: "Image slots" },
      admin: {
        components: { RowLabel: "@/components/KeyRowLabel#KeyRowLabel" },
        initCollapsed: true,
      },
      fields: [
        { name: "key", type: "text", required: true, admin: { readOnly: true } },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
