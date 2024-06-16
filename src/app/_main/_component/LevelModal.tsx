import Image from "next/image";

import Default from "../../../../public/default.svg";
import styles from "./levelmodal.module.css";

interface LevelData {
  header: string;
  lvHeader: string;
  lvContent: string;
  btnContent: string;
}

const levelsData: LevelData[] = [
  {
    header: "토론스킬 레벨업!",
    lvHeader: "입문 단계 Lv. 1",
    lvContent: "슬슬 토론이 재밌어지고 계시군요..!",
    btnContent: "점수 쌓으러 가기",
  },
  {
    header: "등급 레벨업!",
    lvHeader: "중급 단계 도달!",
    lvContent: "초보 단계를 벗어나셨군요!\n이제 글을 쓰러 가볼까요?",
    btnContent: "글 쓰러 가기",
  },
  {
    header: "토론스킬 레벨업!",
    lvHeader: "중급 단계 Lv. 4",
    lvContent: "남다른 토론실력을 가지고 계시군요!",
    btnContent: "점수 쌓으러 가기",
  },
  {
    header: "등급 레벨업!",
    lvHeader: "고급 단계 도달!",
    lvContent: "대단해요!\n요즘 이슈에 대해 글을 써볼까요?",
    btnContent: "글 쓰러 가기",
  },
  {
    header: "토론스킬 레벨업!",
    lvHeader: "고급 단계 Lv. 6",
    lvContent: "남들과는 다르게, 누구보다 멋지게\n토론을 즐기고 있어요!",
    btnContent: "점수 쌓으러 가기",
  },
  {
    header: "등급 레벨업!",
    lvHeader: "전문가 단계 도달!",
    lvContent: "이제는 후배를 양성해야 할 때!\n후배들을 위한 글을 써볼까요?",
    btnContent: "글 쓰러 가기",
  },
  {
    header: "토론스킬 레벨업!",
    lvHeader: "전문가 단계 Lv. 8",
    lvContent: "조금만 더 힘내서 마스터 단계로 고공행진!",
    btnContent: "점수 쌓으러 가기",
  },
  {
    header: "등급 레벨업!",
    lvHeader: "마스터 단계 도달!",
    lvContent: "사회 이슈에 대한\n마스터님의 생각이 궁금해요!",
    btnContent: "글 쓰러 가기",
  },
  {
    header: "토론스킬 레벨업!",
    lvHeader: "마스터 레벨 Lv. 10",
    lvContent: "마스터를 마스터하다...!",
    btnContent: "점수 쌓으러 가기",
  },
];

export default function LevelModal({ level }: { level: number }) {
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>{levelsData[level - 1].header}</div>
      <Image src={Default} width={80} height={80} alt="레벨업 이미지" />
      <div className={styles.LevelHeader}>{levelsData[level - 1].lvHeader}</div>
      <div className={styles.levelContent}>{levelsData[level - 1].lvContent}</div>
      <button className={styles.button}>{levelsData[level - 1].btnContent}</button>
      <p className={styles.close}>닫기</p>
    </div>
  );
}
