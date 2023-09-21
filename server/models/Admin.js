const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  id: {
    type: String,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 100,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// user.save() 전에 호출되서 끝나면 next()를 통해 user.save() 를 실행
adminSchema.pre("save", function (next) {
  var admin = this; // 내가 입력한 비밀번호를 가져오기위해 필요

  // 비밀번호를 변경할때만 비밀번호를 암호화
  if (admin.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(admin.password, salt, function (err, hash) {
        if (err) return next(err);

        admin.password = hash;
        next();
      });
    });
  } else {
    next();
  }
  //bcrypt 를 이용해서 비밀번호 암호화
});

adminSchema.methods.comparePassword = function (plainPassword) {
  return new Promise((resolve, reject) => {
    // 입력한 비밀번호 plainPassword 와 DB에 있는 password 과 같은지 확인
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) return reject(err); // err 발생시 err 를 콜백
      resolve(isMatch); // 문제없을시 isMatch에 true 값을 콜백
    });
  });
};

adminSchema.methods.generateToken = function () {
  var admin = this;

  return new Promise((resolve, reject) => {
    // jsonwebtoken 을 이용하여 token을 생성하기
    var token = jwt.sign(admin._id.toHexString(), "secretToken");

    //user._id + 'secretToken' = token

    admin.token = token;

    admin
      .save()
      .then((admin) => resolve(admin))
      .catch((err) => reject(err));
  });
};

adminSchema.statics.findByToken = function (token) {
  var admin = this;

  return new Promise((resolve, reject) => {
    // 토큰을 decode 한다.
    jwt.verify(token, "secretToken", function (err, decode) {
      // 유저 아이디를 이용해서 유저를 찾은 다음에
      // 클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인
      admin
        .findOne({ _id: decode, token: token })
        .then((admin) => resolve(admin))
        .catch((err) => reject(err));
    });
  });
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
