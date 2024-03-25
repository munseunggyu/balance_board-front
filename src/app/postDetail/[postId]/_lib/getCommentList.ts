import { constant } from "@/utils/constant";

export const getCommentList = async (postId: number, pageParam: number) => {
  try {
    const res = await fetch(constant.apiUrl + `api/main/posts/${postId}/comments?page=${pageParam}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
