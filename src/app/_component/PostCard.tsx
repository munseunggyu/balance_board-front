"use client";
import Image from "next/image";
import React from "react";

import { IPost } from "@/modal/Post";

import CommentInput from "../_main/_component/CommentInput";
import VoteBtnsContainer from "../_main/_component/VoteBtnsContainer";
import styles from "./postCard.module.css";
import Tag from "./Tag";

interface IProps {
  post: IPost;
}
export default function PostCard({ post }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card_top}>
        <img className={styles.card_user_img} src="/image8.png" alt="Image 2" />
        <span className={styles.user_name}>{post.nickname}</span>
        <span className={styles.time}>time</span>
        <Tag tagName={post.category} color={"primary"} className={styles.tag_right} />
      </div>
      <div className={styles.contents_container}>
        <div>
          <span className={styles.post_title}>{post.title}</span>
          <p className={styles.contents}>{post.content}</p>
        </div>
        <div className={styles.contents_bottom}>
          <ul className={styles.contents_bottom_ul}>
            {post.tags.length > 0 &&
              post.tags.map((v) => (
                <li key={v.tagId}>
                  <Tag tagName={v.tagName} />
                </li>
              ))}
          </ul>
          <div className={styles.contents_bottom_right_container}>
            <Image
              className={styles.ico_check}
              src={"/check-pressed-md.svg"}
              alt="체크 아이콘"
              width={24}
              height={24}
            />
            <span className={styles.ico_txt}>{post.voteCount}명 참여</span>
            <Image className={styles.chat_ico} src={"/comment-sm.svg"} alt="체크 아이콘" width={18} height={18} />
            <span className={styles.ico_txt}>{post.commentCount}</span>
          </div>
        </div>
      </div>
      <VoteBtnsContainer
        btnType={0}
        voteCount={post.voteCount}
        option1={post.option1}
        option2={post.option2}
        option1Count={post.option1Count}
        option2Count={post.option2Count}
      />
      <div className={styles.divider} />
      <ul className={styles.chat_ul}>
        {post.comments.map((comment) => (
          <li className={styles.chat_list} key={comment.commentId}>
            <img className={styles.card_user_img} src="/image8.png" alt="Image 2" />
            <span>{comment.nickname}</span>
            <p className={styles.chat_contents}>{comment.content}</p>
          </li>
        ))}
      </ul>
      <CommentInput postId={post.postId} />
    </div>
  );
}
