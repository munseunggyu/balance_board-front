import { constant } from "../constant";

export const experienceRange = (experiencePoints: number) => {
  let grade = 1;
  let level = 1;
  let name = "입문자";
  let left = 0;
  let nextValue = 30;
  if (experiencePoints <= constant.levelMax1) {
    grade = 1;
    level = 1;
    name = "입문자";
    left = constant.levelMax1 + 1 - experiencePoints;
    nextValue = constant.levelMax1 + 1;
  }
  if (constant.levelMax1 + 1 <= experiencePoints && experiencePoints >= constant.levelMax2) {
    grade = 1;
    level = 2;
    name = "입문자";
    left = constant.levelMax2 + 1 - experiencePoints;
    nextValue = constant.levelMax2 + 1;
  }
  if (constant.levelMax2 + 1 <= experiencePoints && experiencePoints >= constant.levelMax3) {
    grade = 2;
    level = 3;
    name = "중급자";
    left = constant.levelMax3 + 1 - experiencePoints;
    nextValue = constant.levelMax3 + 1;
  }
  if (constant.levelMax3 + 1 <= experiencePoints && experiencePoints >= constant.levelMax4) {
    grade = 2;
    level = 4;
    name = "중급자";
    left = constant.levelMax4 + 1 - experiencePoints;
    nextValue = constant.levelMax4 + 1;
  }
  if (constant.levelMax4 + 1 <= experiencePoints && experiencePoints >= constant.levelMax5) {
    grade = 3;
    level = 5;
    name = "고급자";
    left = constant.levelMax5 + 1 - experiencePoints;
    nextValue = constant.levelMax5 + 1;
  }
  if (constant.levelMax5 + 1 <= experiencePoints && experiencePoints >= constant.levelMax6) {
    grade = 3;
    level = 6;
    name = "고급자";
    left = constant.levelMax6 + 1 - experiencePoints;
    nextValue = constant.levelMax6 + 1;
  }
  if (constant.levelMax6 + 1 <= experiencePoints && experiencePoints >= constant.levelMax7) {
    grade = 4;
    level = 7;
    name = "전문가";
    left = constant.levelMax7 + 1 - experiencePoints;
    nextValue = constant.levelMax7 + 1;
  }
  if (constant.levelMax7 + 1 <= experiencePoints && experiencePoints >= constant.levelMax8) {
    grade = 4;
    level = 8;
    name = "전문가";
    left = constant.levelMax8 + 1 - experiencePoints;
    nextValue = constant.levelMax8 + 1;
  }

  if (constant.levelMax8 + 1 <= experiencePoints && experiencePoints >= constant.levelMax9) {
    grade = 5;
    level = 9;
    name = "마스터";
    left = constant.levelMax9 + 1 - experiencePoints;
    nextValue = constant.levelMax9 + 1;
  }
  if (constant.levelMax9 + 1 <= experiencePoints && experiencePoints >= constant.levelMax10) {
    grade = 5;
    level = 10;
    name = "마스터";
    left = constant.levelMax10 + 1 - experiencePoints;
    nextValue = constant.levelMax10 + 1;
  }

  return {
    grade,
    level,
    name,
    left,
    nextValue,
  };
};
