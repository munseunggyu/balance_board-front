import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

import Input from "@/app/_component/Input";

import styles from "./commentInput.module.css";

export default function CommentInput() {
  const [comment, setComment] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComment(value);
  };
  return (
    <div className={styles.container}>
      <Image src={"/profile-md-test.png"} width={24} height={24} alt="유저 이미지" />
      <Input onChange={onChange} placeholder="댓글 달기..." value={comment} />
      <button className={`${styles.submit_btn} ${comment.length > 0 ? styles.active : ""}`}>등록</button>
    </div>
  );
}
