/* ============================================================
   LOGIKA HALAMAN — baca konfigurasi dari DATA (di data.js)
   ============================================================ */

"use strict";

// ---------- Elemen ----------
const cover = document.getElementById("cover");
const openBtn = document.getElementById("open-btn");
const content = document.getElementById("content");
const musicToggle = document.getElementById("music-toggle");
const heartsBox = document.getElementById("hearts");

// ---------- MUSIK ----------
let audio = null;
let audioReady = false;

function setupAudio() {
  try {
    audio = new Audio(DATA.audioSrc);
    audio.loop = true;
    audio.volume = 0.5;
    audioReady = true;
  } catch (e) {
    audioReady = false;
  }
}

function playAudio() {
  if (!audioReady) return;
  audio.play().catch(() => {
    // file belum ada — abaikan, halaman tetap jalan tanpa lagu
  });
}

function toggleMusic() {
  if (!audioReady) return;
  if (audio.paused) {
    audio.play().catch(() => {});
    musicToggle.textContent = "🎵";
    musicToggle.classList.remove("muted");
  } else {
    audio.pause();
    musicToggle.textContent = "🔇";
    musicToggle.classList.add("muted");
  }
}

// ---------- BINTANG (canvas) ----------
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let shooting = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 4500);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      tw: Math.random() * 0.02 + 0.005,
    });
  }
}
initStars();

function spawnShootingStar() {
  shooting.push({
    x: Math.random() * canvas.width * 0.7 + canvas.width * 0.2,
    y: Math.random() * canvas.height * 0.3,
    len: 90,
    vx: -6,
    vy: 4,
    life: 1,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.a += s.tw;
    if (s.a > 1 || s.a < 0.2) s.tw *= -1;
    ctx.globalAlpha = s.a;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  // bintang jatuh
  for (let i = shooting.length - 1; i >= 0; i--) {
    const sh = shooting[i];
    sh.x += sh.vx;
    sh.y += sh.vy;
    sh.life -= 0.012;
    const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.len, sh.y + sh.len * 0.6);
    grad.addColorStop(0, `rgba(255,255,255,${Math.max(sh.life, 0)})`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.x - sh.len, sh.y + sh.len * 0.6);
    ctx.stroke();
    if (sh.life <= 0) shooting.splice(i, 1);
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
drawStars();
setInterval(spawnShootingStar, 4200);

// ---------- HATI MELAYANG ----------
// Pakai simbol teks (♥ ♡ ❤) supaya selalu tampil di semua perangkat,
// nggak bergantung pada font emoji.
const HEART_CHARS = ["♥", "♡", "❤"];
function spawnHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
  h.style.left = Math.random() * 100 + "%";
  h.style.fontSize = 12 + Math.random() * 20 + "px";
  h.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
  h.style.animationDuration = 6 + Math.random() * 8 + "s";
  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), 15000);
}
setInterval(spawnHeart, 900);

// ---------- BUKA KEJUTAN ----------
openBtn.addEventListener("click", () => {
  setupAudio();
  playAudio();

  cover.classList.add("leaving");
  setTimeout(() => {
    cover.classList.add("hidden");
    content.classList.remove("hidden");
    musicToggle.classList.remove("hidden");
  }, 900);

  // confetti pembuka
  if (window.confetti) {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff6b9d", "#ffd27d", "#a06bff", "#ffffff"],
    });
  }

  startIntroTyping();
  renderSurat();
  renderGallery();
  buildCake();
});

// ---------- INTRO: ketik nama ----------
function startIntroTyping() {
  document.getElementById("intro-sub").textContent = DATA.intro.subjudul;
  document.getElementById("intro-judul").textContent = DATA.intro.judul;

  const target = document.getElementById("nama-typed");
  const name = DATA.nama;
  // Nama dibiarkan melipat alami (tidak dipaksa satu baris) biar tetap
  // besar & terbaca di layar HP.
  let i = 0;
  target.textContent = "";
  const typing = setInterval(() => {
    target.textContent += name[i];
    i++;
    if (i >= name.length) clearInterval(typing);
  }, 120);
}

// ---------- USIA + COUNTDOWN ----------
function hitungUsia(lahirStr) {
  const lahir = new Date(lahirStr);
  const now = new Date();
  // Umur yang dirayakan TAHUN INI (bukan umur saat ini), supaya tetap tampil 22
  // walau halaman dibuka beberapa hari sebelum tanggal 10 Oktober.
  return now.getFullYear() - lahir.getFullYear();
}

function renderUsia() {
  const usia = hitungUsia(DATA.tanggalLahir);
  document.getElementById("usia-angka").textContent = usia;
  document.getElementById("age-note").textContent =
    `Selamat ulang tahun ke-${usia}, ${DATA.namaPanggilan}! 🥳`;
}

// ---------- SURAT ----------
function renderSurat() {
  const box = document.getElementById("surat-isi");
  box.innerHTML = "";
  DATA.surat.forEach((baris, idx) => {
    const p = document.createElement("p");
    p.textContent = baris;
    p.style.animationDelay = idx * 1.2 + "s";
    box.appendChild(p);
  });
}

// ---------- GALERI ----------
let curSlide = 0;
let slides = [];

function renderGallery() {
  const stage = document.getElementById("stage");
  const dots = document.getElementById("dots");
  stage.innerHTML = "";
  dots.innerHTML = "";

  slides = DATA.photos.map((f, idx) => {
    const div = document.createElement("div");
    div.className = "slide" + (idx === 0 ? " active" : "");
    const img = document.createElement("img");
    img.alt = f.caption || "Foto";
    img.src = f.src;
    img.onerror = () => {
      img.src = placeholderImage(idx + 1);
    };
    div.appendChild(img);
    stage.appendChild(div);

    const dot = document.createElement("span");
    dot.className = "dot" + (idx === 0 ? " active" : "");
    dot.addEventListener("click", () => goSlide(idx));
    dots.appendChild(dot);
    return div;
  });

  document.getElementById("foto-caption").textContent =
    DATA.photos[0].caption || "";
  goSlide(0);
}

function placeholderImage(n) {
  // SVG inline sebagai fallback bila foto asli belum ada
  const colors = ["ff6b9d,ff8fb3", "a06bff,d18fff", "ff9d6b,ffc28f", "5b8bff,8fb3ff", "ff5b8b,ff8f9d", "6bd1ff,9fe6ff"];
  const c = colors[(n - 1) % colors.length].split(",");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${c[0]}"/><stop offset="1" stop-color="#${c[1]}"/></linearGradient></defs><rect width="800" height="1000" fill="url(#g)"/><text x="400" y="500" font-size="96" text-anchor="middle" fill="rgba(255,255,255,0.95)">❤</text><text x="400" y="600" font-size="54" text-anchor="middle" fill="rgba(255,255,255,0.9)">FOTO ${n}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function goSlide(i) {
  curSlide = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle("active", idx === curSlide));
  const dots = document.querySelectorAll(".dot");
  dots.forEach((d, idx) => d.classList.toggle("active", idx === curSlide));
  const cap = DATA.photos[curSlide] ? DATA.photos[curSlide].caption : "";
  document.getElementById("foto-caption").textContent = cap;
}
document.getElementById("next").addEventListener("click", () => goSlide(curSlide + 1));
document.getElementById("prev").addEventListener("click", () => goSlide(curSlide - 1));

// ---------- KUE + LILIN ----------
function buildCake() {
  const holder = document.getElementById("candles");
  holder.innerHTML = "";
  const n = 5; // jumlah lilin, biar rapi di atas kue
  for (let i = 0; i < n; i++) {
    const candle = document.createElement("div");
    candle.className = "candle";
    const wick = document.createElement("div");
    wick.className = "wick";
    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(wick);
    candle.appendChild(flame);
    holder.appendChild(candle);
  }
}

document.getElementById("blow-btn").addEventListener("click", () => {
  const candles = document.querySelectorAll(".candle");
  candles.forEach((c) => c.classList.add("out"));
  if (window.confetti) {
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#ff6b9d", "#ffd27d", "#a06bff", "#ffffff"],
    });
  }
  document.getElementById("blow-hint").textContent = "permohonanmu pasti terkabul ✨";
});

// ---------- PENUTUP ----------
function renderPenutup() {
  document.getElementById("penutup-judul").textContent = DATA.penutup.judul;
  document.getElementById("penutup-pesan").textContent = DATA.penutup.pesan;
}
renderPenutup();

document.getElementById("replay-btn").addEventListener("click", () => {
  window.location.reload();
});

// ---------- REVEAL ON SCROLL ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("reveal");
        // isi usia dihitung saat pertama kali section usia terlihat
        if (e.target.id === "age") renderUsia();
      }
    });
  },
  { threshold: 0.25 }
);
document.querySelectorAll(".panel").forEach((p) => observer.observe(p));

// ---------- COVER (isi dari DATA) ----------
// Menyesuaikan ukuran font agar nama panjang tetap muat di satu baris.
function fitText(el, text, maxWidth) {
  el.textContent = text;
  el.style.whiteSpace = "nowrap";
  if (!maxWidth) maxWidth = window.innerWidth * 0.9;
  let size = 150;
  el.style.fontSize = size + "px";
  el.style.lineHeight = "1.15";
  while (el.scrollWidth > maxWidth && size > 22) {
    size -= 3;
    el.style.fontSize = size + "px";
  }
}

function initCover() {
  document.querySelector(".cover-sapaan").textContent = DATA.cover.sapaan;
  openBtn.textContent = DATA.cover.tombol;
  document.querySelector(".cover-hint").textContent = DATA.cover.hint;
  fitText(document.querySelector(".cover-nama"), DATA.nama);
}

// Ukur ulang setelah font selesai dimuat agar presisi.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    fitText(document.querySelector(".cover-nama"), DATA.nama);
  });
}
initCover();

// ---------- GLOBAL ----------
musicToggle.addEventListener("click", toggleMusic);

// ---------- ALASAN AKU SAYANG KAMU ----------
let reasonIdx = 0;
function setReason() {
  const text = document.getElementById("reason-text");
  const counter = document.getElementById("reason-counter");
  text.textContent = DATA.alasan[reasonIdx];
  counter.textContent = (reasonIdx + 1) + " / " + DATA.alasan.length;
  text.classList.remove("swap");
  void text.offsetWidth; // restart animasi
  text.classList.add("swap");
}
document.getElementById("reason-next").addEventListener("click", () => {
  reasonIdx = (reasonIdx + 1) % DATA.alasan.length;
  setReason();
});

// ---------- PESAN MANIS (acak) ----------
let noteIdx = -1;
function nextNote() {
  noteIdx = (noteIdx + 1) % DATA.pesanManis.length;
  const el = document.getElementById("note-text");
  el.textContent = DATA.pesanManis[noteIdx];
  el.classList.remove("swap");
  void el.offsetWidth;
  el.classList.add("swap");
}
document.getElementById("note-btn").addEventListener("click", nextNote);

// ---------- PELUK VIRTUAL ----------
document.getElementById("hug-btn").addEventListener("click", () => {
  const emoji = document.getElementById("hug-emoji");
  emoji.classList.remove("hug-pop");
  void emoji.offsetWidth;
  emoji.classList.add("hug-pop");
  document.getElementById("hug-text").textContent =
    "kamu dipeluk erat-erat sekarang 🤗💛";
  for (let i = 0; i < 14; i++) spawnHeart();
  if (window.confetti) {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff6b9d", "#ffd27d", "#ffffff"],
    });
  }
});

// ---------- INISIALISASI KONTEN BARU ----------
setReason();
