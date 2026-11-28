export const TAFSIR_SOURCE_NAME = "تفسير السعدي (تيسير الكريم الرحمن)";

// ⚠️ نص تجريبي لتجربة الشكل فقط.
// التفسير الحقيقي لازم ييجي من مصدر موثوق (مثل quran.com API)
const TAFSIR: Record<string, string> = {
  "1:2":
    "هذا نص تجريبي لتجربة شكل النافذة فقط، والتفسير الحقيقي سيأتي من مصدر موثوق.",
};

// "سورة:آية" ← نص التفسير، أو null إذا ما في
export function getTafsir(surahId: number, ayahNumber: number) {
  return TAFSIR[`${surahId}:${ayahNumber}`] ?? null;
}
