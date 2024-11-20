// import { v2 as cloudinary } from "cloudinary";
// import config from "../config";
// import fs from "fs";
// import multer from "multer";
// // cloudinary configuration
// cloudinary.config({
//   cloud_name: config.cloude_Name,
//   api_key: config.cloud_Api_key,
//   api_secret: config.cloud_Secret,
// });

// export const sendImageToCloudinary = (imageName: string, path: string) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       {
//         public_id: imageName,
//       },
//       function (error, result) {
//         if (error) {
//           reject(error);
//         }
//         resolve(result);
//         // delete a file asynchronously
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("File is deleted");
//           }
//         });
//       }
//     );
//   });
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + "/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqSuffix);
//   },
// });

// export const upload = multer({ storage: storage });
