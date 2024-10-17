import { z } from "zod";
import mongoose from "mongoose";
import { paymentzodValidation } from "./Payment.validation";

export type TPayment = {
  userId: mongoose.Types.ObjectId;
  name: string;
  transactionId: string;
  paymentTime: number;
  email: string;
  isDeleted?: boolean;
};

export type TBookingInfer = z.infer<typeof paymentzodValidation>;
