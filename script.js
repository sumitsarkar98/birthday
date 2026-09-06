// =============================================
// COUNTDOWN LOGIC
// =============================================

const countdownOverlay = document.getElementById("countdownOverlay");
const countdownNumber = document.getElementById("countdownNumber");
const ringProgress = document.getElementById("ringProgress");
const specialReveal = document.getElementById("specialReveal");
const mainPage = document.getElementById("mainPage");
const exploreBtn = document.getElementById("exploreBtn");
const wishButton = document.getElementById("wishButton");
const confettiContainer = document.getElementById("confetti-container");
const wishMessage = document.getElementById("wishMessage");
const CIRCUMFERENCE = 339.292;
let currentCount = 10;

// Create floating particles for countdown
function createCountdownParticles() {
  const container = document.getElementById("countdownParticles");
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.classList.add("countdown-particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 3 + "s";
    particle.style.animationDuration = Math.random() * 2 + 2 + "s";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

// Create sparkles for reveal page
function createSparkles() {
  const container = document.getElementById("revealSparkles");
  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 2 + "s";
    sparkle.style.animationDuration = Math.random() * 2 + 1.5 + "s";
    const size = Math.random() * 5 + 3;
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";
    const colors = ["#ffd166", "#ff4f81", "#9b5de5", "#ffffff", "#ff6b6b"];
    sparkle.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(sparkle);
  }
}

// Countdown tick
function tickCountdown() {
  if (currentCount < 0) return;

  countdownNumber.textContent = currentCount;
  countdownNumber.classList.remove("tick");
  void countdownNumber.offsetWidth;
  countdownNumber.classList.add("tick");

  const progress = (10 - currentCount) / 10;
  ringProgress.style.strokeDashoffset = CIRCUMFERENCE * progress;

  if (currentCount <= 3) {
    countdownNumber.style.filter = "drop-shadow(0 0 40px rgba(255,79,129,0.8))";
  }

  if (currentCount === 0) {
    setTimeout(() => {
      countdownOverlay.classList.add("hidden");
      setTimeout(() => {
        specialReveal.classList.add("active");
        createSparkles();
      }, 400);
    }, 500);
    return;
  }

  currentCount--;
  setTimeout(tickCountdown, 1000);
}

createCountdownParticles();
ringProgress.style.strokeDasharray = CIRCUMFERENCE;
ringProgress.style.strokeDashoffset = 0;
setTimeout(tickCountdown, 500);

// =============================================
// EXPLORE BUTTON
// =============================================

exploreBtn.addEventListener("click", () => {
  specialReveal.classList.add("hidden");
  setTimeout(() => {
    mainPage.classList.add("active");
    createConfetti(100);
  }, 500);
});

// =============================================
// WISH BUTTON (Main Page)
// =============================================

wishButton.addEventListener("click", () => {
  const flame = document.querySelector(".main-page .flame");
  const smoke = document.querySelector(".main-page .smoke");

  if (flame) {
    flame.style.opacity = "0";
    flame.style.transform = "scale(0)";
  }

  setTimeout(() => {
    if (smoke) smoke.classList.add("active");
  }, 150);

  wishMessage.classList.add("show");
  wishButton.textContent = "🎂 Happy Birthday!";
  createConfetti(150);

  // Show love letter icon after a delay
  setTimeout(() => {
    document.getElementById("loveLetter").classList.add("show");
  }, 1500);
});

// =============================================
// LOVE LETTER TOGGLE
// =============================================

const letterIcon = document.getElementById("letterIcon");
const letterOverlay = document.getElementById("letterOverlay");
const letterCard = document.getElementById("letterCard");

letterIcon.addEventListener("click", () => {
  letterOverlay.classList.add("open");
});

letterOverlay.addEventListener("click", (e) => {
  if (
    e.target === letterOverlay ||
    e.target === letterCard ||
    letterCard.contains(e.target)
  ) {
    letterOverlay.classList.remove("open");
  }
});

// =============================================
// CONFETTI
// =============================================

function createConfetti(amount) {
  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";

    const size = Math.random() * 8 + 5;
    confetti.style.width = size + "px";
    confetti.style.height = size * 1.5 + "px";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.animationDelay = Math.random() * 0.8 + "s";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    const colors = [
      "#ff4f81",
      "#ffd166",
      "#9b5de5",
      "#4361ee",
      "#ff6b6b",
      "#48c9b0",
      "#f7dc6f",
      "#ffffff",
    ];
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    const shapes = ["2px", "50%", "0"];
    confetti.style.borderRadius =
      shapes[Math.floor(Math.random() * shapes.length)];

    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
  }
}
