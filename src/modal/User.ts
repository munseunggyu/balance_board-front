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
  imageType: number;
  jwtToken?: IJwtToken;
}

export interface ILogin extends IUser {
  status?: number;
  message?: string;
}
