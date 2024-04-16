import { SortDirection } from "./../types/index";
import { Lecture, LectureCategory, LectureList } from "@/types/lecture";
import { exceptionHandler } from "./exception-handler";
import { ListRequest, apiRequest } from "./index";
import axios from "axios";

export interface LecturesRequest extends ListRequest {
  category?: LectureCategory | undefined;
}

export const getLectures = async (request: LecturesRequest) => {
  const payload = {
    page: request.page,
    size: 20,
    direction: request.direction || undefined,
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

export const getLectureList = async ({
  page,
  category,
  direction,
}: LecturesRequest): Promise<LectureList> => {
  const response = await getLectures({
    page,
    category,
    direction,
  });
  return {
    lectures: response,
    nextPage: page + 1,
    isLast: response.length < 20,
  };
};

export const getLecture = async (lectureId: number) => {
  try {
    const response = await apiRequest.get<Lecture>(`/lectures/${lectureId}`);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getTest = async (lectureId: number) => {
  try {
    const response = await fetch(`/api/lectures/${lectureId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
