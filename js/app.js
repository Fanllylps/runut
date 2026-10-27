(function () {
  'use strict';

  const DATA = window.RUNUT && Array.isArray(window.RUNUT.chapters) ? window.RUNUT.chapters : [];
  const helpers = window.RUNUT ? window.RUNUT.helpers : {};
  const escapeHTML = helpers.escapeHTML || function (value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  const STORAGE_KEY = 'runut-progress-v1';
  const main = document.getElementById('main');
  const reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  let state = loadState();
  let currentChapter = null;
  let storageWarningShown = false;
  let toastTimer = null;

  function defaultState() {
    return { version: 1, chapters: {}, lastChapter: null };
  }

  function loadState() {
    const fallback = defaultState();
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      if (!stored || typeof stored !== 'object') return fallback;
      const next = defaultState();
      next.lastChapter = DATA.some(function (chapter) { return chapter.id === stored.lastChapter; }) ? stored.lastChapter : null;
      DATA.forEach(function (chapter) {
        const source = stored.chapters && stored.chapters[chapter.id] ? stored.chapters[chapter.id] : {};
        const sectionIds = chapter.sections.map(function (section) { return section.id; });
        const done = Array.isArray(source.sections) ? source.sections.filter(function (id) { return sectionIds.indexOf(id) !== -1; }) : [];
        const quizSource = source.quiz && typeof source.quiz === 'object' ? source.quiz : {};
        const total = chapter.quiz.length;
        const best = Number.isFinite(Number(quizSource.best)) ? Math.max(0, Math.min(total, Number(quizSource.best))) : null;
        next.chapters[chapter.id] = {
          sections: Array.from(new Set(done)),
          quiz: {
            best: best,
            total: total,
            passed: Boolean(quizSource.passed) || (best !== null && best >= passMark(total)),
            attempts: Number.isFinite(Number(quizSource.attempts)) ? Math.max(0, Number(quizSource.attempts)) : 0
          }
        };
      });
      return next;
    } catch (error) {
      return fallback;
    }
  }

  function saveState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      if (!storageWarningShown) {
        storageWarningShown = true;
        showToast('Progres tidak dapat disimpan di browser ini. Materi tetap bisa dipelajari.');
      }
    }
  }

  function ensureChapterState(chapter) {
    if (!state.chapters[chapter.id]) {
      state.chapters[chapter.id] = {
        sections: [],
        quiz: { best: null, total: chapter.quiz.length, passed: false, attempts: 0 }
      };
    }
    const chapterState = state.chapters[chapter.id];
    if (!Array.isArray(chapterState.sections)) chapterState.sections = [];
    if (!chapterState.quiz || typeof chapterState.quiz !== 'object') {
      chapterState.quiz = { best: null, total: chapter.quiz.length, passed: false, attempts: 0 };
    }
    return chapterState;
  }

  function passMark(total) {
    return Math.ceil(total * 0.7);
  }

  function chapterProgress(chapter) {
    const saved = ensureChapterState(chapter);
    const doneSections = chapter.sections.filter(function (section) {
      return saved.sections.indexOf(section.id) !== -1;
    }).length;
    const totalSections = chapter.sections.length;
    const quizPassed = Boolean(saved.quiz.passed);
    const doneCheckpoints = doneSections + (quizPassed ? 1 : 0);
    const totalCheckpoints = totalSections + 1;
    const percent = Math.round((doneCheckpoints / totalCheckpoints) * 100);
    return {
      doneSections: doneSections,
      totalSections: totalSections,
      quizPassed: quizPassed,
      doneCheckpoints: doneCheckpoints,
      totalCheckpoints: totalCheckpoints,
      percent: percent,
      complete: doneSections === totalSections && quizPassed
    };
  }

  function overallProgress() {
    let done = 0;
    let total = 0;
    DATA.forEach(function (chapter) {
      const progress = chapterProgress(chapter);
      done += progress.doneCheckpoints;
      total += progress.totalCheckpoints;
    });
    return { done: done, total: total, percent: total ? Math.round((done / total) * 100) : 0 };
  }

  function isSectionDone(chapter, sectionId) {
    return ensureChapterState(chapter).sections.indexOf(sectionId) !== -1;
  }

  function parseRoute() {
    const hash = window.location.hash || '#/';
    if (hash === '#/' || hash === '#' || hash === '') return { type: 'home' };
    const match = hash.match(/^#\/bab\/(0?[1-4])\/?$/);
    if (match) {
      const chapterNumber = Number(match[1]);
      const chapter = DATA.find(function (item) { return Number(item.number) === chapterNumber; });
      if (chapter) return { type: 'chapter', chapter: chapter };
    }
    return { type: 'home', invalid: true };
  }

  function showToast(message) {
    const toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3400);
  }

  function updateHeader(route) {
    const homeLink = document.querySelector('[data-header-home]');
    const context = document.querySelector('[data-header-context]');
    if (homeLink) {
      const active = route.type === 'home';
      homeLink.classList.toggle('is-active', active);
      if (active) homeLink.setAttribute('aria-current', 'page');
      else homeLink.removeAttribute('aria-current');
    }
    if (context) {
      if (route.type === 'chapter') {
        context.hidden = false;
        context.textContent = 'Bab ' + route.chapter.number;
        context.href = '#/bab/' + route.chapter.number;
        context.setAttribute('aria-current', 'page');
      } else {
        context.hidden = true;
        context.removeAttribute('aria-current');
        context.href = '#/';
      }
    }
    updateHeaderProgress();
  }

  function updateHeaderProgress() {
    const overall = overallProgress();
    const wrapper = document.querySelector('[data-header-progress]');
    const label = document.querySelector('[data-global-progress-label]');
    const fill = document.querySelector('[data-global-progress-fill]');
    if (label) label.textContent = overall.percent + '%';
    if (fill) fill.style.width = overall.percent + '%';
    if (wrapper) {
      wrapper.setAttribute('role', 'progressbar');
      wrapper.setAttribute('aria-valuemin', '0');
      wrapper.setAttribute('aria-valuemax', '100');
      wrapper.setAttribute('aria-valuenow', String(overall.percent));
      wrapper.setAttribute('aria-valuetext', overall.done + ' dari ' + overall.total + ' checkpoint selesai');
      wrapper.setAttribute('title', overall.done + ' dari ' + overall.total + ' checkpoint selesai');
    }
  }

  function motif(number) {
    if (number === '01') {
      return '<svg viewBox="0 0 180 130" aria-hidden="true" focusable="false">' +
        '<path class="motif-line" d="M34 62H74M106 62H146"></path>' +
        '<rect class="motif-box" x="16" y="42" width="42" height="40" rx="8"></rect>' +
        '<rect class="motif-box motif-box-fill" x="70" y="42" width="40" height="40" rx="20"></rect>' +
        '<rect class="motif-box" x="116" y="42" width="48" height="40" rx="8"></rect>' +
        '<circle class="motif-dot" cx="34" cy="62" r="4"></circle><circle class="motif-dot" cx="90" cy="62" r="4"></circle><circle class="motif-dot" cx="140" cy="62" r="4"></circle>' +
        '<path class="motif-bracket" d="M58 98H122"></path><text class="motif-caption" x="90" y="115" text-anchor="middle">urutan</text>' +
      '</svg>';
    }
    if (number === '02') {
      return '<svg viewBox="0 0 180 130" aria-hidden="true" focusable="false">' +
        '<path class="motif-line" d="M42 64H74V30H112M74 64V100H112"></path>' +
        '<circle class="motif-box motif-box-fill" cx="34" cy="64" r="18"></circle>' +
        '<rect class="motif-box" x="112" y="12" width="48" height="36" rx="8"></rect>' +
        '<rect class="motif-box" x="112" y="82" width="48" height="36" rx="8"></rect>' +
        '<circle class="motif-dot" cx="34" cy="64" r="4"></circle>' +
        '<text class="motif-caption" x="90" y="123" text-anchor="middle">pilihan</text>' +
      '</svg>';
    }
    if (number === '03') {
      return '<svg viewBox="0 0 180 130" aria-hidden="true" focusable="false">' +
        '<rect class="motif-box" x="18" y="24" width="48" height="54" rx="8"></rect>' +
        '<rect class="motif-box motif-box-fill" x="72" y="24" width="48" height="54" rx="8"></rect>' +
        '<path class="motif-line" d="M124 51H152"></path>' +
        '<path class="motif-arrow" d="M145 44L153 51L145 58"></path>' +
        '<text class="motif-mono" x="42" y="55" text-anchor="middle">a</text><text class="motif-mono" x="96" y="55" text-anchor="middle">18</text>' +
        '<path class="motif-bracket" d="M24 92H132"></path><text class="motif-caption" x="90" y="111" text-anchor="middle">nilai</text>' +
      '</svg>';
    }
    return '<svg viewBox="0 0 180 130" aria-hidden="true" focusable="false">' +
      '<path class="motif-line" d="M90 20V40M90 78V100M54 59H38M126 59H142"></path>' +
      '<rect class="motif-box" x="28" y="40" width="124" height="38" rx="19"></rect>' +
      '<path class="motif-box motif-box-fill" d="M90 38L116 59L90 80L64 59Z"></path>' +
      '<path class="motif-loop" d="M144 103H158V31H115"></path>' +
      '<path class="motif-arrow" d="M122 24L114 31L122 38"></path>' +
      '<text class="motif-caption" x="58" y="119">ulang</text>' +
    '</svg>';
  }

  function chapterContinueTarget(chapter) {
    const progress = chapterProgress(chapter);
    if (progress.doneSections < progress.totalSections) {
      const nextSection = chapter.sections.find(function (section) { return !isSectionDone(chapter, section.id); });
      return {
        type: 'section',
        id: nextSection ? nextSection.id : chapter.sections[0].id,
        label: progress.doneSections === 0 ? 'Mulai dari bagian pertama' : 'Lanjutkan bagian ' + (progress.doneSections + 1)
      };
    }
    if (!progress.quizPassed) return { type: 'quiz', id: 'kuis', label: 'Kerjakan kuis bab' };
    return { type: 'section', id: chapter.sections[0].id, label: 'Ulangi dari bagian pertama' };
  }

  function continueChapter() {
    if (state.lastChapter) {
      const savedChapter = DATA.find(function (chapter) { return chapter.id === state.lastChapter; });
      if (savedChapter && !chapterProgress(savedChapter).complete) return savedChapter;
    }
    return DATA.find(function (chapter) { return !chapterProgress(chapter).complete; }) || DATA[0];
  }

  function renderHome() {
    const overall = overallProgress();
    const nextChapter = continueChapter();
    const allDone = overall.done === overall.total;
    const startLabel = allDone ? 'Ulangi dari Bab 01' : overall.done > 0 ? 'Lanjutkan Bab ' + nextChapter.number : 'Mulai dari Bab 01';
    const chapterRows = DATA.map(function (chapter) {
      const progress = chapterProgress(chapter);
      const status = progress.complete ? 'Selesai' : progress.doneCheckpoints > 0 ? 'Sedang berjalan' : 'Belum dimulai';
      const actionLabel = progress.complete ? 'Ulangi bab' : progress.doneCheckpoints > 0 ? 'Lanjutkan' : 'Mulai bab';
      return '<li class="chapter-row" style="--accent:' + chapter.accent + '">' +
        '<a class="chapter-row-link" href="#/bab/' + chapter.number + '">' +
          '<span class="row-number">' + chapter.number + '</span>' +
          '<div class="row-main">' +
            '<div class="row-kicker"><span>' + escapeHTML(chapter.level) + '</span><span>' + escapeHTML(chapter.duration) + '</span><span>' + chapter.sections.length + ' bagian</span></div>' +
            '<h3>' + escapeHTML(chapter.shortTitle) + '</h3>' +
            '<p>' + escapeHTML(chapter.summary) + '</p>' +
            '<span class="row-action">' + actionLabel + ' <span aria-hidden="true">↗</span></span>' +
          '</div>' +
          '<div class="row-motif" aria-hidden="true">' + motif(chapter.number) + '</div>' +
          '<div class="row-progress">' +
            '<span class="row-status ' + (progress.complete ? 'is-complete' : progress.doneCheckpoints > 0 ? 'is-progress' : '') + '">' + status + '</span>' +
            '<span class="row-bar"><i style="width:' + progress.percent + '%"></i></span>' +
            '<span class="row-count">' + progress.doneCheckpoints + ' / ' + progress.totalCheckpoints + ' checkpoint</span>' +
          '</div>' +
        '</a>' +
      '</li>';
    }).join('');

    return '<div class="home-page">' +
      '<section class="home-hero">' +
        '<div class="wrap home-hero-grid">' +
          '<div class="home-hero-copy">' +
            '<p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Algoritma &amp; Pemrograman · Semester 1</p>' +
            '<h1>Algoritma lebih mudah dipahami saat <em>dilihat bekerja.</em></h1>' +
            '<p class="hero-lead">Empat modul untuk membangun logika dari nol: baca sedikit, coba visualisasinya, lalu buktikan pemahamanmu lewat kuis. Tidak perlu menghafal kode lebih dulu.</p>' +
            '<div class="hero-actions">' +
              '<a class="btn btn-dark btn-large" href="#/bab/' + nextChapter.number + '">' + startLabel + ' <span aria-hidden="true">→</span></a>' +
              '<a class="text-link" href="#modul">Lihat empat bab <span aria-hidden="true">↓</span></a>' +
            '</div>' +
            '<div class="hero-facts">' +
              '<span><strong>04</strong> bab</span>' +
              '<span><strong>' + overall.total + '</strong> checkpoint</span>' +
              '<span><strong>' + (overall.done > 0 ? overall.percent + '%' : '0') + '</strong> progresmu</span>' +
            '</div>' +
          '</div>' +
          '<div class="hero-demo" data-hero-demo>' +
            '<div class="hero-demo-head"><span>MICRO-LAB / 01</span><span data-hero-count>1 / 3</span></div>' +
            '<div class="hero-demo-question"><span>Tujuan</span><strong>Hitung total 3 buku × Rp25.000</strong></div>' +
            '<div class="hero-demo-flow">' +
              '<div class="hero-demo-node is-active" data-hero-node="0"><small>Input</small><strong>3 · 25.000</strong></div>' +
              '<span class="hero-demo-link" data-hero-link="0" aria-hidden="true"><i></i><b>→</b></span>' +
              '<div class="hero-demo-node" data-hero-node="1"><small>Proses</small><strong data-hero-process>—</strong></div>' +
              '<span class="hero-demo-link" data-hero-link="1" aria-hidden="true"><i></i><b>→</b></span>' +
              '<div class="hero-demo-node" data-hero-node="2"><small>Output</small><strong data-hero-output>—</strong></div>' +
            '</div>' +
            '<p class="hero-demo-caption" data-hero-caption aria-live="polite">Input siap: jumlah 3 dan harga satuan Rp25.000.</p>' +
            '<button type="button" class="btn btn-small btn-dark hero-demo-button" data-hero-next>Proses input <span aria-hidden="true">→</span></button>' +
            '<span class="hero-demo-foot">Satu langkah kecil, satu pemahaman baru.</span>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<section class="method-band" aria-label="Cara belajar di Runut">' +
        '<div class="wrap method-grid">' +
          '<div class="method-intro"><span class="block-label">Cara belajar</span><p>Belajar lewat tiga gerakan sederhana.</p></div>' +
          '<div class="method-item"><span>01</span><strong>Amati</strong><p>Lihat data dan langkah berubah di layar.</p></div>' +
          '<div class="method-item"><span>02</span><strong>Coba</strong><p>Ubah input dan jalankan simulasi sendiri.</p></div>' +
          '<div class="method-item"><span>03</span><strong>Uji</strong><p>Cek pemahaman lewat pertanyaan dan kuis.</p></div>' +
        '</div>' +
      '</section>' +
      '<section class="chapters-section wrap" id="modul">' +
        '<div class="section-heading home-section-heading">' +
          '<div><p class="eyebrow">Peta belajar</p><h2>Empat bab, satu jalur logika.</h2></div>' +
          '<p>Mulai berurutan atau buka bab yang sedang kamu pelajari. Progres setiap bab dihitung terpisah.</p>' +
        '</div>' +
        '<ol class="chapter-list">' + chapterRows + '</ol>' +
      '</section>' +
      '<section class="home-endcap wrap">' +
        '<div class="home-endcap-mark" aria-hidden="true">→</div>' +
        '<div><p class="eyebrow">Prinsip utamanya</p><h2>Pahami alasan sebelum menghafal jawaban.</h2></div>' +
        '<p>Di setiap lab, kamu bisa melihat proses, membatalkan satu langkah, mengulang, dan mencoba input yang berbeda. Progresmu disimpan hanya di perangkat ini.</p>' +
      '</section>' +
    '</div>';
  }

  function renderToc(chapter, progress, mobile) {
    const items = chapter.sections.map(function (section, index) {
      const done = isSectionDone(chapter, section.id);
      return '<li><button type="button" class="toc-link ' + (done ? 'is-complete' : '') + '" data-jump-section="' + section.id + '">' +
        '<span class="toc-index">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<span class="toc-label">' + escapeHTML(section.navTitle) + '</span>' +
        '<span class="toc-mark" data-toc-mark="' + section.id + '" aria-hidden="true">' + (done ? '✓' : '') + '</span>' +
      '</button></li>';
    }).join('');
    return '<nav class="toc" aria-label="Daftar submateri ' + escapeHTML(chapter.shortTitle) + '">' +
      '<div class="toc-head"><span class="block-label">Dalam bab ini</span><span class="toc-percent" data-progress-percent>' + progress.percent + '%</span></div>' +
      '<ol class="toc-list">' + items +
        '<li><button type="button" class="toc-link toc-quiz-link ' + (progress.quizPassed ? 'is-complete' : '') + '" data-jump-quiz>' +
          '<span class="toc-index">Q</span><span class="toc-label">Kuis bab</span><span class="toc-mark" data-toc-quiz-mark aria-hidden="true">' + (progress.quizPassed ? '✓' : '') + '</span>' +
        '</button></li>' +
      '</ol>' +
      '<div class="toc-bottom">' +
        '<div class="toc-progress"><span data-progress-sections>' + progress.doneSections + ' / ' + progress.totalSections + ' bagian selesai</span><span class="toc-progress-track"><i data-progress-fill style="width:' + progress.percent + '%"></i></span></div>' +
        '<p class="toc-note">Kuis dihitung setelah kamu lulus minimal ' + passMark(chapter.quiz.length) + ' dari ' + chapter.quiz.length + ' soal.</p>' +
        (mobile ? '' : '<a class="text-link toc-back" href="#/">← Kembali ke daftar bab</a>') +
      '</div>' +
      '</nav>';
  }

  function renderCourseNav(chapter, mobile) {
    const items = DATA.map(function (item) {
      const progress = chapterProgress(item);
      const current = item.id === chapter.id;
      return '<li><a class="course-nav-link ' + (current ? 'is-current' : '') + (progress.complete ? ' is-complete' : '') + '" href="#/bab/' + item.number + '" data-course-link="' + item.id + '"' + (current ? ' aria-current="page"' : '') + ' aria-label="Bab ' + item.number + ': ' + escapeHTML(item.shortTitle) + ', ' + progress.percent + '% selesai">' +
        '<span class="course-nav-index">' + item.number + '</span>' +
        '<span class="course-nav-copy"><strong>' + escapeHTML(item.shortTitle) + '</strong>' +
          '<span class="course-nav-meta"><span data-course-count="' + item.id + '">' + progress.doneSections + '/' + progress.totalSections + ' bagian</span><span data-course-percent="' + item.id + '">' + progress.percent + '%</span></span>' +
          '<span class="course-nav-track" aria-hidden="true"><i data-course-fill="' + item.id + '" style="width:' + progress.percent + '%"></i></span>' +
        '</span><span class="course-nav-mark" data-course-mark="' + item.id + '" aria-hidden="true">' + (progress.complete ? '✓' : current ? '●' : '') + '</span>' +
      '</a></li>';
    }).join('');
    const nav = '<nav class="course-nav" aria-label="Semua bab materi"><div class="course-nav-head"><span class="block-label">Semua materi</span><span>01–04</span></div><ol class="course-nav-list">' + items + '</ol></nav>';
    if (!mobile) return nav;
    return '<details class="mobile-course-nav"><summary><span>Jelajahi semua bab</span><span>Bab ' + chapter.number + ' / 04</span></summary>' + nav + '</details>';
  }

  function renderMiniCheck(check, chapter, section) {
    if (!check) return '';
    const questionId = 'check-question-' + chapter.number + '-' + section.id;
    const hintId = 'check-hint-' + chapter.number + '-' + section.id;
    const options = check.options.map(function (option, index) {
      return '<button type="button" class="check-option" data-check-option="' + index + '" aria-pressed="false">' +
        '<span class="check-letter">' + String.fromCharCode(65 + index) + '</span>' +
        '<span>' + option + '</span>' +
      '</button>';
    }).join('');
    return '<div class="mini-check" data-mini-check data-correct="' + check.answer + '" data-explanation="' + escapeHTML(check.explanation) + '">' +
      '<div class="check-head"><span class="block-label">Cek pemahaman</span><button type="button" class="quiet-button" data-check-hint aria-expanded="false" aria-controls="' + hintId + '">Lihat petunjuk</button></div>' +
      '<p class="check-question" id="' + questionId + '">' + check.question + '</p>' +
      '<div class="check-options" role="group" aria-labelledby="' + questionId + '">' + options + '</div>' +
      '<p class="check-hint" id="' + hintId + '" data-check-hint-text hidden><strong>Petunjuk:</strong> ' + check.hint + '</p>' +
      '<p class="visually-hidden" data-check-hint-announcer role="status" aria-live="polite"></p>' +
      '<div class="check-feedback" data-check-feedback hidden aria-live="polite"></div>' +
    '</div>';
  }

  function renderSection(chapter, section, index) {
    const done = isSectionDone(chapter, section.id);
    const next = chapter.sections[index + 1];
    const sectionId = 'bagian-' + chapter.number + '-' + section.id;
    return '<section class="lesson-section ' + (done ? 'is-complete' : '') + '" id="' + sectionId + '" data-section-id="' + section.id + '" aria-labelledby="heading-' + sectionId + '">' +
      '<header class="lesson-section-head">' +
        '<div class="section-index"><span>' + String(index + 1).padStart(2, '0') + '</span><i aria-hidden="true"></i><small>' + escapeHTML(section.minutes) + '</small></div>' +
        '<div class="section-heading-copy"><p class="eyebrow">Bagian ' + String(index + 1).padStart(2, '0') + ' / ' + String(chapter.sections.length).padStart(2, '0') + '</p><h2 id="heading-' + sectionId + '">' + section.title + '</h2><p class="section-lead">' + section.lead + '</p></div>' +
      '</header>' +
      '<div class="lesson-content">' + section.html + '</div>' +
      renderMiniCheck(section.check, chapter, section) +
      '<div class="section-finish">' +
        '<div><span class="block-label">Tandai progres</span><p>Tandai bagian ini setelah kamu mencoba visualisasinya dan menjawab cek pemahaman.</p></div>' +
        '<button type="button" class="btn btn-complete ' + (done ? 'is-complete' : '') + '" data-mark-section data-chapter-id="' + chapter.id + '" data-section-id="' + section.id + '" aria-pressed="' + done + '"><span data-mark-label>' + (done ? 'Sudah dipahami ✓' : 'Tandai sudah dipahami') + '</span></button>' +
      '</div>' +
      '<nav class="section-pager" aria-label="Navigasi setelah bagian ' + String(index + 1).padStart(2, '0') + '">' +
        '<span class="pager-label">Selanjutnya</span>' +
        (next
          ? '<button type="button" class="pager-link" data-jump-section="' + next.id + '"><span>Bagian ' + String(index + 2).padStart(2, '0') + '</span><strong>' + escapeHTML(next.navTitle) + ' →</strong></button>'
          : '<button type="button" class="pager-link" data-jump-quiz><span>Evaluasi bab</span><strong>Kerjakan kuis →</strong></button>') +
      '</nav>' +
    '</section>';
  }

  function renderQuizShell(chapter) {
    const saved = ensureChapterState(chapter);
    const progress = chapterProgress(chapter);
    const bestLabel = saved.quiz.best === null ? '—' : saved.quiz.best + '/' + chapter.quiz.length;
    return '<section class="quiz-section" id="kuis" aria-labelledby="quiz-heading">' +
      '<div class="quiz-intro">' +
        '<div class="quiz-intro-copy">' +
          '<p class="eyebrow">Evaluasi bab ' + chapter.number + '</p>' +
          '<h2 id="quiz-heading">Cek apakah logikanya sudah menyambung.</h2>' +
          '<p>Kerjakan ' + chapter.quiz.length + ' soal tanpa melihat jawaban lebih dulu. Gunakan petunjuk bila perlu. Minimal <strong>' + passMark(chapter.quiz.length) + ' dari ' + chapter.quiz.length + ' benar</strong> untuk melengkapi bab.</p>' +
        '</div>' +
        '<div class="quiz-score-card">' +
          '<span class="block-label">Skor terbaik</span>' +
          '<strong data-quiz-best>' + bestLabel + '</strong>' +
          '<span class="' + (progress.quizPassed ? 'quiz-passed-label' : 'quiz-pending-label') + '" data-quiz-pass-label>' + (progress.quizPassed ? 'Sudah lulus' : 'Belum lulus') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="quiz-toolbar"><span class="quiz-progress" data-quiz-progress>0 / ' + chapter.quiz.length + ' soal diperiksa</span><span class="quiz-saved-note">Skor terbaik tersimpan otomatis</span></div>' +
      '<div class="quiz-questions" data-quiz-body></div>' +
      '<div class="quiz-footer">' +
        '<p data-quiz-status>Jawab satu per satu. Pembahasan muncul setelah kamu memeriksa jawaban.</p>' +
        '<button type="button" class="btn btn-small btn-quiet" data-quiz-reset>Ulangi kuis</button>' +
      '</div>' +
      '<div class="quiz-result" data-quiz-result hidden aria-live="polite"></div>' +
    '</section>';
  }

  function renderChapter(chapter) {
    const progress = chapterProgress(chapter);
    const target = chapterContinueTarget(chapter);
    const saved = ensureChapterState(chapter);
    const quizBest = saved.quiz.best === null ? '—' : saved.quiz.best + '/' + chapter.quiz.length;
    const goals = chapter.goals.map(function (goal) {
      return '<li><span aria-hidden="true">✓</span>' + goal + '</li>';
    }).join('');
    const sections = chapter.sections.map(function (section, index) {
      return renderSection(chapter, section, index);
    }).join('');
    const summaryPoints = chapter.recap.points.map(function (point) {
      return '<li>' + point + '</li>';
    }).join('');
    const previous = DATA[DATA.indexOf(chapter) - 1];
    const next = DATA[DATA.indexOf(chapter) + 1];

    return '<div class="chapter-page wrap ' + chapter.themeClass + '" style="--accent:' + chapter.accent + '">' +
      '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="#/">Daftar bab</a><span aria-hidden="true">/</span><span aria-current="page">Bab ' + chapter.number + '</span></nav>' +
      '<header class="chapter-hero">' +
        '<div class="chapter-hero-main">' +
          '<div class="chapter-hero-copy">' +
            '<p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Bab ' + chapter.number + ' · ' + escapeHTML(chapter.level) + '</p>' +
            '<h1>' + chapter.heroTitle + '</h1>' +
            '<p class="chapter-lead">' + chapter.summary + '</p>' +
            '<div class="chapter-actions">' +
              '<button type="button" class="btn btn-dark" data-continue-chapter data-target-type="' + target.type + '" data-target-id="' + target.id + '">' + target.label + ' <span aria-hidden="true">→</span></button>' +
              '<button type="button" class="btn btn-outline" data-jump-quiz>' + (progress.quizPassed ? 'Lihat hasil kuis' : 'Ke kuis bab') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="chapter-cover" aria-hidden="true"><span class="cover-number">' + chapter.number + '</span><div class="cover-motif">' + motif(chapter.number) + '</div><span class="cover-label">' + escapeHTML(chapter.level) + ' / ' + escapeHTML(chapter.duration) + '</span></div>' +
        '</div>' +
        '<div class="chapter-goal-block"><span class="block-label">Setelah bab ini, kamu bisa</span><ul class="goal-list">' + goals + '</ul></div>' +
        '<div class="chapter-hero-footer">' +
          '<div class="hero-progress"><div class="hero-progress-label"><span>Progres bab</span><strong data-progress-percent>' + progress.percent + '%</strong></div><span class="hero-progress-track"><i data-progress-fill style="width:' + progress.percent + '%"></i></span><span class="hero-progress-note" data-progress-count>' + progress.doneCheckpoints + ' / ' + progress.totalCheckpoints + ' checkpoint selesai</span></div>' +
          '<div class="hero-facts"><span><strong>' + chapter.sections.length + '</strong> bagian</span><span><strong>' + chapter.quiz.length + '</strong> soal kuis</span><span><strong>' + quizBest + '</strong> skor terbaik</span></div>' +
        '</div>' +
      '</header>' +
      '<div class="chapter-layout">' +
        '<aside class="chapter-sidebar"><div class="sidebar-sticky">' +
          '<div class="sidebar-progress"><span class="block-label">Progres bab</span><strong data-progress-percent>' + progress.percent + '%</strong><span class="sidebar-track"><i data-progress-fill style="width:' + progress.percent + '%"></i></span><small data-progress-sections>' + progress.doneSections + ' / ' + progress.totalSections + ' bagian selesai</small></div>' +
          renderCourseNav(chapter, false) +
          renderToc(chapter, progress, false) +
        '</div></aside>' +
        '<div class="chapter-main">' +
          renderCourseNav(chapter, true) +
          '<details class="mobile-toc"><summary><span>Isi bab &amp; progres</span><span data-progress-percent>' + progress.percent + '%</span></summary>' + renderToc(chapter, progress, true) + '</details>' +
          sections +
          '<section class="chapter-summary" aria-labelledby="summary-heading">' +
            '<div class="summary-head"><span class="summary-mark" aria-hidden="true">∴</span><div><p class="eyebrow">Rangkuman bab ' + chapter.number + '</p><h2 id="summary-heading">' + chapter.recap.title + '</h2><p>' + chapter.recap.lead + '</p></div></div>' +
            '<ul class="summary-points">' + summaryPoints + '</ul>' +
            '<div class="summary-status" data-summary-status>' + (progress.complete ? 'Semua bagian dan kuis sudah selesai. Bab ini tuntas.' : progress.doneSections === progress.totalSections ? 'Semua bagian sudah ditandai. Selesaikan kuis untuk menuntaskan bab.' : 'Tandai setiap bagian dan lulus kuis untuk menyelesaikan bab ini.') + '</div>' +
          '</section>' +
          renderQuizShell(chapter) +
          '<nav class="chapter-switch" aria-label="Navigasi antarbab">' +
            '<a class="chapter-switch-link prev" href="' + (previous ? '#/bab/' + previous.number : '#/') + '"><span>← ' + (previous ? 'Bab sebelumnya' : 'Kembali') + '</span><strong>' + (previous ? previous.number + ' · ' + escapeHTML(previous.shortTitle) : 'Daftar bab') + '</strong></a>' +
            '<a class="all-chapters-link" href="#/">Semua bab</a>' +
            '<a class="chapter-switch-link next" href="' + (next ? '#/bab/' + next.number : '#/') + '"><span>' + (next ? 'Bab berikutnya' : 'Selesai') + ' →</span><strong>' + (next ? next.number + ' · ' + escapeHTML(next.shortTitle) : 'Kembali ke daftar bab') + '</strong></a>' +
          '</nav>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function initHeroDemo() {
    const demo = document.querySelector('[data-hero-demo]');
    if (!demo) return;
    const nodes = Array.from(demo.querySelectorAll('[data-hero-node]'));
    const links = Array.from(demo.querySelectorAll('[data-hero-link]'));
    const count = demo.querySelector('[data-hero-count]');
    const caption = demo.querySelector('[data-hero-caption]');
    const button = demo.querySelector('[data-hero-next]');
    const processValue = demo.querySelector('[data-hero-process]');
    const outputValue = demo.querySelector('[data-hero-output]');
    let step = 0;
    function paint() {
      nodes.forEach(function (node, index) {
        node.classList.toggle('is-active', index === step);
        node.classList.toggle('is-done', index < step);
        node.classList.remove('is-pending');
        if (index > step) node.classList.add('is-pending');
      });
      links.forEach(function (link, index) {
        link.classList.toggle('is-active', index < step);
      });
      if (processValue) processValue.textContent = step >= 1 ? '3 × 25.000' : '—';
      if (outputValue) outputValue.textContent = step >= 2 ? '75.000' : '—';
      if (count) count.textContent = (step + 1) + ' / 3';
      if (caption) {
        if (step === 0) caption.textContent = 'Input siap: jumlah 3 dan harga satuan Rp25.000.';
        if (step === 1) caption.textContent = 'Proses: kalikan 3 dengan 25.000. Hasilnya 75.000.';
        if (step === 2) caption.textContent = 'Output: total yang harus dibayar adalah Rp75.000.';
      }
      if (button) {
        button.innerHTML = step === 0 ? 'Proses input <span aria-hidden="true">→</span>' : step === 1 ? 'Tampilkan output <span aria-hidden="true">→</span>' : 'Ulangi contoh <span aria-hidden="true">↺</span>';
      }
    }
    button.addEventListener('click', function () {
      step = step === 2 ? 0 : step + 1;
      paint();
    });
    paint();
  }

  function initialProgressUI(chapter) {
    const overall = overallProgress();
    const savings = ensureChapterState(chapter);
    const best = savings.quiz.best === null ? '—' : savings.quiz.best + '/' + chapter.quiz.length;
    document.querySelectorAll('[data-quiz-best]').forEach(function (node) { node.textContent = best; });
    document.querySelectorAll('[data-quiz-pass-label]').forEach(function (node) {
      node.textContent = savings.quiz.passed ? 'Sudah lulus' : 'Belum lulus';
      node.classList.toggle('quiz-passed-label', savings.quiz.passed);
      node.classList.toggle('quiz-pending-label', !savings.quiz.passed);
    });
    updateHeaderProgress(overall);
  }

  function updateCourseNavUI() {
    DATA.forEach(function (chapter) {
      const progress = chapterProgress(chapter);
      const current = currentChapter && currentChapter.id === chapter.id;
      document.querySelectorAll('[data-course-link="' + chapter.id + '"]').forEach(function (link) {
        link.classList.toggle('is-current', Boolean(current));
        link.classList.toggle('is-complete', progress.complete);
        if (current) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
        link.setAttribute('aria-label', 'Bab ' + chapter.number + ': ' + chapter.shortTitle + ', ' + progress.percent + '% selesai' + (current ? ', sedang dibuka' : ''));
      });
      document.querySelectorAll('[data-course-count="' + chapter.id + '"]').forEach(function (node) {
        node.textContent = progress.doneSections + '/' + progress.totalSections + ' bagian';
      });
      document.querySelectorAll('[data-course-percent="' + chapter.id + '"]').forEach(function (node) {
        node.textContent = progress.percent + '%';
      });
      document.querySelectorAll('[data-course-fill="' + chapter.id + '"]').forEach(function (node) {
        node.style.width = progress.percent + '%';
      });
      document.querySelectorAll('[data-course-mark="' + chapter.id + '"]').forEach(function (node) {
        node.textContent = progress.complete ? '✓' : current ? '●' : '';
      });
    });
  }

  function updateChapterProgressUI(chapter) {
    const progress = chapterProgress(chapter);
    const saved = ensureChapterState(chapter);
    document.querySelectorAll('[data-progress-percent]').forEach(function (node) { node.textContent = progress.percent + '%'; });
    document.querySelectorAll('[data-progress-fill]').forEach(function (node) { node.style.width = progress.percent + '%'; });
    document.querySelectorAll('[data-progress-count]').forEach(function (node) { node.textContent = progress.doneCheckpoints + ' / ' + progress.totalCheckpoints + ' checkpoint selesai'; });
    document.querySelectorAll('[data-progress-sections]').forEach(function (node) { node.textContent = progress.doneSections + ' / ' + progress.totalSections + ' bagian selesai'; });

    chapter.sections.forEach(function (section) {
      const done = isSectionDone(chapter, section.id);
      document.querySelectorAll('[data-toc-mark="' + section.id + '"]').forEach(function (node) {
        node.textContent = done ? '✓' : '';
      });
      document.querySelectorAll('.toc-link[data-jump-section="' + section.id + '"]').forEach(function (node) {
        node.classList.toggle('is-complete', done);
      });
      const sectionNode = document.querySelector('.lesson-section[data-section-id="' + section.id + '"]');
      if (sectionNode) sectionNode.classList.toggle('is-complete', done);
      document.querySelectorAll('[data-mark-section][data-section-id="' + section.id + '"]').forEach(function (button) {
        button.classList.toggle('is-complete', done);
        button.setAttribute('aria-pressed', String(done));
        const label = button.querySelector('[data-mark-label]');
        if (label) label.textContent = done ? 'Sudah dipahami ✓' : 'Tandai sudah dipahami';
      });
    });

    document.querySelectorAll('[data-toc-quiz-mark]').forEach(function (node) { node.textContent = progress.quizPassed ? '✓' : ''; });
    document.querySelectorAll('.toc-quiz-link').forEach(function (node) { node.classList.toggle('is-complete', progress.quizPassed); });

    const summaryStatus = document.querySelector('[data-summary-status]');
    if (summaryStatus) {
      summaryStatus.textContent = progress.complete
        ? 'Semua bagian dan kuis sudah selesai. Bab ini tuntas.'
        : progress.doneSections === progress.totalSections
          ? 'Semua bagian sudah ditandai. Selesaikan kuis untuk menuntaskan bab.'
          : 'Tandai setiap bagian dan lulus kuis untuk menyelesaikan bab ini.';
    }

    const continueButton = document.querySelector('[data-continue-chapter]');
    if (continueButton) {
      const target = chapterContinueTarget(chapter);
      continueButton.dataset.targetType = target.type;
      continueButton.dataset.targetId = target.id;
      continueButton.innerHTML = target.label + ' <span aria-hidden="true">→</span>';
    }

    const best = saved.quiz.best === null ? '—' : saved.quiz.best + '/' + chapter.quiz.length;
    document.querySelectorAll('[data-quiz-best]').forEach(function (node) { node.textContent = best; });
    document.querySelectorAll('[data-quiz-pass-label]').forEach(function (node) {
      node.textContent = saved.quiz.passed ? 'Sudah lulus' : 'Belum lulus';
      node.classList.toggle('quiz-passed-label', saved.quiz.passed);
      node.classList.toggle('quiz-pending-label', !saved.quiz.passed);
    });
    const quizButton = document.querySelector('[data-jump-quiz].btn-outline');
    if (quizButton) quizButton.textContent = progress.quizPassed ? 'Lihat hasil kuis' : 'Ke kuis bab';
    updateCourseNavUI();
    updateHeaderProgress();
  }

  function initMiniChecks() {
    document.querySelectorAll('[data-mini-check]').forEach(function (box) {
      if (box.dataset.bound === 'true') return;
      box.dataset.bound = 'true';
      const correct = Number(box.dataset.correct);
      const options = Array.from(box.querySelectorAll('[data-check-option]'));
      const hintButton = box.querySelector('[data-check-hint]');
      const hint = box.querySelector('[data-check-hint-text]');
      const feedback = box.querySelector('[data-check-feedback]');
      if (hintButton && hint) {
        hintButton.addEventListener('click', function () {
          if (hintButton.getAttribute('aria-disabled') === 'true') return;
          const announcer = box.querySelector('[data-check-hint-announcer]');
          hint.hidden = false;
          hintButton.textContent = 'Petunjuk terbuka';
          hintButton.setAttribute('aria-expanded', 'true');
          hintButton.setAttribute('aria-disabled', 'true');
          if (announcer) announcer.textContent = hint.textContent;
        });
      }
      options.forEach(function (option) {
        option.addEventListener('click', function () {
          if (box.classList.contains('is-answered')) return;
          box.classList.add('is-answered');
          const picked = Number(option.dataset.checkOption);
          options.forEach(function (item, index) {
            item.disabled = true;
            item.setAttribute('aria-pressed', String(index === picked));
            item.classList.toggle('is-correct', index === correct);
            if (index === picked && picked !== correct) item.classList.add('is-wrong');
          });
          if (feedback) {
            const answerText = options[correct] ? options[correct].querySelector('span:last-child') : null;
            const answerHTML = answerText ? answerText.innerHTML : '';
            const explanation = box.dataset.explanation || '';
            feedback.hidden = false;
            feedback.classList.toggle('is-right', picked === correct);
            feedback.classList.toggle('is-wrong', picked !== correct);
            feedback.innerHTML = '<p class="check-feedback-title"><strong>' + (picked === correct ? 'Tepat.' : 'Belum tepat.') + '</strong>' +
              (picked === correct ? '' : ' Jawaban yang benar: <strong>' + String.fromCharCode(65 + correct) + '</strong> — ' + answerHTML + '.') + '</p>' +
              (explanation ? '<p class="check-feedback-copy">' + explanation + '</p>' : '');
            feedback.setAttribute('tabindex', '-1');
            feedback.focus({ preventScroll: true });
          }
        });
      });
    });
  }

  function scrollToTarget(target) {
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function jumpToSection(sectionId) {
    if (!currentChapter) return;
    const node = document.getElementById('bagian-' + currentChapter.number + '-' + sectionId);
    if (node) {
      scrollToTarget(node);
      closeOpenToc();
    }
  }

  function jumpToQuiz() {
    const quiz = document.getElementById('kuis');
    if (quiz) {
      scrollToTarget(quiz);
      closeOpenToc();
    }
  }

  function closeOpenToc() {
    document.querySelectorAll('.mobile-toc[open]').forEach(function (details) { details.open = false; });
  }

  function renderQuizQuestions(chapter) {
    return chapter.quiz.map(function (question, index) {
      const typeLabel = question.type === 'choice' ? (question.code ? 'Prediksi output' : 'Pilihan ganda') : question.type === 'input' ? 'Isi jawaban' : 'Susun urutan';
      const promptId = 'quiz-prompt-' + index;
      const hintId = 'quiz-hints-' + index;
      let response = '';
      if (question.type === 'choice') {
        const options = question.options.map(function (option, optionIndex) {
          return '<button type="button" class="quiz-option" data-choice-index="' + optionIndex + '" role="radio" aria-checked="false" tabindex="' + (optionIndex === 0 ? '0' : '-1') + '"><span class="option-letter">' + String.fromCharCode(65 + optionIndex) + '</span><span>' + option + '</span></button>';
        }).join('');
        response = '<div class="quiz-options" role="radiogroup" aria-labelledby="' + promptId + '">' + options + '</div>';
      } else if (question.type === 'input') {
        response = '<label class="quiz-input-label"><span class="visually-hidden">Jawaban soal ' + (index + 1) + '</span><input type="text" class="quiz-input" data-quiz-input placeholder="' + escapeHTML(question.placeholder || 'Tulis jawabanmu') + '" autocomplete="off" spellcheck="false"></label>';
      } else if (question.type === 'sequence') {
        const itemMap = {};
        question.items.forEach(function (item) { itemMap[item.id] = item.label; });
        const order = question.initialOrder || question.correctOrder;
        const rows = order.map(function (id, orderIndex) {
          return '<li class="sequence-item" data-sequence-id="' + id + '"><span class="sequence-number">' + (orderIndex + 1) + '</span><span class="sequence-text">' + itemMap[id] + '</span><span class="sequence-controls"><button type="button" class="reorder-button" data-move="up" aria-label="Naikkan: ' + escapeHTML(itemMap[id]) + ' (posisi ' + (orderIndex + 1) + ' dari ' + order.length + ')"><svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 10V2M2.5 5.5 6 2l3.5 3.5"></path></svg></button><button type="button" class="reorder-button" data-move="down" aria-label="Turunkan: ' + escapeHTML(itemMap[id]) + ' (posisi ' + (orderIndex + 1) + ' dari ' + order.length + ')"><svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 2v8M2.5 6.5 6 10l3.5-3.5"></path></svg></button></span></li>';
        }).join('');
        response = '<p class="quiz-instruction">' + escapeHTML(question.instruction || 'Susun urutan yang benar dengan tombol naik/turun.') + '</p><ol class="sequence-list" data-sequence-list>' + rows + '</ol><p class="visually-hidden" data-sequence-status role="status" aria-live="polite"></p>';
      }
      const hints = Array.isArray(question.hints) ? question.hints.map(function (hint, hintIndex) {
        return '<p data-quiz-hint-item="' + hintIndex + '" hidden><span>' + (hintIndex + 1) + '.</span> ' + hint + '</p>';
      }).join('') : '';
      return '<article class="quiz-question" data-quiz-question data-question-index="' + index + '" data-question-type="' + question.type + '">' +
        '<div class="quiz-question-head"><span class="quiz-question-number">' + String(index + 1).padStart(2, '0') + '</span><span class="quiz-type">' + typeLabel + '</span><span class="quiz-question-state" data-question-state></span></div>' +
        '<p class="quiz-prompt" id="' + promptId + '">' + question.prompt + '</p>' +
        (question.code ? '<pre class="quiz-code"><code>' + escapeHTML(question.code) + '</code></pre>' : '') +
        response +
        (hints ? '<div class="quiz-hints" id="' + hintId + '" data-quiz-hints hidden><span class="block-label">Petunjuk bertahap</span>' + hints + '</div>' : '') +
        '<p class="visually-hidden" data-quiz-hint-announcer role="status" aria-live="polite"></p>' +
        '<div class="quiz-actions">' +
          (hints ? '<button type="button" class="quiet-button" data-quiz-hint-button aria-expanded="false" aria-controls="' + hintId + '">Minta petunjuk</button>' : '') +
          '<button type="button" class="btn btn-small btn-dark" data-quiz-check>Periksa jawaban</button>' +
        '</div>' +
        '<div class="quiz-feedback" data-quiz-feedback hidden aria-live="polite"></div>' +
      '</article>';
    }).join('');
  }

  function normalizeAnswer(value) {
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function isInputAnswerCorrect(value, accepted) {
    const normalized = normalizeAnswer(value);
    return accepted.some(function (candidate) {
      return normalizeAnswer(candidate) === normalized;
    });
  }

  function formatCorrectAnswer(question) {
    if (question.type === 'choice') {
      return String.fromCharCode(65 + question.answer) + '. ' + question.options[question.answer];
    }
    if (question.type === 'input') {
      return question.accepted[0];
    }
    if (question.type === 'sequence') {
      const itemMap = {};
      question.items.forEach(function (item) { itemMap[item.id] = item.label; });
      return question.correctOrder.map(function (id) { return itemMap[id]; }).join(' → ');
    }
    return '';
  }

  function getQuestionCorrect(question, node) {
    if (question.type === 'choice') {
      const selected = node.querySelector('.quiz-option.is-selected');
      if (!selected) return { error: 'Pilih satu jawaban dulu.' };
      const picked = Number(selected.dataset.choiceIndex);
      return { correct: picked === question.answer, picked: picked };
    }
    if (question.type === 'input') {
      const input = node.querySelector('[data-quiz-input]');
      const raw = input ? input.value : '';
      if (!raw.trim()) return { error: 'Tulis jawabanmu dulu.' };
      return { correct: isInputAnswerCorrect(raw, question.accepted), raw: raw };
    }
    const list = node.querySelector('[data-sequence-list]');
    const order = Array.from(list.querySelectorAll('[data-sequence-id]')).map(function (item) { return item.dataset.sequenceId; });
    return { correct: order.join('|') === question.correctOrder.join('|'), order: order };
  }

  function initQuiz(chapter) {
    const quizRoot = document.querySelector('[data-quiz-body]');
    if (!quizRoot) return;
    const total = chapter.quiz.length;
    const quizProgress = document.querySelector('[data-quiz-progress]');
    const quizStatus = document.querySelector('[data-quiz-status]');
    const resultBox = document.querySelector('[data-quiz-result]');
    const resetButton = document.querySelector('[data-quiz-reset]');
    let checked = new Set();
    let correctCount = 0;
    let questionStates = new Array(total).fill(null);

    function updateProgressLabel() {
      if (quizProgress) quizProgress.textContent = checked.size + ' / ' + total + ' soal diperiksa';
      if (quizStatus && checked.size < total) {
        quizStatus.textContent = checked.size === 0 ? 'Jawab satu per satu. Pembahasan muncul setelah kamu memeriksa jawaban.' : 'Teruskan. Kamu masih bisa membuka petunjuk pada soal berikutnya.';
      }
    }

    function showResult() {
      const score = correctCount;
      const threshold = passMark(total);
      const passed = score >= threshold;
      const saved = ensureChapterState(chapter);
      const best = saved.quiz.best === null ? score : Math.max(saved.quiz.best, score);
      saved.quiz.best = best;
      saved.quiz.total = total;
      saved.quiz.attempts += 1;
      saved.quiz.passed = saved.quiz.passed || passed;
      saveState();

      document.querySelectorAll('[data-quiz-best]').forEach(function (node) { node.textContent = best + '/' + total; });
      document.querySelectorAll('[data-quiz-pass-label]').forEach(function (node) {
        node.textContent = saved.quiz.passed ? 'Sudah lulus' : 'Belum lulus';
        node.classList.toggle('quiz-passed-label', saved.quiz.passed);
        node.classList.toggle('quiz-pending-label', !saved.quiz.passed);
      });
      if (quizStatus) quizStatus.textContent = score + ' dari ' + total + ' jawaban benar. Skor terbaikmu tersimpan.';
      if (resultBox) {
        resultBox.hidden = false;
        resultBox.className = 'quiz-result ' + (passed ? 'result-passed' : 'result-failed');
        resultBox.innerHTML = '<div><span class="block-label">Hasil kuis</span><h3>' + (passed ? 'Bab ini berhasil kamu selesaikan.' : 'Belum lulus, tetapi progresmu sudah tercatat.') + '</h3><p>' + score + ' / ' + total + ' benar. ' + (passed ? 'Kamu sudah melewati batas minimal ' + threshold + ' soal.' : 'Ulangi bagian yang masih membingungkan, lalu coba kuis lagi. Batas lulusnya ' + threshold + ' dari ' + total + ' soal.') + '</p></div><strong class="result-score">' + score + '<span>/' + total + '</span></strong>';
        resultBox.setAttribute('tabindex', '-1');
        resultBox.focus({ preventScroll: true });
      }
      if (quizRoot) quizRoot.classList.add('is-finished');
      updateChapterProgressUI(chapter);
      showToast(passed ? 'Kuis lulus. Progres bab diperbarui.' : 'Kuis selesai. Skor terbaik tersimpan.');
    }

    function bindQuestion(node, question, index) {
      const checkButton = node.querySelector('[data-quiz-check]');
      const hintButton = node.querySelector('[data-quiz-hint-button]');
      const hintBox = node.querySelector('[data-quiz-hints]');
      const feedback = node.querySelector('[data-quiz-feedback]');
      let hintIndex = 0;

      if (question.type === 'choice') {
        const options = Array.from(node.querySelectorAll('.quiz-option'));
        function selectOption(option) {
          options.forEach(function (item) {
            const selected = item === option;
            item.classList.toggle('is-selected', selected);
            item.setAttribute('aria-checked', String(selected));
            item.tabIndex = selected ? 0 : -1;
          });
        }
        options.forEach(function (option, optionIndex) {
          option.addEventListener('click', function () {
            if (node.classList.contains('is-checked')) return;
            selectOption(option);
          });
          option.addEventListener('keydown', function (event) {
            if (node.classList.contains('is-checked')) return;
            let nextIndex = null;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (optionIndex + 1) % options.length;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (optionIndex - 1 + options.length) % options.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = options.length - 1;
            if (nextIndex === null) return;
            event.preventDefault();
            selectOption(options[nextIndex]);
            options[nextIndex].focus();
          });
        });
      }

      if (question.type === 'input') {
        const input = node.querySelector('[data-quiz-input]');
        if (input) {
          input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
              event.preventDefault();
              checkButton.click();
            }
          });
        }
      }

      if (question.type === 'sequence') {
        const sequenceList = node.querySelector('[data-sequence-list]');
        const sequenceStatus = node.querySelector('[data-sequence-status]');
        function refreshSequence() {
          if (!sequenceList) return;
          const rows = Array.from(sequenceList.children);
          rows.forEach(function (item, itemIndex) {
            const number = item.querySelector('.sequence-number');
            if (number) number.textContent = String(itemIndex + 1);
            const label = item.querySelector('.sequence-text');
            const labelText = label ? label.textContent.trim() : '';
            const up = item.querySelector('[data-move="up"]');
            const down = item.querySelector('[data-move="down"]');
            if (up) {
              up.disabled = itemIndex === 0;
              up.setAttribute('aria-label', 'Naikkan: ' + labelText + ' (posisi ' + (itemIndex + 1) + ' dari ' + rows.length + ')');
            }
            if (down) {
              down.disabled = itemIndex === rows.length - 1;
              down.setAttribute('aria-label', 'Turunkan: ' + labelText + ' (posisi ' + (itemIndex + 1) + ' dari ' + rows.length + ')');
            }
          });
        }
        refreshSequence();
        node.querySelectorAll('[data-move]').forEach(function (button) {
          button.addEventListener('click', function () {
            if (node.classList.contains('is-checked')) return;
            const row = button.closest('.sequence-item');
            const list = row.parentElement;
            const direction = button.dataset.move;
            if (direction === 'up' && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);
            if (direction === 'down' && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);
            refreshSequence();
            if (sequenceStatus) {
              const label = row.querySelector('.sequence-text');
              sequenceStatus.textContent = (label ? label.textContent.trim() : 'Langkah') + ' sekarang berada di posisi ' + (Array.from(list.children).indexOf(row) + 1) + ' dari ' + list.children.length + '.';
            }
            if (button.disabled) {
              const alternate = row.querySelector('[data-move="' + (direction === 'up' ? 'down' : 'up') + '"]');
              if (alternate && !alternate.disabled) alternate.focus();
            } else {
              button.focus();
            }
          });
        });
      }

      if (hintButton && hintBox) {
        hintButton.addEventListener('click', function () {
          const hints = Array.from(hintBox.querySelectorAll('[data-quiz-hint-item]'));
          if (hintIndex >= hints.length) return;
          const hintAnnouncer = node.querySelector('[data-quiz-hint-announcer]');
          hintBox.hidden = false;
          hints[hintIndex].hidden = false;
          hintIndex += 1;
          hintButton.setAttribute('aria-expanded', 'true');
          hintButton.textContent = hintIndex >= hints.length ? 'Semua petunjuk terbuka' : 'Petunjuk ' + (hintIndex + 1) + ' dari ' + hints.length;
          if (hintAnnouncer) hintAnnouncer.textContent = 'Petunjuk ' + hintIndex + ': ' + hints[hintIndex - 1].textContent.replace(/^\s*\d+\.\s*/, '');
          if (hintIndex >= hints.length) hintButton.setAttribute('aria-disabled', 'true');
        });
      }

      checkButton.addEventListener('click', function () {
        if (node.classList.contains('is-checked')) return;
        const result = getQuestionCorrect(question, node);
        if (result.error) {
          showToast(result.error);
          return;
        }
        node.classList.add('is-checked');
        node.classList.toggle('is-correct', result.correct);
        node.classList.toggle('is-wrong', !result.correct);
        node.querySelectorAll('.quiz-option, [data-move], [data-quiz-input], [data-quiz-hint-button], [data-quiz-check]').forEach(function (element) {
          if (element.tagName === 'INPUT') element.disabled = true;
          else element.disabled = true;
        });
        if (question.type === 'choice') {
          node.querySelectorAll('.quiz-option').forEach(function (option, optionIndex) {
            if (optionIndex === question.answer) option.classList.add('is-correct');
            if (option.classList.contains('is-selected') && optionIndex !== question.answer) option.classList.add('is-wrong');
          });
        }
        if (question.type === 'input') {
          const input = node.querySelector('[data-quiz-input]');
          if (input) input.classList.toggle('input-correct', result.correct);
          if (input) input.classList.toggle('input-wrong', !result.correct);
        }
        if (question.type === 'sequence') {
          const list = node.querySelector('[data-sequence-list]');
          Array.from(list.children).forEach(function (item, itemIndex) {
            item.classList.toggle('sequence-correct', item.dataset.sequenceId === question.correctOrder[itemIndex]);
            item.classList.toggle('sequence-wrong', item.dataset.sequenceId !== question.correctOrder[itemIndex]);
          });
        }
        if (feedback) {
          feedback.hidden = false;
          feedback.classList.toggle('feedback-correct', result.correct);
          feedback.classList.toggle('feedback-wrong', !result.correct);
          feedback.innerHTML = '<div class="feedback-heading"><strong>' + (result.correct ? 'Tepat.' : 'Belum tepat.') + '</strong>' + (!result.correct ? '<span>Jawaban benar: ' + formatCorrectAnswer(question) + '</span>' : '') + '</div><p>' + question.explanation + '</p>';
          feedback.setAttribute('tabindex', '-1');
          feedback.focus({ preventScroll: true });
        }
        checked.add(index);
        if (result.correct) correctCount += 1;
        questionStates[index] = result.correct;
        if (quizStatus) quizStatus.textContent = 'Jawaban diperiksa. Baca pembahasannya sebelum melanjutkan.';
        updateProgressLabel();
        if (checked.size === total) {
          if (quizRoot) quizRoot.classList.remove('is-finished');
          showResult();
        }
      });
      void questionStates;
    }

    function mount() {
      checked = new Set();
      correctCount = 0;
      questionStates = new Array(total).fill(null);
      quizRoot.classList.remove('is-finished');
      quizRoot.innerHTML = renderQuizQuestions(chapter);
      if (resultBox) { resultBox.hidden = true; resultBox.innerHTML = ''; resultBox.className = 'quiz-result'; }
      if (quizStatus) quizStatus.textContent = 'Jawab satu per satu. Pembahasan muncul setelah kamu memeriksa jawaban.';
      updateProgressLabel();
      Array.from(quizRoot.querySelectorAll('[data-quiz-question]')).forEach(function (node, index) {
        bindQuestion(node, chapter.quiz[index], index);
      });
    }

    if (resetButton && resetButton.dataset.bound !== 'true') {
      resetButton.dataset.bound = 'true';
      resetButton.addEventListener('click', function () {
        mount();
        if (quizStatus) quizStatus.textContent = 'Kuis diulang. Skor terbaik tetap tersimpan.';
        showToast('Kuis diulang dari awal.');
      });
    }
    mount();
  }

  function initChapterPage(chapter) {
    initialProgressUI(chapter);
    initMiniChecks();
    initQuiz(chapter);
    updateChapterProgressUI(chapter);
    const quiz = document.getElementById('kuis');
    if (quiz) {
      // No automatic scroll. The quiz is intentionally at the end of the chapter.
    }
  }

  function renderRoute(initial) {
    if (window.RUNUT_LABS && typeof window.RUNUT_LABS.cleanup === 'function') window.RUNUT_LABS.cleanup();
    const route = parseRoute();
    currentChapter = route.type === 'chapter' ? route.chapter : null;

    if (route.invalid) {
      if (window.location.hash) window.history.replaceState(null, '', '#/');
    }

    if (route.type === 'chapter') {
      state.lastChapter = route.chapter.id;
      saveState();
      main.innerHTML = renderChapter(route.chapter);
      document.title = 'Bab ' + route.chapter.number + ' · ' + route.chapter.shortTitle + ' — Runut';
    } else {
      main.innerHTML = renderHome();
      document.title = 'Runut — Lab Algoritma & Pemrograman';
    }

    updateHeader(route);
    if (route.type === 'home') {
      initHeroDemo();
    } else if (route.type === 'chapter') {
      initChapterPage(route.chapter);
    }
    if (window.RUNUT_LABS && typeof window.RUNUT_LABS.init === 'function') {
      window.RUNUT_LABS.init(route);
    }

    if (!initial) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    if (!initial) {
      const heading = main.querySelector('h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      } else {
        main.focus({ preventScroll: true });
      }
    }
  }

  function markSection(chapterId, sectionId) {
    const chapter = DATA.find(function (item) { return item.id === chapterId; });
    if (!chapter) return;
    const saved = ensureChapterState(chapter);
    const wasDone = saved.sections.indexOf(sectionId) !== -1;
    if (wasDone) saved.sections = saved.sections.filter(function (id) { return id !== sectionId; });
    else saved.sections.push(sectionId);
    saveState();
    updateChapterProgressUI(chapter);
    const section = chapter.sections.find(function (item) { return item.id === sectionId; });
    showToast(wasDone ? 'Tanda selesai dibatalkan.' : (section ? '“' + section.navTitle + '” ditandai selesai.' : 'Bagian ditandai selesai.'));
  }

  function resetProgress() {
    if (!window.confirm('Reset semua progres belajar, termasuk skor kuis? Tindakan ini tidak dapat dibatalkan.')) return;
    state = defaultState();
    DATA.forEach(function (chapter) { ensureChapterState(chapter); });
    saveState();
    renderRoute(false);
    showToast('Progres belajar sudah direset.');
  }

  function copyCode(button) {
    const card = button.closest('.code-card');
    const code = card ? card.querySelector('code') : null;
    if (!code) return;
    const text = code.innerText;
    const original = button.textContent;
    function done() {
      button.textContent = 'Tersalin';
      window.setTimeout(function () { button.textContent = original; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        button.textContent = 'Gagal menyalin';
        window.setTimeout(function () { button.textContent = original; }, 1800);
      });
    } else {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); done(); } catch (error) { showToast('Kode tidak dapat disalin otomatis.'); }
      document.body.removeChild(area);
    }
  }

  function handleGlobalClick(event) {
    const copyButton = event.target.closest('[data-copy-code]');
    if (copyButton) { copyCode(copyButton); return; }

    const resetButton = event.target.closest('[data-reset-progress]');
    if (resetButton) { resetProgress(); return; }

    const markButton = event.target.closest('[data-mark-section]');
    if (markButton) {
      markSection(markButton.dataset.chapterId, markButton.dataset.sectionId);
      return;
    }

    const jumpButton = event.target.closest('[data-jump-section]');
    if (jumpButton) {
      jumpToSection(jumpButton.dataset.jumpSection);
      return;
    }

    const jumpQuiz = event.target.closest('[data-jump-quiz]');
    if (jumpQuiz) {
      jumpToQuiz();
      return;
    }

    const continueButton = event.target.closest('[data-continue-chapter]');
    if (continueButton) {
      const type = continueButton.dataset.targetType;
      const target = continueButton.dataset.targetId;
      if (type === 'quiz') jumpToQuiz();
      else jumpToSection(target);
      return;
    }

    const heroNext = event.target.closest('[data-hero-next]');
    if (heroNext) {
      // The hero demo owns its own listener; this branch is intentionally empty.
      return;
    }
  }

  function handleTabKeys(event) {
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    const tablist = tab.closest('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]:not([disabled])'));
    const index = tabs.indexOf(tab);
    const vertical = tablist.getAttribute('aria-orientation') === 'vertical';
    let targetIndex = null;
    if (!vertical && event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
    else if (!vertical && event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
    else if (vertical && event.key === 'ArrowDown') targetIndex = (index + 1) % tabs.length;
    else if (vertical && event.key === 'ArrowUp') targetIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') targetIndex = 0;
    else if (event.key === 'End') targetIndex = tabs.length - 1;
    if (targetIndex === null) return;
    event.preventDefault();
    const target = tabs[targetIndex];
    if (target) { target.focus(); target.click(); }
  }

  function boot() {
    if (!DATA.length) {
      main.innerHTML = '<div class="wrap"><p class="empty-state">Materi tidak dapat dimuat. Periksa kembali berkas JavaScript situs.</p></div>';
      return;
    }
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleTabKeys);
    window.addEventListener('hashchange', function () {
      const hash = window.location.hash;
      // In-page anchors such as #main or #modul must not trigger a route render.
      if (hash && hash.charAt(0) === '#' && hash.charAt(1) !== '/') return;
      renderRoute(false);
    });
    if (!window.location.hash) window.history.replaceState(null, '', '#/');
    if (!parseRoute().invalid) {
      // Ensure every chapter has a clean progress record before the first render.
      DATA.forEach(function (chapter) { ensureChapterState(chapter); });
      saveState();
    }
    renderRoute(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
