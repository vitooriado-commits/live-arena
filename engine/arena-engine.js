import { handleGift } from "./gift-engine.js";
import { handleBoss } from "./boss-engine.js";
import { arenaAI } from "./ai-engine.js";
import { triggerEvent } from "./event-engine.js";

const state = {
  likes: 856324,
  gifts: 282,
  viewers: 5744,
  followers: 201,
  combo: 31,
  energy: 100,
  boss: false
};

const $ = id => document.getElementById(id);

function fmt(n){ return n.toLocaleString("pt-PT"); }

export function toast(text){
  const t = $("toast");
  t.textContent = text;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1300);
}

export function updateHUD(){
  $("likes").textContent = fmt(state.likes);
  $("gifts").textContent = fmt(state.gifts);
  $("viewers").textContent = fmt(state.viewers);
  $("followers").textContent = fmt(state.followers);
  $("combo").textContent = "x" + state.combo;
  $("energyCircle").textContent = state.energy + "%";
  $("energyPoints").textContent = Math.round(state.energy * 160) + " / 16 000";
  $("aiMini").textContent = arenaAI(state);
}

export function addEnergy(value){
  state.energy = Math.min(100, state.energy + value);
  if(state.energy >= 100 && !state.boss){
    $("mission").textContent = "BOSS DISPONÍVEL";
  }
}

export function handleArenaEvent(event){
  if(event.type === "like"){
    state.likes += event.amount || 250;
    addEnergy(1);
    toast("+ LIKES");
  }

  if(event.type === "gift"){
    handleGift(event, state, addEnergy, toast);
  }

  if(event.type === "follow"){
    state.followers += 1;
    addEnergy(4);
    toast("👥 NOVO MEMBRO");
  }

  if(event.type === "comment"){
    const chat = $("chat");
    chat.innerHTML = `<div class="chatLine">💬 ${event.user || "@Arena"}: ${event.text || "Vamos!"}</div>` + chat.innerHTML;
    toast("💬 CHAT");
  }

  if(event.type === "boss"){
    handleBoss(state, toast);
  }

  if(event.type === "event"){
    triggerEvent(state, toast);
  }

  updateHUD();
}

window.LiveArena = { handleArenaEvent, state };

setInterval(() => {
  state.viewers += Math.floor(Math.random() * 9) - 3;
  if(state.viewers < 0) state.viewers = 0;
  updateHUD();
}, 1800);

setInterval(() => {
  const random = ["like","comment","gift"][Math.floor(Math.random()*3)];
  if(random === "like") handleArenaEvent({type:"like", amount:Math.floor(Math.random()*500)+50});
  if(random === "comment") handleArenaEvent({type:"comment", user:"@ArenaFan", text:"Isto está épico!"});
  if(random === "gift" && Math.random() > .65) handleArenaEvent({type:"gift", gift:"Diamond Storm", user:"@Guerreiro", value:3});
}, 4200);

updateHUD();
setTimeout(() => toast("LIVE ARENA™ CORE 5.0 ONLINE"), 600);
