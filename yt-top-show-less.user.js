// ==UserScript==
// @name         YouTube: Show less at top of description
// @namespace    https://github.com/zex0s/yt-top-show-less
// @version      1.6
// @description  Adds a copy of the description's "Show less" button right after the view count and date.
// @match        https://www.youtube.com/*
// @downloadURL  https://raw.githubusercontent.com/zex0s/yt-top-show-less/main/yt-top-show-less.user.js
// @updateURL    https://raw.githubusercontent.com/zex0s/yt-top-show-less/main/yt-top-show-less.user.js
// @grant        none
// ==/UserScript==

(() => {
  const style = document.createElement('style');
  style.textContent = `
    /* nowrap: the clone carries newline text nodes that white-space:pre turns into extra lines */
    #top-show-less { display: none; margin: 0 0 0 auto; flex-shrink: 0; align-self: flex-start; white-space: nowrap; }
    ytd-watch-metadata:has(ytd-text-inline-expander[is-expanded]) #top-show-less { display: inline-flex; }
  `;
  document.documentElement.append(style); // <head> may not exist yet if injected at document-start (wBlock)

  // ponytail: polls every 500ms; swap for a MutationObserver if it ever matters
  setInterval(() => {
    const info = document.querySelector('ytd-watch-metadata #info-container');
    const collapse = document.querySelector('ytd-watch-metadata ytd-text-inline-expander #collapse');
    if (!info || !collapse || document.getElementById('top-show-less')) return;
    // clone the real button so it keeps YouTube's styling classes
    const btn = collapse.cloneNode(true);
    btn.id = 'top-show-less';
    btn.addEventListener('click', e => {
      e.stopPropagation(); // the description box expands on any click
      document.querySelector('ytd-watch-metadata ytd-text-inline-expander #collapse')?.click();
    });
    info.append(btn);
  }, 500);
})();
