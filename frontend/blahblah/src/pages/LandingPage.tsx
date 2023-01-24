import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import NavBarLanding from "../components/layout/NavBarLanding";

function LandingPage() {
  return (
    <div>
      <NavBarLanding />
      <h1>랜딩페이지</h1>
      <Link to="/main">
        <Button>Skip</Button>
      </Link>
    </div>
  );
}
export default LandingPage;
