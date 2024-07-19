export interface Family {
  id: number
  name: string
  desc: string
  freemium?: string
  cover: string
}

export const family:Family[] = [
  {
    id: 1,
    name: "Gallon Fuel Container",
    desc: "Plastic fuel can",
    freemium: "free",
    cover:
      "https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/clw5b17ae7pvalh0roa5241ho.jpg",
  },
  {
    id: 2,
    name: "Halo Mirror",
    desc: "Full-length mirror with wooden frame, by Brecht Wright Gander",
    cover:
      "https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/dabf7ca2-a2e7-4f27-b969-5f561303c0c7.jpg",
  },
  {
    id: 3,
    name: "Topazio Finestra Wardrobe",
    desc: "Wardrobe with 3 doors and 4 drawers, wood",
    freemium: "free",
    cover:
      "https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/clwezctdr7pyclh0rxgh3o5iq.jpg",
  },
  {
    id: 4,
    name: "Shelves",
    desc: "Shelf with 3 supports",
    freemium: "free",
    cover:
      "https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/d5dc05f5-1fce-4404-89d9-91b04c4c6210.jpg",
  },
  {
    id: 5,
    name: "Curved Kitchen Island Countertop",
    desc: "Curved sculpted kitchen island countertop with wood base",
    freemium: "free",
    cover:
      "https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/6b6766ee-8c6e-43ab-9a93-316ac4d7b105.jpg",
  },
  {
    id: 6,
    name: "Toilet Bowl",
    desc: "Toilet bowl with built-in cistern, made of ceramic",
    freemium: "premium",
    cover:
      "https://plugin-storage.nyc3.digitaloceanspaces.com/families/images/clvle41a07p3elh0r78adcvp1.jpg",
  }
]
