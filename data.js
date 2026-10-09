/* ============================================================
   FILE KONFIGURASI — SEMUA YANG PERLU DIGANTI ADA DI SINI
   Ganti nama, tanggal lahir, teks, foto, dan lagu cukup dari
   file ini. Tidak perlu menyentuh file lain.
   ============================================================ */

const DATA = {
  // ---- Identitas ----
  nama: "Alliya Putri Ramadhani",
  namaPanggilan: "Alliya",
  tanggalLahir: "2004-10-10", // format: YYYY-MM-DD

  // ---- Musik latar ----
  // Taruh file mp3-nya di folder assets/audio/ dengan nama sama,
  // atau ubah path di bawah ini.
  audioSrc: "assets/audio/selamat-ulang-tahun.mp3",
  judulLagu: "Selamat Ulang Tahun — Jamrud",

  // ---- Layar pembuka (cover) ----
  cover: {
    sapaan: "Hai,",
    tombol: "Pencet dulu, yuk ✨",
    hint: "pake tws 0 rupiahnya dong biar backsoundnya kedengeran 🎧",
  },

  // ---- Ucapan utama ----
  intro: {
    judul: "Happy Birthday",
    subjudul: "happy birthday, sayang 🎂",
  },

  // ---- Sepucuk pesan (muncul baris per baris) ----
  surat: [
    "Hai, Alliya.",
    "Selamat ulang tahun, sayang. Makasih udah hadir dan bikin hari-hariku terasa lebih tenang dan berarti.",
    "Semoga di umur baru ini kamu panjang umur, sehat selalu, dan semua yang kamu mau pelan-pelan jadi kenyataan.",
    "Aku nggak minta yang muluk-muluk. Cukup kamu bahagia, aku udah ikut senang.",
    "Dan inget ya, aku bakal selalu ada. Happy birthday. 💛",
  ],

  // ---- Hal kecil yang bikin aku sayang kamu ----
  alasan: [
    "Cara kamu ketawa, jujur aja, nggak pernah bikin aku bosen.",
    "Kamu perhatian sama hal-hal kecil yang sering orang lain anggap remeh.",
    "Kamu selalu bisa bikin aku tenang, bahkan cuma lewat chat.",
    "Kamu kuat dan sabar, lebih dari yang kamu sadari.",
    "Bareng kamu, hal biasa aja rasanya jadi seru.",
    "Kamu percaya sama aku, dan itu artinya banyak banget.",
    "Kamu nggak berusaha jadi orang lain, dan aku suka kamu yang apa adanya.",
    "Dan alasan paling sederhana: karena kamu, ya kamu. 💛",
  ],

  // ---- Pesan manis (muncul acak tiap tombol ditekan) ----
  pesanManis: [
    "Kamu cantik, dan aku nggak pernah bohong soal itu.",
    "Aku bangga sama kamu, sama semua yang udah kamu lewatin.",
    "Jangan lupa makan, dan jangan terlalu keras sama diri sendiri ya.",
    "Kalau lagi capek, istirahat dulu. Aku di sini kok.",
    "Aku sayang kamu, hari ini lebih dari kemarin.",
    "Makasih udah jadi bagian terbaik dari hari-hariku.",
  ],

  // ---- Galeri foto ----
  // Ganti src dengan foto asli kamu (taruh di assets/images/,
  // atau pakai URL). caption = tulisan kecil di bawah foto.
  photos: [
    { src: "assets/images/foto-1.jpg", caption: "Kenangan #1" },
    { src: "assets/images/foto-2.jpg", caption: "Kenangan #2" },
    { src: "assets/images/foto-3.jpg", caption: "Kenangan #3" },
    { src: "assets/images/foto-4.jpg", caption: "Kenangan #4" },
    { src: "assets/images/foto-5.jpg", caption: "Kenangan #5" },
    { src: "assets/images/foto-6.jpg", caption: "Kenangan #6" },
  ],

  // ---- Pesan penutup ----
  penutup: {
    judul: "Makasih udah lahir ke dunia ini 💖",
    pesan:
      "Selamat ulang tahun, Alliya. Semoga tahun ini jadi salah satu tahun terbaik buat kamu — lebih banyak ketawa, lebih banyak hal baik, dan mimpi yang pelan-pelan jadi nyata.",
    tombol: "Ulangi Lagi 🔁",
  },
};
