const express = require("express");
const router = express.Router();

const { Admin } = require("../models/Admin");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  // 회원가입 할때 필요한 정보들을 client 에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const admin = new Admin(req.body);

  admin
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

router.get("/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말
  res.status(200).json({
    _id: req.admin._id,
    isAuth: true,
    name: req.admin.name,
    id: req.admin.id,
  });
});

router.get("/logout", auth, (req, res) => {
  Admin.findOneAndUpdate(
    {
      _id: req.admin._id,
    },
    { token: "" }
  )
    .then(() => {
      return res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

router.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  Admin.findOne({ id: req.body.id })
    .then((admin) => {
      if (!admin) {
        return res.json({
          loginSuccess: false,
          message: "제공된 아이디에 해당하는 관리자가 없습니다.",
        });
      }
      // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
      admin
        .comparePassword(req.body.password)
        .then((isMatch) => {
          if (!isMatch)
            return res.json({
              loginSuccess: false,
              message: "비밀번호가 일치하지 않습니다.",
            });

          // 비밀번호까지 맞다면 토큰을 생성하기
          admin
            .generateToken()
            .then((admin) => {
              // 토큰을 cookie-parser 를 이용하여 쿠키에 저장한다.
              res.cookie("x_auth", admin.token).status(200).json({
                loginSuccess: true,
                adminId: admin._id,
              });
            })
            .catch((err) => {
              return res.status(400).send(err);
            });
        })
        .catch((err) => {
          return res.status(400).send(err);
        });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

module.exports = router;
