"use client";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import Image from "next/image";
import React, { useState } from "react";

import { useModal } from "@/hook/useModal";
import { IPost } from "@/modal/Post";
import { useAuthStore } from "@/stores/user";

import thumbsDownBlack from "../../../public/thumb_down_black-sm.svg";
import thumbsDown from "../../../public/thumb_down-sm.svg";
import thumbsUpPrimary from "../../../public/thumb_up_primary-sm.svg";
import thumbsUp from "../../../public/thumb_up-sm.svg";
import { doLikes } from "../home/_lib/doLikes";
import LoginModal from "./LoginModal";
import ModalContainer from "./ModalContainer";
import ModalPortal from "./ModalPortal";
interface IProps {
  post: IPost;
}

export default function ThumbsBtns({ post }: IProps) {
  const postId = post.postId;
  const hateCount = post.hateCount;
  const likeCount = post.likeCount;
  const selectedLikeOption = post.selectedLikeOption;

  const { openModal, handleOpenMoal, handleCloseModal } = useModal();
  const userInfo = useAuthStore((state) => state.userInfo);
  const queryClient = useQueryClient();
  const [actionType, setActionType] = useState("like");

  const handleDoLikes = useMutation({
    mutationFn: (action: "like" | "hate" | "cancel") => {
      return doLikes({ postId, userId: userInfo.userId, token: userInfo.accessToken, action });
    },
    onSuccess(response) {
      const { likeCount, hateCount } = response;
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
                draftData.pages[pageIndex][idx].likeCount = likeCount;
                draftData.pages[pageIndex][idx].hateCount = hateCount;
                draftData.pages[pageIndex][idx].selectedLikeOption = actionType;
              });
              queryClient.setQueryData(queryKey, data);
            }
          }
        }
      });
    },
  });

  /**
   *
   * @param type 1. 좋아요, 2. 싫어요
   * action: like, dislike, cancel
   */
  const handleClick = (type: number) => {
    if (userInfo.isLogin !== 1) {
      handleOpenMoal();
      return;
    }
    let action: "like" | "hate" | "cancel" = "like";
    if (type === 1) {
      if (selectedLikeOption === "like") {
        action = "cancel";
        setActionType("null");
      } else {
        action = "like";
        setActionType("like");
      }
    } else {
      if (selectedLikeOption === "hate") {
        action = "cancel";
        setActionType("null");
      } else {
        action = "hate";
        setActionType("hate");
      }
    }
    handleDoLikes.mutate(action);
  };

  return (
    <div className="flex">
      <button onClick={() => handleClick(1)} className="flex px-[4px] py-[10px] gap-[2px]">
        <Image src={selectedLikeOption === "like" ? thumbsUpPrimary : thumbsUp} width={18} height={18} alt="좋아요" />
        <span className={`text-[12px] ${selectedLikeOption === "like" ? "text-main-primary-500" : "text-body-700"}`}>
          {likeCount}
        </span>
      </button>
      <button onClick={() => handleClick(2)} className="flex px-[4px] py-[10px] gap-[2px]">
        <Image src={selectedLikeOption === "hate" ? thumbsDownBlack : thumbsDown} width={18} height={18} alt="좋아요" />
        <span className={`text-[12px] ${selectedLikeOption === "hate" ? "title-100" : "text-body-700"}`}>
          {hateCount}
        </span>
      </button>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <LoginModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
