export interface StadiumFaq {
  q: string;
  a: string;
}

export interface Stadium {
  slug: string;
  name: string;
  club: { name: string; slug: string };
  city: { name: string; slug: string };
  country: string;
  capacity: number;
  opened: number;
  architect?: string;
  lat: number;
  lng: number;
  intro: string;
  about: string;
  whatsOnMap: string;
  facts: { label: string; value: string }[];
  frameSkus: string[];
  faqs: StadiumFaq[];
  glossaryTerms: string[];
  related: string[];
}

const DEFAULT_FRAME_SKUS = [
  "oak-a3",
  "oak-a2",
  "oak-a1",
  "oak-50x70",
  "black-a3",
  "black-a2",
  "black-a1",
  "black-50x70",
  "white-a3",
  "white-a2",
  "white-a1",
  "white-50x70",
];

function commonFaqs(stadiumName: string, club: string): StadiumFaq[] {
  return [
    {
      q: "What size should I choose?",
      a: `A3 looks best above a desk or in a hallway. A2 is the most popular size for living rooms. A1 needs a wall to itself. 50×70 cm sits between A2 and A1 and works well as a pair.`,
    },
    {
      q: `Is the ${stadiumName} print officially licensed?`,
      a: `No. Our prints reference ${stadiumName} by its location and architecture. We don't use ${club} crests, kits or other registered trademarks.`,
    },
    {
      q: "How long does delivery take?",
      a: "Made on demand and framed in the UK. UK delivery is 5–7 working days. EU delivery is 7–10 working days. Tracked from dispatch.",
    },
    {
      q: "Can I personalise the print?",
      a: "Yes. In the builder you can add a custom line of text below the map — a date, a scoreline, or the name of the person you're gifting it to.",
    },
  ];
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
    architect: "Archibald Leitch (original), KSS Group (Main Stand redevelopment)",
    lat: 53.4308,
    lng: -2.9608,
    intro:
      "Liverpool's home since 1892 and the loudest ground in English football on a European night. The Kop end runs the length of the south side.",
    about:
      "Anfield opened in 1884 as Everton's home before Liverpool moved in eight years later. The Spion Kop, named after a hill in the second Boer War, was rebuilt as a single-tier stand in 1928 and is still the spiritual centre of the ground. The Main Stand redevelopment in 2016 lifted the capacity to over 54,000; a second phase on the Anfield Road End took it past 61,000 in 2023. The pitch is laid east-west, hemmed in by Anfield Road, Walton Breck Road, and the terraced streets of L4.",
    whatsOnMap:
      "The print shows Anfield at the centre, with Stanley Park to the north, the rows of terraced housing along Anfield Road, Skerries Road and Lothair Road picked out in fine line, and the green of Stanley Park West reaching up to the top edge. The river Mersey is not in frame; the focus is the streets within a 600 m radius of the ground.",
    facts: [
      { label: "Capacity", value: "61,276" },
      { label: "Opened", value: "1884" },
      { label: "Home of", value: "Liverpool FC" },
      { label: "Coordinates", value: "53.4308° N, 2.9608° W" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("Anfield", "Liverpool FC"),
    glossaryTerms: ["kop"],
    related: ["old-trafford", "etihad-stadium", "emirates-stadium", "stamford-bridge"],
  },
  {
    slug: "old-trafford",
    name: "Old Trafford",
    club: { name: "Manchester United", slug: "manchester-united" },
    city: { name: "Manchester", slug: "manchester" },
    country: "England",
    capacity: 74310,
    opened: 1910,
    architect: "Archibald Leitch",
    lat: 53.4631,
    lng: -2.2913,
    intro:
      "The largest club ground in the UK. United have played here since 1910; the Stretford End is the noisiest corner.",
    about:
      "Old Trafford was designed by the Glaswegian engineer Archibald Leitch and opened in February 1910 with a 3–4 defeat to Liverpool. The ground was bombed in 1941 and rebuilt over the following eight years. Successive expansions — the cantilever roof in 1965, the second tier on the Stretford End in 2000, the quadrants in 2006 — pushed the capacity past 74,000. United have played at Old Trafford continuously since 1910, save for the four-year wartime exile to Maine Road.",
    whatsOnMap:
      "The ground sits at the centre, with the Bridgewater Canal and the railway lines to Manchester Piccadilly running along the eastern edge. Sir Matt Busby Way, the warehouses around Wharfside Way, and the bowl of Lancashire County Cricket Club's Emirates Old Trafford to the north-west are all picked out in detail.",
    facts: [
      { label: "Capacity", value: "74,310" },
      { label: "Opened", value: "1910" },
      { label: "Home of", value: "Manchester United" },
      { label: "Coordinates", value: "53.4631° N, 2.2913° W" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("Old Trafford", "Manchester United"),
    glossaryTerms: ["stretford-end"],
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
    architect: "Arup Sport",
    lat: 53.4831,
    lng: -2.2004,
    intro:
      "Built for the 2002 Commonwealth Games and reshaped for City's title-winning era. The bowl sits inside the regenerated east Manchester campus.",
    about:
      "The Etihad began life as the City of Manchester Stadium, hosting the 2002 Commonwealth Games before being reconfigured for football and handed to Manchester City on a 250-year lease. Arup's design suspends the cable-stayed roof from twelve masts, giving the upper concourse an open, airy feel. The third tier on the South Stand was added in 2015. A further expansion of the North Stand, plus a new hotel and arena across the campus, has been under way since 2023.",
    whatsOnMap:
      "The stadium sits at the heart of the Etihad Campus. The Manchester Velodrome, the Etihad's training ground, the Co-op Live arena footprint and the river Medlock are all picked out, along with the A6010 and the Ashton New Road that thread past the ground.",
    facts: [
      { label: "Capacity", value: "53,400" },
      { label: "Opened", value: "2002" },
      { label: "Home of", value: "Manchester City" },
      { label: "Coordinates", value: "53.4831° N, 2.2004° W" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("the Etihad", "Manchester City"),
    glossaryTerms: [],
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
    architect: "Populous (HOK Sport)",
    lat: 51.5549,
    lng: -0.1084,
    intro:
      "Arsenal's home since 2006. A clean, oval bowl in Holloway with the Clock End preserved from Highbury in spirit.",
    about:
      "Arsenal moved from Highbury to the Emirates in the summer of 2006, ending 93 years at the old ground. Populous designed an oval bowl with four tiers — lower, club, executive and upper — and a fully cantilevered roof. The Clock End and the North Bank retained their names from Highbury. Highbury itself was redeveloped into apartments; the East and West Stand façades survive. Capacity at the Emirates is 60,704, second only to Tottenham in London.",
    whatsOnMap:
      "The print is centred on the bowl with the Drayton Park railway line running along the western edge. Highbury Square — the residential conversion of the old ground — sits a short walk south. The Holloway Road and Hornsey Road that bracket the stadium are picked out, along with the Arsenal Underground station.",
    facts: [
      { label: "Capacity", value: "60,704" },
      { label: "Opened", value: "2006" },
      { label: "Home of", value: "Arsenal" },
      { label: "Coordinates", value: "51.5549° N, 0.1084° W" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("the Emirates", "Arsenal"),
    glossaryTerms: ["clock-end"],
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
    architect: "Archibald Leitch (1905 redesign)",
    lat: 51.4817,
    lng: -0.191,
    intro:
      "Tucked behind the Fulham Road in west London. Chelsea have played here since 1905; the Shed End sits at the south.",
    about:
      "Stamford Bridge opened in 1877 as the home of the London Athletic Club. When Fulham declined to take it on as a football ground in 1905, the owners founded Chelsea Football Club specifically to fill it. Archibald Leitch redesigned the bowl that year. The current ground is the result of a piecemeal rebuild between 1994 and 2001, the East Stand having been retained from an earlier 1970s redevelopment. Capacity sits a little above 40,000, making it the smallest of the London \"big six\" grounds.",
    whatsOnMap:
      "The print sits between Fulham Road to the east and the West London railway line. Brompton Cemetery, Earl's Court and the streets of west Brompton are all picked out. The Shed End at the south, the Matthew Harding Stand at the north, and the Bridge Hotel inside the West Stand are visible from above.",
    facts: [
      { label: "Capacity", value: "40,173" },
      { label: "Opened", value: "1877" },
      { label: "Home of", value: "Chelsea" },
      { label: "Coordinates", value: "51.4817° N, 0.1910° W" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("Stamford Bridge", "Chelsea"),
    glossaryTerms: ["shed-end"],
    related: ["emirates-stadium", "tottenham-hotspur-stadium", "anfield", "old-trafford"],
  },
  {
    slug: "tottenham-hotspur-stadium",
    name: "Tottenham Hotspur Stadium",
    club: { name: "Tottenham Hotspur", slug: "tottenham" },
    city: { name: "London", slug: "london" },
    country: "England",
    capacity: 62850,
    opened: 2019,
    architect: "Populous",
    lat: 51.6043,
    lng: -0.0664,
    intro:
      "The most ambitious stadium build in English football. A retractable pitch, a 17,500-seat South Stand, and a microbrewery underneath.",
    about:
      "Spurs opened their new ground in April 2019 after a season at Wembley. Populous designed the stand geometry to maximise atmosphere: the single-tier South Stand holds 17,500, the largest in the UK. Underneath the football pitch sits an artificial NFL surface that slides out on three trays. There's a microbrewery in the South Stand concourse, a clear glass-walled tunnel for the players, and a skywalk along the roof. Capacity is 62,850.",
    whatsOnMap:
      "The ground sits at the south end of Tottenham High Road. The print picks out White Hart Lane railway station, the Paxton Road and Park Lane on the north and south sides, and the residential streets that run east towards Northumberland Park.",
    facts: [
      { label: "Capacity", value: "62,850" },
      { label: "Opened", value: "2019" },
      { label: "Home of", value: "Tottenham Hotspur" },
      { label: "Coordinates", value: "51.6043° N, 0.0664° W" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("the Tottenham Hotspur Stadium", "Tottenham Hotspur"),
    glossaryTerms: [],
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
    architect: "Francesc Mitjans, Josep Soteras, Lorenzo García Barbón",
    lat: 41.3809,
    lng: 2.1228,
    intro:
      "Europe's largest stadium, currently mid-renovation under the Espai Barça project. Home of Barcelona since 1957.",
    about:
      "Camp Nou opened in September 1957 with a friendly against Warsaw's Legia. The bowl was expanded for the 1982 World Cup, taking capacity past 100,000. The current Espai Barça renovation, designed by Nikken Sekkei and Pascual i Ausió, will leave a 105,000-seat bowl with a fully covered roof when finished. Until the work is done, Barcelona are playing at the Estadi Olímpic Lluís Companys on Montjuïc.",
    whatsOnMap:
      "The print picks out Camp Nou in Les Corts, with Avinguda de Joan XXIII and Travessera de les Corts framing the stadium. The Mini Estadi (now under redevelopment), the FC Barcelona offices, and the streets running north towards Pedralbes are all in frame.",
    facts: [
      { label: "Capacity", value: "99,354" },
      { label: "Opened", value: "1957" },
      { label: "Home of", value: "FC Barcelona" },
      { label: "Coordinates", value: "41.3809° N, 2.1228° E" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("Camp Nou", "FC Barcelona"),
    glossaryTerms: [],
    related: ["santiago-bernabeu", "allianz-arena", "san-siro", "anfield"],
  },
  {
    slug: "santiago-bernabeu",
    name: "Santiago Bernabéu",
    club: { name: "Real Madrid", slug: "real-madrid" },
    city: { name: "Madrid", slug: "madrid" },
    country: "Spain",
    capacity: 78297,
    opened: 1947,
    architect: "Manuel Muñoz Monasterio, Luis Alemany Soler (original); GMP Architekten (2024 reskin)",
    lat: 40.4531,
    lng: -3.6884,
    intro:
      "Real Madrid's home in the Chamartín district. The 2024 reskin gave it a retractable roof, a steel exoskeleton, and a slide-out pitch.",
    about:
      "The Bernabéu opened in December 1947 and has been progressively rebuilt ever since. The 2019–24 redevelopment, led by GMP Architekten and L35, wrapped the bowl in a metallic exoskeleton, added a retractable roof, and installed a hidden pitch storage system below ground that lets the venue switch between football and concerts in hours. Capacity is 78,297.",
    whatsOnMap:
      "The print is centred on the Paseo de la Castellana, with the new exoskeleton picked out. Plaza de Lima, the Torre Picasso and the AZCA business district to the south, the Chamartín railway station to the north, and the streets of the Chamartín neighbourhood frame the ground.",
    facts: [
      { label: "Capacity", value: "78,297" },
      { label: "Opened", value: "1947" },
      { label: "Home of", value: "Real Madrid" },
      { label: "Coordinates", value: "40.4531° N, 3.6884° W" },
    ],
    frameSkus: DEFAULT_FRAME_SKUS,
    faqs: commonFaqs("the Bernabéu", "Real Madrid"),
    glossaryTerms: [],
    related: ["camp-nou", "allianz-arena", "san-siro", "parc-des-princes"],
  },
];

export function getStadium(slug: string): Stadium | undefined {
  return stadiums.find((s) => s.slug === slug);
}

export function getStadiumsByCity(citySlug: string): Stadium[] {
  return stadiums.filter((s) => s.city.slug === citySlug);
}

export function getStadiumsByClub(clubSlug: string): Stadium[] {
  return stadiums.filter((s) => s.club.slug === clubSlug);
}
