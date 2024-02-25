import express from "express";
import multer from "multer";
//controllers
import { addUser, getUsers } from "../controllers/userController.js";
const router = express.Router();
const upload = multer({ dest: "./uploads" });
router.post("/add-user", upload.array("pictures", 3), addUser);
router.get("/all-users", getUsers);

export default router;
