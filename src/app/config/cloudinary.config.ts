import { v2 as cloudinary } from "cloudinary";
import config from ".";

cloudinary.config({
  cloud_name: config.cloude_Name,
  api_key: config.cloud_Api_key,
  api_secret: config.cloud_Secret,
});

export const couldinaryUpload = cloudinary;
