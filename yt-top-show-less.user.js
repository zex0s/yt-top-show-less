// ==UserScript==
// @name         YouTube: Show less at top of description
// @namespace    https://github.com/zex0s/yt-top-show-less
// @version      1.2
// @description  Adds a copy of the description's "Show less" button right after the view count and date.
// @match        https://www.youtube.com/*
// @downloadURL  https://raw.githubusercontent.com/zex0s/yt-top-show-less/main/yt-top-show-less.user.js
// @updateURL    https://raw.githubusercontent.com/zex0s/yt-top-show-less/main/yt-top-show-less.user.js
// @grant        none
// ==/UserScript==

(() => {
  const style = document.createElement('style');
  style.textContent = `
    #top-show-less { display: none; margin: 0; }
    ytd-watch-metadata:has(ytd-text-inline-expander[is-expanded]) #top-show-less { display: block; }
  `;
  document.head.append(style);

  // ponytail: polls every 500ms; swap for a MutationObserver if it ever matters
  setInterval(() => {
    // the views/date line itself is a fixed 20px row, so insert below it, not inside
    const info = document.querySelector('ytd-watch-metadata ytd-watch-info-text');
    const collapse = document.querySelector('ytd-watch-metadata ytd-text-inline-expander #collapse');
    if (!info || !collapse || document.getElementById('top-show-less')) return;
    // clone the real button so it keeps YouTube's styling classes
    const btn = collapse.cloneNode(true);
    btn.id = 'top-show-less';
    btn.addEventListener('click', e => {
      e.stopPropagation(); // the description box expands on any click
      document.querySelector('ytd-watch-metadata ytd-text-inline-expander #collapse')?.click();
    });
    info.after(btn);
  }, 500);
})();
