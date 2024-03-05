"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./settingNav.module.css";

export default function SettingNav({ title }: { title?: string }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.backPage}>
          <Link href="/">
            <Image src="/image5.png" alt="Page 1" width={24} height={24} />
          </Link>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </nav>
  );
}
