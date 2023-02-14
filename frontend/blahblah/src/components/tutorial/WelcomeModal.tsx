import styled from "@emotion/styled";
import ButtonComp from "../common/ButtonComp";
import BasicModal from "../ui/BasicModal";

const WelcomeModalBox = styled.div`
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
  }
`;

type WelcomeModalPropsType = {
  open: boolean;
  setOpen: any;
};

export default function WelcomeModal({
  open,
  setOpen,
}: WelcomeModalPropsType): JSX.Element {
  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <WelcomeModalBox>
        <p>환영합니다! &#9786;</p>
        <p>마리콘의 아바타 튜토리얼을 시작해볼까요?</p>
        <ButtonComp text="START" onClick={onCloseModal} />
      </WelcomeModalBox>
    </BasicModal>
  );
}

