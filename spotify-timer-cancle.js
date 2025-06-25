// Spotify Timer Cancel Bookmarklet
// Cancels any active timer

javascript:(()=>{if(window.spotifyTimers?.length){window.spotifyTimers.forEach(clearTimeout);window.spotifyTimers=[];console.log("🛑 All Spotify sleep timers canceled.")}else{console.log("⚠️ No Spotify sleep timers found.")}})();
