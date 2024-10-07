import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import config from "../config";
import httpStatus from "http-status";
import { TUserRole } from "../modules/User/User.interface";
import { User } from "../modules/User/User.model";

interface customRequest extends Request {
  user: JwtPayload;
}
const authGuared = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: customRequest, res: Response, next: NextFunction) => {
      const bearrerToken = req.headers.authorization;
      if (!bearrerToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const token = bearrerToken?.split(" ")[1];
      const decoded = jwt.verify(
        token,
        config.Access_Token_Secret as string
      ) as JwtPayload;

      const { email, role, iat, exp } = decoded;
      // chheck if the user is exist
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // check if the user is deleted
      const isDeleteduser = existingUser?.isDeleted === true;
      if (isDeleteduser) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // procced with verification
      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not eligible for this oparation"
        );
      }
      req.user = decoded as JwtPayload;
      next();
    }
  );
};

export default authGuared;
