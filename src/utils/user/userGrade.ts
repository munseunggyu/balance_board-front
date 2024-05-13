/**
 *
 * @param level
 * @returns 0. 비회원 1. 입문 2. 중급 3. 고급 4. 전문가 5. 마스터
 */
export const userGrade = (level: number) => {
  if (level === 0) return 0;
  if (level === 1 || level === 2) return 1;
  if (level === 3 || level === 4) return 2;
  if (level === 5 || level === 6) return 3;
  if (level === 7 || level === 8) return 4;
  if (level === 9 || level === 10) return 5;
};
