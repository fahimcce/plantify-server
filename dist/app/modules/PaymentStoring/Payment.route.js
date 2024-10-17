"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const Payment_controller_1 = require("./Payment.controller");
const router = (0, express_1.Router)();
router.post("/confirm-payment", Payment_controller_1.paymenController.createPaymentHistory);
router.get("/get-payment-history", Payment_controller_1.paymenController.getPaymenthistory);
exports.paymentRoute = router;
