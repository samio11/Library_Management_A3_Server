"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title Must be Given."] },
    author: { type: String, required: [true, "Author name Must be Given."] },
    genre: {
        type: String,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not valid genre",
        },
    },
    isbn: { type: String, unique: [true, "isbn number must be unique"] },
    description: { type: String },
    copies: {
        type: Number,
        required: true,
        min: [0, "Book Copies can not be Negative"],
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
