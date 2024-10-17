"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErroHandler_1 = __importDefault(require("./app/middlewares/globalErroHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
// Application route
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Plantify Welcoming you",
    });
});
// Global error handler
app.use(globalErroHandler_1.default);
// 404 handler (Not Found) - place this at the end
app.use(notFound_1.default);
exports.default = app;
