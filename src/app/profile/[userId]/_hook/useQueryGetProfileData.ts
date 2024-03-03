import { useQuery } from "@tanstack/react-query";

import { getProfileData } from "../_lib/getProfileData";
import { IProfileData, IProfilePostData } from "../page";

export const useQueryGetProfileData = (userId: number) => {
  const { data, isLoading } = useQuery<IProfileData>({
    queryKey: ["profile", userId],
    queryFn: () => {
      return getProfileData(userId);
    },
  });

  const userPosts = data?.userPosts.map((v) => {
    return {
      ...v,
      isWrite: true,
    };
  });

  const votedPosts = data?.votedPosts.map((v) => {
    return {
      ...v,
      isVoted: true,
    };
  });

  let dupArr: IProfilePostData[] | [] = [];
  if (userPosts) {
    dupArr = [...dupArr, ...userPosts];
  }
  if (votedPosts) {
    dupArr = [...dupArr, ...votedPosts];
  }

  const allData: IProfilePostData[] = [];

  dupArr.forEach((obj, index) => {
    if (index === 0) {
      allData.push(obj);
    } else {
      const findIdx = allData.findIndex((v) => v.postId === obj.postId);
      if (findIdx < 0) {
        // 없을때
        allData.push(obj);
      } else {
        // 있을때
        allData[findIdx] = {
          ...allData[findIdx],
          ...obj,
        };
      }
    }
  });

  return {
    data,
    isLoading,
    allData,
    userPosts,
    votedPosts,
  };
};
