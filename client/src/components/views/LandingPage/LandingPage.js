import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  return <div className="landing"></div>;
}

export default LandingPage;
