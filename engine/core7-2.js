const $=id=>document.getElementById(id);
const state={likes:0,gifts:0,viewers:142,combo:0,energy:0,bossActive:false,bossHp:100,bossPhase:"sleeping"};
const events=[["⚡","Tempestade de Energia",12],["💎","Diamond Rain",18],["👑","Golden Hour",15],["🔥","Arena Frenzy",20],["🌑","Eclipse",10]];
function fmt(n){return n.toLocaleString("pt-PT")}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1200)}
function log(t){$("log").innerHTML=t+"<br>"+$("log").innerHTML}
function ai(){if(state.bossActive&&state.bossHp<=20)return"O Boss está quase derrotado. Ataquem agora.";if(state.bossActive&&state.bossHp<=50)return"O Boss entrou em fúria. A Arena treme.";if(state.bossActive)return"Batalha ativa. O público controla o combate.";if(state.energy>=100)return"Energia máxima. O Boss pode despertar.";if(state.combo>=10)return"Combo forte. A comunidade está a aquecer.";return"A Arena está estável."}
function update(){ $("likes").textContent=fmt(state.likes);$("gifts").textContent=fmt(state.gifts);$("viewers").textContent=fmt(state.viewers);$("combo").textContent="x"+state.combo;$("energy").textContent=state.energy+"%";$("bossPhase").textContent=state.bossPhase.toUpperCase();$("bossHp").textContent=state.bossHp+"%";$("bossHpBar").style.width=state.bossHp+"%";$("boss").classList.toggle("active",state.bossActive);document.body.classList.toggle("boss-mode",state.bossActive);$("ai").textContent=ai()}
function addEnergy(v){state.energy=Math.min(100,state.energy+v);if(state.energy>=100&&!state.bossActive)$("mission").textContent="Boss disponível. Ativa a batalha."}
function flash(){document.body.classList.add("gift-flash");setTimeout(()=>document.body.classList.remove("gift-flash"),550)}
function shake(){document.getElementById("arena").classList.add("shake");setTimeout(()=>document.getElementById("arena").classList.remove("shake"),350)}
function eventArena(type){
 if(type==="like"){state.likes+=Math.floor(Math.random()*600)+100;addEnergy(3);toast("+ LIKES");log("❤️ Likes aumentaram a energia.")}
 if(type==="gift"){state.gifts++;state.combo++;addEnergy(15);toast("🎁 GIFT CINEMATIC");log("🎁 Presente recebido. Combo +"+state.combo);flash()}
 if(type==="comment"){toast("💬 CHAT");log("💬 O chat está ativo.")}
 if(type==="boss"){state.bossActive=true;state.bossHp=100;state.bossPhase="awakening";$("mission").textContent="Derrotar o Boss.";toast("⚠ BOSS DESPERTOU");log("⚠ Boss entrou na Arena.");shake();setTimeout(()=>{if(state.bossActive)state.bossPhase="attack";update()},1800)}
 if(type==="attack"){if(state.bossActive){const d=Math.floor(8+state.combo*.4);state.bossHp=Math.max(0,state.bossHp-d);if(state.bossHp<=50&&state.bossHp>20)state.bossPhase="fury";if(state.bossHp<=20&&state.bossHp>0)state.bossPhase="last-life";if(state.bossHp<=0){state.bossPhase="defeated";state.bossActive=false;$("mission").textContent="Boss derrotado.";state.energy=0;toast("🏆 VITÓRIA")}else toast("⚔ -"+d+" HP");log("⚔ Ataque ao Boss: -"+d+" HP");shake()}}
 if(type==="random"){const e=events[Math.floor(Math.random()*events.length)];$("eventBanner").textContent=e[1].toUpperCase();addEnergy(e[2]);toast(e[0]+" "+e[1]);log(e[0]+" Evento: "+e[1]);flash()}
 update()
}
window.eventArena=eventArena;
setInterval(()=>{state.viewers+=Math.floor(Math.random()*9)-3;if(state.viewers<0)state.viewers=0;update()},1600);
setInterval(()=>{const r=Math.random();if(r<.45)eventArena("like");else if(r<.62)eventArena("comment");else if(r<.75)eventArena("gift")},3800);
update();setTimeout(()=>toast("CORE 7.2 MASK ONLINE"),500);