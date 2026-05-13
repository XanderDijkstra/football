export interface Club {
  slug: string;
  name: string;
  stadiumSlug: string;
  city: { name: string; slug: string };
  country: string;
  founded: number;
  nickname?: string;
  intro: string;
  about: string;
  faqs: { q: string; a: string }[];
  related: string[];
}

function clubFaqs(club: string, stadium: string): { q: string; a: string }[] {
  return [
    {
      q: `Do you sell ${club} prints?`,
      a: `We sell framed map prints of ${stadium}. The print is centred on the ground, picking out the streets and architecture around it.`,
    },
    {
      q: "Are crests or kits used in the design?",
      a: `No. ${club} crests, kits and other registered marks are not used. The print works through architecture and location.`,
    },
    {
      q: "How long does delivery take?",
      a: "UK delivery 5–7 working days. EU delivery 7–10 working days. Tracked from dispatch.",
    },
    {
      q: "Can I personalise the print as a gift?",
      a: "Yes. Add a date, score or recipient name to the bottom of the map in the builder.",
    },
  ];
}

export const clubs: Club[] = [
  {
    slug: "liverpool",
    name: "Liverpool FC",
    stadiumSlug: "anfield",
    city: { name: "Liverpool", slug: "liverpool" },
    country: "England",
    founded: 1892,
    nickname: "The Reds",
    intro:
      "Founded in 1892 by John Houlding after a dispute with Everton, Liverpool have played at Anfield ever since. Six European Cups, nineteen league titles.",
    about:
      "Liverpool play at Anfield, in the L4 postcode just north of Stanley Park. The club was formed when Houlding lost control of Everton and the ground, and decided to start a new team to play in his stadium. The Kop end has been the spiritual centre of English football's most theatrical support since the 1920s.",
    faqs: clubFaqs("Liverpool FC", "Anfield"),
    related: ["manchester-united", "arsenal", "chelsea", "manchester-city"],
  },
  {
    slug: "manchester-united",
    name: "Manchester United",
    stadiumSlug: "old-trafford",
    city: { name: "Manchester", slug: "manchester" },
    country: "England",
    founded: 1878,
    nickname: "The Red Devils",
    intro:
      "Originally Newton Heath LYR FC, renamed in 1902. Twenty league titles, three European Cups, ninety years at Old Trafford.",
    about:
      "United began in 1878 as the works team of the Lancashire and Yorkshire Railway depot in Newton Heath. The club nearly folded in 1902 before being bought out and renamed. Old Trafford has been home since 1910, save for the four years after wartime bombing when United played at Maine Road.",
    faqs: clubFaqs("Manchester United", "Old Trafford"),
    related: ["manchester-city", "liverpool", "arsenal", "chelsea"],
  },
  {
    slug: "manchester-city",
    name: "Manchester City",
    stadiumSlug: "etihad-stadium",
    city: { name: "Manchester", slug: "manchester" },
    country: "England",
    founded: 1880,
    nickname: "City",
    intro:
      "Formed as St Mark's (West Gorton) in 1880. At the Etihad since 2003, the dominant English side of the last decade.",
    about:
      "City's roots go back to a church team in Gorton, east Manchester. They moved through several grounds before settling at Maine Road in 1923 and finally to the City of Manchester Stadium — now the Etihad — in 2003. The Sheikh Mansour era began in 2008.",
    faqs: clubFaqs("Manchester City", "the Etihad"),
    related: ["manchester-united", "liverpool", "arsenal", "chelsea"],
  },
  {
    slug: "arsenal",
    name: "Arsenal",
    stadiumSlug: "emirates-stadium",
    city: { name: "London", slug: "london" },
    country: "England",
    founded: 1886,
    nickname: "The Gunners",
    intro:
      "Founded by workers at the Royal Arsenal in Woolwich, moved to Highbury in 1913, to the Emirates in 2006. Thirteen league titles.",
    about:
      "Arsenal began south of the Thames before Henry Norris moved them to Highbury in 1913, a decision that still shapes English football's geography. The Emirates Stadium opened in 2006 a short walk from the old Highbury site, which has since been converted into apartments.",
    faqs: clubFaqs("Arsenal", "the Emirates"),
    related: ["tottenham", "chelsea", "liverpool", "manchester-united"],
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    stadiumSlug: "stamford-bridge",
    city: { name: "London", slug: "london" },
    country: "England",
    founded: 1905,
    nickname: "The Blues",
    intro:
      "Founded specifically to fill Stamford Bridge in 1905. Two Champions Leagues, six Premier League titles.",
    about:
      "Chelsea were created when Fulham declined to take on the lease at Stamford Bridge and Gus Mears, the ground's owner, founded a new club instead. They have played there continuously since, save for the year at Wembley during the COVID lockdown season.",
    faqs: clubFaqs("Chelsea", "Stamford Bridge"),
    related: ["arsenal", "tottenham", "liverpool", "manchester-united"],
  },
  {
    slug: "tottenham",
    name: "Tottenham Hotspur",
    stadiumSlug: "tottenham-hotspur-stadium",
    city: { name: "London", slug: "london" },
    country: "England",
    founded: 1882,
    nickname: "Spurs",
    intro:
      "Founded by schoolboys from the All Hallows Church cricket team in 1882. At White Hart Lane, then the rebuilt Tottenham Hotspur Stadium since 2019.",
    about:
      "Spurs are one of the oldest clubs in London. White Hart Lane was their home from 1899 until 2017, when they spent a season at Wembley while the current ground was built on the same footprint. The new stadium is now the largest in London.",
    faqs: clubFaqs("Tottenham Hotspur", "the Tottenham Hotspur Stadium"),
    related: ["arsenal", "chelsea", "liverpool", "manchester-united"],
  },
  {
    slug: "barcelona",
    name: "FC Barcelona",
    stadiumSlug: "camp-nou",
    city: { name: "Barcelona", slug: "barcelona" },
    country: "Spain",
    founded: 1899,
    nickname: "Barça",
    intro:
      "Founded by Joan Gamper in 1899. Five European Cups, twenty-seven La Liga titles. Currently away from Camp Nou while Espai Barça is built.",
    about:
      "Barcelona play at Camp Nou in the Les Corts district. The club is owned by its members — over 140,000 of them — and the ground is mid-redevelopment, with matches being played at the Estadi Olímpic Lluís Companys on Montjuïc in the meantime.",
    faqs: clubFaqs("FC Barcelona", "Camp Nou"),
    related: ["real-madrid", "manchester-united", "liverpool", "arsenal"],
  },
  {
    slug: "real-madrid",
    name: "Real Madrid",
    stadiumSlug: "santiago-bernabeu",
    city: { name: "Madrid", slug: "madrid" },
    country: "Spain",
    founded: 1902,
    nickname: "Los Blancos",
    intro:
      "Fifteen European Cups, the most successful club in football. At the Bernabéu since 1947.",
    about:
      "Real Madrid have played at the Santiago Bernabéu in the Chamartín district since 1947. The 2019–24 redevelopment wrapped the bowl in a steel exoskeleton and added a retractable roof, turning the ground into a year-round venue.",
    faqs: clubFaqs("Real Madrid", "the Bernabéu"),
    related: ["barcelona", "manchester-united", "liverpool", "arsenal"],
  },
];

export function getClub(slug: string): Club | undefined {
  return clubs.find((c) => c.slug === slug);
}

export function getClubsByCity(citySlug: string): Club[] {
  return clubs.filter((c) => c.city.slug === citySlug);
}
