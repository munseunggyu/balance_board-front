import { IPost } from "@/modal/Post";
import { IUser } from "@/modal/User";
import { constant } from "@/utils/constant";

export const getPostList = async ({
  pageParam,
  userInfo,
  size = 10,
}: {
  pageParam: number;
  userInfo: IUser;
  size?: number;
}) => {
  let res;
  if (userInfo.isLogin === 1) {
    const token = userInfo.accessToken;
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
  userInfo: IUser;
}) => {
  let categoryParams = category;
  if (category === "정치・경제") {
    categoryParams = "정치_경제";
  }
  let res;
  if (userInfo.isLogin === 1) {
    const token = userInfo.accessToken;
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

export const getHotPosts = async (userInfo: IUser) => {
  const headers: { [key: string]: string } = {};
  const token = userInfo.accessToken;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(constant.apiUrl + "api/main/posts/hot", {
    method: "GET",
    headers,
  });
  const data = await res.json();
  return [...data, ...data, ...data];
};
