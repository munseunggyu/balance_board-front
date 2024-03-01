import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo.png";
import notificationIco from "../../../public/notification-md.png";
import searchIco from "../../../public/search-md.png";
import styles from "./mainNavbar.module.css";

export default function Topnav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.main_logo}>
        <Image src={logo} alt="Page 2" width={107} height={31} />
      </Link>
      <div className={styles.right_icons}>
        <Link href="/">
          <Image src={searchIco} alt="검색" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src={notificationIco} alt="알림" width={24} height={24} />
        </Link>
      </div>
    </nav>
  );
}
