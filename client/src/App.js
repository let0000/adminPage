import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";
import Home from "./components/views/Home/Home";
import User from "./components/views/User/User";
import Sales from "./components/views/Sales/Sales";
import Coupon from "./components/views/Coupon/Coupon";
import Event from "./components/views/Event/Event";
import Question from "./components/views/Question/Question";
import Counselor from "./components/views/Counselor/Counselor";

function App() {
  const AuthLandingPage = Auth(LandingPage, true);
  const AuthHomePage = Auth(Home, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/home" element={<AuthHomePage />}>
            {/* 중첩된 Route 추가 */}
            <Route path="User" element={<User />} />
            <Route path="Counselor" element={<Counselor />} />
            <Route path="Sales" element={<Sales />} />
            <Route path="Coupon" element={<Coupon />} />
            <Route path="Event" element={<Event />} />
            <Route path="Question" element={<Question />} />
            {/* 다른 하위 경로 설정 */}
          </Route>
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
