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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
const validateBorrow = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.string(),
    dueDate: zod_1.z.date(),
});
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        // console.log(book, quantity, dueDate);
        const checkAvilableBook = yield books_model_1.Book.findById(book);
        console.log("Before Yoo:-", checkAvilableBook);
        const { available, copies } = checkAvilableBook;
        if (available === true && copies > 0) {
            checkAvilableBook.copies -= quantity;
            yield books_model_1.Book.findByIdAndUpdate(checkAvilableBook._id, checkAvilableBook, {
                new: true,
            });
        }
        if (available === true && copies === 0) {
            checkAvilableBook.available = false;
            yield books_model_1.Book.findByIdAndUpdate(checkAvilableBook._id, checkAvilableBook, {
                new: true,
            });
        }
        const data = yield borrow_model_1.Borrow.create(req.body);
        // console.log(available);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: data,
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
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookInfo",
            },
        },
        {
            $unwind: "$bookInfo",
        },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                book: {
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn",
                },
            },
        },
    ]);
    try {
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: data,
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
