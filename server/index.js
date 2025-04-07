const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const apiRouter = require("./routers/api");
const cors = require("cors");

const app = express();
const PORT = 8080;
const MONGO_URI = "mongodb://localhost:27017/test";

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust if your frontend is served on another port
    credentials: true,
  })
);
app.use(express.json());
app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
