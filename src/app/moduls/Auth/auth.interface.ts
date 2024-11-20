import { USER_ROLE } from "../User/user.constant";

export type TregisterUser = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: keyof typeof USER_ROLE;
  profilePhoto?: string;
};
export type TLoginUser = {
  email: string;
  password: string;
};
