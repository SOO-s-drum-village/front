import { SortDirection } from "./../types/index";
import { Lecture, LectureCategory } from "@/types/lecture";
import { exceptionHandler } from "./exception-handler";
import { ListRequest, apiRequest } from "./index";

interface LecturesRequest extends ListRequest {
  category?: LectureCategory;
}

export const getLectures = async (request: LecturesRequest) => {
  const payload = {
    page: request.page,
    size: 20,
    direaction: "DESC" as SortDirection,
    category: request.category,
  };

  try {
    const response = await apiRequest.get<Lecture[]>("/lectures", {
      params: payload,
    });
    return response;
  } catch (error) {
    throw new Error(exceptionHandler(error, "API getLectures error"));
  }
};
