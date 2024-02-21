"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

import Input from "@/app/_component/Input";

import { ISetSumbitProps } from "../page";
import styles from "./joinName.module.css";

export default function JoinName({ setVisibleBtn, setSubmitData, submitData }: ISetSumbitProps) {
  const [validation, setValidation] = useState({
    len: false,
    space: false,
    duplication: 0, // 0 1 2
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleBtn((prev) => !prev);
    const { name, value } = e.target;
    setSubmitData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setVisibleBtn(false);
  };
  const checkDuplication = () => {
    // 잘 되면
    setValidation((prev) => {
      return {
        ...prev,
        duplication: 2,
      };
    });
  };

  return (
    <div className={styles.join_name_container}>
      <div className={styles.text_field_container}>
        <div className={styles.input_container}>
          <Input
            className={styles.input}
            placeholder="닉네임을 입력해주세요."
            value={submitData?.nickname}
            onChange={handleChange}
            name="nickname"
          />
          {validation.duplication === 2 ? (
            <Image className={styles.ico} src="/check-circle-md.svg" alt="확인 아이콘" width={24} height={24} />
          ) : (
            <Image className={styles.ico} src="/x-circle-md.svg" alt="닫기 아이콘" width={24} height={24} />
          )}
        </div>
        {validation.duplication !== 2 && (
          <button onClick={checkDuplication} className={styles.check_btn}>
            중복확인
          </button>
        )}
      </div>
      {validation.duplication === 1 && <p className={styles.validation_txt}>닉네임 중복 여부를 확인해주세요!</p>}
      <ul className={styles.check_list}>
        <li className={styles.check_list_item}>
          <Image
            className={styles.ico}
            src={validation.len ? "/check-pressed-md.svg" : "/check-md.svg"}
            alt="닫기 아이콘"
            width={24}
            height={24}
          />
          2자리 이상
        </li>
        <li className={styles.check_list_item}>
          <Image className={styles.ico} src="/check-md.svg" alt="닫기 아이콘" width={24} height={24} />
          공백 없음
        </li>
        <li className={styles.check_list_item}>
          <Image className={styles.ico} src="/check-md.svg" alt="닫기 아이콘" width={24} height={24} />
          비속어 없음
        </li>
        <li className={styles.check_list_item}>
          <Image className={styles.ico} src="/check-md.svg" alt="닫기 아이콘" width={24} height={24} />
          중복 닉네임 없음
        </li>
      </ul>
    </div>
  );
}
