const fireFrames = [
  "../Bilder/DörrPå.png",
  "../Bilder/Eld2.png",
  "../Bilder/Eld3.png",
  "../Bilder/Eld4.png",
  "../Bilder/Eld5.png",
  "../Bilder/Eld6.png",
  "../Bilder/Eld7.png",
  "../Bilder/Eld8.png"
];

let fireIndex = 0;
let fireInterval;
let isFirstHover = true;

const doorContainers = document.querySelectorAll(".door-container");
const rightImage = document.getElementById("right-image");

function startFireAnimation(doorContainer) {
  const fire = doorContainer.querySelector(".fire");
  const smoke = doorContainer.querySelector(".smoke");

  fire.style.display = "block";
  smoke.style.display = "none";
  fire.style.opacity = 1;
  smoke.style.opacity = 0;

  fireIndex = 0;
  fireInterval = setInterval(() => {
    fire.src = fireFrames[fireIndex];
    fireIndex = (fireIndex + 1) % fireFrames.length;
  }, 150);
}

function stopFireAnimation(doorContainer) {
  const fire = doorContainer.querySelector(".fire");
  const smoke = doorContainer.querySelector(".smoke");

  clearInterval(fireInterval);
  fire.style.opacity = 0;
  setTimeout(() => {
    smoke.style.display = "block";
    smoke.style.opacity = 1;
  }, 300);
}

doorContainers.forEach(doorContainer => {
  doorContainer.addEventListener("mouseenter", () => {
    startFireAnimation(doorContainer);

    if (window.innerWidth < 1200) {
      const doorRect = doorContainer.getBoundingClientRect();
      if (doorRect.left < window.innerWidth / 2) {
        rightImage.classList.remove("mirrored");
        rightImage.style.left = "auto";
        rightImage.style.right = "0";
      } else {
        rightImage.classList.add("mirrored");
        rightImage.style.right = "auto";
        rightImage.style.left = "0";
      }
    } else {
      rightImage.classList.remove("mirrored");
      rightImage.style.left = "auto";
      rightImage.style.right = "0";
    }
  });

  doorContainer.addEventListener("mouseleave", () => {
    stopFireAnimation(doorContainer);
  });

  doorContainer.addEventListener("click", (event) => {
    const redirectUrl = doorContainer.getAttribute("data-redirect");
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  });
});

function adjustLayout() {
  const container = document.querySelector(".container");
  const screenWidth = window.innerWidth;

  if (screenWidth <= 800) {
    container.style.gridTemplateColumns = "repeat(2, 1fr)";
    container.style.gridTemplateRows = "auto auto auto";
  } else if (screenWidth <= 1200) {
    container.style.gridTemplateColumns = "repeat(2, 1fr)";
    container.style.gridTemplateRows = "auto auto";
  } else {
    container.style.gridTemplateColumns = "repeat(3, 1fr)";
    container.style.gridTemplateRows = "auto auto";
  }
}

window.addEventListener("load", adjustLayout);
window.addEventListener("resize", adjustLayout);
