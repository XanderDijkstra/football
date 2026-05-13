export interface BlogPost {
  slug: string;
  title: string;
  lede: string;
  date: string;
  readMinutes: number;
  body: string;
  related: {
    stadiums: string[];
    clubs: string[];
    posts: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-stadiums-to-visit-in-europe",
    title: "Twelve stadiums worth a flight",
    lede:
      "A working list of European grounds where the architecture, the atmosphere and the surrounding city all repay the trip.",
    date: "2026-04-22",
    readMinutes: 9,
    body:
      "Plenty of grounds are great on television and forgettable in person. A few are the opposite — buildings that only make sense when you walk up to them, climb the concourse, and look down at the pitch from the top tier. This list is twelve of the latter. It's not a ranking; it's a sequence you could plausibly do across a long weekend, given the right fixtures.",
    related: {
      stadiums: ["camp-nou", "santiago-bernabeu", "anfield"],
      clubs: ["barcelona", "real-madrid", "liverpool"],
      posts: ["anatomy-of-the-modern-stand", "gift-guide-football-fan"],
    },
  },
  {
    slug: "anatomy-of-the-modern-stand",
    title: "Anatomy of the modern stand",
    lede:
      "What changed when stadiums stopped being built around running tracks: a short history of how the modern football stand was designed.",
    date: "2026-03-15",
    readMinutes: 7,
    body:
      "For most of the twentieth century, European football grounds were laid out the same way: a running track around the pitch, four flat stands set back behind it. The Heysel and Hillsborough disasters and the Italia '90 World Cup combined to break that model. What followed — single-tier south stands, retractable roofs, microbreweries under the seats — is the result of three decades of design competition between Populous, Arup, GMP, and a handful of others.",
    related: {
      stadiums: ["tottenham-hotspur-stadium", "santiago-bernabeu", "etihad-stadium"],
      clubs: ["tottenham", "real-madrid", "manchester-city"],
      posts: ["best-stadiums-to-visit-in-europe", "what-makes-a-good-print"],
    },
  },
  {
    slug: "gift-guide-football-fan",
    title: "Gift guide: football fans who already own everything",
    lede:
      "A short, opinionated list for people whose drawer is already full of scarves. Mostly books, a couple of prints, one record.",
    date: "2026-02-08",
    readMinutes: 5,
    body:
      "The problem with buying a gift for a serious football fan is that they have already bought themselves everything obvious. Scarves, retro shirts, season tickets — sorted. What's left is the third tier of taste: books, prints, well-designed objects that earn a permanent spot on a desk or a wall. This guide is a list of nine of those.",
    related: {
      stadiums: ["anfield", "old-trafford", "emirates-stadium"],
      clubs: ["liverpool", "manchester-united", "arsenal"],
      posts: ["best-stadiums-to-visit-in-europe", "what-makes-a-good-print"],
    },
  },
  {
    slug: "what-makes-a-good-print",
    title: "What makes a good framed print",
    lede:
      "Paper weight, matte vs gloss, the right frame profile, where to hang it. Notes from making a few thousand of them.",
    date: "2026-01-29",
    readMinutes: 6,
    body:
      "We make framed map prints of football stadiums. After enough of them you start to learn what makes a print sit on a wall well and what makes it look like it came from an airport. This is a short, practical guide — most of it transferable to any framed print, not just ours.",
    related: {
      stadiums: ["anfield", "camp-nou"],
      clubs: ["liverpool", "barcelona"],
      posts: ["anatomy-of-the-modern-stand", "gift-guide-football-fan"],
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
