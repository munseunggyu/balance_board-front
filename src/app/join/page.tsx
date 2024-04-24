"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { useModal } from "@/hook/useModal";
import { ILogin } from "@/modal/User";
import { useAuthStore } from "@/stores/user";
import { constant } from "@/utils/constant";

import JoinCompleteModal from "../_component/JoinCompleteModal";
import Loading from "../_component/Loading";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import JoinNav from "./_component/JoinNav";
import styles from "./join.module.css";

interface IKakao {
  userId: number;
  result: number;
  imageType: number;
  jwtToken: {
    accessToken: string;
    refreshToken: string;
  };
  nickname: string;
}

export default function Join() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const storeLogin = useAuthStore((state) => state.storeLogin);
  const {
    openModal: openJoinModal,
    handleOpenMoal: handleOpenJoinMoal,
    handleCloseModal: handleCloseJoinModal,
  } = useModal();
  const [kakaoData, setKakaoData] = useState<null | IKakao>(null);
  const [nicknameObj, setNicknameObj] = useState({
    value: "",
    validation: false,
    duplication: 0, // 0. 중복 확인 전 1. 통과 2. 중복 닉네임
    errMsg: "",
  });
  const [gender, setGender] = useState<null | string>(null);
  const [birthYearObj, setBirthYearObj] = useState({
    value: "",
    errMsg: "",
  });
  const [joinStartBtnVisible, setJoinStartBtnVisible] = useState(false);
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /\s/;
    const { value } = e.target;
    setNicknameObj((prev) => {
      return {
        ...prev,
        duplication: 0,
        value,
      };
    });
    if (value.length > 1) {
      setNicknameObj((prev) => {
        return {
          ...prev,
          duplication: 0,
          errMsg: "",
        };
      });
      if (!regex.test(value)) {
        setNicknameObj((prev) => {
          return {
            ...prev,
            duplication: 0,
            validation: true,
          };
        });
      } else {
        setNicknameObj((prev) => {
          return {
            ...prev,
            duplication: 0,
            validation: false,
            errMsg: "공백은 사용할 수 없어요.",
          };
        });
      }
    } else {
      setNicknameObj((prev) => {
        return {
          ...prev,
          duplication: 0,
          errMsg: "2글자 이상 입력해주세요.",
        };
      });
    }
    // setVisibleBtn(false);
  };
  const checkDuplication = async () => {
    try {
      const res = await fetch(constant.apiUrl + "api/user/validate/nickname?nickname=" + nicknameObj.value, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const { duplicate, status }: { duplicate: boolean; status?: number } = await res.json();
      if (status === 400) {
        setNicknameObj((prev) => {
          return {
            ...prev,
            duplication: 2,
          };
        });
        return;
      }
      if (duplicate) {
        setNicknameObj((prev) => {
          return {
            ...prev,
            duplication: 2,
            errMsg: "이미 사용 중인 닉네임이에요.",
          };
        });
      } else {
        setNicknameObj((prev) => {
          return {
            ...prev,
            duplication: 1,
          };
        });
      }
    } catch (err) {
      console.error(err);
      setNicknameObj((prev) => {
        return {
          ...prev,
          duplication: 2,
        };
      });
    }
    // 잘 되면
  };
  const calculateKoreanAge = (birthYear: number) => {
    if (isNaN(birthYear)) return 999;

    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear + 1;
    console.log(age);
    return age;
  };
  const handleBirthYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBirthYearObj((prev) => ({
      ...prev,
      value,
    }));
    const ageValidation = calculateKoreanAge(Number(value));
    if (ageValidation < 0 || ageValidation > 125) {
      setBirthYearObj((prev) => ({
        ...prev,
        errMsg: "올바른 값을 입력해주세요. ",
      }));
    } else {
      setBirthYearObj((prev) => ({
        ...prev,
        errMsg: "",
      }));
    }
  };

  const kakaoLogin = async () => {
    const res = await fetch(constant.apiUrl + "api/user/kakao?code=" + code, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const kakaoLoginData: IKakao = await res.json();
    if (kakaoLoginData.result === 1) {
      const nextResponse = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kakaoLoginData),
      });
      const data: ILogin = await nextResponse.json();
      storeLogin({
        ...data,
        isLogin: 1,
      });
      router.push("/");
      return;
    }
    router.replace("/join");
    setKakaoData(kakaoLoginData);
  };

  const handleJoin = async () => {
    if (!joinStartBtnVisible) return;
    try {
      const res = await fetch(constant.apiUrl + "api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: kakaoData?.userId,
          nickname: nicknameObj.value,
          gender,
          birthYear: birthYearObj.value,
        }),
      });
      // setProcessType(0)
      const data: { duplicate: boolean } = await res.json();
      console.log(data);
      if (data.duplicate) {
        alert("회원가입에 실패하였습니다");
      } else {
        handleOpenJoinMoal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (code) {
      void kakaoLogin();
    }
  }, []);
  useEffect(() => {
    if (
      !!gender &&
      !birthYearObj.errMsg &&
      birthYearObj.value.length > 0 &&
      !nicknameObj.errMsg &&
      nicknameObj.duplication === 1
    ) {
      setJoinStartBtnVisible(true);
    } else {
      setJoinStartBtnVisible(false);
    }
  }, [nicknameObj.duplication, nicknameObj.validation, gender, birthYearObj.errMsg]);

  if (code) {
    return <Loading />;
  }

  return (
    <div className={styles.container_bgc}>
      <JoinNav />
      <main className={styles.container}>
        <section className="mt-[40px] mb-[68px] relative">
          <strong className="block text-title-400 mb-[14px]">
            닉네임<span className="text-state-wraning-red-500">*</span>
          </strong>
          <div className="flex gap-[6px]">
            <input
              value={nicknameObj.value}
              onChange={handleNicknameChange}
              className={`${styles.colorInput} ${nicknameObj.errMsg ? styles.err : ""}`}
              type="text"
            />
            <button
              className={`rounded-lg border-solid border-[1px]  min-w-[98px] px-[14px] py-[10px]  text-sm ${nicknameObj.validation && nicknameObj.duplication !== 1 ? "border-main-primary-500 text-main-primary-500" : "border-body-400 text-body-800"}`}
              onClick={checkDuplication}
            >
              중복확인
            </button>
          </div>
          <div className="relative ">
            {nicknameObj.duplication === 1 ? (
              <p className=" absolute bottom-[-23px] text-xs font-bold text-main-primary-500">
                {nicknameObj.value}님, 멋진 이름이네요!
              </p>
            ) : nicknameObj.errMsg ? (
              <p className="absolute bottom-[-23px] px-[14px] text-state-wraning-red-300 text-xs">
                {nicknameObj.errMsg}
              </p>
            ) : (
              <p className="absolute bottom-[-41px] text-xs text-body-950">
                *타인에게 불쾌감을 줄 수 있는 닉네임의 경우
                <br /> 운영자의 조치를 받을 수 있습니다.
              </p>
            )}
          </div>
        </section>
        <section>
          <strong className="block text-title-400 mb-[14px]">
            성별<span className="text-state-wraning-red-500">*</span>
          </strong>
          <div className="flex gap-x-[10px]">
            <button
              className={`${styles.genderBtn} ${gender === "male" ? "text-body-100 bg-main-primary-500" : "text-body-950 bg-background-200"}`}
              onClick={() => setGender("male")}
            >
              남성
            </button>
            <button
              className={`${styles.genderBtn} ${gender === "female" ? "text-body-100 bg-main-primary-500" : "text-body-950 bg-background-200"}`}
              onClick={() => setGender("female")}
            >
              여성
            </button>
          </div>
        </section>
        <section className="mt-[32px]">
          <strong className="block text-title-400 mb-[14px]">
            출생연도<span className="text-state-wraning-red-500">*</span>
          </strong>
          <input
            value={birthYearObj.value}
            onChange={handleBirthYearChange}
            className={`${styles.colorInput} ${birthYearObj.errMsg ? styles.err : ""}`}
            type="text"
          />
          {birthYearObj.errMsg && <p className="text-state-wraning-red-300 text-xs mt-[8px]">{birthYearObj.errMsg}</p>}
        </section>
      </main>

      <button
        className={`${styles.join_start} ${joinStartBtnVisible ? "font-bold text-body-100 bg-main-primary-500" : "bg-body-400 text-body-800"}  `}
        onClick={handleJoin}
      >
        시작하기
      </button>
      {openJoinModal && (
        <ModalPortal>
          <ModalContainer>
            <JoinCompleteModal
              handleCloseModal={() => {
                router.push("/login");
                handleCloseJoinModal();
              }}
            />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
