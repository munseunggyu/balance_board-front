"use client";

import { useEffect, useState } from "react";

import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hook/useModal";
import { useAuthStore } from "@/stores/user";
import { constant } from "@/utils/constant";

import styles from "./writingNav.module.css";
import WritingSuccessModal from "./WritingSuccessModal";

interface IWritingFormProps {
  selectedCategory: string | null;
  title: string | null;
  content: string | null;
  option1: string | null;
  option2: string | null;
  tags: string[] | [];
}

export default function WritingForm({ selectedCategory, title, content, option1, option2, tags }: IWritingFormProps) {
  const userInfo = useAuthStore((state) => state.userInfo);
  const [contentFulfilled, setContentFulfilled] = useState(false);
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();

  const handleCommentSubmit = async () => {
    const category = selectedCategory === "정치・경제" ? "정치_경제" : selectedCategory;
    const isTagEmpty = tags.some((tag) => tag === "");
    const isTag: string[] = isTagEmpty ? [] : tags;
    try {
      await fetch(constant.apiUrl + `api/main/new/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          title: title,
          category: category,
          content: content,
          tags: isTag,
          option1: option1,
          option2: option2,
        }),
      });

      handleOpenMoal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCategory && title && content && option1 && option2 && tags.length > 0 && option1 !== option2) {
      setContentFulfilled(true);
    } else {
      setContentFulfilled(false);
    }
  }, [selectedCategory, title, content, option1, option2, tags]);

  const registrationClass = contentFulfilled ? `${styles.registration} ${styles.fulfilled}` : styles.registration;
  return (
    <div className={registrationClass}>
      <button onClick={handleCommentSubmit} disabled={!contentFulfilled}>
        등록
      </button>
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <WritingSuccessModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
