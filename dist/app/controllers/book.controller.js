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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const books_model_1 = require("../models/books.model");
exports.bookRoutes = express_1.default.Router();
const validateBook = zod_1.default.object({
    title: zod_1.default.string(),
    author: zod_1.default.string(),
    genre: zod_1.default.string(),
    isbn: zod_1.default.string().optional(),
    description: zod_1.default.string(),
    copies: zod_1.default.number(),
    available: zod_1.default.boolean(),
});
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqData = req.body;
        const validateData = yield validateBook.parseAsync(reqData);
        const data = yield books_model_1.Book.create(validateData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
            error: err,
        });
    }
}));
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query || "";
        const checkAsc = sort === "asc" ? 1 : -1;
        const data = yield books_model_1.Book.find({ genre: filter })
            .sort({ [sortBy]: checkAsc })
            .limit(Number(limit !== null && limit !== void 0 ? limit : 10));
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
            error: err,
        });
    }
}));
exports.bookRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield books_model_1.Book.findById(id);
        res.status(201).json({
            success: true,
            message: "Book retrieved  successfully",
            data,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
            error: err,
        });
    }
}));
exports.bookRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        console.log(updateData);
        const data = yield books_model_1.Book.findByIdAndUpdate(id, updateData, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated  successfully",
            data,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
            error: err,
        });
    }
}));
exports.bookRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield books_model_1.Book.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Book deleted  successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err === null || err === void 0 ? void 0 : err.message,
            error: err,
        });
    }
}));
