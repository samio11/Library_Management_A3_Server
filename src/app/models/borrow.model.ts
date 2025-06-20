import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      min: [1, "Cant Borrow Negative OR 0 number of books"],
    },
    dueDate: { type: Date, required: [true, "Must provide Due Date"] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
borrowSchema.pre("save", async function (next) {
  const checkAvalible = await Book.findById(this.book);
  if (checkAvalible?.available === false) {
    throw new Error("Book is Not Available at this moment");
  }
  next();
});
export const Borrow = model<IBorrow>("Borrow", borrowSchema);
