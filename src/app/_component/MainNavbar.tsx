import Image from "next/image";
import Link from "next/link";

import styles from "./mainNavbar.module.css";

export default function Topnav() {
  return (
    <nav className={styles.nav}>
      <Link href="/page1" className={styles.user_icon}>
        <Image src="/image1.png" alt="Page 1" width={24} height={24} />
      </Link>
      <Link href="/page2">
        <Image src="/image2.png" alt="Page 2" width={183} height={20} />
      </Link>
      <div className={styles.right_icons}>
        <Link href="/page3">
          <Image src="/image3.png" alt="Page 3" width={24} height={24} />
        </Link>
        <Link href="/page4">
          <Image src="/image4.png" alt="Page 4" width={24} height={24} />
        </Link>
      </div>
    </nav>
  );
}
