export function handleBoss(state, toast){
  state.boss = true;
  document.body.classList.add("boss-mode");
  document.getElementById("activeEvent").textContent = "BOSS DA ARENA";
  document.getElementById("mission").textContent = "DERROTAR O BOSS";
  toast("⚠ BOSS DA ARENA ⚠");

  setTimeout(() => {
    state.boss = false;
    state.energy = 0;
    document.body.classList.remove("boss-mode");
    document.getElementById("mission").textContent = "DESBLOQUEAR O BOSS";
    document.getElementById("activeEvent").textContent = "TEMPESTADE DE ENERGIA";
    toast("🏆 BOSS TERMINADO");
  }, 7000);
}
