import Image from "next/image";

import { IPostData } from "../interfaces";
import styles from "../postDetail.module.css";

interface IContentVoteProps {
  postData: IPostData;
}

export default function ContentVote({ postData }: IContentVoteProps) {
  const UpVoted = postData.option1Count > postData.option2Count;
  const DownVoted = postData.option2Count > postData.option1Count;
  const SumVoted = postData.option2Count + postData.option1Count;
  const UpPercent =
    postData.option1Count === 0
      ? "0%"
      : ((postData.option1Count / SumVoted) * 100) % 1 === 0
        ? (postData.option1Count / SumVoted) * 100
        : ((postData.option1Count / SumVoted) * 100).toFixed(1);
  const DownPercent =
    postData.option2Count === 0
      ? "0%"
      : ((postData.option2Count / SumVoted) * 100) % 1 === 0
        ? (postData.option2Count / SumVoted) * 100
        : ((postData.option2Count / SumVoted) * 100).toFixed(1);
  return (
    <div className={styles.voteContainer}>
      <button className={`${styles.upButton} ${UpVoted ? styles.upVoted : ""}`}>
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
          ) : (
            <div className={styles.buttonContentContainer}>{postData.option1}</div>
          )}
          {`${UpPercent}(${postData.option1Count}명)`}
        </div>
      </button>
      <button className={`${styles.downButton} ${DownVoted ? styles.downVoted : ""}`}>
        <div className={styles.voteButtonContainer}>
          {postData.selectedOption === postData.option2 ? (
            DownVoted ? (
              <div className={styles.voteButtonImageContainer}>
                <Image src="/white-check-md.png" alt="하얀색 체크버튼 이미지" width={24} height={24} />
                {postData.option2}
              </div>
            ) : (
              <div className={styles.voteButtonImageContainer}>
                <Image src="/check-md.png" alt="초록색 체크버튼 이미지" width={24} height={24} />
                {postData.option2}
              </div>
            )
          ) : (
            <div className={styles.buttonContentContainer}>{postData.option2}</div>
          )}
          {`${DownPercent}(${postData.option2Count}명)`}
        </div>
      </button>
      <div className={styles.sumVoterContainer}>
        <div className={styles.sumVoterImageContainer}>
          <Image src="/participate-sm.png" alt="참여자 이미지" width={18} height={18} />
        </div>
        <div className={styles.sumVoter}>
          <span>참여 {SumVoted}</span>
        </div>
      </div>
    </div>
  );
}
