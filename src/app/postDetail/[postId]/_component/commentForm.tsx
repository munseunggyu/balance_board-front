import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { userImgUrl } from "@/utils/userImgUrl";

import styles from "../postDetail.module.css";

interface ICommentFormProps {
  newComment: string;
  isComment: boolean;
  setNewComment: Dispatch<SetStateAction<string>>;
  setIsComment: Dispatch<SetStateAction<boolean>>;
  handleCommentSubmit: () => Promise<void>;
  userImage: number;
}

export default function CommentForm({
  newComment,
  setNewComment,
  isComment,
  setIsComment,
  handleCommentSubmit,
  userImage,
}: ICommentFormProps) {
  return (
    <div className={styles.commentRegContainer}>
      <div className={styles.voteButtonImageContainer}>
        <Image src={userImgUrl(userImage)} alt="유저 이미지" width={20} height={20} />
      </div>
      <input
        placeholder="댓글 달기..."
        value={newComment}
        onChange={(e) => {
          setNewComment(e.target.value); // 입력 필드의 변경을 감지하여 상태 업데이트
          setIsComment(!!e.target.value); // 댓글이 들어오는지 확인
        }}
        maxLength={50}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommentSubmit()
              .then(() => {})
              .catch((error) => {
                console.error(error);
              });
            setIsComment(false);
          }
        }}
      />
      <button
        className={`${styles.commentReg} ${isComment ? styles.isComment : ""}`}
        onClick={() => {
          handleCommentSubmit()
            .then(() => {
              setIsComment(false);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        등록
      </button>
    </div>
  );
}
