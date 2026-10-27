# Runut — Lab Algoritma & Pemrograman

Demo: [runut-two.vercel.app](https://runut-two.vercel.app)

Website belajar interaktif untuk empat materi Algoritma & Pemrograman semester 1:

1. Konsep dasar algoritma
2. Logika pemrograman
3. Variabel, tipe data, dan operator
4. Pseudocode dan flowchart

Dibuat sebagai situs statis dengan HTML, CSS, dan JavaScript tanpa proses build, tanpa framework, dan tanpa runtime Python di browser. Isi diselaraskan dengan empat PDF pertemuan 1–4, termasuk tujuan dan peran algoritma, aturan pseudocode/flowchart, serta latihan terpadu variabel–operator untuk persiapan UTS.

## Menjalankan lokal di Termux

```sh
node serve.mjs
```

Buka `http://localhost:8000`. Untuk memakai port lain, jalankan misalnya `PORT=8080 node serve.mjs`. Seluruh aset, termasuk font, disajikan lokal dari folder `assets/fonts/` sehingga situs dapat berjalan sepenuhnya luring.

## Fitur

- Navigasi hash-routed: `#/`, `#/bab/1` sampai `#/bab/4`.
- Navigasi semua bab dan submateri tersedia lewat tombol **Materi** yang bisa dibuka/tutup: sidebar dapat dilipat di desktop dan tampil sebagai panel geser di layar kecil.
- Progres per bab dan per kuis yang disimpan di `localStorage` (`runut-progress-v1`); preferensi lipat sidebar disimpan terpisah (`runut-sidebar-collapsed-v1`).
- Simulasi terkontrol untuk urutan, input–proses–output, dekomposisi, pola, abstraksi, variabel, tipe data, operator, prioritas operator, pseudocode, simbol flowchart, seleksi, dan perulangan.
- Kontrol Putar/Jeda otomatis, Sebelumnya, Langkah berikutnya manual, Ulangi, dan tempo yang dapat dipilih pada simulasi langkah.
- Kuis campuran (pilihan ganda, isian, susun urutan) dengan petunjuk bertahap dan pembahasan setelah jawaban diperiksa.
- Latihan ala UTS: alur penyelesaian masalah pada Bab 1, penelusuran program belanja, identifikasi tipe data, dan evaluasi ekspresi logika pada Bab 3.
- Tata letak responsif, dukungan `prefers-reduced-motion`, dan fokus keyboard yang terlihat.

Simulasi sengaja dibatasi pada materi kurikulum. Situs ini tidak menjalankan kode Python sembarang dan tidak memuat Pyodide. Tujuannya agar setiap langkah yang ditampilkan dapat ditelusuri dan dijelaskan.

## Aksesibilitas

- Struktur halaman memakai landmark, hierarki heading, tautan lewati, dan label navigasi yang unik.
- Kuis pilihan ganda menggunakan pola radiogroup dengan navigasi panah, Home, dan End. Petunjuk serta umpan balik diumumkan melalui live region, dan fokus dipindahkan ke hasil setelah jawaban diperiksa.
- Tab simulasi memiliki panel terkait, navigasi keyboard, dan hanya tab aktif yang masuk urutan fokus.
- Tombol susun urutan punya nama aksesibel yang menyebut langkah dan posisinya; perubahan posisi diumumkan.
- Panel materi di layar kecil dapat ditutup dengan tombol Tutup, klik latar, atau tombol Escape; fokus keyboard terperangkap di dalam panel selama terbuka dan kembali ke tombol Materi setelah ditutup.
- Target sentuh diperbesar pada layar kecil, fokus keyboard terlihat termasuk pada umpan balik, dan animasi dinonaktifkan saat pengguna memilih `prefers-reduced-motion`.

## Struktur

- `index.html` — kerangka aplikasi, header, footer, dan pemuatan skrip.
- `css/style.css` — satu-satunya stylesheet kanonis.
- `js/content/bab1.js`–`bab4.js` — materi, kuis, dan rangkuman tiap bab.
- `js/content/helpers.js` — helper konten bersama.
- `js/app.js` — routing, render halaman, progres, kuis, dan interaksi umum.
- `js/runut-labs.js` — semua simulasi interaktif dan stepper bersama.
- `serve.mjs` — server statis lokal tanpa dependensi.
