// /modules/User/User.interface.ts

import { Model } from "mongoose";

export type TUserRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
  isDeleted: boolean;
  followers: string[];
  following: string[];
  isVerified: boolean;
  profilePicture?: string;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}
