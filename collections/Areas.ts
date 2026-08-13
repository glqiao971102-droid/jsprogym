import type { CollectionConfig } from "payload";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Training areas / zones (Chest, Back, Personal Training, …) with a photo gallery.
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
    { name: "name", type: "text", required: true, localized: true, label: "Area name" },
    {
      name: "group",
      type: "select",
      label: "Gallery group",
      options: [
        { label: "Gym Environment", value: "Gym Environment" },
        { label: "Personal Trainer Class", value: "Personal Trainer Class" },
        { label: "Group Class", value: "Group Class" },
        { label: "Equipment", value: "Equipment" },
      ],
      admin: { description: "Groups this area under a heading in the gallery. Leave blank to show on its own." },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { description: "Auto-filled from the name if left blank." },
    },
    { name: "description", type: "textarea", localized: true, label: "Short description (optional)" },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower shows first." } },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      label: "Cover photo (shown on the homepage + area header)",
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Gallery photos",
    },
  ],
};
