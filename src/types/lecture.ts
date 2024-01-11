export type LectureCategory = "K_POP" | "PRAISE" | "BASIC";

export type Lecture = {
  id: number;
  title: string;
  level: number;
  categories: LectureCategory[];
  imageUrl: string;
};
