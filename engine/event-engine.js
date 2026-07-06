export function triggerEvent(state, toast){
  document.getElementById("activeEvent").textContent = "ARENA FRENZY";
  state.combo += 3;
  toast("🌩 ARENA FRENZY");
}
