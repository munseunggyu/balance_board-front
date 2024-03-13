"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

import Input from "@/app/_component/Input";
import ValidationCheckList from "@/app/_component/ValidationCheckList";
import { constant } from "@/utils/constant";

import { useJoinDataContext } from "../_context/JoinContext";
import styles from "./joinName.module.css";
import NextBtn from "./NextBtn";

export default function JoinName() {
  const {
    data: { submitData, visibleBtn, processType },
    setDataField,
    setVisibleBtn,
  } = useJoinDataContext();
  const router = useRouter();
  const [validation, setValidation] = useState({
    len: false,
    space: false,
    duplication: 0, // 0 1 2
  });
  const regex = /\s/;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibleBtn(false);
    const { name, value } = e.target;
    setValidation((prev) => {
      return {
        ...prev,
        duplication: 0,
      };
    });
    if (value.length > 1) {
      setValidation((prev) => {
        return {
          ...prev,
          len: true,
        };
      });
      if (!regex.test(value)) {
        setValidation((prev) => {
          return {
            ...prev,
            space: true,
          };
        });
      } else {
        setValidation((prev) => {
          return {
            ...prev,
            space: false,
          };
        });
      }
    } else {
      setValidation((prev) => {
        return {
          ...prev,
          len: false,
          space: false,
          duplication: 1,
        };
      });
    }
    setDataField(name, value);
    // setVisibleBtn(false);
  };
  const resetInput = () => {
    setValidation((prev) => {
      return {
        ...prev,
        len: false,
        space: false,
        duplication: 0,
      };
    });
    setDataField("nickname", "");
  };
  const checkDuplication = async () => {
    const res = await fetch(constant.apiUrl + "api/user/validate/nickname?nickname=" + submitData.nickname, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const { duplicate }: { duplicate: boolean } = await res.json();
    if (duplicate) {
      setValidation((prev) => {
        return {
          ...prev,
          duplication: 1,
        };
      });
    } else {
      setValidation((prev) => {
        return {
          ...prev,
          duplication: 2,
        };
      });
    }
    // 잘 되면
  };

  const validationList = [
    {
      validation: validation.len,
      label: "2자 이상",
    },
    {
      validation: validation.duplication === 2,
      label: "중복 닉네임 없음",
    },
    {
      validation: validation.space,
      label: "공백 없음",
    },
  ];

  const handleNext = () => {
    if (visibleBtn && processType === 1) {
      router.push("/join/?processType=2");
    }
  };

  const activeNextBtn = () => {
    setVisibleBtn(false);
    if (!submitData.nickname) return;
    if (!validation.len) return;
    if (!validation.space) return;
    if (validation.duplication !== 2) return;
    setVisibleBtn(true);
  };

  useEffect(() => {
    activeNextBtn();
  }, [submitData, validation]);
  return (
    <div>
      <div className={styles.join_name_container}>
        <div className={styles.text_field_container}>
          <div className={styles.input_container}>
            <Input
              className={styles.input}
              placeholder="닉네임을 입력해주세요."
              value={submitData.nickname}
              onChange={handleChange}
              name="nickname"
            />
            {validation.duplication === 2 ? (
              <Image className={styles.ico} src="/check-circle-md.svg" alt="확인 아이콘" width={24} height={24} />
            ) : (
              <Image
                onClick={resetInput}
                className={styles.ico}
                src="/x-circle-md.svg"
                alt="닫기 아이콘"
                width={24}
                height={24}
              />
            )}
          </div>
          {validation.duplication !== 2 && (
            <button onClick={checkDuplication} className={styles.check_btn}>
              중복확인
            </button>
          )}
        </div>
        {validation.duplication === 1 && <p className={styles.validation_txt}>중복된 닉네임 입니다.</p>}
        {validation.duplication === 2 && (
          <p className={`${styles.validation_txt} ${styles.pass}`}>{submitData.nickname}님, 멋진 이름이네요!</p>
        )}
        <ValidationCheckList className={styles.check_list_margin} validationList={validationList} />
      </div>
      <NextBtn handleNext={handleNext} />
    </div>
  );
}
