import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../../_actions/admin_action";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (e) => {
    setId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      id: Id,
      password: Password,
    };

    dispatch(loginAdmin(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error");
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
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button onClick={onSubmitHandler}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
