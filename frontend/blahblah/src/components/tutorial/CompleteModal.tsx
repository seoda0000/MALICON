import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import ButtonComp from "../common/ButtonComp";
import BasicModal from "../ui/BasicModal";

const CompleteModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    margin: 15px 0 0 0;
    &:nth-of-type(1) {
      font-weight: bold;
      font-size: 20px;
    }
  }
  & > div {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`;

type CompleteModalPropsType = {
  open: boolean;
  setOpen: any;
};

export default function CompleteModal({
  open,
  setOpen,
}: CompleteModalPropsType): JSX.Element {
  const navigate = useNavigate();

  const goToTutorial = () => {
    closeModal();
    window.location.reload();
  };

  const goToMain = () => {
    closeModal();
    navigate("/main");
  };

  const closeModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <CompleteModalBox>
        <p>튜토리얼이 끝났습니다! &#9786;</p>
        <p>이제 생방송에서 아바타로 내 감정을 전달하세요!</p>
        <div>
          <ButtonComp text="TRY AGAIN" onClick={goToTutorial} width={120} />
          <ButtonComp text="MAIN" onClick={goToMain} width={120} />
        </div>
      </CompleteModalBox>
    </BasicModal>
  );
}

