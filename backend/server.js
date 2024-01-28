const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const questionRoute = require("./routes/questionRoutes");
const answerRoute = require("./routes/answerRoutes");
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//db
connectDB();
app.get("/", (req, res) => {
  res.send("api running...");
});
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
