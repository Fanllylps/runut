(function () {
  'use strict';

  const main = document.getElementById('main');
  let controller = null;
  let activePlay = null;
  let playbackSpeed = 2500;

  const $ = (selector, root) => (root || main).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || main).querySelectorAll(selector));
  const setText = (selector, value, root) => {
    const node = $(selector, root);
    if (node) node.textContent = value;
  };
  const setHTML = (selector, value, root) => {
    const node = $(selector, root);
    if (node) node.innerHTML = value;
  };
  const format = (value) => new Intl.NumberFormat('id-ID').format(value);
  const boolText = (value) => (value ? 'True' : 'False');
  const escapeHTML = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  function clickWithin(selector, callback) {
    main.addEventListener('click', (event) => {
      const button = event.target.closest(selector);
      if (button && main.contains(button)) callback(button, event);
    }, { signal: controller.signal });
  }

  function inputWithin(selector, callback) {
    main.addEventListener('input', (event) => {
      const input = event.target.closest(selector);
      if (input && main.contains(input)) callback(input, event);
    }, { signal: controller.signal });
  }

  function changeWithin(selector, callback) {
    main.addEventListener('change', (event) => {
      const input = event.target.closest(selector);
      if (input && main.contains(input)) callback(input, event);
    }, { signal: controller.signal });
  }

  function stopPlayback() {
    if (!activePlay) return;
    const playback = activePlay;
    activePlay = null;
    window.clearTimeout(playback.timer);
    playback.update(false);
  }

  function createStepper(prefix, countSource, paint, options) {
    const settings = Object.assign({ initial: -1, interval: 2500 }, options || {});
    const getCount = typeof countSource === 'function' ? countSource : () => countSource;
    const prev = $('[data-' + prefix + '-prev]');
    const next = $('[data-' + prefix + '-next]');
    const play = $('[data-' + prefix + '-play]');
    const controls = play && play.closest('.lab-controls');
    const caption = controls && controls.closest('.lab') && controls.closest('.lab').querySelector('.lab-caption');
    let speedSelect = controls && controls.querySelector('[data-playback-speed]');
    if (controls && !speedSelect) {
      const speedLabel = document.createElement('label');
      speedLabel.className = 'playback-speed';
      speedLabel.innerHTML = '<span>Tempo putar</span><select class="playback-speed-select" data-playback-speed aria-label="Tempo putar otomatis"><option value="2500">Pelan · 2,5 dtk</option><option value="1800">Sedang · 1,8 dtk</option><option value="1200">Cepat · 1,2 dtk</option></select>';
      speedSelect = speedLabel.querySelector('[data-playback-speed]');
      speedSelect.value = String(playbackSpeed);
      const reset = controls.querySelector('[data-' + prefix + '-reset]');
      controls.insertBefore(speedLabel, reset || null);
    }
    let step = settings.initial;

    function setPlayVisual(on) {
      if (!play) return;
      play.setAttribute('aria-pressed', String(on));
      play.setAttribute('aria-label', on ? 'Jeda simulasi otomatis' : 'Putar simulasi otomatis');
      play.innerHTML = on
        ? '<span class="control-icon" aria-hidden="true">❚❚</span> Jeda'
        : '<span class="control-icon" aria-hidden="true">▶</span> Putar';
    }

    function render() {
      const count = Math.max(0, getCount());
      if (count === 0) {
        step = -1;
      } else {
        step = Math.max(-1, Math.min(count - 1, step));
      }
      paint(step, count);
      if (caption) {
        caption.classList.remove('is-updating');
        const animateCaption = () => { if (caption.isConnected) caption.classList.add('is-updating'); };
        if (window.requestAnimationFrame) window.requestAnimationFrame(animateCaption);
        else window.setTimeout(animateCaption, 0);
      }
      if (prev) prev.disabled = step <= settings.initial || step <= -1;
      if (next) next.disabled = count === 0 || step >= count - 1;
      if (play) {
        play.disabled = count <= 1;
        if (!activePlay) setPlayVisual(false);
      }
    }

    function move(delta) {
      stopPlayback();
      const count = Math.max(0, getCount());
      step = Math.max(-1, Math.min(count - 1, step + delta));
      render();
    }

    function reset() {
      stopPlayback();
      step = settings.initial;
      render();
    }

    clickWithin('[data-' + prefix + '-next]', () => move(1));
    clickWithin('[data-' + prefix + '-prev]', () => move(-1));
    clickWithin('[data-' + prefix + '-reset]', reset);
    clickWithin('[data-' + prefix + '-play]', () => {
      if (activePlay && activePlay.id === prefix) {
        stopPlayback();
        return;
      }
      stopPlayback();
      const count = Math.max(0, getCount());
      if (count <= 1) return;
      if (step >= count - 1) {
        step = settings.initial;
        render();
      }
      const playback = {
        id: prefix,
        update: setPlayVisual,
        timer: null,
        schedule: null
      };
      function schedulePlayback() {
        const delay = speedSelect ? Number(speedSelect.value) : settings.interval;
        playback.timer = window.setTimeout(() => {
          if (activePlay !== playback) return;
          const currentCount = Math.max(0, getCount());
          if (step >= currentCount - 1) {
            stopPlayback();
            render();
            return;
          }
          step += 1;
          render();
          if (step >= currentCount - 1) {
            stopPlayback();
            render();
          } else {
            schedulePlayback();
          }
        }, Number.isFinite(delay) && delay > 0 ? delay : settings.interval);
      }
      playback.schedule = schedulePlayback;
      activePlay = playback;
      setPlayVisual(true);
      schedulePlayback();
    });

    render();
    return {
      render: render,
      reset: reset,
      setStep: (value) => {
        stopPlayback();
        step = Math.max(-1, Math.min(Math.max(0, getCount()) - 1, value));
        render();
      },
      stop: stopPlayback,
      getStep: () => step
    };
  }

  function initCoffee() {
    if (!$('[data-coffee-steps]')) return;
    const rows = $$('[data-coffee-step]');
    const descriptions = [
      'Kumpulkan bahan sebelum mulai: ini adalah input.',
      'Kopi dan gula dimasukkan ke gelas.',
      'Tuangkan air panas sebagai bagian proses.',
      'Aduk hingga semua bahan tercampur.',
      'Periksa rasa. Jika kurang manis, tambahkan gula.',
      'Kopi siap disajikan sebagai output.'
    ];
    createStepper('coffee', rows.length, (step, total) => {
      rows.forEach((row, index) => {
        row.classList.toggle('is-active', index === step);
        row.classList.toggle('is-done', index < step);
      });
      const visual = $('[data-coffee-visual]');
      if (visual) visual.dataset.stage = String(Math.max(0, step + 1));
      const sugar = $('[data-coffee-sugar]');
      if (sugar) sugar.hidden = step < 4;
      setText('[data-coffee-status]', step < 0 ? 'Siap mulai' : step >= total - 1 ? 'Kopi siap disajikan' : 'Langkah ' + (step + 1) + ' dari ' + total);
      setText('[data-coffee-caption] p', step < 0 ? 'Tekan “Langkah berikutnya” untuk menjalankan instruksi pertama.' : descriptions[step]);
    }, { initial: -1, interval: 850 });
  }

  function initIPO() {
    if (!$('[data-ipo-stage]')) return;
    const price = $('[data-ipo-price]');
    const qty = $('[data-ipo-qty]');
    const stages = $$('[data-ipo-stage]');
    const stepper = createStepper('ipo', 3, (step) => {
      const p = Math.max(0, Number(price && price.value) || 0);
      const q = Math.max(0, Number(qty && qty.value) || 0);
      setText('[data-ipo-price-out]', format(p));
      setText('[data-ipo-qty-out]', format(q));
      setText('[data-ipo-equation]', step >= 1 ? format(p) + ' × ' + q : 'harga × jumlah');
      setText('[data-ipo-output]', step >= 2 ? 'Rp' + format(p * q) : '—');
      stages.forEach((stage, index) => stage.classList.toggle('is-current', index === step));
      $$('[data-ipo-connector]').forEach((node, index) => node.classList.toggle('is-active', index < step));
      setText('[data-ipo-status]', step === 0 ? 'Input siap' : step === 1 ? 'Menghitung total' : 'Output tersedia');
      setText('[data-ipo-caption] p', [
        'Input: harga Rp' + format(p) + ' dan jumlah ' + q + ' barang.',
        'Proses: ' + format(p) + ' × ' + q + ' = Rp' + format(p * q) + '.',
        'Output: total belanja Rp' + format(p * q) + '.'
      ][step]);
    }, { initial: 0, interval: 950 });

    [price, qty].filter(Boolean).forEach((input) => {
      input.addEventListener('input', () => stepper.reset(), { signal: controller.signal });
    });
  }

  function initTraits() {
    const lab = $('[data-lab="traits"]');
    if (!lab) return;
    const copy = {
      input: ['01 / 05', 'Input: bahan untuk diproses.', 'Harga per barang dan jumlah barang dibutuhkan sebelum total dapat dihitung.'],
      output: ['02 / 05', 'Output: hasil yang diharapkan.', 'Total pembayaran yang tampil adalah hasil yang bisa diperiksa pengguna.'],
      definiteness: ['03 / 05', 'Definiteness: langkahnya jelas.', '“Kalikan harga dengan jumlah” memberi aturan yang pasti, tidak bergantung pada tafsiran.'],
      finiteness: ['04 / 05', 'Finiteness: proses pasti berhenti.', 'Langkah perhitungan memiliki akhir setelah total ditampilkan.'],
      effectiveness: ['05 / 05', 'Effectiveness: bisa dikerjakan.', 'Setiap operasi sederhana dan dapat dilakukan oleh orang maupun komputer.']
    };
    clickWithin('[data-trait]', (button) => {
      const value = copy[button.dataset.trait];
      if (!value) return;
      $$('[data-trait]', lab).forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-selected', active);
        item.setAttribute('aria-pressed', String(active));
      });
      setText('[data-trait-count]', value[0], lab);
      setText('[data-trait-title]', value[1], lab);
      setText('[data-trait-copy]', value[2], lab);
    });
  }

  function initTranslation() {
    const lab = $('[data-lab="translation"]');
    if (!lab) return;
    const data = [
      ['Masalah · titik awal', 'Hitung total belanja tiga buku.', 'Setiap buku berharga Rp25.000. Kita ingin tahu total sebelum menulis kode.', 'Tujuan: total pembayaran.'],
      ['Pahami · tentukan data', 'Input: jumlah dan harga.', 'Jumlah buku = 3. Harga satuan = Rp25.000. Output yang dibutuhkan adalah total pembayaran.', 'Data: jumlah = 3, harga = Rp25.000.'],
      ['Algoritma · susun langkah', 'Kalikan jumlah dengan harga satuan.', 'total ← jumlah × harga_satuan', 'Algoritma belum terikat bahasa.', 'total ← jumlah × harga_satuan'],
      ['Program · terjemahkan logika', 'Tulis langkah dalam Python.', 'jumlah = 3\nharga = 25000\nprint(jumlah * harga)', 'Sintaks mengikuti aturan Python.', 'jumlah = 3\nharga = 25000\nprint(jumlah * harga)   # 75000'],
      ['Uji · periksa hasil', '3 × Rp25.000 = Rp75.000.', 'Bandingkan output program dengan perhitungan manual. Hasil yang sama berarti kasus ini lolos uji.', 'Output uji: 75000 = 75000 ✓']
    ];
    function select(index) {
      const item = data[index];
      if (!item) return;
      $$('[data-translation-step]', lab).forEach((tab) => {
        const active = Number(tab.dataset.translationStep) === index;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      const panel = $('[data-translation-display]', lab);
      if (panel) panel.setAttribute('aria-labelledby', 'translation-tab-' + index);
      setText('[data-translation-label]', item[0], lab);
      setText('[data-translation-title]', item[1], lab);
      setText('[data-translation-copy]', item[2].split('\n')[0], lab);
      const progress = $('[data-translation-progress]', lab);
      if (progress) progress.style.width = (index / (data.length - 1) * 100) + '%';
      setHTML('[data-translation-artifact]',
        '<div class="translation-artifact"><span class="artifact-label">Benda kerja</span>' +
        (item[4] ? '<pre><code>' + escapeHTML(item[4]) + '</code></pre>' : '<p>' + escapeHTML(item[3]) + '</p>') +
        (item[4] ? '<p class="artifact-note">' + escapeHTML(item[3]) + '</p>' : '') +
        '</div>', lab);
    }
    clickWithin('[data-translation-step]', (button) => select(Number(button.dataset.translationStep)));
    select(0);
  }

  function initVoucher() {
    const lab = $('[data-lab="voucher"]');
    if (!lab) return;
    const total = $('[data-voucher-total]', lab);
    const member = $('[data-voucher-member]', lab);
    const period = $('[data-voucher-period]', lab);
    let runs = 0;

    function update() {
      const amount = Math.max(0, Number(total && total.value) || 0);
      const registered = !!(member && member.checked);
      const active = !!(period && period.checked);
      const checks = { total: amount >= 500000, member: registered, period: active };
      Object.keys(checks).forEach((key) => {
        const row = $('[data-voucher-condition="' + key + '"]', lab);
        if (row) row.classList.toggle('is-true', checks[key]);
        const status = $('[data-voucher-' + key + '-status]', lab);
        if (status) status.textContent = checks[key] ? 'terpenuhi' : 'belum';
      });
      const eligible = Object.values(checks).every(Boolean);
      const result = $('[data-voucher-result]', lab);
      if (result) result.classList.toggle('is-eligible', eligible);
      setText('[data-voucher-result-title]', eligible ? 'Voucher 10% didapat!' : 'Voucher belum bisa digunakan.', lab);
      setText('[data-voucher-result-copy]', eligible
        ? 'Semua syarat terpenuhi. Potongan belanja: Rp' + format(Math.round(amount * 0.1)) + '.'
        : 'Periksa total minimal Rp500.000, status pelanggan, dan periode promo.', lab);
    }

    clickWithin('[data-voucher-run]', () => {
      runs += 1;
      update();
      const result = $('[data-voucher-result]', lab);
      if (result) {
        result.classList.remove('is-pulsing');
        void result.offsetWidth;
        result.classList.add('is-pulsing');
      }
      const status = $('.lab-status', lab);
      if (status) status.textContent = runs === 1 ? 'Aturan dijalankan' : 'Aturan dijalankan · ' + runs + '×';
    });

    [total, member, period].filter(Boolean).forEach((element) => {
      element.addEventListener('input', update, { signal: controller.signal });
    });
    update();
  }

  function initChapter2() {
    const decomposition = $('[data-lab="decomposition"]');
    if (decomposition) {
      const details = {
        menu: ['Pilih menu', 'Input: daftar menu, jumlah, dan catatan. Output: pilihan menu yang siap dihitung.'],
        address: ['Isi alamat', 'Input: lokasi dan waktu kirim. Output: alamat tujuan yang dapat digunakan kurir.'],
        payment: ['Hitung total', 'Input: subtotal, ongkir, dan diskon. Output: jumlah yang harus dibayar.'],
        confirm: ['Bayar & konfirmasi', 'Input: metode pembayaran dan total. Output: status pesanan berhasil atau perlu diperiksa.']
      };
      const stage = $('[data-decomposition-stage]', decomposition);
      const toggle = $('[data-decomposition-toggle]', decomposition);
      function setExpanded(expanded) {
        if (stage) stage.classList.toggle('is-collapsed', !expanded);
        setText('[data-decomposition-status]', expanded ? 'Dipecah menjadi 4 tugas' : 'Masih utuh', decomposition);
        if (toggle) toggle.innerHTML = expanded ? 'Satukan lagi <span aria-hidden="true">↖</span>' : 'Pecah masalah <span aria-hidden="true">↘</span>';
      }
      clickWithin('[data-decomposition-toggle]', () => {
        setExpanded(!!(stage && stage.classList.contains('is-collapsed')));
      });
      clickWithin('[data-decomposition-reset]', () => {
        if (stage) stage.classList.add('is-collapsed');
        $$('[data-decomposition-part]', decomposition).forEach((item) => item.classList.remove('is-active'));
        setHTML('[data-decomposition-detail]', '<span class="block-label">Pilih satu bagian</span><p>Setelah dipecah, klik salah satu pekerjaan untuk melihat data yang dibutuhkan dan hasilnya.</p>', decomposition);
        setExpanded(false);
      });
      clickWithin('[data-decomposition-part]', (button) => {
        const item = details[button.dataset.decompositionPart];
        if (!item) return;
        if (stage) stage.classList.remove('is-collapsed');
        if (toggle) toggle.innerHTML = 'Satukan lagi <span aria-hidden="true">↖</span>';
        setText('[data-decomposition-status]', 'Dipecah menjadi 4 tugas', decomposition);
        $$('[data-decomposition-part]', decomposition).forEach((part) => part.classList.toggle('is-active', part === button));
        setHTML('[data-decomposition-detail]', '<span class="block-label">' + item[0] + '</span><p>' + item[1] + '</p>', decomposition);
      });
    }

    clickWithin('[data-pattern-reveal]', () => {
      const lab = $('[data-lab="pattern"]');
      if (!lab) return;
      $$('[data-pattern-part]', lab).forEach((part) => part.classList.add('is-highlight'));
      const finding = $('[data-pattern-finding]', lab);
      if (finding) finding.hidden = false;
      const status = $('.lab-status', lab);
      if (status) status.textContent = 'Pola ditemukan';
    });
    clickWithin('[data-pattern-reset]', () => {
      const lab = $('[data-lab="pattern"]');
      if (!lab) return;
      $$('[data-pattern-part]', lab).forEach((part) => part.classList.remove('is-highlight'));
      const finding = $('[data-pattern-finding]', lab);
      if (finding) finding.hidden = true;
      const status = $('.lab-status', lab);
      if (status) status.textContent = 'Analisis pola';
    });

    clickWithin('[data-abstraction-mode]', (button) => {
      const lab = $('[data-lab="abstraction"]');
      if (!lab) return;
      const focus = button.dataset.abstractionMode === 'focus';
      const list = $('[data-abstract-list]', lab);
      if (list) list.classList.toggle('is-focused', focus);
      $$('[data-abstraction-mode]', lab).forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.classList.toggle('btn-dark', active);
        item.classList.toggle('btn-quiet', !active);
        item.setAttribute('aria-pressed', String(active));
      });
      setText('[data-abstraction-status]', focus ? 'Informasi relevan saja' : 'Data mentah', lab);
      setText('[data-abstraction-caption] p', focus
        ? 'Jarak, lalu lintas, dan kecepatan dipakai untuk memperkirakan waktu tiba. Detail lain tidak mengubah hasil.'
        : 'Semua data terlihat. Terapkan abstraksi untuk menyorot informasi yang relevan.', lab);
    });

    const stages = $('[data-lab="stages"]');
    if (stages) {
      const labels = ['Pahami masalah', 'Rancang algoritma', 'Tulis kode', 'Uji hasil', 'Dokumentasikan'];
      const stepper = createStepper('stages', 5, (step) => {
        $$('[data-stage-tab]', stages).forEach((tab) => {
          const active = Number(tab.dataset.stageTab) === step;
          tab.classList.toggle('is-active', active);
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
        });
        $$('[data-stage-panel]', stages).forEach((panel) => {
          const active = Number(panel.dataset.stagePanel) === step;
          panel.hidden = !active;
          panel.classList.toggle('is-active', active);
        });
        setText('[data-stages-status]', labels[step] || 'Selesai', stages);
      }, { initial: 0, interval: 1050 });
      clickWithin('[data-stage-tab]', (button) => stepper.setStep(Number(button.dataset.stageTab)));
    }
  }

  function initVariablesAndTypes() {
    const lab = $('[data-lab="variable"]');
    if (lab) {
      const first = $('[data-variable-first]', lab);
      const second = $('[data-variable-second]', lab);
      const box = $('[data-variable-box]', lab);
      const logs = [
        'Baris 1: nilai pertama dimasukkan ke variabel umur.',
        'Baris 2: assignment baru menggantikan nilai sebelumnya.',
        'Baris 3: umur ditambah satu, lalu hasilnya disimpan kembali.',
        'Baris 4: print menampilkan nilai terakhir.'
      ];
      const stepper = createStepper('variable', 4, (step) => {
        const a = Number(first && first.value) || 0;
        const b = Number(second && second.value) || 0;
        const value = [a, b, b + 1, b + 1][step];
        $$('[data-variable-line]', lab).forEach((line) => {
          line.classList.toggle('is-active', Number(line.dataset.variableLine) === step);
        });
        if (box) box.classList.toggle('is-updated', step >= 0 && step <= 2);
        if (step < 0) {
          setText('[data-variable-value]', '—', lab);
          setText('[data-variable-type]', 'belum ada nilai', lab);
          setText('[data-variable-output]', '—', lab);
          setText('[data-variable-status]', 'Baris belum dijalankan', lab);
          setText('[data-variable-log]', 'Program siap. Jalankan baris pertama.', lab);
          setText('[data-variable-before]', '—', lab);
          setText('[data-variable-after]', '—', lab);
        } else {
          setText('[data-variable-value]', String(value), lab);
          setText('[data-variable-type]', Number.isInteger(value) ? 'int · bilangan bulat' : 'float · desimal', lab);
          setText('[data-variable-output]', step >= 3 ? String(b + 1) : '—', lab);
          setText('[data-variable-status]', 'Baris ' + (step + 1) + ' dari 4', lab);
          setText('[data-variable-log]', logs[step], lab);
          const before = step === 0 ? '—' : step === 1 ? a : b;
          const after = step === 0 ? a : step === 1 ? b : b + 1;
          setText('[data-variable-before]', String(before), lab);
          setText('[data-variable-after]', String(after), lab);
        }
        setText('[data-variable-code-first]', String(a), lab);
        setText('[data-variable-code-second]', String(b), lab);
      }, { initial: -1, interval: 950 });

      [first, second].filter(Boolean).forEach((input) => {
        input.addEventListener('input', () => stepper.reset(), { signal: controller.signal });
      });
      clickWithin('[data-variable-apply]', () => {
        stepper.reset();
        setText('[data-variable-log]', 'Nilai baru diterapkan. Jalankan dari baris pertama.', lab);
      });
    }

    const nameLab = $('[data-lab="name-checker"]');
    if (nameLab) {
      const reserved = new Set(['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']);
      const check = () => {
        const input = $('[data-name-input]', nameLab);
        const name = input ? input.value.trim() : '';
        let valid = /^[A-Za-z_][A-Za-z0-9_]*$/.test(name) && !reserved.has(name);
        let copy = 'Nama variabel dimulai dengan huruf atau garis bawah dan tidak memakai kata kunci.';
        if (!name) {
          valid = false;
          copy = 'Tulis nama variabel terlebih dahulu.';
        } else if (reserved.has(name)) {
          copy = 'Kata ini adalah kata kunci Python dan tidak boleh dipakai sebagai nama variabel.';
        } else if (!/^[A-Za-z_]/.test(name)) {
          copy = 'Nama harus dimulai dengan huruf atau garis bawah, bukan angka.';
        } else if (/\s/.test(name)) {
          copy = 'Nama tidak boleh mengandung spasi. Gunakan garis bawah.';
        } else if (!valid) {
          copy = 'Gunakan hanya huruf, angka, dan garis bawah.';
        }
        setText('[data-name-status]', valid ? 'Nama valid' : 'Perlu diperbaiki', nameLab);
        setHTML('[data-name-result]', '<strong>' + (valid ? '✓ Nama dapat digunakan.' : '× Nama belum valid.') + '</strong><p>' + copy + '</p>', nameLab);
        const result = $('[data-name-result]', nameLab);
        if (result) result.classList.toggle('is-valid', valid);
      };
      clickWithin('[data-name-check]', check);
      clickWithin('[data-name-sample]', (button) => {
        const input = $('[data-name-input]', nameLab);
        if (input) input.value = button.dataset.nameSample;
        check();
      });
      inputWithin('[data-name-input]', check);
      const nameInput = $('[data-name-input]', nameLab);
      if (nameInput) {
        nameInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            check();
          }
        }, { signal: controller.signal });
      }
      check();
    }

    const types = {
      int: ['42', 'Integer · int', 'Bilangan bulat.', 'Dipakai untuk jumlah, umur, tahun, atau jumlah barang. Tidak memiliki bagian desimal.', "type(42) → <class 'int'>"],
      float: ['3.14', 'Float · float', 'Bilangan desimal.', 'Menyimpan angka dengan bagian desimal. Cocok untuk IPK, harga, atau hasil pembagian.', "type(3.14) → <class 'float'>"],
      str: ['"Ani"', 'String · str', 'Teks.', 'Rangkaian karakter di antara tanda kutip. Bisa berisi huruf, angka, spasi, dan simbol.', "type(\"Ani\") → <class 'str'>"],
      bool: ['True', 'Boolean · bool', 'Nilai logika.', 'Hanya bernilai True atau False. Dipakai untuk keputusan dan perbandingan.', "type(True) → <class 'bool'>"]
    };
    clickWithin('[data-type-tab]', (button) => {
      const lab = $('[data-lab="types"]');
      if (!lab) return;
      const item = types[button.dataset.typeTab];
      if (!item) return;
      $$('[data-type-tab]', lab).forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      setText('[data-type-value]', item[0], lab);
      setText('[data-type-label]', item[1], lab);
      setText('[data-type-title]', item[2], lab);
      setText('[data-type-description]', item[3], lab);
      setText('[data-type-function]', item[4], lab);
    });

    function literalCheck() {
      const lab = $('[data-lab="types"]');
      if (!lab) return;
      const input = $('[data-literal-input]', lab);
      const raw = input ? input.value.trim() : '';
      let type = 'str';
      let explanation = 'Teks perlu ditulis di antara tanda kutip.';
      if (!raw) {
        explanation = 'Masukkan sebuah nilai Python terlebih dahulu, misalnya 35, 3.14, "Ani", atau True.';
        type = '—';
      } else if (/^(True|False)$/.test(raw)) {
        type = 'bool';
        explanation = 'Boolean memiliki nilai True atau False tanpa tanda kutip.';
      } else if (/^[+-]?\d+$/.test(raw)) {
        type = 'int';
        explanation = 'Integer menyimpan bilangan bulat tanpa bagian desimal.';
      } else if (/^[+-]?(?:\d+\.\d*|\d*\.\d+)(?:[eE][+-]?\d+)?$/.test(raw)) {
        type = 'float';
        explanation = 'Float menyimpan bilangan desimal; titik membedakannya dari int.';
      } else if (/^(['"]).*\1$/.test(raw)) {
        type = 'str';
        explanation = 'Teks di dalam tanda kutip adalah string.';
      } else {
        explanation = 'Nilai ini belum dikenali sebagai literal int, float, str, atau bool yang umum.';
      }
      const safeRaw = escapeHTML(raw || '…');
      setHTML('[data-literal-result]', '<span class="block-label">Hasil pemeriksaan</span><code>type(' + safeRaw + ') → &lt;class \'' + type + '\'&gt;</code><p>' + explanation + '</p>', lab);
    }
    clickWithin('[data-literal-check]', literalCheck);
    clickWithin('[data-literal-sample]', (button) => {
      const input = $('[data-literal-input]');
      if (input) input.value = button.dataset.literalSample;
      literalCheck();
    });
    inputWithin('[data-literal-input]', literalCheck);
  }

  function initSymbols() {
    const info = {
      terminator: ['Terminator', 'Menandai awal atau akhir algoritma.', 'Gunakan label Mulai dan Selesai.', '<svg viewBox="0 0 120 58" aria-hidden="true"><rect x="12" y="10" width="96" height="38" rx="19" class="symbol-shape"></rect></svg>'],
      io: ['Input / Output', 'Membaca data atau menampilkan hasil.', 'Bentuk jajar genjang menandai data masuk dan keluar.', '<svg viewBox="0 0 120 58" aria-hidden="true"><polygon points="26,10 110,10 94,48 10,48" class="symbol-shape"></polygon></svg>'],
      process: ['Proses', 'Menghitung atau menetapkan nilai.', 'Contohnya luas ← p × l.', '<svg viewBox="0 0 120 58" aria-hidden="true"><rect x="14" y="10" width="92" height="38" class="symbol-shape"></rect></svg>'],
      decision: ['Keputusan', 'Menguji kondisi lalu memilih jalur.', 'Cabang biasanya diberi label Ya dan Tidak.', '<svg viewBox="0 0 120 58" aria-hidden="true"><polygon points="60,6 110,29 60,52 10,29" class="symbol-shape"></polygon></svg>'],
      connector: ['Konektor', 'Menyambungkan alur yang terpisah.', 'Gunakan label yang sama pada titik yang terhubung.', '<svg viewBox="0 0 120 58" aria-hidden="true"><circle cx="60" cy="29" r="20" class="symbol-shape"></circle></svg>'],
      flowline: ['Garis alir', 'Menunjukkan arah eksekusi.', 'Panah menghubungkan simbol sesuai urutan langkah.', '<svg viewBox="0 0 120 58" aria-hidden="true"><path d="M14 29H100" class="symbol-line"></path><path d="M93 21l9 8-9 8" class="symbol-line"></path></svg>']
    };
    clickWithin('[data-symbol]', (button) => {
      const lab = $('[data-lab="symbols"]');
      if (!lab) return;
      const data = info[button.dataset.symbol];
      if (!data) return;
      $$('[data-symbol]', lab).forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      setHTML('[data-symbol-detail]', '<div class="symbol-detail-graphic" aria-hidden="true">' + data[3] + '</div><div><span class="block-label">' + data[0] + '</span><h3>' + data[1] + '</h3><p>' + data[2] + '</p></div>', lab);
    });

    const pseudo = {
      title: ['Judul', 'Memberi nama dan tujuan algoritma.', 'Judul yang jelas membuat pembaca langsung tahu masalah apa yang diselesaikan.'],
      declaration: ['Deklarasi', 'Menyebutkan variabel dan tipe data.', 'Deklarasi memastikan setiap data yang dipakai sudah dikenal sebelum langkah dijalankan.'],
      description: ['Deskripsi', 'Memuat aksi dari input sampai output.', 'Bagian ini memuat urutan instruksi yang benar-benar dijalankan algoritma.']
    };
    clickWithin('[data-pseudo-part]', (button) => {
      const lab = $('[data-lab="pseudocode-anatomy"]');
      if (!lab) return;
      const data = pseudo[button.dataset.pseudoPart];
      if (!data) return;
      $$('[data-pseudo-part]', lab).forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      setHTML('[data-pseudo-explanation]', '<span class="block-label">' + data[0] + '</span><h3>' + data[1] + '</h3><p>' + data[2] + '</p>', lab);
    });
  }

  function initOperators() {
    const lab = $('[data-lab="operators"]');
    if (!lab) return;
    const modes = {
      arithmetic: {
        label: 'Aritmatika',
        note: 'Aritmatika menghasilkan nilai numerik.',
        options: [['+', '+'], ['-', '−'], ['*', '×'], ['/', '÷'], ['//', '//'], ['%', '%'], ['**', '**']],
        operators: { '+': '+', '-': '−', '*': '×', '/': '÷', '//': '//', '%': '%', '**': '**' }
      },
      relational: {
        label: 'Relasional',
        note: 'Relasional membandingkan dua nilai dan menghasilkan bool.',
        options: [['>', '>'], ['<', '<'], ['>=', '≥'], ['<=', '≤'], ['==', '=='], ['!=', '!=']],
        operators: { '>': '>', '<': '<', '>=': '≥', '<=': '≤', '==': '==', '!=': '!=' }
      },
      logic: {
        label: 'Logika',
        note: 'Logika bekerja pada nilai True atau False.',
        options: [['and', 'and'], ['or', 'or'], ['not', 'not']],
        operators: { and: 'and', or: 'or', not: 'not' }
      }
    };
    const state = {
      mode: 'arithmetic',
      op: { arithmetic: '+', relational: '>', logic: 'and' },
      boolA: true,
      boolB: true
    };
    const numeric = $('[data-operator-numeric-controls]', lab);
    const boolean = $('[data-operator-boolean-controls]', lab);
    const bField = $('[data-boolean-b-field]', lab);
    const aInput = $('[data-operator-a]', lab);
    const bInput = $('[data-operator-b]', lab);
    const select = $('[data-operator-select]', lab);
    const logicSelect = $('[data-operator-logic-select]', lab);

    function readNumber(input) {
      if (!input || input.value.trim() === '') return null;
      const value = Number(input.value);
      return Number.isFinite(value) ? value : null;
    }
    function numberText(value, forceFloat) {
      if (!Number.isFinite(value)) return '—';
      if (forceFloat && Number.isInteger(value)) return value.toFixed(1);
      return String(value);
    }
    function typeOf(value) {
      return Number.isInteger(value) ? 'int' : 'float';
    }
    function pyDiv(a, b) {
      return Math.floor(a / b);
    }
    function pyMod(a, b) {
      return a - Math.floor(a / b) * b;
    }
    function addStep(html) {
      const list = $('[data-operator-steps]', lab);
      if (!list) return;
      const item = document.createElement('li');
      item.innerHTML = html;
      list.appendChild(item);
    }
    function clearSteps() {
      const list = $('[data-operator-steps]', lab);
      if (list) list.innerHTML = '';
    }
    function updateBooleanButtons() {
      $$('[data-boolean-a]', lab).forEach((button) => {
        const active = (button.dataset.booleanA === 'true') === state.boolA;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      $$('[data-boolean-b]', lab).forEach((button) => {
        const active = (button.dataset.booleanB === 'true') === state.boolB;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    }
    function fillSelect() {
      const mode = modes[state.mode];
      const target = state.mode === 'logic' ? logicSelect : select;
      if (!target) return;
      target.innerHTML = mode.options.map(([value, label]) => '<option value="' + value + '">' + label + '</option>').join('');
      target.value = state.op[state.mode];
    }
    function setResult(expression, result, type, steps, status) {
      setText('[data-operator-expression]', expression, lab);
      setText('[data-operator-result]', result, lab);
      setText('[data-operator-type]', type, lab);
      setText('[data-operator-status]', status, lab);
      clearSteps();
      steps.forEach(addStep);
    }
    function update() {
      const mode = modes[state.mode];
      setText('[data-operator-mode-note]', mode.note, lab);
      numeric.hidden = state.mode === 'logic';
      boolean.hidden = state.mode !== 'logic';
      const truth = $('[data-operator-truth-table]', lab);
      if (truth) truth.hidden = state.mode !== 'logic';
      $$('[data-operator-mode]', lab).forEach((button) => {
        const active = button.dataset.operatorMode === state.mode;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      if (state.mode === 'logic') {
        const showB = state.op.logic !== 'not';
        if (bField) bField.hidden = !showB;
        updateBooleanButtons();
      }
      const op = state.op[state.mode];

      if (state.mode === 'arithmetic' || state.mode === 'relational') {
        const a = readNumber(aInput);
        const b = readNumber(bInput);
        const symbol = mode.operators[op] || op;
        if (a === null || b === null) {
          setResult('Nilai A ' + symbol + ' Nilai B', '—', 'menunggu', ['Masukkan dua angka untuk dihitung.'], 'Menunggu angka');
          return;
        }
        if (state.mode === 'arithmetic') {
          let value;
          let error = false;
          let forceFloat = op === '/';
          if ((op === '/' || op === '//' || op === '%') && b === 0) {
            error = true;
          } else if (op === '+') value = a + b;
          else if (op === '-') value = a - b;
          else if (op === '*') value = a * b;
          else if (op === '/') value = a / b;
          else if (op === '//') value = pyDiv(a, b);
          else if (op === '%') value = pyMod(a, b);
          else if (op === '**') value = Math.pow(a, b);
          if (error) {
            setResult(numberText(a) + ' ' + symbol + ' ' + numberText(b), 'error', 'ZeroDivisionError', [
              'Operand A = ' + numberText(a) + ', operand B = ' + numberText(b) + '.',
              'Pembagian dengan nol tidak memiliki hasil yang terdefinisi.',
              'Python akan menghentikan operasi dan menampilkan ZeroDivisionError.'
            ], 'Error');
            return;
          }
          const resultText = numberText(value, forceFloat);
          const resultType = forceFloat || !Number.isInteger(value) ? 'float' : 'int';
          const steps = [
            'Baca operand A = ' + numberText(a) + ' dan operand B = ' + numberText(b) + '.',
            'Terapkan operator ' + symbol + '. ' + numberText(a) + ' ' + symbol + ' ' + numberText(b) + ' = ' + resultText + '.',
            op === '/' || op === '//' || op === '%'
              ? 'Hasil ' + resultType + ' mengikuti aturan pembagian Python.'
              : 'Hasil bertipe ' + resultType + ' karena kedua operand dan operasinya menghasilkan angka.'
          ];
          setResult(numberText(a) + ' ' + symbol + ' ' + numberText(b), resultText, resultType, steps, 'Selesai');
          return;
        }
        const value = op === '>' ? a > b : op === '<' ? a < b : op === '>=' ? a >= b : op === '<=' ? a <= b : op === '==' ? a === b : a !== b;
        setResult(numberText(a) + ' ' + symbol + ' ' + numberText(b), boolText(value), 'bool', [
          'Bandingkan operand A = ' + numberText(a) + ' dengan operand B = ' + numberText(b) + '.',
          'Operator ' + symbol + ' menghasilkan ' + boolText(value) + '.',
          'Perbandingan selalu menghasilkan nilai boolean.'
        ], 'Selesai');
        return;
      }

      const a = state.boolA;
      const b = state.boolB;
      const symbol = mode.operators[op] || op;
      let value;
      if (op === 'and') value = a && b;
      else if (op === 'or') value = a || b;
      else value = !a;
      const expression = op === 'not' ? 'not ' + boolText(a) : boolText(a) + ' ' + symbol + ' ' + boolText(b);
      const steps = op === 'not'
        ? ['Nilai A = ' + boolText(a) + '.', 'Operator not membalik nilai boolean.', 'Hasilnya ' + boolText(value) + ' bertipe bool.']
        : ['Nilai A = ' + boolText(a) + ', nilai B = ' + boolText(b) + '.', 'Operator ' + symbol + ' menggabungkan kedua nilai.', 'Hasilnya ' + boolText(value) + ' bertipe bool.'];
      setResult(expression, boolText(value), 'bool', steps, 'Selesai');
      const row = $('[data-truth-row="' + String(a) + '-' + String(b) + '"]', lab);
      $$('[data-truth-row]', lab).forEach((item) => item.classList.toggle('is-active', item === row));
    }

    clickWithin('[data-operator-mode]', (button) => {
      const mode = button.dataset.operatorMode;
      if (!modes[mode] || state.mode === mode) return;
      state.mode = mode;
      fillSelect();
      update();
    });
    clickWithin('[data-boolean-a]', (button) => {
      state.boolA = button.dataset.booleanA === 'true';
      update();
    });
    clickWithin('[data-boolean-b]', (button) => {
      state.boolB = button.dataset.booleanB === 'true';
      update();
    });
    [aInput, bInput].filter(Boolean).forEach((input) => {
      input.addEventListener('input', update, { signal: controller.signal });
    });
    if (select) select.addEventListener('change', () => {
      if (state.mode === 'arithmetic' || state.mode === 'relational') state.op[state.mode] = select.value;
      update();
    }, { signal: controller.signal });
    if (logicSelect) logicSelect.addEventListener('change', () => { state.op.logic = logicSelect.value; update(); }, { signal: controller.signal });

    fillSelect();
    update();
  }

  function initPrecedence() {
    const lab = $('[data-lab="precedence"]');
    if (!lab) return;
    const presets = {
      plain: {
        tokens: ['2', '+', '3', '*', '4'],
        rule: 'Perkalian memiliki prioritas lebih tinggi daripada penjumlahan.',
        steps: [
          { active: [2, 3, 4], result: '12', rule: '3 × 4 dihitung lebih dulu karena perkalian berprioritas lebih tinggi.', caption: '3 × 4 = 12. Ekspresi sementara menjadi 2 + 12.' },
          { active: [0, 1, 2], result: '14', rule: 'Setelah perkalian selesai, penjumlahan dijalankan.', caption: '2 + 12 = 14. Hasil akhir ekspresi adalah 14.' }
        ]
      },
      parens: {
        tokens: ['(', '2', '+', '3', ')', '*', '4'],
        rule: 'Tanda kurung memaksa isi kurung dihitung lebih dulu.',
        steps: [
          { active: [1, 2, 3], result: '5', rule: 'Isi kurung dihitung lebih dulu: 2 + 3.', caption: '2 + 3 = 5. Tanda kurung mengubah pengelompokan.' },
          { active: [5, 6], result: '20', rule: 'Setelah kurung selesai, perkalian dijalankan.', caption: '5 × 4 = 20. Hasil akhirnya 20, berbeda dari 14.' }
        ]
      },
      division: {
        tokens: ['10', '+', '12', '/', '3'],
        rule: 'Pembagian memiliki prioritas lebih tinggi daripada penjumlahan.',
        steps: [
          { active: [2, 3, 4], result: '4.0', rule: '12 / 3 dihitung lebih dulu karena pembagian berprioritas lebih tinggi.', caption: '12 / 3 = 4.0. Pembagian Python menghasilkan float.' },
          { active: [0, 1, 2], result: '14.0', rule: 'Penjumlahan dijalankan setelah pembagian.', caption: '10 + 4.0 = 14.0. Hasil membawa tipe float dari pembagian.' }
        ]
      }
    };
    let current = 'plain';

    function renderTokens(active) {
      const preset = presets[current];
      setHTML('[data-precedence-tokens]', preset.tokens.map((token, index) => '<span class="expr-token' + (active.includes(index) ? ' is-active' : '') + '">' + escapeHTML(token) + '</span>').join(''), lab);
    }

    const stepper = createStepper('precedence', 2, (step) => {
      const preset = presets[current];
      if (step < 0) {
        renderTokens([]);
        setText('[data-precedence-rule]', preset.rule, lab);
        setText('[data-precedence-result]', '—', lab);
        setText('[data-precedence-status]', 'Belum dijalankan', lab);
        const caption = $('[data-precedence-caption]', lab);
        if (caption) {
          caption.querySelector('.caption-mark').textContent = '00';
          caption.querySelector('p').textContent = 'Belum ada operasi yang dihitung. Tekan langkah berikutnya.';
        }
        return;
      }
      const data = preset.steps[step];
      renderTokens(data.active);
      setText('[data-precedence-rule]', data.rule, lab);
      setText('[data-precedence-result]', data.result, lab);
      setText('[data-precedence-status]', step >= preset.steps.length - 1 ? 'Selesai' : 'Langkah ' + (step + 1) + ' / 2', lab);
      const caption = $('[data-precedence-caption]', lab);
      if (caption) {
        caption.querySelector('.caption-mark').textContent = String(step + 1).padStart(2, '0');
        caption.querySelector('p').textContent = data.caption;
      }
    }, { initial: -1, interval: 1100 });

    clickWithin('[data-precedence-preset]', (button) => {
      const preset = button.dataset.precedencePreset;
      if (!presets[preset]) return;
      current = preset;
      $$('[data-precedence-preset]', lab).forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      stepper.reset();
    });
  }

  function initFlowSequence() {
    const lab = $('[data-lab="flow-sequence"]');
    if (!lab) return;
    const pInput = $('[data-sequence-p]', lab);
    const lInput = $('[data-sequence-l]', lab);
    const lines = { title: 'title', 'read-p': 'read-p', 'read-l': 'read-l', process: 'process', output: 'output', end: 'end' };
    const nodes = ['start', 'input-p', 'input-l', 'process', 'output', 'end'];
    function values() {
      return {
        p: Math.max(1, Number(pInput && pInput.value) || 1),
        l: Math.max(1, Number(lInput && lInput.value) || 1)
      };
    }
    const stepper = createStepper('sequence', 6, (step) => {
      const { p, l } = values();
      const area = p * l;
      setText('[data-sequence-p-value]', String(p), lab);
      setText('[data-sequence-l-value]', String(l), lab);
      setText('[data-sequence-area-value]', step >= 3 ? String(area) : '—', lab);
      setText('[data-sequence-output-value]', step >= 4 ? String(area) : '?', lab);
      setText('[data-sequence-status]', 'Langkah ' + Math.max(0, step + 1) + ' / 6', lab);
      setText('[data-sequence-step-label]', Math.max(0, step + 1) + ' / 6', lab);
      nodes.forEach((node, index) => {
        const nodeEl = $('[data-sequence-node="' + node + '"]', lab);
        if (nodeEl) nodeEl.classList.toggle('is-active', step >= 0 && index === step);
      });
      $$('[data-sequence-edge]', lab).forEach((edge) => edge.classList.toggle('is-active', Number(edge.dataset.sequenceEdge) < step));
      $$('[data-sequence-line]', lab).forEach((line) => {
        const key = line.dataset.sequenceLine;
        const active = (step === 0 && key === 'title') || (step === 1 && key === 'read-p') || (step === 2 && key === 'read-l') || (step === 3 && key === 'process') || (step === 4 && key === 'output') || (step === 5 && key === 'end');
        line.classList.toggle('is-active', active);
      });
      const captions = [
        'Mulai. Alur siap membaca panjang p.',
        'Baca p = ' + p + '. Input pertama masuk ke variabel p.',
        'Baca l = ' + l + '. Kedua nilai input sudah tersedia.',
        'Proses: luas ← ' + p + ' × ' + l + ' = ' + area + '.',
        'Tampilkan luas = ' + area + '. Output sudah dihasilkan.',
        'Selesai. Dengan p = ' + p + ' dan l = ' + l + ', luas persegi panjang adalah ' + area + '.'
      ];
      setText('[data-sequence-caption]', step < 0 ? 'Tekan “Langkah berikutnya” untuk memulai alur.' : captions[step], lab);
    }, { initial: -1, interval: 1000 });
    [pInput, lInput].filter(Boolean).forEach((input) => {
      input.addEventListener('input', () => stepper.reset(), { signal: controller.signal });
    });
  }

  function initFlowSelection() {
    const lab = $('[data-lab="flow-selection"]');
    if (!lab) return;
    const nInput = $('[data-selection-n]', lab);
    function readN() {
      if (!nInput || nInput.value.trim() === '') return 0;
      return Number(nInput.value) || 0;
    }
    function pyMod(value) {
      return ((value % 2) + 2) % 2;
    }
    const stepper = createStepper('selection', 5, (step) => {
      const n = readN();
      const remainder = pyMod(n);
      const even = remainder === 0;
      const output = even ? 'Genap' : 'Ganjil';
      setText('[data-selection-value]', String(n), lab);
      setText('[data-selection-remainder]', String(remainder), lab);
      setText('[data-selection-input-value]', String(n), lab);
      setText('[data-selection-condition-value]', 'sisa = ' + remainder, lab);
      setText('[data-selection-output]', step >= 3 ? output : '—', lab);
      setText('[data-selection-status]', 'Langkah ' + Math.max(0, step + 1) + ' / 5', lab);
      setText('[data-selection-step-label]', Math.max(0, step + 1) + ' / 5', lab);
      const nodeForStep = ['start', 'input', 'decision', even ? 'even' : 'odd', 'end'];
      ['start', 'input', 'decision', 'even', 'odd', 'end'].forEach((node) => {
        const nodeEl = $('[data-selection-node="' + node + '"]', lab);
        if (nodeEl) nodeEl.classList.toggle('is-active', step >= 0 && nodeForStep[step] === node);
      });
      const activeEdges = step < 0 ? [] : step === 0 ? [] : step === 1 ? [0] : step === 2 ? [0, 1] : step === 3 ? [0, 1, even ? 2 : 3] : [0, 1, even ? 2 : 3, even ? 4 : 5];
      $$('[data-selection-edge]', lab).forEach((edge) => edge.classList.toggle('is-active', activeEdges.includes(Number(edge.dataset.selectionEdge))));
      $$('[data-selection-line]', lab).forEach((line) => {
        const key = line.dataset.selectionLine;
        const active = (step === 0 && key === 'title') || (step === 1 && key === 'read') || (step === 2 && key === 'condition') || (step === 3 && (even ? key === 'even' : key === 'odd' || key === 'else')) || (step === 4 && key === 'end');
        line.classList.toggle('is-active', active);
      });
      const captions = [
        'Mulai. Alur menunggu nilai n.',
        'Baca n = ' + n + '. Sekarang kondisi dapat diperiksa.',
        'Periksa n mod 2 = 0. Dengan n = ' + n + ', sisa pembagiannya ' + remainder + '.',
        even ? 'Kondisi bernilai True. Alur mengambil cabang Ya dan menyiapkan output “Genap”.' : 'Kondisi bernilai False. Alur mengambil cabang Tidak dan menyiapkan output “Ganjil”.',
        'Selesai. Output untuk n = ' + n + ' adalah “' + output + '”.'
      ];
      setText('[data-selection-caption]', step < 0 ? 'Tekan “Langkah berikutnya” untuk memulai alur.' : captions[step], lab);
    }, { initial: -1, interval: 1000 });
    if (nInput) nInput.addEventListener('input', () => stepper.reset(), { signal: controller.signal });
  }

  function initFlowLoop() {
    const lab = $('[data-lab="flow-loop"]');
    if (!lab) return;
    const nInput = $('[data-loop-n]', lab);
    const range = $('[data-loop-range]', lab);
    let steps = [];

    function clampN(value) {
      const number = Number.parseInt(value, 10);
      if (!Number.isFinite(number)) return 1;
      return Math.max(1, Math.min(8, number));
    }
    function readN() {
      return clampN(nInput ? nInput.value : 5);
    }
    function buildSteps(n) {
      const built = [];
      let edges = [];
      let outputs = [];
      built.push({ node: 'start', edges: [], lines: ['title'], i: null, condition: '—', outputs: [], caption: 'Mulai. Tekan langkah berikutnya untuk membaca nilai n.' });
      edges = edges.concat([0]);
      built.push({ node: 'input', edges: edges.slice(), lines: ['read'], i: null, condition: '—', outputs: [], caption: 'Baca n = ' + n + '.' });
      edges = edges.concat([1]);
      built.push({ node: 'init', edges: edges.slice(), lines: ['init'], i: 1, condition: '—', outputs: [], caption: 'Inisialisasi: i ← 1.' });
      for (let i = 1; i <= n; i += 1) {
        edges = edges.concat([i === 1 ? 2 : 5]);
        built.push({ node: 'decision', edges: edges.slice(), lines: ['condition'], i, condition: i + ' ≤ ' + n + ' → True', outputs: outputs.slice(), caption: 'Periksa ' + i + ' ≤ ' + n + ': benar. Masuk badan loop.' });
        edges = edges.concat([3]);
        outputs = outputs.concat([i]);
        built.push({ node: 'output', edges: edges.slice(), lines: ['print'], i, condition: 'True', outputs: outputs.slice(), caption: 'Tampilkan i = ' + i + '.' });
        edges = edges.concat([4]);
        built.push({ node: 'increment', edges: edges.slice(), lines: ['increment'], i: i + 1, condition: 'True', outputs: outputs.slice(), caption: 'Naikkan i: ' + i + ' + 1 = ' + (i + 1) + '.' });
      }
      edges = edges.concat([5]);
      built.push({ node: 'decision', edges: edges.slice(), lines: ['condition'], i: n + 1, condition: (n + 1) + ' ≤ ' + n + ' → False', outputs: outputs.slice(), caption: 'Periksa ' + (n + 1) + ' ≤ ' + n + ': salah. Loop berhenti.' });
      edges = edges.concat([6]);
      built.push({ node: 'end', edges: edges.slice(), lines: ['end'], i: n + 1, condition: 'False', outputs: outputs.slice(), caption: 'Selesai. Angka 1 sampai ' + n + ' sudah ditampilkan.' });
      return built;
    }

    const stepper = createStepper('loop', () => steps.length, (step) => {
      const n = readN();
      setText('[data-loop-n-value]', String(n), lab);
      setText('[data-loop-input-value]', String(n), lab);
      if (step < 0 || !steps[step]) {
        setText('[data-loop-i]', '—', lab);
        setText('[data-loop-condition]', '—', lab);
        setText('[data-loop-condition-value]', '—', lab);
        setText('[data-loop-status]', 'Langkah 0 / ' + steps.length, lab);
        setText('[data-loop-step-label]', '0 / ' + steps.length, lab);
        setText('[data-loop-caption]', 'Tekan langkah berikutnya untuk membaca input.', lab);
        setHTML('[data-loop-output]', '<span class="empty-output">Belum ada angka yang ditampilkan.</span>', lab);
        $$('[data-loop-node]', lab).forEach((node) => node.classList.remove('is-active'));
        $$('[data-loop-edge]', lab).forEach((edge) => edge.classList.remove('is-active'));
        $$('[data-loop-line]', lab).forEach((line) => line.classList.remove('is-active'));
        return;
      }
      const data = steps[step];
      setText('[data-loop-i]', data.i === null ? '—' : String(data.i), lab);
      setText('[data-loop-condition]', data.condition, lab);
      setText('[data-loop-condition-value]', data.condition.includes('True') ? 'True' : data.condition.includes('False') ? 'False' : '—', lab);
      setText('[data-loop-status]', 'Langkah ' + (step + 1) + ' / ' + steps.length, lab);
      setText('[data-loop-step-label]', (step + 1) + ' / ' + steps.length, lab);
      setText('[data-loop-caption]', data.caption, lab);
      $$('[data-loop-node]', lab).forEach((node) => node.classList.toggle('is-active', node.dataset.loopNode === data.node));
      $$('[data-loop-edge]', lab).forEach((edge) => edge.classList.toggle('is-active', data.edges.includes(Number(edge.dataset.loopEdge))));
      $$('[data-loop-line]', lab).forEach((line) => line.classList.toggle('is-active', data.lines.includes(line.dataset.loopLine)));
      const output = $('[data-loop-output]', lab);
      if (output) output.innerHTML = data.outputs.length
        ? data.outputs.map((value) => '<span class="number-chip">' + value + '</span>').join('')
        : '<span class="empty-output">Belum ada angka yang ditampilkan.</span>';
    }, { initial: -1, interval: 1100 });

    function syncInputs(source, target) {
      const value = clampN(source.value);
      if (source.value !== String(value)) source.value = String(value);
      if (target && target.value !== String(value)) target.value = String(value);
      steps = buildSteps(value);
      stepper.reset();
    }
    if (nInput && range) {
      nInput.addEventListener('input', () => syncInputs(nInput, range), { signal: controller.signal });
      range.addEventListener('input', () => syncInputs(range, nInput), { signal: controller.signal });
    }
    steps = buildSteps(readN());
    stepper.reset();
  }

  function init(route) {
    if (controller) controller.abort();
    stopPlayback();
    controller = new AbortController();
    if (route.type !== 'chapter') return;
    initCoffee();
    initIPO();
    initTraits();
    initTranslation();
    initVoucher();
    initChapter2();
    initVariablesAndTypes();
    initOperators();
    initPrecedence();
    initSymbols();
    initFlowSequence();
    initFlowSelection();
    initFlowLoop();
    $$('[data-playback-speed]').forEach((select) => { select.value = String(playbackSpeed); });
    changeWithin('[data-playback-speed]', (select) => {
      const value = Number(select.value);
      if (Number.isFinite(value) && value > 0) playbackSpeed = value;
      $$('[data-playback-speed]').forEach((item) => { item.value = String(playbackSpeed); });
      if (activePlay && activePlay.schedule) {
        window.clearTimeout(activePlay.timer);
        activePlay.schedule();
      }
    });
  }

  function cleanup() {
    if (controller) controller.abort();
    controller = null;
    stopPlayback();
  }

  window.RUNUT_LABS = { init, cleanup };
})();
