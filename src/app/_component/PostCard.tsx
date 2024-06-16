"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { IPost } from "@/modal/Post";
import { dateFormat } from "@/utils/dateFormat";

import VoteBtnsContainer from "../home/_component/VoteBtnsContainer";
import styles from "./postCard.module.css";
import Tag from "./Tag";
import ThumbsBtns from "./ThumbsBtns";

interface IProps {
  post: IPost;
  openLoginModal?: () => void;
  noVoteBtn?: boolean;
}
export default function PostCard({ post, openLoginModal, noVoteBtn = false }: IProps) {
  const router = useRouter();

  const goDetailPage = () => {
    router.push(`/postDetail/${post.postId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_top}>
        <Tag tagName={post.category} color={"primary"} className={styles.tag_right} />
        <span className="ml-auto text-body-900">{dateFormat(post.created)}</span>
      </div>
      <div className={styles.contents_container} onClick={goDetailPage}>
        <div>
          <span className={styles.post_title}>{post.title}</span>
          <p className={styles.contents}>{post.content}</p>
        </div>
        <div className={styles.contents_bottom}>
          <ul className={styles.contents_bottom_ul}>
            {post.tags?.length > 0 &&
              post.tags.slice(0, 2).map((v) => (
                <li key={v.tagId}>
                  <Tag tagName={v.tagName} />
                </li>
              ))}
          </ul>
        </div>
      </div>
      {!noVoteBtn && (
        <VoteBtnsContainer
          btnType={0}
          voteCount={post.voteCount}
          option1={post.option1}
          option2={post.option2}
          option1Count={post.option1Count}
          option2Count={post.option2Count}
          postId={post.postId}
          post={post}
          openLoginModal={openLoginModal}
        />
      )}
      <div className="flex itmes-center justify-between">
        <ThumbsBtns post={post} />
        <div className={styles.contents_bottom_right_container}>
          <Image className={styles.ico_check} src={"/check-md.svg"} alt="체크 아이콘" width={18} height={18} />
          <span className={styles.ico_txt}>{post.voteCount}명 참여</span>
          <Image className={styles.chat_ico} src={"/comment-sm.svg"} alt="체크 아이콘" width={18} height={18} />
          <span className={styles.ico_txt}>{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
}
