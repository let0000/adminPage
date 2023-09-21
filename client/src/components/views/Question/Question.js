import React from "react";
import "./question.css";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import QuestionContent from "./QuestionContent";

function Question() {
  return (
    <div className="question">
      <div className="questionTab">
        <div className="questionTitle">
          <QuestionAnswerIcon className="questionTitleIcon" />
          <span>Q&A 관리</span>
        </div>
        <QuestionContent />
      </div>
    </div>
  );
}

export default Question;
