function drawCircles() {
  document.addEventListener("DOMContentLoaded", () => {
    let productImg = document.querySelector(".process__front");
    const processBack = document.querySelector(".process__back");
    const contentFront = document.querySelector(".process__front--content");
    let clickCount = 0;

    // Initially hide the wrapper
    processBack.style.opacity = "0";
    processBack.style.visibility = "hidden";
    processBack.style.transition = "opacity 0.5s ease";

    productImg.addEventListener("click", () => {
      clickCount++;

      if (clickCount % 2 === 1) {
        // Reset all elements before running animation
        const items = document.querySelectorAll(".process__item");
        const circle = document.querySelector(".progress-circle");
        const paths = document.querySelectorAll(".progress-path");
        const radiusDefault = 245;
        const circumference = 2 * Math.PI * radiusDefault;
        contentFront.classList.add("none-content");
        // Reset circle
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        circle.style.transition = ""; // Reset transition

        // Reset paths
        paths.forEach((path) => {
          path.style.opacity = "0";
          path.style.strokeDashoffset = "1000"; // Giá trị lớn để ẩn
          path.style.transition = "";
        });

        // Reset items
        items.forEach((item) => {
          item.style.opacity = "0";
          item.style.transition = "";
        });

        // Show wrapper and run animation
        processBack.style.opacity = "1";
        processBack.style.visibility = "visible";

        const totalItems = 10;
        const angleStep = 360 / totalItems;
        const startAngle = 123;

        items.forEach((item, index) => {
          const angleDeg = startAngle + index * angleStep;
          const dataIndex = parseInt(item.getAttribute("data-index")) || index;
          let radius = radiusDefault;

          switch (dataIndex) {
            case 2:
              radius = 290;
              break;
            case 3:
              radius = 260;
              break;
            case 5:
            case 6:
              radius = 270;
              break;
          }

          item.style.left = "50%";
          item.style.top = "50%";
          item.style.transform = `translate(-50%, -50%) 
                                        rotate(${angleDeg}deg) 
                                        translate(${radius}px, 0) 
                                        rotate(${-angleDeg}deg)`;

          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transition = "opacity 0.2s ease";

            const progress = (index + 1) / totalItems;
            const offset = circumference * (1 - progress);
            circle.style.transition = "stroke-dashoffset 0.8s ease";
            circle.style.strokeDashoffset = offset;

            paths.forEach((path) => {
              const pathIndex = parseInt(path.getAttribute("data-index"));
              if (pathIndex === dataIndex) {
                path.style.opacity = "1";
                path.style.transition = "stroke-dashoffset 0.8s ease";
                path.style.strokeDashoffset = "0";
              }
            });
          }, index * 400);
        });
      } else {
        // Simply hide the wrapper
        contentFront.classList.remove("none-content");
        processBack.style.opacity = "0";
        setTimeout(() => {
          processBack.style.visibility = "hidden";
        }, 500);
      }
    });
  });
}
function hoverImgChangeCursor() {
  const imgWrapper = document.querySelector(".process__front .both");
  let processFrontImg = document.querySelector(".process__front");
  const button = imgWrapper.querySelector(".button-discover");

  // Set initial text explicitly
  button.textContent = "discover";
  let isDiscover = true; // Track the current state

  imgWrapper.addEventListener("mousemove", (e) => {
    const rect = imgWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // console.log(x, y);
    imgWrapper.style.setProperty("--circle-x", `${x - 40}px`);
    imgWrapper.style.setProperty("--circle-y", `${y - 40}px`);
  });

  processFrontImg.addEventListener("click", () => {
    button.classList.add("zoom");

    // Toggle text using boolean state
    if (isDiscover) {
      button.textContent = "close";
      isDiscover = false;
    } else {
      button.textContent = "discover";
      isDiscover = true;
    }

    setTimeout(() => {
      button.classList.remove("zoom");
    }, 400);
  });
}
hoverImgChangeCursor();
drawCircles();
