import express, { Request, Response } from "express";
import { z } from "zod";
import { Book } from "../models/books.model";
import { IBook } from "../interfaces/books.interface";
import { Borrow } from "../models/borrow.model";
export const borrowRoutes = express.Router();

const validateBorrow = z.object({
  book: z.string(),
  quantity: z.string(),
  dueDate: z.date(),
});

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    // console.log(book, quantity, dueDate);
    const checkAvilableBook = await Book.findById(book);
    console.log("Before Yoo:-", checkAvilableBook);
    const { available, copies } = checkAvilableBook;
    if (available === true && copies > 0) {
      checkAvilableBook.copies -= quantity;
      await Book.findByIdAndUpdate(checkAvilableBook._id, checkAvilableBook, {
        new: true,
      });
    }
    if (available === true && copies === 0) {
      checkAvilableBook.available = false;
      await Book.findByIdAndUpdate(checkAvilableBook._id, checkAvilableBook, {
        new: true,
      });
    }

    const data = await Borrow.create(req.body);

    // console.log(available);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  const data = await Borrow.aggregate([
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
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
