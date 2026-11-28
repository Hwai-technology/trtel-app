export type RevelationType = "makki" | "madani";

export type Surah = {
  id: number;
  name: string;
  versesCount: number;
  page: number;
  type: RevelationType;
  isFavorite?: boolean;
  isTodaysWird?: boolean;
};

export const TOTAL_SURAHS = 114;

export const SURAHS: Surah[] = [
  { id: 1, name: "الفاتحة", versesCount: 7, page: 1, type: "makki", isFavorite: true },
  { id: 2, name: "البقرة", versesCount: 286, page: 2, type: "madani", isTodaysWird: true },
  { id: 3, name: "آل عمران", versesCount: 200, page: 50, type: "madani" },
  { id: 4, name: "النساء", versesCount: 176, page: 77, type: "madani" },
  { id: 5, name: "المائدة", versesCount: 120, page: 106, type: "madani" },
];