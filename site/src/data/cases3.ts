// Nội dung case study (phần 3) — port NGUYÊN VĂN từ 126verse.com
import type { CaseStudy } from './cases';

const A = (f: string) => '/img/a/' + f;

export const cases3: CaseStudy[] = [
  // ============================================================ CHEER — EN
  {
    slug: 'cheer',
    lang: 'en',
    name: 'CHEER',
    pageTitle: 'CHEER | 126Verse',
    meta: { typeLabel: 'Project Type', type: 'Application Design', stageLabel: 'Stage', stage: 'Leader', deliverLabel: 'Deliverables', deliver: 'UI-UX Design, UI Library, Framework' },
    hero: [{ src: A('s-2400x1291_v-frms_webp_5631e05d-136c-4582-b892-dab3271a6b24.png'), alt: 'CHEER' }],
    sections: [
      { label: 'Introduction', lead: 'CHEER approached us with an unconventional request. Rather than assigning us the entire product or a specific set of features, they sought our collaboration as an extension of their internal design team. This allowed us to push boundaries, challenge existing perspectives, and provide innovative insights.' },
      { text: 'They desire a straightforward design and seamless operability that simplifies tasks for users.' },
      {
        images: [
          { src: A('s-376x808_v-fs_webp_654ef25f-bbb2-48a4-966c-381c6dd9bdeb.png') },
          { src: A('s-282x830_v-fs_webp_6f310f73-7138-4a11-95f2-fb39dc3b1c9d.png') },
          { src: A('s-282x805_v-fs_webp_51fef43f-fe07-423d-b247-74127f6c06dc.png') },
          { src: A('s-373x812_v-fs_webp_1ab1c90d-24e9-4704-9355-86f3e642f13f.png') },
        ],
        cols: 4,
      },
      { label: 'The vision', lead: 'Born from a desire to facilitate seamless real-time transactions of US stocks and ETFs for domestic investors, with the option to start from as little as 500 yen.\n\nCHEER aims to cater to a wide range of customer demographics, spanning from housewives to seasoned professional investors.' },
      {
        images: [
          { src: A('s-1152x648_e9a9d481-8de8-4cee-880f-89ab5951721e.gif') },
          { src: A('s-526x296_ca7144a7-2738-4372-b27b-c383c49fa410.webp') },
        ],
        cols: 2,
        bg: '#fdf9f0',
      },
      {
        title: 'Simple to begin - seamless to sustain',
        text: 'To delve into the core issues that make trading software daunting and frustrating for newcomers, we conducted surveys with four distinct focus groups comprising consultants, analysts, entrepreneurs, and designers. Through this process, we unearthed common pain points related to visualization, task optimization, and application consistency.\n\nIf we aspire to drive transformation, we must reimagine these familiar tools in ways that are both relevant and refreshingly unique, ensuring they feel intuitive and seamless in their execution.',
      },
      {
        images: [
          { src: A('s-936x936_v-fs_webp_3d487d9b-a7ab-43f5-ae80-4b8b065989f4.png') },
          { src: A('s-372x293_webp_7f9732ea-8fb4-493f-b305-8eab86b8b643.png') },
          { src: A('s-372x813_v-fs_webp_14fbfd88-fc32-4c1d-af87-d0b412d58eb8.png') },
          { src: A('s-373x808_v-fs_webp_a0556083-070b-42ce-970f-d9c90c57ebb8.png') },
        ],
        cols: 4,
      },
      { label: 'Interface development', lead: 'In our creative exploration of CHEER\'s visual identity, we tested the hypothesis of "evolution, not revolution." Our aim was to showcase the modern, dynamic potential of trading software while maintaining the integrity and security of our customers\' investments. Ultimately, we found a balanced approach, leveraging signature colors and custom iconography to add visual interest and personalization without compromising professionalism.' },
      {
        images: [
          { src: A('s-1200x381_v-fms_webp_a4ca6c2c-8fa3-4186-a0f7-629a590d6925.jpg') },
          { src: A('s-936x703_v-fs_webp_8d90e42a-e7e2-4973-bfe3-b98a4fbe5d54.png') },
          { src: A('s-936x862_v-fs_webp_ef5869e4-c395-4284-a569-df1a42b81b7a.png') },
          { src: A('s-1000x1000_v-fs_webp_137231e4-542a-4a0b-b729-b0402958d39f.png') },
        ],
        cols: 4,
      },
      {
        quote: {
          quote: '" Together with CHEER, we\'ve cultivated an optimal creative environment where introducing new ideas feels secure and encouraged. "',
          name: 'Felix Phan',
          role: 'Founder 126VERSE',
          img: A('s-264x334_webp_471163cd-9fe2-46f1-a32f-b6c47f7d9ae8.png'),
        },
      },
      {
        quote: {
          quote: '"Through our collaboration with 126VERSE, I gained valuable insights into the premium product design process."',
          name: 'Nobuyuki Kobayashi',
          role: 'Representative Director and President of CHEER Securities Inc.',
          img: A('s-800x800_367a1eb3-53c8-4f5f-a26c-0b462c56f9fe.gif'),
        },
      },
    ],
    next: { label: 'Next case study', name: 'Human First Time', href: '/work/human-first-time', img: A('s-480x480_ade8ef34-d7e2-47f8-b833-563eb7bcbc96.gif') },
  },
  // ============================================================ CHEER — VI
  {
    slug: 'cheer',
    lang: 'vi',
    name: 'CHEER',
    pageTitle: 'CHEER | 126Verse',
    meta: { typeLabel: 'Loại dự án', type: 'Ứng dụng di động', stageLabel: 'Vai trò', stage: 'Trưởng nhóm', deliverLabel: 'Bàn giao', deliver: 'UI-UX Design, UI Library, Framework' },
    hero: [{ src: A('s-2400x1291_v-frms_webp_5631e05d-136c-4582-b892-dab3271a6b24.png'), alt: 'CHEER' }],
    sections: [
      { label: 'Bối cảnh', lead: 'CHEER yêu cầu chúng tôi có một chút khác thường. Thay vì yêu cầu chúng tôi giải quyết toàn bộ sản phẩm hoặc phụ trách một bộ tính năng xác định, họ muốn chúng tôi hoạt động như một phần mở rộng của nhóm thiết kế nội bộ của họ để có thể thử thách dẫn dắt suy nghĩ của họ và đưa ra những góc nhìn mới mẻ.' },
      { text: 'Họ muốn Thiết kế đơn giản và khả năng hoạt động dễ hiểu giúp người dùng dễ dàng thực hiện mọi tác vụ.' },
      {
        images: [
          { src: A('s-376x808_v-fs_webp_654ef25f-bbb2-48a4-966c-381c6dd9bdeb.png') },
          { src: A('s-282x830_v-fs_webp_6f310f73-7138-4a11-95f2-fb39dc3b1c9d.png') },
          { src: A('s-282x805_v-fs_webp_51fef43f-fe07-423d-b247-74127f6c06dc.png') },
          { src: A('s-373x812_v-fs_webp_1ab1c90d-24e9-4704-9355-86f3e642f13f.png') },
        ],
        cols: 4,
      },
      { label: 'Tầm nhìn', lead: 'Xuất phát từ việc muốn giúp các nhà đầu tư nội địa có thể dễ dàng thực hiện các giao dịch chứng khoáng Hoa Kỳ và quỹ ETF Hoa Kỳ thời gian thực cũng như các giao dịch nội địa với số tiền nhỏ nhất chỉ từ 500 yên.\n\nCHEER muốn phục vụ hầu hết các nhóm khách hàng từ những nhà nội trợ cho đến các nhà đầu tư chuyên nghiệp.' },
      {
        images: [
          { src: A('s-1152x648_e9a9d481-8de8-4cee-880f-89ab5951721e.gif') },
          { src: A('s-526x296_ca7144a7-2738-4372-b27b-c383c49fa410.webp') },
        ],
        cols: 2,
        bg: '#fdf9f0',
      },
      {
        title: 'Dễ dàng bắt đầu và dễ dàng tiếp tục',
        text: 'Để tìm hiểu cốt lõi nguyên nhân khiến phần mềm giao dịch trở nên khó chịu và khó bắt đầu, chúng tôi đã yêu cầu bốn nhóm trọng điểm gồm các nhà tư vấn, nhà phân tích, doanh nhân và nhà thiết kế viết ra những khó khăn của họ. Từ thu thập này, chúng tôi biết được rằng mọi người không thất vọng về chức năng cốt lõi cũng như về tổng thể các bộ phận, mà chính là khả năng hiển thị trực quan, việc tối ưu hóa các tác vụ và tính nhất quán của ứng dụng.\n\nNếu muốn tạo ra sự chuyển đổi, chúng tôi phải nâng cấp các công cụ này quen thuộc theo cách phù hợp và khác biệt một cách mới mẻ theo những cách mang lại cảm giác trực quan và vô hình.',
      },
      {
        images: [
          { src: A('s-936x936_v-fs_webp_3d487d9b-a7ab-43f5-ae80-4b8b065989f4.png') },
          { src: A('s-372x293_webp_7f9732ea-8fb4-493f-b305-8eab86b8b643.png') },
          { src: A('s-372x813_v-fs_webp_14fbfd88-fc32-4c1d-af87-d0b412d58eb8.png') },
          { src: A('s-373x808_v-fs_webp_a0556083-070b-42ce-970f-d9c90c57ebb8.png') },
        ],
        cols: 4,
      },
      { label: 'Phát triển giao diện', lead: 'Chúng tôi thử nghiệm giả thuyết “tiến hóa chứ không phải cách mạng” trong quá trình khám phá sáng tạo về bản sắc hình ảnh của CHEER. Chúng tôi muốn thể hiện tiềm năng hiện đại, tràn đầy năng lượng của phần mềm giao dịch đồng thời là sự uy tín, an toàn về các khoản đầu tư của khách hàng. Cuối cùng, chúng tôi đã đề xuất một phương án hài lòng giữa cả hai, dựa vào màu sắc đặc trưng và hình tượng tùy chỉnh để tạo sự thú vị về mặt hình ảnh và cá nhân hóa mà không quá vui đùa.' },
      {
        images: [
          { src: A('s-1200x381_v-fms_webp_a4ca6c2c-8fa3-4186-a0f7-629a590d6925.jpg') },
          { src: A('s-936x703_v-fs_webp_8d90e42a-e7e2-4973-bfe3-b98a4fbe5d54.png') },
          { src: A('s-936x862_v-fs_webp_ef5869e4-c395-4284-a569-df1a42b81b7a.png') },
          { src: A('s-1000x1000_v-fs_webp_137231e4-542a-4a0b-b729-b0402958d39f.png') },
        ],
        cols: 4,
      },
      {
        quote: {
          quote: '" Cùng với CHEER, chúng tôi đã cùng nhau nuôi dưỡng một môi trường sáng tạo lý tưởng, nơi có đủ an toàn để đưa vào những thứ mới mẻ. "',
          name: 'Felix Phan',
          role: 'Founder 126VERSE',
          img: A('s-264x334_webp_471163cd-9fe2-46f1-a32f-b6c47f7d9ae8.png'),
        },
      },
      {
        quote: {
          quote: '"Tôi đã học được rất nhiều điều về quy trình thiết kế sản phẩm đẳng cấp thông qua dự án của chúng tôi với 126VERSE "',
          name: 'Nobuyuki Kobayashi',
          role: 'Giám đốc đại diện và Chủ tịch CHEER Securities Inc.',
          img: A('s-800x800_367a1eb3-53c8-4f5f-a26c-0b462c56f9fe.gif'),
        },
      },
    ],
    next: { label: 'Tiếp theo', name: 'Human First Time', href: '/vi/work/human-first-time', img: A('s-480x480_ade8ef34-d7e2-47f8-b833-563eb7bcbc96.gif') },
  },
  // ============================================================ H1T — EN
  {
    slug: 'human-first-time',
    lang: 'en',
    name: 'Human First Time',
    pageTitle: 'Human First Time | 126Verse',
    meta: { typeLabel: 'Project Type', type: 'Application Design', stageLabel: 'Stage', stage: 'Leader', deliverLabel: 'Deliverables', deliver: 'UI-UX Design, UI Library, Framework' },
    hero: [{ src: A('s-1404x644_v-fms_webp_941c09ea-5a75-4c9a-82e6-e30ac087ded2.png'), alt: 'Human First Time' }, { src: A('s-1080x2336_f68f3db8-7b98-43bf-96d4-a34d549bb2de.gif') }],
    sections: [
      { label: 'Introduction', lead: 'With hourly workplaces distributed nationwide and operational around the clock, serving hundreds of customers daily, H1T sought our assistance in developing a user-friendly booking interface. They emphasized the importance of centralizing all essential information and streamlining the booking process to be the shortest step possible, with a focus on displaying statuses using easily understandable imagery.' },
      {
        title: 'As of the end of March 2024',
        text: '* 151 H¹T stores\n* 17 H¹TBOX locations\n* 132 affiliated stores',
        iframe: 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d41962.6750788348!2d139.7017632058915!3d35.668631084562016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zSMK5VOW6l-iIl-S4gOimpw!5e0!3m2!1svi!2s!4v1713627713020!5m2!1svi!2s',
        iframeRatio: '4/3',
      },
      { lead: 'A contemporary perspective on the workplace', text: "We developed an application for booking workplaces based on users' preferences, enhancing people's work experiences by providing access to suitable spaces." },
      {
        images: [
          { src: A('s-2048x1536_v-frms_webp_779cadce-4c37-4a9b-8374-204fd7cb8d3d.jpg') },
          { src: A('s-680x453_v-fs_webp_14a1702b-a6b6-4adb-a0cd-19b1add0b6de.jpg') },
          { src: A('s-680x454_v-fs_webp_9af406a1-b427-4640-8b42-6491f1dde3b0.jpg') },
          { src: A('s-680x454_v-fs_webp_452fac67-18ef-4f0f-b520-57a0ee4b2fd7.jpg') },
        ],
        cols: 4,
      },
      {
        title: 'Open new paths for new needs',
        text: "In today's fast-evolving work landscape, both the nature of work and our collaborators have undergone rapid transformation. Yet, traditional workspaces often fail to accommodate this shift, leaving us mentally tethered between work and home. By transcending these constraints, we enable greater freedom in our work.\n\nOur designs prioritize simplicity in the booking process, fostering a sense of ease and enjoyment in accessing the workspace, anytime, anywhere.",
      },
      {
        images: [
          { src: A('s-333x887_v-fs_webp_fcdd2d7e-3e8f-4cc0-b137-367ca7720d74.png') },
          { src: A('s-335x829_v-fs_webp_84b96186-1503-4a47-918b-63f9bbd6c808.png') },
          { src: A('s-334x1028_v-fs_webp_adabd59f-b352-4d8c-aab8-4d4013548a94.png') },
        ],
        cols: 3,
      },
      { label: 'The vision', lead: 'Unlike existing workspace booking platforms, H1T focuses on what people can gain from a comfortable, energetic, and convenient workplace. This space will create new valuable time for workers.' },
      { images: [{ src: A('s-1144x290_v-fs_webp_ac9d7e81-91f7-4d4b-b21f-fb6760b65802.jpg') }], cols: 1 },
      {
        quote: {
          quote: '"It\'s been a pleasure collaborating with 126VERSE. Their genuine passion for their work shines through, and they bring a wealth of experience and expertise to the table."',
          name: 'Yuki Sakai',
          role: 'Head of marketing department (H1T)',
          img: A('s-371x480_4be4e71c-df10-4764-97e2-1c14df714054.gif'),
        },
      },
    ],
    next: { label: 'Next case study', name: 'FamiPay', href: '/work/famipay', img: A('s-1051x765_v-fs_webp_0c4e4b8f-a20a-4451-bb09-587256a8c340.png') },
  },
  // ============================================================ H1T — VI
  {
    slug: 'human-first-time',
    lang: 'vi',
    name: 'Human First Time',
    pageTitle: 'Human First Time | 126Verse',
    meta: { typeLabel: 'Loại dự án', type: 'Ứng dụng di động', stageLabel: 'Vai trò', stage: 'Trưởng nhóm', deliverLabel: 'Bàn giao', deliver: 'UI-UX Design, UI Library, Framework' },
    hero: [{ src: A('s-1404x644_v-fms_webp_941c09ea-5a75-4c9a-82e6-e30ac087ded2.png'), alt: 'Human First Time' }, { src: A('s-1080x2336_f68f3db8-7b98-43bf-96d4-a34d549bb2de.gif') }],
    sections: [
      { label: 'Bối cảnh', lead: 'Với hệ thống chỗ làm việc theo giờ khắp cả nước và thời gian hoạt động gần như toàn bộ thời gian trong ngày, phục vụ hàng trăm khách hàng mỗi ngày. H1T muốn chúng tôi giúp họ có 1 bản thiết kế thật dễ sử dụng cho việc đặt chỗ. Tất cả các thông tin cần thiết cần được tập trung vào trung tâm. Tác vụ đặt chỗ ngắn bước nhất, đặc biệt tìm cách hiển thị các trạng thái bằng hình ảnh dễ hiểu.' },
      {
        title: 'Tính đến cuối tháng 3 năm 2024',
        text: '* 151 cửa hàng H¹T\n* 17 địa điểm H¹TBOX\n* 132 cửa hàng trực thuộc',
        iframe: 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d41962.6750788348!2d139.7017632058915!3d35.668631084562016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zSMK5VOW6l-iIl-S4gOimpw!5e0!3m2!1svi!2s!4v1713627713020!5m2!1svi!2s',
        iframeRatio: '4/3',
      },
      { lead: 'Một cách tiếp cận hiện đại về nơi làm việc', text: 'Chúng tôi thiết kế 1 ứng dụng đặt chỗ làm việc theo ý người dùng, giúp mọi người thích làm việc hơn khi có những không gian phù hợp.' },
      {
        images: [
          { src: A('s-2048x1536_v-frms_webp_779cadce-4c37-4a9b-8374-204fd7cb8d3d.jpg') },
          { src: A('s-680x453_v-fs_webp_14a1702b-a6b6-4adb-a0cd-19b1add0b6de.jpg') },
          { src: A('s-680x454_v-fs_webp_9af406a1-b427-4640-8b42-6491f1dde3b0.jpg') },
          { src: A('s-680x454_v-fs_webp_452fac67-18ef-4f0f-b520-57a0ee4b2fd7.jpg') },
        ],
        cols: 4,
      },
      {
        title: 'Mở đường mới cho nhu cầu mới',
        text: 'Cách bạn làm việc và cả những người bạn làm việc cùng đã thay đổi nhanh chóng. Vậy nơi làm việc của bạn thì sao? Nhiều lúc suy nghĩ của bạn không nằm ở nơi làm việc hay thậm chí không có ở nhà. Nếu có thể thoát khỏi điều này, chúng ta sẽ có thể làm việc tự do hơn. Nó không bị ràng buộc bởi môi trường, không gian hay thời gian.\n\nCác bản thiết kế cũng được đảm bảo mang đến sự tinh gọn cho việc đặt chỗ, tinh thần thỏa mái vui vẻ tiếp cận được đặt lên hàng đầu.',
      },
      {
        images: [
          { src: A('s-333x887_v-fs_webp_fcdd2d7e-3e8f-4cc0-b137-367ca7720d74.png') },
          { src: A('s-335x829_v-fs_webp_84b96186-1503-4a47-918b-63f9bbd6c808.png') },
          { src: A('s-334x1028_v-fs_webp_adabd59f-b352-4d8c-aab8-4d4013548a94.png') },
        ],
        cols: 3,
      },
      { label: 'Tầm nhìn', lead: 'Không giống như các nền tảng đặt chỗ làm việc hiện có, H1T tập trung vào những gì mọi người có thể đạt được từ một nơi làm việc thỏa mái, năng lượng và tiện nghi. Không gian này sẽ tạo ra thời gian quý giá mới cho người làm việc.' },
      { images: [{ src: A('s-1144x290_v-fs_webp_ac9d7e81-91f7-4d4b-b21f-fb6760b65802.jpg') }], cols: 1 },
      {
        quote: {
          quote: '" Thật vui khi được làm việc với 126VERSE. Họ thực sự đam mê những gì họ làm và họ mang đến nhiều kinh nghiệm và kiến ​​thức chuyên môn. "',
          name: 'Yuki Sakai',
          role: 'Head of marketing department (H1T)',
          img: A('s-371x480_4be4e71c-df10-4764-97e2-1c14df714054.gif'),
        },
      },
    ],
    next: { label: 'Tiếp theo', name: 'FamiPay', href: '/vi/work/famipay', img: A('s-1051x765_v-fs_webp_0c4e4b8f-a20a-4451-bb09-587256a8c340.png') },
  },
  // ============================================================ FAMIPAY — EN
  {
    slug: 'famipay',
    lang: 'en',
    name: 'FamiPay',
    pageTitle: 'FamiPay | 126Verse',
    meta: { typeLabel: 'Project Type', type: 'Application Design', stageLabel: 'Stage', stage: 'Leader', deliverLabel: 'Deliverables', deliver: 'UI-UX Design, UI Library, Framework' },
    hero: [{ src: A('s-840x400_v-fs_webp_f524ecdf-b5f5-4b04-97ba-b88dc21b7a15.jpg'), alt: 'FamiPay' }, { src: A('s-240x240_webp_2ab18cb0-4bdd-448c-aaeb-5efe44cfcfea.png') }],
    sections: [
      { label: 'Introduction', lead: "We've collaborated to co-develop the interface for the FamiPay payment application, catering to over 17,000 FamilyMart stores nationwide, as well as pharmacies and home electronics retailers in the region. FamilyMart's reliance on our expertise underscores the significance of this project." },
      {
        images: [
          { src: A('s-1060x795_v-fs_webp_f383385c-bc10-40f6-87b7-069f30814d12.jpg') },
          { src: A('s-510x421_webp_c7cf7cda-6045-4fd3-8b8f-565aadf411dd.png') },
          { src: A('s-166x296_93b51b9f-91b7-4ae7-b3ea-0372c39eb1bd.webp') },
          { src: A('s-166x296_030c640a-0d34-4a6e-89ac-2ec4c20d3ee1.webp') },
        ],
        cols: 4,
        bg: '#EEEEEE',
      },
      {
        title: 'Main functions at FamiPay:',
        text: '- Mobile payment service accessible not only at FamilyMart but also at other physical and online stores.\n\n- Convenient access to purchase history.\n\n- Integration of FamiPay coupons and reward point system',
        images: [{ src: A('s-1051x765_v-fs_webp_a34296bc-8654-4a31-87ca-a17e97d0acd7.png') }],
        cols: 1,
      },
      { lead: 'Our task is to streamline the process of reaching the target from the home screen, presenting content concisely with the aid of illustrative icons.' },
      {
        images: [
          { src: A('s-567x1221_v-fms_webp_493d7366-e35f-418c-8e35-536ba82d7dbe.png') },
          { src: A('s-565x1223_v-fms_webp_805e9a57-3612-4ac9-83e1-229f7088059e.png') },
          { src: A('s-650x140_v-fs_webp_5e0f9625-028a-4226-8664-1f06372e6d42.jpg') },
        ],
        cols: 3,
      },
      {
        title: 'Easy to understand from the outset',
        text: "You won't need instructions, just download and use it as it is, and it will work exactly as you want. We need to do this since we already have over 5 million customers from the domestic market of FamilyMart. And it has been successful.",
      },
      {
        images: [
          { src: A('s-426x466_webp_f47ab495-3f63-4791-9566-8e258c722e39.png') },
          { src: A('s-459x992_v-fs_webp_4f3044f7-199c-49ad-8ebd-740cd29e8ed6.png') },
          { src: A('s-375x809_v-fs_webp_00888074-4a68-46f5-b890-a1890d420efc.png') },
          { src: A('s-377x808_v-fs_webp_e0d61bc9-2cbe-4ab6-9406-799108dfbdf5.png') },
        ],
        cols: 4,
      },
      { label: 'The vision', lead: 'Delivering a user-friendly payment platform accessible to a wide range of users, steadily establishing itself as the premier payment application in Japan.' },
      { images: [{ src: A('s-1024x576_v-fs_webp_592496f5-9ffb-4ff3-a40f-62a640dbad39.jpg') }], cols: 1 },
      {
        title: 'Design key steps as a navigational tool to establish expectations and guide users through their journey from discovery to coupon fulfillment.',
        images: [
          { src: A('s-1920x1080_301a82ea-1c6f-4586-8a86-4e5deda1d615.webp'), alt: 'KV' },
          { src: A('s-453x982_v-fs_webp_1e1e3bc7-aefb-4320-9265-bd20bd32c12f.png') },
          { src: A('s-452x978_v-fs_webp_c11eda79-d7d5-4c59-a0e1-c7b58d69c127.png') },
        ],
        cols: 3,
      },
      {
        title: 'A worthy endeavor',
        items: [
          { label: 'Result', text: 'Since its release, FamiPay has provided immediate access to customers, enabling continuous feedback and ongoing development.' },
        ],
      },
      {
        stats: [
          { num: '5', label: 'Milion Downloads' },
          { num: '4,3', label: 'point on Appstore and CHplay' },
          { num: '63', label: 'Thousand reviews' },
        ],
      },
    ],
    next: { label: 'Next case study', name: 'YAMAHA Music', href: '/work/yamaha-music', img: A('s-960x540_v-fs_webp_64bac0da-d9f2-4c7e-859e-21167dffb7f0.jpg') },
  },
  // ============================================================ FAMIPAY — VI
  {
    slug: 'famipay',
    lang: 'vi',
    name: 'FamiPay',
    pageTitle: 'FamiPay | 126Verse',
    meta: { typeLabel: 'Loại dự án', type: 'Ứng dụng di động', stageLabel: 'Vai trò', stage: 'Trưởng nhóm', deliverLabel: 'Bàn giao', deliver: 'UI-UX Design, UI Library, Framework' },
    hero: [{ src: A('s-840x400_v-fs_webp_f524ecdf-b5f5-4b04-97ba-b88dc21b7a15.jpg'), alt: 'FamiPay' }, { src: A('s-240x240_webp_2ab18cb0-4bdd-448c-aaeb-5efe44cfcfea.png') }],
    sections: [
      { label: 'Bối cảnh', lead: 'Chúng tôi hợp tác để cùng phát triển giao diện cho ứng dụng thanh toán FamiPay cho hơn 17.000 của hàng FamilyMart trên toàn quốc, các hiệu thuốc và các nhà bán lẻ đồ điện tử gia dụng trong khu vực. FamilyMart cần những gì tinh túy nhất của chúng tôi trong dự án này.' },
      {
        images: [
          { src: A('s-1060x795_v-fs_webp_f383385c-bc10-40f6-87b7-069f30814d12.jpg') },
          { src: A('s-510x421_webp_c7cf7cda-6045-4fd3-8b8f-565aadf411dd.png') },
          { src: A('s-166x296_93b51b9f-91b7-4ae7-b3ea-0372c39eb1bd.webp') },
          { src: A('s-166x296_030c640a-0d34-4a6e-89ac-2ec4c20d3ee1.webp') },
        ],
        cols: 4,
        bg: '#EEEEEE',
      },
      {
        title: 'Chức năng chính ở FamiPay :',
        text: '- Dịch vụ thanh toán trên điện thoại. Việc thanh toán có thể được thực hiện không chỉ tại FamilyMart mà còn tại các cửa hàng và cửa hàng trực tuyến khác.\n\n- Kiểm tra lịch sử mua hàng.\n\n- Các chức năng của phiếu giảm giá FamiPay, tích điểm.',
        images: [{ src: A('s-1051x765_v-fs_webp_a34296bc-8654-4a31-87ca-a17e97d0acd7.png') }],
        cols: 1,
      },
      { lead: 'Công việc của chúng tôi là làm tối giản các thao tác để đến các trang đích từ màn hình chính, thể hiện nội dung chính xác bằng icon minh họa.' },
      {
        images: [
          { src: A('s-567x1221_v-fms_webp_493d7366-e35f-418c-8e35-536ba82d7dbe.png') },
          { src: A('s-565x1223_v-fms_webp_805e9a57-3612-4ac9-83e1-229f7088059e.png') },
          { src: A('s-650x140_v-fs_webp_5e0f9625-028a-4226-8664-1f06372e6d42.jpg') },
        ],
        cols: 3,
      },
      {
        title: 'Dễ dàng để hiểu ngay từ đầu',
        text: 'Bạn sẽ không cần đến hướng dẫn sử dụng chỉ cần tải về và sử dụng như nó luôn ở đó và hoạt động đúng như ý của bạn. Chúng tôi cần làm được như vậy khi đã có sẵn hơn 5 triệu khách hàng từ FamilyMart thị trường nội địa. Và nó đã thành công.',
      },
      {
        images: [
          { src: A('s-426x466_webp_f47ab495-3f63-4791-9566-8e258c722e39.png') },
          { src: A('s-459x992_v-fs_webp_4f3044f7-199c-49ad-8ebd-740cd29e8ed6.png') },
          { src: A('s-375x809_v-fs_webp_00888074-4a68-46f5-b890-a1890d420efc.png') },
          { src: A('s-377x808_v-fs_webp_e0d61bc9-2cbe-4ab6-9406-799108dfbdf5.png') },
        ],
        cols: 4,
      },
      { label: 'Tầm nhìn', lead: 'Cung cấp nền tảng thanh toán dễ sử dụng, thân thiện với hầu hết người dùng, từng bước trở thành ứng dụng thanh toán được sử dụng nhiều nhất tại Nhật Bản.' },
      { images: [{ src: A('s-1024x576_v-fs_webp_592496f5-9ffb-4ff3-a40f-62a640dbad39.jpg') }], cols: 1 },
      {
        title: 'Thiết kế các bước quan trọng như một công cụ điều hướng nhằm đặt ra kỳ vọng và hướng dẫn người thanh toán thực hiện kế hoạch của họ từ khi khám phá đến thực hiện đơn hàng với phiếu giảm giá.',
        images: [
          { src: A('s-1920x1080_301a82ea-1c6f-4586-8a86-4e5deda1d615.webp'), alt: 'KV' },
          { src: A('s-453x982_v-fs_webp_1e1e3bc7-aefb-4320-9265-bd20bd32c12f.png') },
          { src: A('s-452x978_v-fs_webp_c11eda79-d7d5-4c59-a0e1-c7b58d69c127.png') },
        ],
        cols: 3,
      },
      {
        title: 'Con số ấn tượng',
        items: [
          { label: 'Kết quả', text: 'Kể từ khi phát hành FamiPay được tiếp cận ngay với khách hàng, nhận phản hồi và phát triển liên tục.' },
        ],
      },
      {
        stats: [
          { num: '5', label: 'Triệu lượt tải' },
          { num: '4,3', label: 'Điểm đánh giá trên CHplay và Appstore' },
          { num: '63', label: 'Nghìn lượt đánh giá' },
        ],
      },
    ],
    next: { label: 'Tiếp theo', name: 'YAMAHA Music', href: '/vi/work/yamaha-music', img: A('s-960x540_v-fs_webp_64bac0da-d9f2-4c7e-859e-21167dffb7f0.jpg') },
  },
];
