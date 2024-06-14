import React from "react";

import Topnav from "../_component/MainNavbar";
import { Maintab } from "../_component/Tabs";
import WriteFloating from "../home/_component/WriteFloating";
import styles from "./mainLayout.module.css";

export default function MainLayout({ children, isHome }: { children: React.ReactNode; isHome: boolean }) {
  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <Topnav />
        {isHome && <Maintab />}
      </div>
      {children}
      <WriteFloating />
    </div>
  );
}
