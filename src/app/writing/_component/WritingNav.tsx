"use client";

import Image from "next/image";
import Link from "next/link";

import direction_left from "../../../../public/direction-left-md.svg";
import styles from "./writingNav.module.css";

export default function WritingNav({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.backPage}>
        <Link href="/">
          <Image src={direction_left} alt="뒤로 가기" width={24} height={24} />
        </Link>
      </div>
      <div className={styles.title}>{title}</div>
      {children}
    </nav>
  );
}
