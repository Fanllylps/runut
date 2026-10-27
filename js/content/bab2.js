(function () {
  'use strict';
  const { codeBlock, note, practice } = window.RUNUT.helpers;

  window.RUNUT.chapters.push({
    id: 'bab-2',
    number: '02',
    slug: 'logika',
    title: 'Logika pemrograman',
    heroTitle: 'Pecah masalahnya sebelum menulis kodenya.',
    shortTitle: 'Logika pemrograman',
    summary: 'Latih cara berpikir komputasional: pecah masalah besar, temukan pola, fokus pada informasi penting, lalu susun tahapan penyelesaian.',
    themeClass: 'theme-lilac',
    accent: '#c8bdff',
    duration: '± 28 menit',
    level: 'Cara berpikir',
    goals: [
      'Menjelaskan logika pemrograman dan tiga pola kendali.',
      'Menerapkan dekomposisi pada masalah yang kompleks.',
      'Menemukan pola dan memilih informasi yang relevan.',
      'Menelusuri lima tahap penyelesaian masalah.'
    ],
    sections: [
      {
        id: 'logika',
        navTitle: 'Logika pemrograman',
        title: 'Sebelum menulis kode, tentukan bagaimana alurnya.',
        lead: 'Komputer menjalankan instruksi dengan patuh, tetapi tidak bisa menebak maksudmu. Logika pemrograman adalah cara menyusun maksud itu menjadi alur yang jelas.',
        minutes: '5 menit',
        html: `
          <p><strong>Logika pemrograman</strong> adalah dasar cara berpikir untuk menyusun langkah pemecahan masalah secara runtut dan sistematis sebelum diterjemahkan menjadi kode. Fokusnya bukan simbol bahasa, melainkan hubungan antar-langkah.</p>

          <p>Hampir semua alur program dapat dibangun dari tiga pola kendali. Kamu tidak perlu menghafal istilah Inggrisnya; pahami dulu perilakunya.</p>

          <div class="control-grid">
            <article class="control-item">
              <span class="control-number">01</span>
              <div class="control-glyph" aria-hidden="true">A → B → C</div>
              <h3>Sequence / urutan</h3>
              <p>Instruksi dijalankan satu demi satu sesuai urutan.</p>
              <small>Contoh: buka aplikasi → isi data → kirim formulir.</small>
            </article>
            <article class="control-item">
              <span class="control-number">02</span>
              <div class="control-glyph control-branch" aria-hidden="true"><span>?</span><span>↙ &nbsp; ↘</span></div>
              <h3>Selection / pilihan</h3>
              <p>Alur memilih tindakan berdasarkan kondisi benar atau salah.</p>
              <small>Contoh: jika kata sandi benar → masuk; jika tidak → tampilkan pesan.</small>
            </article>
            <article class="control-item">
              <span class="control-number">03</span>
              <div class="control-glyph" aria-hidden="true">↻ × N</div>
              <h3>Repetition / pengulangan</h3>
              <p>Langkah dijalankan lagi selama syaratnya masih terpenuhi.</p>
              <small>Contoh: selama pengguna belum berhasil masuk, minta kata sandi lagi.</small>
            </article>
          </div>

          <p>Ketiga pola ini akan muncul lagi saat kita menggambar flowchart di Bab 04. Untuk sekarang, perhatikan bahwa logika yang salah tidak bisa diselamatkan oleh kode yang rapi. Program bisa berjalan tanpa pesan error, tetapi tetap memberi hasil yang keliru.</p>

          ${note('Kesalahan logika', '<p>Menulis <code>harga + jumlah</code> saat seharusnya <code>harga * jumlah</code> dapat menghasilkan program yang “berhasil berjalan” tetapi salah secara makna. Inilah alasan kita merancang dan menguji logika, bukan hanya sintaks.</p>', 'warning')}

          ${practice('Rancang alur login', '<p>Tulis urutan dan satu keputusan untuk proses login aplikasi. Tentukan juga apa yang terjadi jika data kosong.</p>', '<p>Contoh: buka halaman login → baca email dan kata sandi → jika ada kolom kosong, tampilkan pesan → jika terisi, periksa kecocokan → jika cocok tampilkan beranda, jika tidak tampilkan pesan gagal. Urutan membaca dan memeriksa adalah bagian dari logika.</p>')}
        `,
        check: {
          question: 'Alur “selama jawaban belum benar, minta jawaban lagi” adalah contoh…',
          hint: 'Perhatikan kata “selama”.',
          options: ['Sequence.', 'Selection.', 'Repetition.'],
          answer: 2,
          explanation: 'Pengulangan (repetition) menjalankan langkah yang sama selama kondisi tertentu masih terpenuhi.'
        }
      },
      {
        id: 'computational-thinking',
        navTitle: 'Computational thinking',
        title: 'Empat lensa untuk menghadapi masalah besar.',
        lead: 'Computational thinking adalah proses merumuskan masalah dan solusinya agar dapat dijalankan secara efektif oleh manusia maupun komputer.',
        minutes: '7 menit',
        html: `
          <p>Ketika masalah terasa terlalu besar, jangan langsung menulis kode. Lihat masalah itu melalui empat lensa: pecah, cari pola, abstraksi, lalu susun langkah.</p>

          <div class="pillar-list">
            <div class="pillar"><span class="pillar-index">1</span><div><h3>Dekomposisi</h3><p>Memecah masalah besar menjadi bagian kecil yang lebih mudah dikelola.</p></div><span class="pillar-icon" aria-hidden="true">A / B / C</span></div>
            <div class="pillar"><span class="pillar-index">2</span><div><h3>Pengenalan pola</h3><p>Mencari kemiripan atau aturan yang berulang di antara bagian masalah.</p></div><span class="pillar-icon" aria-hidden="true">↻ ↻</span></div>
            <div class="pillar"><span class="pillar-index">3</span><div><h3>Abstraksi</h3><p>Fokus pada informasi yang relevan dan mengabaikan detail yang tidak perlu.</p></div><span class="pillar-icon" aria-hidden="true">[ penting ]</span></div>
            <div class="pillar"><span class="pillar-index">4</span><div><h3>Penyusunan algoritma</h3><p>Menggabungkan hasilnya menjadi langkah yang runtut dan dapat dijalankan.</p></div><span class="pillar-icon" aria-hidden="true">01 → 02</span></div>
          </div>

          <h3 class="subhead">Dekomposisi: satu pesanan, empat pekerjaan.</h3>
          <p>Fitur pemesanan makanan tidak dibuat sebagai satu blok raksasa. Ia dapat dipecah menjadi bagian yang masing-masing punya tujuan, input, dan hasil sendiri.</p>

          <div class="lab" data-lab="decomposition">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 01 · dekomposisi</span>
                <h3>Pecah masalah menjadi bagian yang bisa dikerjakan.</h3>
                <p>Mulai dari masalah utuh, pecah, lalu periksa pekerjaan kecil di dalamnya.</p>
              </div>
              <span class="lab-status" data-decomposition-status>Masih utuh</span>
            </div>
            <div class="lab-body">
              <div class="decomposition-stage is-collapsed" data-decomposition-stage>
                <div class="decomposition-root">
                  <span class="node-label">Masalah utama</span>
                  <strong>Pesan makanan lewat aplikasi</strong>
                  <small>Tujuan: pesanan tercatat dan dibayar dengan benar.</small>
                </div>
                <div class="decomposition-stem" aria-hidden="true"></div>
                <div class="decomposition-parts" data-decomposition-parts>
                  <button type="button" class="decomposition-part" data-decomposition-part="menu"><span>01</span><strong>Pilih menu</strong><small>Menu, jumlah, catatan</small></button>
                  <button type="button" class="decomposition-part" data-decomposition-part="address"><span>02</span><strong>Isi alamat</strong><small>Lokasi dan waktu kirim</small></button>
                  <button type="button" class="decomposition-part" data-decomposition-part="payment"><span>03</span><strong>Hitung total</strong><small>Subtotal, ongkir, diskon</small></button>
                  <button type="button" class="decomposition-part" data-decomposition-part="confirm"><span>04</span><strong>Bayar &amp; konfirmasi</strong><small>Metode dan status pesanan</small></button>
                </div>
                <div class="decomposition-detail" data-decomposition-detail aria-live="polite">
                  <span class="block-label">Pilih satu bagian</span>
                  <p>Setelah dipecah, klik salah satu pekerjaan untuk melihat data yang dibutuhkan dan hasilnya.</p>
                </div>
              </div>
            </div>
            <div class="lab-controls">
              <button type="button" class="btn btn-small btn-dark" data-decomposition-toggle>Pecah masalah <span aria-hidden="true">↘</span></button>
              <button type="button" class="btn-small btn-text" data-decomposition-reset>Satukan lagi</button>
            </div>
          </div>

          <p>Dalam pemrograman, hasil dekomposisi sering menjadi <strong>fungsi</strong> atau modul kecil. Masing-masing menangani satu tugas sehingga lebih mudah ditulis, diuji, dan diperbaiki.</p>

          ${codeBlock('bayangan struktur program', 'Rencana fungsi', `pilih_menu()
isi_alamat()
hitung_total()
bayar_dan_konfirmasi()`, 'Ini belum kode Python yang lengkap. Ini menunjukkan bagaimana satu masalah besar dapat dibagi menjadi tanggung jawab kecil.')}

          ${note('Batas dekomposisi', '<p>Pecah sampai masing-masing bagian cukup kecil untuk dipahami, tetapi tetap memiliki tujuan yang jelas. Memecah terlalu jauh tanpa alasan justru menambah kerumitan.</p>', 'tip')}

          ${practice('Pecah tugas lain', '<p>Ambil aktivitas “membuat presentasi kelompok”. Pecah menjadi empat bagian yang masing-masing bisa diselesaikan dan diperiksa.</p>', '<p>Contoh: menentukan pesan utama, mengumpulkan bahan, menyusun slide, lalu latihan dan memeriksa waktu. Setiap bagian punya output yang bisa dinilai.</p>')}
        `,
        check: {
          question: 'Tim membagi fitur checkout menjadi subbagian: memilih menu, mengisi alamat, dan memilih pembayaran. Teknik berpikir yang dipakai adalah…',
          hint: 'Mereka tidak menyelesaikan semuanya sekaligus.',
          options: ['Pengenalan pola.', 'Dekomposisi.', 'Abstraksi.'],
          answer: 1,
          explanation: 'Dekomposisi memecah masalah besar menjadi bagian kecil yang lebih spesifik dan mudah dikelola.'
        }
      },
      {
        id: 'pola',
        navTitle: 'Pengenalan pola',
        title: 'Lihat kemiripan, hemat langkah.',
        lead: 'Pengenalan pola berarti menemukan susunan atau aturan yang muncul berulang. Pola yang sama sering bisa diselesaikan dengan satu fungsi atau satu aturan.',
        minutes: '5 menit',
        html: `
          <p>Tiga aplikasi yang berbeda bisa memiliki pola transaksi yang serupa. Setelah pola ditemukan, kita tidak perlu merancang solusi dari nol setiap kali.</p>

          <div class="lab" data-lab="pattern">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 02 · pengenalan pola</span>
                <h3>Temukan langkah yang berulang di tiga layanan.</h3>
                <p>Baca alurnya, lalu hubungkan bagian yang punya peran sama.</p>
              </div>
              <span class="lab-status">Analisis pola</span>
            </div>
            <div class="lab-body">
              <div class="pattern-cases" data-pattern-cases>
                <article class="pattern-case">
                  <div class="pattern-case-head"><span>01</span><h3>Pesan makanan</h3><small>aplikasi kuliner</small></div>
                  <ol class="pattern-steps">
                    <li data-pattern-part="select"><span>Pilih menu</span><small>item yang dibeli</small></li>
                    <li data-pattern-part="total"><span>Hitung subtotal</span><small>harga × jumlah</small></li>
                    <li data-pattern-part="rule"><span>Cek promo ≥ Rp50.000</span><small>aturan diskon</small></li>
                    <li data-pattern-part="pay"><span>Bayar</span><small>selesaikan transaksi</small></li>
                  </ol>
                </article>
                <article class="pattern-case">
                  <div class="pattern-case-head"><span>02</span><h3>Pesan tiket</h3><small>aplikasi perjalanan</small></div>
                  <ol class="pattern-steps">
                    <li data-pattern-part="select"><span>Pilih jadwal</span><small>item yang dibeli</small></li>
                    <li data-pattern-part="total"><span>Hitung harga tiket</span><small>harga × jumlah</small></li>
                    <li data-pattern-part="rule"><span>Cek promo ≥ Rp50.000</span><small>aturan diskon</small></li>
                    <li data-pattern-part="pay"><span>Bayar</span><small>selesaikan transaksi</small></li>
                  </ol>
                </article>
                <article class="pattern-case">
                  <div class="pattern-case-head"><span>03</span><h3>Pesan transportasi</h3><small>aplikasi ojek daring</small></div>
                  <ol class="pattern-steps">
                    <li data-pattern-part="select"><span>Pilih rute</span><small>layanan yang dipakai</small></li>
                    <li data-pattern-part="total"><span>Hitung tarif</span><small>jarak × tarif</small></li>
                    <li data-pattern-part="rule"><span>Cek promo ≥ Rp50.000</span><small>aturan diskon</small></li>
                    <li data-pattern-part="pay"><span>Bayar</span><small>selesaikan transaksi</small></li>
                  </ol>
                </article>
              </div>
              <div class="pattern-controls">
                <button type="button" class="btn btn-small btn-dark" data-pattern-reveal>Temukan pola <span aria-hidden="true">↘</span></button>
                <button type="button" class="btn-small btn-text" data-pattern-reset>Bersihkan sorotan</button>
              </div>
              <div class="pattern-finding" data-pattern-finding hidden>
                <span class="block-label">Pola yang sama</span>
                <p><strong>Pilih item → hitung nilai → periksa aturan yang sama → bayar.</strong> Bagian “hitung nilai” dapat dibuat sebagai satu fungsi yang menerima harga dan jumlah, sedangkan aturan diskon dapat menjadi parameter.</p>
              </div>
            </div>
          </div>

          <p>Pola tidak selalu berupa angka berurutan. Dalam pemrograman, pola juga bisa berupa struktur keputusan yang berulang, bentuk input yang sama, atau cara pengguna menyelesaikan tugas. Mengenali pola membuat solusi lebih <strong>konsisten</strong> dan tidak berulang-ulang ditulis.</p>

          ${note('Hati-hati menyimpulkan pola', '<p>Dua data yang mirip belum tentu memiliki aturan yang sama. Uji pola dengan contoh baru sebelum menganggapnya benar.</p>', 'warning')}

          ${practice('Cari pola pada rutinitasmu', '<p>Amati tiga kegiatanmu minggu ini—misalnya bangun pagi, berangkat kuliah, dan belajar malam. Bagian mana yang selalu berulang dengan urutan serupa?</p>', '<p>Contoh: semua kegiatan dimulai dengan menyiapkan kebutuhan, melakukan aktivitas utama, lalu memeriksa hasil. Pola ini bisa dijadikan checklist yang sama dengan isi berbeda.</p>')}
        `,
        check: {
          question: 'Semua contoh memiliki urutan “pilih item → hitung nilai → periksa promo → bayar”. Bagian mana yang paling mungkin dibuat sebagai satu fungsi yang dipakai ulang?',
          hint: 'Cari bagian yang memiliki tujuan sama meskipun isi datanya berbeda.',
          options: [
            'Nama aplikasinya.',
            'Proses menghitung nilai dan memeriksa aturan promo.',
            'Warna tombol pada setiap aplikasi.'
          ],
          answer: 1,
          explanation: 'Perhitungan dan aturan promo memiliki struktur yang sama di ketiga kasus. Bagian yang sama dapat dibuat sebagai fungsi dengan input yang berbeda.'
        }
      },
      {
        id: 'abstraksi',
        navTitle: 'Abstraksi',
        title: 'Fokus pada detail yang mengubah solusi.',
        lead: 'Abstraksi adalah kemampuan memilih informasi relevan dan mengabaikan detail yang tidak diperlukan untuk tujuan tertentu.',
        minutes: '5 menit',
        html: `
          <p>Peta kereta tidak menggambar setiap gedung di sekitar rel. Peta itu hanya menampilkan stasiun dan jalur karena penumpang membutuhkan urutan perjalanan, bukan bentuk jalan yang sebenarnya. Itulah abstraksi.</p>

          <div class="lab" data-lab="abstraction">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 03 · abstraksi</span>
                <h3>Tujuan: memperkirakan waktu tiba.</h3>
                <p>Bandingkan data mentah yang tersedia dengan data yang benar-benar dibutuhkan.</p>
              </div>
              <span class="lab-status" data-abstraction-status>Data mentah</span>
            </div>
            <div class="lab-body">
              <div class="abstraction-purpose"><span class="block-label">Tujuan analisis</span><strong>Perkirakan waktu tiba pengendara di lokasi.</strong></div>
              <div class="abstract-list" data-abstract-list>
                <div class="abstract-row is-relevant" data-abstract-relevant="true"><span class="abstract-icon">↔</span><div><strong>Jarak perjalanan</strong><small>3,2 km</small></div><span class="abstract-tag">relevan</span><span class="abstract-reason">Mempengaruhi waktu tempuh.</span></div>
                <div class="abstract-row is-relevant" data-abstract-relevant="true"><span class="abstract-icon">≈</span><div><strong>Kondisi lalu lintas</strong><small>padat</small></div><span class="abstract-tag">relevan</span><span class="abstract-reason">Mengubah kecepatan rata-rata.</span></div>
                <div class="abstract-row is-relevant" data-abstract-relevant="true"><span class="abstract-icon">⌁</span><div><strong>Kecepatan rata-rata</strong><small>24 km/jam</small></div><span class="abstract-tag">relevan</span><span class="abstract-reason">Dibutuhkan untuk estimasi.</span></div>
                <div class="abstract-row" data-abstract-relevant="false"><span class="abstract-icon">◌</span><div><strong>Nama pengendara</strong><small>Ari</small></div><span class="abstract-tag">bisa diabaikan</span><span class="abstract-reason">Tidak mengubah waktu tiba.</span></div>
                <div class="abstract-row" data-abstract-relevant="false"><span class="abstract-icon">◌</span><div><strong>Warna kendaraan</strong><small>biru</small></div><span class="abstract-tag">bisa diabaikan</span><span class="abstract-reason">Tidak dipakai dalam hitungan.</span></div>
                <div class="abstract-row" data-abstract-relevant="false"><span class="abstract-icon">◌</span><div><strong>Daftar lagu</strong><small>playlist pagi</small></div><span class="abstract-tag">bisa diabaikan</span><span class="abstract-reason">Tidak terkait estimasi.</span></div>
              </div>
              <div class="lab-controls">
                <button type="button" class="btn btn-small btn-quiet is-active" data-abstraction-mode="raw" aria-pressed="true">Lihat semua data</button>
                <button type="button" class="btn btn-small btn-dark" data-abstraction-mode="focus" aria-pressed="false">Terapkan abstraksi</button>
              </div>
              <div class="lab-caption" data-abstraction-caption aria-live="polite">
                <span class="caption-mark">i</span>
                <p>Belum ada detail yang diabaikan. Tekan “Terapkan abstraksi” untuk berfokus pada informasi yang relevan.</p>
              </div>
            </div>
          </div>

          <p>Dalam pemrograman, abstraksi muncul ketika kita memakai <strong>variabel</strong> untuk menyebut nilai tanpa peduli asalnya, atau memanggil <strong>fungsi</strong> tanpa harus menulis ulang seluruh isi fungsinya. Pengguna fungsi cukup tahu input dan outputnya.</p>

          ${note('Abstraksi bukan mengabaikan semua detail', '<p>Detail yang diabaikan harus dipilih berdasarkan tujuan. Untuk memperkirakan waktu tiba, warna mobil tidak relevan. Untuk mendeteksi kendaraan yang salah, warna bisa menjadi informasi penting.</p>', 'edge')}

          ${practice('Pilih informasi untuk resep', '<p>Jika kamu membuat aplikasi yang mencari resep berdasarkan bahan di rumah, data mana yang penting dari sebuah resep? Data mana yang bisa diabaikan?</p>', '<p>Penting: nama bahan, jumlah, waktu memasak, dan tingkat kesulitan. Bisa diabaikan: warna mangkuk penyajian atau nama merek peralatan dapur, kecuali kamu secara khusus mencari peralatan.</p>')}
        `,
        check: {
          question: 'Untuk menghitung biaya perjalanan, informasi mana yang paling relevan?',
          hint: 'Cari data yang benar-benar masuk ke rumus biaya.',
          options: [
            'Jarak perjalanan dan tarif per kilometer.',
            'Warna mobil dan nomor polisi.',
            'Nama musik yang diputar selama perjalanan.'
          ],
          answer: 0,
          explanation: 'Abstraksi berfokus pada data yang mempengaruhi hasil. Biaya perjalanan dihitung dari jarak dan tarif, bukan warna atau playlist.'
        }
      },
      {
        id: 'tahapan',
        navTitle: 'Tahapan & studi kasus',
        title: 'Pahami, rancang, tulis, uji, dokumentasikan.',
        lead: 'Penyelesaian masalah pemrograman bukan lompatan dari soal ke kode. Ada lima tahap yang dapat diulang saat ada kesalahan.',
        minutes: '7 menit',
        html: `
          <p>Tekan langkah demi langkah untuk melihat perubahan bentuk solusi. Contohnya: menentukan apakah sebuah bilangan bulat masuk kategori genap atau ganjil.</p>

          <div class="lab" data-lab="stages">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 04 · proses penyelesaian</span>
                <h3>Dari masalah kosong menjadi solusi yang teruji.</h3>
                <p>Setiap tahap menghasilkan sesuatu yang bisa dipakai di tahap berikutnya.</p>
              </div>
              <span class="lab-status" data-stages-status>Masalah</span>
            </div>
            <div class="lab-body">
              <div class="stage-tabs" role="tablist" aria-label="Lima tahap penyelesaian masalah" aria-orientation="horizontal">
                <button type="button" id="stage-tab-0" class="stage-tab is-active" data-stage-tab="0" role="tab" aria-controls="stage-panel-0" aria-selected="true" tabindex="0"><span>01</span>Pahami</button>
                <button type="button" id="stage-tab-1" class="stage-tab" data-stage-tab="1" role="tab" aria-controls="stage-panel-1" aria-selected="false" tabindex="-1"><span>02</span>Rancang</button>
                <button type="button" id="stage-tab-2" class="stage-tab" data-stage-tab="2" role="tab" aria-controls="stage-panel-2" aria-selected="false" tabindex="-1"><span>03</span>Tulis</button>
                <button type="button" id="stage-tab-3" class="stage-tab" data-stage-tab="3" role="tab" aria-controls="stage-panel-3" aria-selected="false" tabindex="-1"><span>04</span>Uji</button>
                <button type="button" id="stage-tab-4" class="stage-tab" data-stage-tab="4" role="tab" aria-controls="stage-panel-4" aria-selected="false" tabindex="-1"><span>05</span>Dokumentasi</button>
              </div>
              <div class="stage-panels" data-stage-panels>
                <article class="stage-panel is-active" id="stage-panel-0" data-stage-panel="0" role="tabpanel" aria-labelledby="stage-tab-0" tabindex="0">
                  <span class="block-label">Tahap 1 · memahami masalah</span>
                  <h3>Input bilangan bulat. Output keterangan “genap” atau “ganjil”.</h3>
                  <p>Tentukan batasannya: bilangan harus bulat; bilangan negatif juga perlu diuji. Jangan mulai dari kode sebelum dua hal ini jelas.</p>
                  <div class="stage-artifact"><span class="artifact-label">Catatan masalah</span><ul><li>Input: n (integer)</li><li>Output: “Genap” atau “Ganjil”</li><li>Uji batas: 0 dan bilangan negatif</li></ul></div>
                </article>
                <article class="stage-panel" id="stage-panel-1" data-stage-panel="1" role="tabpanel" aria-labelledby="stage-tab-1" tabindex="0" hidden>
                  <span class="block-label">Tahap 2 · merancang algoritma</span>
                  <h3>Bagi dengan 2, lalu periksa sisanya.</h3>
                  <p>Jika sisa bagi = 0, bilangan genap. Selain itu, ganjil. Rencana ini belum terikat pada bahasa program.</p>
                  <div class="stage-artifact pseudo-mini"><span class="artifact-label">Rencana</span><p>baca(n)<br>sisa ← n mod 2<br>jika sisa = 0 → tulis “Genap”<br>selain itu → tulis “Ganjil”</p></div>
                </article>
                <article class="stage-panel" id="stage-panel-2" data-stage-panel="2" role="tabpanel" aria-labelledby="stage-tab-2" tabindex="0" hidden>
                  <span class="block-label">Tahap 3 · menulis kode</span>
                  <h3>Terjemahkan rencana ke aturan Python.</h3>
                  <p>Kode mengikuti rencana. If-else akan dipelajari lebih rinci di bab berikutnya; di sini cukup lihat bahwa bentuknya masih sama.</p>
                  <div class="stage-artifact">${codeBlock('genap_ganjil.py', 'Python', `n = 7
if n % 2 == 0:
    print("Genap")
else:
    print("Ganjil")`, 'Contoh ini memakai n = 7. Output yang diharapkan: Ganjil.')}</div>
                </article>
                <article class="stage-panel" id="stage-panel-3" data-stage-panel="3" role="tabpanel" aria-labelledby="stage-tab-3" tabindex="0" hidden>
                  <span class="block-label">Tahap 4 · menguji &amp; memperbaiki</span>
                  <h3>Jangan hanya menguji satu angka yang sudah “pas”.</h3>
                  <p>Uji nilai genap, ganjil, nol, dan negatif. Bandingkan output dengan aturan yang sudah dirancang.</p>
                  <div class="stage-artifact">
                    <table class="mini-table"><thead><tr><th>Input</th><th>n mod 2</th><th>Output</th><th>Status</th></tr></thead><tbody><tr><td>4</td><td>0</td><td>Genap</td><td>✓</td></tr><tr><td>7</td><td>1</td><td>Ganjil</td><td>✓</td></tr><tr><td>0</td><td>0</td><td>Genap</td><td>✓</td></tr><tr><td>−3</td><td>1</td><td>Ganjil</td><td>✓</td></tr></tbody></table>
                  </div>
                </article>
                <article class="stage-panel" id="stage-panel-4" data-stage-panel="4" role="tabpanel" aria-labelledby="stage-tab-4" tabindex="0" hidden>
                  <span class="block-label">Tahap 5 · dokumentasi &amp; pemeliharaan</span>
                  <h3>Tulis cara memakai dan cara mengujinya.</h3>
                  <p>Dokumentasi membantu orang lain—atau dirimu enam bulan nanti—memahami tujuan, input, output, dan batasan solusi.</p>
                  <div class="stage-artifact doc-note"><span class="artifact-label">Catatan dokumentasi</span><p><strong>Nama:</strong> cek_genap_ganjil(n)</p><p><strong>Tujuan:</strong> menentukan kategori bilangan bulat.</p><p><strong>Diuji dengan:</strong> 4, 7, 0, −3.</p><p><strong>Catatan:</strong> input non-bulat belum ditangani.</p></div>
                </article>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol tahapan penyelesaian">
              <button type="button" class="btn btn-small btn-quiet" data-stages-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-stages-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-stages-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-stages-reset>Ulangi</button>
            </div>
          </div>

          <div class="process-strip">
            <span>Masalah</span><b>→</b><span>Solusi logis</span><b>→</b><span>Program</span><b>→</b><span>Bukti hasil uji</span>
          </div>

          ${note('Kalau pengujian menemukan masalah', '<p>Kembali ke tahap yang paling mungkin menjadi sumber kesalahan. Mungkin pemahaman input belum lengkap, rancangan kondisinya salah, atau kode tidak sesuai rancangan. Tahapan ini bukan jalan lurus satu kali, melainkan siklus perbaikan.</p>', 'tip')}

          ${practice('Uji rencana sebelum menulis kode', '<p>Untuk kasus yang sama, tulis di kertas apa yang seharusnya terjadi jika n = 0 dan n = −3. Bandingkan dengan tabel pengujian di atas.</p>', '<p>0 dibagi 2 bersisa 0 → Genap. −3 tidak habis dibagi 2 → Ganjil. Kedua hasil sesuai dengan tabel, sehingga rencana menangani nilai batas dengan benar.</p>')}
        `,
        check: {
          question: 'Setelah kode selesai, Rani mencoba input 4, 7, 0, dan −3 lalu membandingkan output dengan harapan. Ia sedang berada pada tahap…',
          hint: 'Tahap ini membutuhkan data uji dan hasil yang dibandingkan.',
          options: ['Memahami masalah.', 'Merancang algoritma.', 'Menguji dan memperbaiki.'],
          answer: 2,
          explanation: 'Menguji berarti menjalankan kasus-kasus uji dan membandingkan output aktual dengan output yang seharusnya.'
        }
      }
    ],
    recap: {
      title: 'Yang perlu melekat dari Bab 02',
      lead: 'Masalah yang terasa rumit biasanya menjadi lebih tenang setelah dipecah dan dipetakan.',
      points: [
        'Logika pemrograman mengatur sequence, selection, dan repetition sebelum kode ditulis.',
        'Computational thinking membantu merumuskan masalah dan solusi yang dapat dijalankan.',
        'Dekomposisi memecah masalah besar menjadi tugas kecil yang terkelola.',
        'Pengenalan pola mencari struktur berulang agar solusi dapat dipakai ulang.',
        'Abstraksi memilih detail yang relevan sesuai tujuan.',
        'Tahapan penyelesaian: pahami → rancang → tulis kode → uji → dokumentasikan.'
      ]
    },
    quiz: [
      {
        id: 'b2q1',
        type: 'sequence',
        prompt: 'Urutkan lima tahap penyelesaian masalah pemrograman dari awal ke akhir.',
        instruction: 'Gunakan tombol naik/turun untuk mengubah urutan.',
        items: [
          { id: 'docs', label: 'Dokumentasi & pemeliharaan.' },
          { id: 'algo', label: 'Merancang algoritma.' },
          { id: 'test', label: 'Menguji dan memperbaiki.' },
          { id: 'understand', label: 'Memahami masalah, input, dan output.' },
          { id: 'code', label: 'Menulis kode program.' }
        ],
        initialOrder: ['test', 'docs', 'understand', 'code', 'algo'],
        correctOrder: ['understand', 'algo', 'code', 'test', 'docs'],
        hints: ['Kamu belum bisa menguji kode sebelum kode itu ada.', 'Dokumentasi dibuat setelah solusi cukup stabil untuk dicatat.'],
        explanation: 'Urutan yang logis: pahami masalah → rancang algoritma → tulis kode → uji dan perbaiki → dokumentasikan.'
      },
      {
        id: 'b2q2',
        type: 'choice',
        prompt: 'Membagi fitur checkout menjadi bagian memilih menu, mengisi alamat, dan memilih pembayaran adalah contoh…',
        options: ['Dekomposisi.', 'Abstraksi.', 'Pengenalan pola.'],
        answer: 0,
        hints: ['Bagian besar dipecah menjadi bagian kecil.', 'Pecahan-pecahan ini dapat dikerjakan secara terpisah.'],
        explanation: 'Dekomposisi memecah masalah kompleks menjadi bagian yang lebih sederhana dan mudah dikelola.'
      },
      {
        id: 'b2q3',
        type: 'choice',
        prompt: 'Tiga aplikasi memiliki alur “pilih item → hitung nilai → periksa promo → bayar”. Berpikir bahwa ketiganya dapat memakai satu rancangan fungsi yang sama disebut…',
        options: ['Dekomposisi.', 'Pengenalan pola.', 'Pengujian.'],
        answer: 1,
        hints: ['Cari kata yang berkaitan dengan sesuatu yang berulang.', 'Kamu menemukan kesamaan struktur di antara kasus berbeda.'],
        explanation: 'Pengenalan pola membantu menemukan struktur atau aturan yang berulang sehingga solusinya dapat dipakai ulang.'
      },
      {
        id: 'b2q4',
        type: 'choice',
        prompt: 'Untuk membuat estimasi waktu tiba, data mana yang sebaiknya diabaikan?',
        options: [
          'Jarak perjalanan.',
          'Kondisi lalu lintas.',
          'Warna kendaraan pengendara.'
        ],
        answer: 2,
        hints: ['Perhatikan tujuan perhitungan.', 'Data yang tidak memengaruhi hasil perhitungan bisa diabaikan.'],
        explanation: 'Warna kendaraan tidak mengubah estimasi waktu tiba. Ini adalah contoh abstraksi: fokus pada informasi yang relevan terhadap tujuan.'
      },
      {
        id: 'b2q5',
        type: 'choice',
        prompt: 'Setelah kode ditulis, Rani mencoba angka 4, 7, 0, dan −3. Langkah berikutnya yang paling tepat adalah…',
        options: [
          'Menghapus dokumentasi karena kode sudah jadi.',
          'Membandingkan output aktual dengan hasil yang diharapkan, lalu memperbaiki bila perlu.',
          'Menambah warna tombol agar program lebih menarik.'
        ],
        answer: 1,
        hints: ['Menguji berarti membandingkan kenyataan dengan harapan.', 'Temuan dari pengujian dipakai untuk memperbaiki solusi.'],
        explanation: 'Pengujian yang baik menggunakan beberapa kasus dan membandingkan output dengan aturan yang sudah dirancang. Jika ada perbedaan, lakukan perbaikan.'
      },
      {
        id: 'b2q6',
        type: 'choice',
        prompt: 'Contoh abstraksi dalam pemrograman adalah…',
        options: [
          'Memakai fungsi <code>hitung_total()</code> tanpa perlu mengingat seluruh operasi di dalamnya.',
          'Menulis semua detail implementasi di setiap tempat.',
          'Membagi satu masalah menjadi empat bagian.'
        ],
        answer: 0,
        hints: ['Abstraksi menyembunyikan detail yang tidak perlu bagi pemakai.', 'Fungsi adalah cara umum untuk menyembunyikan detail teknis di balik nama yang bermakna.'],
        explanation: 'Saat memakai fungsi, kita hanya perlu memahami input dan outputnya. Detail teknis di dalam fungsi tersembunyi—itu adalah abstraksi.'
      }
    ]
  });
})();
