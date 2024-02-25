"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import styles from "./tabs.module.css";

interface IProfileProps {
  totalCount: number;
  votedCount: number;
  writtenCount: number;
}

function Maintab() {
  const searchParams = useSearchParams();
  const category = searchParams.get("tab");
  const tabs = [
    { value: 0, label: "전체" },
    { value: 1, label: "이슈" },
    { value: 2, label: "라이프" },
    { value: 3, label: "정치・경제" },
    { value: 4, label: "기타" },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setActiveTab(() => {
      if (category === "이슈") {
        return 1;
      } else if (category === "라이프") {
        return 2;
      } else if (category === "정치・경제") {
        return 3;
      } else if (category === "기타") {
        return 4;
      }
      return 0;
    });
  }, [category]);

  return (
    <div className={styles.tabsMenuContainer}>
      {tabs.map((tab, index) => (
        <Link
          href={{
            pathname: "/",
            query: { tab: tab.label },
          }}
          key={index}
          className={`${styles.tab} ${index === activeTab ? styles.active : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

function Profiletab({ totalCount, votedCount, writtenCount }: IProfileProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { label: "전체", count: totalCount },
    { label: "투표한 글", count: votedCount },
    { label: "작성한 글", count: writtenCount },
  ];

  return (
    <div className={styles.tabsProfileContainer}>
      <div className={styles.tabsContainer}>
        {tabs.map((profileTab, index) => (
          <div
            key={index}
            className={`${styles.profileTab} ${activeTab === index ? styles.active : ""}`}
            onClick={() => setActiveTab(index)}
          >
            <div className={styles.tabContent}>
              <div className={styles.tabLabel}>{profileTab.label}</div>
              <div className={styles.tabCount}>{profileTab.count}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.tabProfileBorderBottom} ${activeTab !== undefined ? styles.active : ""}`}></div>
    </div>
  );
}

export { Maintab, Profiletab };
