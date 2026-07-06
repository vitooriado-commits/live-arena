export function arenaAI(state){
  if(state.boss) return "Boss ativo. Toda a Arena deve atacar.";
  if(state.energy >= 100) return "Energia máxima. Boss pronto para despertar.";
  if(state.combo >= 30) return "Combo lendário. O público está imparável.";
  if(state.gifts > 285) return "Presentes a subir. A Arena ganhou poder.";
  return "A Arena está estável. Mantém o ritmo.";
}
