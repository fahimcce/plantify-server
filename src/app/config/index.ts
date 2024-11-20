import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.port,
  NODE_ENV: process.env.NODE_ENV,
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshTokenExpireIn: process.env.JWT_REFRESH_EXPIRES_IN,
  cloude_Name: process.env.cloud_name,
  cloud_Api_key: process.env.cloud_Api_key,
  cloud_Secret: process.env.cloudApi_Secret,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  client_site_url: process.env.CLIENT_SITE_URL,
};
