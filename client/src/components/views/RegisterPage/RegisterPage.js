import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../../_actions/admin_action";
import { loginAdmin } from "../../../_actions/admin_action";

function RegisterPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onIdHandler = (e) => {
    setId(e.target.value);
  };

  const onNameHandler = (e) => {
    setName(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onConfrimPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    let body = {
      id: Id,
      name: Name,
      password: Password,
    };

    dispatch(registerAdmin(body)).then((response) => {
      if (response.payload.success) {
        // 회원가입 성공하면 로그인 실행
        dispatch(loginAdmin(body)).then((loginResponse) => {
          if (loginResponse.payload.loginSuccess) {
            navigate("/"); // 로그인 성공 시 "/"로 이동
          } else {
            alert("로그인 실패");
          }
        });
      } else {
        alert("회원가입 실패");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>ID</label>
        <input type="text" value={Id} onChange={onIdHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfrimPasswordHandler}
        />
        <br />
        <button type="submit" onClick={onSubmitHandler}>
          회원 가입
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
