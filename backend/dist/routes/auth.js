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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post('/login', (0, express_validator_1.body)('username').isString(), (0, express_validator_1.body)('password').isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const user = yield User_1.User.findOne({ where: { username } });
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, `${process.env.APP_SECRET}`, { expiresIn: '1d' });
    res.json({ token });
}));
exports.default = router;
