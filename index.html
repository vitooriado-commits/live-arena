import { BattleEngine } from "./battle-engine.js";
import { Director } from "./ai-director.js";
import { EventEngine } from "./event-engine.js";

const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString("pt-PT");

const state = {
  likes: 0,
  gifts: 0,
  viewers: 142,
  combo: 0,
  energy: 0
};

const battle = new BattleEngine();
const director = new Director();
const events = new EventEngine();

function toast(text){
  const t = $("toast");
  t.textContent = text;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1200);
}

function log(text){
  $("log").innerHTML = text + "<br>" + $("log").innerHTML;
}

function update(){
  $("likes").textContent = fmt(state.likes);
  $("gifts").textContent = fmt(state.gifts);
  $("viewers").textContent = fmt(state.viewers);
  $("combo").textContent = "x" + state.combo;
  $("energy").textContent = state.energy + "%";

  $("bossPhase").textContent = battle.phase.toUpperCase();
  $("bossHp").textContent = battle.hp + "%";
  $("bossHpBar").style.width = battle.hp + "%";

  const bossEl = $("boss");
  bossEl.classList.toggle("active", battle.active);
  document.body.classList.toggle("boss-mode", battle.active);

  const aiText = director.speak(state, battle);
  $("ai").textContent = aiText;
}

function addEnergy(v){
  state.energy = Math.min(100, state.energy + v);
  if(state.energy >= 100 && !battle.active){
    $("mission").textContent = "Boss disponível. Ativa a batalha.";
  }
}

function handle(type){
  if(type === "like"){
    state.likes += Math.floor(Math.random()*600)+100;
    addEnergy(3);
    toast("+ LIKES");
    log("❤️ Likes aumentaram a energia.");
  }

  if(type === "gift"){
    state.gifts++;
    state.combo++;
    addEnergy(15);
    toast("🎁 GIFT CINEMATIC");
    log("🎁 Presente recebido. Combo +" + state.combo);
  }

  if(type === "comment"){
    toast("💬 CHAT");
    log("💬 O chat está ativo.");
  }

  if(type === "boss"){
    battle.spawn();
    $("mission").textContent = "Derrotar o Boss.";
    toast("⚠ BOSS DESPERTOU");
    log("⚠ Boss entrou na Arena.");
  }

  if(type === "attack"){
    const damage = Math.floor(8 + state.combo * 0.4);
    battle.attack(damage);
    toast("⚔ -" + damage + " HP");
    log("⚔ Ataque ao Boss: -" + damage + " HP");
    if(!battle.active && battle.hp <= 0){
      $("mission").textContent = "Boss derrotado.";
      toast("🏆 VITÓRIA");
      state.energy = 0;
    }
  }

  if(type === "random"){
    const e = events.random();
    $("eventBanner").textContent = e.name.toUpperCase();
    addEnergy(e.energy);
    toast(e.icon + " " + e.name);
    log(e.icon + " Evento: " + e.name);
  }

  update();
}

window.LiveArena = { event: handle, state, battle };

setInterval(()=>{
  state.viewers += Math.floor(Math.random()*9)-3;
  if(state.viewers < 0) state.viewers = 0;
  update();
},1600);

setInterval(()=>{
  const r = Math.random();
  if(r < .45) handle("like");
  else if(r < .62) handle("comment");
  else if(r < .75) handle("gift");
},3800);

update();
setTimeout(()=>toast("CORE 7.1 GAME ENGINE ONLINE"),500);
