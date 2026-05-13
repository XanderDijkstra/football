export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  body: string;
  appearsAt: string[];
  related: string[];
}

export const glossary: GlossaryTerm[] = [
  {
    slug: "kop",
    term: "Kop",
    definition:
      "A single-tier stand behind one goal, named after a hill in the second Boer War. The Spion Kop at Anfield is the original; the term has since spread across English football.",
    body:
      "The Kop takes its name from the Battle of Spion Kop in January 1900, fought during the second Boer War. Some 300 British soldiers, many from Lancashire regiments, died on the hill in a single day. When a new banked terrace was added to the south end of Anfield in 1906, a local journalist named it the Spion Kop in their memory. The name stuck and was adopted by other grounds across England — Birmingham, Sheffield Wednesday, Coventry — though Liverpool's remains the most famous. The current Kop at Anfield is a single-tier all-seater holding 12,390, rebuilt in 1994.",
    appearsAt: ["anfield"],
    related: ["stretford-end", "shed-end", "clock-end"],
  },
  {
    slug: "stretford-end",
    term: "Stretford End",
    definition:
      "The west stand at Old Trafford, traditionally home to Manchester United's most vocal support.",
    body:
      "The Stretford End is the west stand at Old Trafford and the traditional standing-then-singing end for United's hardcore support. Before the Taylor Report mandated all-seater stadiums in the early 1990s, the terrace held over 20,000 standing fans on derby days. The current second tier was added in 2000.",
    appearsAt: ["old-trafford"],
    related: ["kop", "shed-end", "clock-end"],
  },
  {
    slug: "shed-end",
    term: "Shed End",
    definition:
      "The south stand at Stamford Bridge, originally a covered terrace and now an all-seater holding around 6,800.",
    body:
      "The Shed got its name from the corrugated-iron roof that covered part of the original south terrace from the 1930s onwards. The terrace was demolished in 1994 and replaced with an all-seater stand, but the name has survived. It still houses Chelsea's most vocal support.",
    appearsAt: ["stamford-bridge"],
    related: ["kop", "stretford-end", "clock-end"],
  },
  {
    slug: "clock-end",
    term: "Clock End",
    definition:
      "The south stand at the Emirates Stadium, named for the Highbury original and the clock that was preserved during the move.",
    body:
      "The original Clock End was the south stand at Highbury, where a large clock was installed in 1930. When Arsenal moved to the Emirates in 2006, the clock was preserved and reinstalled at the new ground's south stand, which kept the name. The current clock at the Emirates was added in 2010 after a fan campaign.",
    appearsAt: ["emirates-stadium"],
    related: ["kop", "stretford-end", "shed-end"],
  },
  {
    slug: "tifo",
    term: "Tifo",
    definition:
      "A coordinated visual display put up by supporters before a match, usually involving a giant banner, flags, or coloured cards held up across an entire stand.",
    body:
      "Tifo is short for the Italian tifosi — football supporters — and refers to the coordinated displays put up by ultra groups before matches. The largest tifos can cover an entire stand, made from hundreds of individual flags or cards held up in unison. Borussia Dortmund's Südtribüne, Marseille's Virage Sud, and PSG's Auteuil and Boulogne ends produce some of the most ambitious examples.",
    appearsAt: [],
    related: ["curva-nord", "ultras"],
  },
  {
    slug: "curva-nord",
    term: "Curva Nord",
    definition:
      "Italian for \"north curve\" — the curved end of an Italian stadium, traditionally home to the most organised supporter groups.",
    body:
      "Italian football grounds are designed with the running track in mind, leaving the ends as curves rather than flat stands. The Curva Nord and Curva Sud (north and south curves) at venues like the San Siro or the Stadio Olimpico became the home ends for the organised ultra groups. Inter's support sits in the Curva Nord at San Siro; Milan's in the Curva Sud.",
    appearsAt: [],
    related: ["tifo", "ultras"],
  },
  {
    slug: "ultras",
    term: "Ultras",
    definition:
      "Organised supporter groups, originally Italian, known for choreographed displays, sustained singing, and a hardline identity that often sits outside official club channels.",
    body:
      "The ultras movement began in Italy in the late 1960s — the Fossa dei Leoni at Milan in 1968 is often cited as the first organised group. Ultras spread through southern Europe, then north and east. They run tifos, lead the singing, and have a fraught relationship with clubs and authorities; in many countries they sit at the centre of long-running political and legal arguments.",
    appearsAt: [],
    related: ["tifo", "curva-nord"],
  },
  {
    slug: "derby",
    term: "Derby",
    definition:
      "A match between two local rivals. Named after the 12th Earl of Derby's Epsom horse race, the term migrated to football in the late 19th century.",
    body:
      "A derby is a fixture between two clubs from the same city or region. The North West Derby (Liverpool vs Manchester United), the North London Derby (Arsenal vs Tottenham), and El Clásico (Real Madrid vs Barcelona) are among the most heated. The Manchester Derby (City vs United) and the Merseyside Derby (Liverpool vs Everton) are the closest geographically — six and a half miles, and a third of a mile across Stanley Park respectively.",
    appearsAt: [],
    related: ["kop", "stretford-end"],
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossary.find((g) => g.slug === slug);
}
