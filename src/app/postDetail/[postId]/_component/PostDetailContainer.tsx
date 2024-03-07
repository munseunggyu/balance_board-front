"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useUserDataContext } from "@/context/AuthContext";

import { useGetComments } from "../_hook/useGetComments";
import { getPostDetailData } from "../_lib/getPostDetailData";
import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";
import CommentForm from "./commentForm";
import CommentList from "./commentList";
import ContentVote from "./contentVote";
import PostContent from "./postContent";
import UserInfo from "./userInfo";
export default function PostDetailContainer({ postId }: { postId: number }) {
  const { userInfo } = useUserDataContext();
  let token: null | string = null;
  if (userInfo.isLogin === 1) {
    token = userInfo.jwtToken?.accessToken;
  }
  const { data: postData } = useQuery<IPostData>({
    queryKey: ["post", "detail", postId, userInfo.isLogin],
    queryFn: () => {
      return getPostDetailData(postId, token);
    },
  });
  const { commentTotalCnt } = useGetComments(postId);
  return (
    <div className={styles.postDetailContainer}>
      {postData ? (
        <>
          <div className={styles.topPadding}>
            <UserInfo postData={postData} />
            <PostContent postData={postData} />
            <ContentVote postData={postData} postId={postId} />
          </div>
          <div className={styles.seperator}></div>
          <div className={styles.commentContainer}>
            <div className={styles.commentCount}>
              <span>댓글</span>
              <span>{commentTotalCnt}</span>
            </div>
            <CommentForm postData={postData} userImage={userInfo.imageType} />
            <CommentList postId={postData.postId} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
