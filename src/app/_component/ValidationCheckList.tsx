import Image from "next/image";
import React from "react";

import styles from "./validationCheckList.module.css";

interface IProps {
  validationList: {
    validation: boolean;
    label: string;
  }[];
  className?: string;
}

export default function ValidationCheckList({ validationList, className }: IProps) {
  return (
    <ul className={`${styles.check_list} ${className}`}>
      {validationList.map((v) => (
        <li className={styles.check_list_item} key={v.label}>
          <Image
            className={styles.ico}
            src={v.validation ? "/check-pressed-md.svg" : "/check-gray.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          {v.label}
        </li>
      ))}
      {/* <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.maxLen ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          20자 이내
        </li>
        <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.space ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          공백 없음
        </li>
        <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.enNum ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          영문, 숫자 포함
        </li> */}
    </ul>
  );
}
