export interface Stadium {
  slug: string;
  name: string;
  club: { name: string; slug: string };
  city: { name: string; slug: string };
  country: string;
  capacity: number;
  opened: number;
  lat: number;
  lng: number;
  intro: string;
  facts: { label: string; value: string }[];
  related: string[];
}

export const stadiums: Stadium[] = [
  {
    slug: "anfield",
    name: "Anfield",
    club: { name: "Liverpool FC", slug: "liverpool" },
    city: { name: "Liverpool", slug: "liverpool" },
    country: "England",
    capacity: 61276,
    opened: 1884,
    lat: 53.4308,
    lng: -2.9608,
    intro:
      "Liverpool's home since 1892 and the loudest ground in English football on a European night. The Kop end runs the length of the south side.",
    facts: [
      { label: "Capacity", value: "61,276" },
      { label: "Opened", value: "1884" },
      { label: "Home of", value: "Liverpool FC" },
    ],
    related: ["old-trafford", "etihad-stadium", "goodison-park", "stamford-bridge"],
  },
  {
    slug: "old-trafford",
    name: "Old Trafford",
    club: { name: "Manchester United", slug: "manchester-united" },
    city: { name: "Manchester", slug: "manchester" },
    country: "England",
    capacity: 74310,
    opened: 1910,
    lat: 53.4631,
    lng: -2.2913,
    intro:
      "The largest club ground in the UK. United have played here since 1910; the Stretford End is the noisiest corner.",
    facts: [
      { label: "Capacity", value: "74,310" },
      { label: "Opened", value: "1910" },
      { label: "Home of", value: "Manchester United" },
    ],
    related: ["etihad-stadium", "anfield", "emirates-stadium", "stamford-bridge"],
  },
  {
    slug: "etihad-stadium",
    name: "Etihad Stadium",
    club: { name: "Manchester City", slug: "manchester-city" },
    city: { name: "Manchester", slug: "manchester" },
    country: "England",
    capacity: 53400,
    opened: 2002,
    lat: 53.4831,
    lng: -2.2004,
    intro:
      "Built for the 2002 Commonwealth Games and reshaped for City's title-winning era. The bowl sits inside the regenerated east Manchester campus.",
    facts: [
      { label: "Capacity", value: "53,400" },
      { label: "Opened", value: "2002" },
      { label: "Home of", value: "Manchester City" },
    ],
    related: ["old-trafford", "emirates-stadium", "tottenham-hotspur-stadium", "anfield"],
  },
  {
    slug: "emirates-stadium",
    name: "Emirates Stadium",
    club: { name: "Arsenal", slug: "arsenal" },
    city: { name: "London", slug: "london" },
    country: "England",
    capacity: 60704,
    opened: 2006,
    lat: 51.5549,
    lng: -0.1084,
    intro:
      "Arsenal's home since 2006. A clean, oval bowl in Holloway with the Clock End preserved from Highbury in spirit.",
    facts: [
      { label: "Capacity", value: "60,704" },
      { label: "Opened", value: "2006" },
      { label: "Home of", value: "Arsenal" },
    ],
    related: ["tottenham-hotspur-stadium", "stamford-bridge", "old-trafford", "anfield"],
  },
  {
    slug: "stamford-bridge",
    name: "Stamford Bridge",
    club: { name: "Chelsea", slug: "chelsea" },
    city: { name: "London", slug: "london" },
    country: "England",
    capacity: 40173,
    opened: 1877,
    lat: 51.4817,
    lng: -0.191,
    intro:
      "Tucked behind the Fulham Road in west London. Chelsea have played here since 1905; the Shed End sits at the south.",
    facts: [
      { label: "Capacity", value: "40,173" },
      { label: "Opened", value: "1877" },
      { label: "Home of", value: "Chelsea" },
    ],
    related: ["emirates-stadium", "tottenham-hotspur-stadium", "anfield", "old-trafford"],
  },
  {
    slug: "tottenham-hotspur-stadium",
    name: "Tottenham Hotspur Stadium",
    club: { name: "Tottenham Hotspur", slug: "tottenham"  },
    city: { name: "London", slug: "london" },
    country: "England",
    capacity: 62850,
    opened: 2019,
    lat: 51.6043,
    lng: -0.0664,
    intro:
      "The most ambitious stadium build in English football. A retractable pitch, a 17,500-seat South Stand, and a microbrewery underneath.",
    facts: [
      { label: "Capacity", value: "62,850" },
      { label: "Opened", value: "2019" },
      { label: "Home of", value: "Tottenham Hotspur" },
    ],
    related: ["emirates-stadium", "stamford-bridge", "etihad-stadium", "old-trafford"],
  },
  {
    slug: "camp-nou",
    name: "Camp Nou",
    club: { name: "FC Barcelona", slug: "barcelona" },
    city: { name: "Barcelona", slug: "barcelona" },
    country: "Spain",
    capacity: 99354,
    opened: 1957,
    lat: 41.3809,
    lng: 2.1228,
    intro:
      "Europe's largest stadium, currently mid-renovation under the Espai Barça project. Home of Barcelona since 1957.",
    facts: [
      { label: "Capacity", value: "99,354" },
      { label: "Opened", value: "1957" },
      { label: "Home of", value: "FC Barcelona" },
    ],
    related: ["santiago-bernabeu", "san-siro", "allianz-arena", "anfield"],
  },
  {
    slug: "santiago-bernabeu",
    name: "Santiago Bernabéu",
    club: { name: "Real Madrid", slug: "real-madrid" },
    city: { name: "Madrid", slug: "madrid" },
    country: "Spain",
    capacity: 78297,
    opened: 1947,
    lat: 40.4531,
    lng: -3.6884,
    intro:
      "Real Madrid's home in the Chamartín district. The 2024 reskin gave it a retractable roof, a steel exoskeleton, and a slide-out pitch.",
    facts: [
      { label: "Capacity", value: "78,297" },
      { label: "Opened", value: "1947" },
      { label: "Home of", value: "Real Madrid" },
    ],
    related: ["camp-nou", "allianz-arena", "san-siro", "parc-des-princes"],
  },
];

export function getStadium(slug: string): Stadium | undefined {
  return stadiums.find((s) => s.slug === slug);
}
