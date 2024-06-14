"use client";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Button, { IButton } from "@/app/_component/Button";
import { IPost } from "@/modal/Post";
import { useAuthStore } from "@/stores/user";

import { doVote } from "../_lib/doVote";
import styles from "./voteBtnContainer.module.css";

interface IProps {
  btnType: number;
  option1: string;
  option2: string;
  option1Count: number;
  option2Count: number;
  voteCount: number;
  postId: number;
  post: IPost;
  openLoginModal?: () => void;
}

export default function VoteBtnsContainer({
  voteCount,
  option1,
  option2,
  option1Count,
  option2Count,
  postId,
  post,
  openLoginModal,
}: IProps) {
  const option1Percent = ((option1Count / (voteCount || 1)) * 100).toFixed(1);
  const option2Percent = ((option2Count / (voteCount || 1)) * 100).toFixed(1);
  const queryClient = useQueryClient();
  const userInfo = useAuthStore((state) => state.userInfo);
  const [option1BtnType, setOption1BtnType] = useState(0);
  const [option2BtnType, setOption2BtnType] = useState(0);
  const [disableVoteBtn, setDisableVoteBtnVoteBtn] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const clickOption = (value: string) => {
    if (userInfo.isLogin !== 1) {
      openLoginModal && openLoginModal();
      return;
    } else {
      if (post.selectedVoteOption) return;
    }
    setDisableVoteBtnVoteBtn(true);

    if (post.selectedVoteOption) return;
    setSelectOption(value);
    if (value === option1) {
      setOption2BtnType(0);
      setOption1BtnType(1);
    } else {
      setOption1BtnType(0);
      setOption2BtnType(1);
    }
  };

  // 0. 미선택(미투 표), 1. 선택(미투표), 2. 미선택(투표 완), 3. 선택(투표 완)
  const Option1BtnStyle: IButton = {
    bgColor: option1BtnType === 3 ? "primary" : option1BtnType === 2 ? "body_600" : "body_100",
    border: option1BtnType === 1 || option1BtnType === 3 ? "primary" : "gray",
  };
  const Option2BtnStyle: IButton = {
    bgColor: option2BtnType === 3 ? "primary" : option2BtnType === 2 ? "body_600" : "body_100",
    border: option2BtnType === 1 || option2BtnType === 3 ? "primary" : "gray",
  };

  const option1FontColor =
    option1BtnType === 1 || option1BtnType === 3
      ? styles.primary
      : option1BtnType === 2
        ? styles.text_body_950
        : styles.text_title_100;

  const option2FontColor =
    option2BtnType === 1 || option2BtnType === 3
      ? styles.primary
      : option2BtnType === 2
        ? styles.text_body_950
        : styles.text_title_100;

  const handleVote = useMutation({
    mutationFn: () => {
      return doVote(postId, userInfo.userId, selectOption, userInfo.accessToken);
    },
    onSuccess() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      const filterQuerys = queryKeys.filter((v) => {
        if (v[0] === "posts" && v[1] === "all") {
          return true;
        }
        return false;
      });
      filterQuerys.forEach((queryKey) => {
        const value: IPost | InfiniteData<IPost[]> | undefined = queryClient.getQueryData(queryKey);
        if (value && "pages" in value) {
          const obj = value.pages.flat().find((v) => v.postId === postId);
          if (obj) {
            const pageIndex = value.pages.findIndex((page) => {
              const pageObj = page.includes(obj);
              return pageObj;
            });
            const idx = value.pages[pageIndex].findIndex((v) => {
              return v.postId === postId;
            });
            if (idx >= 0) {
              const data = produce(value, (draftData) => {
                draftData.pages[pageIndex][idx].selectedVoteOption = selectOption;
                draftData.pages[pageIndex][idx].voteCount = draftData.pages[pageIndex][idx].voteCount + 1;
                if (selectOption === option1) {
                  draftData.pages[pageIndex][idx].option1Count = draftData.pages[pageIndex][idx].option1Count + 1;
                } else {
                  draftData.pages[pageIndex][idx].option2Count = draftData.pages[pageIndex][idx].option2Count + 1;
                }
              });
              queryClient.setQueryData(queryKey, data);
            }
          }
        }
      });
    },
  });

  const onClickVotedBtn = () => {
    if (userInfo.isLogin !== 1) return;
    if (!disableVoteBtn) return;
    handleVote.mutate();
  };

  useEffect(() => {
    if (!post.selectedVoteOption) {
      setOption1BtnType(0);
      setOption2BtnType(0);
      return;
    }
    if (post.selectedVoteOption === option1) {
      setOption1BtnType(3);
      setOption2BtnType(2);
    } else if (post.selectedVoteOption === option2) {
      setOption1BtnType(2);
      setOption2BtnType(3);
    }
  }, [post.selectedVoteOption]);

  return (
    <div className={styles.container}>
      <Button
        onClick={() => clickOption(option1)}
        bgColor={"body_100"}
        border={Option1BtnStyle.border}
        className={`${styles.btn} ${option1FontColor} relative`}
        rounded={"rounded"}
      >
        <div className={styles.btn_contents}>
          <div className={styles.btn_left}>
            {(selectOption === option1 || post.selectedVoteOption === option1) &&
              (option1BtnType === 1 || option1BtnType === 3) && (
                <Image className={styles.ico_check} src={"/check-md.svg"} alt="체크 아이콘" width={24} height={24} />
              )}
            {option1BtnType === 2 && post.selectedVoteOption === option1 && (
              <Image
                className={styles.ico_check}
                src={"/check-white-md.svg"}
                alt="체크 아이콘"
                width={24}
                height={24}
              />
            )}
            <span>{option1}</span>
          </div>
          {post.selectedVoteOption && (
            <div className="z-[2]">
              {option1Percent}%({option1Count}명)
            </div>
          )}
        </div>
        {post.selectedVoteOption && (
          <div
            className={`${styles.progress} ${option1BtnType === 2 ? "bg-body-200" : "bg-[#E1FFEF]"}`}
            style={{
              width: option1Percent + "%",
            }}
          />
        )}
      </Button>
      <Button
        onClick={() => clickOption(option2)}
        bgColor={"body_100"}
        border={Option2BtnStyle.border}
        className={`${styles.btn} ${option2FontColor} relative`}
        rounded={"rounded"}
      >
        <div className={styles.btn_contents}>
          <div className={styles.btn_left}>
            {(selectOption === option2 || post.selectedVoteOption === option2) &&
              (option2BtnType === 1 || option2BtnType === 3) && (
                <Image className={styles.ico_check} src={"/check-md.svg"} alt="체크 아이콘" width={24} height={24} />
              )}
            {option2BtnType === 2 && post.selectedVoteOption === option2 && (
              <Image
                className={styles.ico_check}
                src={"/check-white-md.svg"}
                alt="체크 아이콘"
                width={24}
                height={24}
              />
            )}
            <span>{option2}</span>
          </div>
          {post.selectedVoteOption && (
            <div className="z-[2]">
              {option2Percent}%({option2Count}명)
            </div>
          )}
        </div>
        {post.selectedVoteOption && (
          <div
            className={`${styles.progress} ${option2BtnType === 2 ? "bg-body-200" : "bg-[#E1FFEF]"}`}
            style={{
              width: option2Percent + "%",
            }}
          />
        )}
      </Button>
      {!post.selectedVoteOption && (
        <Button
          onClick={onClickVotedBtn}
          className={styles.vote_btn}
          border={"gray"}
          bgColor={!disableVoteBtn ? "body_200" : "primary"}
        >
          투표하기
        </Button>
      )}
    </div>
  );
}
