(function () {
  'use strict';
  const { codeBlock, note, practice } = window.RUNUT.helpers;

  window.RUNUT.chapters.push({
    id: 'bab-3',
    number: '03',
    slug: 'data',
    title: 'Variabel, tipe data, dan operator',
    heroTitle: 'Beri nama pada data, lalu atur cara mengolahnya.',
    shortTitle: 'Variabel, tipe data & operator',
    summary: 'Bangun intuisi tentang tempat penyimpanan nilai, empat tipe data dasar Python, tiga keluarga operator, dan urutan evaluasi ekspresi.',
    themeClass: 'theme-peach',
    accent: '#ffb59b',
    duration: '± 45 menit',
    level: 'Praktik',
    goals: [
      'Membedakan variabel, nilai, dan konstanta.',
      'Menentukan tipe data int, float, str, dan bool.',
      'Menggunakan operator aritmatika, relasional, dan logika.',
      'Menjelaskan hasil ekspresi berdasarkan prioritas operator.'
    ],
    sections: [
      {
        id: 'variabel',
        navTitle: 'Variabel & konstanta',
        title: 'Variabel adalah wadah bernama.',
        lead: 'Saat program menyimpan nilai, ia memberi nama pada tempat penyimpanan itu. Nama memungkinkan nilainya dipakai dan diubah kembali.',
        minutes: '7 menit',
        html: `
          <p>Bayangkan tiga kotak berlabel <code>nama</code>, <code>umur</code>, dan <code>ipk</code>. Setiap kotak menyimpan satu nilai. Ketika program menulis <code>umur = 18</code>, nilai 18 dimasukkan ke kotak bernama <code>umur</code>.</p>

          <div class="definition-strip">
            <div><span class="block-label">Nama</span><strong>identifier</strong><small>cara kita memanggil kotak</small></div>
            <div><span class="block-label">Nilai</span><strong>data</strong><small>isi yang disimpan</small></div>
            <div><span class="block-label">Tipe</span><strong>jenis data</strong><small>menentukan operasi yang masuk akal</small></div>
          </div>

          <div class="lab" data-lab="variable">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 01 · eksekusi variabel</span>
                <h3>Lihat isi kotak berubah, baris demi baris.</h3>
                <p>Ubah dua nilai awal lalu jalankan program. Perhatikan nilai sebelum dan sesudah setiap instruksi.</p>
              </div>
              <span class="lab-status" data-variable-status>Baris belum dijalankan</span>
            </div>
            <div class="lab-body">
              <div class="variable-layout">
                <div class="variable-code-column">
                  <div class="mini-form">
                    <label class="field field-compact">Nilai pertama <input data-variable-first type="number" step="1" value="18" inputmode="numeric"></label>
                    <label class="field field-compact">Nilai kedua <input data-variable-second type="number" step="1" value="19" inputmode="numeric"></label>
                    <button type="button" class="btn btn-small btn-quiet" data-variable-apply>Terapkan</button>
                  </div>
                  <div class="trace-code" data-variable-code>
                    <span class="trace-line" data-variable-line="0"><span class="trace-number">1</span><code>umur = <b data-variable-code-first>18</b></code></span>
                    <span class="trace-line" data-variable-line="1"><span class="trace-number">2</span><code>umur = <b data-variable-code-second>19</b></code></span>
                    <span class="trace-line" data-variable-line="2"><span class="trace-number">3</span><code>umur = umur + 1</code></span>
                    <span class="trace-line" data-variable-line="3"><span class="trace-number">4</span><code>print(umur)</code></span>
                  </div>
                  <div class="console-line"><span>OUTPUT</span><code data-variable-output>—</code></div>
                </div>
                <div class="variable-memory-column">
                  <div class="memory-head"><span>Memori program</span><span class="live-indicator"><i></i> lokal</span></div>
                  <div class="variable-box" data-variable-box>
                    <div class="variable-box-top"><span class="block-label">Nama</span><strong>umur</strong></div>
                    <div class="variable-box-value" data-variable-value>—</div>
                    <div class="variable-box-type" data-variable-type>belum ada nilai</div>
                  </div>
                  <div class="before-after" data-variable-transition>
                    <div><span>Sebelum</span><strong data-variable-before>—</strong></div>
                    <b aria-hidden="true">→</b>
                    <div><span>Sesudah</span><strong data-variable-after>—</strong></div>
                  </div>
                  <div class="variable-log" data-variable-log aria-live="polite">
                    <span class="block-label">Penelusuran</span>
                    <p>Program siap. Jalankan baris pertama.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol simulasi variabel">
              <button type="button" class="btn btn-small btn-quiet" data-variable-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-variable-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-variable-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-variable-reset>Ulangi</button>
            </div>
          </div>

          <h3 class="subhead">Aturan memberi nama variabel</h3>
          <div class="split-list">
            <div>
              <span class="block-label">Boleh</span>
              <ul class="check-list">
                <li>Diawali huruf atau garis bawah (<code>_</code>).</li>
                <li>Berisi huruf, angka, dan garis bawah.</li>
                <li>Gunakan nama bermakna seperti <code>nilai_uas</code>.</li>
              </ul>
            </div>
            <div>
              <span class="block-label">Tidak boleh</span>
              <ul class="cross-list">
                <li>Diawali angka: <code>2nama</code>.</li>
                <li>Mengandung spasi: <code>nilai uas</code>.</li>
                <li>Memakai kata kunci seperti <code>for</code> atau <code>if</code>.</li>
              </ul>
            </div>
          </div>
          <p>Python juga membedakan huruf besar dan kecil. Artinya <code>nama</code> dan <code>Nama</code> adalah dua variabel yang berbeda.</p>

          <div class="tool-card" data-lab="name-checker">
            <div class="tool-head">
              <div><span class="lab-tag">Alat cek nama</span><h3>Apakah nama ini valid di Python?</h3></div>
              <span class="lab-status" data-name-status>Menunggu</span>
            </div>
            <div class="tool-body">
              <div class="inline-control">
                <label class="visually-hidden" for="name-input">Nama variabel yang ingin diperiksa</label>
                <input id="name-input" class="text-input" data-name-input value="nilai_uas" spellcheck="false" autocomplete="off">
                <button type="button" class="btn btn-dark" data-name-check>Cek nama</button>
              </div>
              <div class="chip-row" role="group" aria-label="Contoh nama variabel">
                <button type="button" class="chip" data-name-sample="nilai_uas">nilai_uas</button>
                <button type="button" class="chip" data-name-sample="2nama">2nama</button>
                <button type="button" class="chip" data-name-sample="nilai uas">nilai uas</button>
                <button type="button" class="chip" data-name-sample="for">for</button>
              </div>
              <div class="name-result" data-name-result aria-live="polite">
                <strong>nilai_uas valid.</strong>
                <p>Diawali huruf, hanya memakai huruf kecil dan garis bawah, serta bukan kata kunci Python.</p>
              </div>
            </div>
          </div>

          <h3 class="subhead">Variabel berubah, konstanta dijaga tetap</h3>
          <p>Konstanta adalah nilai yang secara konsep tidak berubah selama program berjalan. Python tidak memiliki konstanta sejati; penulisannya memakai konvensi <strong>huruf kapital</strong>. Bahasa seperti C atau Java memiliki <code>const</code> atau <code>final</code>.</p>
          ${codeBlock('lingkaran.py', 'Python', `PI = 3.14159
PPN = 0.11

r = 7
luas = PI * r * r
print(luas)   # 153.93791`, 'Dengan r = 7 dan PI = 3.14159, hasilnya 153.93791. Nama kapital mengingatkan kita agar tidak mengubah nilai PI atau PPN di tengah program.')}

          ${practice('Tentukan isi kotak', '<p>Tanpa menjalankan kode, tebak nilai akhir <code>umur</code>:</p><pre><code>umur = 18\numur = 19\numur = 25\numur = 19</code></pre>', '<p>Nilai akhirnya <strong>19</strong>. Setiap assignment menggantikan nilai sebelumnya; baris terakhir yang menang.</p>')}
        `,
        check: {
          question: 'Setelah dua baris ini dijalankan, berapa isi <code>umur</code>?<br><code>umur = 20</code><br><code>umur = 21</code>',
          hint: 'Assignment berikutnya menggantikan nilai di kotak yang sama.',
          options: ['20', '21', '41'],
          answer: 1,
          explanation: 'Baris kedua menimpa nilai sebelumnya. Variabel <code>umur</code> sekarang berisi 21, bukan hasil penjumlahan.'
        }
      },
      {
        id: 'tipe-data',
        navTitle: 'Tipe data',
        title: 'Jenis nilai menentukan cara ia diperlakukan.',
        lead: 'Angka bisa dihitung, teks bisa digabung, dan boolean dipakai untuk keputusan. Python menyebut jenis ini sebagai tipe data.',
        minutes: '7 menit',
        html: `
          <p><code>42</code>, <code>3.14</code>, <code>"Ani"</code>, dan <code>True</code> terlihat seperti empat nilai biasa. Bagi Python, keempatnya memiliki tipe berbeda dan aturan pemakaian yang berbeda.</p>

          <div class="lab" data-lab="types">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 02 · laboratorium tipe</span>
                <h3>Pilih nilai, lihat tipe Python-nya.</h3>
                <p>Setelah mengenal empat tipe dasar, uji literal buatanmu sendiri.</p>
              </div>
              <span class="lab-status">Pemeriksa literal</span>
            </div>
            <div class="lab-body">
              <div class="type-tabs" role="group" aria-label="Pilih tipe data">
                <button type="button" class="type-tab is-active" data-type-tab="int" aria-pressed="true"><strong>42</strong><span>Integer</span></button>
                <button type="button" class="type-tab" data-type-tab="float" aria-pressed="false"><strong>3.14</strong><span>Float</span></button>
                <button type="button" class="type-tab" data-type-tab="str" aria-pressed="false"><strong>"Aa"</strong><span>String</span></button>
                <button type="button" class="type-tab" data-type-tab="bool" aria-pressed="false"><strong>True</strong><span>Boolean</span></button>
              </div>
              <div class="type-readout" data-type-readout>
                <div class="type-value"><span>Contoh</span><strong data-type-value>42</strong></div>
                <div class="type-copy">
                  <span class="block-label" data-type-label>Integer · int</span>
                  <h3 data-type-title>Bilangan bulat.</h3>
                  <p data-type-description>Dipakai untuk jumlah, umur, tahun, atau jumlah barang. Tidak memiliki bagian desimal.</p>
                  <code data-type-function>type(42) → &lt;class 'int'&gt;</code>
                </div>
              </div>
              <div class="conversion-strip" role="group" aria-label="Konversi tipe data">
                <div><code>int(3.9)</code><span>→</span><strong>3</strong><small>desimal dipotong</small></div>
                <div><code>float(7)</code><span>→</span><strong>7.0</strong><small>menjadi float</small></div>
                <div><code>str(42)</code><span>→</span><strong>"42"</strong><small>angka menjadi teks</small></div>
                <div><code>bool(0)</code><span>→</span><strong>False</strong><small>0 dianggap salah</small></div>
              </div>
              <div class="literal-checker">
                <div class="literal-copy">
                  <span class="block-label">Coba sendiri</span>
                  <h3>Ketik sebuah nilai Python.</h3>
                  <p>Gunakan tanda kutip untuk teks. Angka tanpa kutip adalah numerik.</p>
                </div>
                <div class="inline-control">
                  <label class="visually-hidden" for="literal-input">Nilai Python yang ingin diperiksa</label>
                  <input id="literal-input" class="text-input mono-input" data-literal-input value="14999.50" spellcheck="false" autocomplete="off">
                  <button type="button" class="btn btn-dark" data-literal-check>Cek tipe</button>
                </div>
                <div class="chip-row" role="group" aria-label="Contoh nilai dari materi">
                  <button type="button" class="chip" data-literal-sample="35">35</button>
                  <button type="button" class="chip" data-literal-sample="14999.50">14999.50</button>
                  <button type="button" class="chip" data-literal-sample="&quot;Universitas ABC&quot;">"Universitas ABC"</button>
                  <button type="button" class="chip" data-literal-sample="True">True</button>
                  <button type="button" class="chip" data-literal-sample="-5">-5</button>
                </div>
                <div class="literal-result" data-literal-result aria-live="polite">
                  <span class="block-label">Hasil pemeriksaan</span>
                  <code>type(14999.50) → &lt;class 'float'&gt;</code>
                  <p>Float menyimpan bilangan desimal. Nilai ini cocok untuk IPK atau harga.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="type-notes">
            <div><span class="type-note-index">int</span><strong>Bilangan bulat</strong><p>Positif, nol, atau negatif tanpa titik desimal. Contoh: <code>-5</code>, <code>0</code>, <code>42</code>.</p></div>
            <div><span class="type-note-index">float</span><strong>Bilangan desimal</strong><p>Memakai titik desimal. Contoh: <code>3.14</code>, <code>-0.5</code>, <code>14999.50</code>.</p></div>
            <div><span class="type-note-index">str</span><strong>Teks</strong><p>Rangkaian karakter dalam kutip tunggal atau ganda. Contoh: <code>"Halo"</code>, <code>'Ani'</code>.</p></div>
            <div><span class="type-note-index">bool</span><strong>Benar / salah</strong><p>Hanya <code>True</code> atau <code>False</code>. Huruf awal kapital dan tanpa tanda kutip.</p></div>
          </div>

          ${codeBlock('tipe_data.py', 'Python', `nama = "Ani"
umur = 20
ipk = 3.75
lulus = True

print(type(nama))   # <class 'str'>
print(type(umur))   # <class 'int'>
print(type(ipk))    # <class 'float'>
print(type(lulus))  # <class 'bool'>`, 'Nilai <code>"20"</code> akan bertipe string karena memakai tanda kutip. Tipe ditentukan oleh bentuk nilai, bukan oleh nama variabelnya.')}

          <p>String punya operasi sendiri. Tanda <code>+</code> menggabungkan teks, sedangkan <code>len()</code> menghitung jumlah karakter. Keduanya tidak mengubah teks menjadi angka.</p>
          ${codeBlock('teks.py', 'Python', `nama = "Ani"
sapa = "Halo, " + nama
print(sapa)       # Halo, Ani
print(len(nama))  # 3`, 'Penggabungan string menempelkan teks persis seperti penulisannya. <code>len()</code> menghitung karakter, termasuk spasi bila ada.')}

          ${note('String bukan angka', '<p><code>"35" + 1</code> bukan <code>36</code>. Python akan memberi error karena teks dan angka tidak bisa dijumlahkan dengan cara itu. Untuk mengubah teks angka menjadi integer, gunakan <code>int("35")</code>.</p>', 'warning')}

          ${practice('Tebak tipe sebelum dicek', '<p>Tulis nilai dari soal materi: <code>35</code>, <code>14999.50</code>, <code>"Universitas ABC"</code>, <code>True</code>, dan <code>-5</code>. Tentukan tipenya, lalu cek di laboratorium.</p>', '<p>Urutan tipe: <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>, <code>int</code>. Angka negatif tetap int selama tidak memiliki titik desimal.</p>')}
        `,
        check: {
          question: 'Apa tipe data Python untuk nilai <code>14999.50</code>?',
          hint: 'Perhatikan adanya titik desimal dan tidak ada tanda kutip.',
          options: ['int', 'float', 'str'],
          answer: 1,
          explanation: 'Nilai dengan bagian desimal bertipe float. Tanpa tanda kutip, ia tetap dianggap angka, bukan teks.'
        }
      },
      {
        id: 'operator',
        navTitle: 'Operator aritmatika & relasional',
        title: 'Operator mengubah nilai menjadi hasil baru.',
        lead: 'Operator aritmatika melakukan perhitungan. Operator relasional membandingkan dua nilai dan menghasilkan True atau False.',
        minutes: '8 menit',
        html: `
          <p>Pada ekspresi <code>7 + 2</code>, angka 7 dan 2 adalah <strong>operand</strong>, sedangkan <code>+</code> adalah <strong>operator</strong>. Operator bekerja sesuai jenis nilai dan aturan yang sudah ditetapkan.</p>

          <div class="operator-reference">
            <div><span class="block-label">Aritmatika</span><code>+ &nbsp; - &nbsp; * &nbsp; / &nbsp; // &nbsp; % &nbsp; **</code><small>menghasilkan angka</small></div>
            <div><span class="block-label">Relasional</span><code>== &nbsp; != &nbsp; &gt; &nbsp; &lt; &nbsp; &gt;= &nbsp; &lt;=</code><small>menghasilkan bool</small></div>
          </div>

          <div class="lab" data-lab="operators">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 03 · kalkulator interaktif</span>
                <h3>Ubah angka dan operator, baca prosesnya.</h3>
                <p>Hasil bukan satu-satunya hal yang penting. Lihat bagaimana nilainya diperoleh.</p>
              </div>
              <span class="lab-status" data-operator-status>Menghitung</span>
            </div>
            <div class="lab-body">
              <div class="operator-tabs">
                <button type="button" class="operator-tab is-active" data-operator-mode="arithmetic" aria-pressed="true">Aritmatika</button>
                <button type="button" class="operator-tab" data-operator-mode="relational" aria-pressed="false">Relasional</button>
                <button type="button" class="operator-tab" data-operator-mode="logic" aria-pressed="false">Logika</button>
                <span class="operator-mode-note" data-operator-mode-note>Aritmatika menghasilkan nilai numerik.</span>
              </div>

              <div class="operator-layout">
                <div class="operator-controls-panel">
                  <div class="numeric-controls" data-operator-numeric-controls>
                    <label class="field">Nilai A
                      <input data-operator-a type="number" step="any" value="7" inputmode="decimal">
                    </label>
                    <label class="field">Operator
                      <select data-operator-select class="select-input"></select>
                    </label>
                    <label class="field">Nilai B
                      <input data-operator-b type="number" step="any" value="2" inputmode="decimal">
                    </label>
                  </div>
                  <div class="boolean-controls" data-operator-boolean-controls hidden>
                    <fieldset class="bool-field">
                      <legend>Nilai A</legend>
                      <div class="segmented">
                        <button type="button" class="segment is-active" data-boolean-a="true" aria-pressed="true">True</button>
                        <button type="button" class="segment" data-boolean-a="false" aria-pressed="false">False</button>
                      </div>
                    </fieldset>
                    <label class="field">Operator
                      <select data-operator-logic-select class="select-input"></select>
                    </label>
                    <fieldset class="bool-field" data-boolean-b-field>
                      <legend>Nilai B</legend>
                      <div class="segmented">
                        <button type="button" class="segment is-active" data-boolean-b="true" aria-pressed="true">True</button>
                        <button type="button" class="segment" data-boolean-b="false" aria-pressed="false">False</button>
                      </div>
                    </fieldset>
                  </div>
                  <p class="field-note" data-operator-note>Masukkan bilangan bulat atau desimal. Pembagian dengan nol akan ditampilkan sebagai kondisi error.</p>
                </div>

                <div class="operator-output-panel">
                  <div class="expression-display" data-operator-expression>7 + 2</div>
                  <div class="result-line"><span>=</span><strong data-operator-result>9</strong><span class="type-badge" data-operator-type>int</span></div>
                </div>
              </div>

              <div class="operator-steps">
                <div class="steps-head"><span class="block-label">Proses per langkah</span><span class="lab-mini-label">penelusuran</span></div>
                <ol data-operator-steps></ol>
              </div>

              <div class="truth-table-wrap" data-operator-truth-table hidden>
                <div class="steps-head"><span class="block-label">Tabel kebenaran</span><span class="lab-mini-label">baris saat ini disorot</span></div>
                <table class="truth-table">
                  <thead><tr><th>A</th><th>B</th><th>A and B</th><th>A or B</th><th>not A</th></tr></thead>
                  <tbody>
                    <tr data-truth-row="true-true"><td>True</td><td>True</td><td>True</td><td>True</td><td>False</td></tr>
                    <tr data-truth-row="true-false"><td>True</td><td>False</td><td>False</td><td>True</td><td>False</td></tr>
                    <tr data-truth-row="false-true"><td>False</td><td>True</td><td>False</td><td>True</td><td>True</td></tr>
                    <tr data-truth-row="false-false"><td>False</td><td>False</td><td>False</td><td>False</td><td>True</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="operator-explainer">
            <div class="explainer-row"><code>7 / 2</code><span>→</span><strong>3.5</strong><p>Pembagian biasa selalu memberi hasil float.</p></div>
            <div class="explainer-row"><code>7 // 2</code><span>→</span><strong>3</strong><p>Pembagian bulat mengambil hasil bagi ke bawah.</p></div>
            <div class="explainer-row"><code>7 % 2</code><span>→</span><strong>1</strong><p>Modulus memberi sisa pembagian.</p></div>
            <div class="explainer-row"><code>7 ** 2</code><span>→</span><strong>49</strong><p>Pangkat dua, bukan perkalian dua.</p></div>
          </div>

          ${note('Jangan tertukar: = dan ==', '<p><code>=</code> adalah <strong>assignment</strong> untuk memasukkan nilai ke variabel. <code>==</code> adalah <strong>perbandingan</strong> yang menghasilkan True atau False.</p><p><code>umur = 18</code> menyimpan 18. <code>umur == 18</code> bertanya apakah isinya 18.</p>', 'warning')}

          ${codeBlock('hitung_belanja.py', 'Python', `harga = 15000
jumlah = 3

total = harga * jumlah
print(total)          # 45000
print(total / 2)      # 22500.0
print(total // 2)     # 22500
print(total > 50000)  # False`, 'Perhatikan perbedaan hasil <code>/</code> dan <code>//</code>, serta hasil perbandingan yang bertipe bool.')}

          ${practice('Prediksi sebelum menekan tombol', '<p>Di laboratorium, prediksi hasil dari <code>7 // 2</code>, <code>7 % 2</code>, dan <code>7 / 2</code>. Setelah itu cek apakah prediksimu sesuai.</p>', '<p>Hasilnya berurutan 3, 1, dan 3.5. Perhatikan bahwa <code>//</code> tidak sama dengan pembulatan terdekat; ia mengambil nilai ke bawah.</p>')}
        `,
        check: {
          question: 'Berapa hasil dari <code>17 // 5</code> dan <code>17 % 5</code>?',
          hint: 'Bagi 17 dengan 5. Berapa kali 5 masuk ke 17, dan berapa sisanya?',
          options: ['3 dan 2', '3.4 dan 0', '2 dan 3'],
          answer: 0,
          explanation: '5 masuk ke 17 sebanyak 3 kali (15), dengan sisa 2. Jadi <code>17 // 5 = 3</code> dan <code>17 % 5 = 2</code>.'
        }
      },
      {
        id: 'logika',
        navTitle: 'Operator logika',
        title: 'Gabungkan kondisi dengan and, or, dan not.',
        lead: 'Operator logika bekerja pada nilai boolean. Ia membantu program mengambil keputusan dari lebih dari satu syarat.',
        minutes: '7 menit',
        html: `
          <p>Bayangkan syarat kelulusan: nilai minimal 60 <strong>dan</strong> kehadiran minimal 75%. Dua kondisi harus digabung agar keputusan tidak berat sebelah. Untuk itu kita memakai operator logika.</p>

          <div class="logic-rules">
            <div><code>and</code><strong>True jika semua kondisi True.</strong><p>True and True → True. Satu saja False, hasilnya False.</p></div>
            <div><code>or</code><strong>True jika salah satu kondisi True.</strong><p>Hanya bernilai False jika semuanya False.</p></div>
            <div><code>not</code><strong>Membalik nilai boolean.</strong><p>not True → False. not False → True.</p></div>
          </div>

          <p>Buka tab <strong>Logika</strong> pada <button type="button" class="inline-jump" data-jump-section="operator">kalkulator operator di bagian sebelumnya</button> untuk mencoba kombinasi nilai dan melihat tabel kebenarannya. Nilai A dan B dimulai dari True.</p>

          ${note('Short-circuit', '<p>Python membaca <code>and</code> dari kiri. Jika kondisi pertama sudah False, kondisi kedua tidak perlu dievaluasi karena hasilnya pasti False. Pada <code>or</code>, jika kondisi pertama True, hasilnya sudah pasti True. Perilaku ini disebut <em>short-circuit evaluation</em>.</p>', 'edge')}

          <div class="code-example-pair">
            ${codeBlock('kelulusan.py', 'Python', `nilai = 75
hadir = 90

print(nilai >= 60)                  # True
print(hadir >= 75)                  # True
print(nilai >= 60 and hadir >= 75)  # True
print(nilai < 60 or hadir < 50)     # False
print(not (nilai >= 60))            # False`, 'Setiap perbandingan menghasilkan bool. Operator logika kemudian menggabungkan hasil-hasil bool tersebut.')}
            <div class="truth-mini">
              <span class="block-label">Cek tiga aturan</span>
              <div class="truth-line"><code>True and False</code><strong>False</strong></div>
              <div class="truth-line"><code>True or False</code><strong>True</strong></div>
              <div class="truth-line"><code>not True</code><strong>False</strong></div>
              <div class="truth-line"><code>False or True</code><strong>True</strong></div>
            </div>
          </div>

          ${practice('Jadi diterima atau tidak?', '<p>Seorang pendaftar punya <code>nilai = 80</code> dan <code>hadir = 60</code>. Dengan syarat <code>nilai &gt;= 60 and hadir &gt;= 75</code>, apakah ia lulus? Jelaskan bagian mana yang membuat hasilnya demikian.</p>', '<p>Tidak lulus. <code>nilai &gt;= 60</code> bernilai True, tetapi <code>hadir &gt;= 75</code> bernilai False. <code>True and False</code> menghasilkan False.</p>')}
        `,
        check: {
          question: 'Hasil dari <code>True and False</code> dan <code>True or False</code> berturut-turut adalah…',
          hint: 'and membutuhkan semua True; or cukup salah satu True.',
          options: ['True, False', 'False, True', 'False, False'],
          answer: 1,
          explanation: '<code>and</code> menghasilkan False karena tidak semua kondisi benar. <code>or</code> menghasilkan True karena setidaknya satu kondisi benar.'
        }
      },
      {
        id: 'prioritas',
        navTitle: 'Prioritas operator',
        title: 'Tidak semua operator dievaluasi dari kiri ke kanan.',
        lead: 'Prioritas operator menentukan bagian mana yang dihitung lebih dulu. Tanda kurung dapat mengubah pengelompokan itu dengan sengaja.',
        minutes: '8 menit',
        html: `
          <p>Ekspresi <code>2 + 3 * 4</code> tidak dihitung dari kiri ke kanan. Perkalian dikerjakan sebelum penjumlahan. Karena itu hasilnya 14, bukan 20.</p>

          <div class="priority-ladder" role="group" aria-label="Urutan prioritas operator dari tertinggi ke terendah">
            <div class="priority-row"><span>1</span><strong>Paling tinggi</strong><code>( )</code><small>tanda kurung</small></div>
            <div class="priority-row"><span>2</span><strong></strong><code>**</code><small>pangkat</small></div>
            <div class="priority-row"><span>3</span><strong></strong><code>* / // %</code><small>perkalian, pembagian, sisa bagi</small></div>
            <div class="priority-row"><span>4</span><strong></strong><code>+ -</code><small>penjumlahan, pengurangan</small></div>
            <div class="priority-row"><span>5</span><strong></strong><code>== != &gt; &lt; &gt;= &lt;=</code><small>perbandingan</small></div>
            <div class="priority-row"><span>6</span><strong>Paling rendah</strong><code>not · and · or</code><small>logika</small></div>
          </div>
          <p class="table-note">Arah baca: nomor 1 dikerjakan lebih dulu daripada nomor 6.</p>

          <div class="lab" data-lab="precedence">
            <div class="lab-head">
              <div>
                <span class="lab-tag">Lab 04 · urutan evaluasi</span>
                <h3>Hitung ekspresi satu operasi setiap langkah.</h3>
                <p>Bandingkan dua ekspresi yang hampir sama. Tanda kurung kecil dapat mengubah hasil.</p>
              </div>
              <span class="lab-status" data-precedence-status>Belum dijalankan</span>
            </div>
            <div class="lab-body">
              <div class="preset-tabs" role="group" aria-label="Pilih ekspresi">
                <button type="button" class="preset-tab is-active" data-precedence-preset="plain" aria-pressed="true">2 + 3 * 4</button>
                <button type="button" class="preset-tab" data-precedence-preset="parens" aria-pressed="false">(2 + 3) * 4</button>
                <button type="button" class="preset-tab" data-precedence-preset="division" aria-pressed="false">10 + 12 / 3</button>
              </div>
              <div class="precedence-stage">
                <span class="precedence-rule" data-precedence-rule>Perkalian memiliki prioritas lebih tinggi daripada penjumlahan.</span>
                <div class="expression-tokens" data-precedence-tokens>
                  <span class="expr-token">2</span><span class="expr-token">+</span><span class="expr-token">3</span><span class="expr-token">*</span><span class="expr-token">4</span>
                </div>
                <div class="precedence-result"><span>Hasil sementara</span><strong data-precedence-result>—</strong></div>
              </div>
              <div class="precedence-caption" data-precedence-caption aria-live="polite">
                <span class="caption-mark">01</span>
                <p>Belum ada operasi yang dihitung. Tekan langkah berikutnya.</p>
              </div>
            </div>
            <div class="lab-controls" role="group" aria-label="Kontrol prioritas operator">
              <button type="button" class="btn btn-small btn-quiet" data-precedence-prev disabled>← Sebelumnya</button>
              <button type="button" class="btn btn-small btn-dark" data-precedence-play aria-pressed="false"><span class="control-icon" aria-hidden="true">▶</span> Putar</button>
              <button type="button" class="btn btn-small btn-quiet" data-precedence-next>Langkah berikutnya →</button>
              <button type="button" class="btn-small btn-text" data-precedence-reset>Ulangi</button>
            </div>
          </div>

          <div class="compare-result">
            <div><code>2 + 3 * 4</code><span>→</span><strong>14</strong><p>3 × 4 dihitung lebih dulu, lalu 2 + 12.</p></div>
            <div><code>(2 + 3) * 4</code><span>→</span><strong>20</strong><p>Kurung memaksa 2 + 3 dihitung lebih dulu, lalu 5 × 4.</p></div>
          </div>

          <p>Jika masih ragu, tambahkan tanda kurung. Kurung yang jelas lebih baik daripada mengandalkan ingatan pembaca tentang prioritas operator.</p>

          ${codeBlock('prioritas.py', 'Python', `nilai = 80
hadir = 90

lulus = nilai >= 60 and hadir >= 75
print(lulus)  # True

hasil_1 = 2 + 3 * 4
hasil_2 = (2 + 3) * 4
print(hasil_1)  # 14
print(hasil_2)  # 20`, 'Perbandingan dikerjakan sebelum operator logika. Kurung pada baris <code>hasil_2</code> mengubah urutan perhitungan.')}

          ${practice('Hitung tanpa mesin', '<p>Prediksi hasil dari <code>10 + 12 / 3</code> dan <code>(10 + 12) / 3</code>. Periksa dengan simulasi di atas.</p>', '<p><code>10 + 12 / 3</code> = <code>10 + 4.0</code> = <code>14.0</code>. <code>(10 + 12) / 3</code> = <code>22 / 3</code> ≈ <code>7.333...</code>. Pembagian menghasilkan float.</p>')}
        `,
        check: {
          question: 'Mengapa <code>2 + 3 * 4</code> bernilai 14, sedangkan <code>(2 + 3) * 4</code> bernilai 20?',
          hint: 'Perhatikan urutan operasi yang dikerjakan lebih dulu.',
          options: [
            'Karena tanda kurung mengubah urutan evaluasi; tanpa kurung, perkalian lebih dulu.',
            'Karena penjumlahan selalu dihitung paling akhir.',
            'Karena angka 4 memiliki tipe data berbeda.'
          ],
          answer: 0,
          explanation: 'Tanpa kurung: 3 * 4 = 12, lalu 2 + 12 = 14. Dengan kurung: 2 + 3 = 5, lalu 5 * 4 = 20.'
        }
      },
      {
        id: 'praktik',
        navTitle: 'Praktik terpadu',
        title: 'Gabungkan variabel, tipe, dan operator dalam satu kasus.',
        lead: 'Soal UTS jarang menguji satu konsep saja. Biasanya kamu perlu membaca kode, menentukan tipe nilai, menghitung hasil, lalu memeriksa ekspresi logika.',
        minutes: '8 menit',
        html: `
          <p>Telusuri program belanja berikut baris demi baris. Jangan hanya melihat output akhir; catat nilai dan tipe setiap variabel.</p>

          ${codeBlock('belanja.py', 'Python', `harga = 15000
jumlah = 3
PPN = 0.11

total = harga * jumlah
bayar = total + total * PPN

print("Total bayar:", bayar)
print(type(bayar))
print(bayar > 50000 and jumlah >= 3)`, 'Program ini menggabungkan variabel, konstanta, aritmatika, relasional, dan logika. Perhatikan bahwa <code>PPN</code> ditulis kapital sebagai penanda konstanta.')}

          <div class="stage-artifact">
            <span class="artifact-label">Penelusuran nilai</span>
            <table class="mini-table">
              <caption class="visually-hidden">Penelusuran nilai program belanja</caption>
              <thead><tr><th>Variabel</th><th>Nilai</th><th>Tipe</th><th>Catatan</th></tr></thead>
              <tbody>
                <tr><td><code>harga</code></td><td>15000</td><td>int</td><td>bilangan bulat</td></tr>
                <tr><td><code>jumlah</code></td><td>3</td><td>int</td><td>jumlah barang</td></tr>
                <tr><td><code>PPN</code></td><td>0.11</td><td>float</td><td>konstanta pajak</td></tr>
                <tr><td><code>total</code></td><td>45000</td><td>int</td><td>int × int</td></tr>
                <tr><td><code>bayar</code></td><td>49950.0</td><td>float</td><td>ada operasi float</td></tr>
              </tbody>
            </table>
          </div>

          <p><code>total * PPN</code> menghasilkan <code>4950.0</code>. Setelah ditambahkan ke total, hasilnya <code>49950.0</code>. Karena melibatkan float, hasil akhirnya juga float meskipun nilainya terlihat bulat.</p>
          <p>Ekspresi <code>bayar &gt; 50000 and jumlah &gt;= 3</code> berisi dua perbandingan. <code>bayar &gt; 50000</code> bernilai <strong>False</strong>, sedangkan <code>jumlah &gt;= 3</code> bernilai <strong>True</strong>. Dengan operator <code>and</code>, hasil akhirnya <strong>False</strong>.</p>

          ${note('Trik membaca soal UTS', '<p>Kerjakan berlapis: tentukan tipe setiap nilai, hitung ekspresi aritmatika, baru evaluasi perbandingan dan logika. Tulis nilai antara agar kesalahan tidak menumpuk di satu baris panjang.</p>', 'tip')}

          ${practice('Identifikasi tipe dan ekspresi', '<p>Tentukan tipe atau hasil dari setiap baris berikut.</p><ol><li><code>jumlah_mahasiswa = 35</code></li><li><code>harga_produk = 14999.50</code></li><li><code>nama_kampus = "Universitas ABC"</code></li><li><code>sudah_login = True</code></li><li><code>harga &gt;= 100000</code></li><li><code>pengguna_aktif and akses_admin</code></li><li><code>suhu_celcius = -5</code></li></ol>', '<p>(1) int; (2) float; (3) str; (4) bool; (5) bool hasil perbandingan; (6) bool hasil operator logika; (7) int karena negatif tanpa titik desimal tetap bilangan bulat.</p>')}
        `,
        check: {
          question: 'Pada program belanja tadi, <code>bayar = 49950.0</code> dan <code>jumlah = 3</code>. Apa hasil <code>bayar &gt; 50000 and jumlah &gt;= 3</code>?',
          hint: 'Periksa kedua perbandingan satu per satu, lalu gabungkan dengan and.',
          options: ['True', 'False', 'Terjadi error karena tipe berbeda'],
          answer: 1,
          explanation: '<code>49950.0 &gt; 50000</code> bernilai False, sedangkan <code>3 &gt;= 3</code> bernilai True. <code>False and True</code> menghasilkan False.'
        }
      }
    ],
    recap: {
      title: 'Yang perlu melekat dari Bab 03',
      lead: 'Data perlu wadah dan aturan. Sekali kamu tahu tipe dan operatornya, hasil kode menjadi lebih mudah diprediksi.',
      points: [
        'Variabel adalah wadah bernama; nilainya dapat diganti melalui assignment.',
        'Nama variabel harus valid dan bermakna; Python peka huruf besar/kecil.',
        'Konstanta adalah nilai yang dijaga tetap; Python memakai konvensi huruf kapital.',
        'Tipe dasar: int, float, str, dan bool. Cek dengan type(nilai).',
        'String digabung dengan +, sedangkan len() menghitung jumlah karakter.',
        'Operator aritmatika menghasilkan angka; relasional dan logika menghasilkan bool.',
        'Prioritas operator dan tanda kurung menentukan urutan evaluasi.',
        'Saat membaca soal terpadu: tentukan tipe, hitung aritmatika, lalu evaluasi perbandingan dan logika.'
      ]
    },
    quiz: [
      {
        id: 'b3q1',
        type: 'input',
        prompt: 'Apa tipe data Python dari nilai <code>14999.50</code>?',
        placeholder: 'contoh: int / float / str / bool',
        accepted: ['float'],
        hints: ['Nilai memiliki titik desimal.', 'Tanpa tanda kutip, nilai ini tetap berupa angka.'],
        explanation: 'Nilai dengan titik desimal bertipe <code>float</code>.'
      },
      {
        id: 'b3q2',
        type: 'input',
        prompt: 'Berapa hasil dari <code>17 % 5</code>?',
        placeholder: 'Tulis angka saja',
        accepted: ['2'],
        hints: ['Tentukan dulu 17 // 5.', 'Modulus adalah sisa setelah pembagian bulat.'],
        explanation: '17 // 5 = 3, dan 3 × 5 = 15. Sisanya 2, sehingga 17 % 5 = 2.'
      },
      {
        id: 'b3q3',
        type: 'choice',
        prompt: 'Perhatikan program berikut.',
        code: 'umur = 18\numur = umur + 1\numur = 19',
        options: ['18', '19', '20'],
        answer: 1,
        hints: ['Baris terakhir juga melakukan assignment.', 'Assignment menimpa nilai yang sudah ada.'],
        explanation: 'Baris kedua membuat umur = 19, lalu baris ketiga menimpanya dengan 19 lagi. Nilai akhirnya tetap 19.'
      },
      {
        id: 'b3q4',
        type: 'choice',
        prompt: 'Nama variabel mana yang valid di Python?',
        options: ['<code>2nama</code>', '<code>nilai uas</code>', '<code>nilai_uas</code>', '<code>for</code>'],
        answer: 2,
        hints: ['Nama tidak boleh diawali angka atau mengandung spasi.', '<code>for</code> adalah kata kunci Python.'],
        explanation: '<code>nilai_uas</code> diawali huruf dan hanya memakai huruf serta garis bawah. Tiga pilihan lainnya melanggar aturan identifier.'
      },
      {
        id: 'b3q5',
        type: 'choice',
        prompt: 'Apa output dari program berikut?',
        code: 'nilai = 55\nhadir = 90\nprint(nilai >= 60 and hadir >= 75)',
        options: ['True', 'False', 'Terjadi error'],
        answer: 1,
        hints: ['Periksa kedua perbandingan satu per satu.', 'Operator <code>and</code> membutuhkan semua kondisi True.'],
        explanation: '<code>nilai &gt;= 60</code> bernilai False, sedangkan <code>hadir &gt;= 75</code> bernilai True. <code>False and True</code> menghasilkan False.'
      },
      {
        id: 'b3q6',
        type: 'choice',
        prompt: 'Berapa hasil dari <code>(2 + 3) * 4</code>?',
        options: ['14', '20', '24'],
        answer: 1,
        hints: ['Kerjakan isi kurung lebih dulu.', 'Setelah 2 + 3, kalikan hasilnya dengan 4.'],
        explanation: 'Isi kurung dihitung dulu: 2 + 3 = 5. Kemudian 5 * 4 = 20.'
      },
      {
        id: 'b3q7',
        type: 'input',
        prompt: 'Jika <code>nama = "Ani"</code>, berapa hasil <code>len(nama)</code>?',
        placeholder: 'Tulis angka saja',
        accepted: ['3', 'tiga'],
        hints: ['Hitung setiap karakter, bukan jumlah kata.', 'A, n, dan i adalah tiga karakter.'],
        explanation: '<code>len("Ani")</code> menghitung tiga karakter: A, n, dan i.'
      },
      {
        id: 'b3q8',
        type: 'choice',
        prompt: 'Apa output dari program berikut?',
        code: 'harga = 20000\njumlah = 2\nPPN = 0.1\n\ntotal = harga * jumlah\nbayar = total + total * PPN\nprint(bayar)',
        options: ['40000', '44000.0', '44000'],
        answer: 1,
        hints: ['Hitung total terlebih dahulu.', 'Perkalian dengan float membuat hasil akhir bertipe float.'],
        explanation: 'Total = 20000 × 2 = 40000. PPN = 0.1 × 40000 = 4000.0, sehingga bayar = 44000.0. Keterlibatan float membuat output menampilkan bagian desimal.'
      }
    ]
  });
})();
