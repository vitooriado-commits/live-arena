export class BattleEngine {
  constructor(){
    this.active = false;
    this.hp = 100;
    this.phase = "sleeping";
  }

  spawn(){
    this.active = true;
    this.hp = 100;
    this.phase = "awakening";
    setTimeout(()=> {
      if(this.active) this.phase = "attack";
    }, 1800);
  }

  attack(damage){
    if(!this.active) return;
    this.hp = Math.max(0, this.hp - damage);

    if(this.hp <= 50 && this.hp > 20) this.phase = "fury";
    if(this.hp <= 20 && this.hp > 0) this.phase = "last-life";

    if(this.hp <= 0){
      this.phase = "defeated";
      this.active = false;
    }
  }
}
