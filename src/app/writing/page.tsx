"use client";

import { useState } from "react";

import WritingCategory from "./_component/WritingCategory";
import WritingContent from "./_component/WritingContent";
import WritingForm from "./_component/WritingForm";
import WritingNav from "./_component/WritingNav";
import WritingTitle from "./_component/WritingTitle";
import styles from "./writing.module.css";

export default function Writing() {
  const [selectedCategory, setSelecteCategory] = useState<string | null>("");
  const [title, setTitle] = useState<string | null>("");
  const [content, setContent] = useState<string | null>("");

  const handleCategorySelect = (selectedCategory: string) => {
    setSelecteCategory(selectedCategory);
  };

  const handleTitle = (title: string) => {
    setTitle(title);
  };

  const handleContent = (content: string) => {
    setContent(content);
  };

  return (
    <div className={styles.writingBox}>
      <WritingNav title={"Writing"}>
        <WritingForm />
      </WritingNav>
      <div className={styles.writingContainer}>
        <WritingCategory selectedOption={selectedCategory} OnSelectedOption={handleCategorySelect} />
        <WritingTitle onTitleData={handleTitle} />
        <WritingContent onContentData={handleContent} />
      </div>
    </div>
  );
}
