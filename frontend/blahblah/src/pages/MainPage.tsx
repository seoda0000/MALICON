import { useState } from "react";
import AccountModal from "../components/auth/AccountModal";

function MainPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
      <h1>dd</h1>
      <h1>메인페이지</h1>
      <button onClick={() => setOpenModal((prev) => !prev)}>
        회원정보 수정
      </button>
      {openModal && <AccountModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
}
export default MainPage;

