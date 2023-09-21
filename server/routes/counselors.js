const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { Counselor } = require("../models/Counselor");

router.post("/add", (req, res) => {
  const counselor = new Counselor(req.body);

  counselor
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
  Counselor.find({})
    .then((counselors) => {
      if (!counselors) {
        return res
          .status(404)
          .json({ success: false, message: "상담사를 찾을 수 없습니다." });
      }

      // 사용자 데이터를 JSON 응답으로 반환합니다.
      res.status(200).json({
        success: true,
        counselors: counselors,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "상담사를 가져오는 동안 오류가 발생했습니다.",
        error: err,
      });
    });
});

router.get("/search", (req, res) => {
  const option = req.query.option;
  const searchTerm = req.query.search;

  let query = {};

  if (option === "name") {
    query.name = { $regex: `.*${searchTerm}.*`, $options: "i" };
  } else if (option === "email") {
    query.email = { $regex: `.*${searchTerm}.*`, $options: "i" };
  } else if (option === "phone") {
    query.phone = { $regex: `.*${searchTerm}.*`, $options: "i" };
  } else {
    return res
      .status(400)
      .json({ success: false, message: "올바르지 않은 검색 옵션" });
  }

  Counselor.find(query)
    .then((counselors) => {
      if (!counselors || counselors.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "검색 결과가 없습니다." });
      }

      res.status(200).json({
        success: true,
        counselors: counselors,
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
  const {
    id,
    name,
    email,
    phone,
    gender,
    address,
    detailAddress,
    birth,
    career,
  } = req.body;

  // 클라이언트에서 받은 id를 ObjectId로 변환
  const objectId = new mongoose.Types.ObjectId(id);

  const updatedData = {
    name: name,
    email: email,
    phone: phone,
    gender: gender,
    address: address,
    detailAddress: detailAddress,
    birth: birth,
    carrer: career,
  };

  Counselor.findByIdAndUpdate(objectId, updatedData, { new: true })
    .then((counselor) => {
      if (!counselor) {
        return res
          .status(404)
          .json({ success: false, message: "상담사를 찾을 수 없습니다." });
      }

      res.status(200).json({ success: true, counselor: counselor });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "상담사 업데이트 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

router.delete("/delete", (req, res) => {
  const id = req.body.id; // 클라이언트에서 삭제할 사용자의 ID를 받습니다.

  // 클라이언트에서 받은 id를 ObjectId로 변환
  const objectId = new mongoose.Types.ObjectId(id);

  Counselor.findByIdAndRemove(objectId)
    .then((counselor) => {
      if (!counselor) {
        return res.status(404).json({
          success: false,
          message: "삭제할 상담사를 찾을 수 없습니다.",
        });
      }

      res
        .status(200)
        .json({ success: true, message: "상담사가 삭제되었습니다." });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "상담사 삭제 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

module.exports = router;
