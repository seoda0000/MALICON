import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// import TestAnimation from "../components/landing/gsapTest";
// import LandingEffect from "../components/landing/LandingEffect";
import NavBarLanding from "../components/layout/NavBarLanding";

function LandingPage() {
  return (
    <div>
      <NavBarLanding />

      <h1>랜딩페이지</h1>
      {/* <LandingEffect /> */}
      {/* <TestAnimation /> */}
      <Link to="/main">
        <Button>Skip</Button>
      </Link>
    </div>
  );
}
export default LandingPage;
