import { create } from "zustand";

import { ILogin, IUser } from "@/modal/User";

interface UserState {
  userInfo: IUser;
  storeLogin(userData: ILogin): void;
  storeLogout(): void;
}

// 초기 데이터
const initialData: IUser = {
  email: "",
  accessToken: "",
  nickname: "",
  userId: 0,
  imageType: 1,
  level: 0,
  experiencePoints: 0,
  isLogin: 0, // 0. 로그인 api 실행 전, 1. 로그인 완료, 2. 로그인 실패
  withoutLogin: 0,
};

export const useAuthStore = create<UserState>((set) => ({
  userInfo: initialData,
  storeLogin(user) {
    set((state) => {
      return {
        userInfo: { ...state.userInfo, ...user },
      };
    });
  },
  storeLogout() {
    set({
      userInfo: { ...initialData, isLogin: 2 },
    });
  },
}));
