import { useInfiniteQuery } from "@tanstack/react-query";

import { getCommentList } from "../_lib/getCommentList";
import { IComment } from "../interfaces";

export const useGetComments = (postId: number) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<IComment[], Error>({
    queryKey: ["post", postId, "comments"],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;

      return await getCommentList(postId, page);
    },
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => {
      if (allPages[allPages.length - 1].length / 20 < 1) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });
  const commentTotalCnt = data?.pages.flat().length;

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    commentTotalCnt,
  };
};
