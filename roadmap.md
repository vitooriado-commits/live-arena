*{box-sizing:border-box}
:root{--gold:#d8b75a;--gold2:#fff0a6;--red:#d72638;--line:rgba(216,183,90,.28)}
html,body{margin:0;width:100%;height:100%;background:#000;color:#fff;font-family:Inter,system-ui,sans-serif;overflow:hidden}
body{padding:10px;background:radial-gradient(circle at 50% 35%,rgba(216,183,90,.18),transparent 42%),linear-gradient(180deg,#050505,#000)}
.arena{width:100%;height:100%;display:grid;grid-template-rows:70px 1fr 64px;gap:10px;padding:10px;border:1px solid var(--line);border-radius:16px;background:rgba(0,0,0,.80);position:relative;overflow:hidden}
.top{display:grid;grid-template-columns:260px 1fr 260px;align-items:center;border:1px solid var(--line);border-radius:12px;padding:0 18px;background:rgba(8,8,8,.85)}
.top b,.phase b{color:var(--gold2)}.top small{display:block;opacity:.75;font-size:10px}.top h1{text-align:center;margin:0;color:var(--gold2);letter-spacing:6px;font-size:28px;text-shadow:0 0 22px var(--gold)}.top h1 small{letter-spacing:5px;color:#fff}
.phase{text-align:right;font-size:12px}
.grid{min-height:0;display:grid;grid-template-columns:220px 1fr 280px;gap:10px}
.panel{border:1px solid var(--line);border-radius:12px;background:rgba(0,0,0,.72);padding:14px;overflow:hidden}
.stats{display:grid;gap:10px}.stats div{border:1px solid rgba(216,183,90,.18);border-radius:10px;padding:12px;background:rgba(20,20,20,.55)}.stats b{display:block;color:var(--gold2);font-size:24px;margin-top:4px}
.stage{position:relative;border:1px solid var(--line);border-radius:12px;background:radial-gradient(circle at 50% 44%,rgba(216,183,90,.18),transparent 38%),rgba(0,0,0,.55);overflow:hidden}
.stage:before{content:"";position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);width:460px;height:460px;border-radius:50%;border:1px dashed rgba(216,183,90,.25);animation:spin 18s linear infinite}@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
.arena-master{position:absolute;left:50%;top:43%;transform:translate(-50%,-50%);width:230px;height:320px;animation:breath 3.5s infinite ease-in-out}@keyframes breath{50%{transform:translate(-50%,-51%) scale(1.015)}}
.hood{position:absolute;left:50%;top:0;transform:translateX(-50%);width:190px;height:245px;border-radius:48% 48% 34% 34%;background:linear-gradient(145deg,#181818,#030303);border:1px solid rgba(216,183,90,.25);box-shadow:0 0 55px rgba(216,183,90,.25)}
.mask{position:absolute;left:50%;top:58px;transform:translateX(-50%);width:118px;height:148px;border:2px solid var(--gold);border-radius:48% 48% 38% 38%;background:#080808;box-shadow:0 0 35px rgba(216,183,90,.45)}
.mask i{position:absolute;top:54px;width:33px;height:10px;background:var(--gold2);border-radius:20px;box-shadow:0 0 16px var(--gold2)}.mask i:first-child{left:22px}.mask i:last-child{right:22px}
.boss{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);width:min(520px,76%);padding:14px;border:1px solid rgba(215,38,56,.45);border-radius:12px;background:rgba(20,0,5,.72);opacity:.35;transition:.3s}.boss.active{opacity:1;box-shadow:0 0 28px rgba(215,38,56,.35)}
.boss-name{text-align:center;color:#ff9da8;font-weight:1000;letter-spacing:3px}.boss-bar{height:14px;background:#25070b;border-radius:99px;overflow:hidden;margin-top:9px}.boss-bar span{display:block;height:100%;width:100%;background:linear-gradient(90deg,#d72638,#ff9da8);transition:.35s}.boss-hp{text-align:center;margin-top:5px;font-weight:1000}
.event-banner{position:absolute;left:50%;top:16px;transform:translateX(-50%);padding:10px 26px;border:1px solid var(--line);border-radius:999px;background:rgba(0,0,0,.74);color:var(--gold2);font-weight:1000;letter-spacing:2px}
.director h3{color:var(--gold2);text-align:center;margin:8px 0}.director p{font-size:13px;line-height:1.4}.log{font-size:12px;line-height:1.5;max-height:220px;overflow:hidden}
.controls{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}.controls button{border:1px solid var(--line);border-radius:12px;background:#111;color:var(--gold2);font-weight:1000;cursor:pointer}
.toast{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(.86);opacity:0;padding:14px 24px;border:1px solid var(--gold);border-radius:12px;background:rgba(0,0,0,.92);color:var(--gold2);font-size:24px;font-weight:1000;text-shadow:0 0 20px var(--gold);transition:.28s}.toast.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
.boss-mode .mask i{background:#ff4c4c;box-shadow:0 0 18px #ff3333}
