export type LectureCategory = "K_POP" | "PRAISE" | "BASIC";

export type Lecture = {
  id: number;
  title: string;
  level: number;
  categories: LectureCategory[];
  owner: string;
};

export const LectureValues = {
  BASIC: "BASIC",
  K_POP: "K·POP",
  PRAISE: "PRAISE",
};

export interface LectureList {
  lectures: Lecture[];
  nextPage: number;
  isLast: boolean;
}
