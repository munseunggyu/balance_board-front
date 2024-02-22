"use client";
import React, { createContext, useContext, useState } from "react";

// 초기 데이터 타입
interface InitialData {
  processType: number;
  visibleBtn: boolean;
  submitData: {
    email: string;
    password: string;
    nickname: string;
    gender: string;
    birthYear: string;
    duplicateEmail: number;
    duplicateName: number;
  };
}

// 초기 데이터
const initialData: InitialData = {
  processType: 0,
  visibleBtn: false,
  submitData: {
    email: "",
    password: "",
    nickname: "",
    gender: "",
    birthYear: "",
    duplicateEmail: 1, // 1. 미확인 2. 중복 3. 통과
    duplicateName: 1,
  },
};

// Context의 타입
interface DataContextType {
  data: InitialData;
  setProcessType: (type: number) => void;
  setVisibleBtn: (visible: boolean) => void;
  setDataField: (fieldName: string, value: string) => void;
}

// createContext를 사용하여 새로운 컨텍스트를 생성
export const DataContext = createContext<DataContextType | undefined>(undefined);

// 컨텍스트를 사용하는 커스텀 훅
export const useJoinDataContext = () => {
  const context = useContext(DataContext);
  console.log(context);
  if (!context) {
    throw new Error("useJoinDataContext must be used within a JoinContextProvider");
  }
  return context;
};

// DataContext의 Provider를 만드는 컴포넌트
export const JoinContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<InitialData>(initialData);

  // 값을 변경하는 함수들
  const setProcessType = (type: number) => {
    setData((prevData) => ({ ...prevData, processType: type }));
  };

  const setVisibleBtn = (visible: boolean) => {
    setData((prevData) => ({ ...prevData, visibleBtn: visible }));
  };

  const setDataField = (fieldName: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.submitData,
        [fieldName]: value,
      },
    }));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setProcessType,
        setVisibleBtn,
        setDataField,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
