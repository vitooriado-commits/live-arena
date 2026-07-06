const $ = id => document.getElementById(id);

const state = {
  globalPlayers: 12480,
  worldEnergy: 42,
  globalBossHp: 100,
  dragons: 52,
  phoenix: 48,
  realmIndex: 0,
  bossActive: false
};

const realms = [
  ["ROYAL ARENA", ""],
  ["COSMIC REALM", "realm-cosmic"],
  ["FIRE DIMENSION", "realm-fire"],
  ["STORM REALM", ""],
  ["SHADOW TEMPLE", ""]
];

function fmt(n){ return n.toLocaleString("pt-PT"); }

function toast(text){
  const t = $("toast");
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1200);
}

function feed(text){
  $("feed").innerHTML = "<p>" + text + "</p>" + $("feed").innerHTML;
}

function shake(){
  $("arena").classList.add("shake");
  setTimeout(() => $("arena").classList.remove("shake"), 360);
}

function setNode(id){
  ["nodeEnergy","nodeBoss","nodeWar","nodeVictory"].forEach(n => $(n).classList.remove("active"));
  if(id) $(id).classList.add("active");
}

function update(){
  $("globalPlayers").textContent = fmt(state.globalPlayers);
  $("worldEnergy").textContent = state.worldEnergy + "%";
  $("globalBossHp").textContent = state.globalBossHp + "%";
  $("dragons").textContent = state.dragons + "%";
  $("phoenix").textContent = state.phoenix + "%";
  $("bossBar").style.width = state.globalBossHp + "%";
  $("bossPhase").textContent = state.bossActive ? "AWAKENED" : "SLEEPING";
  $("bossPanel").classList.toggle("active", state.bossActive);
  document.body.classList.toggle("boss-mode", state.bossActive);
}

function aiDirector(message){
  $("aiText").textContent = message;
  feed("🤖 " + message);
}

function event(type){
  if(type === "like"){
    state.worldEnergy = Math.min(100, state.worldEnergy + 3);
    state.globalPlayers += Math.floor(Math.random()*30)+5;
    setNode("nodeEnergy");
    toast("+ WORLD ENERGY");
    feed("❤️ Likes globais aumentaram a energia.");
    if(state.worldEnergy >= 100) aiDirector("Energia mundial máxima. O Boss Global pode despertar.");
  }

  if(type === "gift"){
    state.worldEnergy = Math.min(100, state.worldEnergy + 10);
    state.globalBossHp = Math.max(0, state.globalBossHp - 4);
    toast("🎁 GIFT GLOBAL");
    feed("🎁 Presente global causou dano ao Boss.");
  }

  if(type === "globalBoss"){
    state.bossActive = true;
    state.globalBossHp = 100;
    setNode("nodeBoss");
    toast("👹 GLOBAL BOSS AWAKENED");
    aiDirector("Titan Omega despertou. Todas as Arenas foram convocadas.");
    shake();
  }

  if(type === "guildWar"){
    state.dragons = Math.min(100, state.dragons + Math.floor(Math.random()*8));
    state.phoenix = 100 - state.dragons;
    setNode("nodeWar");
    toast("⚔ GUILD WAR");
    aiDirector("Dragons e Phoenix entraram em guerra de energia.");
  }

  if(type === "realm"){
    state.realmIndex = (state.realmIndex + 1) % realms.length;
    const [name, cls] = realms[state.realmIndex];
    $("realmName").textContent = name;
    document.body.classList.remove("realm-cosmic","realm-fire");
    if(cls) document.body.classList.add(cls);
    toast("🌌 " + name);
    aiDirector("A Arena mudou de dimensão: " + name + ".");
  }

  if(type === "ai"){
    const lines = [
      "O universo está instável. Um evento raro aproxima-se.",
      "Os jogadores estão a gerar energia suficiente para alterar a Arena.",
      "A transmissão entrou em modo cinematográfico.",
      "A máscara observa o equilíbrio entre as Guildas.",
      "O Hall of Legends registou um novo momento histórico."
    ];
    aiDirector(lines[Math.floor(Math.random()*lines.length)]);
    toast("🤖 AI DIRECTOR");
  }

  if(state.globalBossHp <= 0){
    state.bossActive = false;
    state.worldEnergy = 0;
    setNode("nodeVictory");
    toast("🏆 GLOBAL VICTORY");
    aiDirector("Titan Omega foi derrotado. A Arena Global venceu.");
  }

  update();
}

window.Arena = { event, state };

setInterval(() => {
  state.globalPlayers += Math.floor(Math.random()*21)-8;
  if(state.globalPlayers < 0) state.globalPlayers = 0;

  if(Math.random() > .65){
    event("like");
  } else {
    update();
  }
}, 3200);

setTimeout(() => toast("CORE 10.0 LIVING UNIVERSE ONLINE"), 700);
update();
