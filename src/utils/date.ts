import { toArabicDigits } from "./arabic";

// 21:20 ← "٠٩:٢٠ م"
function formatTime(date: Date) {
  const hours24 = date.getHours();
  const period = hours24 >= 12 ? "م" : "ص";
  const hours12 = String(hours24 % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${toArabicDigits(hours12)}:${toArabicDigits(minutes)} ${period}`;
}

// تاريخ هجري، وإذا الجهاز ما بيدعمه منرجع للميلادي
function formatHijriDate(date: Date) {
  try {
    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura-nu-arab", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(/\s*هـ$/, "");
  } catch {
    return toArabicDigits(date.toLocaleDateString("en-GB"));
  }
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// اليوم، أمس، أو تاريخ هجري
export function formatNoteDate(timestamp: number) {
  const date = new Date(timestamp);
  const now = new Date();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) return `اليوم، ${formatTime(date)}`;
  if (isSameDay(date, yesterday)) return `أمس، ${formatTime(date)}`;
  return formatHijriDate(date);
}

const WEEKDAYS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// اليوم ٠٢:٣٠ م  /  أمس  /  الجمعة الماضية  /  منذ أسبوعين  /  تاريخ هجري
export function formatRelativeDate(timestamp: number) {
  const date = new Date(timestamp);
  const days = Math.round(
    (startOfDay(new Date()).getTime() - startOfDay(date).getTime()) / 86400000,
  );

  if (days <= 0) return `اليوم ${formatTime(date)}`;
  if (days === 1) return "أمس";
  if (days < 7) {
    const day = date.getDay();
    return `${WEEKDAYS[day]} ${day === 5 ? "الماضية" : "الماضي"}`;
  }
  if (days < 14) return "منذ أسبوع";
  if (days < 21) return "منذ أسبوعين";
  if (days < 30) return `منذ ${toArabicDigits(Math.floor(days / 7))} أسابيع`;
  return formatHijriDate(date);
}
