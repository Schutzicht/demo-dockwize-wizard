// Events van Dockwize (demo-content, op de echte site geënt).
export interface DockEvent {
  slug: string;
  title: string;
  type: string; // "Inspiratiesessie", "Kennisfestival"
  day: string; // "30"
  month: string; // "apr"
  dateLong: string; // "30 april 2026"
  time: string; // "16:00 - 19:00"
  location: string; // "Hawayweg 16, Zierikzee"
  organizer: string;
  intro: string;
  image: string;
}

export const EVENTS: DockEvent[] = [
  {
    slug: '3d-printen',
    title: 'Inspiratiesessie: ontdek de kracht van 3D-printen',
    type: 'Inspiratiesessie',
    day: '30', month: 'apr', dateLong: '30 april 2026', time: '16:00 - 19:00',
    location: 'Hawayweg 16, Zierikzee', organizer: 'Roggeerijksgroep',
    intro: 'Kom naar het 3D Café in Innovatiepunt KAAP en ontdek hoe 3D-printen jouw bedrijf helpt om prototypes sneller te ontwikkelen, onderdelen on-demand te produceren en maatwerkoplossingen te maken. Dat bespaart tijd en kosten, verhoogt de flexibiliteit en draagt bij aan een duurzamer productieproces.',
    image: '/images/event-3dprint.jpg',
  },
  { slug: 'kennisfestival-1', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '12', month: 'mei', dateLong: '12 mei 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
  { slug: 'kennisfestival-2', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '21', month: 'mei', dateLong: '21 mei 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
  { slug: 'kennisfestival-3', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '04', month: 'jun', dateLong: '4 juni 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
  { slug: 'kennisfestival-4', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '18', month: 'jun', dateLong: '18 juni 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
  { slug: 'kennisfestival-5', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '02', month: 'jul', dateLong: '2 juli 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
  { slug: 'kennisfestival-6', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '16', month: 'jul', dateLong: '16 juli 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
  { slug: 'kennisfestival-7', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '03', month: 'sep', dateLong: '3 september 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
  { slug: 'kennisfestival-8', title: 'Leven Lang Ontwikkelen Kennisfestival', type: 'Kennisfestival', day: '17', month: 'sep', dateLong: '17 september 2026', time: '10:45 uur, start om 11:00 uur', location: 'Hawayweg 16, Zierikzee', organizer: 'Dockwize', intro: 'Een dag vol kennis, ontmoeting en inspiratie voor ondernemend Zeeland.', image: '/images/hero.jpg' },
];
