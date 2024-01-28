const express = require("express");
const Question = require("../models/Question.js");
const Answer = require("../models/Answer.js");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    return res.json(question);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "answers", //collection to join
          localField: "_id", //field from input document
          foreignField: "questionId",
          as: "allAnswers", //output array fields
        },
      },
    ]);
    res.json(questions);
    console.log(questions);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});
module.exports = router;
