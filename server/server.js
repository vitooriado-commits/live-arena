const http=require("http"),fs=require("fs"),path=require("path"),WebSocket=require("ws");
const PORT=process.env.PORT||3000, DATA=path.join(__dirname,"data","world-state.json");
let state=JSON.parse(fs.readFileSync(DATA,"utf8"));
function save(){fs.writeFileSync(DATA,JSON.stringify(state,null,2),"utf8")}
function profile(name){if(!state.profiles[name])state.profiles[name]={name,guild:Math.random()>.5?"Dragons":"Phoenix",xp:0,bosses:0,gifts:0,rank:"Recruit"};return state.profiles[name]}
function rank(p){p.rank=p.xp>=12000?"Legend":p.xp>=8000?"Elite":p.xp>=4000?"Warrior":"Recruit"}
function ranking(){return Object.values(state.profiles).sort((a,b)=>b.xp-a.xp).slice(0,10)}
function feed(t){state.feed.unshift(t);state.feed=state.feed.slice(0,12)}
function apply(e){
 const user=e.user||"Guerreiro",p=profile(user);
 if(e.type==="like"){state.worldEnergy=Math.min(100,state.worldEnergy+3);state.globalPlayers+=Math.floor(Math.random()*30)+5;p.xp+=25;feed(`❤️ @${user} aumentou a energia mundial.`)}
 if(e.type==="gift"){state.worldEnergy=Math.min(100,state.worldEnergy+10);state.globalBossHp=Math.max(0,state.globalBossHp-4);p.xp+=250;p.gifts++;feed(`🎁 @${user} enviou um gift global.`)}
 if(e.type==="globalBoss"){state.bossActive=true;state.globalBossHp=100;feed("👹 Titan Omega despertou.")}
 if(e.type==="attackBoss"){state.globalBossHp=Math.max(0,state.globalBossHp-(e.damage||12));p.xp+=100;feed(`⚔ @${user} atacou o Boss.`)}
 if(e.type==="guildWar"){if(p.guild==="Dragons")state.guilds.dragons=Math.min(100,state.guilds.dragons+3);else state.guilds.dragons=Math.max(0,state.guilds.dragons-3);state.guilds.phoenix=100-state.guilds.dragons;p.xp+=80;feed(`⚔ @${user} ajudou ${p.guild}.`)}
 if(e.type==="realm"){let r=["ROYAL ARENA","COSMIC REALM","FIRE DIMENSION","STORM REALM","SHADOW TEMPLE"],i=r.indexOf(state.realm);state.realm=r[(i+1)%r.length];feed("🌌 Nova dimensão: "+state.realm)}
 if(state.globalBossHp<=0&&state.bossActive){state.bossActive=false;state.worldEnergy=0;p.bosses++;p.xp+=1000;feed(`🏆 Titan Omega derrotado. MVP: @${user}`)}
 rank(p);state.history.unshift({...e,at:new Date().toISOString()});state.history=state.history.slice(0,50);save();
}
const server=http.createServer((req,res)=>{
 if(req.url==="/api/state"){res.writeHead(200,{"Content-Type":"application/json"});res.end(JSON.stringify({...state,ranking:ranking()}));return}
 if(req.url==="/admin")req.url="/admin/index.html";
 let fp=req.url==="/" ? "/client/index.html" : req.url; fp=path.join(__dirname,"..",fp);
 fs.readFile(fp,(err,data)=>{if(err){res.writeHead(404);res.end("LIVE ARENA file not found");return}
 let ext=path.extname(fp),type={".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".png":"image/png"}[ext]||"text/plain";
 res.writeHead(200,{"Content-Type":type});res.end(data);});
});
const wss=new WebSocket.Server({server});
function broadcast(){let msg=JSON.stringify({type:"state",state:{...state,ranking:ranking()}});for(const c of wss.clients)if(c.readyState===WebSocket.OPEN)c.send(msg)}
wss.on("connection",ws=>{ws.send(JSON.stringify({type:"state",state:{...state,ranking:ranking()}}));ws.on("message",raw=>{try{apply(JSON.parse(raw.toString()));broadcast()}catch(e){ws.send(JSON.stringify({type:"error",message:e.message}))}})});
server.listen(PORT,()=>console.log("LIVE ARENA Core 10.3: http://localhost:"+PORT));
