import express from "express";
import multer from "multer";
//controllers
import { addUser } from "../controllers/userController.js";
const router = express.Router();
const upload = multer({ dest: "/public/uploads/" });
router.post("/add-user", upload.array("pictures", 3), addUser);

export default router;
