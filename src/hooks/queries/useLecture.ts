import { LecturesRequest, getLectureList, getLectures } from "@/apis/lecture";
import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const lectures = createQueryKeys("lectures", {
  list: {
    queryKey: ["popularItems"],
    queryFn: () => getLectures({ page: 1 }),
  },
  infiniteList: (filter: LecturesRequest) => ({
    queryKey: ["lectures", filter.category, filter.direction],
  }),
});

export const queries = mergeQueryKeys(lectures);

export const useLectureList = () => {
  return useQuery({
    ...lectures.list,
  });
};
