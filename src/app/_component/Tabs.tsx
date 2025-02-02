"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useQueryGetProfilePostData } from "../profile/[userId]/_hook/useQueryGetProfilePostData";
import styles from "./tabs.module.css";

function Maintab() {
  const searchParams = useSearchParams();
  const category = searchParams.get("tab");
  const pathname = usePathname();
  const tabs = [
    { value: 0, label: "전체" },
    { value: 1, label: "연애" },
    { value: 2, label: "라이프" },
    { value: 3, label: "사회이슈" },
    { value: 4, label: "재미" },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setActiveTab(() => {
      if (category === "연애") {
        return 1;
      } else if (category === "라이프") {
        return 2;
      } else if (category === "사회이슈") {
        return 3;
      } else if (category === "재미") {
        return 4;
      }
      return 0;
    });
  }, [category]);

  return (
    <div className={`${styles.tabsMenuContainer} ${pathname === "/" ? "mt-[10px]" : "mt-[76px]"}`}>
      {tabs.map((tab, index) => (
        <Link
          href={{
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

function Profiletab({ userId }: { userId: number }) {
  const searchParams = useSearchParams();
  const profileTab = Number(searchParams.get("profileTab"));
  const { data } = useQueryGetProfilePostData(userId);
  const [activeTab, setActiveTab] = useState<number>(0);
  const totalCount = data?.totalCount || 0;
  const writtenCount = data?.votedCount || 0;
  const votedCount = data?.writedCount || 0;

  const tabs = [
    { label: "전체", count: totalCount, value: 0 },
    { label: "작성한 글", count: votedCount, value: 1 },
    { label: "투표한 글", count: writtenCount, value: 2 },
  ];

  useEffect(() => {
    setActiveTab(() => {
      if (profileTab === 0) {
        return 0;
      } else if (profileTab === 1) {
        return 1;
      } else if (profileTab === 2) {
        return 2;
      }
      return 0;
    });
  }, [profileTab]);

  return (
    <div className={styles.tabsProfileContainer}>
      <div className={styles.tabsContainer}>
        {tabs.map((profileTab, index) => (
          <Link
            href={{
              query: { profileTab: profileTab.value },
            }}
            replace
            key={index}
            className={`${styles.profileTab} ${activeTab === index ? styles.active : ""}`}
          >
            <div className={styles.tabContent}>
              <div className={styles.tabLabel}>{profileTab.label}</div>
              <div className={styles.tabCount}>{profileTab.count}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={`${styles.tabProfileBorderBottom} ${activeTab !== undefined ? styles.active : ""}`}></div>
    </div>
  );
}

export { Maintab, Profiletab };
