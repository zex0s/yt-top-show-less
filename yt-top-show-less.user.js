// ==UserScript==
// @name         YouTube: Show less at top of description
// @namespace    https://github.com/zex0s/yt-top-show-less
// @version      1.0
// @description  Adds a copy of the description's "Show less" button right after the view count and date.
// @match        https://www.youtube.com/*
// @downloadURL  https://raw.githubusercontent.com/zex0s/yt-top-show-less/main/yt-top-show-less.user.js
// @updateURL    https://raw.githubusercontent.com/zex0s/yt-top-show-less/main/yt-top-show-less.user.js
// @grant        none
// ==/UserScript==

(() => {
  const style = document.createElement('style');
  style.textContent = `
    #top-show-less { display: none; margin: 4px 0; padding: 0; border: 0; background: none;
      color: var(--yt-spec-text-primary); font: 500 1.4rem Roboto, Arial, sans-serif; cursor: pointer; }
    ytd-watch-metadata:has(ytd-text-inline-expander[is-expanded]) #top-show-less { display: block; }
  `;
  document.head.append(style);

  // ponytail: polls every 500ms; swap for a MutationObserver if it ever matters
  setInterval(() => {
    const info = document.querySelector('ytd-watch-metadata #info-container');
    if (!info || document.getElementById('top-show-less')) return;
    const btn = document.createElement('button');
    btn.id = 'top-show-less';
    btn.textContent = 'Show less';
    btn.addEventListener('click', e => {
      e.stopPropagation(); // the description box expands on any click
      document.querySelector('ytd-watch-metadata ytd-text-inline-expander #collapse')?.click();
    });
    info.after(btn);
  }, 500);
})();
