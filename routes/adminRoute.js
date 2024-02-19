import express from "express";
//controllers
import { config, elevenConfig } from "../controllers/adminController.js";
const router = express.Router();
// admin route
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.get("/eleven/config", elevenConfig);
router.put("/admin", config);

export default router;
