import React from "react";
import "./counselor.css";
import PeopleIcon from "@mui/icons-material/People";
import CounselorContent from "./CounselorContent";

function Counselor() {
  return (
    <div className="counselor">
      <div className="counselorTab">
        <div className="counselorTitle">
          <PeopleIcon className="counselorTitleIcon" />
          <span>상담사 관리</span>
        </div>
        <CounselorContent />
      </div>
    </div>
  );
}

export default Counselor;
