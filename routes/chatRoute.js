import express from "express";
// controllers
import {
  userGreeting,
  twilioReceive,
  twilioSend,
  gptChat,
} from "../controllers/chatController.js";

const router = express.Router();
// routes
router.post("/user-greeting", userGreeting);
router.post("/twilio/receive", twilioReceive);
router.get("/twilio/send", twilioSend);
router.post("/gpt-chat", gptChat);

export default router;
