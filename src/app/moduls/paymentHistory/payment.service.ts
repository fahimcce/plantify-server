import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TPayment } from "./payment.interface";
import { Payments } from "./payment.model";
import { User } from "../User/user.model";

const paymentHistoryDb = async (payload: TPayment) => {
  const userExist = User.isUserExistsByEmail(payload.email);
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const paymentHistory = await Payments.create(payload);
  await User.findOneAndUpdate({ email: payload.email }, { verified: true }, { new: true, runValidators: true, upsert: true });
  return paymentHistory;
};

const getAllPaymentHistory = async () => {
  return await Payments.find({ isDeleted: false }).populate("userId");
};

export const paymentService = {
  paymentHistoryDb,
  getAllPaymentHistory,
};
