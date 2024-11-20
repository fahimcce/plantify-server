/* eslint-disable @typescript-eslint/no-unused-vars */

import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";

export const parseBody = catchAsync(async (req, res, next) => {
  if (!req.body.data) {
    throw new AppError(400, "Please provide data in the body");
  }
  req.body = JSON.parse(req?.body?.data);
});
