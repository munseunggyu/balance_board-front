import { useQuery } from "@tanstack/react-query";

import { getProfilePostData } from "../_lib/getProfilePostData";
import { IPostPostData } from "../page";

export const useQueryGetProfilePostData = (userId: number) => {
  const { data, isLoading } = useQuery<IPostPostData>({
    queryKey: ["profile", "post", userId, 0, "count"],
    queryFn: () => {
      return getProfilePostData(userId, 0);
    },
  });

  return {
    data,
    isLoading,
  };
};
