import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import Author from "../models/Author";

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name,
    });

    const savedAuthor = await author.save();
    res.status(201).json({ author: savedAuthor });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);

    if (author) {
      res.status(200).json({ author });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllAuthors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ authors });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);

    if (author) {
      author.set(req.body);
      const updatedAuthor = await author.save();
      res.status(201).json({ author: updatedAuthor });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findByIdAndDelete(authorId);

    if (author) {
      res.status(201).json({ message: "deleted" });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { createAuthor, updateAuthor, deleteAuthor, getAuthor, getAllAuthors };
