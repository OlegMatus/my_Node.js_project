"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./configs/config");
const api_error_1 = require("./errors/api.error");
const User_model_1 = require("./models/User.model");
const user_validator_1 = require("./validators/user.validator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/users", async (_req, res, next) => {
    try {
        const users = await User_model_1.User.find();
        return res.json(users);
    }
    catch (e) {
        next(e);
    }
});
app.post("/users", async (req, res, next) => {
    try {
        const { error, value } = user_validator_1.UserValidator.create.validate(req.body);
        if (error) {
            throw new api_error_1.ApiError(error.message, 400);
        }
        const createdUser = await User_model_1.User.create(value);
        res.status(201).json(createdUser);
    }
    catch (e) {
        next(e);
    }
});
app.get("/users/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.isObjectIdOrHexString(id)) {
            throw new api_error_1.ApiError("Not Valid ID", 400);
        }
        const user = await User_model_1.User.findById(id);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        res.json(user);
    }
    catch (e) {
        next(e);
    }
});
app.delete("/users/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.isObjectIdOrHexString(id)) {
            throw new api_error_1.ApiError("Not Valid ID", 400);
        }
        const user = await User_model_1.User.findById(id);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        await User_model_1.User.deleteOne({ _id: id });
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
});
app.put("/users/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.isObjectIdOrHexString(id)) {
            throw new api_error_1.ApiError("Not Valid ID", 400);
        }
        const { error, value } = user_validator_1.UserValidator.update.validate(req.body);
        if (!error) {
            throw new api_error_1.ApiError(error.message, 400);
        }
        const user = await User_model_1.User.findByIdAndUpdate(id, value, {
            returnDocument: "after",
        });
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        res.status(201).json(user);
    }
    catch (e) {
        next(e);
    }
});
app.use((error, _req, res, _next) => {
    const status = error.status || 500;
    res.status(status).json(error.message);
});
app.listen(config_1.configs.PORT, async () => {
    await mongoose.connect(config_1.configs.DB_URI);
    console.log(`Server has successfully started on PORT ${config_1.configs.PORT}`);
});
