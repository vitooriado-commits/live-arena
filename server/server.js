const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "world-state.json");
function loadState(){try{return JSON.parse(fs.readFileSync(DATA_FILE,"utf8"));}catch{return {globalPlayers:12480,worldEnergy:42,globalBossHp:100,bossActive:false,guilds:{dragons:52,phoenix:48},realm:"ROYAL ARENA",feed:["🟢 LIVE ARENA™ online."]};}}
let state=loadState();
function saveState(){fs.writeFileSync(DATA_FILE,JSON.stringify(state,null,2),"utf8");}
function applyEvent(event){
 if(event.type==="like"){state.worldEnergy=Math.min(100,state.worldEnergy+3);state.globalPlayers+=Math.floor(Math.random()*30)+5;state.feed.unshift("❤️ Likes globais aumentaram a energia.");}
 if(event.type==="gift"){state.worldEnergy=Math.min(100,state.worldEnergy+10);state.globalBossHp=Math.max(0,state.globalBossHp-4);state.feed.unshift("🎁 Presente global causou dano ao Boss.");}
 if(event.type==="globalBoss"){state.bossActive=true;state.globalBossHp=100;state.feed.unshift("👹 Titan Omega despertou.");}
 if(event.type==="guildWar"){state.guilds.dragons=Math.min(100,state.guilds.dragons+Math.floor(Math.random()*8));state.guilds.phoenix=100-state.guilds.dragons;state.feed.unshift("⚔ Dragons e Phoenix entraram em guerra.");}
 if(event.type==="realm"){const realms=["ROYAL ARENA","COSMIC REALM","FIRE DIMENSION","STORM REALM","SHADOW TEMPLE"];const i=realms.indexOf(state.realm);state.realm=realms[(i+1)%realms.length];state.feed.unshift("🌌 Nova dimensão: "+state.realm);}
 if(event.type==="ai"){const lines=["🤖 O universo está instável. Um evento raro aproxima-se.","🤖 A transmissão entrou em modo cinematográfico.","🤖 A máscara observa o equilíbrio entre as Guildas.","🤖 O Hall of Legends registou um novo momento histórico."];state.feed.unshift(lines[Math.floor(Math.random()*lines.length)]);}
 if(state.globalBossHp<=0){state.bossActive=false;state.worldEnergy=0;state.feed.unshift("🏆 Titan Omega foi derrotado. Vitória global.");}
 state.feed=state.feed.slice(0,12);saveState();}
const server=http.createServer((req,res)=>{let filePath=req.url==="/"?"/client/index.html":req.url;if(filePath==="/state"){res.writeHead(200,{"Content-Type":"application/json"});res.end(JSON.stringify(state));return;}filePath=path.join(__dirname,"..",filePath);fs.readFile(filePath,(err,data)=>{if(err){res.writeHead(404);res.end("LIVE ARENA™ file not found");return;}const ext=path.extname(filePath);const type={".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".png":"image/png"}[ext]||"text/plain";res.writeHead(200,{"Content-Type":type});res.end(data);});});
const wss=new WebSocket.Server({server});
function broadcast(payload){const msg=JSON.stringify(payload);for(const c of wss.clients){if(c.readyState===WebSocket.OPEN)c.send(msg);}}
wss.on("connection",ws=>{ws.send(JSON.stringify({type:"state",state}));ws.on("message",raw=>{try{const event=JSON.parse(raw.toString());applyEvent(event);broadcast({type:"state",state});}catch(err){ws.send(JSON.stringify({type:"error",message:err.message}));}});});
server.listen(PORT,()=>console.log("LIVE ARENA™ Core 10.2 running at http://localhost:"+PORT));
