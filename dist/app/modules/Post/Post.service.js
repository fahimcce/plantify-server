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
exports.postService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Post_model_1 = require("./Post.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const User_model_1 = require("../User/User.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const makePostDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Post_model_1.Post.create(payload);
    return result;
});
const getAllPost = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const postQuerys = new QueryBuilder_1.default(Post_model_1.Post.find({ isDeleted: false }).populate("userId").populate("category"), query)
        .search(["title", "post"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .filterByPremium();
    const result = yield postQuerys.modelQuery;
    return result;
});
const getVoteSummeryDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Post_model_1.Post.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
        {
            $project: {
                _id: 0,
                upVotes: {
                    $size: {
                        $filter: {
                            input: "$activity",
                            as: "activity",
                            cond: { $eq: ["$$activity.votes", true] },
                        },
                    },
                },
                downVotes: {
                    $size: {
                        $filter: {
                            input: "$activity",
                            as: "activity",
                            cond: { $eq: ["$$activity.votes", false] },
                        },
                    },
                },
            },
        },
    ]);
    return result[0];
});
// get post by id
const getPostByidDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_model_1.Post.findById(id)
        .populate("userId")
        .populate("category")
        .populate("activity.userId")
        .sort("createdAt");
});
const getPostByUserIdDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Post_model_1.Post.find({ userId: id, isDeleted: false })
        .populate("userId")
        .populate("category")
        .populate("activity.userId");
    return result;
});
const handleVote = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const postExist = yield Post_model_1.Post.findById(postId);
    const userExist = yield User_model_1.User.findById(payload.userId);
    if (!postExist || !userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post or User not found");
    }
    const userAlreadyVoted = yield Post_model_1.Post.find({
        _id: postId,
        "activity.userId": payload.userId,
    });
    if (!userAlreadyVoted.length) {
        yield Post_model_1.Post.findByIdAndUpdate(postId, {
            $push: { activity: { userId: payload.userId, votes: payload.votes } },
        }, { new: true });
        return { message: "voted successfully" };
    }
    yield Post_model_1.Post.findOneAndUpdate({ _id: postId, "activity.userId": payload.userId }, { $set: { "activity.$.votes": payload.votes } }, { new: true });
    return { message: "voted successfully" };
});
const addComment = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const postExist = yield Post_model_1.Post.findById(postId);
    const userExist = yield User_model_1.User.findById(payload.userId);
    if (!postExist || !userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post or User not found");
    }
    const userAlreadyCommented = yield Post_model_1.Post.findOne({
        _id: postId,
        "activity.userId": payload.userId,
    });
    if (!userAlreadyCommented) {
        yield Post_model_1.Post.findByIdAndUpdate(postId, {
            $push: {
                activity: { userId: payload.userId, comment: [payload.comment] },
            },
        }, { new: true });
        return { message: "Comment added successfully" };
    }
    yield Post_model_1.Post.findOneAndUpdate({ _id: postId, "activity.userId": payload.userId }, {
        $push: { "activity.$.comment": [payload.comment] },
    }, { new: true });
    return { message: "Comment updated successfully" };
});
const updatePostDb = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Post_model_1.Post.findByIdAndUpdate(postId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Post_model_1.Post.findByIdAndUpdate(postId, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
const getTotalPostCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_model_1.Post.countDocuments({ isDeleted: { $ne: true } });
});
exports.postService = {
    makePostDb,
    getAllPost,
    getVoteSummeryDb,
    getPostByidDb,
    getPostByUserIdDb,
    handleVote,
    addComment,
    updatePostDb,
    deletePost,
    getTotalPostCount,
};
