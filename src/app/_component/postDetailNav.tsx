import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function PostDetailNav() {
  return (
    <nav className={styles.postDetailNavbar}>
      <Link href="/page1">
        <div className={styles.backPage}>
          <Image src="/image5.png" alt="Page 1" width={24} height={24} />
        </div>
      </Link>
      <Link href="/page2">
        <div className={styles.navLogo}>
          <Image src="/image2.png" alt="Page 2" width={183} height={20} />
        </div>
      </Link>
      <Link href="/page2">
        <div className={styles.search}>
          <Image src="/search-md.png" alt="Page 2" width={24} height={24} />
        </div>
      </Link>
    </nav>
  );
}
