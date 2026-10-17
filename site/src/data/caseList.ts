// Thứ tự chuẩn các case study (= thứ tự trang /work) + thumbnail.
// Nguồn DUY NHẤT cho /work, /vi/work, NavMenu và khối "Next case study" trong CaseBody.
// Tên & nhãn loại dự án lấy từ data của từng case để không bị lệch.
import { cases } from './cases';
import { cases2 } from './cases2';
import { cases3 } from './cases3';

const A = (f: string) => '/img/a/' + f;

const ORDER = [
  { slug: 'yamaha-music', img: A('s-960x540_v-fs_webp_64bac0da-d9f2-4c7e-859e-21167dffb7f0.jpg') },
  { slug: 'cheer', img: A('s-936x936_v-fs_webp_3d487d9b-a7ab-43f5-ae80-4b8b065989f4.png') },
  { slug: 'mars-cats-voyage', img: A('s-643x471_v-fs_webp_188155c0-fa96-4b20-b860-5c94072f9d3d.png') },
  { slug: 'daesang', img: A('s-1000x1000_v-fs_webp_d837f0bf-8686-46ab-92df-a94d59a68539.png') },
  { slug: 'human-first-time', img: A('s-480x480_ade8ef34-d7e2-47f8-b833-563eb7bcbc96.gif') },
  { slug: 'famipay', img: A('s-1051x765_v-fs_webp_0c4e4b8f-a20a-4451-bb09-587256a8c340.webp') },
  { slug: 'knowledge-japan', img: A('s-1437x1019_v-fms_webp_800c7d6a-bc16-42be-9dce-8bd2d5b43d4d.webp') },
];

const all = [...cases, ...cases2, ...cases3];

export const caseList = (lang: 'en' | 'vi') =>
  ORDER.map((o) => {
    const c = all.find((x) => x.slug === o.slug && x.lang === lang)!;
    return { slug: o.slug, name: c.name, type: c.meta.type, img: o.img, href: (lang === 'vi' ? '/vi' : '') + '/work/' + o.slug };
  });

export const nextCase = (slug: string, lang: 'en' | 'vi') => {
  const list = caseList(lang);
  return list[(list.findIndex((c) => c.slug === slug) + 1) % list.length];
};
