const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const { User } = require("../models/User");

router.post("/add", (req, res) => {
  // 회원가입 할때 필요한 정보들을 client 에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user
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
  User.find({})
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .json({ success: false, message: "사용자를 찾을 수 없습니다." });
      }

      // 사용자 데이터를 JSON 응답으로 반환합니다.
      res.status(200).json({
        success: true,
        users: users,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "사용자를 가져오는 동안 오류가 발생했습니다.",
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

  User.find(query)
    .then((users) => {
      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "검색 결과가 없습니다." });
      }

      res.status(200).json({
        success: true,
        users: users,
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
  const { id, name, email, phone, gender, address, detailAddress, birth } =
    req.body;

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
  };

  User.findByIdAndUpdate(objectId, updatedData, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "사용자를 찾을 수 없습니다." });
      }

      res.status(200).json({ success: true, user: user });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "사용자 업데이트 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

router.delete("/delete", (req, res) => {
  const id = req.body.id; // 클라이언트에서 삭제할 사용자의 ID를 받습니다.

  // 클라이언트에서 받은 id를 ObjectId로 변환
  const objectId = new mongoose.Types.ObjectId(id);

  User.findByIdAndRemove(objectId)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message: "삭제할 사용자를 찾을 수 없습니다.",
          });
      }

      res
        .status(200)
        .json({ success: true, message: "사용자가 삭제되었습니다." });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "사용자 삭제 중 오류가 발생했습니다.",
        error: err,
      });
    });
});

module.exports = router;
