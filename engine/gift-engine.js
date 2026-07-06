export function handleGift(event, state, addEnergy, toast){
  state.gifts += 1;
  state.combo += 1;
  addEnergy(event.value || 8);
  document.getElementById("rareGift").textContent = event.gift || "DIAMOND STORM";
  document.getElementById("hero").classList.add("flash");
  setTimeout(() => document.getElementById("hero").classList.remove("flash"), 700);
  toast("🎁 " + (event.gift || "PRESENTE LENDÁRIO"));
}
