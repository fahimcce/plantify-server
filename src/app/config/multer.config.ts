// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { couldinaryUpload } from "./cloudinary.config";
// import multer from "multer";
// // remove extension
// const removeExtension = (fileName: string) => {
//   return fileName.split(".").slice(0, -1).join(".");
// };

// const storage = new CloudinaryStorage({
//   cloudinary: couldinaryUpload,
//   params: {
//     public_id: (req, file) => {
//       return Math.random().toString(36).substring(2) + "-" + Date.now() + file.fieldname + "-" + removeExtension(file.originalname);
//     },
//   },
// });
// export const multerUpload = multer({ storage: storage });
