"use client";
import { useEffect, useState } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { constant } from "@/utils/constant";

import PostDetailNav from "../../_component/postDetailNav";
import CommentForm from "./_component/commentForm";
import CommentList from "./_component/commentList";
import ContentVote from "./_component/contentVote";
import MoreCommentsButton from "./_component/moreCommentButton";
import PostContent from "./_component/postContent";
import UserInfo from "./_component/userInfo";
import { IPostData } from "./interfaces";
import styles from "./postDetail.module.css";
let userToken: string | null = null;

export default function PostDetail({ params }: { params: { postId: number } }) {
  const { userInfo } = useUserDataContext();
  const postId = params.postId;
  const [postData, setPostData] = useState<IPostData | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [isComment, setIsComment] = useState<boolean>(false);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  /** 댓글 더보기 */
  const handleLoadMoreComments = () => {
    setShowAllComments(true);
  };

  /**상세 페이지 데이터 */
  useEffect(() => {
    if (postId === null) return; // postId가 null이면 종료
    userToken = localStorage.getItem("token");

    async function fetchData(postId: number) {
      try {
        const headers: { [key: string]: string } = {};
        if (userInfo.isLogin === 1) {
          headers.Authorization = `${userToken}`;
        }

        const res = await fetch(constant.apiUrl + `api/main/posts/${postId}`, {
          headers: headers,
        });
        const data: IPostData = await res.json();
        setPostData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(postId).catch((error) => {
      console.error(error);
    });
  }, [postId, userInfo.isLogin]);

  /** 댓글 작성 */
  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    try {
      const res = await fetch(constant.apiUrl + `api/main/new/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          postId: postData?.postId,
          content: newComment,
        }),
      });
      const updateRes = await fetch(constant.apiUrl + `api/main/posts/${postId}`);
      const updatedData: IPostData = await updateRes.json();
      setPostData(updatedData);
      setNewComment("");
      console.log(await res.json());
    } catch (error) {
      console.error("댓글 추가 오류");
    }
  };

  if (postData !== null && postData !== undefined) {
    if (postData.category === "정치_경제") {
      postData.category = "정치・경제";
    }
    console.log(userInfo);
    return (
      <div className={styles.postDetailBox}>
        <PostDetailNav />
        <div className={styles.postDetailContainer}>
          {postData ? (
            <>
              <UserInfo postData={postData} />
              <PostContent postData={postData} />
              <ContentVote postData={postData} postId={postId} setPostData={setPostData} />
              <div className={styles.seperator}></div>
              <div className={styles.commentContainer}>
                <div className={styles.commentCount}>
                  <span>댓글</span>
                  <span>{postData.comments.length}</span>
                </div>
                <CommentForm
                  newComment={newComment}
                  setNewComment={setNewComment}
                  isComment={isComment}
                  setIsComment={setIsComment}
                  handleCommentSubmit={handleCommentSubmit}
                  userImage={userInfo.imageType}
                  isLogin={userInfo.isLogin}
                />
                <CommentList comments={postData.comments} showAllComments={showAllComments} />
                {!showAllComments && postData.comments.length > 5 && (
                  <MoreCommentsButton onClick={handleLoadMoreComments} />
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
