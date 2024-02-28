import styles from "../postDetail.module.css";

interface MoreCommentsButtonProps {
  onClick: () => void;
}

export default function MoreCommentsButton({ onClick }: MoreCommentsButtonProps) {
  return (
    <button className={styles.moreCommentButton} onClick={onClick}>
      + 댓글 더보기
    </button>
  );
}
