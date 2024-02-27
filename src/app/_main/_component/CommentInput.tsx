import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";

import Input from "@/app/_component/Input";
import { useUserDataContext } from "@/context/AuthContext";
import { IPost } from "@/modal/Post";
import { constant } from "@/utils/constant";

import styles from "./commentInput.module.css";

interface IProps {
  postId: number;
}

export default function CommentInput({ postId }: IProps) {
  const { userInfo } = useUserDataContext();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const chat = useMutation({
    mutationFn: () => {
      return fetch(constant.apiUrl + "api/main/new/comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId: userInfo.userId,
          content: comment,
        }),
      });
    },
    async onSuccess(response) {
      const responseData = await response.json();
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      const filterQuerys = queryKeys.filter((v) => {
        if (v[0] === "posts" && v[1] === "all") {
          return true;
        }
        return false;
      });
      filterQuerys.forEach((queryKey) => {
        const value: IPost | InfiniteData<IPost[]> | undefined = queryClient.getQueryData(queryKey);

        if (value && "pages" in value) {
          const idx = value.pages[0].findIndex((v) => {
            console.log(v, postId);
            return v.postId === postId;
          });
          if (idx >= 0) {
            console.log("responseData", responseData);
            const data = produce(value, (draftData) => {
              draftData.pages[0][idx].comments = [responseData, draftData.pages[0][idx].comments[0]];
            });
            queryClient.setQueryData(queryKey, data);
          }
        }
      });
      setComment("");
    },
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;
    chat.mutate();
  };

  return (
    <form className={styles.container} onSubmit={handleSumbit}>
      <Image src={"/profile-md-test.png"} width={24} height={24} alt="유저 이미지" />
      <Input onChange={onChange} placeholder="댓글 달기..." value={comment} />
      <button className={`${styles.submit_btn} ${comment.length > 0 ? styles.active : ""}`}>등록</button>
    </form>
  );
}
