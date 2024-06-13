import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hook/useModal";
import { useAuthStore } from "@/stores/user";
import { constant } from "@/utils/constant";

import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";
import DetailModal from "./DetailModal";
import { useVoteStore } from "./store/voteStore";

interface IContentVoteProps {
  postData: IPostData;
  postId: number;
}

export default function ContentVote({ postData, postId }: IContentVoteProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, handleOpenMoal, handleCloseModal } = useModal();
  const userInfo = useAuthStore((state) => state.userInfo);
  const { guestVoteCount, incrementGuestVoteCount } = useVoteStore();
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const blurContainerRef = useRef<HTMLDivElement>(null);

  const hasVotedOption1 = useVoteStore((state) => state.votes[postId]?.option1);
  const hasVotedOption2 = useVoteStore((state) => state.votes[postId]?.option2);

  const handleOptionClick = (option: string) => {
    setUserSelectedOption(option);
  };

  useEffect(() => {
    if (blurContainerRef.current) {
      blurContainerRef.current.style.display = guestVoteCount >= 3 ? "block" : "none";
    }
  }, [guestVoteCount]);

  useEffect(() => {
    if (guestVoteCount >= 3) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
  }, [guestVoteCount]);

  const doVote = useMutation({
    mutationFn: async () => {
      const headers: { [key: string]: string } = {};

      if (userInfo.accessToken) {
        headers.Authorization = `Bearer ${userInfo.accessToken}`;
      }

      const requestBody = userInfo.accessToken
        ? {
            postId,
            voteId: postId,
            userId: userInfo.userId,
            selectedOption: userSelectedOption,
          }
        : {
            postId,
            voteId: postId,
            selectedOption: userSelectedOption,
          };

      const res = await fetch(constant.apiUrl + "api/main/new/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(requestBody),
      });

      return await res.json();
    },
    onSuccess: async () => {
      const headers: { [key: string]: string } = {};
      if (userInfo.accessToken) {
        headers.Authorization = `Bearer ${userInfo.accessToken}`;
      }

      const updatedRes = await fetch(constant.apiUrl + `api/main/posts/${postId}`, {
        headers: headers,
      });
      const data = await updatedRes.json();
      queryClient.setQueryData(["post", "detail", postId], data);
    },
  });

  const handleVote = () => {
    if ((!userInfo.accessToken && userSelectedOption !== null) || guestVoteCount < 3) {
      if (!userInfo.accessToken) {
        incrementGuestVoteCount();
        useVoteStore.getState().setVote(postId, userSelectedOption || "", true);
      }
      doVote.mutate();
      if (!userInfo.accessToken) {
        handleOpenMoal();
      }
    }
  };

  // const UpVoted = postData.option1Count > postData.option2Count;
  // const DownVoted = postData.option2Count > postData.option1Count;
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
    <div className={`${styles.voteContainer} ${postData.selectedVoteOption ? styles.selectedOptionContainer : ""} `}>
      <button
        className={`${styles.upButton} ${postData.selectedVoteOption ? styles.selectedOption : ""}`}
        onClick={userInfo.isLogin !== 1 ? handleOpenMoal : () => handleOptionClick(postData.option2)}
        disabled={!!postData.selectedVoteOption}
      >
        <div className={styles.voteButtonContainer}>
          {postData.selectedVoteOption === postData.option1 ? (
            <div className={styles.voteButtonImageContainer}>
              <Image src="/white-check-md.png" alt="하얀색 체크버튼 이미지" width={24} height={24} />
              {postData.option1}
            </div>
          ) : userSelectedOption === postData.option1 ? (
            <div className={styles.voteButtonImageContainer}>
              <Image src="/white-check-md.png" alt="하얀색 체크버튼 이미지" width={24} height={24} />
              {postData.option1}
            </div>
          ) : (
            <div
              className={styles.buttonContentContainer}
              style={{ color: userSelectedOption === postData.option1 ? "#01C15E" : "#9D9D9D" }}
            >
              {postData.option1}
            </div>
          )}
          {postData.selectedVoteOption ? `${UpPercent}%(${postData.option1Count}명)` : null}
        </div>
      </button>
      <button
        className={`${styles.downButton} ${postData.selectedVoteOption ? styles.selectedOption : ""}`}
        onClick={userInfo.isLogin !== 1 ? handleOpenMoal : () => handleOptionClick(postData.option2)}
        disabled={hasVotedOption1 || hasVotedOption2 || !!postData.selectedVoteOption}
        style={{
          background: postData.selectedVoteOption
            ? `linear-gradient(to right, #01D066 ${DownPercent}%, transparent ${DownPercent}%)`
            : "transparent",
        }}
      >
        <div className={styles.voteButtonContainer}>
          {postData.selectedVoteOption === postData.option2 ? (
            <div className={styles.voteButtonImageContainer}>
              <Image src="/white-check-md.png" alt="하얀색 체크버튼 이미지" width={24} height={24} />
              {postData.option2}
            </div>
          ) : userSelectedOption === postData.option2 ? (
            <div className={styles.voteButtonImageContainer}>
              <Image src="/white-check-md.png" alt="하얀색 체크버튼 이미지" width={24} height={24} />
              {postData.option2}
            </div>
          ) : (
            <div
              className={styles.buttonContentContainer}
              style={{ color: userSelectedOption === postData.option2 ? "#01C15E" : "#9D9D9D" }}
            >
              {postData.option2}
            </div>
          )}
          {postData.selectedVoteOption ? `${DownPercent}%(${postData.option2Count}명)` : null}
        </div>
      </button>
      {!postData.selectedVoteOption && !hasVotedOption1 && !hasVotedOption2 && (
        <button
          className={`${styles.voteSubmitButton} ${userSelectedOption ? styles.selectedOption : ""} ${isBlurred ? styles.blurred : ""}`}
          onClick={handleVote}
          disabled={!userSelectedOption}
        >
          투표하기
        </button>
      )}
      <div className={styles.sumVoterContainer}>
        <div className={styles.sumVoterImageContainer}>
          <Image
            src="/participate-sm.svg"
            alt="참여자 이미지"
            width={18}
            height={18}
            className={`${isBlurred ? styles.blurred : ""}`}
          />
        </div>
        <div className={`${styles.sumVoter} ${isBlurred ? styles.blurred : ""}`}>
          <span>참여 {SumVoted}</span>
        </div>
      </div>
      <div className={`${styles.BlurContainer} ${isBlurred ? styles.visible : ""}`} ref={blurContainerRef}>
        <p className={styles.BlurHeader}>투표 결과가 궁금하다면?</p>
        <p className={styles.BlurContent}>지금 바로 회원가입해보세요!</p>
        <button
          className={styles.BlurBtn}
          onClick={() => {
            router.push("../login");
          }}
        >
          3초만에 회원가입
        </button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <DetailModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
