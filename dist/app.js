"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import globalErrorhandler from "./app/middileWare/globalErrorHandler";
// import notFound from "./app/middileWare/notFound";
// import router from "./app/routes";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
// application route
// app.use("/api", router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Bookify Welcoming you.Enter this Arena,Find Your best Room",
    });
});
// global error
// app.use(globalErrorhandler);
// app.use(notFound);
exports.default = app;
