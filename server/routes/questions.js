const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { Question } = require("../models/Question");
const { User } = require("../models/User");

router.post("/add", (req, res) => {
  const question = new Question(req.body);
  console.log("POST request received");
  console.log(req.body);

  question
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

router.get("/list", async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status === "no") {
      filter.anwser = { $exists: false }; // 'no'인 경우 anwser 필드가 없는 데이터만 가져오기
    } else if (status === "yes") {
      filter.anwser = { $exists: true }; // 'yes'인 경우 anwser 필드가 있는 데이터만 가져오기
    }

    const questions = await Question.find(filter).exec();
    if (!questions) {
      return res
        .status(404)
        .json({ success: false, message: "질문정보를 찾을 수 없습니다." });
    }

    const questionsWithUserNames = await Promise.all(
      questions.map(async (question) => {
        try {
          const questionUidObjectId = new mongoose.Types.ObjectId(
            question.questionUid
          );
          const user = await User.findOne({ _id: questionUidObjectId }).exec();

          if (user) {
            return {
              _id: question._id,
              questionUserName: user.name, // 사용자 이름을 추가
              questionDate: question.questionDate, // 질문 날짜
              questionUid: question.questionUid, // 질문자 UID
              questionTitle: question.questionTitle, // 질문 제목
              questionDiscription: question.questionDiscription, // 질문 내용
              anwser: question.anwser, // 답변
              anwserDate: question.anwserDate, // 답변 날짜
            };
          } else {
            return question; // 사용자를 찾지 못한 경우 원래의 질문을 반환
          }
        } catch (err) {
          console.error("사용자를 찾는 동안 오류가 발생했습니다.", err);
          return question; // 오류가 발생한 경우 원래의 질문을 반환
        }
      })
    );

    res.status(200).json({
      success: true,
      questions: questionsWithUserNames,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "질문정보를 가져오는 동안 오류가 발생했습니다.",
      error: err,
    });
  }
});

router.post("/update", (req, res) => {
  const { id, anwser, anwserDate } = req.body;

  // 클라이언트에서 받은 id를 ObjectId로 변환
  const objectId = new mongoose.Types.ObjectId(id);

  const updatedData = {
    anwser: anwser,
    anwserDate: anwserDate,
  };

  Question.findByIdAndUpdate(objectId, updatedData, { new: true })
    .then((question) => {
      if (!question) {
        return res
          .status(404)
          .json({ success: false, message: "질문 정보를 찾을 수 없습니다." });
      }

      res.status(200).json({ success: true, question: question });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "질문 정보 업데이트 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

module.exports = router;
