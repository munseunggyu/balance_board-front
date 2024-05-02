import { userGrade } from "./userGrade";

export const userImgUrl = (level: number) => {
  const grade = userGrade(level);
  return `/profile-${grade}.png`;
};
