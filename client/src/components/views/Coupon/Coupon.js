import React from "react";
import "./coupon.css";
import CouponContent from "./CouponContent";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function Coupon() {
  return (
    <div className="coupon">
      <div className="couponTab">
        <div className="couponTitle">
          <LocalActivityIcon className="couponTitleIcon" />
          <span>쿠폰 관리</span>
        </div>
        <CouponContent />
      </div>
    </div>
  );
}

export default Coupon;
