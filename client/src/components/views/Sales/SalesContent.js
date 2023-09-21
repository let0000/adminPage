import React from "react";
import "./salescontent.css";
import FeaturedInfo from "./FeaturedInfo";
import Chart from "./Chart";

function SalesContent() {
  return (
    <div className="salesContent">
      <FeaturedInfo />
      <Chart />
    </div>
  );
}

export default SalesContent;
