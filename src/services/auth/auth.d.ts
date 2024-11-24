import { ISignUpUser } from "../user/users";
export interface ILoginUser {
  email: string;
  password: string;
}
export interface ILoginRequest {
  message: string;
  accessToken: string;
}

export interface UserAuth extends ISignUpUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  sub: number;
  iat: number;
}
export type IsUserAuth =
  | { isAuth: boolean; user: UserAuth }
  | { isAuth: false };
