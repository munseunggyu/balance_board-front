import Image from "next/image";
import React from "react";

import styles from "./writeFloating.module.css";
import Link from "next/link";
export default function WriteFloating() {
  return (
    <Link href={"/writing"} className={styles.floating}>
      <Image src="/image11.png" alt="게시글 작성하기 버튼" width={52} height={52} />
    </Link>
  );
}
