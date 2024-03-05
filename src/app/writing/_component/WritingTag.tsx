import React, { useEffect, useRef, useState } from "react";

import styles from "./writingtag.module.css";

interface IWritingTagProps {
  onTagsData: (newTags: string[]) => void;
}

export default function WritingTag({ onTagsData }: IWritingTagProps) {
  const [tags, setTags] = useState<string[]>([""]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /** inputRefs가 배열의 마지막 요소고, 정상적으로 존재한다면 포커스 */

  useEffect(() => {
    inputRefs.current[inputRefs.current.length - 1]?.focus();
  }, [tags]);

  /** 태그 글자 6글자 이내처리 */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const trimdValue = value.replace(/\s/g, "");
    if (trimdValue.length <= 6) {
      const newTags = [...tags];
      newTags[index] = trimdValue;
      setTags(newTags);
      setErrorMessage("");
      onTagsData(newTags);
    } else {
      setErrorMessage("태그는 6글자 이내로 작성해주세요!");
    }
  };

  /** Enter를 쳤을 때 공백이 아니고, index가 마지막 요소고, tags가 5개 미만일 때 빈 문자열 추가 */
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimTag = tags[index].trim();

      if (trimTag !== "" && index === tags.length - 1 && tags.length < 5) {
        setTags([...tags, ""]);
      }
    }
  };
  /** 포커싱 잃었을 떄 데이터가 없으면 input 삭제 */
  const handleInputBlur = (index: number) => {
    if (tags[index].trim() === "" && tags.length > 1) {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  const calculateInputWidth = (value: string) => {
    const minWidth = 80;
    const inputPadding = 12;
    const inputMinWidth = 12;

    const width = value ? value.length * inputMinWidth + inputPadding * 2 : minWidth;

    return width;
  };

  return (
    <div className={styles.tagBox}>
      <div className={styles.tagInfoContainer}>
        <div className={styles.tag}>태그</div>
        <div className={styles.tagCountContainer}>
          <div className={styles.tagCount}>{tags.filter((tag) => tag.trim() !== "").length}</div>
          <div className={styles.tagseperator}></div>
          <div className={styles.tagCountMax}>5</div>
        </div>
      </div>
      <div className={styles.taginputContainer}>
        {tags.map((tag, index) => (
          <span key={index}>
            <input
              className={styles.tagAdd}
              placeholder={"# 태그추가"}
              value={tag}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleInputKeyDown(e, index)}
              onBlur={() => handleInputBlur(index)}
              ref={(ele) => {
                inputRefs.current[index] = ele;
              }}
              style={{ width: `${calculateInputWidth(tag)}px` }}
            />
            {errorMessage && index === tags.length - 1 && <div className={styles.errorMessage}>{errorMessage}</div>}
          </span>
        ))}
      </div>
    </div>
  );
}
