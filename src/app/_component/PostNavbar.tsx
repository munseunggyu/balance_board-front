"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import styles from "./navbar.module.css";

export default function PostNav() {
  const [contentFulfiled, setContentFulfiled] = useState(false);

  const handleContentFulfiled = () => {
    setContentFulfiled((prevState) => !prevState);
  };

  const registrationClass = contentFulfiled ? `${styles.registration} ${styles.fulfiled}` : styles.registration;

  return (
    <nav className={styles.navbar}>
      <div className={styles.backPage}>
        <Link href="/">
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
        </Link>
      </div>
      <div className={styles.writing}>
        <p>Writing</p>
      </div>
      <div className={registrationClass} onClick={handleContentFulfiled}>
        <Link href="/">
          <p>등록</p>
        </Link>
      </div>
    </nav>
  );
}
