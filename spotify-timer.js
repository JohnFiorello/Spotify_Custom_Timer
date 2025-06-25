// Spotify Custom Sleep Timer Bookmarklet
// Fades out and pauses music after a set time (for use in Chrome bookmarks)

javascript:(() => {
  const minutes = parseFloat(prompt("How many minutes until Spotify pauses?"));
  if (isNaN(minutes) || minutes <= 0) {
    console.log("❌ Invalid input.");
    return;
  }

  window.spotifyTimers = window.spotifyTimers || [];

  const timerId = setTimeout(() => {
    let volume = 1.0;
    const fader = document.querySelector('[data-testid="volume-bar"] input[type="range"]');
    const setVolume = (val) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(fader, val.toFixed(2));
      fader.dispatchEvent(new Event('input', { bubbles: true }));
      fader.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const fadeInterval = setInterval(() => {
      volume -= 0.05;
      if (volume <= 0) {
        setVolume(0);
        clearInterval(fadeInterval);
        const btn = document.querySelector('[data-testid="control-button-playpause"]');
        if (btn?.getAttribute('aria-label') === 'Pause') {
          btn.click();
          console.log("✅ Volume faded and music paused.");
        } else {
          console.log("⚠️ Music already paused.");
        }
      } else {
        setVolume(volume);
      }
    }, 250);
  }, minutes * 60 * 1000);

  window.spotifyTimers.push(timerId);
  console.log(`⏳ Spotify will pause in ${minutes} minute(s). Timer #${timerId}`);
})();
