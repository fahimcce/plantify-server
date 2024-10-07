"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    Access_Token_Secret: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRE_IN: process.env.JWT_ACCESS_EXPIRE_IN,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CLIENT_SITE_URL: process.env.CLIENT_SITE_URL,
};
