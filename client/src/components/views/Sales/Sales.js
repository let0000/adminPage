import React from "react";
import "./sales.css";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SalesContent from "./SalesContent";

function Sales() {
  return (
    <div className="sales">
      <div className="salesTab">
        <div className="salesTitle">
          <TrendingUpIcon className="salesTitleIcon" />
          <span>매출 내역</span>
        </div>
        <SalesContent />
      </div>
    </div>
  );
}

export default Sales;
