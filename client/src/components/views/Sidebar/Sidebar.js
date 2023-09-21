import React, { useState } from "react";
import "./sidebar.css";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import CelebrationIcon from "@mui/icons-material/Celebration";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    navigate("/home/" + menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">관리 메뉴</h3>
          <ul className="sidebarList">
            <li
              className={`sidebarListItem ${
                activeMenu === "User" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("User")}
            >
              <PersonIcon className="sidebarIcon" />
              회원 관리
            </li>
            <li
              className={`sidebarListItem ${
                activeMenu === "Counselor" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("Counselor")}
            >
              <PeopleIcon className="sidebarIcon" />
              상담사 관리
            </li>
            <li
              className={`sidebarListItem ${
                activeMenu === "Sales" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("Sales")}
            >
              <TrendingUpIcon className="sidebarIcon" />
              매출 내역
            </li>
            <li
              className={`sidebarListItem ${
                activeMenu === "Coupon" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("Coupon")}
            >
              <LocalActivityIcon className="sidebarIcon" />
              쿠폰 관리
            </li>
            <li
              className={`sidebarListItem ${
                activeMenu === "Event" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("Event")}
            >
              <CelebrationIcon className="sidebarIcon" />
              이벤트 관리
            </li>
            <li
              className={`sidebarListItem ${
                activeMenu === "Question" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("Question")}
            >
              <QuestionAnswerIcon className="sidebarIcon" />
              Q&A
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
