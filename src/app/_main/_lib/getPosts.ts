import { constant } from "@/utils/constant";

export const getPostList = async ({ pageParam }: { pageParam: number }) => {
  console.log(pageParam);
  const res = await fetch(constant.apiUrl + `api/main/posts?page=${pageParam}&size=20`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};

export const getCategoryPostList = async ({ pageParam, category }: { pageParam: number; category: string }) => {
  console.log(pageParam);
  let categoryParams = category;
  if (category === "정치・경제") {
    categoryParams = "정치_경제";
  }
  const res = await fetch(constant.apiUrl + `api/main/${categoryParams}?page=${pageParam}&size=20`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};
