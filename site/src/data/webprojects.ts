// 7 web project — port NGUYÊN VĂN từ 126verse.com (/projects/02 → 02-6)
export interface WebProject {
  slug: string;
  name: string;
  desc: string;
  card: string; // mô tả ngắn trên card showcase
  img: string;
  iframe: string;
  durationTitle: string;
  durationText: string;
  didLabel: string;
  did: string[];
  costTitle: string;
  costText: string;
  outcomeTitle: string;
  outcomeText: string;
  year: string;
}

const A = (f: string) => '/img/a/' + f;

export const webProjects: WebProject[] = [
  {
    slug: 'newtown-products',
    name: 'NEWTOWN PRODUCTS',
    card: 'Total Digital Transformation for a high-end minimalist design studio.',
    desc: 'A digital transformation for NEWTOWN PRODUCTS, evolving their brand identity and online presence to embody timeless design and structural elegance.',
    img: A('s-1231x884_v-fms_webp_c9d174ed-82ab-4aaa-91c1-b4164d885a4c.png'),
    iframe: 'https://preview.studio.site/templates/YnBW2ZZWvG',
    durationTitle: 'Total Duration: 14 Days from confirmed brief to project launch.',
    durationText: 'Our focused, rapid 3-phase approach ensures efficiency and delivery:\n\nPhase 1: Strategy & Concept (4 Days): Defining the brief, brand core, initial mockups, and design approval.\n\nPhase 2: Development & Refinement (7 Days): Building the website (on Studio.design), content loading, and quality assurance.\n\nPhase 3: Launch & Handoff (3 Days): Final testing, client sign-off, and deployment.',
    didLabel: 'What we did',
    did: ['Brand strategy', 'Art direction', 'Web design'],
    costTitle: 'Total Cost',
    costText: 'Cost starts at $1.000 USD. Project costs are custom-quoted based on complexity, primarily varying with the required number of pages and the volume/complexity of images.\nSchedule a clarity call for a precise quote.',
    outcomeTitle: 'Outcome',
    outcomeText: 'The project successfully delivered a cohesive and fully responsive platform, helping NEWTOWN PRODUCTS elevate their image and speak directly to a new generation of design-led buyers.',
    year: '2025',
  },
  {
    slug: 'dance-event-mobi',
    name: 'DANCE EVENT MOBI',
    card: 'A high-energy digital hub for DJs, events, and music communities.',
    desc: 'To establish a captivating and user-friendly online hub for the music and dance community, leveraging the core slogan "DANCE. CONNECT. INSPIRE." The platform serves as the definitive showcase for DJs and event experiences.',
    img: A('s-1120x910_v-fs_webp_d3e11222-f63d-446b-8630-7bdad2ad3568.png'),
    iframe: 'https://preview.studio.site/templates/G4Ra4mzWDM#top',
    durationTitle: 'Total Duration: 8 Days from confirmed brief to project launch.',
    durationText: 'Our ultra-focused, accelerated 3-phase approach ensures efficiency and rapid delivery:\n\nPhase 1: Strategy & Concept (2 Days): Defining the brief, brand core, initial mockups, and swift design approval.\n\nPhase 2: Development & Refinement (5 Days): Building the website (on Studio.design), integrating media, content loading, and quality assurance.\n\nPhase 3: Launch & Handoff (1 Day): Final testing, client sign-off, and rapid deployment.',
    didLabel: 'What we did',
    did: ['Brand strategy', 'Art direction', 'Web design'],
    costTitle: 'Total Cost',
    costText: 'Cost starts at $1.000 USD. Project costs are custom-quoted based on complexity, primarily varying with the required number of pages and the volume/complexity of images.\nSchedule a clarity call for a precise quote.',
    outcomeTitle: 'Outcome',
    outcomeText: 'The project successfully delivered a cohesive and fully responsive platform, helping DANCE EVENT MOBI attract a dynamic audience, elevate their event presentation, and clearly communicate their high-energy brand identity.',
    year: '2025',
  },
  {
    slug: 'munch-pizza',
    name: 'Munch PIZZA',
    card: 'Optimizing their brand identity and online ordering experience for immediate consumer engagement.',
    desc: "To translate Munch PIZZA's vibrant, authentic New York-style brand into a mobile-first, high-conversion web platform. The focus was on engaging visuals and a streamlined user journey to encourage ordering.",
    img: A('s-378x441_webp_4317a763-1985-4b06-8012-42cb099036f6.png'),
    iframe: 'https://preview.studio.site/templates/ZmoWv5ga6y',
    durationTitle: 'Total Duration: 8 Days from confirmed brief to project launch.',
    durationText: 'Our accelerated 3-phase approach ensures focused efficiency and rapid market entry:\n\nPhase 1: Strategy & Concept (2 Days): Defining the brief, clarifying brand voice, visual goals, and finalizing content structure.\n\nPhase 2: Development & Refinement (5 Days): Building the website (on Studio.design), integrating high-quality food photography, and implementing a cohesive Mobile-First design.\n\nPhase 3: Launch & Handoff (1 Day): Final Q/A, client sign-off, and rapid deployment.',
    didLabel: 'What we did',
    did: ['Brand strategy', 'Art direction', 'Web design'],
    costTitle: 'Total Cost',
    costText: 'Cost starts at $1.600. Project costs are custom-quoted based on complexity, primarily varying with the required number of pages and the volume/complexity of images (food photography optimization).\nSchedule a clarity call for a precise quote.',
    outcomeTitle: 'Outcome',
    outcomeText: "The project successfully delivered a bold, fully responsive, and visually cohesive platform. The design achieves high mobile engagement, effectively communicating the brand's authentic taste and driving online orders.",
    year: '2025',
  },
  {
    slug: 'first-event',
    name: 'FIRST EVENT',
    card: "A premium digital platform built for INNOVATION CONFERENCE 2026, designed to reflect the event's forward-thinking theme, dynamic energy, and professional stature.",
    desc: 'To create a visually arresting and highly functional website using a Dark Mode aesthetic, leveraging vibrant neon colors and professional imagery to effectively showcase speakers, schedule, and registration details for a high-profile technology conference.',
    img: A('s-433x313_webp_b0ae51d2-c79e-4e36-9146-ab785d7cc486.png'),
    iframe: 'https://preview.studio.site/templates/RbrqEgnW4l#ticket',
    durationTitle: 'Total Duration: 10 Days from confirmed brief to project launch.',
    durationText: "Our ultra-focused, accelerated 3-phase approach ensures efficiency and rapid delivery:\n\nPhase 1: Strategy & Concept (2 Days): Defining the event's digital goals, visual hierarchy, and securing quick approval for the Dark Mode concept.\n\nPhase 2: Development & Refinement (5 Days): Building the website (on Studio.design), integrating event schedules, speaker profiles, map functionality, and quality assurance.\n\nPhase 3: Launch & Handoff (1 Day): Final testing, client sign-off, and rapid deployment for registration opening.",
    didLabel: 'What we did',
    did: ['Brand strategy', 'Art direction', 'Web design'],
    costTitle: 'Total Cost',
    costText: 'Cost starts at $1.000. Project costs are custom-quoted based on complexity, primarily varying with the required number of pages (e.g., Speaker details, Schedule, Map) and the volume/complexity of images (professional photography optimization).\nSchedule a clarity call for a precise quote.',
    outcomeTitle: 'Outcome',
    outcomeText: "The project successfully delivered a bold, high-performance platform that perfectly captures the event's innovative spirit. The cohesive Dark Mode design enhances user engagement, streamlines the registration process, and successfully positions the conference as a premier industry gathering.",
    year: '2025',
  },
  {
    slug: 'simple-market',
    name: 'Simple Market',
    card: 'A clean, minimalist digital platform designed for Simple Market, capturing the warm, community-focused spirit of a local market event and streamlining vendor and visitor engagement.',
    desc: 'To translate the organic and welcoming atmosphere of the Simple Market into a user-friendly website, focusing on program visibility, vendor showcases, and intuitive registration. The aesthetic uses a Light Mode palette with natural imagery.',
    img: A('s-411x332_webp_4cdbb651-200d-4501-a27e-0dbd35f267c4.png'),
    iframe: 'https://preview.studio.site/templates/18dO8VvanG',
    durationTitle: 'Total Duration: 12 Days from confirmed brief to project launch.',
    durationText: "Our structured 3-phase approach is optimized for thoroughness and efficiency:\n\nPhase 1: Strategy & Concept (4 Days): Defining the event's digital goals, information hierarchy, layout for vendor/creator profiles, and achieving design approval.\n\nPhase 2: Development & Refinement (6 Days): Building the website (on Studio.design), integrating program schedules, map and location details, creator profiles, and comprehensive quality assurance.\n\nPhase 3: Launch & Handoff (2 Days): Final content placement, client sign-off, and deployment for public use and registrations.",
    didLabel: 'What we did',
    did: ['Brand strategy', 'Art direction', 'Web design'],
    costTitle: 'Total Cost',
    costText: 'Cost starts at $1.300. Project costs are custom-quoted based on complexity, primarily varying with the required number of pages (e.g., Program details, Vendor/Creator profiles) and the volume/complexity of images (professional photography optimization). Schedule a clarity call for a precise quote.',
    outcomeTitle: 'Outcome',
    outcomeText: "The project successfully delivered a cohesive, highly functional, and aesthetically light platform. The design effectively communicates the market's value to both creators and visitors, streamlining information access and simplifying the registration process.",
    year: '2025',
  },
  {
    slug: 'cron',
    name: 'CRON',
    card: 'A high-end, magazine-style digital platform built for CRON, elevating their brand presence by showcasing curated interior design ideas, product releases, and detailed visual content.',
    desc: 'To establish CRON as an authority in modern interior design. The focus was on creating a clean, visually rich browsing experience that blends e-commerce appeal with lifestyle editorial content, utilizing large hero sections and a cohesive visual grid.',
    img: A('s-506x425_webp_b9dd03a1-d4cd-42d1-b6fe-c8b2c38edf31.png'),
    iframe: 'https://preview.studio.site/templates/bEXawRZqDr',
    durationTitle: 'Total Duration: 16 Days from confirmed brief to project launch.',
    durationText: 'Our structured 3-phase approach is tailored for comprehensive content integration and design excellence:\n\nPhase 1: Strategy & Concept (4 Days): Defining content strategy, module requirements (e.g., product release features, article previews), and finalizing the complex grid layout.\n\nPhase 2: Development & Refinement (10 Days): Building the website (on Studio.design), developing multiple content modules, integrating image galleries, optimizing all high-resolution visuals, and comprehensive quality assurance.\n\nPhase 3: Launch & Handoff (2 Days): Final client review, content publishing (e.g., initial articles and product listings), and rapid deployment.',
    didLabel: 'What we did',
    did: ['Brand strategy', 'Art direction', 'Web design'],
    costTitle: 'Total Cost',
    costText: 'Cost starts at $2.500 . Project costs are custom-quoted based on complexity, primarily varying with the required number of content modules (e.g., product features, blog grids) and the volume/complexity of high-resolution images requiring precise placement and optimization. Schedule a clarity call for a precise quote.',
    outcomeTitle: 'Outcome',
    outcomeText: 'The project successfully delivered a premium, highly aesthetic platform that functions as both a showroom and an editorial hub. The magazine-style presentation enhances product discovery, establishing CRON as a sophisticated and trustworthy source in the competitive interior design market.',
    year: '2025',
  },
  {
    slug: 'riverside',
    name: 'Riverside',
    card: 'A clean, atmospheric digital platform created for Riverside, a boutique hotel near the Sumida River, Tokyo. The design emphasizes tranquility, high-quality aesthetics, and essential visitor information.',
    desc: "To establish Riverside's quiet luxury appeal by using minimalist layout and warm photography to showcase rooms, cafe offerings, and the convenient location. The platform needs to streamline the booking process (implied by the \"BOOK NOW\" CTA).",
    img: A('s-1479x1066_v-fms_webp_bb10ffeb-510a-47dd-a6d5-562fe60a6c96.png'),
    iframe: 'https://preview.studio.site/templates/MG3qbovaJm/',
    durationTitle: 'Total Duration: 10 Days from confirmed brief to project launch.',
    durationText: 'Our structured 3-phase approach is tailored for high-quality visual delivery and focused functionality:\n\nPhase 1: Strategy & Concept (3 Days): Defining the visual mood, information hierarchy (Rooms, Cafe, Location), and ensuring design aligns with the boutique luxury positioning.\n\nPhase 2: Development & Refinement (6 Days): Building the website (on Studio.design), optimizing large, atmospheric imagery, integrating map functionality (Google Maps), establishing clear navigation, and comprehensive quality assurance.\n\nPhase 3: Launch & Handoff (1 Day): Final client review, deployment, and link integration verification (e.g., booking button).',
    didLabel: 'What we did',
    did: ['Brand strategy', 'Art direction', 'Web design'],
    costTitle: 'Total Cost',
    costText: 'Cost starts at $1.100. Project costs are custom-quoted based on complexity, primarily varying with the required number of modules (e.g., Room details, News feed, Map integration) and the volume/complexity of high-resolution images requiring precise placement and optimization.\nSchedule a clarity call for a precise quote.',
    outcomeTitle: 'Outcome',
    outcomeText: "The project successfully delivered a refined, mobile-responsive platform that captures the hotel's serene atmosphere. The clean design effectively communicates key visitor information, simplifying navigation and boosting confidence in the booking decision.",
    year: '2025',
  },
];
