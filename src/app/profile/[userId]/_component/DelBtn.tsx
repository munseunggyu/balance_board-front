"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hook/useModal";
import { constant } from "@/utils/constant";

import { getProfileData } from "../_lib/getProfileData";
import DeleteConfirmModal from "./DeleteConfirmModal";
import styles from "./profilePostCard.module.css";

export default function DelBtn({ postId, userId }: { postId: number; userId: number }) {
  const {
    openModal: openDelConfirmModal,
    handleOpenMoal: handleOpenDelConfirmMoal,
    handleCloseModal: handleCloseDelConfirmModal,
  } = useModal();

  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationFn: () => {
      return fetch(constant.apiUrl + `api/main/${postId}`, {
        method: "Delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });
    },
    async onSuccess() {
      const data = await getProfileData(userId);

      queryClient.setQueryData(["profile", userId], data);
    },
  });

  const handleDel = () => {
    deletePost.mutate();
  };

  return (
    <>
      <button onClick={handleOpenDelConfirmMoal} className={styles.del_btn}>
        삭제
      </button>
      {openDelConfirmModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseDelConfirmModal}>
            <DeleteConfirmModal handleDel={handleDel} handleCloseModal={handleCloseDelConfirmModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
}
