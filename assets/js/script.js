let lenis;
Splitting();
function ourProduct() {
  if (!document.querySelector(".our-product")) {
    return;
  }
  var swiperProduct = new Swiper(".swiper-our-product", {
    slidesPerView: "auto",
    speed: 600,
    pagination: {
      el: ".swiper-our-product .swiper-pagination",
      type: "progressbar",
    },
  });
}
function textAnimation() {
  const fxText = [
    ...document.querySelectorAll(
      ".animation-text[data-splitting][data-text-effect]"
    ),
  ];
  fxText.forEach((title) => {
    const chars = title.querySelectorAll(".char");

    chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));

    gsap.fromTo(
      chars,
      {
        scaleY: 0.1,
        scaleX: 1.8,
        filter: "blur(10px) brightness(50%)",
        willChange: "filter, transform",
      },
      {
        ease: "none",
        scaleY: 1,
        scaleX: 1,
        filter: "blur(0px) brightness(100%)",
        stagger: 0.05,
        scrollTrigger: {
          trigger: title,
          start: "center bottom",
          end: "bottom top+=50%",
          scrub: true,
          // markers: true,
        },
      }
    );
  });
}
function footer() {
  const footerElement = document.querySelector("footer");
  const footerTop = document.querySelector(".footer-top");
  const footerTopHeight = footerTop.offsetHeight;
  const footerOvl = document.querySelector(".footer-ovl");

  gsap.to("footer", {
    scrollTrigger: {
      trigger: "footer",
      start: "top top",
      end: () => `+=${footerTopHeight * 2}`,
      scrub: 1,
      pin: true,
      // markers: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress >= 0.6) {
          footerElement.classList.add("done");
        } else {
          footerElement.classList.remove("done");
        }
      },
    },
  });

  gsap.fromTo(
    footerOvl,
    {
      transform: "skewY(-30deg) translateY(-180%)",
    },
    {
      transform: "skewY(-30deg) translateY(100%)",
      scrollTrigger: {
        trigger: "footer",
        start: "top top",
        end: () => `+=${footerTopHeight * 2}`,
        scrub: 1,
        // markers: { startColor: "green", endColor: "red" }
      },
      ease: "none",
    }
  );

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  footer();
  textAnimation();
};
init();

$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
