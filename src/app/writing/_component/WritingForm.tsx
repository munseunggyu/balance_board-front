"use client";
import Link from "next/link";
import { useState } from "react";

import styles from "./writingNav.module.css";

export default function WritingForm() {
  const [contentFulfilled, setContentFulfilled] = useState(false);
  const handleContentFulfilled = () => {
    setContentFulfilled((prevState) => !prevState);
  };
  const registrationClass = contentFulfilled ? `${styles.registration} ${styles.fulfilled}` : styles.registration;
  return (
    <div className={registrationClass} onClick={handleContentFulfilled}>
      <Link href="/">
        <button>등록</button>
      </Link>
    </div>
  );
}
