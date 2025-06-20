import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", bookSchema);
