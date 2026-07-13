import type { GlobalConfig } from "payload";

// Champions page content — same Strings/Images model as the homepage.
export const ChampionPage: GlobalConfig = {
  slug: "champion",
  label: "Champions Page",
  access: { read: () => true },
  admin: {
    description:
      "Edit every Champions-page text (per language) and upload images.",
  },
  fields: [
    {
      name: "strings",
      type: "array",
      label: "Text strings (editable per language)",
      labels: { singular: "String", plural: "Strings" },
      admin: {
        components: { RowLabel: "@/components/KeyRowLabel#KeyRowLabel" },
        initCollapsed: true,
      },
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
