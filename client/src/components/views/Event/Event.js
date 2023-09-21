import React from "react";
import "./event.css";

import CelebrationIcon from "@mui/icons-material/Celebration";
import EventContent from "./EventContent";

function Event() {
  return (
    <div className="event">
      <div className="eventTab">
        <div className="eventTitle">
          <CelebrationIcon className="eventTitleIcon" />
          <span>이벤트 관리</span>
        </div>
        <EventContent />
      </div>
    </div>
  );
}

export default Event;
