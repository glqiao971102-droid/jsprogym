import type { CollectionConfig } from "payload";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Training areas / muscle groups (Back, Chest, Legs, …) — managed in /admin.
export const Areas: CollectionConfig = {
  slug: "areas",
  labels: { singular: "Area", plural: "Areas" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order"],
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.name) data.slug = slugify(data.name);
        return data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Area (e.g. Back, Chest)" },
    { name: "nameZh", type: "text", label: "名称 (中文, optional)" },
    { name: "nameMs", type: "text", label: "Nama (BM, optional)" },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { description: "Auto-filled from the name if left blank." },
    },
    { name: "description", type: "textarea", label: "Short description (optional)" },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower shows first." } },
  ],
};
