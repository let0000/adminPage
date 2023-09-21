import React, { useState } from "react";
import "./navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const authData = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const onLogoutHandler = (e) => {
    axios.get(`/api/admins/logout`).then((response) => {
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  if (!authData || !authData.adminData) {
    return <progress />;
  }

  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navLeft">
          <span className="logo">Consulting Admin</span>
        </div>
        {authData && authData.adminData.isAuth ? (
          <div className="navRight">
            <img
              src="https://www.studiopeople.kr/common/img/default_profile.png"
              alt="프로필"
              className="navAvatar"
            />
            <div className="navText">
              <div>
                <span style={{ color: "blue" }}>
                  {authData.adminData.name} ({authData.adminData.id})
                </span>{" "}
                님.
                <div>오늘도 좋은하루 되세요</div>
              </div>
            </div>
            <div className="searchButton">
              <button onClick={onLogoutHandler}>
                <LogoutIcon />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="navRight">
            <div className="navText">로그인 후 이용해주세요.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
