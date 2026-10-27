(function () {
  'use strict';
  const { codeBlock, note, practice } = window.RUNUT.helpers;

  window.RUNUT.chapters.push({
    id: 'bab-4',
    number: '04',
    slug: 'alur',
    title: 'Pseudocode dan flowchart',
    heroTitle: 'Tulis rencananya, gambar alurnya, jalankan logikanya.',
    shortTitle: 'Pseudocode & flowchart',
    summary: 'Ubah algoritma menjadi pseudocode yang rapi dan flowchart dengan simbol standar. Telusuri struktur sekuensial, seleksi, dan perulangan selangkah demi selangkah.',
    themeClass: 'theme-mint',
    accent: '#91e3d6',
    duration: '± 35 menit',
    level: 'Menyusun solusi',
    goals: [
      'Menyusun pseudocode dengan judul, deklarasi, dan deskripsi.',
      'Mengenali simbol flowchart serta aturan penggunaannya.',
      'Menyelaraskan langkah pseudocode dengan alur flowchart.',
      'Menelusuri contoh sekuensial, seleksi, dan perulangan.'
    ],
    sections: [
      {
        id: 'pseudocode',
        navTitle: 'Pseudocode',
        title: 'Menulis algoritma agar mudah dibaca manusia.',
        lead: 'Pseudocode adalah notasi yang menyerupai kode program, tetapi memakai bahasa manusia dan tidak terikat sintaks bahasa tertentu.',
        minutes: '6 menit',
        html: `
          <p>Pseudocode membantu kita merancang solusi sebelum terganggu detail teknis seperti titik dua, tanda kurung, atau nama fungsi bawaan bahasa. Ia harus ringkas, runtut, dan cukup jelas untuk diterjemahkan menjadi program.</p>

          <div class="lab" data-lab="pseudocode-anatomy">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 01 · anatomi pseudocode</span>
                <h3>Satu algoritma, tiga bagian wajib.</h3>
                <p>Klik bagian pseudocode untuk melihat tugasnya.</p>
              </div>
              <span class="lab-status">Klik bagian</span>
            </div>
            <div class="lab-body">
              <div class="pseudo-anatomy">
                <div class="pseudo-document" data-pseudo-document>
                  <button type="button" class="pseudo-zone is-active" data-pseudo-part="title" aria-pressed="true">
                    <span class="zone-label">Judul</span>
                    <code>ALGORITMA LuasPersegiPanjang</code>
                  </button>
                  <button type="button" class="pseudo-zone" data-pseudo-part="declaration" aria-pressed="false">
                    <span class="zone-label">Deklarasi</span>
                    <code>p, l, luas : integer</code>
                  </button>
                  <button type="button" class="pseudo-zone" data-pseudo-part="description" aria-pressed="false">
                    <span class="zone-label">Deskripsi</span>
                    <code>baca(p)
baca(l)
luas ← p × l
tulis(luas)</code>
                  </button>
                </div>
                <div class="pseudo-explanation" data-pseudo-explanation aria-live="polite">
                  <span class="block-label">Judul</span>
                  <h3>Memberi nama dan tujuan algoritma.</h3>
                  <p>Judul yang jelas membuat pembaca langsung tahu masalah apa yang diselesaikan. Contoh: <code>LuasPersegiPanjang</code>, bukan <code>Program1</code>.</p>
                </div>
              </div>
              <div class="pseudo-rule-grid">
                <div><span>01</span><strong>Konsisten</strong><small>Gunakan kata kunci yang sama sepanjang algoritma.</small></div>
                <div><span>02</span><strong>Satu aksi per baris</strong><small>Jangan menggabungkan banyak instruksi tanpa alasan.</small></div>
                <div><span>03</span><strong>Indentasi</strong><small>Menjorokkan blok kondisi atau perulangan agar hierarki terlihat.</small></div>
                <div><span>04</span><strong>Tidak ambigu</strong><small>Hindari “hitung secukupnya” atau instruksi yang bisa ditafsirkan ganda.</small></div>
                <div><span>05</span><strong>Runtut</strong><small>Susun langkah sesuai urutan yang benar dan mudah diikuti.</small></div>
                <div><span>06</span><strong>Ringkas</strong><small>Pakai bahasa singkat tanpa menghilangkan informasi penting.</small></div>
              </div>
            </div>
          </div>

          <h3 class="subhead">Kata kunci yang sering dipakai</h3>
          <div class="keyword-strip">
            <span><code>baca()</code> menerima input</span>
            <span><code>tulis()</code> menampilkan output</span>
            <span><code>←</code> memberi nilai</span>
            <span><code>JIKA ... MAKA</code> memilih jalur</span>
            <span><code>SELAMA ... LAKUKAN</code> mengulang</span>
          </div>

          ${note('Pseudocode bukan program yang langsung dijalankan', '<p>Pseudocode dirancang untuk dibaca dan diterjemahkan. Komputer tidak menjalankan pseudocode secara langsung. Tugasnya membantu kamu memastikan urutan logika sebelum menulis sintaks.</p>', 'edge')}

          ${codeBlock('Contoh pseudocode lain', 'Pseudocode', `ALGORITMA Sapa
DEKLARASI
  nama : string
DESKRIPSI
  baca(nama)
  tulis("Halo, ", nama)`, 'Deklarasi menyebutkan data yang dipakai. Deskripsi memuat aksi yang benar-benar dijalankan.')}

          ${practice('Beri nama algoritma', '<p>Buat judul pseudocode untuk tiga masalah ini: menghitung luas lingkaran, menentukan bilangan terbesar dari dua angka, dan mengubah suhu Celsius ke Fahrenheit. Lalu sebutkan satu input dan satu output untuk masing-masing.</p>', '<p>Contoh: <code>LuasLingkaran</code> (input jari-jari; output luas), <code>BilanganTerbesar</code> (input dua angka; output angka terbesar), <code>KonversiSuhu</code> (input Celsius; output Fahrenheit).</p>')}
        `,
        check: {
          question: 'Bagian pseudocode yang mendefinisikan variabel beserta tipenya disebut…',
          hint: 'Bagian ini muncul setelah judul dan sebelum langkah-langkah.',
          options: ['Deskripsi.', 'Deklarasi.', 'Terminator.'],
          answer: 1,
          explanation: 'Deklarasi mendefinisikan data yang akan digunakan, misalnya <code>p, l, luas : integer</code>. Deskripsi berisi langkah-langkahnya.'
        }
      },
      {
        id: 'simbol',
        navTitle: 'Simbol flowchart',
        title: 'Bentuk simbol memberi petunjuk fungsi.',
        lead: 'Flowchart adalah diagram alir yang menggambarkan langkah algoritma dengan simbol standar dan garis panah.',
        minutes: '5 menit',
        html: `
          <p>Simbol yang benar membuat alur dapat dibaca orang lain tanpa penjelasan panjang. Klik setiap simbol untuk melihat fungsi dan aturannya.</p>

          <div class="lab" data-lab="symbols">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 02 · kamus simbol</span>
                <h3>Kenali bentuk sebelum membaca diagram besar.</h3>
                <p>Fokus pada fungsi, bukan sekadar menghafal gambar.</p>
              </div>
              <span class="lab-status">6 simbol standar</span>
            </div>
            <div class="lab-body">
              <div class="symbol-grid">
                <button type="button" class="symbol-card is-active" data-symbol="terminator" aria-pressed="true">
                  <span class="symbol-art"><svg viewBox="0 0 120 58" aria-hidden="true"><rect x="12" y="10" width="96" height="38" rx="19" class="symbol-shape"></rect></svg></span>
                  <strong>Terminator</strong><small>Mulai / selesai</small>
                </button>
                <button type="button" class="symbol-card" data-symbol="io" aria-pressed="false">
                  <span class="symbol-art"><svg viewBox="0 0 120 58" aria-hidden="true"><polygon points="26,10 110,10 94,48 10,48" class="symbol-shape"></polygon></svg></span>
                  <strong>Input / Output</strong><small>Baca / tampilkan data</small>
                </button>
                <button type="button" class="symbol-card" data-symbol="process" aria-pressed="false">
                  <span class="symbol-art"><svg viewBox="0 0 120 58" aria-hidden="true"><rect x="14" y="10" width="92" height="38" class="symbol-shape"></rect></svg></span>
                  <strong>Proses</strong><small>Hitung / tetapkan nilai</small>
                </button>
                <button type="button" class="symbol-card" data-symbol="decision" aria-pressed="false">
                  <span class="symbol-art"><svg viewBox="0 0 120 58" aria-hidden="true"><polygon points="60,6 110,29 60,52 10,29" class="symbol-shape"></polygon></svg></span>
                  <strong>Keputusan</strong><small>Cabang Ya / Tidak</small>
                </button>
                <button type="button" class="symbol-card" data-symbol="connector" aria-pressed="false">
                  <span class="symbol-art"><svg viewBox="0 0 120 58" aria-hidden="true"><circle cx="60" cy="29" r="20" class="symbol-shape"></circle></svg></span>
                  <strong>Konektor</strong><small>Menyambung bagian</small>
                </button>
                <button type="button" class="symbol-card" data-symbol="flowline" aria-pressed="false">
                  <span class="symbol-art"><svg viewBox="0 0 120 58" aria-hidden="true"><path d="M14 29H100" class="symbol-line"></path><path d="M93 21l9 8-9 8" class="symbol-line"></path></svg></span>
                  <strong>Garis alir</strong><small>Arah proses</small>
                </button>
              </div>
              <div class="symbol-detail" data-symbol-detail aria-live="polite">
                <div class="symbol-detail-graphic" aria-hidden="true"><svg viewBox="0 0 120 58"><rect x="12" y="10" width="96" height="38" rx="19" class="symbol-shape"></rect></svg></div>
                <div>
                  <span class="block-label">Terminator</span>
                  <h3>Menandai awal dan akhir algoritma.</h3>
                  <p>Biasanya berisi “Mulai” dan “Selesai”. Sebuah flowchart dimulai dari satu terminator awal dan diakhiri dengan terminator akhir.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flowchart-rules">
            <div class="rule"><span class="rule-index">01</span><p>Mulai dari satu <strong>Mulai</strong>, akhiri dengan satu <strong>Selesai</strong>.</p></div>
            <div class="rule"><span class="rule-index">02</span><p>Alur umumnya bergerak dari atas ke bawah atau kiri ke kanan.</p></div>
            <div class="rule"><span class="rule-index">03</span><p>Setiap simbol berisi teks singkat dan jelas.</p></div>
            <div class="rule"><span class="rule-index">04</span><p>Keputusan memiliki dua cabang berlabel <strong>Ya</strong> dan <strong>Tidak</strong>.</p></div>
            <div class="rule"><span class="rule-index">05</span><p>Garis alir memakai panah dan sebaiknya tidak saling berpotongan.</p></div>
            <div class="rule"><span class="rule-index">06</span><p>Gunakan konektor bila diagram harus dilanjutkan di bagian lain.</p></div>
            <div class="rule"><span class="rule-index">07</span><p>Pakai simbol standar sesuai fungsinya; jangan memakai satu bentuk untuk dua tujuan berbeda.</p></div>
          </div>

          ${practice('Pilih simbol yang tepat', '<p>Untuk setiap instruksi, pilih simbol flowchart: (a) masukkan nilai n, (b) luas = p × l, (c) apakah nilai ≥ 60?, (d) tampilkan hasil.</p>', '<p>(a) Input/Output, (b) Proses, (c) Keputusan (belah ketupat), (d) Input/Output.</p>')}
        `,
        check: {
          question: 'Simbol belah ketupat pada flowchart dipakai untuk…',
          hint: 'Bentuk ini selalu punya dua jalur keluar.',
          options: [
            'Menghitung nilai dan menyimpannya.',
            'Memeriksa kondisi lalu memilih cabang Ya atau Tidak.',
            'Menandai awal dan akhir flowchart.'
          ],
          answer: 1,
          explanation: 'Belah ketupat adalah simbol keputusan. Ia menguji kondisi dan mengarahkan alur ke cabang “Ya” atau “Tidak”.'
        }
      },
      {
        id: 'sekuensial',
        navTitle: 'Sekuensial',
        title: 'Alur lurus: luas persegi panjang.',
        lead: 'Pada struktur sekuensial, langkah dijalankan berurutan dari atas ke bawah tanpa cabang atau pengulangan.',
        minutes: '7 menit',
        html: `
          <p>Kita akan menelusuri contoh dari materi: menerima panjang dan lebar, menghitung luas, lalu menampilkannya. Saat flowchart bergerak, baris pseudocode yang sesuai ikut tersorot.</p>

          <div class="lab" data-lab="flow-sequence">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 03 · sekuensial</span>
                <h3>Satu garis lurus, empat instruksi.</h3>
                <p>Ubah p dan l kapan saja. Alur akan kembali ke awal agar bisa dijalankan ulang.</p>
              </div>
              <span class="lab-status" data-sequence-status>Langkah 0 / 6</span>
            </div>
            <div class="lab-body">
              <div class="flow-input-row">
                <label class="field field-inline">Panjang p
                  <input data-sequence-p type="number" min="1" step="1" value="10" inputmode="numeric">
                </label>
                <label class="field field-inline">Lebar l
                  <input data-sequence-l type="number" min="1" step="1" value="4" inputmode="numeric">
                </label>
                <span class="input-hint">Nilai akan dipakai saat langkah input dijalankan.</span>
              </div>
              <div class="flow-sync">
                <div class="sync-panel pseudo-panel">
                  <div class="sync-head"><span>PSEUDOCODE</span><span>panah mengikuti langkah</span></div>
                  <div class="pseudo-code-block">
                    <span class="pseudo-line" data-sequence-line="title"><span class="line-number">—</span><code>ALGORITMA LuasPersegiPanjang</code></span>
                    <span class="pseudo-line"><span class="line-number">01</span><code>DEKLARASI</code></span>
                    <span class="pseudo-line"><span class="line-number">02</span><code>  p, l, luas : integer</code></span>
                    <span class="pseudo-line"><span class="line-number">03</span><code>DESKRIPSI</code></span>
                    <span class="pseudo-line" data-sequence-line="read-p"><span class="line-number">04</span><code>  baca(p)</code></span>
                    <span class="pseudo-line" data-sequence-line="read-l"><span class="line-number">05</span><code>  baca(l)</code></span>
                    <span class="pseudo-line" data-sequence-line="process"><span class="line-number">06</span><code>  luas ← p × l</code></span>
                    <span class="pseudo-line" data-sequence-line="output"><span class="line-number">07</span><code>  tulis(luas)</code></span>
                    <span class="pseudo-line" data-sequence-line="end"><span class="line-number">08</span><code>SELESAI</code></span>
                  </div>
                </div>
                <div class="sync-panel flow-panel">
                  <div class="sync-head"><span>FLOWCHART</span><span data-sequence-step-label>0 / 6</span></div>
                  <div class="flowchart-wrap">
                    <svg class="flowchart" viewBox="0 0 430 460" role="img" aria-label="Flowchart sekuensial luas persegi panjang">
                      <defs><marker id="seq-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" class="arrow-head"></path></marker></defs>
                      <g class="flow-edge" data-sequence-edge="0"><path d="M215 62 V92" marker-end="url(#seq-arrow)"></path></g>
                      <g class="flow-edge" data-sequence-edge="1"><path d="M215 136 V164" marker-end="url(#seq-arrow)"></path></g>
                      <g class="flow-edge" data-sequence-edge="2"><path d="M215 208 V236" marker-end="url(#seq-arrow)"></path></g>
                      <g class="flow-edge" data-sequence-edge="3"><path d="M215 284 V312" marker-end="url(#seq-arrow)"></path></g>
                      <g class="flow-edge" data-sequence-edge="4"><path d="M215 360 V388" marker-end="url(#seq-arrow)"></path></g>
                      <g class="flow-node" data-sequence-node="start"><rect class="node-shape" x="140" y="20" width="150" height="42" rx="21"></rect><text x="215" y="46">Mulai</text></g>
                      <g class="flow-node" data-sequence-node="input-p"><polygon class="node-shape" points="105,92 325,92 305,136 85,136"></polygon><text x="205" y="118">Input p</text></g>
                      <g class="flow-node" data-sequence-node="input-l"><polygon class="node-shape" points="105,164 325,164 305,208 85,208"></polygon><text x="205" y="190">Input l</text></g>
                      <g class="flow-node" data-sequence-node="process"><rect class="node-shape" x="105" y="236" width="220" height="48"></rect><text x="215" y="265">luas ← p × l</text></g>
                      <g class="flow-node" data-sequence-node="output"><polygon class="node-shape" points="105,312 325,312 305,360 85,360"></polygon><text x="205" y="340">Output luas = <tspan data-sequence-output-value>?</tspan></text></g>
                      <g class="flow-node" data-sequence-node="end"><rect class="node-shape" x="140" y="388" width="150" height="42" rx="21"></rect><text x="215" y="414">Selesai</text></g>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="trace-panel">
                <div class="trace-copy">
                  <span class="block-label">Penelusuran langkah</span>
                  <p data-sequence-caption aria-live="polite">Tekan “Langkah berikutnya” untuk memulai alur.</p>
                </div>
                <div class="trace-variables">
                  <span>p <strong data-sequence-p-value>10</strong></span>
                  <span>l <strong data-sequence-l-value>4</strong></span>
                  <span>luas <strong data-sequence-area-value>—</strong></span>
                </div>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol flowchart sekuensial">
              <button type="button" class="btn btn-small btn-quiet" data-sequence-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-sequence-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-sequence-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-sequence-reset>Ulangi</button>
            </div>
          </div>

          <h3 class="subhead">Hasil yang konsisten</h3>
          <p>Dengan p = 10 dan l = 4, prosesnya adalah <code>luas ← 10 × 4</code>, sehingga output <code>40</code>. Pseudocode, flowchart, dan simulasi menjalankan urutan yang sama. Itu tanda bahwa rancangan solusi konsisten.</p>

          ${practice('Ubah input dan telusuri lagi', '<p>Dengan alur yang sama, prediksi output jika p = 7 dan l = 6. Setelah itu, jalankan simulasi untuk memeriksa prediksimu.</p>', '<p>Luas = 7 × 6 = 42. Saat p atau l diubah, simulasi mengatur ulang alur agar input baru benar-benar dibaca dari awal.</p>')}
        `,
        check: {
          question: 'Pada struktur sekuensial, kapan instruksi kedua dijalankan?',
          hint: 'Perhatikan arah panah pada flowchart.',
          options: [
            'Sebelum instruksi pertama jika lebih cepat.',
            'Setelah instruksi pertama selesai, mengikuti arah alur.',
            'Hanya jika instruksi pertama gagal.'
          ],
          answer: 1,
          explanation: 'Struktur sekuensial menjalankan instruksi berurutan. Instruksi berikutnya baru dijalankan setelah instruksi sebelumnya.'
        }
      },
      {
        id: 'seleksi',
        navTitle: 'Seleksi',
        title: 'Satu keputusan, dua cabang.',
        lead: 'Struktur seleksi memilih jalur berdasarkan kondisi. Pada flowchart, keputusan selalu punya cabang “Ya” dan “Tidak”.',
        minutes: '7 menit',
        html: `
          <p>Contoh dari materi: tentukan apakah bilangan <code>n</code> genap atau ganjil. Jika <code>n mod 2 = 0</code>, hasilnya genap. Selain itu, ganjil. Ubah n untuk melihat cabang yang berbeda.</p>

          <div class="lab" data-lab="flow-selection">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 04 · seleksi</span>
                <h3>Ikuti kondisi sampai menemukan jalurnya.</h3>
                <p>Cabang yang tidak dipilih tetap terlihat agar perbandingannya jelas.</p>
              </div>
              <span class="lab-status" data-selection-status>Langkah 0 / 5</span>
            </div>
            <div class="lab-body">
              <div class="flow-input-row">
                <label class="field field-inline">Nilai n
                  <input data-selection-n type="number" step="1" value="7" inputmode="numeric">
                </label>
                <span class="input-hint">Coba angka genap, ganjil, nol, dan negatif.</span>
              </div>
              <div class="flow-sync flow-sync-selection">
                <div class="sync-panel pseudo-panel">
                  <div class="sync-head"><span>PSEUDOCODE</span><span>sinkron dengan alur</span></div>
                  <div class="pseudo-code-block">
                    <span class="pseudo-line" data-selection-line="title"><span class="line-number">—</span><code>ALGORITMA GenapGanjil</code></span>
                    <span class="pseudo-line"><span class="line-number">01</span><code>DEKLARASI</code></span>
                    <span class="pseudo-line"><span class="line-number">02</span><code>  n : integer</code></span>
                    <span class="pseudo-line"><span class="line-number">03</span><code>DESKRIPSI</code></span>
                    <span class="pseudo-line" data-selection-line="read"><span class="line-number">04</span><code>  baca(n)</code></span>
                    <span class="pseudo-line" data-selection-line="condition"><span class="line-number">05</span><code>  JIKA n mod 2 = 0 MAKA</code></span>
                    <span class="pseudo-line" data-selection-line="even"><span class="line-number">06</span><code>    tulis("Genap")</code></span>
                    <span class="pseudo-line" data-selection-line="else"><span class="line-number">07</span><code>  SELAIN ITU</code></span>
                    <span class="pseudo-line" data-selection-line="odd"><span class="line-number">08</span><code>    tulis("Ganjil")</code></span>
                    <span class="pseudo-line" data-selection-line="end"><span class="line-number">09</span><code>SELESAI</code></span>
                  </div>
                </div>
                <div class="sync-panel flow-panel">
                  <div class="sync-head"><span>FLOWCHART</span><span data-selection-step-label>0 / 5</span></div>
                  <div class="flowchart-wrap">
                    <svg class="flowchart" viewBox="0 0 460 500" role="img" aria-label="Flowchart seleksi bilangan genap ganjil">
                      <defs><marker id="sel-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" class="arrow-head"></path></marker></defs>
                      <g class="flow-edge" data-selection-edge="0"><path d="M230 54 V84" marker-end="url(#sel-arrow)"></path></g>
                      <g class="flow-edge" data-selection-edge="1"><path d="M230 128 V164" marker-end="url(#sel-arrow)"></path></g>
                      <g class="flow-edge" data-selection-edge="2"><path d="M112 208 H110 V296" marker-end="url(#sel-arrow)"></path><text class="edge-label" x="74" y="231">Ya</text></g>
                      <g class="flow-edge" data-selection-edge="3"><path d="M348 208 H350 V296" marker-end="url(#sel-arrow)"></path><text class="edge-label" x="370" y="231">Tidak</text></g>
                      <g class="flow-edge" data-selection-edge="4"><path d="M110 344 V390 H230 V420" marker-end="url(#sel-arrow)"></path></g>
                      <g class="flow-edge" data-selection-edge="5"><path d="M350 344 V390 H230 V420" marker-end="url(#sel-arrow)"></path></g>
                      <g class="flow-node" data-selection-node="start"><rect class="node-shape" x="170" y="14" width="120" height="40" rx="20"></rect><text x="230" y="39">Mulai</text></g>
                      <g class="flow-node" data-selection-node="input"><polygon class="node-shape" points="145,84 335,84 315,128 125,128"></polygon><text x="230" y="110">Input n = <tspan data-selection-input-value>7</tspan></text></g>
                      <g class="flow-node flow-decision" data-selection-node="decision"><polygon class="node-shape" points="112,208 230,164 348,208 230,252"></polygon><text x="230" y="204">n mod 2 = 0 ?</text><text class="condition-result" x="230" y="224" data-selection-condition-value>sisa = 1</text></g>
                      <g class="flow-node" data-selection-node="even"><polygon class="node-shape" points="35,296 185,296 170,344 20,344"></polygon><text x="102" y="324">Tulis “Genap”</text></g>
                      <g class="flow-node" data-selection-node="odd"><polygon class="node-shape" points="275,296 425,296 410,344 260,344"></polygon><text x="342" y="324">Tulis “Ganjil”</text></g>
                      <g class="flow-node" data-selection-node="end"><rect class="node-shape" x="170" y="420" width="120" height="42" rx="21"></rect><text x="230" y="446">Selesai</text></g>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="trace-panel">
                <div class="trace-copy">
                  <span class="block-label">Penelusuran keputusan</span>
                  <p data-selection-caption aria-live="polite">Tekan “Langkah berikutnya” untuk memulai alur.</p>
                </div>
                <div class="trace-variables">
                  <span>n <strong data-selection-value>7</strong></span>
                  <span>n mod 2 <strong data-selection-remainder>1</strong></span>
                  <span>output <strong data-selection-output>—</strong></span>
                </div>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol flowchart seleksi">
              <button type="button" class="btn btn-small btn-quiet" data-selection-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-selection-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-selection-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-selection-reset>Ulangi</button>
            </div>
          </div>

          <p>Jika n = 7, <code>7 mod 2 = 1</code>, jadi kondisi “sisa = 0?” bernilai salah. Alur mengambil cabang <strong>Tidak</strong> dan mencetak “Ganjil”. Jika n = 4, alur mengambil cabang <strong>Ya</strong> dan mencetak “Genap”.</p>

          <aside class="example-expander">
            <div class="example-expander-head"><span class="block-label">Contoh tambahan dari materi</span><strong>Seleksi bertingkat untuk nilai huruf</strong></div>
            ${codeBlock('KonversiNilaiHuruf', 'Pseudocode', `PROGRAM KonversiNilaiHuruf
DEKLARASI
  skor : integer
DESKRIPSI
  baca(skor)
  JIKA skor >= 85 MAKA
    tulis("Nilai Anda: A")
  SELAIN JIKA skor >= 75 MAKA
    tulis("Nilai Anda: B")
  SELAIN JIKA skor >= 60 MAKA
    tulis("Nilai Anda: C")
  SELAIN ITU
    tulis("Nilai Anda: D")`, 'Susunan ini memeriksa syarat dari yang tertinggi. Perhatikan bahwa skor 80 berhenti di cabang B, karena kondisi pertama (≥85) sudah tidak terpenuhi.')}
          </aside>

          ${practice('Uji tiga jalur', '<p>Input n = 4, 0, dan −3. Tentukan cabang dan output untuk masing-masing tanpa melihat simulasi dulu.</p>', '<p>4 → sisa 0 → Ya → Genap. 0 → sisa 0 → Ya → Genap. −3 → sisa 1 (tidak habis dibagi 2) → Tidak → Ganjil.</p>')}
        `,
        check: {
          question: 'Jika <code>n = 7</code>, cabang mana yang dijalankan pada aturan <code>n mod 2 = 0?</code>',
          hint: '7 dibagi 2 menyisakan 1, bukan 0.',
          options: [
            'Cabang Ya, lalu menampilkan “Genap”.',
            'Cabang Tidak, lalu menampilkan “Ganjil”.',
            'Kedua cabang dijalankan.'
          ],
          answer: 1,
          explanation: 'Kondisi <code>7 mod 2 = 0</code> bernilai False. Flowchart mengambil cabang “Tidak” dan menampilkan “Ganjil”.'
        }
      },
      {
        id: 'perulangan',
        navTitle: 'Perulangan',
        title: 'Ulangi selama syarat masih benar.',
        lead: 'Perulangan membuat alur kembali ke titik tertentu. Pada contoh ini, angka 1 sampai N ditampilkan selama i ≤ N.',
        minutes: '8 menit',
        html: `
          <p>Perhatikan tiga hal pada setiap putaran: nilai <code>i</code> saat dicek, angka yang ditampilkan, dan kapan <code>i</code> bertambah. Tekan langkah berikutnya untuk mengikuti alur. Coba juga tombol sebelumnya untuk membatalkan satu langkah.</p>

          <div class="lab" data-lab="flow-loop">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 05 · perulangan</span>
                <h3>Cetak angka 1 sampai N.</h3>
                <p>Alur memutar kembali ke keputusan sebelum setiap angka berikutnya.</p>
              </div>
              <span class="lab-status" data-loop-status>Langkah 0 / 0</span>
            </div>
            <div class="lab-body">
              <div class="flow-input-row loop-limit-row">
                <label class="field field-inline">Batas N
                  <input data-loop-n type="number" min="1" max="8" step="1" value="5" inputmode="numeric">
                </label>
                <input class="range-input" data-loop-range type="range" min="1" max="8" value="5" aria-label="Batas N dari 1 sampai 8">
                <span class="input-hint">Rentang simulasi: 1–8 agar alur tetap mudah dibaca.</span>
              </div>
              <div class="flow-sync flow-sync-loop">
                <div class="sync-panel pseudo-panel">
                  <div class="sync-head"><span>PSEUDOCODE</span><span>perhatikan indentasi</span></div>
                  <div class="pseudo-code-block">
                    <span class="pseudo-line" data-loop-line="title"><span class="line-number">—</span><code>ALGORITMA CetakAngka</code></span>
                    <span class="pseudo-line"><span class="line-number">01</span><code>DEKLARASI</code></span>
                    <span class="pseudo-line"><span class="line-number">02</span><code>  n, i : integer</code></span>
                    <span class="pseudo-line"><span class="line-number">03</span><code>DESKRIPSI</code></span>
                    <span class="pseudo-line" data-loop-line="read"><span class="line-number">04</span><code>  baca(n)</code></span>
                    <span class="pseudo-line" data-loop-line="init"><span class="line-number">05</span><code>  i ← 1</code></span>
                    <span class="pseudo-line" data-loop-line="condition"><span class="line-number">06</span><code>  SELAMA i ≤ n LAKUKAN</code></span>
                    <span class="pseudo-line" data-loop-line="print"><span class="line-number">07</span><code>    tulis(i)</code></span>
                    <span class="pseudo-line" data-loop-line="increment"><span class="line-number">08</span><code>    i ← i + 1</code></span>
                    <span class="pseudo-line" data-loop-line="end"><span class="line-number">09</span><code>SELESAI</code></span>
                  </div>
                  <div class="loop-watch">
                    <div><span>i</span><strong data-loop-i>—</strong></div>
                    <div><span>n</span><strong data-loop-n-value>5</strong></div>
                    <div><span>kondisi i ≤ n</span><strong data-loop-condition>—</strong></div>
                  </div>
                </div>
                <div class="sync-panel flow-panel">
                  <div class="sync-head"><span>FLOWCHART</span><span data-loop-step-label>0 / 0</span></div>
                  <div class="flowchart-wrap">
                    <svg class="flowchart" viewBox="0 0 460 590" role="img" aria-label="Flowchart perulangan mencetak angka satu sampai n">
                      <defs><marker id="loop-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" class="arrow-head"></path></marker></defs>
                      <g class="flow-edge" data-loop-edge="0"><path d="M230 54 V80" marker-end="url(#loop-arrow)"></path></g>
                      <g class="flow-edge" data-loop-edge="1"><path d="M230 128 V148" marker-end="url(#loop-arrow)"></path></g>
                      <g class="flow-edge" data-loop-edge="2"><path d="M230 192 V208" marker-end="url(#loop-arrow)"></path></g>
                      <g class="flow-edge" data-loop-edge="3"><path d="M230 292 V332" marker-end="url(#loop-arrow)"></path><text class="edge-label" x="242" y="316">Ya</text></g>
                      <g class="flow-edge" data-loop-edge="4"><path d="M230 376 V404" marker-end="url(#loop-arrow)"></path></g>
                      <g class="flow-edge flow-edge-loop" data-loop-edge="5"><path d="M150 426 H55 V250 H115" marker-end="url(#loop-arrow)"></path><text class="edge-label" x="24" y="356">ulang</text></g>
                      <g class="flow-edge" data-loop-edge="6"><path d="M345 250 H385 V510" marker-end="url(#loop-arrow)"></path><text class="edge-label" x="355" y="290">Tidak</text></g>
                      <g class="flow-node" data-loop-node="start"><rect class="node-shape" x="170" y="14" width="120" height="40" rx="20"></rect><text x="230" y="39">Mulai</text></g>
                      <g class="flow-node" data-loop-node="input"><polygon class="node-shape" points="145,80 335,80 315,128 125,128"></polygon><text x="230" y="110">Input n = <tspan data-loop-input-value>5</tspan></text></g>
                      <g class="flow-node" data-loop-node="init"><rect class="node-shape" x="145" y="148" width="170" height="44"></rect><text x="230" y="175">i ← 1</text></g>
                      <g class="flow-node flow-decision" data-loop-node="decision"><polygon class="node-shape" points="115,250 230,208 345,250 230,292"></polygon><text x="230" y="246">i ≤ n ?</text><text class="condition-result" x="230" y="266" data-loop-condition-value>—</text></g>
                      <g class="flow-node" data-loop-node="output"><polygon class="node-shape" points="135,332 325,332 305,376 115,376"></polygon><text x="230" y="358">Tampilkan i</text></g>
                      <g class="flow-node" data-loop-node="increment"><rect class="node-shape" x="150" y="404" width="170" height="44"></rect><text x="230" y="431">i ← i + 1</text></g>
                      <g class="flow-node" data-loop-node="end"><rect class="node-shape" x="320" y="510" width="130" height="42" rx="21"></rect><text x="385" y="536">Selesai</text></g>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="loop-output-panel">
                <span class="block-label">Output berjalan</span>
                <div class="loop-output-list" data-loop-output aria-live="polite"><span class="empty-output">Belum ada angka yang ditampilkan.</span></div>
                <p class="loop-trace-caption" data-loop-caption>Tekan langkah berikutnya untuk membaca input.</p>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol flowchart perulangan">
              <button type="button" class="btn btn-small btn-quiet" data-loop-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-loop-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-loop-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-loop-reset>Ulangi</button>
            </div>
          </div>

          <h3 class="subhead">Kapan perulangan berhenti?</h3>
          <p>Untuk N = 5, badge output akan berisi <strong>1 2 3 4 5</strong>. Setelah angka 5 tampil, <code>i</code> menjadi 6. Kondisi <code>6 ≤ 5</code> bernilai salah, sehingga alur keluar menuju “Selesai”. Tidak ada angka 6 yang ditampilkan karena pemeriksaan kondisi terjadi sebelum badan perulangan.</p>

          <div class="loop-phases">
            <div><span>Inisialisasi</span><strong>i ← 1</strong></div>
            <div><span>Pemeriksaan</span><strong>i ≤ n?</strong></div>
            <div><span>Badan loop</span><strong>tulis(i)</strong></div>
            <div><span>Perubahan</span><strong>i ← i + 1</strong></div>
          </div>

          ${note('Jika lupa menaikkan i', '<p>Anggap baris <code>i ← i + 1</code> dihilangkan. Nilai i tetap 1, kondisi tetap benar, dan proses berulang tanpa akhir. Inilah yang disebut <em>infinite loop</em>. Pastikan selalu ada perubahan yang membawa kondisi menuju akhir.</p>', 'warning')}

          <div class="side-by-side">
            ${codeBlock('cetak_angka.py', 'Python', `n = 5
for i in range(1, n + 1):
    print(i)

# Output:
# 1
# 2
# 3
# 4
# 5`, 'Python menulis perulangan dengan bentuk berbeda, tetapi idenya sama: jalankan badan loop untuk setiap nilai i dari 1 sampai n.')}
            <div class="challenge-card">
              <span class="block-label">Tantangan bab</span>
              <h3>Pilih satu masalah, buat dua representasi.</h3>
              <p>Buat pseudocode dan flowchart untuk salah satu:</p>
              <ol><li>Luas lingkaran dari jari-jari.</li><li>Konversi suhu Celsius ke Fahrenheit.</li><li>Bilangan terbesar dari dua angka.</li><li>Penentu lulus jika nilai ≥ 60.</li></ol>
              <p class="challenge-note">Periksa: satu Mulai, satu Selesai, panah berlabel, dan langkah yang konsisten dengan pseudocode.</p>
            </div>
          </div>

          ${practice('Telusuri tanpa menekan tombol', '<p>Dengan N = 3, tulis urutan nilai i saat pemeriksaan kondisi: sebelum putaran pertama, sebelum putaran kedua, dan saat loop berhenti.</p>', '<p>Nilai i saat pemeriksaan: 1, 2, 3, lalu 4. Pada pemeriksaan keempat, <code>4 ≤ 3</code> false sehingga loop berhenti. Angka yang tampil: 1, 2, 3.</p>')}
        `,
        check: {
          question: 'Untuk N = 5, nilai i saat loop akhirnya berhenti adalah…',
          hint: 'Angka terakhir yang ditampilkan adalah 5. Setelah itu, i ditambah satu lagi.',
          options: ['4', '5', '6'],
          answer: 2,
          explanation: 'Badan loop menampilkan 5 lalu menjalankan <code>i ← i + 1</code>, sehingga i menjadi 6. Kondisi <code>6 ≤ 5</code> salah dan loop berhenti.'
        }
      }
    ],
    recap: {
      title: 'Yang perlu melekat dari Bab 04',
      lead: 'Pseudocode dan flowchart adalah dua bahasa untuk algoritma yang sama. Keduanya harus menceritakan alur yang konsisten.',
      points: [
        'Pseudocode memakai struktur judul, deklarasi, dan deskripsi.',
        'Flowchart memakai simbol standar: terminator, input/output, proses, keputusan, konektor, dan garis alir.',
        'Struktur sekuensial menjalankan langkah berurutan.',
        'Struktur seleksi memilih jalur berdasarkan kondisi Ya/Tidak.',
        'Struktur perulangan mengulang langkah selama kondisi terpenuhi dan berhenti ketika kondisi salah.',
        'Pseudocode, flowchart, dan simulasi harus menghasilkan output yang sama untuk input yang sama.'
      ]
    },
    quiz: [
      {
        id: 'b4q1',
        type: 'choice',
        prompt: 'Simbol mana yang dipakai untuk keputusan pada flowchart?',
        options: ['Persegi panjang.', 'Belah ketupat.', 'Elips.'],
        answer: 1,
        hints: ['Simbol ini memiliki dua cabang keluar.', 'Persegi panjang adalah proses; elips adalah terminator.'],
        explanation: 'Belah ketupat adalah simbol keputusan. Cabangnya diberi label “Ya” dan “Tidak”.'
      },
      {
        id: 'b4q2',
        type: 'choice',
        prompt: 'Pada flowchart genap/ganjil, n = 7. Kondisi yang diperiksa adalah <code>n mod 2 = 0</code>. Apa hasil alurnya?',
        options: [
          'Cabang Ya → “Genap”.',
          'Cabang Tidak → “Ganjil”.',
          'Kedua output ditampilkan.'
        ],
        answer: 1,
        hints: ['Hitung sisa 7 dibagi 2.', 'Jika sisa bukan 0, kondisi bernilai salah.'],
        explanation: '7 mod 2 = 1, sehingga kondisi bernilai False. Alur memilih cabang Tidak dan menghasilkan “Ganjil”.'
      },
      {
        id: 'b4q3',
        type: 'choice',
        prompt: 'Algoritma mencetak i selama i ≤ N, dengan i mulai dari 1. Jika N = 4, outputnya adalah…',
        options: ['0 1 2 3', '1 2 3 4', '1 2 3 4 5'],
        answer: 1,
        hints: ['Angka dimulai dari 1.', 'Angka 5 tidak memenuhi 5 ≤ 4.'],
        explanation: 'Loop berjalan untuk i = 1, 2, 3, dan 4. Saat i = 5, kondisi salah sehingga loop berhenti.'
      },
      {
        id: 'b4q4',
        type: 'input',
        prompt: 'Berapa kali badan loop <code>tulis(i); i ← i + 1</code> dijalankan jika N = 5?',
        placeholder: 'Tulis angka saja',
        accepted: ['5', 'lima'],
        hints: ['Setiap angka 1 sampai N menghasilkan satu putaran.', 'Hitung anggota bilangan 1, 2, 3, 4, 5.'],
        explanation: 'Badan loop dijalankan untuk i = 1 sampai 5, sehingga ada 5 putaran. Setelah itu i = 6 dan kondisi salah.'
      },
      {
        id: 'b4q5',
        type: 'sequence',
        prompt: 'Urutkan baris pseudocode untuk menghitung luas persegi panjang.',
        instruction: 'Susun aksi dari input hingga output.',
        items: [
          { id: 'out', label: 'tulis(luas)' },
          { id: 'readl', label: 'baca(l)' },
          { id: 'calc', label: 'luas ← p × l' },
          { id: 'readp', label: 'baca(p)' }
        ],
        initialOrder: ['calc', 'out', 'readp', 'readl'],
        correctOrder: ['readp', 'readl', 'calc', 'out'],
        hints: ['Nilai p dan l harus dibaca sebelum dikalikan.', 'Output membutuhkan hasil perhitungan terlebih dahulu.'],
        explanation: 'Urutan yang benar: baca(p) → baca(l) → luas ← p × l → tulis(luas).'
      },
      {
        id: 'b4q6',
        type: 'choice',
        prompt: 'Setelah proses <code>i ← i + 1</code> pada flowchart perulangan, alur kembali ke…',
        options: [
          'Simbol Mulai.',
          'Simbol keputusan <code>i ≤ n?</code>.',
          'Simbol Selesai.'
        ],
        answer: 1,
        hints: ['Periksa garis yang berputar kembali ke atas.', 'Nilai i yang baru harus diuji ulang sebelum badan loop dijalankan lagi.'],
        explanation: 'Alur kembali ke keputusan untuk memeriksa nilai i yang sudah diperbarui. Jika masih memenuhi syarat, badan loop dijalankan lagi.'
      }
    ]
  });
})();
