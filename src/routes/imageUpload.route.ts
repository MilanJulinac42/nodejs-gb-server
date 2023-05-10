import express from "express";
import { imageUpload } from "../conrollers/imageUpload.controller";
import upload from "../config/multer";

const router = express.Router();

router.post("/api/upload", upload.single("imageUpload"), imageUpload);

export default router;
