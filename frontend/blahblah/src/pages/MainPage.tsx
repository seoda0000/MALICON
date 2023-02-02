
import VideoList from "../components/video/VideoList";
import { Box } from "@mui/system";

import { useState } from "react";
import AccountModal from "../components/auth/AccountModal";


function MainPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
      }}
    >
      <div>
        <h1>메인페이지</h1>
        <button onClick={() => setOpenModal((prev) => !prev)}>
        회원정보 수정
      </button>
      {openModal && <AccountModal open={openModal} setOpen={setOpenModal} />}

        <VideoList />
      </div>
    </Box>

  );
}
export default MainPage;

