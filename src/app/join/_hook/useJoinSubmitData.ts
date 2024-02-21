import { useState } from "react";

export default function useJoinSubmitData() {
  const [processType, setProcessType] = useState(0);
  const [visibleBtn, setVisibleBtn] = useState(false);

  const [submitData, setSubmitData] = useState({
    email: "",
    password: "",
    nickname: "",
    gender: "",
    birthYear: "",
    duplicateEmail: 1, // 1. 미확인 2. 중복 3. 통과
    duplicateName: 1,
  });

  return {
    submitData,
    setSubmitData,
    processType,
    visibleBtn,
    setVisibleBtn,
  };
}
