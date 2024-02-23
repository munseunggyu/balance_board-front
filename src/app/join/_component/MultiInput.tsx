import { ChangeEvent, useRef, useState } from "react";

import styles from "./multiInput.module.css";

export default function InputForm() {
  const [inputValues, setInputValues] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // 입력 값이 있고, 다음 인풋이 존재한다면 포커스 이동
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div>
      <p className={styles.txt01}>더 정확한 투표 결과를 알려드릴게요.</p>
      <div className={styles.input_container}>
        {inputValues.map((value, index) => (
          <input
            className={styles.input_item}
            key={index}
            type="text"
            maxLength={1}
            value={value}
            ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
          />
        ))}
        <p className={styles.validation_txt}>더 정확한 투표 결과를 알려드릴게요.</p>
      </div>
    </div>
  );
}
