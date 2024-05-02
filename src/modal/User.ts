interface IJwtToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  email: string;
  accessToken: string;
  nickname: string;
  userId: number;
  isLogin: number;
  jwtToken?: IJwtToken;
  level: number;
  experiencePoints: number;
  imageType: number;
}

export interface ILogin extends IUser {
  status?: number;
  message?: string;
}
