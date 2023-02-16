import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarBubble from "../components/common/AvatarBubble";
import AvatarComp from "../components/common/AvatarComp";
import NavBarLanding from "../components/layout/NavBarLanding";
import Pop from "../assets/emoji/pop.png";
import ButtonComp from "../components/common/ButtonComp";
import BackgroundImg from "../assets/img/grid.jpg";
import Logo from "../assets/img/logo_mic.png";

const TypingAniTop = keyframes`
  0% {
    width: 0%;
  }
  25% {
    width: 347px;
  }
  50% {
    width: 0%;
  }
  100% {
    width: 0%;
  }
`;

const TypingAniBottom = keyframes`
  0% {
    width: 0%;
  }
  25% {
    width: 280px;
  }
  50% {
    width: 0%;
  }
  100% {
    width: 0%;
  }
`;

const TypingCursor = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const TitleStartKeyFrame = keyframes`
  from {
    transform: scale(5);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(calc(var(--title-vh))) rotate(1turn);
    opacity: 1;
  }
`;

const TitleShakeKeyFrame = keyframes`
  0% {
    transform: translate(-10px, calc(var(--title-vh) + 10px));
  }
  33% {
    transform: translate(10px, calc(var(--title-vh) - 10px));
  }
  66% {
    transform: translate(10px, calc(var(--title-vh) + 10px));
  }
  100% {
    transform: translate(-10px, calc(var(--title-vh) - 10px));
  }

`;

const TitleDurationKeyFrame = keyframes`
  0% {
    transform: translateY(calc(var(--title-vh)))
  }
  100% {
    transform: translateY(calc(var(--title-vh) - 10px));
  }
`;

const PtagKeyFrame = keyframes`
 from {
  width: 90%;
 }
 to {
  width: 0%;
 }
`;

const ButtonKeyFrame = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Bubble1StartKeyFrame = keyframes`
  0% {
    opacity: 0.8;
  }
  30% {
    top: -1%;
    left: 14%;
  }
  100% {
    top:10%;
    left: 5%;
    transform: rotate(calc(-1turn - 9deg));
    opacity: 1;
  }
`;

const Bubble1DurationKeyFrame = keyframes`
  0% {
    transform: rotate(-9deg);
  }
  100% {
    transform: rotate(-12deg);
  }
`;

const Bubble2StartKeyFrame = keyframes`
  0% {
    opacity: 0.8;
  }
  30% {
    top: 6%;
    right: 22%;
  }
  100% {
    top: 20%;
    right: 15%;
    transform: rotate(calc(1turn + 15deg));
    opacity: 1;
  }
`;

const Bubble2DurationKeyFrame = keyframes`
  0% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(18deg);
  }
`;

const Bubble3StartKeyFrame = keyframes`
  0% {
    opacity: 0.8;
  }
  30% {
    bottom: 70%;
    left: 20%;
  }
  100% {
    bottom: 15%;
    left: 13%;
    transform: rotate(calc(-1turn - 5deg));
    opacity: 1;
  }
`;

const Bubble3DurationKeyFrame = keyframes`
  0% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(-8deg);
  }
`;

const Bubble4StartKeyFrame = keyframes`
  0% {
    opacity: 0.8;
  }
  30% {
    bottom: 70%;
    right: 30%;
  }
  100% {
    bottom: 10%;
    right: 13%;
    transform: rotate(calc(2turn + 8deg));
    opacity: 1;
  }
`;

const Bubble4DurationKeyFrame = keyframes`
  0% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(11deg);
  }
`;

const Pop1KeyFrame = keyframes`
  0% {
    opacity: 0.8;
  }
  10% {
    top: 3%;
    left: 24%;
  }
  100% {
    top: 200%;
    left: 5%;
    transform: scale(6);
    opacity: 1;
    z-index: 50;
  }
`;

const Pop2KeyFrame = keyframes`
  0% {
    opacity: 0.8;
  }
  10% {
    top: 3%;
    right: 24%;
  }
  100% {
    top: 200%;
    right: 5%;
    transform: scale(6);
    opacity: 1;
    z-index: 50;
  }
`;

const Bubble1 = styled.div`
  position: absolute;
  width: 232px;
  height: 160px;
  top: 35%;
  left: 40%;
  transform: rotate(-9deg);
  opacity: 0;
  animation: ${Bubble1StartKeyFrame} 1s ease-out;
  animation-delay: 700ms;
  &.duration_bubble1 {
    top: 10%;
    left: 5%;
    opacity: 1;
    animation: ${Bubble1DurationKeyFrame} ease-in-out 0.6s infinite alternate;
  }
`;

const Bubble2 = styled.div`
  position: absolute;
  width: 143px;
  height: 105px;
  top: 35%;
  right: 45%;
  transform: rotate(15deg);
  opacity: 0;
  animation: ${Bubble2StartKeyFrame} 1s ease-out;
  animation-delay: 1200ms;
  &.duration_bubble2 {
    top: 20%;
    right: 15%;
    opacity: 1;
    animation: ${Bubble2DurationKeyFrame} ease-in-out 0.4s infinite alternate;
  }
`;

const Bubble3 = styled.div`
  position: absolute;
  width: 208px;
  height: 146px;
  bottom: 50%;
  left: 40%;
  transform: rotate(-5deg);
  opacity: 0;
  animation: ${Bubble3StartKeyFrame} 1s ease-out;
  animation-delay: 1700ms;
  &.duration_bubble3 {
    bottom: 15%;
    left: 13%;
    opacity: 1;
    animation: ${Bubble3DurationKeyFrame} ease-in-out 0.5s infinite alternate;
  }
`;

const Bubble4 = styled.div`
  position: absolute;
  width: 120px;
  height: 105px;
  bottom: 50%;
  right: 45%;
  transform: rotate(8deg);
  opacity: 0;
  animation: ${Bubble4StartKeyFrame} 1s ease-out;
  animation-delay: 2200ms;
  &.duration_bubble4 {
    bottom: 10%;
    right: 13%;
    opacity: 1;
    animation: ${Bubble4DurationKeyFrame} ease-in-out 0.3s infinite alternate;
  }
`;

const PopWrapper1 = styled.div`
  position: absolute;
  width: 224px;
  top: 35%;
  left: 50%;
  opacity: 0;
  z-index: -1;
  & > img {
    width: 100%;
    height: auto;
  }
  &.active_pop1 {
    animation: ${Pop1KeyFrame} 1s ease-out;
  }
`;

const PopWrapper2 = styled.div`
  position: absolute;
  width: 224px;
  top: 35%;
  right: 50%;
  opacity: 0;
  z-index: -1;
  & > img {
    width: 100%;
    height: auto;
  }
  &.active_pop2 {
    animation: ${Pop2KeyFrame} 0.7s ease-out;
  }
`;

const LandingPageLayout = styled.div`
  --title-vh: 50vh - 140px;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(${BackgroundImg});
  background-size: cover;
  & > div.title-wrapper {
    max-width: 750px;
    margin: 0 auto;
    transform: translateY(calc(var(--title-vh))) rotate(180deg);
    animation: ${TitleStartKeyFrame} ease 0.8s;
    animation-fill-mode: forwards;
    &.shake {
      animation: ${TitleShakeKeyFrame} 0.3s infinite alternate;
    }
    &.duration {
      animation: ${TitleDurationKeyFrame} ease 0.5s infinite alternate;
    }
    & > div.logo-img {
      margin: 0;
      width: 100%;
      & > img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }
    }
    & > p {
      position: relative;
      margin: 20px 0px 0px 25px;
      font-size: 1.5em;
      display: block;
      width: 0px;
      height: 1.5em;
      overflow: hidden;
      line-height: 130%;
      &:after {
        content: "";
        display: block;
        width: 0px;
        height: 1.5em;
        position: absolute;
        top: 1px;
        right: 0;
        border-right: 2px solid #808080;
        opacity: 0;
      }
    }
    & > p.top-p {
      animation: ${TypingAniTop} 8s steps(14, end) infinite;
      animation-delay: 3200ms;
      &:after {
        animation: ${TypingCursor} 0.5s step-end infinite;
        /* animation-iteration-count: 4; */
        /* animation-fill-mode: backwards;s */
        animation-delay: 3200ms;
      }
    }
    & > p.bottom-p {
      /* display: none; */
      position: absolute;
      top: -20px;
      animation: ${TypingAniBottom} 8s steps(11, end) infinite;
      animation-delay: 7300ms;
      &:after {
        animation: ${TypingCursor} 0.5s step-end infinite;
        animation-delay: 6600ms;
      }
    }
  }
  & > div.button-wrapper {
    position: absolute;
    bottom: 40%;
    left: 50%;
    transform: translate(-65px, 163px);
    width: 130px;
    opacity: 0;
    animation: ${ButtonKeyFrame} ease 2s;
    animation-delay: 3500ms;
    animation-fill-mode: forwards;
  }
`;

function LandingPage(): JSX.Element {
  const titleEl = useRef<HTMLHeadingElement>(null);
  const bubbleEl1 = useRef<HTMLHeadingElement>(null);
  const bubbleEl2 = useRef<HTMLHeadingElement>(null);
  const bubbleEl3 = useRef<HTMLHeadingElement>(null);
  const bubbleEl4 = useRef<HTMLHeadingElement>(null);
  const popEl1 = useRef<HTMLHeadingElement>(null);
  const popEl2 = useRef<HTMLHeadingElement>(null);
  const popEl3 = useRef<HTMLHeadingElement>(null);

  const navigate = useNavigate();

  const onClickTitle = () => {
    popEl1.current?.classList.remove("active_pop1");
    popEl2.current?.classList.remove("active_pop2");
    setTimeout(() => {
      popEl1.current?.classList.add("active_pop1");
    }, 200);
    setTimeout(() => {
      popEl2.current?.classList.add("active_pop2");
    }, 400);
  };

  const onClickMain = () => {
    navigate("/main");
  };

  const setTitleAnimation = () => {
    setTimeout(() => {
      titleEl.current?.classList.add("shake");
      popEl1.current?.classList.add("active_pop1");
    }, 700);

    setTimeout(() => {
      popEl2.current?.classList.add("active_pop2");
    }, 1000);

    // setTimeout(() => {
    //   popEl3.current?.classList.add("active_pop3");
    // }, 1300);

    setTimeout(() => {
      bubbleEl1.current?.classList.add("duration_bubble1");
    }, 1700);

    setTimeout(() => {
      bubbleEl2.current?.classList.add("duration_bubble2");
    }, 2200);

    setTimeout(() => {
      bubbleEl3.current?.classList.add("duration_bubble3");
    }, 2700);

    setTimeout(() => {
      bubbleEl4.current?.classList.add("duration_bubble4");
      titleEl.current?.classList.add("duration");
    }, 3200);
  };
  useEffect(() => {
    setTitleAnimation();
  });
  return (
    <LandingPageLayout>
      <div className="title-wrapper" ref={titleEl} onClick={onClickTitle}>
        {/* <p className="top-p">아바타로 소통하는 아티스트와 나</p> */}
        <p className="top-p">아바타로 소통하는 아티스트와 나</p>
        <p className="bottom-p">아바타로 표현하는 내 감정</p>
        <div className="logo-img">
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <div className="button-wrapper">
        <ButtonComp
          text="GO TO MAIN >"
          onClick={onClickMain}
          width={125}
          height={45}
        />
      </div>

      <PopWrapper1 ref={popEl1}>
        <img src={Pop} alt="" />
      </PopWrapper1>

      <PopWrapper2 ref={popEl2}>
        <img src={Pop} alt="" />
      </PopWrapper2>

      {/* <PopWrapper1 ref={popEl1}>
        <img src={Pop} alt="" />
      </PopWrapper1> */}

      <Bubble1 ref={bubbleEl1}>
        <AvatarBubble state="happy" color="#54d7c7" seed="Callie" />
      </Bubble1>

      <Bubble2 ref={bubbleEl2}>
        <AvatarBubble state="clap" color="#f55d81" seed="Harley" />
      </Bubble2>

      <Bubble3 ref={bubbleEl3}>
        <AvatarBubble state="surprised" color="#f3b63a" seed="Sasha" />
      </Bubble3>

      <Bubble4 ref={bubbleEl4}>
        <AvatarBubble state="light" color="#6dbb58" seed="Sugar" />
      </Bubble4>

      {/* <NavBarLanding /> */}
      {/* <Link to="/main">
        <Button>Skip</Button>
      </Link> */}
    </LandingPageLayout>
  );
}
export default LandingPage;

