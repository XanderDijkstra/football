export interface City {
  slug: string;
  name: string;
  country: string;
  intro: string;
  about: string;
  stadiumSlugs: string[];
  clubSlugs: string[];
}

export const cities: City[] = [
  {
    slug: "london",
    name: "London",
    country: "England",
    intro:
      "Six clubs in the top flight, five purpose-built modern grounds, and the cradle of the modern game. London has more elite stadiums than any city in Europe.",
    about:
      "From Stamford Bridge in the west to the Tottenham Hotspur Stadium in the north, London's football geography splits along the Thames and the railway lines that carve up the city. The Emirates and the Tottenham Hotspur Stadium sit a few miles apart in north London; Stamford Bridge and Craven Cottage face each other across south-west Fulham.",
    stadiumSlugs: ["emirates-stadium", "stamford-bridge", "tottenham-hotspur-stadium"],
    clubSlugs: ["arsenal", "chelsea", "tottenham"],
  },
  {
    slug: "manchester",
    name: "Manchester",
    country: "England",
    intro:
      "Two clubs, six miles apart, with arguably the two most influential stadiums in modern English football. The east and west of the city draw the dividing line.",
    about:
      "Old Trafford sits in Trafford, on the south bank of the Manchester Ship Canal. The Etihad sits in east Manchester, the centrepiece of the regenerated SportCity campus. The Mancunian Way is the most direct route between them.",
    stadiumSlugs: ["old-trafford", "etihad-stadium"],
    clubSlugs: ["manchester-united", "manchester-city"],
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    country: "England",
    intro:
      "Two clubs, separated by Stanley Park. Anfield and Goodison face each other across a third of a mile of grass.",
    about:
      "Anfield sits in the L4 postcode, just north of Stanley Park. Goodison — Everton's historic home before the move to the new Bramley-Moore Dock ground — is on the other side of the park. The L4 streets are pure terraced housing, the football grounds the largest structures for a mile in any direction.",
    stadiumSlugs: ["anfield"],
    clubSlugs: ["liverpool"],
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    country: "Spain",
    intro:
      "Camp Nou in Les Corts, Espanyol's RCDE Stadium out in Cornellà. The city is mid-renovation as Barça's home is rebuilt.",
    about:
      "Camp Nou is in Les Corts, a quiet district in the west of the city, framed by the Diagonal and the streets that climb up towards Pedralbes. Until the Espai Barça work is done, Barcelona are playing on Montjuïc.",
    stadiumSlugs: ["camp-nou"],
    clubSlugs: ["barcelona"],
  },
  {
    slug: "madrid",
    name: "Madrid",
    country: "Spain",
    intro:
      "Real Madrid at the Bernabéu in Chamartín, Atlético at the Metropolitano out in the east. Two of the great stadium designs of the last decade.",
    about:
      "The Bernabéu sits on the Paseo de la Castellana, the city's central axis. The 2024 reskin turned it into a steel-clad event venue with a retractable roof. The Cívitas Metropolitano, Atlético's home since 2017, sits in San Blas-Canillejas, east of the city centre.",
    stadiumSlugs: ["santiago-bernabeu"],
    clubSlugs: ["real-madrid"],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
