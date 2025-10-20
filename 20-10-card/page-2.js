const startBtn = document.getElementById('startBtn');
const textBox  = document.getElementById('letterText');
const signBox  = document.getElementById('signature');

// Nội dung thư
const LETTER = [
  "Nhân ngày 20/10, chúc em yêu của anh luôn ngập tràn niềm vui, hạnh phúc và rạng rỡ như những đóa hoa xinh đẹp nhất.",
  "Dù cho cuộc sống có khó khăn hãy cứ tự tin và tỏa sáng theo cách riêng của em nhé.",
  "Hành trình phía trước còn rất dài anh mong chúng ta sẽ luôn có nhau.",
  "Mỗi khi tâm trạng của em không tốt, hãy gửi cho anh một tin nhắn. Mỗi khi có chuyện gì đó xảy tới với em, anh sẽ luôn lắng nghe và đồng hành cùng em.",
  "Sự ấm áp mà thế giới này nợ em, anh sẽ dành cho em.",
    "Chúc mừng ngày phụ nữ Việt Nam, yêu em."
];
const SIGN = "From Hiếu Phệ";

let playing = false;

startBtn.addEventListener('click', () => {
  if (playing) return;
  playing = true;
  startBtn.classList.add('fade-out');
  setTimeout(() => startBtn.remove(), 400);
  showLetter();
});

function showLetter() {
  textBox.innerHTML = '';
  let delay = 0;

  LETTER.forEach((line, i) => {
    const p = document.createElement('p');
    p.textContent = line;
    p.className = 'fade-line';
    textBox.appendChild(p);
    setTimeout(() => p.classList.add('visible'), delay);
    delay += 2200; // khoảng cách thời gian giữa các dòng
  });

  // xuất hiện chữ ký sau cùng
  setTimeout(() => {
    signBox.textContent = SIGN;
    signBox.classList.add('visible');
  }, delay + 1000);
}