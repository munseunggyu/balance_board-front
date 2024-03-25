import { IAuth } from "@/context/AuthContext";
import { IPost } from "@/modal/Post";
import { constant } from "@/utils/constant";

export const getPostList = async ({
  pageParam,
  userInfo,
  size = 10,
}: {
  pageParam: number;
  userInfo: IAuth;
  size?: number;
}) => {
  let res;
  if (userInfo.isLogin === 1) {
    const token = userInfo?.jwtToken.accessToken;
    res = await fetch(constant.apiUrl + `api/main/posts?page=${pageParam}&size=${size}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    res = await fetch(constant.apiUrl + `api/main/posts?page=${pageParam}&size=${size}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  const data = await res.json();

  return data;
};

export const getCategoryPostList = async ({
  pageParam,
  category,
  userInfo,
}: {
  pageParam: number;
  category: string;
  userInfo: IAuth;
}) => {
  let categoryParams = category;
  if (category === "정치・경제") {
    categoryParams = "정치_경제";
  }
  let res;
  if (userInfo.isLogin === 1) {
    const token = userInfo?.jwtToken.accessToken;
    res = await fetch(constant.apiUrl + `api/main/${categoryParams}?page=${pageParam}&size=10`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    res = await fetch(constant.apiUrl + `api/main/${categoryParams}?page=${pageParam}&size=10`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  const data = await res.json();

  return data;
};

export const getOnePost = async (postId: number) => {
  const res = await fetch(constant.apiUrl + `api/main/posts/${postId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data: IPost = await res.json();
  return data;
};
