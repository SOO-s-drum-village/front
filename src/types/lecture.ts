export type LectureCategory = "K_POP" | "PRAISE" | "BASIC";

export type Lecture = {
  id: number;
  title: string;
  level: number;
  categories: LectureCategory[];
  imageUrl: string;
};

export const LectureValues = {
  BASIC: "BASIC",
  K_POP: "K·POP",
  PRAISE: "PRAISE",
};
