export type Ayah = {
  surahId: number;
  number: number;
  text: string;
};

export type MushafPage = {
  page: number;
  surahId: number; // السورة اللي بتظهر بالعنوان
  juzLabel: string;
  juz: number;
  hizb: number;
  quarter: number;
  hizbLabel: string;
  quarterLabel: string;
  ayahs: Ayah[];
};

// ⚠️ عيّنة لتجربة الشكل فقط (صفحة ١).
// نص المصحف الحقيقي لازم ييجي من مصدر موثوق (انظري الملاحظات تحت).
const PAGES: MushafPage[] = [
  {
    page: 1,
    surahId: 1,
    hizb: 1,
    quarter: 1,
    juz: 1,
    juzLabel: "الجزء الأول",
    hizbLabel: "الحزب الأول",
    quarterLabel: "الربع الأول · الحزب ١",
    ayahs: [
      {
        surahId: 1,
        number: 1,
        text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
      },
      { surahId: 1, number: 2, text: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ" },
      { surahId: 1, number: 3, text: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ" },
      { surahId: 1, number: 4, text: "مَـٰلِكِ يَوْمِ ٱلدِّينِ" },
      {
        surahId: 1,
        number: 5,
        text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      },
      { surahId: 1, number: 6, text: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ" },
      {
        surahId: 1,
        number: 7,
        text: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      },
    ],
  },
];

export function getMushafPage(page: number) {
  return PAGES.find((p) => p.page === page);
}
