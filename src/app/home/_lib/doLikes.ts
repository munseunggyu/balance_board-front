import { constant } from "@/utils/constant";

interface IParams {
  postId: number;
  userId: number;
  token: string;
  action: "like" | "hate" | "cancel";
}

export const doLikes = async ({ postId, userId, token, action }: IParams) => {
  const res = await fetch(constant.apiUrl + `api/main/posts/${postId}/likes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      postId,
      action,
    }),
  });
  const data: { likeCount: number; hateCount: number } = await res.json();
  return data;
};
