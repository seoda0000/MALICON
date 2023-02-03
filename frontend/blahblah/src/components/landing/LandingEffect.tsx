// import gsap from "gsap";

export default function LandingEffect() {
  // (function () {
  //   const wrapper = document.querySelector(".confetti");
  //   const isAnimationOk = window.matchMedia(
  //     "(prefers-reduced-motion: no-preference)"
  //   ).matches;
  //   const icons = ["🎉", "✨", "💜", "🖤", "👸🏻", "💻"];
  //   const iconCount = 18;
  //   let elements = [];

  //   init();

  //   function init() {
  //     for (let i = 0; i < iconCount; i++) {
  //       createIcon(null);
  //     }

  //     gsap.set([], {
  //       transformOrigin: "50% 50%",
  //       scale: 0,
  //     });
  //   }

  //   function createIcon(icon: any) {
  //     if (icon === null || icon === undefined) {
  //       icon = document.createElement("span");
  //       icon.classList.add("confetti__item");
  //       if (wrapper !== null) {
  //         wrapper.appendChild(icon);
  //       }
  //       elements.push(icon);
  //     }

  //     icon.innerText = gsap.utils.random(icons);
  //     if (isAnimationOk) animateIcon(icon);
  //   }

  //   function animateIcon(icon: any) {
  //     let durationFall = gsap.utils.random(1.75, 2.5);
  //     let durationFade = 0.3;
  //     let delay = gsap.utils.random(0, 0.75);
  //     let xDirection = gsap.utils.random(0, 1) > 0.5 ? 1 : -1;
  //     let x = (gsap.utils.random(0, window.outerWidth / 4) + 100) * xDirection;
  //     let tl = gsap.timeline();

  //     tl.to(
  //       icon,
  //       {
  //         repeat: -1,
  //         delay: delay,
  //         keyframes: [
  //           {
  //             scale: 1,
  //             duration: 0.1,
  //           },
  //           {
  //             y: `random(${-window.outerHeight / 4}, 0)`,
  //             ease: Back.easeOut.config(5),
  //             duration: durationFall,
  //           },
  //           {
  //             x:
  //               (gsap.utils.random(0, window.outerWidth / 4) + 100) *
  //               xDirection,
  //             ease: "Power1.easeOut",
  //             duration: durationFall,
  //             delay: -durationFall,
  //           },
  //           {
  //             opacity: 0,
  //             scale: 4,
  //             ease: "Power1.easeOut",
  //             duration: durationFade,
  //             delay: -durationFade,
  //           },
  //         ],
  //       },
  //       "<"
  //     );
  //   }
  // })();
  return (
    <section className="flex scene">
      <h1 className="header">
        <span>Powodzenia, Kasiu!</span>
      </h1>
      <div className="confetti"></div>
    </section>
  );
}
