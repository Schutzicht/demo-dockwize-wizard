// Vergaderruimtes / faciliteiten van Dockwize (demo-content, op de echte site geënt).
export interface Facility {
  slug: string;
  name: string;
  capacity: string; // "Tot 150 personen"
  capacityShort: string; // "Tot 150 personen" badge
  area: string; // "200 m²"
  features: string; // "Wifi, Flipover, Beamer"
  price: string; // "€ 74,- per uur"
  intro: string;
  image: string;
}

export const FACILITIES: Facility[] = [
  {
    slug: 'pzem',
    name: 'PZEM',
    capacity: '1 tot 150 personen',
    capacityShort: 'Tot 150 personen',
    area: '200 m²',
    features: 'Wifi, Flipover, Beamer',
    price: '€ 74,- per uur',
    intro: 'Ontdek de PZEM-zaal: een ruime en veelzijdige zaal voor €74,00 per uur. Ideaal voor workshops, lezingen of andere evenementen tot 150 personen.',
    image: '/images/fac-meetingroom.png',
  },
  {
    slug: 'einstein',
    name: 'Einstein',
    capacity: '1 tot 30 personen',
    capacityShort: 'Tot 30 personen',
    area: '60 m²',
    features: 'Wifi, Scherm, Whiteboard',
    price: '€ 47,40 per uur',
    intro: 'De functionele Einstein-zaal voor €47,40 per uur. Perfect voor vergaderingen, brainstorms en kleinere sessies tot 30 personen.',
    image: '/images/fac-meetingroom.png',
  },
  {
    slug: 'hertz',
    name: 'Hertz',
    capacity: '1 tot 20 personen',
    capacityShort: 'Tot 20 personen',
    area: '45 m²',
    features: 'Wifi, Scherm, Koffie',
    price: '€ 47,40 per uur',
    intro: 'De gezellige Hertz-zaal voor €47,40 per uur. Een huiselijke ruimte voor overleg en kleinere bijeenkomsten tot 20 personen.',
    image: '/images/fac-meetingroom.png',
  },
  {
    slug: 'tesla',
    name: 'Tesla',
    capacity: '1 tot 50 personen',
    capacityShort: 'Tot 50 personen',
    area: '90 m²',
    features: 'Wifi, Beamer, Flipover',
    price: '€ 74,- per uur',
    intro: 'De Tesla-zaal voor €74,00 per uur. Ruimte en flexibele opstelling voor workshops en presentaties tot 50 personen.',
    image: '/images/fac-meetingroom.png',
  },
  {
    slug: 'newton',
    name: 'Newton',
    capacity: '1 tot 40 personen',
    capacityShort: 'Tot 40 personen',
    area: '80 m²',
    features: 'Wifi, Scherm, Beamer',
    price: '€ 74,- per uur',
    intro: 'De Newton-zaal voor €74,00 per uur. Een lichte ruimte voor trainingen en teamsessies tot 40 personen.',
    image: '/images/fac-meetingroom.png',
  },
  {
    slug: 'curie',
    name: 'Curie',
    capacity: '1 tot 150 personen',
    capacityShort: 'Tot 150 personen',
    area: '180 m²',
    features: 'Wifi, Podium, Geluid',
    price: '€ 74,- per uur',
    intro: 'De Curie-zaal voor €74,00 per uur. Een ruime zaal met podium voor grote events en bijeenkomsten tot 150 personen.',
    image: '/images/fac-meetingroom.png',
  },
];

export const facilityFaq = [
  { q: 'Kan ik catering bijboeken?', a: 'Ja. Brasserie PZEM 41 verzorgt hoogwaardige catering op maat, van lunchhapjes tot complete buffetten. Geef je wensen door bij de receptie.' },
  { q: 'Is er gratis parkeren?', a: 'Bij Dockwize parkeer je gratis en er is laadpunt voor elektrische auto’s beschikbaar.' },
  { q: 'Hoe boek ik een ruimte?', a: 'Reserveer een zaal eenvoudig online via de zaalpagina, of bel de receptie via +31 (0)6 44 11 41 21.' },
  { q: 'Kan ik een ruimte op maat inrichten?', a: 'Zeker. Vrijwel elke opstelling is mogelijk, van theater tot carré. We denken graag met je mee.' },
  { q: 'Zijn de ruimtes geschikt voor hybride vergaderen?', a: 'Ja, op aanvraag voorzien we de zalen van een meet-up tool voor groepen die hybride vergaderen.' },
];
