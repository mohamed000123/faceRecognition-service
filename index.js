import express from "express";
import cors from "cors";
//routers
import chatRouter from "./routes/chatRoute.js";
import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
const app = express();

app.listen(8000, () => {
  console.log("server is running on port 8000");
});

// middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my app");
});

app.use("/", chatRouter);
app.use("/", adminRouter);
app.use("/", userRouter);
