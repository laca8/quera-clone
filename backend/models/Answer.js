const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema({
  answer: String,

  cretatedAt: {
    type: Date,
    default: Date.now(),
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
});
module.exports = mongoose.model("answer", answerSchema);
