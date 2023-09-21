const { Admin } = require("../models/Admin");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한후 유저를 찾는다.
  Admin.findByToken(token)
    .then((admin) => {
      // 유저가 없으면 인증 No
      if (!admin) {
        return res.json({
          isAuth: false,
          error: true,
        });
      }

      // 유저가 있으면 인증 Okay
      req.token = token;
      req.admin = admin;
      next();
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { auth };
