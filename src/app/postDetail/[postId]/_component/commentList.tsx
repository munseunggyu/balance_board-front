"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { formatDay, formatTime } from "@/utils/foramattime";
import { userImgUrl } from "@/utils/userImgUrl";

import { useGetComments } from "../_hook/useGetComments";
import { IComment } from "../interfaces";
import styles from "../postDetail.module.css";
import MoreCommentsButton from "./moreCommentButton";

interface CommentListProps {
  postId: number;
}

export default function CommentList({ postId }: CommentListProps) {
  const [mounted, setMounted] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching } = useGetComments(postId);

  const hanleMoreComment = () => {
    void fetchNextPage();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul className={styles.commentListContainer}>
      {mounted &&
        data?.pages &&
        data?.pages.map((v, i) => (
          <Fragment key={i}>
            {v.map((comment) => (
              <li className={styles.card_list} key={comment.commentId}>
                <Comment comment={comment} />
              </li>
            ))}
          </Fragment>
        ))}
      {!isFetching && hasNextPage && (
        <MoreCommentsButton
          onClick={() => {
            hanleMoreComment();
          }}
        />
      )}
    </ul>
  );
}

interface CommentProps {
  comment: IComment;
}

function Comment({ comment }: CommentProps) {
  const { userInfo } = useUserDataContext();
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentorInfo}>
        <div className={styles.commentorImageContainer}>
          <Image src={userImgUrl(comment.imageType)} alt="댓글 쓴 사람 이미지" width={24} height={24} />
        </div>
        <div className={styles.commentorName}>{comment.nickname}</div>
        <div className={styles.verticalLine}></div>
        <div className={styles.commentDay}>{formatDay(comment.created)}</div>
        <div className={styles.commentTime}>{formatTime(comment.created)}</div>
        {userInfo.isLogin === 1 && userInfo.userId === comment.userId && (
          <button className={styles.comment_del}>삭제</button>
        )}
      </div>
      <div className={styles.userComment}>{comment.content}</div>
      <div className={styles.commentSeperator}></div>
    </div>
  );
}
