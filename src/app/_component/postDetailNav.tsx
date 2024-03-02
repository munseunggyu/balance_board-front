import Image from "next/image";
import Link from "next/link";

import direct_left_md from "../../../public/direction-left-md.svg";
import search_md from "../../../public/search-md.svg";
import styles from "./navbar.module.css";

export default function PostDetailNav() {
  return (
    <nav className={styles.postDetailNavbar}>
      <Link href="/">
        <div className={styles.backPage}>
          <Image src={direct_left_md} alt="홈으로 가기 버튼" width={24} height={24} />
        </div>
      </Link>
      <Link href="">
        <div className={styles.search}>
          <Image src={search_md} alt="게시글 찾기 버튼" width={24} height={24} />
        </div>
      </Link>
    </nav>
  );
}
