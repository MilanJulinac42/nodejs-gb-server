import express from "express";
import controller from "../conrollers/Author";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/create", ValidateSchema(Schemas.author.create), controller.createAuthor);
router.get("/get/:authorId", controller.getAuthor);
router.get("/get", controller.getAllAuthors);
router.patch("/update/:authorId", ValidateSchema(Schemas.author.update), controller.updateAuthor);
router.delete("/delete/:authorId", controller.deleteAuthor);

export = router;
