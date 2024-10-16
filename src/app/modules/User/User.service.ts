import { startSession } from "mongoose";

import Stripe from "stripe";
import config from "../../config";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "./User.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string);

const confirmPayment = async (payload: {
  paymentId: string;
  price: number;
}) => {
  const { paymentId, price } = payload;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "usd",
    payment_method: paymentId,
    confirm: true,
    return_url: `${config.CLIENT_SITE_URL}/success`,
  });
  return paymentIntent;
};

const getAllUserDb = async (query: any) => {
  const userQuery = new QueryBuilder(User.find({ isDeleted: false }), query)
    .filter()
    .sort()
    .fields()
    .fields();
  const reslut = userQuery.modelQuery;
  return reslut;
};
const getUsebyEmailDb = async (payload: string) => {
  const result = await User.findOne({ email: payload });
  return result;
};
const getUsebyIdDb = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const addFollowerAndFolloing = async (payload: {
  email: string;
  userId: string;
}) => {
  const followingUser = await User.findOne({ email: payload.email });
  const followedUser = await User.findById(payload.userId);
  if (!followingUser || !followedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "One or more user not found");
  }

  const session = await startSession();
  try {
    session.startTransaction();
    // check the the follower already following or not
    const alreadyFollowing = await User.findOne({
      _id: payload.userId,
      follower: followingUser._id,
    });

    // add to follower
    if (!alreadyFollowing) {
      await User.findByIdAndUpdate(
        payload.userId,
        { follower: followingUser?._id },
        { new: true, upsert: true, session }
      );
      // update who is follwoing update his folloing
      await User.findOneAndUpdate(
        { email: payload.email },
        { $addToSet: { following: payload.userId } },
        { new: true, upsert: true, session }
      );
      await session.commitTransaction();
      await session.endSession();
      return { message: "Following successfull" };
    } else {
      // remove follower if already following or unfollow
      await User.findByIdAndUpdate(
        followedUser._id,
        { $pull: { follower: followingUser._id } },
        { new: true, upsert: true, session }
      );
      // remove form own following
      await User.findOneAndUpdate(
        { email: payload.email },
        { $pull: { following: payload.userId } },
        { new: true, upsert: true, session }
      );
      await session.commitTransaction();
      await session.endSession();
      return { message: "remove Successfull" };
    }
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Faild to following");
  }
};
const deleteUserDb = async (id: string) => {
  console.log(id);
  return await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, upsert: true }
  );
};
const makeAdminUser = async (id: string) => {
  const userExist = await User.findOne({ _id: id });
  if (!userExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found or role not matched"
    );
  }
  if (userExist?.role === "user") {
    return await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true, runValidators: true }
    );
  }
  if (userExist?.role === "admin") {
    return await User.findByIdAndUpdate(
      id,
      { role: "user" },
      { new: true, runValidators: true }
    );
  }
};
export const userService = {
  getAllUserDb,
  getUsebyEmailDb,
  getUsebyIdDb,
  addFollowerAndFolloing,
  confirmPayment,
  deleteUserDb,
  makeAdminUser,
};
