"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const consultations_1 = __importDefault(require("./routes/consultations"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Routes
app.use('/auth', auth_1.default);
app.use('/consultations', consultations_1.default);
// Connect to the database and start the server
database_1.default.sync()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
