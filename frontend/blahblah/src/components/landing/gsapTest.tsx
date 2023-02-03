import React from "react";
import { gsap } from "gsap";

const { useLayoutEffect, useRef } = React;

const Box = ({ children, className, anim }: any) => {
  return (
    <div className={"box " + className} data-animate={anim}>
      {children}
    </div>
  );
};

function TestAnimation() {
  const app = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .to("[data-animate='move']", {
          y: -10,
          repeat: -1,
          repeatDelay: 1,
          yoyo: true,
        })
        .to("[data-animate='move']", {
          opacity: 0,
          scale: 4,
          ease: "Power1.easeOut",
          duration: 0.3,
          delay: -0.3,
        })
        .reverse(2);
    }, app); // <- Scope!

    return () => ctx.revert();
  }, []);

  //   호버 애니메이션 함수
  //   const onEnter = ({ currentTarget }: any) => {
  //     gsap.to(currentTarget, { backgroundColor: "#e77614", scale: 1.2 });
  //   };

  //   const onLeave = ({ currentTarget }: any) => {
  //     gsap.to(currentTarget, { backgroundColor: "#28a92b", scale: 1 });
  //   };

  const onClick = ({ currentTarget }: any) => {
    gsap.to(currentTarget, { y: -20, opacity: 0 });
  };

  const createIcon = () => {
    console.log("아이콘 생성");
  };
  function animateIcon(icon: any) {
    gsap.to(icon, { y: -200 });
    setTimeout(function () {
      icon.remove();
    }, 2000);
  }
  const popIcon = () => {
    console.log("pop");
    createIcon();
    const icon = document.createElement("span");
    icon.innerText = "❤";
    document.querySelector(".pop-section")?.appendChild(icon);

    setTimeout(function () {
      animateIcon(icon);
    }, 1000);
  };

  return (
    <div className="app" ref={app} style={{ margin: "100px" }}>
      {/* <Box className="dont-animate">Don't Animate Me</Box> */}
      {/* <Box anim="move">Box</Box> */}
      <div onClick={onClick}>❤</div>
      <div
        className="pop-section"
        style={{ width: "100px", height: "100px" }}
      ></div>
      <button onClick={popIcon}>pop!</button>
      {/* <div className="box" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        Hover Me
      </div> */}
    </div>
    //
    //
    //
  );
}

export default TestAnimation;
