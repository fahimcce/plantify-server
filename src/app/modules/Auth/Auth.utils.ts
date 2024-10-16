import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayLoad: JwtPayload,
  secret: string,
  expire: string
) => {
  return jwt.sign(jwtPayLoad, secret, { expiresIn: expire });
};
