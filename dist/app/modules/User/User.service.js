"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = require("mongoose");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const User_model_1 = require("./User.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY);
const confirmPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId, price } = payload;
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        payment_method: paymentId,
        confirm: true,
        return_url: `${config_1.default.CLIENT_SITE_URL}/success`,
    });
    return paymentIntent;
});
const getAllUserDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(User_model_1.User.find({ isDeleted: false }), query)
        .filter()
        .sort()
        .fields()
        .fields();
    const reslut = userQuery.modelQuery;
    return reslut;
});
const getUsebyEmailDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.findOne({ email: payload });
    return result;
});
const getUsebyIdDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.findById(id);
    return result;
});
const addFollowerAndFolloing = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const followingUser = yield User_model_1.User.findOne({ email: payload.email });
    const followedUser = yield User_model_1.User.findById(payload.userId);
    if (!followingUser || !followedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "One or more user not found");
    }
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // check the the follower already following or not
        const alreadyFollowing = yield User_model_1.User.findOne({
            _id: payload.userId,
            follower: followingUser._id,
        });
        // add to follower
        if (!alreadyFollowing) {
            yield User_model_1.User.findByIdAndUpdate(payload.userId, { follower: followingUser === null || followingUser === void 0 ? void 0 : followingUser._id }, { new: true, upsert: true, session });
            // update who is follwoing update his folloing
            yield User_model_1.User.findOneAndUpdate({ email: payload.email }, { $addToSet: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "Following successfull" };
        }
        else {
            // remove follower if already following or unfollow
            yield User_model_1.User.findByIdAndUpdate(followedUser._id, { $pull: { follower: followingUser._id } }, { new: true, upsert: true, session });
            // remove form own following
            yield User_model_1.User.findOneAndUpdate({ email: payload.email }, { $pull: { following: payload.userId } }, { new: true, upsert: true, session });
            yield session.commitTransaction();
            yield session.endSession();
            return { message: "remove Successfull" };
        }
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Faild to following");
    }
});
const deleteUserDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    return yield User_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true, upsert: true });
});
const makeAdminUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield User_model_1.User.findOne({ _id: id });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found or role not matched");
    }
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.role) === "user") {
        return yield User_model_1.User.findByIdAndUpdate(id, { role: "admin" }, { new: true, runValidators: true });
    }
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.role) === "admin") {
        return yield User_model_1.User.findByIdAndUpdate(id, { role: "user" }, { new: true, runValidators: true });
    }
});
exports.userService = {
    getAllUserDb,
    getUsebyEmailDb,
    getUsebyIdDb,
    addFollowerAndFolloing,
    confirmPayment,
    deleteUserDb,
    makeAdminUser,
};
