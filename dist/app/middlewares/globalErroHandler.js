"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const globalErrorhandler = (err, req, res, next) => {
    // Return type explicitly set to void
    let statusCode = err.statusCode || 500;
    let message = "Something went wrong";
    let errorMessages = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedZodError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedZodError.statusCode;
        message = simplifiedZodError.message;
        errorMessages = simplifiedZodError === null || simplifiedZodError === void 0 ? void 0 : simplifiedZodError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.erroSource;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    if (err instanceof AppError_1.default) {
        res.status(statusCode).json({
            success: false,
            statusCode: statusCode,
            message,
            data: [],
            // stack: config.NODE_ENV === "development" && err?.stack,
        });
        return; // Ensure the function exits here after sending a response.
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        err,
        stack: config_1.default.NODE_ENV === "development" && (err === null || err === void 0 ? void 0 : err.stack),
    });
    return; // Ensure the function exits here after sending a response.
};
exports.default = globalErrorhandler;
