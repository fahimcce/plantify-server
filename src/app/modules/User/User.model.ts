import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";

import { IUserModel, TUser } from "./User.interface";
import { USER_ROLE } from "./User.constant";
import config from "../../config";

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: "USER",
    },
    email: {
      type: String,
      required: true,
    },
    follower: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    upVotesItem: {
      type: [Schema.Types.ObjectId],
    },
    downVotesItem: {
      type: [Schema.Types.ObjectId],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String,
      default: null,
    },
    links: {
      type: [
        {
          socialName: { type: String },
          url: { type: String },
          _id: false,
        },
      ],
      default: [
        { socialName: "Facebook", url: "" },
        { socialName: "Twitter", url: "" },
        { socialName: "Instagram", url: "" },
        { socialName: "Linkedin", url: "" },
      ],
    },
    address: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcryptjs.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>("User", userSchema);
