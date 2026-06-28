// Trang Solutions & Pricing — port NGUYÊN VĂN từ 126verse.com/pricing
const A = (f: string) => '/img/a/' + f;

export const hero = {
  announce: "This month!🎉 we're prioritizing new client onboarding for the North American market,\nwhile continuing to serve other regions with our full support.",
  headlineLines: ['Build a Brand', "That's Seen, Trusted,", 'and Remembered'],
  sub: 'We combine brand strategy, design, and digital execution to help your business look, feel, and perform better online.',
  cta: 'See Our Work',
  marquee: ['Zero Risk Partnership', 'Branding', 'Digital Presence', 'Creative Strategy'],
};

export const why = {
  label: 'Why Choose 126Verse?',
  title: 'Your in-house creative & marketing team for the digital era',
  intro: "We’re not just another marketing agency; we operate like an extension of your team.\nAt 126Verse, we understand the unique challenges of B2B brands and Personal brands: from unclear positioning to weak digital presence.\nOur mission is to help you stand out with a clear identity, a stronger online footprint, and creative systems that actually perform.\n\nThink of us as your in-house design & marketing department, without the overhead.\nWe work alongside your business, aligning every design, campaign, and strategy with your goals, data, and long-term growth vision.",
  values: [
    { t: 'Zero Risk Partnership', x: 'We stand by our work and your peace of mind. If a milestone is delayed by more than 7 working days, you’ll receive a 20% refund, complimentary creative work, or extended support, your choice. That’s how we define trust in every collaboration.' },
    { t: 'Strategic Brand Foundation', x: 'Every strong presence starts with clarity. We craft your positioning, voice, and visual system so your brand speaks consistently across all touchpoints from logo to website to campaigns.' },
    { t: 'Digital Presence & Performance', x: 'Your online presence is your first impression. We design and develop websites, landing pages, and content that convert visitors into leads built with strategy, design, and data in perfect balance.' },
    { t: 'Creative & Content Intelligence', x: 'Our team blends design, storytelling, and technology to create visuals and messages that connect with real people, not just algorithms. Every campaign is crafted to strengthen how your brand looks, feels, and performs online.' },
    { t: 'Continuous Optimization', x: 'Brand growth doesn’t stop at launch. We monitor your brand’s digital performance (GA4, LinkedIn, Search) and refine creative directions based on real-world insights to keep your presence ahead.' },
    { t: 'Trusted Partnership', x: 'We work like an extension of your in-house team, collaborating, communicating, and co-creating to ensure every outcome aligns with your vision and long-term goals.' },
  ],
  quotes: [
    { q: '“Working with OnetwentySix Verse feels like having our own design & marketing department, they know the brand better than we do.”', by: '- Sophie Hood  -\nFounder & Operator at Seoul Tonic', img: A('s-800x434_v-fs_webp_ee66998d-5bb3-4eab-9226-05e55cb8769f.jpg') },
    { q: '"Their refund policy?\nIt\'s like a free trial, but for a whole project. It tells you they\'re so confident, they\'re practically daring you to not be happy.\nSo far, it\'s been a win-win."', by: '- Adam Gwinnett  -\nExecutive Director at ROH Wheels and John Shearer Holdings', img: A('s-800x1200_v-fms_webp_2558af8f-6e65-4f06-b153-8848e6a77ba7.jpg') },
  ],
};

export const testimonials = {
  label: 'Testimonials',
  title: 'What our Customer say',
  lead: '“What our clients appreciate most is not just the results but the way we work:\nTransparent, Consistent, and Deeply collaborative.”',
  items: [
    { q: '“126Verse helped us modernize our brand and website without losing our industrial DNA.”\nOur new brand visuals and messaging improved lead quality by 42% in three months.', by: 'Matthew Peterson\nVP People & Culture, industrial equipment (US)', img: A('s-104x104_webp_f45d3e21-d3c0-4584-8e59-cdfc75028031.jpg') },
    { q: '“They bring order and intelligence into design.”\nEvery sprint is transparent, every review structured. On-time delivery rate: 98%.', by: 'Veronica Morison\nMarketing Director, building materials (APAC)', img: A('s-104x104_webp_4d170641-64c4-4fda-8c90-a923770204c5.jpg') },
    { q: '“They operate like an in-house creative team — fast, structured, and deeply aligned.”\nFrom scattered design files to a full digital system, 126V rebuilt our visual library and campaign materials in record time.', by: 'Adam Smith\nCMO, factory automation (EU)', img: A('s-104x104_webp_01963eac-856a-4a05-aa11-b18fcc760209.jpg') },
    { q: '“The brand relaunch helped us reconnect with our distributors.”\n126Verse redesigned our identity and presentation system, boosting brand recall by 22 points.', by: 'Lucas Smith\nBrand Manager, steel manufacturing (EMEA)', img: A('s-104x104_webp_26a617fe-26dc-4857-8676-fa655fd65152.jpg') },
    { q: '“Our new website feels alive — elegant, fast, and designed for conversion.”\nTraffic grew +36%, and the brand perception internally changed immediately after launch.', by: 'Jessica Moon\nHead of Marketing, precision components (US)', img: A('s-104x104_webp_d944b613-18eb-4236-87ed-832bec0bcbe8.jpg') },
    { q: '“More than results — we gained a real creative partner.”\nTheir mix of strategy, design, and data tracking cut our CPL by 27% and gave us full clarity on what worked.', by: 'Nikita Wilson\nGrowth Lead, electronics (US)', img: A('s-104x104_webp_4358992b-8119-4ac1-9874-4f42b032b72a.jpg') },
  ],
  midMarquee: 'We Deliver the Innovation and Expertise to Unlock Your Full Market Potential',
  midCta: 'Get Your Brand Audit',
};

export const pricing = {
  label: 'Pricing Lists',
  title: 'Choose a plan to elevate your brand precence',
  sub: 'Your journey with 126Verse starts with clarity and teamwork.\nEach stage builds on the previous, from having your first creative team\nto running a full-scale, data-driven brand engine.',
  plans: [
    {
      price: 'Custom pricing',
      name: 'Starter Team',
      desc: 'Perfect for first-time brand builders or companies without an in-house design team.',
      goal: 'Establish your visual foundation and digital credibility.',
      features: ['Brand discovery & mini audit session', 'Starter identity system (logo refinement, color, type, tone)', 'Landing page or 3-page mini website (SEO-ready)', '6–9 creative social visuals', 'GA4, GTM, LinkedIn Insight Tag setup', '. . .'],
      cta: 'Start Now',
      modal: 'foundationcontact',
    },
    {
      price: 'Custom pricing',
      name: 'Creative Hub',
      desc: 'For brands ready to expand their content, consistency, and creative impact.',
      goal: 'Build a connected, professional creative ecosystem for your brand.',
      features: ['Full brand guideline (visuals + tone + usage)', '5–8 page website redesign with copywriting', 'Visual content set (12 social visuals + 1 short video per quarter)', 'Ad creative package (LinkedIn / Google)', 'GA4 dashboard + monthly content tracking', '. . .'],
      cta: 'Schedule Consultation',
      modal: 'growncontact',
    },
    {
      price: 'Custom pricing',
      name: 'Brand Engine',
      desc: 'For growing brands that need structure, automation, and marketing scalability.',
      goal: 'Turn your creative process into a measurable, repeatable system.',
      features: ['Brand refresh or repositioning', 'Full multi-page website (8–12 pages, multilingual optional)', 'Campaign asset system (templates, media kits, brand visuals)', 'Marketing automation setup (CRM, HubSpot, or Apollo)', 'Bi-monthly performance review & optimization report', '. . .'],
      cta: 'Talk to Our Team',
      modal: 'transformcontact',
    },
    {
      price: 'Custom pricing',
      name: 'Dedicated Team',
      desc: 'For enterprises and B2B partners seeking a long-term creative department.',
      goal: 'Operate as your in-house creative & marketing department — on demand.',
      features: ['Full creative department support (6–12 experts)', 'Global brand management & localization.', 'Advanced analytics & automation integrations (AI / ML)', 'Executive comms & thought-leadership materials', 'Quarterly strategy review & board-level reporting', '. . .'],
      cta: 'Talk to Our Team',
      modal: 'enterprize',
    },
  ],
  ctaRow: 'Not sure which plan fits you best?\nLet’s connect! Our team will help you define what your brand truly needs.',
};

export const modals = [
  { id: 'foundationcontact', title: 'Get Started\nwith the Starter Team', submit: 'Submit & Start Now' },
  { id: 'growncontact', title: 'Scale Faster\nwith the Creative Hub', submit: 'Submit & Scale Growth' },
  { id: 'transformcontact', title: 'Redefine Success\nwith the Brand Engine', submit: 'Submit & Transform' },
  { id: 'enterprize', title: 'Lead Globally\nwith the Dedicated Team', submit: 'Submit & Lead Globally' },
];

export const compare = {
  label: 'Compare',
  title: 'Detailed Service Package Comparison',
  sub: 'See how each level of collaboration scales your brand’s creative and digital capabilities.',
  cols: ['Item', 'Starter Team', 'Creative Hub', 'Brand Engine', 'Dedicated Team'],
  groups: [
    {
      g: 'Strategy & Positioning',
      rows: [
        ['Brand Foundation', 'Initial discovery & direction setup', 'In-depth brand workshop & positioning', 'Strategic rebranding or refinement', 'Global brand architecture & governance'],
        ['Messaging & Voice', 'Basic tagline & tone setup', 'Consistent message framework across channels', 'Full messaging architecture & tone of voice guide', 'Multi-language & multi-market messaging adaptation'],
        ['Market Positioning', 'Competitive overview', 'Defined category positioning & audience clarity', 'Data-driven differentiation strategy', 'Regional market integration & strategic planning'],
        ['Guidelines & Documentation', 'Basic brand sheet', 'Full identity guideline (visual + verbal)', 'Extended design system & brand playbook', 'Enterprise-level documentation for distributed teams'],
        ['Strategic Alignment', 'Kick-off consultation', 'Monthly brand direction sync', 'Quarterly brand review sessions', 'Continuous leadership co-planning & creative consulting'],
      ],
    },
    {
      g: 'Execution & Deliverables',
      rows: [
        ['Digital Presence', 'Core website or landing experience', 'Full website & consistent digital assets', 'Integrated digital ecosystem', 'Multi-market website network & content governance'],
        ['Creative Production', 'Visual starter kit', 'Content design & short-form video', 'Campaign system & reusable templates', 'Full creative production pipeline with localization'],
        ['Campaign Support', 'Light campaign setup', 'Concept & ad creative design', 'Campaign planning & performance optimization', 'Ongoing cross-market campaign management'],
        ['Integration & Tools', 'Basic analytics setup (GA4, Tag, CRM)', 'Data & performance dashboard', 'Automated reporting & workflows', 'Advanced data integration & BI ecosystem'],
        ['Team Collaboration', '2–3 core creatives', 'Cross-functional creative team', 'Full-stack design & content team', 'Dedicated creative department working alongside client team'],
      ],
    },
    {
      g: 'Performance & Terms',
      rows: [
        ['Post-Launch Support', 'Short-term optimization after delivery', 'Continuous optimization support', 'Structured quarterly reviews', 'Ongoing retainer partnership'],
        ['Performance Visibility', 'Basic metric tracking', 'Branded dashboard for KPI review', 'Data-driven BI insights & recommendations', 'Full transparency + strategic advisory reporting'],
        ['Engagement Model', 'Fixed-scope delivery', 'Flexible project phases', 'Hybrid model (project + retainer)', 'Dedicated retainer (integrated team)'],
        ['Communication & Workflow', 'Email / review-based', 'Shared workspace + scheduled check-ins', 'Dedicated Microsoft Teams 365 / Notion workspace', 'Fully integrated daily collaboration'],
        ['SLA response time', '4h', '4h', '2h', '2h'],
        ['Assurance & Guarantee\n(Zero-Risk Partnership Guarantee)', '✓', '✓', '✓', '✓'],
      ],
    },
  ],
  exchangeRow: ['Exchange rate', 'Standard', 'Preferential', 'Best'],
  note: 'Zero-Risk Partnership Guarantee',
};

export const versus = {
  label: 'Compare',
  title: '5 Full-Time Hires Or One 126Verse?',
  sub: 'Why building your own creative team often costs more and delivers less consistency?',
  intro: 'This comparison outlines how working with 126Verse gives you the full expertise of an in-house creative department without the hiring overhead, training time, or management risk.',
  cols: ['Criteria', 'In-House Team (5 hires)', 'Hiring 126Verse (Creative Partnership)'],
  rows: [
    ['Roles & Expertise', 'Requires hiring multiple positions. Brand Strategist, Project Manager, Designer, Copywriter, and Web Developer, each with separate onboarding and management.', 'Full multidisciplinary team included: strategy, design, content, web, and performance specialists — already aligned and ready to execute.'],
    ['Setup Time', '3–6 months for recruitment, onboarding, and workflow alignment.', 'Fully operational in 1–2 weeks after discovery session.'],
    ['Management Overhead', 'Requires HR oversight, internal meetings, and quality control.', '126V operates as your embedded creative department, no management burden, no overhead.'],
    ['Scalability & Flexibility', 'Scaling requires additional hires, tools, and management layers.', 'Scale instantly between packages (Starter Team → Dedicated Team) as your brand grows.'],
    ['Performance Accountability', 'Output depends on individual staff performance and internal capacity.', 'Measurable outcomes, clear milestones, and our Zero-Risk Partnership Guarantee ensure delivery.'],
    ['Quality & Consistency', 'Varies by hire; hard to maintain unified visual and messaging standards.', 'Unified creative direction and brand consistency across every channel.'],
    ['Cost Efficiency', 'Full-time salaries, software subscriptions, workspace costs, and training.', 'One transparent partnership cost, all roles, tools, and strategy included.'],
    ['Time to Impact', '6–9 months to see aligned creative results.', '4–6 weeks to reach brand alignment and measurable outcomes.'],
    ['Risk & Continuity', 'Turnover or absence can slow down production cycles.', 'Always-on team continuity with 126V’s structured creative system.'],
  ],
  conclusion: 'Conclusion: By partnering with 126Verse, you gain the equivalent of a full creative & marketing department -  without recruitment delays, payroll overhead, or management risk. Our model blends strategic direction, creative design, and performance tracking into one streamlined partnership - so you can focus on growth, not hiring.',
};

export const faq = {
  label: 'FAQ',
  title: 'Valuable informations without secrets',
  items: [
    { q: 'What does the typical workflow with an agency look like?', a: 'At 126Verse, we simplify the process into four clear stages : (1) Discovery & Strategy — align goals, brand direction, and target audience. (2) Creative Development — build key visuals, content, and website experience. (3) Launch & Tracking — activate campaigns and connect performance tools (GA4, LinkedIn, CRM). (4) Optimization & Review — evaluate KPIs and refine for next phases. → You always know what’s happening, with full visibility at each milestone.' },
    { q: 'How do you ensure quality and KPI commitment?', a: 'We combine creative reviews, performance dashboards, and weekly check-ins. Every project has clear measurable KPIs , such as engagement rate, lead quality, or brand consistency metrics. If we miss agreed milestones by more than 7 business days (without client-side delay), our Zero-Risk Partnership Guarantee activates, and you can choose either a 10% refund or a free creative add-on .' },
    { q: 'Do we need to provide content or will the agency handle it?', a: 'Both options are available. If you already have existing materials (photos, brand book, technical documents), our team will integrate them. If not, 126Verse handles everything from concept, script, copywriting, and visual creation so your team can focus on operations while we take care of communication and storytelling.' },
    { q: 'Can the package be customized?', a: 'Absolutely. Every plan is a starting framework , not a rigid box. After our initial consultation, we’ll tailor the scope to fit your brand’s stage,  whether you need more creative assets, faster rollout, or deeper analytics. Most of our long-term clients start with one plan and later scale up seamlessly.' },
    { q: 'What makes this service different from other agencies?', a: 'We don’t sell “campaigns.” We build creative systems that your brand can grow with. 126Verse acts like your in-house marketing & design team  integrated into your workflow, not an external vendor. You get brand strategy, creative execution, and analytics in one place, all aligned with business outcomes, not vanity metrics.' },
    { q: 'How is reporting handled?', a: 'You’ll receive a shared real-time dashboard (via Notion, Google Data Studio, or your CRM) tracking progress, deliverables, and KPIs. Reports are summarized bi-weekly or monthly , depending on your package. and every review call focuses on what matters — outcomes, not just activities.' },
    { q: 'What happens if KPIs are not met?', a: 'We take accountability seriously. If our agreed KPIs are not achieved due to internal execution issues, we immediately conduct an internal audit, adjust strategy, and activate the Zero-Risk Guarantee. You’ll  receive either a partial refund or a complimentary service extension. It’s performance-driven, not promise-driven.' },
    { q: 'Can the contract be canceled early?', a: 'Yes, with written notice. If you’re not satisfied within the first milestone or phase, you may cancel with pro-rata billing for completed work no hidden penalties. We believe trust is earned, not locked behind long contracts.' },
  ],
  note: 'Want to ask another question? Send us a message',
};

export const addons = {
  words: ['Get', 'started', 'now', 'and', 'amplify', 'your', 'results', 'with', 'exclusive', 'add-on', 'solutions'],
  items: ['Social Presence Enhancement', 'Parts Catalog Digitization', 'Predictive Maintenance Marketing', 'Service Contract Optimization', 'Brand Performance Audit'],
  note: 'Discover Add-On Services for Extra Impact',
};

export const finalCta = {
  label: 'Onetwentysix Verse',
  text: "More than an agency. We're your growth partner, delivering meansurable results, scalable solutions, and the confidence to expand globally.",
  cta: 'Get Started',
};
