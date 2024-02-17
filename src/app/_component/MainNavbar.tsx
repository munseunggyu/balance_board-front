import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Topnav() {
  return (
    <nav className={styles.navbar}>
      <Link href="/page1">
        <div className={styles.navIcon}>
          <Image src="/image1.png" alt="Page 1" width={24} height={24} />
        </div>
      </Link>
      <Link href="/page2">
        <div className={styles.navLogo}>
          <Image src="/image2.png" alt="Page 2" width={183} height={20} />
        </div>
      </Link>
      <Link href="/page3">
        <div className={styles.navIcon}>
          <Image src="/image3.png" alt="Page 3" width={24} height={24} />
        </div>
      </Link>
      <Link href="/page4">
        <div className={styles.navIcon}>
          <Image src="/image4.png" alt="Page 4" width={24} height={24} />
        </div>
      </Link>
    </nav>
  );
}
