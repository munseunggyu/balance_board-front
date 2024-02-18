"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function PostNav({ title }: { title: string }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.backPage}>
        <Link href="/">
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
        </Link>
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </nav>
  );
}
