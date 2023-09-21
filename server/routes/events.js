const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { Event } = require("../models/Event");

router.post("/add", (req, res) => {
  const event = new Event(req.body);
  console.log("POST request received");
  console.log(req.body);

  event
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

router.get("/list", (req, res) => {
  Event.find({})
    .then((events) => {
      if (!events) {
        return res
          .status(404)
          .json({ success: false, message: "이벤트정보를 찾을 수 없습니다." });
      }

      // 사용자 데이터를 JSON 응답으로 반환합니다.
      res.status(200).json({
        success: true,
        events: events,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "이벤트정보를 가져오는 동안 오류가 발생했습니다.",
        error: err,
      });
    });
});

router.get("/search", (req, res) => {
  const option = req.query.option;
  const searchTerm = req.query.search;

  let query = {};

  if (option === "title") {
    query.title = { $regex: `.*${searchTerm}.*`, $options: "i" };
  } else if (option === "startDate") {
    query.startDate = { $regex: `.*${searchTerm}.*`, $options: "i" };
  } else if (option === "endDate") {
    query.endDate = { $regex: `.*${searchTerm}.*`, $options: "i" };
  } else {
    return res
      .status(400)
      .json({ success: false, message: "올바르지 않은 검색 옵션" });
  }

  Event.find(query)
    .then((events) => {
      if (!events || events.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "검색 결과가 없습니다." });
      }

      res.status(200).json({
        success: true,
        events: events,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "검색 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

router.post("/update", (req, res) => {
  const { id, title, description, startDate, endDate } = req.body;

  // 클라이언트에서 받은 id를 ObjectId로 변환
  const objectId = new mongoose.Types.ObjectId(id);

  const updatedData = {
    title: title,
    description: description,
    startDate: startDate,
    endDate: endDate,
  };

  Event.findByIdAndUpdate(objectId, updatedData, { new: true })
    .then((event) => {
      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: "이벤트 정보를 찾을 수 없습니다." });
      }

      res.status(200).json({ success: true, event: event });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "쿠폰 정보 업데이트 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

router.delete("/delete", (req, res) => {
  const id = req.body.id; // 클라이언트에서 삭제할 사용자의 ID를 받습니다.

  // 클라이언트에서 받은 id를 ObjectId로 변환
  const objectId = new mongoose.Types.ObjectId(id);

  Event.findByIdAndRemove(objectId)
    .then((event) => {
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "삭제할 이벤트 정보를 찾을 수 없습니다.",
        });
      }

      res
        .status(200)
        .json({ success: true, message: "이벤트 정보가 삭제되었습니다." });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "이벤트 정보 삭제 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

module.exports = router;
