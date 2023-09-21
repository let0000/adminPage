import React from "react";
import "./user.css";

import PersonIcon from "@mui/icons-material/Person";
import UserContent from "./UserContent";

function user() {
  return (
    <div className="user">
      <div className="userTab">
        <div className="userTitle">
          <PersonIcon className="userTitleIcon" />
          <span>회원 관리</span>
        </div>
        <UserContent />
      </div>
    </div>
  );
}

export default user;
