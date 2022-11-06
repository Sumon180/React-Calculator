"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
//Controllers Routes
app.post("/", (0, cors_1.default)(), (req, res) => {
    res.send("Welcome to Express Server With TS & frontend");
});
app.listen(PORT, () => {
    console.log(`Server is running On http://127.0.0.1:${PORT}`);
});
