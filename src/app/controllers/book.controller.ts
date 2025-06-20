import express, { Request, Response } from "express";
import z, { string } from "zod";
import { Book } from "../models/books.model";
export const bookRoutes = express.Router();

const validateBook = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string().optional(),
  description: z.string(),
  copies: z.number(),
  available: z.boolean(),
});

bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const reqData = req.body;
    const validateData = await validateBook.parseAsync(reqData);
    const data = await Book.create(validateData);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query || "";
    const checkAsc = sort === "asc" ? 1 : -1;

    const data = await Book.find({ genre: filter })
      .sort({ [sortBy as string]: checkAsc })
      .limit(Number(limit ?? 10));
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});

bookRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Book.findById(id);
    res.status(201).json({
      success: true,
      message: "Book retrieved  successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
bookRoutes.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(updateData);
    const data = await Book.findByIdAndUpdate(id, updateData, { new: true });
    res.status(201).json({
      success: true,
      message: "Book updated  successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
bookRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Book deleted  successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message,
      error: err,
    });
  }
});
