import { SortDirection } from "./../types/index";
import { Lecture, LectureCategory } from "@/types/lecture";
import { exceptionHandler } from "./exception-handler";
import { ListRequest, apiRequest } from "./index";

interface LecturesRequest extends ListRequest {
  category?: LectureCategory | undefined;
  direction?: SortDirection;
}

export const getLectures = async (request: LecturesRequest) => {
  const payload = {
    page: request.page,
    size: 20,
    direaction: request.direction || undefined,
    category: request.category || undefined,
  };

  try {
    const response = await apiRequest.get<Lecture[]>("/lectures", {
      params: payload,
    });
    return response;
  } catch (error: any) {
    throw new Error(exceptionHandler(error, "API getLectures error"));
  }
};

export const getLecture = async (lectureId: number) => {
  try {
    const response = await apiRequest.get<Lecture>(`/lectures/${lectureId}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};
