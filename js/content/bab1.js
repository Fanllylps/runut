(function () {
  'use strict';
  const { codeBlock, note, practice } = window.RUNUT.helpers;

  window.RUNUT.chapters.push({
    id: 'bab-1',
    number: '01',
    slug: 'konsep',
    title: 'Konsep dasar algoritma',
    heroTitle: 'Algoritma: cara berpikir sebelum menulis kode.',
    shortTitle: 'Konsep dasar algoritma',
    summary: 'Pahami algoritma sebagai urutan langkah untuk mencapai tujuan, kenali lima cirinya, dan lihat bagaimana masalah diterjemahkan menjadi solusi.',
    themeClass: 'theme-lime',
    accent: '#d8f36a',
    duration: '± 30 menit',
    level: 'Fondasi',
    goals: [
      'Menjelaskan algoritma dengan kata-katamu sendiri.',
      'Mengenali input, proses, output, dan lima ciri algoritma.',
      'Membedakan algoritma dari bahasa atau kode program.',
      'Menelusuri keputusan pada kasus sehari-hari dan bisnis.'
    ],
    sections: [
      {
        id: 'pengertian',
        navTitle: 'Apa itu algoritma?',
        title: 'Algoritma adalah resep untuk menyelesaikan masalah.',
        lead: 'Kamu tidak perlu komputer untuk berlatih algoritma. Yang dibutuhkan hanya tujuan yang jelas dan langkah yang masuk akal untuk mencapainya.',
        minutes: '5 menit',
        html: `
          <p>Bayangkan kamu ingin membuat kopi. Kamu menyiapkan bahan, memasukkan kopi, menuang air panas, mengaduk, lalu memeriksa rasa. Urutan itu punya tujuan, aturan, dan akhir yang jelas. Inilah pola pikir algoritmik.</p>

          <div class="definition-panel">
            <span class="block-label">Definisi kerja</span>
            <p><strong>Algoritma</strong> adalah urutan langkah yang logis, sistematis, dan terstruktur untuk menyelesaikan masalah atau mencapai tujuan tertentu.</p>
            <div class="word-strip" role="group" aria-label="Tiga kata kunci algoritma">
              <span>logis — masuk akal</span>
              <span>sistematis — punya urutan</span>
              <span>terstruktur — jelas batasnya</span>
            </div>
          </div>

          <h3 class="subhead">Algoritma tidak selalu berupa kode</h3>
          <p>Algoritma bisa diucapkan, ditulis sebagai resep, digambar sebagai diagram alur, atau baru kemudian diubah menjadi program. Komputer menjalankan program; <strong>logika penyelesaiannya</strong> tetap berasal dari algoritma.</p>

          <p>Rinaldi Munir mendefinisikan algoritma sebagai urutan langkah logis penyelesaian masalah yang disusun secara sistematis dan terencana. Kuncinya bukan bahasa yang dipakai, melainkan keabsahan logika dan hasil yang dapat diuji.</p>

          <div class="lab" data-lab="coffee">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 01 · urutan langkah</span>
                <h3>Seduh kopi, satu langkah setiap kali.</h3>
                <p>Perhatikan bahan yang masuk, proses yang terjadi, keputusan di tengah jalan, dan hasil akhirnya.</p>
              </div>
              <span class="lab-status" data-coffee-status>Siap mulai</span>
            </div>
            <div class="lab-body">
              <div class="coffee-layout">
                <div class="coffee-visual" data-coffee-visual data-stage="0" aria-hidden="true">
                  <div class="coffee-steam"><i></i><i></i><i></i></div>
                  <div class="coffee-cup"><span class="coffee-fill"></span><span class="cup-label">kopi</span></div>
                  <div class="coffee-saucer"></div>
                  <div class="coffee-sugar" data-coffee-sugar>+ gula</div>
                  <span class="coffee-output">output</span>
                </div>
                <div class="coffee-steps-wrap">
                  <ol class="coffee-steps" data-coffee-steps>
                    <li data-coffee-step="0"><span class="step-number">01</span><div><strong>Siapkan bahan</strong><small>Gelas, kopi, gula, dan air panas.</small></div><span class="phase-tag">Input</span></li>
                    <li data-coffee-step="1"><span class="step-number">02</span><div><strong>Masukkan kopi dan gula</strong><small>Takaran mengikuti selera.</small></div><span class="phase-tag">Proses</span></li>
                    <li data-coffee-step="2"><span class="step-number">03</span><div><strong>Tuangkan air panas</strong><small>Isi gelas secukupnya.</small></div><span class="phase-tag">Proses</span></li>
                    <li data-coffee-step="3"><span class="step-number">04</span><div><strong>Aduk hingga larut</strong><small>Campurkan kopi, gula, dan air.</small></div><span class="phase-tag">Proses</span></li>
                    <li data-coffee-step="4"><span class="step-number">05</span><div><strong>Cicipi. Kurang manis?</strong><small>Jika ya, tambahkan gula. Jika tidak, lanjut.</small></div><span class="phase-tag phase-tag-decision">Keputusan</span></li>
                    <li data-coffee-step="5"><span class="step-number">06</span><div><strong>Sajikan kopi</strong><small>Tujuan tercapai.</small></div><span class="phase-tag phase-tag-output">Output</span></li>
                  </ol>
                </div>
              </div>
              <div class="lab-caption" data-coffee-caption aria-live="polite">
                <span class="caption-mark">01</span>
                <p>Tekan <strong>Langkah berikutnya</strong> untuk menjalankan instruksi pertama.</p>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol simulasi kopi">
              <button type="button" class="btn btn-small btn-quiet" data-coffee-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-coffee-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-coffee-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-coffee-reset>Ulangi</button>
            </div>
          </div>

          <h3 class="subhead">Mengapa urutannya penting?</h3>
          <p>Menuang air sebelum memasukkan kopi tetap menghasilkan minuman, tetapi hasilnya bisa berbeda. Begitu pula dalam program: urutan membaca input, menghitung, dan menampilkan hasil menentukan jawaban yang keluar. Algoritma yang baik membuat urutan itu <em>disepakati dan bisa diuji</em>, bukan bergantung pada tebakan.</p>

          ${note('Asal nama', '<p>Kata <strong>algoritma</strong> berakar dari nama ilmuwan Persia abad ke-9, <strong>Al-Khawarizmi</strong>, yang merintis sistematika perhitungan. Inti idenya tetap sama: langkah hitung yang runtut dan bisa diikuti.</p>', 'edge')}

          ${practice('Coba susun versi kopimu', '<p>Tulis lima langkah membuat minuman favoritmu. Lalu tandai mana yang termasuk <strong>input</strong>, <strong>proses</strong>, <strong>keputusan</strong>, dan <strong>output</strong>.</p>', '<p>Contoh: (1) Siapkan air, teh, dan gula <em>— input</em>; (2) Masukkan teh ke gelas <em>— proses</em>; (3) Tuang air panas <em>— proses</em>; (4) Cek rasa; kurang manis? <em>— keputusan</em>; (5) Teh siap disajikan <em>— output</em>.</p>')}
        `,
        check: {
          question: 'Apa yang membuat urutan membuat kopi tadi disebut algoritma?',
          hint: 'Fokus pada sifat langkahnya, bukan pada alat yang dipakai.',
          options: [
            'Karena harus dijalankan oleh komputer.',
            'Karena punya tujuan, langkah logis, keputusan, dan hasil akhir.',
            'Karena menggunakan bahan-bahan yang mahal.'
          ],
          answer: 1,
          explanation: 'Algoritma menekankan tujuan dan langkah logis yang terurut. Kopi dibuat tanpa komputer, tetapi langkahnya tetap dapat disebut algoritma.'
        }
      },
      {
        id: 'ciri',
        navTitle: 'Ciri & alur algoritma',
        title: 'Input masuk, proses berjalan, output keluar.',
        lead: 'Algoritma yang dapat diuji punya data masukan, proses yang jelas, dan hasil. Lima ciri berikut membuatnya layak dijalankan dan diperiksa.',
        minutes: '6 menit',
        html: `
          <p>Bayangkan kasir menghitung total belanja. Harga dan jumlah barang masuk sebagai <strong>input</strong>. Operasi perkalian dan penjumlahan adalah <strong>proses</strong>. Angka total yang ditampilkan adalah <strong>output</strong>.</p>

          <div class="lab" data-lab="ipo">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 02 · input → proses → output</span>
                <h3>Telusuri satu perhitungan dari awal sampai akhir.</h3>
                <p>Ubah harga dan jumlah, lalu jalankan alurnya pelan-pelan.</p>
              </div>
              <span class="lab-status" data-ipo-status>Belum dijalankan</span>
            </div>
            <div class="lab-body">
              <div class="inline-fields">
                <label class="field">Harga per barang <span class="field-hint">rupiah</span>
                  <input data-ipo-price type="number" min="0" step="500" value="15000" inputmode="numeric">
                </label>
                <label class="field">Jumlah barang
                  <input data-ipo-qty type="number" min="1" step="1" value="3" inputmode="numeric">
                </label>
              </div>
              <div class="ipo-board">
                <div class="ipo-stage is-current" data-ipo-stage="input">
                  <span class="stage-label">01 / Input</span>
                  <div class="stage-values">
                    <span>harga <strong data-ipo-price-out>15.000</strong></span>
                    <span>jumlah <strong data-ipo-qty-out>3</strong></span>
                  </div>
                  <small>Data yang diberikan ke algoritma.</small>
                </div>
                <div class="ipo-connector" data-ipo-connector aria-hidden="true"><span></span></div>
                <div class="ipo-stage" data-ipo-stage="process">
                  <span class="stage-label">02 / Proses</span>
                  <div class="stage-equation" data-ipo-equation>harga × jumlah</div>
                  <small>Aturan yang mengolah input.</small>
                </div>
                <div class="ipo-connector" data-ipo-connector aria-hidden="true"><span></span></div>
                <div class="ipo-stage" data-ipo-stage="output">
                  <span class="stage-label">03 / Output</span>
                  <div class="stage-value" data-ipo-output>Rp45.000</div>
                  <small>Hasil yang siap dipakai.</small>
                </div>
              </div>
              <div class="lab-caption" data-ipo-caption aria-live="polite">
                <span class="caption-mark">01</span>
                <p>Input sudah tersedia. Tekan langkah berikutnya untuk memprosesnya.</p>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol alur input proses output">
              <button type="button" class="btn btn-small btn-quiet" data-ipo-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-ipo-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-ipo-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-ipo-reset>Ulangi</button>
            </div>
          </div>

          <h3 class="subhead">Lima ciri yang membuatnya bisa dipercaya</h3>
          <p>Klik setiap ciri untuk melihat contohnya pada kasus menghitung total belanja.</p>
          <div class="trait-lab" data-lab="traits">
            <div class="trait-grid" role="group" aria-label="Lima ciri algoritma">
              <button type="button" class="trait-card is-selected" data-trait="input" aria-pressed="true"><span class="trait-symbol">→</span><span class="trait-name">Input</span><small>data masukan</small></button>
              <button type="button" class="trait-card" data-trait="output" aria-pressed="false"><span class="trait-symbol">←</span><span class="trait-name">Output</span><small>hasil yang jelas</small></button>
              <button type="button" class="trait-card" data-trait="definiteness" aria-pressed="false"><span class="trait-symbol">=</span><span class="trait-name">Definiteness</span><small>tidak ambigu</small></button>
              <button type="button" class="trait-card" data-trait="finiteness" aria-pressed="false"><span class="trait-symbol">■</span><span class="trait-name">Finiteness</span><small>pasti berakhir</small></button>
              <button type="button" class="trait-card" data-trait="effectiveness" aria-pressed="false"><span class="trait-symbol">✓</span><span class="trait-name">Effectiveness</span><small>dapat dikerjakan</small></button>
            </div>
            <div class="trait-detail" data-trait-detail aria-live="polite">
              <div class="trait-detail-head"><span class="block-label">Contoh pada total belanja</span><span class="trait-count" data-trait-count>01 / 05</span></div>
              <h3 data-trait-title>Input: bahan untuk diproses.</h3>
              <p data-trait-copy>Harga per barang dan jumlah barang dibutuhkan sebelum total dapat dihitung. Tanpa data itu, algoritma tidak punya bahan untuk diolah.</p>
            </div>
          </div>

          <div class="split-note">
            <div>
              <span class="block-label">Urutan</span>
              <p>Input → proses → output memberi kita cara memeriksa kebenaran: apakah data masuk sudah lengkap, proses sudah tepat, dan keluaran sesuai tujuan?</p>
            </div>
            <div>
              <span class="block-label">Konsistensi</span>
              <p>Dengan input yang sama, algoritma yang benar harus menghasilkan output yang sama. Inilah dasar dari pengujian program.</p>
            </div>
          </div>

          ${practice('Uji satu kasus ekstrem', '<p>Pada simulasi di atas, coba isi jumlah barang dengan 1 dan harga 0. Apakah proses tetap berjalan? Output apa yang muncul? Mengapa kasus seperti ini penting diuji?</p>', '<p>Proses tetap dapat berjalan dan menghasilkan total 0. Kasus batas seperti ini membantu memastikan algoritma tidak menghasilkan pembagian nol, angka negatif, atau output yang tidak masuk akal.</p>')}
        `,
        check: {
          question: 'Sebuah algoritma diminta “memproses data secukupnya”. Ciri mana yang paling bermasalah?',
          hint: 'Bayangkan kamu harus menjalankan instruksi itu sebagai komputer.',
          options: [
            'Effectiveness, karena komputer tidak tahu “secukupnya” itu berapa.',
            'Definiteness, karena langkahnya ambigu dan bisa ditafsirkan berbeda.',
            'Output, karena tidak ada hasil.'
          ],
          answer: 1,
          explanation: 'Definiteness berarti setiap langkah jelas dan tidak ambigu. “Secukupnya” tidak memberi aturan yang sama bagi setiap pelaksana.'
        }
      },
      {
        id: 'tujuan',
        navTitle: 'Tujuan & peran',
        title: 'Algoritma membuat masalah selesai dengan lebih terarah.',
        lead: 'Ciri-ciri membuat algoritma bisa dipercaya. Tujuan dan perannya menjelaskan mengapa algoritma layak disusun sebelum program ditulis.',
        minutes: '6 menit',
        html: `
          <p>Algoritma bukan formalitas sebelum menulis kode. Ia membantu memecah persoalan, menjaga proses tetap konsisten, dan memberi dasar untuk menguji solusi. Berikut lima tujuan utamanya.</p>

          <div class="application-grid goal-grid" role="list" aria-label="Lima tujuan algoritma">
            <div class="application-item" role="listitem"><span>01</span><div><strong>Memecah masalah kompleks</strong><p>Mengubah persoalan besar menjadi langkah kecil yang bisa dikerjakan satu per satu.</p></div></div>
            <div class="application-item" role="listitem"><span>02</span><div><strong>Menjaga proses konsisten</strong><p>Aturan dan urutan yang sama dipakai setiap kali masalah serupa muncul.</p></div></div>
            <div class="application-item" role="listitem"><span>03</span><div><strong>Mengurangi ambiguitas</strong><p>Langkah yang jelas mengurangi tafsir ganda dan kesalahan pelaksanaan.</p></div></div>
            <div class="application-item" role="listitem"><span>04</span><div><strong>Memudahkan implementasi</strong><p>Rencana logis lebih mudah diterjemahkan menjadi kode program.</p></div></div>
            <div class="application-item" role="listitem"><span>05</span><div><strong>Memudahkan pengujian</strong><p>Setiap langkah dapat diperiksa, didokumentasikan, dan diperbaiki saat hasilnya meleset.</p></div></div>
          </div>

          <h3 class="subhead">Dari masalah ke implementasi</h3>
          <p>Peran algoritma dalam penyelesaian masalah bukan hanya menghasilkan jawaban. Ia menuntun lima tahap berikut secara berurutan, lalu mengulang tahap yang perlu diperbaiki.</p>

          <ol class="step-list" aria-label="Lima tahap peran algoritma dalam penyelesaian masalah">
            <li><span>01</span><div><strong>Memahami masalah</strong><p>Tentukan input, proses, output, dan batasan yang harus dipenuhi.</p></div></li>
            <li><span>02</span><div><strong>Menyusun solusi</strong><p>Putuskan langkah apa yang dilakukan dan dalam urutan apa, misalnya lewat pseudocode atau flowchart.</p></div></li>
            <li><span>03</span><div><strong>Menguji solusi</strong><p>Periksa apakah semua kondisi sudah ditangani, termasuk nilai batas dan input yang tidak biasa.</p></div></li>
            <li><span>04</span><div><strong>Mengoptimalkan solusi</strong><p>Cari langkah yang tidak perlu, lalu sederhanakan tanpa menghilangkan kebutuhan penting.</p></div></li>
            <li><span>05</span><div><strong>Mengimplementasikan solusi</strong><p>Ubah rancangan yang sudah diuji menjadi program atau sistem, lengkap dengan dokumentasinya.</p></div></li>
          </ol>

          ${note('Uji rancangan sebelum kode', '<p>Menguji solusi tidak harus menunggu program jadi. Telusuri langkah dengan contoh angka, termasuk kasus batas, untuk melihat apakah aturannya sudah konsisten.</p>', 'tip')}

          ${practice('Latihan ala UTS: total pembayaran', '<p>Hitung total pembayaran belanja dengan input harga barang, jumlah barang, dan diskon. Tulis minimal lima langkah, lalu tambahkan satu keputusan: jika total melewati Rp500.000, beri diskon 10%.</p>', '<p>Contoh: (1) baca harga, jumlah, dan diskon; (2) hitung subtotal = harga × jumlah; (3) jika subtotal &gt; Rp500.000, hitung potongan = 10% × subtotal, selain itu potongan = 0; (4) hitung total = subtotal − potongan; (5) tampilkan total. Uji juga total tepat Rp500.000 agar batas “lebih dari” dan “lebih besar atau sama dengan” tidak tertukar.</p>')}
        `,
        check: {
          question: 'Dito menuliskan input, output, dan batasan soal sebelum menyusun langkah. Ia sedang berada pada tahap…',
          hint: 'Tahap ini dilakukan sebelum merancang algoritma.',
          options: ['Memahami masalah.', 'Mengoptimalkan solusi.', 'Mendokumentasikan program.'],
          answer: 0,
          explanation: 'Memahami masalah berarti menjernihkan input, output, dan batasan. Rancangan langkah baru disusun setelah bagian ini jelas.'
        }
      },
      {
        id: 'bukan-kode',
        navTitle: 'Algoritma ≠ kode',
        title: 'Logika dulu, sintaks kemudian.',
        lead: 'Algoritma adalah rencana. Kode adalah salah satu cara menjalankan rencana itu dengan komputer.',
        minutes: '5 menit',
        html: `
          <p>Dua orang dapat menulis program yang sangat berbeda—Python dan JavaScript—tetapi memakai algoritma yang sama. Sebaliknya, dua kode yang mirip bisa menyelesaikan masalah yang berbeda. Karena itu, fokus pertama belajar pemrograman adalah <strong>logika penyelesaian</strong>.</p>

          <div class="lab" data-lab="translation">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 03 · dari masalah ke hasil</span>
                <h3>Terjemahkan satu masalah langkah demi langkah.</h3>
                <p>Pilih tahap untuk melihat benda kerja apa yang dihasilkan.</p>
              </div>
              <span class="lab-status">Diagram interaktif</span>
            </div>
            <div class="lab-body">
              <div class="translation-track" role="tablist" aria-label="Tahap penyelesaian masalah" aria-orientation="horizontal">
                <button type="button" id="translation-tab-0" class="translation-step is-active" data-translation-step="0" role="tab" aria-controls="translation-panel" aria-selected="true" tabindex="0"><span>01</span>Masalah</button>
                <button type="button" id="translation-tab-1" class="translation-step" data-translation-step="1" role="tab" aria-controls="translation-panel" aria-selected="false" tabindex="-1"><span>02</span>Pahami</button>
                <button type="button" id="translation-tab-2" class="translation-step" data-translation-step="2" role="tab" aria-controls="translation-panel" aria-selected="false" tabindex="-1"><span>03</span>Algoritma</button>
                <button type="button" id="translation-tab-3" class="translation-step" data-translation-step="3" role="tab" aria-controls="translation-panel" aria-selected="false" tabindex="-1"><span>04</span>Program</button>
                <button type="button" id="translation-tab-4" class="translation-step" data-translation-step="4" role="tab" aria-controls="translation-panel" aria-selected="false" tabindex="-1"><span>05</span>Uji</button>
                <div class="translation-progress" data-translation-progress aria-hidden="true"></div>
              </div>
              <div class="translation-display" id="translation-panel" data-translation-display role="tabpanel" aria-labelledby="translation-tab-0" tabindex="0" aria-live="polite">
                <span class="block-label" data-translation-label>Masalah · titik awal</span>
                <h3 data-translation-title>Hitung total belanja tiga buku.</h3>
                <p data-translation-copy>Setiap buku berharga Rp25.000. Kita ingin tahu berapa uang yang harus dibayar sebelum menulis kode.</p>
                <div data-translation-artifact></div>
              </div>
            </div>
          </div>

          <div class="compare-table" role="table" aria-label="Perbedaan algoritma dan program">
            <div class="compare-row compare-head" role="row"><span role="columnheader">Algoritma</span><span role="columnheader">Program</span></div>
            <div class="compare-row" role="row"><span role="cell">Menjelaskan <strong>apa</strong> dan <strong>dalam urutan apa</strong>.</span><span role="cell">Menjelaskan bagaimana instruksi ditulis dalam <strong>bahasa tertentu</strong>.</span></div>
            <div class="compare-row" role="row"><span role="cell">Bisa berupa bahasa manusia, pseudocode, atau flowchart.</span><span role="cell">Harus mengikuti aturan sintaks dan dijalankan komputer.</span></div>
            <div class="compare-row" role="row"><span role="cell">Dapat diperiksa tanpa mesin.</span><span role="cell">Dapat dijalankan dan diuji untuk melihat hasil nyata.</span></div>
          </div>

          <h3 class="subhead">Satu logika, dua wajah</h3>
          <div class="side-by-side">
            <div class="natural-steps">
              <span class="block-label">Rencana / bahasa manusia</span>
              <ol>
                <li>Baca harga satu buku dan jumlah buku.</li>
                <li>Kalikan harga dengan jumlah.</li>
                <li>Tampilkan total yang harus dibayar.</li>
              </ol>
            </div>
            ${codeBlock('total_buku.py', 'Python', `harga = 25000
jumlah = 3
total = harga * jumlah
print(total)   # 75000`, 'Baris terakhir menampilkan output. Simbol <code>*</code> berarti perkalian di Python.')}
          </div>

          <p>Perhatikan bahwa menghafal <code>print()</code> bukan inti pelajarannya. Yang lebih penting: <em>mengapa</em> kita mengalikan harga dengan jumlah, dan <em>kapan</em> hasilnya perlu ditampilkan.</p>

          ${note('Istilah yang sering tertukar', '<p><strong>Algoritma</strong> adalah rencana langkah. <strong>Program</strong> adalah implementasi rencana memakai bahasa pemrograman. <strong>Kode</strong> hanya salah satu bentuk nyata dari program; ia bukan definisi algoritma.</p>', 'tip')}

          ${practice('Pisahkan logika dari sintaks', '<p>Tanpa melihat kode di atas, tulis ulang rencananya untuk menghitung total 12 buku dengan harga Rp18.000. Baru setelah itu, tulis satu baris Python untuk perkaliannya.</p>', '<p>Rencana: baca harga dan jumlah, kalikan keduanya, tampilkan hasil. Nilai: <code>18000 * 12 = 216000</code>. Di Python: <code>total = 18000 * 12</code>.</p>')}
        `,
        check: {
          question: 'Seorang teman mengganti program Python menjadi program JavaScript tanpa mengubah urutan logikanya. Apa yang tetap sama?',
          hint: 'Bedakan rencana dengan bahasa yang dipakai.',
          options: [
            'Algoritmanya tetap sama; sintaks dan cara menjalankannya berubah.',
            'Algoritmanya berubah total karena bahasanya berbeda.',
            'Tidak ada yang sama karena program harus selalu ditulis ulang.'
          ],
          answer: 0,
          explanation: 'Algoritma adalah rencana penyelesaian. Bahasa program adalah alat implementasi, sehingga logika yang sama dapat hadir dalam sintaks yang berbeda.'
        }
      },
      {
        id: 'penerapan',
        navTitle: 'Penerapan nyata',
        title: 'Algoritma bekerja di balik keputusan sehari-hari.',
        lead: 'Dari mesin kopi sampai checkout e-commerce, algoritma mengubah data dan aturan menjadi keputusan yang konsisten.',
        minutes: '6 menit',
        html: `
          <p>Algoritma tidak hanya hidup di mata kuliah. Setiap kali aplikasi mencari rute, memvalidasi kata sandi, atau menentukan promo, ada langkah dan aturan yang dijalankan.</p>

          <div class="application-grid">
            <div class="application-item"><span>01</span><div><strong>Kehidupan sehari-hari</strong><p>Resep masakan, rute perjalanan, membagi uang, dan memeriksa daftar belanja.</p></div></div>
            <div class="application-item"><span>02</span><div><strong>E-commerce</strong><p>Pencarian produk, rekomendasi, perhitungan ongkir, promo, dan checkout.</p></div></div>
            <div class="application-item"><span>03</span><div><strong>Perbankan digital</strong><p>Validasi transaksi, pemeriksaan limit, dan deteksi pola transaksi mencurigakan.</p></div></div>
            <div class="application-item"><span>04</span><div><strong>Transportasi online</strong><p>Mencocokkan driver dengan penumpang dan memperkirakan rute serta waktu tiba.</p></div></div>
            <div class="application-item"><span>05</span><div><strong>Media sosial</strong><p>Mengurutkan dan merekomendasikan konten berdasarkan aturan tertentu.</p></div></div>
            <div class="application-item"><span>06</span><div><strong>CRM</strong><p>Segmentasi pelanggan, skor prioritas, dan otomatisasi tindak lanjut.</p></div></div>
          </div>

          <h3 class="subhead">Studi kasus: voucher belanja</h3>
          <p>Sebuah toko digital ingin memberi voucher 10% kepada pelanggan yang memenuhi syarat. Data yang masuk harus diperiksa dengan aturan yang sama untuk semua orang. Coba jalankan aturannya di bawah.</p>

          <div class="lab" data-lab="voucher">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 04 · aturan bisnis</span>
                <h3>Siapa yang mendapat voucher?</h3>
                <p>Ubah input dan lihat bagaimana aturan menghasilkan keputusan.</p>
              </div>
              <span class="lab-status">Simulasi aturan</span>
            </div>
            <div class="lab-body">
              <div class="voucher-layout">
                <div class="voucher-form">
                  <label class="field">Total belanja <span class="field-hint">rupiah</span>
                    <input data-voucher-total type="number" min="0" step="10000" value="620000" inputmode="numeric">
                  </label>
                  <label class="check-field"><input type="checkbox" data-voucher-member checked><span class="fake-check" aria-hidden="true"></span><span>Pelanggan sudah terdaftar</span></label>
                  <label class="check-field"><input type="checkbox" data-voucher-period checked><span class="fake-check" aria-hidden="true"></span><span>Periode promo sedang aktif</span></label>
                  <button type="button" class="btn btn-dark" data-voucher-run>Jalankan aturan <span aria-hidden="true">→</span></button>
                  <p class="field-note">Aturan: total ≥ Rp500.000 <strong>dan</strong> terdaftar <strong>dan</strong> periode aktif.</p>
                </div>
                <div class="voucher-logic">
                  <div class="condition-row" data-voucher-condition="total"><span class="condition-check" aria-hidden="true">•</span><span>Total ≥ Rp500.000</span><strong data-voucher-total-status>menunggu</strong></div>
                  <div class="condition-row" data-voucher-condition="member"><span class="condition-check" aria-hidden="true">•</span><span>Pelanggan terdaftar</span><strong data-voucher-member-status>menunggu</strong></div>
                  <div class="condition-row" data-voucher-condition="period"><span class="condition-check" aria-hidden="true">•</span><span>Periode promo aktif</span><strong data-voucher-period-status>menunggu</strong></div>
                  <div class="voucher-result" data-voucher-result aria-live="polite">
                    <span class="block-label">Hasil</span>
                    <h3 data-voucher-result-title>Jalankan aturan untuk melihat hasil.</h3>
                    <p data-voucher-result-copy>Nilai input belum dievaluasi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          ${note('Contoh alur dan aturan', '<p>Masalah → input (total, status member, periode) → aturan (semua syarat terpenuhi?) → output (voucher 10% atau tanpa voucher). Keputusan yang jelas membuat hasil bisa diuji dan dipertanggungjawabkan.</p>', 'edge')}

          ${practice('Uji batas aturan', '<p>Coba tiga kondisi: total Rp499.000 dengan member aktif; total Rp800.000 tetapi bukan member; dan total Rp500.000 dengan member pada periode aktif. Catat hasil dan alasannya.</p>', '<p>Hasil berurutan: tanpa voucher (di bawah batas), tanpa voucher (syarat member gagal), dan voucher 10% (semua syarat terpenuhi). Kasus batas membantu menemukan kesalahan pada tanda <code>&gt;</code> versus <code>≥</code>.</p>')}
        `,
        check: {
          question: 'Total belanja Rp750.000 dan periode promo aktif, tetapi pelanggan belum terdaftar. Apa yang seharusnya terjadi?',
          hint: 'Semua syarat dihubungkan dengan “dan”.',
          options: [
            'Mendapat voucher karena total belanja sudah besar.',
            'Tidak mendapat voucher karena satu syarat masih gagal.',
            'Mendapat voucher setengahnya.'
          ],
          answer: 1,
          explanation: 'Pada aturan “dan”, semua syarat harus benar. Status pelanggan belum terdaftar membuat hasil akhirnya tidak memenuhi syarat.'
        }
      }
    ],
    recap: {
      title: 'Yang perlu melekat dari Bab 01',
      lead: 'Algoritma adalah cara menyusun solusi, bukan hanya cara menulis kode.',
      points: [
        'Algoritma = langkah logis, sistematis, dan terstruktur untuk mencapai tujuan.',
        'Alur dasarnya: input → proses → output.',
        'Lima ciri penting: input, output, definiteness, finiteness, dan effectiveness.',
        'Tujuan algoritma: memecah masalah kompleks, menjaga konsistensi, mengurangi ambiguitas, serta memudahkan implementasi dan pengujian.',
        'Peran dalam penyelesaian masalah: pahami → susun solusi → uji → optimalkan → implementasikan.',
        'Algoritma dapat ditulis dalam bahasa manusia, pseudocode, flowchart, lalu diimplementasikan menjadi program.',
        'Kasus bisnis menunjukkan bahwa aturan keputusan harus jelas dan dapat diuji.'
      ]
    },
    quiz: [
      {
        id: 'b1q1',
        type: 'choice',
        prompt: 'Pernyataan mana yang paling tepat menjelaskan algoritma?',
        options: [
          'Kumpulan kode yang harus dijalankan komputer.',
          'Urutan langkah logis dan terstruktur untuk mencapai tujuan.',
          'Kumpulan data yang disimpan dalam memori.'
        ],
        answer: 1,
        hints: ['Pikirkan resep kopi yang bisa dijelaskan tanpa komputer.', 'Algoritma lebih dekat ke rencana daripada ke bahasa program.'],
        explanation: 'Algoritma berfokus pada langkah logis untuk menyelesaikan masalah. Kode program hanyalah salah satu bentuk implementasinya.'
      },
      {
        id: 'b1q2',
        type: 'choice',
        prompt: 'Sebuah proses selalu berjalan tanpa pernah mencapai akhir. Ciri algoritma yang tidak terpenuhi adalah…',
        options: ['Input.', 'Output.', 'Finiteness.'],
        answer: 2,
        hints: ['Ingat arti terhingga.', 'Lima ciri: input, output, definiteness, finiteness, effectiveness.'],
        explanation: 'Finiteness berarti langkah algoritma terbatas dan prosesnya pasti berakhir.'
      },
      {
        id: 'b1q3',
        type: 'choice',
        prompt: 'Pelanggan memiliki total belanja Rp620.000, sudah terdaftar, dan promo sedang aktif. Aturannya: total ≥ Rp500.000, terdaftar, dan periode aktif → voucher 10%. Hasil yang benar adalah…',
        options: [
          'Mendapat voucher 10% sebesar Rp62.000.',
          'Tidak mendapat voucher karena pembelian terlalu besar.',
          'Mendapat voucher sebesar Rp620.000.'
        ],
        answer: 0,
        hints: ['Periksa ketiga syarat satu per satu.', 'Voucher 10% dihitung dari total belanja.'],
        explanation: 'Ketiga syarat terpenuhi. Voucher = 10% × Rp620.000 = Rp62.000.'
      },
      {
        id: 'b1q4',
        type: 'choice',
        prompt: 'Hubungan yang paling tepat antara algoritma dan program adalah…',
        options: [
          'Program adalah satu-satunya bentuk algoritma.',
          'Algoritma adalah rencana; program adalah implementasi rencana dalam bahasa tertentu.',
          'Algoritma dan program selalu memiliki sintaks yang sama.'
        ],
        answer: 1,
        hints: ['Bedakan rencana dan alat untuk menjalankannya.', 'Bahasa manusia atau flowchart juga bisa menyatakan algoritma.'],
        explanation: 'Algoritma dapat ditulis dalam banyak bentuk. Program adalah implementasi algoritma dengan aturan sintaks bahasa pemrograman.'
      },
      {
        id: 'b1q5',
        type: 'sequence',
        prompt: 'Susun langkah algoritma menghitung total belanja setelah diskon ke urutan yang benar.',
        instruction: 'Gunakan tombol naik/turun. Tidak perlu menulis kode.',
        items: [
          { id: 'tampil', label: 'Tampilkan total akhir.' },
          { id: 'hitung', label: 'Hitung total = harga × jumlah.' },
          { id: 'diskon', label: 'Jika total ≥ Rp500.000, kurangi 10% dari total.' },
          { id: 'baca', label: 'Baca harga barang dan jumlah barang.' }
        ],
        initialOrder: ['tampil', 'diskon', 'baca', 'hitung'],
        correctOrder: ['baca', 'hitung', 'diskon', 'tampil'],
        hints: ['Data masuk harus dibaca sebelum bisa dihitung.', 'Diskon bergantung pada total yang sudah dihitung.'],
        explanation: 'Urutannya: baca input → hitung total → periksa syarat diskon → tampilkan hasil. Keputusan diskon tidak bisa dilakukan sebelum nilai total diketahui.'
      },
      {
        id: 'b1q6',
        type: 'input',
        prompt: 'Sebuah algoritma menerima harga = 12.000 dan jumlah = 4, lalu menghitung total = harga × jumlah. Berapa output angkanya?',
        placeholder: 'Tulis angka saja, misalnya 12000',
        accepted: ['48000', '48.000', 'rp48000', 'rp48.000'],
        hints: ['Kalikan 12.000 dengan 4.', 'Tulis angka tanpa simbol Rp.'],
        explanation: '12.000 × 4 = 48.000. Output yang diharapkan adalah 48000.'
      },
      {
        id: 'b1q7',
        type: 'choice',
        prompt: 'Mengapa algoritma sebaiknya disusun sebelum program ditulis?',
        options: [
          'Agar logika dan urutan langkah bisa diperiksa tanpa terganggu detail sintaks.',
          'Agar program tidak perlu diuji lagi setelah dijalankan.',
          'Karena setiap algoritma wajib menggunakan pseudocode.'
        ],
        answer: 0,
        hints: ['Bedakan rencana penyelesaian dari bahasa implementasinya.', 'Algoritma dapat ditinjau sebelum kode dibuat.'],
        explanation: 'Algoritma membuat logika terlihat lebih awal. Rancangan dapat diuji dan diperbaiki sebelum diterjemahkan menjadi kode; pengujian program tetap diperlukan.'
      }
    ]
  });
})();
