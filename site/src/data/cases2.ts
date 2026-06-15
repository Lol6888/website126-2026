// Nội dung case study (phần 2) — port NGUYÊN VĂN từ 126verse.com
import type { CaseStudy } from './cases';

const A = (f: string) => '/img/a/' + f;

export const cases2: CaseStudy[] = [
  // ============================================================ MARS CATS VOYAGE — EN
  {
    slug: 'mars-cats-voyage',
    lang: 'en',
    name: 'Mars Cats Voyage',
    pageTitle: 'Mars Cats Voyage | 126Verse',
    dark: true,
    meta: { typeLabel: 'Project Type', type: 'Creative, hand-draw', stageLabel: 'Stage', stage: 'Partner', deliverLabel: 'Deliverables', deliver: 'NFTs design' },
    hero: [{ src: A('s-1152x648_5dbd8d4f-e336-49d9-be7b-e62ba4d6926c.gif'), alt: 'Mars Cats Voyage' }],
    sections: [
      { label: 'Introduction', lead: 'Our team was brought together to create the Mars Alien Cats collection - one of six Mars Cats Voyage collections.' },
      { text: 'Mars Cats Voyage Collection :\n- OG Mars Cats\n- Mars Cats in Spacesuits\n- Mars Alien Cats\n- Mars Cats Specials\n- Mars Cats Collabs\n- MCV Honorary Members' },
      {
        images: [
          { src: A('s-700x700_v-fs_webp_d7e7491e-078a-44c4-af57-e1df4793d9e1.png'), alt: 'cat3' },
          { src: A('s-700x700_v-fs_webp_afecadaf-2ff2-4c11-8d11-5a76d16e1104.png'), alt: 'cat2' },
          { src: A('s-720x720_v-fs_webp_dec173ab-8fb4-47a8-ad66-c6c5a0cae97d.png') },
          { src: A('s-500x500_webp_4a915d7c-be0d-4294-bd76-06cc766bedf5.png'), alt: 'catt' },
        ],
        cols: 4,
      },
      {
        title: 'Welcome to\nMars Cats Voyage',
        text: 'The first limited collection of NFTs giving holders the ability to follow cats on a voyage to Mars, their eventual meeting with Aliens, the build-out of their colony and all the discoveries along the way.',
        images: [{ src: A('s-1286x910_v-fms_webp_45738851-1dfd-4ddf-bada-8f62bbd2e6bf.png') }],
        cols: 1,
      },
      { label: 'Every idea in sight holds potential.', lead: 'MCV aims for an extensively detailed collection with distinctiveness among each NFT. Achieving creativity for such a vast array demands the collective high imagination of each member and meticulous calculation of the required layers for every NFT. This ensures a satisfying collection delivered within the shortest timeframe possible.' },
      { images: [{ src: A('s-1152x648_35c807f3-679b-46f8-8c3f-0dae764a1590.gif') }], cols: 1 },
      {
        images: [
          { src: A('s-285x657_v-fs_webp_dfb88da1-49da-4956-96a3-2c8355b858a0.png') },
          { src: A('s-857x633_v-fs_webp_b15c95d6-d872-43fa-b27b-18dc112ba9cd.png') },
        ],
        cols: 2,
      },
      {
        title: 'The stats we care about',
        items: [
          { label: 'Result', text: 'The launch of Mars Cats Voyage made a significant impact on the community. Since its public release, the project has garnered immense attention and quickly sold out. Subsequently, its floor price has seen a steady rise, reaching nearly 0.5 ETH at its peak, from an initial mint price of 0.05 ETH. With numerous plans in the pipeline and promising potential ahead, the project continues to captivate interest for the foreseeable future.' },
        ],
      },
      {
        stats: [
          { num: '22,1', label: 'Thousand followers on X' },
          { num: '3,462', label: 'NFTs Owners' },
          { num: '2,954', label: 'ETH Total volume' },
        ],
      },
    ],
    next: { label: 'Next case study', name: 'Knowlegd JP', href: '/work/knowledge-japan', img: A('s-1437x1019_v-fms_webp_800c7d6a-bc16-42be-9dce-8bd2d5b43d4d.png') },
  },
  // ============================================================ MARS CATS VOYAGE — VI
  {
    slug: 'mars-cats-voyage',
    lang: 'vi',
    name: 'Mars Cats Voyage',
    pageTitle: 'Mars Cats Voyage | 126Verse',
    dark: true,
    meta: { typeLabel: 'Loại dự án', type: 'Sáng tạo, vẽ tay', stageLabel: 'Vai trò', stage: 'Nhóm thiết kế mở rộng', deliverLabel: 'Bàn giao', deliver: 'Bộ sưu tập NFTs' },
    hero: [{ src: A('s-1152x648_5dbd8d4f-e336-49d9-be7b-e62ba4d6926c.gif'), alt: 'Mars Cats Voyage' }],
    sections: [
      { label: 'Bối cảnh', lead: 'Nhóm chúng tôi đã được hợp tác để tạo ra bộ sưu tập Mars Alien Cats - là một trong sáu bộ sưu tập của Mars Cats Voyage.' },
      { text: 'Bộ sưu tập Mars Cats Voyage :\n- OG Mars Cats\n- Mars Cats in Spacesuits\n- Mars Alien Cats\n- Mars Cats Specials\n- Mars Cats Collabs\n- MCV Honorary Members' },
      {
        images: [
          { src: A('s-700x700_v-fs_webp_d7e7491e-078a-44c4-af57-e1df4793d9e1.png'), alt: 'cat3' },
          { src: A('s-700x700_v-fs_webp_afecadaf-2ff2-4c11-8d11-5a76d16e1104.png'), alt: 'cat2' },
          { src: A('s-720x720_v-fs_webp_dec173ab-8fb4-47a8-ad66-c6c5a0cae97d.png') },
          { src: A('s-500x500_webp_4a915d7c-be0d-4294-bd76-06cc766bedf5.png'), alt: 'catt' },
        ],
        cols: 4,
      },
      {
        title: 'Welcome to\nMars Cats Voyage',
        text: 'Bộ sưu tập NFT giới hạn đầu tiên mang đến cho người sở hữu khả năng theo dõi những chú mèo trong chuyến hành trình tới Sao Hỏa, cuộc gặp gỡ cuối cùng của họ với Người ngoài hành tinh, quá trình xây dựng thuộc địa của họ và tất cả những khám phá trên đường đi.',
        images: [{ src: A('s-1286x910_v-fms_webp_45738851-1dfd-4ddf-bada-8f62bbd2e6bf.png') }],
        cols: 1,
      },
      { label: 'Mọi thứ trước mắt đều là một ý tưởng tốt', lead: 'MCV muốn 1 bộ sưu tập thật chi tiết và tính độc lập giữa mỗi NFT, nên tính sáng tạo cho số lượng lớn NFT như vậy đòi hỏi khả năng tưởng tượng cao của mỗi thành viên và tính toán cẩn thận số lượng layer cần có trên mỗi NFT để có được bộ sưu tập ưng ý với thời gian hoàn thành sớm nhất.' },
      { images: [{ src: A('s-1152x648_35c807f3-679b-46f8-8c3f-0dae764a1590.gif') }], cols: 1 },
      {
        images: [
          { src: A('s-285x657_v-fs_webp_dfb88da1-49da-4956-96a3-2c8355b858a0.png') },
          { src: A('s-857x633_v-fs_webp_b15c95d6-d872-43fa-b27b-18dc112ba9cd.png') },
        ],
        cols: 2,
      },
      {
        title: 'Số liệu thống kê đạt được',
        items: [
          { label: 'Kết quả', text: 'Mars Cats Voyage là dự án có sự ảnh hưởng lớn đến cộng đồng lúc ra mắt. Dự án đã được chào bán công khai. Sau khi bán hết, giá sàn đã tăng đều đặn. Với giá mint là 0,05ETH và giá sàn tăng lên gần 0,5ETH vào đỉnh điểm. Dự án vẫn còn nhiều kế hoạch và tiềm năng lớn trong thời gian tới.' },
        ],
      },
      {
        stats: [
          { num: '22,1', label: 'Nghìn người theo dõi trên X' },
          { num: '3,462', label: 'Người sở hữu NFT' },
          { num: '2,954', label: 'ETH giá trị giao dịch' },
        ],
      },
    ],
    next: { label: 'Tiếp theo', name: 'Knowlegd JP', href: '/vi/work/knowledge-japan', img: A('s-1437x1019_v-fms_webp_800c7d6a-bc16-42be-9dce-8bd2d5b43d4d.png') },
  },
  // ============================================================ KNOWLEDGE JAPAN — EN
  {
    slug: 'knowledge-japan',
    lang: 'en',
    name: 'Knowledge',
    pageTitle: 'Knowlegd JP | 126Verse',
    meta: { typeLabel: 'Project Type', type: 'Improve UI-UX', stageLabel: 'Stage', stage: 'Leader', deliverLabel: 'Deliverables', deliver: 'UI-UX design and planing' },
    hero: [{ src: A('s-1152x648_20c95c05-8dfb-41d5-92af-e28e7795f99f.gif'), alt: 'Knowledge' }],
    sections: [
      { label: 'Introduction', lead: 'KNOWLEDGE wanted to find a way to create a fresh look that truly reflected its brand values. Their goal is to improve the image and enhance the user experience in line with these values.' },
      { text: "KNOWLEDGE is a web application empowering users to create, write, read, and purchase books, while also providing a platform for selling their own literary creations. The previous iteration of the product was criticized for its challenging interface, inefficient image processing, and subpar content delivery, failing to showcase the true value of authors' works." },
      {
        images: [
          { src: A('s-365x669_v-fs_webp_f489f794-e363-416e-9292-be36fa7bdb1c.png') },
          { src: A('s-334x534_webp_50093a86-856a-444c-8c70-f926650fb731.png') },
          { src: A('s-845x549_v-fs_webp_5d85f69a-2aa7-45d3-9d25-24f2203ef867.png') },
          { src: A('s-840x484_v-fs_webp_0f466ec5-d4ef-4e0c-af2a-d121ecc7a47c.png') },
        ],
        cols: 4,
      },
      {
        title: 'The summary of the work is open-ended',
        text: '- Integrate all aspects of KNOWLEDGE into a unified central design.\n- Provide users with intuitive tools to personalize their browsing experience effortlessly.\n- Develop strategies to allure experienced authors to the platform.',
      },
      {
        images: [
          { src: A('s-2400x1500_v-frms_webp_20e4ae96-1bcc-480f-b80a-1f77c36090b2.png') },
          { src: A('s-2400x2400_v-frms_webp_ff39e0b4-f84c-4153-9321-c76f8b365226.png') },
        ],
        cols: 2,
      },
      { label: 'Emphasize your brand and enhance user experience', lead: "The website embodies KNOWLEDGE's robust brand identity, characterized by a cohesive color scheme of white and blue. It features functionalities designed to enhance focus during reading and writing, while also optimizing time efficiency." },
      {
        images: [
          { src: A('s-1435x1021_v-fms_webp_0587a985-3531-4f8e-80c3-21b658f6251e.png') },
          { src: A('s-1432x1018_v-fms_webp_038330a4-0749-4e68-a60d-970d29e23e77.png') },
        ],
        cols: 2,
      },
      {
        title: 'Tailored content curated to your preferences',
        text: "People enjoy customizing the content they consume to align with their individual tastes. While many personalization platforms adopt a passive approach by offering a broad spectrum of topics, KNOWLEDGE takes a more interactive approach. Users are prompted to browse sample posts on various topics and express their preferences by upvoting or downvoting using emojis, thereby curating their feed.\n\nFollowing this initial onboarding process, users can further engage with the content they've selected, enabling KNOWLEDGE to gain deeper insights into their browsing habits and provide more intelligent recommendations going forward.",
        images: [{ src: A('s-1435x1018_v-fms_webp_8017adca-08a1-4ae9-942f-bb4982c2718f.png') }],
        cols: 1,
      },
      {
        label: 'Categories for managing purchased articles and current works are also optimized for access.',
        images: [
          { src: A('s-1438x1023_v-fms_webp_1337ee00-a3e1-403a-8905-4218ac22ac47.png') },
          { src: A('s-1437x1019_v-fms_webp_800c7d6a-bc16-42be-9dce-8bd2d5b43d4d.png') },
          { src: A('s-1436x1022_v-fms_webp_40f55c56-d0bb-43c8-afee-746953619b4d.png') },
        ],
        cols: 3,
      },
      {
        title: "You're on a roll, why hit the brakes now?",
        text: 'Through effective collaboration and positive enhancements, KNOWLEDGE aims to refine most of the remaining functions and embark on future development together.',
      },
      {
        images: [
          { src: A('s-1438x784_v-fms_webp_1d0ce076-d101-44a7-b0ce-7345b9382ba8.png') },
          { src: A('s-1438x1021_v-fms_webp_1a760e66-39f3-4c0c-ab06-6b19be4f561e.png') },
          { src: A('s-1433x1019_v-fms_webp_0d121055-8125-4048-a6b9-59e55bbbe3a2.png') },
          { src: A('s-1436x1026_v-fms_webp_3ac4d64c-cd4b-4758-aa1f-c2f525815936.png') },
        ],
        cols: 4,
      },
      {
        title: 'A worthy endeavor',
        items: [
          { label: 'Impact', text: 'Following our partnership, KNOWLEDGE has seen massive year over growth in both users and revenue. Looks like their investment paid off.' },
        ],
      },
    ],
    next: { label: 'Next case study', name: 'Cheer', href: '/work/cheer', img: A('s-936x936_v-fs_webp_3d487d9b-a7ab-43f5-ae80-4b8b065989f4.png') },
  },
  // ============================================================ KNOWLEDGE JAPAN — VI
  {
    slug: 'knowledge-japan',
    lang: 'vi',
    name: 'Knowledge',
    pageTitle: 'Knowlegd JP | 126Verse',
    meta: { typeLabel: 'Loại dự án', type: 'Cải thiện UI UX', stageLabel: 'Vai trò', stage: 'Trưởng nhóm', deliverLabel: 'Bàn giao', deliver: 'Bản thiết kế UI UX, Kế hoạch định hướng hình ảnh mới' },
    hero: [{ src: A('s-1152x648_20c95c05-8dfb-41d5-92af-e28e7795f99f.gif'), alt: 'Knowledge' }],
    sections: [
      { label: 'Bối cảnh', lead: 'KNOWLEDGE muốn mang đến một giao diện mới phản ánh đúng giá trị thương hiệu của mình, họ muốn thiết kế lại hình ảnh và trải nghiệm người dùng của mình cho phù hợp.' },
      { text: 'KNOWLEDGE là một ứng dụng web, nơi mọi người có thể sáng tác, viết sách, đọc - mua tác phẩm của người khác cũng như bán các tác phẩm của chính mình. Sản phẩm trước đó được biết đến với giao diện khó sử dụng, cách xử lý hình ảnh và truyền đạt nội dung không phản ánh đúng giá trị tác phẩm của tác giả.' },
      {
        images: [
          { src: A('s-365x669_v-fs_webp_f489f794-e363-416e-9292-be36fa7bdb1c.png') },
          { src: A('s-334x534_webp_50093a86-856a-444c-8c70-f926650fb731.png') },
          { src: A('s-845x549_v-fs_webp_5d85f69a-2aa7-45d3-9d25-24f2203ef867.png') },
          { src: A('s-840x484_v-fs_webp_0f466ec5-d4ef-4e0c-af2a-d121ecc7a47c.png') },
        ],
        cols: 4,
      },
      {
        title: 'Bản tóm tắt về công việc có kết thúc mở',
        text: '- Tìm cách tập hợp tất cả các phần của KNOWLEDGE lại với nhau trong một thiết kế trung tâm.\n- Cung cấp cho mọi người cách dễ dàng cá nhân hóa trải nghiệm duyệt web của họ.\n- Tìm cách để thu hút các tác giả có kinh nghiệm.',
      },
      {
        images: [
          { src: A('s-2400x1500_v-frms_webp_20e4ae96-1bcc-480f-b80a-1f77c36090b2.png') },
          { src: A('s-2400x2400_v-frms_webp_ff39e0b4-f84c-4153-9321-c76f8b365226.png') },
        ],
        cols: 2,
      },
      { label: 'Nhấn mạnh thương hiệu và nâng cao trải nghiệm người dùng', lead: 'Trang web mang đậm thương hiệu của KNOWLEDGE với tone màu trắng - xanh xuyên suốt, cùng các chức năng được tối đa hóa việc truy cập giúp tăng khả năng tập trung cho việc đọc viết và tiết kiệm thời gian sử dụng.' },
      {
        images: [
          { src: A('s-1435x1021_v-fms_webp_0587a985-3531-4f8e-80c3-21b658f6251e.png') },
          { src: A('s-1432x1018_v-fms_webp_038330a4-0749-4e68-a60d-970d29e23e77.png') },
        ],
        cols: 2,
      },
      {
        title: 'Nội dung cá nhân hóa do bạn lựa chọn',
        text: 'Mọi người thích điều chỉnh nội dung họ xem theo cách đáp ứng sở thích riêng của họ. Hầu hết các luồng cá nhân hóa đều áp dụng cách tiếp cận thụ động đối với vấn đề này, phục vụ rất nhiều chủ đề để bạn lựa chọn. Đối với KNOWLEDGE, chúng tôi đã làm cho trải nghiệm trở nên tương tác hơn. Người đọc được khuyến khích xem qua các bài viết mẫu về từng chủ đề và tán thành hoặc phản đối (thông qua biểu tượng cảm xúc) để quản lý nguồn cấp dữ liệu của họ.\n\nSau lần giới thiệu đầu tiên này, mọi người có thể tiếp tục tương tác với nội dung họ đã chọn giúp KNOWLEDGE tìm hiểu thêm về sở thích duyệt web của họ và đưa ra những đề xuất thông minh hơn trong tương lai.',
        images: [{ src: A('s-1435x1018_v-fms_webp_8017adca-08a1-4ae9-942f-bb4982c2718f.png') }],
        cols: 1,
      },
      {
        label: 'Các danh mục quản lý bài viết được mua, tác phẩm hiện tại cũng được tối ưu hóa thao tác truy cập.',
        images: [
          { src: A('s-1438x1023_v-fms_webp_1337ee00-a3e1-403a-8905-4218ac22ac47.png') },
          { src: A('s-1437x1019_v-fms_webp_800c7d6a-bc16-42be-9dce-8bd2d5b43d4d.png') },
          { src: A('s-1436x1022_v-fms_webp_40f55c56-d0bb-43c8-afee-746953619b4d.png') },
        ],
        cols: 3,
      },
      {
        title: 'Làm tốt rồi, tại sao phải dừng lại!',
        text: 'Qua sự hợp tác hiệu quả cùng những thay đổi tích cực KNOWLEDGE muốn chúng tôi cải thiện hầu hết các chức năng còn lại, và đi cùng nhau trong việc phát triển trong tương lai.',
      },
      {
        images: [
          { src: A('s-1438x784_v-fms_webp_1d0ce076-d101-44a7-b0ce-7345b9382ba8.png') },
          { src: A('s-1438x1021_v-fms_webp_1a760e66-39f3-4c0c-ab06-6b19be4f561e.png') },
          { src: A('s-1433x1019_v-fms_webp_0d121055-8125-4048-a6b9-59e55bbbe3a2.png') },
          { src: A('s-1436x1026_v-fms_webp_3ac4d64c-cd4b-4758-aa1f-c2f525815936.png') },
        ],
        cols: 4,
      },
      {
        title: 'Nổ lực xứng đáng',
        items: [
          { label: 'Kết quả', text: 'Sau sự hợp tác của chúng tôi, Knowledge JP đã chứng kiến ​​sự tăng trưởng vượt bậc trong cả năm về cả người dùng và doanh thu. Có vẻ như khoản đầu tư của họ đã được đền đáp.' },
        ],
      },
    ],
    next: { label: 'Tiếp theo', name: 'Cheer', href: '/vi/work/cheer', img: A('s-936x936_v-fs_webp_3d487d9b-a7ab-43f5-ae80-4b8b065989f4.png') },
  },
];
