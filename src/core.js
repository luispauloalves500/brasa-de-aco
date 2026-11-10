import {DT,FLOOR,WEAPONS,ENEMIES,DIFFICULTIES} from './data.js';
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export function segmentBox(x1,y1,x2,y2,b,pad=0){
 let lo=0,hi=1;const dx=x2-x1,dy=y2-y1;
 for(const [p,d,min,max] of [[x1,dx,b.x-pad,b.x+b.w+pad],[y1,dy,b.y-pad,b.y+b.h+pad]]){
  if(Math.abs(d)<1e-9){if(p<min||p>max)return false;continue;}
  let a=(min-p)/d,c=(max-p)/d;if(a>c)[a,c]=[c,a];lo=Math.max(lo,a);hi=Math.min(hi,c);if(lo>hi)return false;
 }return true;
}
export class RNG{constructor(seed=12345){this.seed=seed>>>0}next(){let x=this.seed;x^=x<<13;x^=x>>>17;x^=x<<5;this.seed=x>>>0;return this.seed/4294967296}}
const clone=v=>JSON.parse(JSON.stringify(v));
export function level(route=null){
 const platforms=[{x:260,y:162,w:130,h:8},{x:560,y:145,w:140,h:8},{x:810,y:170,w:95,h:8},{x:2050,y:158,w:100,h:8},{x:3050,y:156,w:145,h:8},{x:3500,y:165,w:120,h:8},{x:3910,y:165,w:75,h:8},{x:4140,y:165,w:65,h:8}];
 if(route==='A')platforms.push({x:1120,y:167,w:160,h:8},{x:1335,y:135,w:140,h:8},{x:1515,y:165,w:185,h:8},{x:1760,y:145,w:140,h:8});
 if(route==='B')platforms.push({x:1220,y:176,w:120,h:8},{x:1610,y:158,w:140,h:8});
 const enemies=[];let n=0;
 function e(type,x,y=FLOOR){const d=ENEMIES[type];enemies.push({id:`${route||'start'}-${n++}-${x}`,type,x,y:y-d.h,w:d.w,h:d.h,hp:d.hp,max:d.hp,timer:1.1+(n%4)*.3,state:'sleep',warning:0,flash:0,base:x,facing:-1,spawned:false,reinforced:false});}
 e('soldier',330);e('soldier',480);e('grenadier',620,145);e('shield',745);e('radio',910);
 if(route==='A'){e('soldier',1190,167);e('grenadier',1410,135);e('shield',1550);e('radio',1760);e('turret',1830,145)}
 if(route==='B'){e('grenadier',1190);e('tank',1450);e('soldier',1670,158);e('turret',1840);e('shield',1730)}
 e('soldier',2070,158);e('shield',2190);e('grenadier',2280);e('turret',2930);e('tank',3210);e('grenadier',3130,156);e('radio',3420);e('turret',3570,165);e('shield',3720);
 const crates=[{id:'c1',x:430,y:188,w:22,h:22,hp:35,kind:'crate',drop:1},{id:'c2',x:715,y:188,w:22,h:22,hp:35,kind:'barrel'}, {id:'c3',x:1990,y:188,w:22,h:22,hp:35,kind:'crate',drop:2},{id:'c4',x:2840,y:188,w:22,h:22,hp:35,kind:'crate',drop:3},{id:'c5',x:3310,y:188,w:22,h:22,hp:35,kind:'barrel'},{id:'c6',x:3810,y:188,w:22,h:22,hp:35,kind:'crate',drop:3}];
 const rescues=[{id:'r1',x:370,y:FLOOR},{id:'r2',x:675,y:FLOOR},{id:'r3',x:route==='A'?1260:1300,y:route==='A'?167:FLOOR},{id:'r4',x:route==='A'?1860:1770,y:route==='A'?145:FLOOR},{id:'r5',x:2125,y:158},{id:'r6',x:2760,y:FLOOR},{id:'r7',x:3120,y:156},{id:'r8',x:3655,y:FLOOR}].map(r=>({...r,w:16,h:25,y:r.y-25,free:false,run:0}));
 const secrets=[{id:'bell',x:550,y:105,w:14,h:17,hp:1,kind:'secret'},{id:'tree',x:route==='B'?1530:1740,y:179,w:16,h:20,hp:1,kind:'secret'},{id:'safe',x:2860,y:160,w:20,h:20,hp:30,kind:'secret'}];
 const pickups=[{id:'w1',x:195,y:186,type:'weapon',weapon:1},{id:'g1',x:780,y:186,type:'grenades'}, {id:'w2',x:2020,y:186,type:'weapon',weapon:2},{id:'w3',x:3825,y:155,type:'weapon',weapon:3}];
 if(route==='B')pickups.push({id:'wb',x:1550,y:186,type:'weapon',weapon:3});else if(route==='A')pickups.push({id:'wa',x:1560,y:141,type:'weapon',weapon:1});
 return {platforms,enemies,crates,rescues,secrets,pickups};
}
export class Game{
 constructor(options={},emit=()=>{}){this.options=options;this.emit=emit;this.rng=new RNG(1987);this.reset('lia','veteran')}
 reset(character='lia',difficulty='veteran'){
  this.character=character;this.difficulty=difficulty;this.diff=DIFFICULTIES[difficulty]||DIFFICULTIES.veteran;this.route=null;this.time=0;this.tick=0;this.camera=0;this.score=0;this.combo=0;this.comboTime=0;this.deaths=0;this.continues=0;this.rescued=[];this.found=[];this.scored=[];this.flags={};this.done=false;this.gameover=false;this.winTimer=0;this.lastCheckpoint=0;this.state='play';
  Object.assign(this,level());this.player={x:55,y:FLOOR-34,w:18,h:34,vx:0,vy:0,face:1,ground:true,crouch:false,coyote:.09,buffer:0,shoot:0,grenade:0,switch:0,melee:0,inv:1.8,dead:0,lives:this.diff.lives,shield:this.options.shield?1:0,slots:[],slot:-1,grenades:5,dodge:0,dodgeCD:0,vehicle:false,anim:0,aimX:1,aimY:0};
  this.bullets=[];this.grenades=[];this.effects=[];this.hazards=[];this.boss=null;this.mini={x:2510,y:164,w:76,h:46,hp:1200,max:1200,active:false,dead:false,timer:2,warning:0,phase:0,flash:0};this.vehicle={x:2710,y:180,w:56,h:30,hp:300,max:300,active:false,critical:0,dead:false};
  this.snapshot=this.capture();this.emit('radio','radio1');
 }
 event(type,data){this.emit(type,data)}
 addScore(id,base){if(this.scored.includes(id))return;this.scored.push(id);this.combo=Math.min(5,this.combo+1);this.comboTime=8;this.score+=Math.round(base*(1+this.combo*.3));}
 effect(x,y,type='spark',count=5){this.event('fx',{x,y,type,count});}
 capture(){return clone({version:1,character:this.character,difficulty:this.difficulty,route:this.route,time:this.time,score:this.score,deaths:this.deaths,continues:this.continues,rescued:this.rescued,found:this.found,scored:this.scored,flags:this.flags,lastCheckpoint:this.lastCheckpoint,player:this.player,platforms:this.platforms,enemies:this.enemies,crates:this.crates,rescues:this.rescues,secrets:this.secrets,pickups:this.pickups,mini:this.mini,vehicle:this.vehicle,boss:this.boss,rng:this.rng.seed})}
 load(data){if(!validSave(data))throw Error('Invalid save');this.reset(data.character,data.difficulty);Object.assign(this,clone(data));this.diff=DIFFICULTIES[this.difficulty];this.rng=new RNG(data.rng);this.bullets=[];this.grenades=[];this.hazards=[];this.player.inv=1.8;this.player.dead=0;this.camera=clamp(this.player.x-165,0,3840);this.snapshot=clone(data);this.done=false;this.gameover=false;this.state='play';}
 checkpoint(id){this.lastCheckpoint=id;this.player.inv=2;this.player.shield=this.options.shield?1:this.player.shield;this.snapshot=this.capture();this.event('checkpoint',this.snapshot);this.event('notice','checkpoint');}
 restore(continued=false){
  const keep={score:this.score,rescued:[...this.rescued],found:[...this.found],scored:[...this.scored],deaths:this.deaths,time:this.time,continues:this.continues+(continued?1:0),lives:continued?this.diff.lives:this.player.lives};
  this.load(this.snapshot);Object.assign(this,{score:keep.score,rescued:keep.rescued,found:keep.found,scored:keep.scored,deaths:keep.deaths,time:keep.time,continues:keep.continues});this.player.lives=keep.lives;this.player.slots=[];this.player.slot=-1;this.player.grenades=5;this.player.shield=this.options.shield?1:0;
  for(const r of this.rescues)if(this.rescued.includes(r.id)){r.free=true;r.run=4;}for(const s of this.secrets)if(this.found.includes(s.id))s.hp=0;
 }
 chooseRoute(route){if(!['A','B'].includes(route)||this.route)return;this.route=route;const next=level(route);const keep=this.enemies.filter(e=>e.x<1000);this.enemies=[...keep,...next.enemies.filter(e=>e.x>=1000)];this.platforms=next.platforms;this.rescues=next.rescues.map(r=>this.rescues.find(p=>p.id===r.id&&p.x<1000)||r);this.secrets=next.secrets;this.pickups=[...this.pickups,...next.pickups.filter(p=>['wa','wb'].includes(p.id))];this.event('radio','radio2');this.checkpoint(1);}
 gun(){return this.player.slot<0?WEAPONS[0]:WEAPONS[this.player.slots[this.player.slot]?.id||0]}
 pickupWeapon(id){const p=this.player;let s=p.slots.find(s=>s.id===id);if(s)s.ammo=Math.min(WEAPONS[id].ammo,s.ammo+Math.ceil(WEAPONS[id].ammo*.6));else {s={id,ammo:WEAPONS[id].ammo};if(p.slots.length<2)p.slots.push(s);else p.slots[p.slot<0?0:p.slot]=s;}p.slot=p.slots.indexOf(s);this.event('weapon',WEAPONS[id].name);this.event('sound','pickup');}
 shoot(input){const p=this.player;if(p.shoot>0||p.dead)return;
  let dx=p.face,dy=0;if(input.up){dy=-1;dx=input.left?-1:input.right?1:0;}else if(input.down&&!p.ground){dy=1;dx=input.left?-1:input.right?1:0;}
  if(this.options.assist&&dy===0){let targets=this.enemies.filter(e=>e.hp>0&&Math.abs(e.x-p.x)<200&&(e.x-p.x)*p.face>0);if(this.boss)targets.push(this.boss);const t=targets.sort((a,b)=>Math.abs(a.x-p.x)-Math.abs(b.x-p.x))[0];if(t&&Math.abs(t.y+t.h*.5-(p.y+15))<40){dy=(t.y+t.h*.5-p.y-15)/Math.max(80,Math.abs(t.x-p.x));}}
  const mag=Math.hypot(dx,dy);dx/=mag;dy/=mag;p.aimX=dx;p.aimY=dy;
  if(this.options.melee&&!p.vehicle&&this.enemies.some(e=>e.hp>0&&Math.abs(e.x-p.x)<32&&(e.x-p.x)*p.face>0&&Math.abs(e.y-p.y)<32)){
   for(const e of this.enemies)if(e.hp>0&&Math.abs(e.x-p.x)<34&&(e.x-p.x)*p.face>0&&Math.abs(e.y-p.y)<35)this.hurtEnemy(e,100,'melee');p.shoot=.35;p.melee=.2;this.event('sound','melee');return;
  }
  let gun=p.vehicle?{...WEAPONS[1],damage:10,ammo:Infinity}:this.gun();if(p.vehicle&&this.vehicle.critical>0)return;
  p.shoot=gun.interval;const y=p.vehicle?p.y+7:p.y+(p.crouch?24:14),x=p.x+p.w*.5+dx*(p.vehicle?25:14);this.effect(x,y,'muzzle',3);
  for(let i=0;i<(gun.pellets||1);i++){let angle=Math.atan2(dy,dx)+(gun.pellets?(i-3)*.075:0);this.bullets.push({x,y,px:x,py:y,vx:Math.cos(angle)*gun.speed,vy:Math.sin(angle)*gun.speed,life:gun.blast?6:1.4,damage:gun.damage,hostile:false,size:gun.size,color:gun.color,blast:gun.blast||0});}
  if(!p.vehicle&&p.slot>=0){const slot=p.slots[p.slot];slot.ammo--;if(slot.ammo<=0){p.slots.splice(p.slot,1);p.slot=-1;this.event('notice','M-7');}}
  this.event('sound',gun.id===3?'rocket':gun.id===2?'shotgun':'shot');
 }
 throwGrenade(){const p=this.player;if(p.grenade>0||p.dead)return;if(p.vehicle){p.grenade=1.5;this.grenades.push({x:p.x+25*p.face,y:p.y+8,vx:190*p.face,vy:-150,timer:.9,hostile:false,damage:90,radius:48});this.event('sound','grenade');return;}if(p.grenades<1)return;p.grenades--;p.grenade=.55;this.grenades.push({x:p.x+10,y:p.y+8,vx:140*p.face+p.vx*.4,vy:-200,timer:1.2,hostile:false,damage:180,radius:52});this.event('sound','grenade');}
 hurtEnemy(e,damage,kind='bullet'){
  if(e.hp<=0)return;if(e.type==='shield'&&kind==='bullet'&&this.player.x<e.x&&this.player.y+20>e.y+8){damage*=.25;this.effect(e.x,e.y+10,'spark',4);}
  e.hp-=damage;e.flash=.09;this.effect(e.x+e.w/2,e.y+e.h/2,'hit',4);this.event('sound','hit');if(e.hp<=0){this.addScore(e.id,ENEMIES[e.type].score);this.effect(e.x+e.w/2,e.y+e.h/2,e.type==='tank'||e.type==='turret'?'explosion':'defeat',12);this.event('sound',e.type==='tank'?'boom':'defeat');}
 }
 hurtBoss(b,damage){if(!b||!b.active||b.dead||b.intro>0)return;b.hp-=damage;b.flash=.08;this.effect(b.x+b.w*.5,b.y+b.h*.5,'spark',3);if(b.hp<=0){b.hp=0;b.dead=true;b.active=false;this.bullets=this.bullets.filter(t=>!t.hostile);this.hazards=[];this.grenades=this.grenades.filter(t=>!t.hostile);this.addScore(b===this.mini?'mini':'boss',b===this.mini?5000:15000);this.effect(b.x+b.w/2,b.y+b.h/2,'big',50);this.event('sound','big');if(b===this.mini){this.event('radio','radio4');this.pickups.push({id:'minidrop',x:b.x,y:185,type:'weapon',weapon:3});}else{this.winTimer=3;this.player.inv=10;this.event('music','victory');}}
 }
 damage(){const p=this.player;if(p.inv>0||p.dead||this.done||this.winTimer||this.boss?.intro>0||(this.mini.active&&this.mini.intro>0))return;
  if(p.vehicle){this.vehicle.hp-=this.character==='bento'?27:30;p.inv=.55;this.effect(p.x,p.y,'spark',9);if(this.vehicle.hp<=0&&this.vehicle.critical===0){this.vehicle.critical=2;this.event('notice','eject');}this.event('sound','metal');return;}
  if(p.shield){p.shield=0;p.inv=1.8;this.effect(p.x,p.y,'shield',12);this.event('sound','metal');return;}
  p.lives--;this.deaths++;p.dead=1.2;p.vx=0;this.combo=0;this.effect(p.x,p.y,'defeat',12);this.event('sound','death');
 }
 explode(x,y,radius,damage,hostile=false){this.effect(x,y,'explosion',22);this.event('sound','boom');if(hostile){if(Math.hypot(this.player.x+9-x,this.player.y+18-y)<radius)this.damage();return;}
  for(const e of this.enemies)if(e.hp>0&&Math.hypot(e.x+e.w/2-x,e.y+e.h/2-y)<radius+e.w/2)this.hurtEnemy(e,damage,'explosion');
  for(const b of [this.mini,this.boss])if(b?.active&&Math.hypot(b.x+b.w/2-x,b.y+b.h/2-y)<radius+b.w*.5)this.hurtBoss(b,damage);
  for(const c of [...this.crates,...this.secrets])if(c.hp>0&&Math.hypot(c.x+c.w/2-x,c.y+c.h/2-y)<radius)this.hitObject(c,damage);
  for(const r of this.rescues)if(!r.free&&Math.hypot(r.x-x,r.y-y)<radius)this.freeRescue(r);
 }
 hitObject(c,damage){if(c.hp<=0)return;c.hp-=damage;if(c.hp>0)return;this.effect(c.x+10,c.y+8,'debris',10);if(c.kind==='panel'&&this.boss?.active){this.boss.timer=3;this.boss.warning=0;this.event('notice','core');}if(c.kind==='secret'){if(!this.found.includes(c.id)){this.found.push(c.id);this.addScore(c.id,750);this.event('notice','secret');this.event('sound','secret');this.pickups.push({id:'reward-'+c.id,x:c.x,y:c.y,type:c.id==='tree'?'weapon':'grenades',weapon:3});}}else if(c.kind==='barrel'){this.explode(c.x+10,c.y,46,150);}else if(c.drop)this.pickups.push({id:'drop-'+c.id,x:c.x,y:c.y,type:'weapon',weapon:c.drop});}
 freeRescue(r){if(r.free)return;r.free=true;r.run=0;if(!this.rescued.includes(r.id)){this.rescued.push(r.id);this.addScore(r.id,1000);this.player.grenades=Math.min(12,this.player.grenades+1);this.event('notice','rescue');this.event('sound','rescue');}}
 interact(){const p=this.player;if(p.vehicle){p.vehicle=false;p.x=clamp(p.x-15,0,4220);p.y=FLOOR-p.h;p.vy=-110;p.inv=1.8;this.vehicle.x=p.x+32;this.event('sound','enter');return;}
  if(!this.route&&Math.abs(p.x-980)<65){this.event('route');return;}
  const r=this.rescues.find(r=>!r.free&&Math.abs(r.x-p.x)<35&&Math.abs(r.y-p.y)<48);if(r){this.freeRescue(r);return;}
  const v=this.vehicle;if(this.mini.dead&&!v.dead&&Math.abs(p.x-v.x)<55){p.vehicle=true;v.active=true;p.y=FLOOR-35;this.event('sound','enter');return;}
  if(this.boss?.active){const panel=this.crates.find(c=>c.id==='boss-panel'&&c.hp>0&&Math.abs(c.x-p.x)<35);if(panel){panel.hp=0;this.boss.timer=3;this.boss.warning=0;this.event('notice','core');}}
 }
 enemyShot(e,spread=1){const p=this.player;const dx=p.x+9-(e.x+e.w/2),dy=p.y+18-(e.y+10);const angle=Math.atan2(dy,dx);for(let i=0;i<spread;i++){const a=angle+(i-(spread-1)/2)*.17;this.bullets.push({x:e.x+e.w/2,y:e.y+10,vx:Math.cos(a)*105*this.diff.bullet,vy:Math.sin(a)*105*this.diff.bullet,life:4,damage:1,hostile:true,size:3,color:'#ff6651'});}this.event('sound','enemy');}
 updateEnemies(dt){const p=this.player;for(const e of this.enemies){if(e.hp<=0)continue;e.flash=Math.max(0,e.flash-dt);if(Math.abs(e.x-p.x)>310||e.x+e.w<this.camera||e.x>this.camera+426)continue;
   if(e.state==='sleep'){e.state='enter';e.timer=.8;e.spawned=true;}
   e.timer-=dt;e.facing=p.x<e.x?-1:1;
   if(e.state==='enter'&&e.timer<=0){e.state='idle';e.timer=.7;}
   else if(e.state==='idle'){
    if(e.type==='soldier'||e.type==='shield'){const d=Math.abs(e.x-p.x);if(d>95&&d<270)e.x+=e.facing*(e.type==='shield'?12:18)*dt;}
    if(e.timer<=0&&Math.abs(e.x-p.x)<285){e.state='warn';e.warning=(e.type==='radio'?2:.7)*this.diff.warn;e.timer=e.warning;}
   }else if(e.state==='warn'&&e.timer<=0){
    if(e.type==='radio'&&!e.reinforced){const d=ENEMIES.soldier;if(this.enemies.filter(e=>e.hp>0&&Math.abs(e.x-p.x)<250).length<7){this.enemies.push({id:e.id+'-reinforce',type:'soldier',x:Math.max(p.x+180,e.x+40),y:FLOOR-d.h,w:d.w,h:d.h,hp:d.hp,max:d.hp,timer:1,state:'enter',warning:0,flash:0,base:e.x,facing:-1});}e.reinforced=true;}
    else if(e.type==='grenadier'){this.grenades.push({x:e.x,y:e.y,vx:clamp((p.x-e.x)*.8,-150,150),vy:-190,timer:1.4,hostile:true,radius:29,damage:1});}
    else this.enemyShot(e,e.type==='tank'?3:e.type==='turret'?3:1);
    e.state='recover';e.timer=ENEMIES[e.type].wait/this.diff.attack;
   }else if(e.state==='recover'&&e.timer<=0){e.state='idle';e.timer=.2;}
  }
 }
 updateMini(dt){const b=this.mini;if(b.dead)return;if(this.player.x>2300&&!b.active){b.active=true;b.intro=1.5;this.event('radio','radio3');this.event('notice','mini');this.event('music','boss');}
  if(!b.active)return;b.flash=Math.max(0,b.flash-dt);if(b.intro>0){b.intro-=dt;return;}b.timer-=dt;if(b.timer<=.9&&b.warning===0){b.warning=1;this.effect(b.x,b.y,'warning',2);}if(b.timer<=0){if(b.phase%2===0)this.enemyShot(b,3);else this.grenades.push({x:b.x,y:b.y,vx:-140,vy:-180,timer:1.3,hostile:true,radius:32});b.phase++;b.timer=2.6/this.diff.attack;b.warning=0;}
 }
 createBoss(){return {x:4090,y:86,w:110,h:124,hp:3800,max:3800,active:true,dead:false,intro:2,timer:1.5,warning:0,pattern:-1,phase:0,flash:0};}
 updateBoss(dt){const b=this.boss;if(!b||b.dead)return;b.flash=Math.max(0,b.flash-dt);if(b.intro>0){b.intro-=dt;return;}
  const phase=b.hp/b.max<.25?2:b.hp/b.max<.65?1:0;if(phase!==b.phase){b.phase=phase;this.event('notice','core');this.effect(b.x+30,b.y+20,'explosion',25);this.event('sound','big');if(phase===2)this.event('radio','radio6');}
  b.timer-=dt;if(b.timer<=0){b.pattern=(b.pattern+1)%3;b.warning=1.1*this.diff.warn;b.targetX=clamp(this.player.x-12,3855,4090);b.timer=b.warning+2.2-(b.phase*.25);b.fired=false;this.event('sound','warn');}
  if(b.warning>0){b.warning-=dt;if(b.warning<=0&&!b.fired){b.fired=true;
   if(b.pattern===0){this.hazards.push({type:'container',x:b.targetX,y:30,w:36,h:32,vy:100,life:2,warning:0});}
   else if(b.pattern===1){this.enemyShot({x:b.x,y:151,w:20},b.phase===2?5:3);}
   else{this.hazards.push({type:'sweep',x:3870,y:190,w:220,h:20,life:1.2,warning:.5});}
  }}
 }
 update(input={},dt=DT){if(this.state!=='play'||this.done||this.gameover)return;const p=this.player;this.time+=dt;this.tick++;
  if(this.winTimer){this.winTimer-=dt;if(this.winTimer<=0){this.done=true;this.score+=15000+this.rescued.length*500+(this.deaths===0?12000:0)+(this.continues===0?8000:0);this.event('win',this.capture());}return;}
  if(p.dead>0){p.dead-=dt;if(p.dead<=0){if(p.lives<=0){this.gameover=true;this.event('gameover');}else this.restore();}return;}
  for(const key of ['shoot','grenade','switch','melee','inv','dodge','dodgeCD'])p[key]=Math.max(0,p[key]-dt);
  this.comboTime-=dt;if(this.comboTime<=0)this.combo=0;
  if(input.jumpPressed)p.buffer=.1;else p.buffer=Math.max(0,p.buffer-dt);if(p.ground)p.coyote=.09;else p.coyote=Math.max(0,p.coyote-dt);
  p.crouch=!!(input.down&&p.ground&&!p.vehicle);const dir=Number(!!input.right)-Number(!!input.left);if(dir)p.face=dir;
  const speed=p.vehicle?125:110;const target=(p.crouch?0:dir)*speed;p.vx+=clamp(target-p.vx,-1400*dt,1400*dt);
  if(input.dodgePressed&&p.ground&&!p.vehicle&&p.dodgeCD<=0){p.dodge=.16;p.dodgeCD=1.5;p.inv=Math.max(p.inv,.16);this.effect(p.x,p.y+30,'dust',5);}
  if(p.dodge>0)p.vx=p.face*240;
  if(p.buffer>0&&p.coyote>0&&!p.crouch){p.vy=p.vehicle?-210:-295;p.ground=false;p.coyote=0;p.buffer=0;this.event('sound','jump');this.effect(p.x+10,p.y+34,'dust',5);}
  if(!input.jump&&p.vy<0)p.vy+=700*dt;
  const oldY=p.y;p.vy+=650*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.ground=false;
  if(p.y+p.h>=FLOOR){p.y=FLOOR-p.h;p.vy=0;p.ground=true;}
  if(!p.vehicle)for(const plat of this.platforms)if(p.vy>=0&&oldY+p.h<=plat.y+1&&p.y+p.h>=plat.y&&p.x+p.w>plat.x&&p.x<plat.x+plat.w){p.y=plat.y-p.h;p.vy=0;p.ground=true;}
  let limit=4225;if(!this.route)limit=990;else if(!this.mini.dead)limit=2420;if(this.boss?.active)p.x=Math.max(3850,p.x);p.x=clamp(p.x,4,limit);p.anim+=Math.abs(p.vx)*dt;
  if(input.switchPressed&&p.switch<=0){p.slot++;if(p.slot>=p.slots.length)p.slot=-1;p.switch=this.character==='lia'?.158:.18;this.event('sound','switch');}
  if(input.interactPressed)this.interact();if(input.shoot)this.shoot(input);if(input.grenadePressed)this.throwGrenade();
  if(p.vehicle){this.vehicle.x=p.x-16;this.vehicle.y=p.y+8;}
  if(this.vehicle.critical>0){this.vehicle.critical-=dt;if(this.vehicle.critical<=0){if(p.vehicle){p.vehicle=false;p.vy=-180;p.inv=2;}this.vehicle.dead=true;this.explode(this.vehicle.x+25,this.vehicle.y,45,120,false);}}
  for(const r of this.rescues)if(r.free)r.run+=dt;
  for(const item of this.pickups){if(item.taken)continue;if(overlap({x:p.x-4,y:p.y-5,w:p.w+8,h:p.h+10},{x:item.x-8,y:item.y-8,w:16,h:16})){item.taken=true;if(item.type==='weapon')this.pickupWeapon(item.weapon);else{p.grenades=Math.min(12,p.grenades+3);this.event('sound','pickup');this.event('notice','grenade');}}}
  this.updateEnemies(dt);this.updateMini(dt);
  if(this.mini.dead&&this.lastCheckpoint<2&&p.x>2700){this.event('music','mission');this.checkpoint(2);}
  if(!this.boss&&p.x>3850){this.boss=this.createBoss();this.crates.push({id:'boss-panel',x:3960,y:191,w:18,h:19,hp:50,kind:'panel'});this.event('notice','boss');this.event('radio','radio5');this.event('music','boss');}
  this.updateBoss(dt);
  for(const b of this.bullets){b.px=b.x;b.py=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;if(b.hostile){const hb={x:p.x+3,y:p.y+(p.crouch?17:4),w:p.w-6,h:p.crouch?16:28};if(segmentBox(b.px,b.py,b.x,b.y,hb,b.size*.5)){this.damage();b.life=0;}}else{
    let hit=false;
    for(const e of this.enemies)if(e.hp>0&&segmentBox(b.px,b.py,b.x,b.y,e,b.size)){if(!b.blast)this.hurtEnemy(e,b.damage);hit=true;break;}
    if(!hit)for(const boss of [this.mini,this.boss])if(boss?.active&&boss.intro<=0&&segmentBox(b.px,b.py,b.x,b.y,boss,b.size)){if(!b.blast)this.hurtBoss(boss,b.damage,{x:b.x,y:b.y});hit=true;break;}
    if(!hit)for(const c of [...this.crates,...this.secrets])if(c.hp>0&&segmentBox(b.px,b.py,b.x,b.y,c,b.size)){if(!b.blast)this.hitObject(c,b.damage);hit=true;break;}
    if(!hit)for(const r of this.rescues)if(!r.free&&segmentBox(b.px,b.py,b.x,b.y,r,b.size)){this.freeRescue(r);hit=true;break;}
    if(hit){b.life=0;if(b.blast)this.explode(b.x,b.y,b.blast,b.damage);}
   }if(b.y>FLOOR||b.x<0||b.x>4400)b.life=0;
  }this.bullets=this.bullets.filter(b=>b.life>0);
  for(const g of this.grenades){g.timer-=dt;g.x+=g.vx*dt;g.vy+=480*dt;g.y+=g.vy*dt;if(g.y>=FLOOR-3){g.y=FLOOR-3;g.vy=-Math.abs(g.vy)*.32;g.vx*=.6;}if(g.timer<=0)this.explode(g.x,g.y,g.radius,g.damage,g.hostile);}this.grenades=this.grenades.filter(g=>g.timer>0);
  for(const h of this.hazards){h.life-=dt;if(h.warning>0){h.warning-=dt;continue;}if(h.type==='container'){h.vy+=480*dt;h.y+=h.vy*dt;if(overlap(h,{x:p.x,y:p.y,w:p.w,h:p.h}))this.damage();if(h.y+h.h>=FLOOR){this.explode(h.x+h.w/2,FLOOR,25,1,true);h.life=0;}}else if(overlap(h,{x:p.x,y:p.y,w:p.w,h:p.h}))this.damage();}this.hazards=this.hazards.filter(h=>h.life>0);
  const desired=clamp(p.x-155,0,3840);this.camera+=(desired-this.camera)*Math.min(1,dt*6);if(this.boss?.active)this.camera+=(3840-this.camera)*dt*5;
  if(!this.flags.fork&&p.x>850){this.flags.fork=true;this.event('radio','radio2');}
 }
}
export function validSave(s){return !!s&&s.version===1&&(s.missionId===undefined||[1,2].includes(s.missionId))&&['lia','bento'].includes(s.character)&&Object.hasOwn(DIFFICULTIES,s.difficulty)&&[null,'A','B'].includes(s.route)&&Number.isFinite(s.score)&&s.score>=0&&Number.isFinite(s.time)&&s.time>=0&&s.player&&Number.isFinite(s.player.x)&&s.player.x>=0&&s.player.x<4300&&Number.isFinite(s.player.y)&&s.player.y>=0&&s.player.y<=240&&Number.isInteger(s.player.lives)&&s.player.lives>=0&&s.player.lives<=20&&Array.isArray(s.player.slots)&&s.player.slots.length<=2&&s.player.slots.every(p=>[1,2,3].includes(p.id)&&Number.isFinite(p.ammo)&&p.ammo>=0&&p.ammo<=280)&&['enemies','crates','rescues','secrets','pickups','platforms','rescued','found','scored'].every(k=>Array.isArray(s[k])&&s[k].length<500)&&s.enemies.every(e=>Object.hasOwn(ENEMIES,e.type)&&Number.isFinite(e.x)&&Number.isFinite(e.y)&&Number.isFinite(e.hp))&&s.mini&&s.vehicle&&typeof s.flags==='object'&&Number.isFinite(s.rng);}
