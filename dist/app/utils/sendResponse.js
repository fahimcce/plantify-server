"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// send response function
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
        token: data.token,
    });
};
exports.default = sendResponse;
