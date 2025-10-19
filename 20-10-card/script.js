// Cấu hình
const CORRECT_CODE = "2010";
const NEXT_URL = "page-2.html"; // 👉 đổi sang trang bạn muốn

const form = document.getElementById("code-form");
const input = document.getElementById("invite-code");
const wrap = document.querySelector(".code-input-wrap");
const error = document.querySelector(".code-error");

// Chỉ cho nhập số, tự chuyển khi đủ 4 ký tự
input.addEventListener("input", () => {
  input.value = input.value.replace(/\D/g, "").slice(0, 4);
  // auto-next khi đủ 4 số
  if (input.value.length === 4) {
    validateAndGo(input.value);
  } else {
    clearError();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateAndGo(input.value);
});

function validateAndGo(val) {
  if (val === CORRECT_CODE) {
    clearError();
    // hiệu ứng nhỏ trước khi chuyển trang
    wrap.classList.remove("invalid");
    setTimeout(() => {
      window.location.href = NEXT_URL;
    }, 120);
  } else {
    showError("Mã không đúng. Vui lòng thử lại.");
  }
}
function showError(msg) {
  error.textContent = msg;
  wrap.classList.add("invalid");
  input.focus();
  input.select();
}
function clearError() {
  error.textContent = "";
  wrap.classList.remove("invalid");
}

(function () {
  const track = document.getElementById("heroTrack");
  const slides = Array.from(track.children);
  const btnPrev = document.querySelector(".hero-btn.prev");
  const btnNext = document.querySelector(".hero-btn.next");
  const dotsWrap = document.getElementById("heroDots");

  // config
  const AUTOPLAY = true;
  const INTERVAL = 3800; // ms
  const PAUSE_ON_HOVER = true;

  let index = 0;
  let timer;

  // dots
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });

  function updateUI() {
    track.style.transform = `translateX(-${index * 100}%)`;
    Array.from(dotsWrap.children).forEach((d, i) => {
      d.classList.toggle("is-active", i === index);
    });
  }
  function go(i, user = false) {
    index = (i + slides.length) % slides.length;
    updateUI();
    if (user) restart();
  }
  function next() {
    go(index + 1);
  }
  function prev() {
    go(index - 1);
  }

  btnNext.addEventListener("click", () => go(index + 1, true));
  btnPrev.addEventListener("click", () => go(index - 1, true));

  // autoplay
  function start() {
    if (!AUTOPLAY || slides.length <= 1) return;
    timer = setInterval(next, INTERVAL);
  }
  function stop() {
    clearInterval(timer);
  }
  function restart() {
    stop();
    start();
  }

  // pause on hover
  if (PAUSE_ON_HOVER) {
    const frame = document.querySelector(".photo-frame.hero");
    frame.addEventListener("mouseenter", stop);
    frame.addEventListener("mouseleave", start);
  }

  // swipe (mobile)
  let sx = 0,
    dx = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      dx = 0;
      stop();
    },
    { passive: true }
  );
  track.addEventListener(
    "touchmove",
    (e) => {
      dx = e.touches[0].clientX - sx;
    },
    { passive: true }
  );
  track.addEventListener("touchend", () => {
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    start();
  });

  // init
  updateUI();
  start();
})();
