import express from "express";
//controllers
import { config } from "../controllers/adminController.js";
const router = express.Router();
// admin route
router.put("/admin/config", config);

export default router;
