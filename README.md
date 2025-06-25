## ☕ Like this project?

If this project helped you or saved you time, consider [buying me a coffee](https://coff.ee/johnfiorello)! Your support helps me keep building free tools like this. 🙏


# Spotify_Custom_Timer
I wanted to listen to music at night through the Spotify web player, but didn't want it to play all night so I created this custom sleep timer that fades out the music and pauses the Spotify web player after a specified amount of time. 

All you need to do is create a new bookmark, title it, and paste the code into the url section. This was built for chrome so I don't know if it will work with other browsers, but I'd bet any chrome-based browser would probably work fine.

There's also a separate code to create a bookmark to cancel the timer if you clicked it accidentally or if you change your mind. 


## 🛠️ How to Install

1. Copy the code below.
2. Create a new bookmark in Chrome.
3. Paste the code into the **URL** field of the bookmark.
4. Name the bookmark something like “Spotify Sleep Timer”.
5. Click the bookmark whenever you want to start the timer.

### ⏱️ Start Timer
```javascript
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
```

## Here's the code to cancel the timer. Install the same way

### ❌ Cancel Timer
```javascript
javascript:(()=>{if(window.spotifyTimers?.length){window.spotifyTimers.forEach(clearTimeout);window.spotifyTimers=[];console.log("🛑 All Spotify sleep timers canceled.")}else{console.log("⚠️ No Spotify sleep timers found.")}})();
```



