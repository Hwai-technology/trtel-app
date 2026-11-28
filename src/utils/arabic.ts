const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

// 286 ← "٢٨٦"
export function toArabicDigits(value: number | string) {
  return String(value).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]);
}

// "١٨" ← "18" (مشان البحث بالرقم)
export function toEnglishDigits(value: string) {
  return value.replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));
}
// 286 ← "٢٨٦ آية"   و   7 ← "٧ آيات"
export function versesLabel(count: number) {
  return `${toArabicDigits(count)} ${count <= 10 ? "آيات" : "آية"}`;
}

export function notesCountLabel(count: number) {
  if (count === 0) return "لا توجد تأملات بعد";
  if (count === 1) return "تأمل واحد مسجل";
  if (count === 2) return "تأملان مسجلان";
  if (count <= 10) return `${toArabicDigits(count)} تأملات مسجلة`;
  return `${toArabicDigits(count)} تأملاً مسجلاً`;
}
export function bookmarksCountLabel(count: number) {
  if (count === 0) return "لا توجد علامات بعد";
  if (count === 1) return "علامة مرجعية واحدة";
  if (count === 2) return "علامتان مرجعيتان";
  if (count <= 10) return `${toArabicDigits(count)} علامات مرجعية`;
  return `${toArabicDigits(count)} علامة مرجعية`;
}

type CountForms = { one: string; two: string; few: string; many: string };

// ١ ← "موضع واحد"، ٢ ← "موضعان"، ٣ ← "٣ مواضع"، ١٢ ← "١٢ موضعاً"
export function countLabel(count: number, forms: CountForms) {
  if (count === 1) return forms.one;
  if (count === 2) return forms.two;
  if (count <= 10) return `${toArabicDigits(count)} ${forms.few}`;
  return `${toArabicDigits(count)} ${forms.many}`;
}