window.addEventListener("storage", e => {
  if(e.key === "liveArenaManualEvent" && window.LiveArena){
    window.LiveArena.handleArenaEvent(JSON.parse(e.newValue));
  }
});