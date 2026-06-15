// Nội dung case study — port NGUYÊN VĂN từ 126verse.com (publish snapshot Studio.Design)
// Không chỉnh sửa câu chữ. Chỉ cấu trúc lại để render theo layout mới.

export interface CaseImage { src: string; alt?: string }
export interface CaseSection {
  label?: string;       // nhãn nhỏ (Introduction / The vision ...)
  title?: string;       // tiêu đề display
  lead?: string;        // câu dẫn lớn
  text?: string;        // đoạn văn (\n giữ xuống dòng)
  items?: { label: string; text: string }[];
  images?: CaseImage[];
  cols?: number;
  quote?: { quote: string; name: string; role: string; img?: string };
  stats?: { num: string; label: string }[];
  iframe?: string;      // src của iframe nhúng
  iframeRatio?: string; // vd '16/9'
  bg?: string;          // nền section (giữ đúng màu bản cũ: #EEEEEE, #fff4e9, #fdf9f0, ...)
}
export interface CaseStudy {
  slug: string;
  lang: 'en' | 'vi';
  name: string;
  pageTitle: string;
  dark?: boolean;
  heroBg?: string;      // nền khối hero (Yamaha: #EEEEEE)
  heroBgImage?: string; // ảnh texture nền hero (Yamaha: lưới kẻ ô)
  meta: { typeLabel: string; type: string; stageLabel: string; stage: string; deliverLabel: string; deliver: string };
  hero: CaseImage[];
  sections: CaseSection[];
  next: { label: string; name: string; href: string; img: string };
}

const A = (f: string) => '/img/a/' + f;

export const cases: CaseStudy[] = [
  // ============================================================ YAMAHA MUSIC — EN
  {
    slug: 'yamaha-music',
    lang: 'en',
    name: 'Yamaha Music',
    pageTitle: 'Yamaha Music | 126Verse',
    heroBg: '#EEEEEE',
    heroBgImage: A('s-2400x1202_v-frms_webp_dd2155bb-6464-496a-8542-b35bb77df04e.png'),
    meta: { typeLabel: 'Project Type', type: 'Brand marketing', stageLabel: 'Stage', stage: 'Leader', deliverLabel: 'Deliverables', deliver: 'POSM products, Social media posts, Video ads' },
    hero: [
      { src: A('s-282x111_webp_4c854a05-1120-405f-a474-ec8dbdf2813b.png'), alt: 'Yamaha' },
      { src: A('s-1359x903_v-fms_webp_3e76943e-50c5-4ec2-a5c6-09260d6e2b67.png') },
      { src: A('s-901x2400_v-frms_webp_06b7713a-b119-4993-ae93-e319a21600e9.png'), alt: 'Clavinova' },
      { src: A('s-569x1263_v-fms_webp_94a71332-a1a9-4476-9c1c-85247d17da79.png') },
      { src: A('s-1221x2400_v-frms_webp_80387e47-bf0b-4354-a7fa-28a755c4ab47.png') },
    ],
    sections: [
      { label: 'Introduction', lead: 'Crafting a premier conduit for music aficionados, positioned among iconic brands. Collaborating closely with Yamaha Music, we elevate their brand identity and enrich their digital presence through our expertise and innovative approach.' },
      { images: [{ src: A('s-2400x1600_v-frms_webp_5b56c433-d180-4e91-ae2b-cd774829d464.jpg') }], cols: 1 },
      { title: '"Make Waves" - Yamaha\'s new brand promise', text: "The concept of \"Make Waves\" captures customers' moments of excitement and excitement. Yamaha wants to be a company that inspires customers' passion and empowers them to express their individuality, emotions and creativity." },
      { label: 'The vision', lead: 'Create responsive images that seamlessly blend branding and commerce.' },
      { iframe: 'https://www.youtube.com/embed/Og-jigFAWq4?si=JPcqqcqHawmWWNQI', iframeRatio: '16/9' },
      {
        images: [
          { src: A('s-704x145_v-fs_webp_51deaaa3-4bec-4347-a82d-9ef35f126062.png'), alt: 'SEQTRAK' },
          { src: A('s-665x236_v-fs_webp_f9a0db63-e43d-43a4-a9ea-6072dcafc179.png') },
          { src: A('s-666x235_v-fs_webp_dcd1c547-a03e-456a-a357-585f7be86406.png') },
          { src: A('s-160x600_0c8a3fcb-cb5f-451a-a34d-abcde1f8576b.gif'), alt: 'SEQTRAK web banner' },
        ],
        cols: 4,
      },
      {
        images: [
          { src: A('s-1699x2400_v-frms_webp_19b756c6-9bbb-444d-b3b0-d4b1840cf8c4.png'), alt: 'seqtrak1' },
          { src: A('s-1697x2400_v-frms_webp_fc802a97-f6cd-4ae8-a00e-a78e7fc8d41d.png'), alt: 'seqtrak2' },
          { src: A('s-900x400_8f7b2b97-d9b2-4033-bcb4-3040b448750b.gif'), alt: 'SEQTRAK animated banner' },
        ],
        cols: 3,
      },
      { label: 'Visual orientation', lead: 'Express yourself and make an impact, helping individuals improve as listeners, solo player, and a team player.' },
      {
        images: [
          { src: A('s-2048x2048_v-frms_webp_0b88dcfc-a358-40e9-84bd-bbad2b9f2099.jpg') },
          { src: A('s-1200x1500_v-fms_webp_2fa15ed5-0621-4b06-91b2-05c116156e48.png') },
          { src: A('s-2048x1363_v-frms_webp_e8c50cda-736e-47c4-868f-c527a44ee59c.jpg') },
        ],
        cols: 3,
      },
      {
        title: 'Companionship & Responsibility',
        items: [
          { label: 'Impact', text: 'During our partnership, we have helped deliver hundreds of outstanding designs for Yamaha Music, impacting millions of potential customers and generating billions in revenue.' },
          { label: 'Persistence', text: 'Yamaha Music hosts annual events, complemented by fresh promotions, workshops, and support initiatives for franchise partners. Our commitment is to remain steadfast, consistently refreshing designs with creative flair that aligns seamlessly with Yamaha Music\'s "Make Waves" commitment.' },
        ],
      },
      { images: [{ src: A('s-1152x648_58eae38e-6b52-46b7-9a6c-ffbfbbf10f71.gif') }], cols: 1 },
    ],
    next: { label: 'Next case study', name: 'DAESANG', href: '/work/daesang', img: A('s-1000x1000_v-fs_webp_d837f0bf-8686-46ab-92df-a94d59a68539.png') },
  },
  // ============================================================ YAMAHA MUSIC — VI
  {
    slug: 'yamaha-music',
    lang: 'vi',
    name: 'Yamaha Music',
    pageTitle: 'Yamaha Music | 126Verse',
    heroBg: '#EEEEEE',
    heroBgImage: A('s-2400x1202_v-frms_webp_dd2155bb-6464-496a-8542-b35bb77df04e.png'),
    meta: { typeLabel: 'Loại dự án', type: 'Thương hiệu sản phẩm', stageLabel: 'Vai trò', stage: 'Trưởng nhóm', deliverLabel: 'Bàn giao', deliver: 'Các sản phẩm POSM, Social post, Video quảng cáo' },
    hero: [
      { src: A('s-282x111_webp_4c854a05-1120-405f-a474-ec8dbdf2813b.png'), alt: 'Yamaha' },
      { src: A('s-1359x903_v-fms_webp_3e76943e-50c5-4ec2-a5c6-09260d6e2b67.png') },
      { src: A('s-901x2400_v-frms_webp_06b7713a-b119-4993-ae93-e319a21600e9.png'), alt: 'Clavinova' },
      { src: A('s-569x1263_v-fms_webp_94a71332-a1a9-4476-9c1c-85247d17da79.png') },
      { src: A('s-1221x2400_v-frms_webp_80387e47-bf0b-4354-a7fa-28a755c4ab47.png') },
    ],
    sections: [
      { label: 'Bối cảnh', lead: 'Tạo ra cầu nối hằng đầu cho người yêu âm nhạc, xứng đáng là một trong những thương hiệu mang tính biểu tượng. Chúng tôi hợp tác với Yamaha Music để nâng cao hình ảnh thương hiệu và xây dựng trải nghiệm kỹ thuật số của họ bằng tư duy và kinh nghiệm của mình.' },
      { images: [{ src: A('s-2400x1600_v-frms_webp_5b56c433-d180-4e91-ae2b-cd774829d464.jpg') }], cols: 1 },
      { title: '"Make Waves" - Lời hứa thương hiệu mới của Yamaha', text: 'Khái niệm "Make Waves" ghi lại khoảnh khắc "bùng cháy" hào hứng, phấn khích của khách hàng. Yamaha muốn trở thành một công ty truyền cảm hứng cho niềm đam mê của khách hàng và giúp họ mạnh mẽ hơn để thể hiện cá tính, cảm xúc và sự sáng tạo của mình.' },
      { label: 'Tầm nhìn', lead: 'Tạo ra những hình ảnh đáp ứng kết hợp liền mạch giữa thương hiệu và thương mại.' },
      { iframe: 'https://www.youtube.com/embed/Og-jigFAWq4?si=JPcqqcqHawmWWNQI', iframeRatio: '16/9' },
      {
        images: [
          { src: A('s-704x145_v-fs_webp_51deaaa3-4bec-4347-a82d-9ef35f126062.png'), alt: 'SEQTRAK' },
          { src: A('s-665x236_v-fs_webp_f9a0db63-e43d-43a4-a9ea-6072dcafc179.png') },
          { src: A('s-666x235_v-fs_webp_dcd1c547-a03e-456a-a357-585f7be86406.png') },
          { src: A('s-160x600_0c8a3fcb-cb5f-451a-a34d-abcde1f8576b.gif'), alt: 'SEQTRAK web banner' },
        ],
        cols: 4,
      },
      {
        images: [
          { src: A('s-1699x2400_v-frms_webp_19b756c6-9bbb-444d-b3b0-d4b1840cf8c4.png'), alt: 'seqtrak1' },
          { src: A('s-1697x2400_v-frms_webp_fc802a97-f6cd-4ae8-a00e-a78e7fc8d41d.png'), alt: 'seqtrak2' },
          { src: A('s-900x400_8f7b2b97-d9b2-4033-bcb4-3040b448750b.gif'), alt: 'SEQTRAK animated banner' },
        ],
        cols: 3,
      },
      { label: 'Định hướng hình ảnh', lead: 'Thể hiện bản thân và tạo ảnh hưởng, giúp cá nhân tiến bộ với vai trò là người nghe, người chơi và kết hợp cùng tập thể.' },
      {
        images: [
          { src: A('s-2048x2048_v-frms_webp_0b88dcfc-a358-40e9-84bd-bbad2b9f2099.jpg') },
          { src: A('s-1200x1500_v-fms_webp_2fa15ed5-0621-4b06-91b2-05c116156e48.png') },
          { src: A('s-2048x1363_v-frms_webp_e8c50cda-736e-47c4-868f-c527a44ee59c.jpg') },
        ],
        cols: 3,
      },
      {
        title: 'Đồng hành & Trách nhiệm',
        items: [
          { label: 'Sự tác động', text: 'Trong quá trình hợp tác, chúng tôi đã giúp cung cấp hằng trăm thiết kế nổi bật cho Yamaha Music, tác động đến hàng triệu khách hàng tiềm năng và tạo ra hàng tỷ doanh thu.' },
          { label: 'Tính bền bỉ', text: 'Những sự kiện của Yamaha Music diễn ra mang tính thường niên, cùng với các chương trình khuyến mãi mới, workshop và các hoạt động hỗ trợ cho đối tác nhượng quyền. Chúng tôi luôn cần giữ tập trung và cập nhật liên tục các thiết kế mới đi kèm sáng tạo đúng với lời hứa “Make Waves” của Yamaha Music.' },
        ],
      },
      { images: [{ src: A('s-1152x648_58eae38e-6b52-46b7-9a6c-ffbfbbf10f71.gif') }], cols: 1 },
    ],
    next: { label: 'Tiếp theo', name: 'DAESANG', href: '/vi/work/daesang', img: A('s-1000x1000_v-fs_webp_d837f0bf-8686-46ab-92df-a94d59a68539.png') },
  },
  // ============================================================ DAESANG — EN
  {
    slug: 'daesang',
    lang: 'en',
    name: 'DAESANG',
    pageTitle: 'DAESANG | 126Verse',
    meta: { typeLabel: 'Project Type', type: 'Brand marketing', stageLabel: 'Stage', stage: 'Leader', deliverLabel: 'Deliverables', deliver: 'POSM products, Social media posts, Video ads' },
    hero: [{ src: A('s-1152x648_ae57d16a-04f7-4e4d-87c0-e383c47c24b0.gif'), alt: 'DAESANG' }, { src: A('s-415x176_webp_0080bc92-e5d9-4424-a22d-048a114bc6f2.png'), alt: 'Wellife' }],
    sections: [
      { label: 'Introduction', lead: "Daesang is revolutionizing the health food industry network by creating products and imagery that are readily accessible, promote engagement, and instill trust within the health-conscious community. We work hand in hand with DAESANG's internal teams, collaborating on product design, branding, strategy, and engineering to elevate their digital presence and service offerings." },
      { images: [{ src: A('s-2400x2400_v-frms_webp_fe5fb210-28bf-48b2-bb67-5336f10dd527.png'), alt: 'campaign 01' }], cols: 1 },
      {
        title: 'The company fosters a bright future through a culture centered around healthy eating',
        text: "Established in 2002, Daesang Wellife has emerged as a prominent name in the healthcare product industry. What's less known is their unparalleled ability to facilitate self-care in the most convenient manner possible.",
      },
      {
        images: [
          { src: A('s-1152x648_c6e00156-b010-4520-ad9b-fafdc182343b.gif') },
          { src: A('s-1152x648_c86d224f-b014-437c-a0db-8dbb0b531087.gif') },
          { src: A('s-1152x648_603b9cb6-74c1-4b81-bd9f-469adbca1572.gif') },
        ],
        cols: 3,
      },
      { label: 'The vision', lead: 'Transform DAESANG Wellife from a healthcare food service into a brand that accompanies a comprehensive healthy lifestyle, based on the goal of bringing a feeling of closeness and accessibility in all daily situations.' },
      {
        images: [
          { src: A('s-1080x1080_v-fs_webp_6af395f0-c228-449a-ae56-79f2efe63962.jpg') },
          { src: A('s-1080x1080_v-fs_webp_958640d4-1d04-4f39-be6d-11165ec3e755.jpg') },
        ],
        cols: 2,
      },
      { label: 'Nhiều sản phẩm, một thương hiệu', lead: "A versatile brand that seamlessly integrates all of DAESANG's services, offering customers a beautifully crafted, customer-centered wellness experience." },
      { images: [{ src: A('s-800x800_0445dacb-1d07-471f-96cf-b22fcbb76a07.gif') }, { src: A('s-415x176_webp_0080bc92-e5d9-4424-a22d-048a114bc6f2.png') }], cols: 2, bg: '#fff4e9' },
      {
        title: 'Expand & Share',
        text: "Intending to accompany users' health, DAESANG always tries to be a strategic partner of sports activities and organizations - the image of exercise and health!\n\nWe went along and designed the milestones. Always ensure the brand's image and respect for partners - something that makes us always proud.",
      },
      {
        images: [
          { src: A('s-1080x1080_v-fs_webp_fff34698-9f29-4673-bf01-993875f30ed7.jpg') },
          { src: A('s-1080x1080_v-fs_webp_8a8da719-f0ee-4e22-a9f2-51e6e5232b4b.jpg') },
          { src: A('s-1440x1440_v-fms_webp_bf109a25-c1ad-44f5-8c8e-5616c0487202.jpg') },
        ],
        cols: 3,
      },
      {
        quote: {
          quote: '“I am always amazed at the quality of work that 126Verse produces. From day one, 126 Verse has our brand, created some stunning designs, and ensured the entire process ran smoothly.”',
          name: 'Linwei Deng',
          role: 'Daesang Wellife Global Business Dept. Manager',
          img: A('s-800x800_v-fs_webp_76741bd0-ec48-4d95-98d1-388ce60136cf.jpg'),
        },
      },
      {
        title: "126Verse's approach",
        text: 'All images for the communication plan are detailed in terms of the emotions of the users of the product itself, hand sketches will have to be approved before finalization.\n\nIn this way, we always complete the work smoothly and on schedule.',
        images: [{ src: A('s-800x800_b8a9b78a-9620-4c2d-aeec-c048c142f322.gif') }],
        cols: 1,
        bg: 'rgba(255, 237, 157, 0.47)',
      },
      {
        text: "In readying Daesang Wellife to penetrate new markets, we've revitalized the brand experience with vibrant colors, captivating illustrations, and youthful messaging tailored to appeal to fresh customer demographics.",
        images: [{ src: A('s-1080x1080_v-fs_webp_bb1899b8-0c4d-46fd-9093-356998aa14a0.jpg') }],
        cols: 1,
      },
      {
        title: 'Long lasting results',
        text: "With quality comes trust. Once customers recognize the benefits of a healthy lifestyle, Daesang Wellife becomes a trusted companion on their journey. From there, it's simply about reinforcing the brand's image to inspire individuals to transition from understanding to action, leveraging Daesang Wellife products along the way.",
        images: [{ src: A('s-500x500_f62e74d7-cfb9-42e3-bead-d1c87c02716d.gif') }],
        cols: 1,
      },
    ],
    next: { label: 'Next case study', name: 'Mars Cats Voyage', href: '/work/mars-cats-voyage', img: A('s-643x471_v-fs_webp_188155c0-fa96-4b20-b860-5c94072f9d3d.png') },
  },
  // ============================================================ DAESANG — VI
  {
    slug: 'daesang',
    lang: 'vi',
    name: 'DAESANG',
    pageTitle: 'DAESANG | 126Verse',
    meta: { typeLabel: 'Loại dự án', type: 'Thương hiệu sản phẩm', stageLabel: 'Vai trò', stage: 'Trưởng nhóm', deliverLabel: 'Bàn giao', deliver: 'Các sản phẩm POSM, Social post, Video quảng cáo' },
    hero: [{ src: A('s-1152x648_ae57d16a-04f7-4e4d-87c0-e383c47c24b0.gif'), alt: 'DAESANG' }, { src: A('s-415x176_webp_0080bc92-e5d9-4424-a22d-048a114bc6f2.png'), alt: 'Wellife' }],
    sections: [
      { label: 'Bối cảnh', lead: 'Daesang đang cách mạng hóa ngành thực phẩm sức khỏe bằng cách xây dựng sản phẩm và hình ảnh dễ tiếp cận, mang lại sự tác động và lòng tin với cộng đồng yêu sức khỏe. Chúng tôi đã cộng tác chặt chẽ với các nhóm nội bộ của Daesang về thiết kế sản phẩm, thương hiệu, chiến lược và kỹ thuật để nâng cao hình ảnh và dịch vụ kỹ thuật số của họ.' },
      { images: [{ src: A('s-2400x2400_v-frms_webp_fe5fb210-28bf-48b2-bb67-5336f10dd527.png'), alt: 'campaign 01' }], cols: 1 },
      {
        title: 'Công ty tạo ra một tương lai hạnh phúc với văn hóa thực phẩm lành mạnh',
        text: 'Xuất hiện từ 2002, hiện nay Daesang Welllife là một trong những sản phẩm hàng đầu về chăm sóc sức khỏe. Điều bạn có thể chưa biết là chúng có thể giúp bạn chăm sóc bản thân bằng cách tiện lợi nhất.',
      },
      {
        images: [
          { src: A('s-1152x648_c6e00156-b010-4520-ad9b-fafdc182343b.gif') },
          { src: A('s-1152x648_c86d224f-b014-437c-a0db-8dbb0b531087.gif') },
          { src: A('s-1152x648_603b9cb6-74c1-4b81-bd9f-469adbca1572.gif') },
        ],
        cols: 3,
      },
      { label: 'Tầm nhìn', lead: 'Chuyển đổi Daesang Wellife từ một dịch vụ cung cấp thực phẩm chăm sóc sức khỏe trở thành một thương hiệu đi cùng lối sống khỏe toàn diện, dựa trên mục tiêu mang lại cảm giác gần gũi, dễ tiếp cận trong mọi hoàn cảnh hằng ngày.' },
      {
        images: [
          { src: A('s-1080x1080_v-fs_webp_6af395f0-c228-449a-ae56-79f2efe63962.jpg') },
          { src: A('s-1080x1080_v-fs_webp_958640d4-1d04-4f39-be6d-11165ec3e755.jpg') },
        ],
        cols: 2,
      },
      { label: 'Nhiều sản phẩm, một thương hiệu', lead: 'Một thương hiệu linh hoạt tập hợp tất cả các dịch vụ của Daesang thành một trải nghiệm đẹp đẽ, lấy sức khỏe khách hàng làm trung tâm.' },
      { images: [{ src: A('s-800x800_0445dacb-1d07-471f-96cf-b22fcbb76a07.gif') }, { src: A('s-415x176_webp_0080bc92-e5d9-4424-a22d-048a114bc6f2.png') }], cols: 2, bg: '#fff4e9' },
      {
        title: 'Mở rộng và Chia sẽ',
        text: 'Với mục tiêu đồng hành cùng sức khỏe của người dùng, Daesang luôn cố gắng là đối tác chiến lược của các hoạt động, tổ chức thể thao - hình ảnh của sự tập luyện và sức khỏe!\n\nChúng tôi đã đi cùng và thiết kế các cột mốc quan trọng. Luôn đảm bảo tính hình ảnh của thương hiệu và tôn trọng đối tác - điều làm chúng tôi luôn tự hào.',
      },
      {
        images: [
          { src: A('s-1080x1080_v-fs_webp_fff34698-9f29-4673-bf01-993875f30ed7.jpg') },
          { src: A('s-1080x1080_v-fs_webp_8a8da719-f0ee-4e22-a9f2-51e6e5232b4b.jpg') },
          { src: A('s-1440x1440_v-fms_webp_bf109a25-c1ad-44f5-8c8e-5616c0487202.jpg') },
        ],
        cols: 3,
      },
      {
        quote: {
          quote: '“Tôi luôn ngạc nhiên về chất lượng công việc mà 126Verse tạo ra. Ngay từ ngày đầu, 126Verse đã có được thương hiệu của chúng tôi, tạo ra một số thiết kế tuyệt đẹp và đảm bảo toàn bộ quá trình diễn ra suôn sẻ.”',
          name: 'Linwei Deng',
          role: 'Daesang Wellife Global Business Dept. Manager',
          img: A('s-800x800_v-fs_webp_76741bd0-ec48-4d95-98d1-388ce60136cf.jpg'),
        },
      },
      {
        title: 'Cách tiếp cận của 126Verse',
        text: 'Tất cả các hình ảnh cho kế hoạch truyền thông đều được chi tiết về mặt cảm xúc của người dùng chính sản phẩm đó, các bản phác thảo bằng tay sẽ phải được thông qua trước khi hoàn thiện.\n\nCùng cách này chúng tôi luôn hoàn thành công việc 1 cách suôn sẻ và đúng dự định.',
        images: [{ src: A('s-800x800_b8a9b78a-9620-4c2d-aeec-c048c142f322.gif') }],
        cols: 1,
        bg: 'rgba(255, 237, 157, 0.46)',
      },
      {
        text: 'Để chuẩn bị cho Daesang welllife tiếp cận các thị trường mới, chúng tôi đã cập nhật, đưa thương hiệu vào trải nghiệm với màu sắc vui tươi, hình minh họa hấp dẫn và thông điệp tươi trẻ cho nhóm khách hàng mới.',
        images: [{ src: A('s-1080x1080_v-fs_webp_bb1899b8-0c4d-46fd-9093-356998aa14a0.jpg') }],
        cols: 1,
      },
      {
        title: 'Kết quả lâu dài',
        text: 'Với chất lượng đi kèm với sự tin tưởng. Một khi khách hàng bị thuyết phục về những lợi ích của lối sống sức khỏe, họ có thể coi Daesang wellife là công cụ trợ giúp họ trên hành trình của mình. Từ đó, vấn đề chỉ là làm nổi bật hình ảnh thương hiệu xuyên suốt để khuyến khích mọi người chuyển từ sự hiểu biết sang hành động bằng cách sử dụng sản phẩm của Daesang welllfie.',
        images: [{ src: A('s-500x500_f62e74d7-cfb9-42e3-bead-d1c87c02716d.gif') }],
        cols: 1,
      },
    ],
    next: { label: 'Tiếp theo', name: 'Mars Cats Voyage', href: '/vi/work/mars-cats-voyage', img: A('s-643x471_v-fs_webp_188155c0-fa96-4b20-b860-5c94072f9d3d.png') },
  },
];
