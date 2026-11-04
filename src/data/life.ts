/**
 * Everything on the Life page. Facts, countries and blurbs come from Franco's info_for_life.md
 * (Nov 4, 2026). Photos are built by scripts/make_life_photos.py (metadata stripped); places come
 * from the photos' own GPS tags. Text supports **bold** and [links](https://…) (see lib/rich.tsx).
 */
import sizesJson from "../assets/life/sizes.json";
import { duolingoStreak } from "./counters";

const sm = import.meta.glob<string>("../assets/life/*/*-sm.avif", { eager: true, query: "?url", import: "default" });
const lg = import.meta.glob<string>("../assets/life/*/*-lg.avif", { eager: true, query: "?url", import: "default" });
const sizes = sizesJson as unknown as Record<string, [number, number]>;

export interface Photo { slug: string; sm: string; lg: string; w: number; h: number }
const photo = (group: "gallery" | "facts", slug: string): Photo => {
  const s = sm[`../assets/life/${group}/${slug}-sm.avif`];
  if (!s) throw new Error(`missing life photo ${group}/${slug}`);
  const [w, h] = sizes[slug];
  return { slug, sm: s, lg: lg[`../assets/life/${group}/${slug}-lg.avif`] ?? s, w, h };
};

/* ------------------------------------------------------------------ things I'm proud of */

export interface Fact { text: string; photo?: Photo; caption?: string }

export const FACTS: Fact[] = [
  { text: "Got **kicked out** of an all-you-can-eat buffet." },
  { text: "**Accidentally** hiked the most difficult trail up Seoul's tallest mountain with my mom, and survived with the help of a Korean ajumma.",
    photo: photo("facts", "seoul-summit"), caption: "The top, eventually · Seoul, 2022" },
  { text: "Recommended a book on a booktuber's YouTube channel, and it **got chosen at the very end**. [watch ↗](https://youtu.be/MPC2psjfJ0E?t=285)" },
  { text: "Did full-time research at Stanford and NUS at the same time one summer, despite the **15-hour time difference**, by working **18 hours straight** every day." },
  { text: `**${duolingoStreak().toLocaleString("en-US")}**-day Duolingo streak (and counting).` },
  { text: "**Met Pope Leo.**", photo: photo("facts", "pope-leo"), caption: "Harvard Yard, 2026" },
  { text: "Played **both piano and guitar** with my band at my high school's graduation party." },
  { text: "Learned enough **Japanese in 3 months** to get home after getting lost in the Japanese countryside.",
    photo: photo("facts", "lost-in-japan"), caption: "Somewhere in rural Fukuoka, 2026" },
  { text: "Made it out of the University of Toronto **alive**.", photo: photo("facts", "uoft-graduation"), caption: "Proof · Toronto, 2026" },
  { text: "Got my driver's license in **one try**." },
  { text: "Wrote a **60,000-word manuscript** on motivation, then finished it by living out the rest instead of writing it." },
  { text: "Own **5 student ID cards**." },
];
export const FACTS_CODA = "…and many, many more, omitted to keep this website minimalist.";

/* ------------------------------------------------------------------ places */

export type Continent = "North America" | "Asia" | "Europe";
export interface Country {
  name: string;
  /** ISO 3166 numeric, as in the world-atlas map (scripts/make_world_map.py VISITED). */
  iso: string;
  continent: Continent;
  /** Pin position: where the photos were taken, else the capital. */
  at: [lat: number, lon: number];
  note?: string;
}

export const COUNTRIES: Country[] = [
  { name: "Canada", iso: "124", continent: "North America", at: [43.65, -79.38], note: "home · Toronto" },
  { name: "United States", iso: "840", continent: "North America", at: [40.71, -74.0], note: "Palo Alto · Cambridge · New York" },
  { name: "United Kingdom", iso: "826", continent: "Europe", at: [51.51, -0.13] },
  { name: "France", iso: "250", continent: "Europe", at: [48.86, 2.35] },
  { name: "Switzerland", iso: "756", continent: "Europe", at: [46.2, 6.14], note: "a summer in Geneva" },
  { name: "Italy", iso: "380", continent: "Europe", at: [45.43, 12.34] },
  { name: "Serbia", iso: "688", continent: "Europe", at: [44.79, 20.45] },
  { name: "Greece", iso: "300", continent: "Europe", at: [37.98, 23.73] },
  { name: "Japan", iso: "392", continent: "Asia", at: [34.3, 132.32] },
  { name: "South Korea", iso: "410", continent: "Asia", at: [37.57, 126.98] },
  { name: "Taiwan", iso: "158", continent: "Asia", at: [25.03, 121.56] },
  { name: "Philippines", iso: "608", continent: "Asia", at: [14.6, 120.98] },
  { name: "Vietnam", iso: "704", continent: "Asia", at: [21.03, 105.84] },
  { name: "Thailand", iso: "764", continent: "Asia", at: [13.75, 100.5] },
  { name: "Malaysia", iso: "458", continent: "Asia", at: [3.14, 101.69] },
  { name: "Singapore", iso: "702", continent: "Asia", at: [1.35, 103.82], note: "a summer at NUS" },
  { name: "Indonesia", iso: "360", continent: "Asia", at: [-6.2, 106.85] },
];

/* ------------------------------------------------------------------ photos I took */

export interface Shot extends Photo { place: string; iso: string; year?: number }
const shot = (slug: string, place: string, iso: string, year?: number): Shot => ({ ...photo("gallery", slug), place, iso, year });

/** Order = scatter order on the board (alternate countries so neighbours differ). */
export const GALLERY: Shot[] = [
  shot("miyajima-torii", "Itsukushima Shrine, Miyajima", "392", 2026),
  shot("stellisee-zermatt", "Stellisee, above Zermatt", "756", 2025),
  shot("maeklong-railway-market", "Maeklong Railway Market", "764", 2026),
  shot("leadenhall-market", "Leadenhall Market, London", "826", 2025),
  shot("taipei-at-night", "Taipei from Elephant Mountain", "158", 2026),
  shot("ninh-binh", "Tràng An, Ninh Bình", "704", 2026),
  shot("brooklyn-bridge", "Brooklyn Bridge, New York", "840", 2024),
  shot("mount-fuji", "Mount Fuji", "392"),
  shot("st-marks-venice", "St Mark's Basilica, Venice", "380", 2025),
  shot("hanoi-train-street", "Train Street, Hanoi", "704", 2026),
  shot("oxford", "Oxford", "826", 2025),
  shot("rochers-de-naye", "Rochers de Naye", "756", 2025),
  shot("jiufen", "Jiufen", "158", 2026),
  shot("ayutthaya", "Ayutthaya, with a travel companion", "764", 2026),
  shot("tower-bridge", "Tower Bridge, London", "826", 2025),
  shot("kamakura-daibutsu", "The Great Buddha, Kamakura", "392"),
];

/* ------------------------------------------------------------------ books */

const cover = import.meta.glob<string>("../assets/books/*.jpg", { eager: true, query: "?url", import: "default" });
export interface Book { title: string; author: string; cover: string; why: string }
const book = (file: string, title: string, author: string, why: string): Book => ({ title, author, cover: cover[`../assets/books/${file}.jpg`], why });

export const BOOKS: Book[] = [
  book("kafka-on-the-shore", "Kafka on the Shore", "Haruki Murakami",
    "Murakami is probably my favourite author of all time. Reading his books makes me realize that you don't need to understand everything, all the time: simply experiencing the moment is enough. I talked about him for 20 seconds [in a YouTube video once](https://youtu.be/MPC2psjfJ0E?t=285), but I've written entire essays (for fun) about these books, and I could talk about them for hours."),
  book("three-body-problem", "The Three-Body Problem", "Cixin Liu",
    "Cixin Liu made me think existentially about science, discovery, and the future of humanity. This was an amazing series to nerd out over. The way he intertwines science, politics, psychology, game theory, and virtually every other field, chronicled over hundreds and thousands of years, made me appreciate (and fear) humanity's progress as a collective team effort."),
  book("lord-of-the-rings", "The Lord of the Rings", "J.R.R. Tolkien",
    "What else can I say? I've never read any other author whose worlds are as rich as the ones Tolkien builds. It's almost overwhelming, and yet there's so much beauty and depth behind every tree, every meadow, every river, every creature. If you want to get lost in an adventure, this is it."),
  book("dune", "Dune", "Frank Herbert",
    "I don't know why this book resonated with me, but it did. The universe in Dune is a massive one, with hundreds of thousands of years of history, enriched with unbelievably complex factions, cultures, and character dynamics. And yet Dune focuses on a specific story, about a specific character, on a specific planet. It's a bit surreal to think about how the actions of the characters on this one planet have the power to affect an entire galaxy, and I think Paul Atreides, the center of it all, realizes this. I think we all feel like Paul Atreides sometimes."),
  book("exhalation", "Exhalation", "Ted Chiang",
    "Every single one of Ted Chiang's stories explores the effects that knowledge, science, and technology have on the human psyche. Chiang has a way of tearing into the raw cores of metaphysical concepts (mortality, spirituality, truth, the flow of time) through such concise and simple stories."),
];
