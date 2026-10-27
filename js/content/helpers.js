(function () {
  'use strict';

  window.RUNUT = window.RUNUT || {};
  window.RUNUT.chapters = [];

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function codeBlock(title, language, source, footnote) {
    return '<div class="code-card">' +
      '<div class="code-head"><span class="code-title">' + escapeHTML(title) + '</span><span class="code-language">' + escapeHTML(language) + '</span><button type="button" class="copy-button" data-copy-code>Salin</button></div>' +
      '<pre><code>' + escapeHTML(source.trim()) + '</code></pre>' +
      (footnote ? '<p class="code-footnote">' + footnote + '</p>' : '') +
    '</div>';
  }

  function note(label, content, variant) {
    return '<aside class="note ' + (variant ? 'note-' + variant : '') + '">' +
      '<span class="note-label">' + label + '</span>' +
      '<div class="note-content">' + content + '</div>' +
    '</aside>';
  }

  function practice(title, body, solution) {
    return '<aside class="practice">' +
      '<div class="practice-top"><span class="block-label">Praktik mandiri</span><span class="practice-time">± 2 menit</span></div>' +
      '<h3>' + title + '</h3>' +
      '<div class="practice-body">' + body + '</div>' +
      (solution ? '<details class="solution"><summary>Buka petunjuk / contoh jawaban</summary><div class="solution-body">' + solution + '</div></details>' : '') +
    '</aside>';
  }

  function rule(label, content) {
    return '<div class="rule"><span class="rule-index">' + label + '</span><p>' + content + '</p></div>';
  }

  window.RUNUT.helpers = { escapeHTML, codeBlock, note, practice, rule };
})();
