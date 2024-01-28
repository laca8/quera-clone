const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answer",
  },
});
module.exports = mongoose.model("question", questionSchema);
