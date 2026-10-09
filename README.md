# 🎂 Happy Birthday — Untuk Alliya

Halaman web ucapan ulang tahun yang romantis, dibuat dengan **HTML + CSS + JavaScript murni** (tanpa build tools), siap di-deploy ke **GitHub Pages**.

## Cara jalanin lokal (opsional)

Cukup buka `index.html` di browser, atau jalankan server statis:

```bash
cd ulang-tahun
python -m http.server 8000
```

lalu buka `http://localhost:8000`.

## Struktur

```
ulang-tahun/
├── index.html      → halaman utama
├── style.css       → semua styling & animasi
├── script.js       → logika interaksi
├── data.js         → ⭐ SEMUA hal yang perlu diganti ada di sini
└── assets/
    ├── images/     → foto-foto (sekarang placeholder)
    └── audio/      → lagu backsound (isi mp3 kamu di sini)
```

## Cara ganti foto & lagu

Semua ada di **`data.js`**. Cukup edit satu file itu:

1. **Foto** — taruh foto asli di `assets/images/`, lalu ubah daftar `photos`:
   ```js
   photos: [
     { src: "assets/images/foto-1.jpg", caption: "caption kamu" },
     { src: "assets/images/foto-2.jpg", caption: "caption kamu" },
     // ...
   ],
   ```
2. **Lagu** — taruh file `selamat-ulang-tahun.mp3` di `assets/audio/` (nama bebas,
   sesuaikan `audioSrc` di `data.js`). Contoh: lagu "Selamat Ulang Tahun — Jamrud".
3. **Nama / tanggal lahir / teks** — semuanya di bagian atas `data.js`.

> ⚠️ Catatan hak cipta: lagu Jamrud dilindungi hak cipta. Untuk kejutan pribadi ini
> tidak masalah, tapi halaman GitHub Pages bersifat **publik** — siapa pun yang punya
> link bisa mengaksesnya.

## Deploy ke GitHub Pages

```bash
cd ulang-tahun
git init
git add .
git commit -m "Happy birthday Alliya 🎂"
git branch -M main
git remote add origin https://github.com/USERNAME/ulang-tahun.git
git push -u origin main
```

Lalu di GitHub: **Settings → Pages → Source: Deploy from a branch → branch `main`**.

Halaman bisa diakses di: `https://USERNAME.github.io/ulang-tahun/`

---

Dibuat dengan 💛 untuk Alliya.
