export class EventEngine {
  constructor(){
    this.events = [
      {name:"Tempestade de Energia", icon:"⚡", energy:12},
      {name:"Diamond Rain", icon:"💎", energy:18},
      {name:"Golden Hour", icon:"👑", energy:15},
      {name:"Arena Frenzy", icon:"🔥", energy:20},
      {name:"Eclipse", icon:"🌑", energy:10}
    ];
  }

  random(){
    return this.events[Math.floor(Math.random()*this.events.length)];
  }
}
