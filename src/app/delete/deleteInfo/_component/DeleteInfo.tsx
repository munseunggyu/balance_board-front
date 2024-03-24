"use client";

import Image from "next/image";

import { useUserDataContext } from "@/context/AuthContext";

import checked_circle from "../../../../../public/check-circle-1-lg.svg";
import check_circle from "../../../../../public/check-circle-2-lg.svg";
import styles from "./deleteInfo.module.css";

interface IDeleteInfoProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteInfo({ isChecked, setIsChecked }: IDeleteInfoProps) {
  const { userInfo } = useUserDataContext();

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return userInfo.isLogin === 1 ? (
    <div className={styles.deleteContainer}>
      <div className={styles.deleteHeader}>
        <p>밸런스 보드를</p>
        <p>탈퇴하시겠어요?</p>
      </div>
      <div className={styles.deleteSubTitle}>
        <span>아래 내용을 반드시 확인해주세요.</span>
      </div>
      <div className={styles.deleteContent}>
        <div className={styles.deleteProcess}>
          <div className={styles.deleteProcessHeaderContainer}>
            <p className={styles.deleteProcessHeader}>회원 탈퇴 시 처리 내용</p>
            <p>- 이메일 정보 삭제</p>
            <p>- 사용자 정보 삭제</p>
          </div>
          <div className={styles.deleteHandleContainer}>
            <p className={styles.deleteHandleHeader}>회원 탈퇴 시 게시글 관리</p>
            <p className={styles.deleteHandleContent}>
              회원탈퇴 후 밸런스보드 서비스에 입력한 게시글 및 댓글, 투표활동은 삭제되지 않으며, 회원정보 삭제로 인해
              작성자 본인을 확인할 수 없으므로 게시물 편집 및 삭제 처리가 불가능합니다. 게시물 삭제를 원하시는 경우에는
              먼저 해당 게시물을 삭제하신 후 탈퇴를 진행하시기 바랍니다.
            </p>
          </div>
          <div className={styles.deleteRejoinContainer}>
            <p className={styles.deleteRejoinHeader}>회원 탈퇴 후 재가입 규정</p>
            <p className={styles.deleteRejoinContent}>
              부정 이용 방지를 위해 탈퇴 후 30일 동안 다시 가입할 수 없습니다.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.deleteInfoCheckContainer}>
        <Image
          src={isChecked ? checked_circle : check_circle}
          alt="안내사항 체크 이미지"
          height={36}
          width={36}
          onClick={handleCheck}
          className={styles.checkedImg}
        />
        <span>안내사항을 확인하였으며, 이에 동의합니다.</span>
      </div>
    </div>
  ) : null;
}
