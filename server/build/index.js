"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    exposedHeaders: ["Access-Control-Allow-Origin"],
};
app.use((0, cors_1.default)(corsOptions));
//Controllers Routes
app.post("/", (req, res) => {
    const { prev, curr, operation } = req.body;
    const result = {
        result: 0,
        status: "success",
        operation,
        message: "",
    };
    switch (decodeURIComponent(operation)) {
        case "/":
            result.result = prev + curr;
            break;
        case "*":
            result.result = prev + curr;
            break;
        case "-":
            result.result = prev + curr;
            break;
        case "+":
            result.result = prev + curr;
            break;
        default:
            result.status = "error";
            result.message = "invaile ";
            break;
    }
    res.json(result);
});
app.listen(PORT, () => {
    console.log(`Server is running On http://localhost:${PORT}`);
});
