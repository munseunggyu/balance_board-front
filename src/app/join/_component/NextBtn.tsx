import Image from "next/image";
import React, { useEffect, useState } from "react";

import Button from "@/app/_component/Button";

import { useJoinDataContext } from "../_context/JoinContext";
import styles from "../join.module.css";
interface IProps {
  handleNext: () => void;
}
export default function NextBtn({ handleNext }: IProps) {
  const {
    data: { visibleBtn, processType },
  } = useJoinDataContext();

  const [nowVisibleBtn, setNowVisibleBtn] = useState(false);

  useEffect(() => {
    if (processType === 0) {
      if (visibleBtn) {
        setNowVisibleBtn(true);
      } else {
        setNowVisibleBtn(false);
      }
    } else if (processType === 1) {
      if (visibleBtn) {
        setNowVisibleBtn(true);
      } else {
        setNowVisibleBtn(false);
      }
    }
  }, [visibleBtn]);
  return (
    <Button
      className={styles.submit_btn}
      bgColor={!nowVisibleBtn ? "body_200" : "background_100"}
      border={!nowVisibleBtn ? "gray" : "primary"}
      onClick={handleNext}
    >
      <span className={`${styles.submit_btn_txt} ${nowVisibleBtn && styles.primary_txt}`}>다음</span>
      <Image
        className={styles.ico}
        src={!nowVisibleBtn ? "/direction-next-md.svg" : "/direction-next-md-primary.svg"}
        alt="오른쪽 화살표 아이콘"
        width={24}
        height={24}
      />
    </Button>
  );
}
