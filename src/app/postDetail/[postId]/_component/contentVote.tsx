import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import LoginModal from "@/app/_component/LoginModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hook/useModal";
import { useAuthStore } from "@/stores/user";
import { constant } from "@/utils/constant";

import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";

interface IContentVoteProps {
  postData: IPostData;
  postId: number;
}

export default function ContentVote({ postData, postId }: IContentVoteProps) {
  const queryClient = useQueryClient();
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();
  const userInfo = useAuthStore((state) => state.userInfo);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setUserSelectedOption(option);
  };

  const doVote = useMutation({
    mutationFn: async () => {
      const headers: { [key: string]: string } = {};

      if (userInfo.accessToken) {
        headers.Authorization = `Bearer ${userInfo.accessToken}`;
      }
      const res = await fetch(constant.apiUrl + "api/main/new/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          postId,
          voteId: postId,
          userId: userInfo.userId,
          selectedOption: userSelectedOption,
        }),
      });
      return await res.json();
    },
    async onSuccess() {
      const headers: { [key: string]: string } = {};
      if (userInfo.accessToken) {
        headers.Authorization = `Bearer ${userInfo.accessToken}`;
      }

      const updatedRes = await fetch(constant.apiUrl + `api/main/posts/${postId}`, {
        headers: headers,
      });
      const data = await updatedRes.json();
      queryClient.setQueryData(["post", "detail", postId, userInfo.isLogin], data);
    },
  });

  const handleVote = () => {
    doVote.mutate();
  };

  const UpVoted = postData.option1Count > postData.option2Count;
  const DownVoted = postData.option2Count > postData.option1Count;
  const SumVoted = postData.option2Count + postData.option1Count;
  const UpPercent =
    postData.option1Count === 0
      ? "0"
      : ((postData.option1Count / SumVoted) * 100) % 1 === 0
        ? (postData.option1Count / SumVoted) * 100
        : ((postData.option1Count / SumVoted) * 100).toFixed(1);
  const DownPercent =
    postData.option2Count === 0
      ? "0"
      : ((postData.option2Count / SumVoted) * 100) % 1 === 0
        ? (postData.option2Count / SumVoted) * 100
        : ((postData.option2Count / SumVoted) * 100).toFixed(1);

  return (
    <div className={`${styles.voteContainer} ${postData.selectedOption ? styles.selectedOptionContainer : ""}`}>
      <button
        className={`${styles.upButton} ${postData.selectedOption ? styles.selectedOption : ""} ${
          postData.selectedOption && UpVoted && styles.upVoted
        } ${!postData.selectedOption && userSelectedOption === postData.option1 ? styles.userSelected : ""}`}
        onClick={userInfo.isLogin !== 1 ? handleOpenMoal : () => handleOptionClick(postData.option1)}
        disabled={!!postData.selectedOption}
        style={{
          background: postData.selectedOption
            ? `linear-gradient(to right, #10FE84 ${UpPercent}%, transparent ${UpPercent}%)`
            : "transparent",
          color: postData.selectedOption ? "#01C15E" : "#9d9d9d",
        }}
      >
        <div className={styles.voteButtonContainer}>
          {postData.selectedOption === postData.option1 ? (
            UpVoted ? (
              <div className={styles.voteButtonImageContainer}>
                <Image src="/white-check-md.png" alt="하얀색 체크버튼 이미지" width={24} height={24} />
                {postData.option1}
              </div>
            ) : (
              <div className={styles.voteButtonImageContainer}>
                <Image src="/check-md.png" alt="초록색 체크버튼 이미지" width={24} height={24} />
                {postData.option1}
              </div>
            )
          ) : userSelectedOption === postData.option1 ? (
            <div className={styles.voteButtonImageContainer}>
              <Image src="/check-md.png" alt="초록색 체크버튼 이미지" width={24} height={24} />
              {postData.option1}
            </div>
          ) : (
            <div className={styles.buttonContentContainer}>{postData.option1}</div>
          )}
          {postData.selectedOption ? `${UpPercent}%` : null}
        </div>
      </button>
      <button
        className={`${styles.downButton} ${postData.selectedOption ? styles.selectedOption : ""} ${
          postData.selectedOption && DownVoted && styles.downVoted
        } ${!postData.selectedOption && userSelectedOption === postData.option2 ? styles.userSelected : ""}`}
        onClick={userInfo.isLogin !== 1 ? handleOpenMoal : () => handleOptionClick(postData.option2)}
        disabled={!!postData.selectedOption}
        style={{
          background:
            postData.selectedOption && userSelectedOption === postData.option2
              ? `linear-gradient(to right, #EBEBEB ${DownPercent}%, transparent ${DownPercent}%)`
              : `linear-gradient(to right, #10FE84 ${DownPercent}%, transparent ${DownPercent}%)`,
          color: postData.selectedOption && userSelectedOption === postData.option2 ? "#9D9D9D" : "#019348",
          borderColor: postData.selectedOption && userSelectedOption === postData.option2 ? "#EBEBEB" : "#D6D6D6",
        }}
      >
        <div className={styles.voteButtonContainer}>
          {postData.selectedOption === postData.option2 ? (
            <div className={styles.voteButtonImageContainer}>
              <Image src="/check-md.png" alt="초록색 체크버튼 이미지" width={24} height={24} />
              {postData.option2}
            </div>
          ) : userSelectedOption === postData.option2 ? (
            <div className={styles.voteButtonImageContainer}>
              <Image src="/check-md.png" alt="초록색 체크버튼 이미지" width={24} height={24} />
              {postData.option2}
            </div>
          ) : (
            <div className={styles.buttonContentContainer}>{postData.option2}</div>
          )}
          {postData.selectedOption ? `${DownPercent}%` : null}
        </div>
      </button>
      {postData.selectedOption === null && (
        <button
          className={`${styles.voteSubmitButton} ${userSelectedOption ? styles.selectedOption : ""}`}
          onClick={handleVote}
          disabled={!userSelectedOption}
        >
          투표하기
        </button>
      )}

      <div className={styles.sumVoterContainer}>
        <div className={styles.sumVoterImageContainer}>
          <Image src="/participate-sm.svg" alt="참여자 이미지" width={18} height={18} />
        </div>
        <div className={styles.sumVoter}>
          <span>참여 {SumVoted}</span>
        </div>
      </div>
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
