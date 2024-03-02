"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useUserDataContext } from "@/context/AuthContext";
import { constant } from "@/utils/constant";

import styles from "./writingNav.module.css";

interface IWritingFormProps {
  selectedCategory: string | null;
  title: string | null;
  content: string | null;
  option1: string | null;
  option2: string | null;
  tags: string[];
}

export default function WritingForm({ selectedCategory, title, content, option1, option2, tags }: IWritingFormProps) {
  const { userInfo } = useUserDataContext();
  const [contentFulfilled, setContentFulfilled] = useState(false);

  const handleCommentSubmit = async () => {
    try {
      const res = await fetch(constant.apiUrl + `api/main/new/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          title: title,
          category: selectedCategory,
          content: content,
          tags: tags,
          option1: option1,
          option2: option2,
        }),
      });
      console.log(res.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCategory && title && content && option1 && option2 && tags.length > 0) {
      setContentFulfilled(true);
    } else {
      setContentFulfilled(false);
    }
  }, [selectedCategory, title, content, option1, option2, tags]);

  const registrationClass = contentFulfilled ? `${styles.registration} ${styles.fulfilled}` : styles.registration;
  return (
    <div className={registrationClass}>
      <Link href="/">
        <button onClick={handleCommentSubmit} disabled={!contentFulfilled}>
          등록
        </button>
      </Link>
    </div>
  );
}
