"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            message: `You are not authorized to view this page`,
        });
    }
    jsonwebtoken_1.default.verify(token, `${process.env.APP_SECRET}`, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        req.user = user;
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
