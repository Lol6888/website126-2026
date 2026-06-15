// 5 vị trí tuyển dụng — port NGUYÊN VĂN từ 126verse.com
export interface Job {
  slug: string;
  title: string;
  location: string;
  intro: string;
  sections: { h: string; text: string }[];
  formName: string;
}

const EQUAL = 'Research shows that women and other marginalized groups tend to only apply for a job when they meet every single criteria. Does this role sound like it was made for you, yet you don’t check every box? Reach out anyways! We’re an equal opportunity employer and are dedicated to fostering an inclusive and diverse environment for employees from all walks of life. We hire based on talent, and we’re proud of our global perspective.';

export const jobs: Job[] = [
  {
    slug: 'principal-designer',
    title: 'Principal Designer',
    location: 'HO CHI MINH - REMOTE',
    formName: 'Apply Job Principal Designer',
    intro: "We are open to remote candidates\n\n126Verse ships products loved by billions worldwide, influencing how we work, live, and play. Chances are, you've interacted with many products we've helped shape. Now, we need your expertise to craft the future.\n\nAs a Principal Designer, you’ll lead fully within the work, constantly seeking opportunities to elevate design quality and expand the skillsets of those around you. Joining a team of the most senior design practitioners at 126Verse, you’ll be expected to operate across multiple creative disciplines, delivering exceptional work on the most challenging projects. Often, you’ll lead in defining the product experience, translating the intention of the product strategy and the character and emotion of the brand into thoughtful, useful and lovable products.",
    sections: [
      {
        h: 'What you’ll do:',
        text: '-   You\'ll work across many aspects of the design process. Our Principals are true multidisciplinary designers and craftspeople, bridging experience, visual and motion design to create exceptional digital products.\n-   Set the bar for quality on your projects. Typically you’ll be the only principal designer on a project, so you’ll be identifying opportunities to elevate the work and the team around you, often pushing both clients and colleagues outside of their comfort zones in the pursuit of delivering exceptional products.\n-   Support other designers of all levels in the work and help to promote an inspiring and inclusive environment for the team.\n-   Work closely with our Brand team to ensure the brand principles are translated into the products we design.\n-   Collaborate with design specialists.\n-   Participate with research and strategy to generate and evaluate design opportunities, and test solutions through storyboards and prototypes.\n-   Collaborate directly with and present to key client team members.\n-   Work hand-in-hand with engineers and product team members to foster innovation and ensure feasibility and fidelity of implementation.\n-   If desired, you have the opportunity to coach and mentor other designers.\n-   Share your knowledge and approach to the craft with the broader design team at 126Verse and the wider industry.',
      },
      {
        h: 'Requirements',
        text: '-   You\'ll work across many aspects of the design process. Our Principals are true multidisciplinary designers and craftspeople, bridging experience, visual and motion design to create exceptional digital products.\n-   Set the bar for quality on your projects. Typically you’ll be the only principal designer on a project, so you’ll be identifying opportunities to elevate the work and the team around you, often pushing both clients and colleagues outside of their comfort zones in the pursuit of delivering exceptional products.\n-   Support other designers of all levels in the work and help to promote an inspiring and inclusive environment for the team.\n-   Work closely with our Brand team to ensure the brand principles are translated into the products we design.\n-   Collaborate with design specialists.\n-   Participate with research and strategy to generate and evaluate design opportunities, and test solutions through storyboards and prototypes.\n-   Collaborate directly with and present to key client team members.\n-   Work hand-in-hand with engineers and product team members to foster innovation and ensure feasibility and fidelity of implementation.\n-   If desired, you have the opportunity to coach and mentor other designers.\n-   Share your knowledge and approach to the craft with the broader design team at 126Verse and the wider industry.',
      },
      { h: 'Nice to haves:', text: '-   3D skills are a bonus' },
      { h: 'Equal opportunity employer', text: EQUAL },
    ],
  },
  {
    slug: 'junior-brand-designer',
    title: 'Junior Brand Designer',
    location: 'HO CHI MINH - REMOTE',
    formName: 'Apply Job brand design',
    intro: 'We are open to remote candidates\n\nAt 126Verse, we design some of the world’s most beloved products. Founders at early-stage startups hire us to help build businesses from scratch, and leaders at global enterprises hire us to help launch new products.\n\nAs a Brand Designer at 126Verse, you will guide the brand design process from start to finish. You will be involved in, and ultimately responsible for all aspects of brand design, delivering stunning, product-ready brands. This is a remote position, so you must be comfortable managing the brand process using remote-friendly methods.\n\nWe’re looking for designers who love visual identity design and creative strategy and know how to advocate for their work. We’re a product design agency, so you must understand what it takes to get a digital product out the door. If you have a portfolio with examples of your work in the wild, we’d love to talk to you.\n\nWe’re looking for product-literate people, who know that a great brand is the difference between a good experience and an exceptional one.',
    sections: [
      {
        h: 'What you’ll do:',
        text: '• Guide the brand design process, from start to finish, owning all aspects of the brand design process.\n\n• Create inspiring, beautiful, and relevant brands that strengthen the products we make.\n\n• Complement and assist the product team, leveling up output by crafting a stunning, product-ready brand.\n\n• Work closely with Product Designers, Product Managers, Client Partners, and clients to educate and inform them about brand design best practices.\n\n• Translate your design output into sound, actionable assets and documentation that both internal and external teams can use as a systematized source of truth.\n\n• Guide our clients through a rigorous yet agile branding process, ensuring they understand what to expect every step of the way.\n\n• Be accountable for timelines, deliverables, and output with oversight and support from Brand leadership and project teams.',
      },
      {
        h: 'Requirements:',
        text: '• 1,5+ years of experience designing products and brands that can be seen in the wild.\n\n• Proficient with design tools like Figma, Illustrator, and Photoshop.\n\n• Comfortable working on your own or in a team, communicating directly with stakeholders, and collaborating with Product Designers.\n\n• Experience in collaborative, highly iterative teams, where open communication and regular sharing of work are integral to the process.\n\n• You are passionate about storytelling and are effective when communicating concepts to internal and external stakeholders.\n\n• Confident in leading fundamental brand exercises, workshop activities, and sprint reviews.\n\n• Presentation both written and in-person is a big part of what we do - you’ll be selling, revising, and presenting ideas directly to large stakeholder groups both internally and externally.\n\n• You enjoy increasing other people’s design literacy.\n\n• You are adaptable and enjoy evolving how you work to ensure productive weekly sprints.\n\n• You actively participate in feedback sessions and look forward to iterating on concepts.',
      },
      {
        h: 'Nice to haves:',
        text: '• Strong English language skills are advantageous, facilitating clear communication and collaboration within our international team.\n\n• Writing is a key part of our process, so we’re looking for candidates who are comfortable writing and editing both strategic and creative copy.\n\n• Motion or 3D skills are a huge plus.\n\n• Product design knowledge (systems, best practices, and ways of working) is an asset.',
      },
      { h: 'Equal opportunity employer', text: EQUAL },
    ],
  },
  {
    slug: 'graphic-design-intern',
    title: 'Graphic Design Intern',
    location: 'HO CHI MINH - REMOTE',
    formName: 'Apply Job Intern',
    intro: "We are open to remote candidates\n\n126Verse ships products loved by billions worldwide, influencing how we work, live, and play. Chances are, you've interacted with many products we've helped shape. Now, we need your expertise to craft the future.\n\nAs a graphic design intern at 126Verse, you'll delve into practical, hands-on projects, gaining invaluable real-world experience. Our aim is to provide you with immersive learning opportunities in a manner that's both intuitive and engaging. Throughout your internship, you'll not only refine your design skills but also master the art of collaborating effectively within remote teams—a vital skill in today's interconnected world.\n\nMoreover, we believe in nurturing leadership potential. As you grow and excel in your role, there will be ample opportunities for you to step into leadership positions within our team, contributing your unique perspective and guiding others toward success.\n\nConsider yourself an official part of 126Verse, where learning, growth, and innovation are at the forefront of everything we do. We're excited to embark on this journey with you and help you realize your full potential as a graphic designer.",
    sections: [
      {
        h: 'What you’ll do:',
        text: '-   You will undergo comprehensive training to familiarize yourself with various tools crucial for future projects at 126Verse, including Articulate Rise, SCORM, eLearning platforms, STUDIO and more!\n-   Actively participate in 2D advertising and printing product design activities, contributing your creativity and skills to our projects.\n-   Develop your ability to work effectively within teams and provide support to group initiatives, fostering a collaborative and dynamic work environment.\n-   Embrace a remote working environment, collaborating with team members from diverse locations across the globe.\n-   Collaborate with design specialists.',
      },
      {
        h: 'Requirements:',
        text: '-   Must have graduated from a design-related major, with a passion for applying theoretical knowledge to practical design challenges.\n-   Demonstrated ability to quickly grasp new skills and technologies, adapting to evolving project requirements efficiently.\n-   Proficiency in using various design tools is essential for this role, enabling you to translate concepts into visually appealing designs effectively.\n-   Possess a strong inclination towards learning and conducting research, continuously exploring innovative design trends and methodologies.\n-   Work Availability: Must be available to work full time.\n\n-   Strong English language skills are advantageous, facilitating clear communication and collaboration within our international team.',
      },
      { h: 'Bonus & Allowances', text: '-    Receive bonus incentives and additional allowances as part of our comprehensive benefits package.' },
      { h: 'Nice to haves:', text: '-   Strong English language skills are advantageous, facilitating clear communication and collaboration within our international team.' },
      { h: 'Equal opportunity employer', text: EQUAL },
    ],
  },
  {
    slug: 'multimedia-designer',
    title: 'Multimedia Designer (Branding & Marketing) - Mid Level',
    location: 'HO CHI MINH - REMOTE',
    formName: 'Apply Multimedia Designer',
    intro: "We are open to remote candidates\n\n126Verse ships products loved by billions worldwide, influencing how we work, live, and play. Chances are, you’ve interacted with many products we’ve helped shape. Now, we need your expertise to craft the future.\n\nAs a Multimedia Designer (Branding & Marketing) – Mid Level at 126Verse, you’ll own end-to-end creative execution on high-impact campaigns: from visual identity and collateral design to marketing video and podcast production. You’ll tackle real-world projects that sharpen both your graphic-design and video-editing skills, while learning to lead cross-functional efforts across our global, remote teams—a must-have competency in today’s interconnected world.\n\nWe believe great designers become great leaders. As you deliver outstanding work and drive results, you’ll find clear pathways to mentor others, shape creative strategy, and grow into senior roles within our team. At 126Verse, you’re not just joining an agency—you’re becoming part of a community where learning, growth, and innovation thrive together.",
    sections: [
      {
        h: 'What you’ll do:',
        text: '- Create 2D/3D graphic assets for branding and marketing campaigns: logos, brand guidelines, brochures, posters, social-media posts, email templates, landing-page visuals, ads, etc.\n\n- Edit and produce marketing videos, short-form clips and podcast episodes: assemble footage, add motion-graphic titles, transitions and sound-design elements.\n\n- Develop concepts, moodboards and storyboards that reflect each client’s brand voice.\n\n- Collaborate closely with copywriters, marketers, audio engineers and developers to ensure consistency in look, feel and messaging.\n\n- Stay up to date on design and video trends, proposing creative ideas to elevate campaign performance.',
      },
      {
        h: 'Requirements:',
        text: '- 1–3 years of experience as a graphic designer, with demonstrated work in branding and marketing.\n\n- Proficiency in Adobe Creative Suite (Illustrator, Photoshop, InDesign) and/or Figma.\n\n- Strong skills in video editing tools such as Premiere Pro, After Effects.\n\n- Basic audio-post production experience (mixing voice-over, cleaning up podcast recordings).\n\n- Solid understanding of digital-marketing channels (social, email, display ads).\n\n- Excellent teamwork, communication skills and ability to manage multiple deadlines.\n\n- Work Availability: Must be available to work full time.\n\n- Strong English language skills are advantageous, facilitating clear communication and collaboration within our international team.',
      },
      {
        h: 'Bonus & Allowances',
        text: '- Competitive salary, commensurate with experience.\n\n- 2-month probation at 50% of base salary.\n\n- Full social-insurance benefits upon confirmation.\n\n- A creative, collaborative environment—with workshops and training to sharpen your skills.\n\n- Career-growth opportunities and the chance to lead future design projects.',
      },
      { h: 'Nice to haves:', text: '-   Strong English language skills are advantageous, facilitating clear communication and collaboration within our international team.' },
      { h: 'Equal opportunity employer', text: EQUAL },
    ],
  },
  {
    slug: 'social-media-coordinator-intern',
    title: 'Social Media Coordinator Intern',
    location: 'HO CHI MINH - REMOTE',
    formName: 'Apply Job Intern SMC',
    intro: "We are open to remote candidates\n\n126Verse ships products loved by billions worldwide, influencing how we work, live, and play. Chances are, you've interacted with many products we've helped shape. Now, we need your expertise to craft the future.\n\nAs a Social Media Coordinator Intern at 126Verse, you'll dive into exciting, hands-on projects, gaining invaluable real-world experience. Our aim is to provide you with immersive learning opportunities that are both intuitive and fun. Throughout your internship, you'll not only sharpen your social media management skills but also master the art of collaborating effectively within remote teams—a crucial skill in today's interconnected world.\n\nMoreover, we love nurturing leadership potential. As you grow and shine in your role, there will be plenty of opportunities for you to step into leadership positions within our team, bringing your unique perspective and helping guide others towards success.\n\nWelcome aboard to 126Verse, where learning, growth, and innovation are at the heart of everything we do. We're thrilled to start this exciting journey with you and help you realize your full potential as a social media coordinator. Let's make great things happen together!",
    sections: [
      {
        h: 'What you’ll do:',
        text: '-   Hands-on experience with real-world projects.\n-   A chance to contribute to the growth of a dynamic company.\n-   Embrace a remote working environment, collaborating with team members from diverse locations across the globe.',
      },
      {
        h: 'Requirements:',
        text: '- Currently pursuing a degree in Marketing, Communications, or a related field.\n- Strong written and verbal communication skills.\n- Familiarity with social media platforms, particularly LinkedIn and Twitter.\n- Basic understanding of social media analytics tools.\n- Creative mindset with the ability to generate engaging content ideas.\n- Ability to work independently in a remote environment.\n- Passion for social media and digital marketing.',
      },
      { h: 'Nice to haves:', text: '-   Strong English language skills are advantageous, facilitating clear communication and collaboration within our international team.' },
      { h: 'Equal opportunity employer', text: EQUAL },
    ],
  },
];
