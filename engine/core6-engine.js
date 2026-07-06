const state = {likes:856324,gifts:282,viewers:5747,followers:201,combo:31,energy:100,boss:false};
const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString("pt-PT");
function update(){ $("likes").textContent=fmt(state.likes); $("gifts").textContent=fmt(state.gifts); $("viewers").textContent=fmt(state.viewers); $("followers").textContent=fmt(state.followers); $("combo").textContent="x"+state.combo; $("energyOrb").textContent=state.energy+"%"; $("energyPoints").textContent=Math.round(state.energy*160)+" / 16 000"; }
function toast(text){ const t=$("toast"); t.textContent=text; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),1300); }
function ai(text){ $("aiText").textContent=text; $("aiMini").textContent=" "+text; }
function addChat(text){ $("chat").innerHTML="<p>"+text+"</p>"+$("chat").innerHTML; }
function like(){ state.likes+=Math.floor(Math.random()*700)+120; state.energy=Math.min(100,state.energy+1); toast("+ LIKES"); update(); }
function gift(name="Diamond Storm"){ state.gifts++; state.combo++; state.energy=Math.min(100,state.energy+8); $("rareGift").textContent=name.toUpperCase(); addChat("🎁 @Guerreiro enviou "+name+"!"); ai(name+" recebido. A Arena ganhou energia."); toast("🎁 "+name); update(); }
function boss(){ state.boss=true; document.body.classList.add("boss-mode"); $("activeEvent").textContent="BOSS DA ARENA"; $("mission").textContent="DERROTAR O BOSS"; $("bossAlert").classList.add("show"); ai("O Boss despertou. Toda a Arena em alerta."); toast("⚠ BOSS DA ARENA ⚠"); setTimeout(()=>$("bossAlert").classList.remove("show"),2600); setTimeout(()=>{state.boss=false; state.energy=0; document.body.classList.remove("boss-mode"); $("mission").textContent="DESBLOQUEAR O BOSS"; $("activeEvent").textContent="TEMPESTADE DE ENERGIA"; ai("Boss terminado. A Arena reiniciou energia."); update();},7600); }
document.querySelectorAll("[data-gift]").forEach(btn=>btn.addEventListener("click",()=>gift(btn.dataset.gift)));
window.LiveArenaCore6={like,gift,boss};
setInterval(()=>{state.viewers+=Math.floor(Math.random()*9)-3;if(state.viewers<0)state.viewers=0;update();},1800);
setInterval(()=>{const roll=Math.random(); if(roll<.55)like(); else if(roll<.78)addChat("💬 @ArenaFan: Vamos desbloquear o Boss!"); else gift("Diamond Storm");},4300);
setTimeout(()=>toast("LIVE ARENA™ CORE 6.0 ONLINE"),600);
update();
