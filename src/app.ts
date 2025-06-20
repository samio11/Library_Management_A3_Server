import express, { Application, Request, Response } from "express";
import cors from "cors";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is Running Successfully" });
});

export default app;
