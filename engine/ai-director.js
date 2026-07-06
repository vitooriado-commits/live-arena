export class Director {
  speak(state, battle){
    if(battle.active && battle.phase === "last-life") return "O Boss está quase derrotado. Ataquem agora.";
    if(battle.active && battle.phase === "fury") return "O Boss entrou em fúria. A Arena treme.";
    if(battle.active) return "Batalha ativa. O público controla o combate.";
    if(state.energy >= 100) return "Energia máxima. O Boss pode despertar.";
    if(state.combo >= 10) return "Combo forte. A comunidade está a aquecer.";
    if(state.gifts > 0) return "Presentes recebidos. A Arena ganhou poder.";
    return "A Arena está estável.";
  }
}
