import {Game,clamp,overlap} from './core.js';
import {ENEMIES,FLOOR,DT} from './data.js';

// Authored Mission 2. Reuses only the proven simulation contracts, not M1's layout.
Object.assign(ENEMIES,{
 sniper:{hp:90,w:18,h:30,score:350,wait:3.1},
 para:{hp:85,w:18,h:30,score:350,wait:2.4},
 elite:{hp:165,w:21,h:31,score:500,wait:2.2}
});
export function railLevel(route=null){
 const platforms=[{x:170,y:165,w:130,h:8},{x:390,y:137,w:115,h:8},{x:680,y:162,w:160,h:8},{x:2025,y:169,w:90,h:8},
 {x:3020,y:174,w:195,h:8,car:true},{x:3265,y:160,w:185,h:8,car:true},{x:3500,y:174,w:195,h:8,car:true},
 {x:3910,y:163,w:70,h:8,breakable:true},{x:4020,y:151,w:65,h:8,breakable:true}];
 if(route==='A')platforms.push({x:1150,y:176,w:90,h:8},{x:1470,y:163,w:105,h:8});
 if(route==='B')platforms.push({x:1090,y:165,w:170,h:8},{x:1305,y:132,w:110,h:8},{x:1460,y:145,w:90,h:8,moving:true,baseX:1460,baseY:145,amplitude:30},{x:1610,y:148,w:170,h:8},{x:1830,y:170,w:95,h:8});
 let n=0;const enemies=[];const e=(type,x,base=FLOOR)=>{const d=ENEMIES[type];enemies.push({id:`m2-${n++}-${x}`,type,x,y:base-d.h,w:d.w,h:d.h,hp:d.hp,max:d.hp,timer:1,state:'sleep',warning:0,flash:0,base:x,facing:-1,reinforced:false,landY:base-d.h});};
 e('soldier',290);e('sniper',430,137);e('radio',755,162);e('soldier',860);
 if(route==='A'){e('shield',1190);e('elite',1410);e('shield',1580);e('sniper',1840);}
 if(route==='B'){e('para',1200,165);e('sniper',1380,132);e('para',1670,148);e('radio',1870);}
 e('turret',2065,169);e('soldier',2235);e('elite',2350);e('tank',2825);e('para',3110,174);e('sniper',3370,160);e('radio',3560);e('elite',3730);
 const crates=[{id:'m2-box1',x:345,y:188,w:22,h:22,hp:35,kind:'crate',drop:1},{id:'fuel1',x:840,y:188,w:22,h:22,hp:30,kind:'barrel'},{id:'fuel2',x:878,y:188,w:22,h:22,hp:30,kind:'barrel'},{id:'m2-box2',x:1935,y:188,w:22,h:22,hp:35,kind:'crate',drop:2},{id:'m2-box3',x:2790,y:188,w:22,h:22,hp:35,kind:'crate',drop:3},{id:'m2-box4',x:3680,y:188,w:22,h:22,hp:35,kind:'crate',drop:3}];
 const rescues=[{id:'m2-r1',x:320,y:FLOOR},{id:'m2-r2',x:805,y:FLOOR},{id:'m2-r3',x:route==='B'?1240:1260,y:route==='B'?165:FLOOR},{id:'m2-r4',x:1690,y:route==='B'?148:FLOOR,engineer:route==='A'},{id:'m2-r5',x:2170,y:FLOOR},{id:'m2-r6',x:3170,y:174},{id:'m2-r7',x:3595,y:FLOOR}].map(r=>({...r,y:r.y-25,w:16,h:25,free:false,run:0}));
 const secrets=[{id:'signal',x:590,y:122,w:16,h:18,hp:25,kind:'secret'},{id:'clock',x:2890,y:150,w:20,h:20,hp:30,kind:'secret'},{id:'mail',x:3330,y:170,w:20,h:20,hp:30,kind:'secret'}];
 const pickups=[{id:'m2-w1',x:130,y:186,type:'weapon',weapon:1},{id:'m2-w2',x:920,y:186,type:'weapon',weapon:2},{id:'m2-g1',x:1980,y:186,type:'grenades'},{id:'m2-w3',x:3790,y:186,type:'weapon',weapon:3}];
 if(route==='B')pickups.push({id:'m2-roof',x:1700,y:125,type:'weapon',weapon:3});
 return {platforms,enemies,crates,rescues,secrets,pickups};
}
export class RailGame extends Game{
 reset(character='lia',difficulty='veteran'){
  super.reset(character,difficulty);this.missionId=2;Object.assign(this,railLevel());this.engineering={railRescued:false,railComponent:false,rail:false};
  this.railHazards=[];this.railProps={depotValve:false,tunnelValve:false,bossValve:false};this.trainStart=null;this.trainDistance=0;
  this.vehicle={x:2130,y:180,w:64,h:30,hp:300,max:300,active:false,critical:0,dead:false,kind:'mula',available:true};
  this.mini={x:2510,y:157,w:84,h:53,hp:1500,max:1500,active:false,dead:false,timer:2,warning:0,phase:0,flash:0};this.snapshot=this.capture();
 }
 capture(){return {...super.capture(),missionId:2,engineering:{...(this.engineering||{})},railProps:{...(this.railProps||{})},trainStart:this.trainStart??null,trainDistance:this.trainDistance||0};}
 load(data){if(data.missionId!==2)throw Error('Mission mismatch');super.load(data);this.railHazards=[];this.engineering={railRescued:false,railComponent:false,rail:false,...data.engineering};this.railProps={depotValve:false,tunnelValve:false,bossValve:false,...data.railProps};}
 restore(continued=false){const keep={...this.engineering};super.restore(continued);this.mergeEngineering(keep);}
 mergeEngineering(flags={}){for(const k of ['railRescued','railComponent','rail'])this.engineering[k]=!!(this.engineering[k]||flags[k]);if(this.engineering.railRescued){const r=this.rescues.find(r=>r.engineer);if(r){r.free=true;r.run=4;if(!this.rescued.includes(r.id))this.rescued.push(r.id);}}this.engineering.rail=this.engineering.railRescued&&this.engineering.railComponent;}
 chooseRoute(route){if(this.route||!['A','B'].includes(route))return;this.route=route;const l=railLevel(route);this.enemies=[...this.enemies.filter(e=>e.x<1000),...l.enemies.filter(e=>e.x>=1000)];this.platforms=l.platforms;this.rescues=l.rescues.map(r=>this.rescues.find(a=>a.id===r.id&&a.x<1000)||r);this.pickups.push(...l.pickups.filter(p=>p.id==='m2-roof'));this.mergeEngineering();this.event('radio','radio2');this.checkpoint(1);}
 updateEngineering(){this.engineering.rail=this.engineering.railRescued&&this.engineering.railComponent;this.event('engineering',{...this.engineering});if(this.engineering.rail){this.addScore('m2-engineering',3000);this.event('notice','engineeringDone');this.event('sound','secret');}}
 freeRescue(r){const fresh=!r.free;super.freeRescue(r);if(fresh&&r.engineer){this.engineering.railRescued=true;this.updateEngineering();this.event('radio','engineerRadio');}}
 interact(){const p=this.player;if(p.vehicle){super.interact();return;}
  if(Math.abs(p.x-620)<30){this.railProps.depotValve=true;this.railHazards=this.railHazards.filter(h=>h.vent!=='depot');this.event('notice','valveDone');this.event('sound','metal');return;}
  if(this.route==='A'&&Math.abs(p.x-1585)<30){this.railProps.tunnelValve=true;this.railHazards=this.railHazards.filter(h=>h.vent!=='tunnel');this.event('notice','valveDone');return;}
  if(this.route==='A'&&Math.abs(p.x-1770)<32){if(!this.engineering.railComponent){this.engineering.railComponent=true;this.updateEngineering();this.event('notice','component');}return;}
  if(this.boss?.active&&Math.abs(p.x-3950)<30){this.railProps.bossValve=true;this.railHazards=this.railHazards.filter(h=>h.type!=='steam');this.boss.timer=3;this.boss.warning=0;this.event('notice','valveDone');return;}
  const r=this.rescues.find(r=>!r.free&&Math.abs(r.x-p.x)<35&&Math.abs(r.y-p.y)<48);if(r){this.freeRescue(r);return;}
  if(!this.vehicle.dead&&Math.abs(p.x-this.vehicle.x)<48){p.vehicle=true;this.vehicle.active=true;p.y=FLOOR-35;this.event('sound','enter');return;}super.interact();
 }
 throwGrenade(){const p=this.player;if(!p.vehicle){super.throwGrenade();return;}if(p.grenade>0||p.dead)return;p.grenade=1.2;this.grenades.push({x:p.x-20*p.face,y:204,vx:0,vy:0,timer:4,hostile:false,damage:180,radius:48,mine:true});this.event('sound','grenade');}
 hurtEnemy(e,damage,kind='bullet'){if(e.type==='elite'&&e.state==='warn'&&kind==='bullet'&&(e.x-this.player.x)*e.facing<0)damage*=.45;super.hurtEnemy(e,damage,kind);}
 updateEnemies(dt){
  for(const e of this.enemies){if(e.hp<=0||Math.abs(e.x-this.player.x)>310)continue;if(e.type==='para'){if(e.state==='sleep'){e.y=Math.max(35,e.landY-100);e.descending=true;}if(e.descending){e.y=Math.min(e.landY,e.y+24*dt);if(e.y>=e.landY)e.descending=false;}}}
  super.updateEnemies(dt);
  for(const e of this.enemies)if(e.type==='elite'&&e.hp>0&&e.state==='recover'&&e.timer>1.5&&Math.abs(e.x-this.player.x)<230)e.x-=e.facing*18*dt;
 }
 enemyShot(e,spread=1){if(e.type==='sniper'){const p=this.player,dx=(e.lockX??p.x+9)-(e.x+9),dy=(e.lockY??p.y+18)-(e.y+12),d=Math.hypot(dx,dy)||1;this.bullets.push({x:e.x+9,y:e.y+12,vx:dx/d*175*this.diff.bullet,vy:dy/d*175*this.diff.bullet,life:3,damage:1,hostile:true,size:3,color:'#ff6651'});this.event('sound','enemy');}else super.enemyShot(e,e.type==='elite'?2:spread);}
 updateMini(dt){const b=this.mini;if(b.dead)return;if(this.player.x>2280&&!b.active){b.active=true;b.intro=1.7;this.event('radio','radio3');this.event('notice','mini');this.event('music','boss');}if(!b.active)return;b.flash=Math.max(0,b.flash-dt);if(b.intro>0){b.intro-=dt;return;}b.timer-=dt;if(b.timer<1&&b.warning===0){b.warning=1;this.event('sound','warn');}
  if(b.timer<=0){if(b.phase%3===0)this.enemyShot(b,4);else if(b.phase%3===1){this.grenades.push({x:b.x+20,y:b.y,vx:-110,vy:-190,timer:1.5,hostile:true,radius:30,damage:1});}else this.railHazards.push({type:'shell',x:clamp(this.player.x-15,2200,2440),y:170,w:30,h:40,warning:1.25,life:1.6});b.phase++;b.timer=3/this.diff.attack;b.warning=0;}
 }
 createBoss(){return {x:4070,y:112,w:145,h:98,hp:5100,max:5100,active:true,dead:false,intro:2,timer:1.5,warning:0,pattern:-1,phase:0,flash:0,cannons:[700,700],collapsed:0};}
 hurtBoss(b,damage,hit){if(b===this.boss&&b?.active&&b.intro<=0){const n=hit&&hit.y<165?0:1;b.cannons[n]=Math.max(0,b.cannons[n]-damage);if(b.phase===2)damage*=1.2;}super.hurtBoss(b,damage);if(b?.dead)this.railHazards=[];}
 updateBoss(dt){const b=this.boss;if(!b||b.dead)return;b.flash=Math.max(0,b.flash-dt);if(b.intro>0){b.intro-=dt;return;}
  const phase=b.hp/b.max<.3?2:b.hp/b.max<.7?1:0;if(phase!==b.phase){b.phase=phase;this.effect(b.x+60,b.y+30,'explosion',20);this.event('sound','big');this.event('notice',phase===2?'core':'trackChange');if(phase===2)this.event('radio','radio6');}
  b.timer-=dt;if(b.timer<=0){b.pattern=(b.pattern+1)%3;b.warning=(1.1+Number(b.pattern===2)*.2)*this.diff.warn;b.targetX=clamp(this.player.x,3860,4020);b.timer=b.warning+2.3-b.phase*.2;b.fired=false;this.event('sound','warn');}
  if(b.warning>0){b.warning-=dt;if(b.warning<=0&&!b.fired){b.fired=true;if(b.pattern===0){if(b.phase===0){if(b.cannons[0]>0)this.enemyShot({x:b.x-4,y:146,w:18},3);if(b.cannons[1]>0)this.enemyShot({x:b.x+12,y:177,w:18},1);}else this.enemyShot({x:b.x+35,y:b.y+43,w:12},2);}
   else if(b.pattern===1){this.railHazards.push({type:'shell',x:b.targetX-12,y:170,w:30,h:40,warning:1,life:1.4});if(b.phase>0&&b.collapsed<2){const plat=this.platforms.filter(p=>p.breakable)[0];if(plat){this.railHazards.push({type:'collapse',x:plat.x,y:plat.y,w:plat.w,h:8,warning:1.5,life:1.7});b.collapsed++;}}}
   else{const x=b.phase===2?b.targetX:3940;if(!this.railProps.bossValve||b.phase===2)this.railHazards.push({type:'steam',x,y:170,w:35,h:40,warning:1.1,life:1.8});}
  }}
 }
 update(input={},dt=DT){if(this.state!=='play'||this.done||this.gameover)return;const p=this.player;
  for(const plat of this.platforms)if(plat.moving){const oldX=plat.x;plat.x=plat.baseX+Math.sin(this.time*1.3)*plat.amplitude;if(p.ground&&Math.abs(p.y+p.h-plat.y)<1.1&&p.x+p.w>oldX&&p.x<oldX+plat.w)p.x+=plat.x-oldX;}
  if(p.vehicle){input={...input,jumpPressed:false,jump:false};p.buffer=0;}
  for(const mine of this.grenades)if(mine.mine&&this.enemies.some(e=>e.hp>0&&Math.abs(e.x-mine.x)<35&&e.y>150))mine.timer=Math.min(mine.timer,dt);
  super.update(input,dt);if(this.player.vehicle&&this.player.x>2960){this.player.x=2960;this.player.vx=0;if(!this.flags.dismount){this.flags.dismount=true;this.event('notice','dismount');}}if(this.gameover||this.done||this.player.dead>0||this.winTimer)return;
  // Three cars are in the train's reference frame: collision stays stable while scenery/rails scroll.
  if(p.x>2980){if(this.trainStart===null){this.trainStart=this.time;this.event('music','train');this.event('radio','trainRadio');}this.trainDistance=(this.time-this.trainStart)*55;}
  const cycleEdge=Math.floor(this.time/7)!==Math.floor((this.time-dt)/7);
  for(const vent of [{id:'depot',x:705,off:this.railProps.depotValve},{id:'tunnel',x:1650,off:this.route!=='A'||this.railProps.tunnelValve},{id:'crossing',x:2245,off:this.mini.dead}]){
   if(!vent.off&&Math.abs(p.x-vent.x)<220&&cycleEdge&&(!this.flags[vent.id]||this.time-this.flags[vent.id]>6)){this.flags[vent.id]=this.time;this.railHazards.push({type:vent.id==='crossing'?'crossing':'steam',vent:vent.id,x:vent.x,y:170,w:35,h:40,warning:1.5,life:2.4});this.event('sound','warn');}
  }
  for(const h of this.railHazards){h.life-=dt;h.warning-=dt;if(h.warning>0)continue;if(h.type==='collapse'){const index=this.platforms.findIndex(pl=>pl.breakable&&pl.x===h.x);if(index>=0){this.platforms.splice(index,1);this.effect(h.x,h.y,'debris',15);}h.life=0;}
   else if(overlap(h,{x:p.x+3,y:p.y+4,w:p.w-6,h:p.h-5}))this.damage();}
  this.railHazards=this.railHazards.filter(h=>h.life>0);
 }
}
export const RAIL_TEXT={pt:{slice:'CAMPANHA · MISSÃO 02',mission:'TRILHO PARTIDO',goal:'INTERCEPTE O TREM',mini:'BALDO E A PLATAFORMA',boss:'LOCOMOTIVA MOLOCH',core:'CALDEIRA EXPOSTA',tank:'MULA DE AÇO',route:'POR BAIXO OU PELOS TELHADOS?',routeText:'As rotas convergem na estação. A engenheira está no túnel; nos telhados há foguetes e uma passarela móvel.',routeA:'A · TÚNEL',routeB:'B · TELHADOS',routeAd:'Escudos, vapor e uma peça para salvar o Horizonte.',routeBd:'Paraquedistas, passarelas móveis e armas.',workshop:'CRUZAMENTO',dock:'TREM DE CERCO',briefText:'Os mapas da Baía Cobre revelaram um trem com códigos de navegação. Atravesse a vila ferroviária e o depósito. Tome a Mula de Aço, derrube Baldo e embarque nos três vagões. A Locomotiva Moloch não pode chegar ao Mar de Sal.',briefQuote:'“Não precisamos parar todos os trens. Só o que está armado até a chaminé.”',objectiveText:'Liberte sete funcionários. Use E nas válvulas de vapor. No túnel, salve a engenheira e recupere o regulador no console: primeiro objetivo do Final B. Tome a Mula de Aço (L lança minas). Derrube Baldo, atravesse três vagões e exponha a caldeira de Moloch. Segredos: sinalização, relógio da estação e vagão postal.',end:'DESTINO: MAR DE SAL',endText:'Mara: “Códigos recuperados. Há drones sendo carregados no Mar de Sal.”\nBaldo: “Alguém anotou a placa daquele caminhão?”\nBento: “A placa ficou na sua plataforma.”',endNote:'Missões 1 e 2 disponíveis. Céu de Sal ainda não foi implementada.',radio1:'Mara: o operador de rádio pode chamar reforços. Seja rápido.',radio2:'Mara: pelo túnel há uma engenheira. Pelo alto, paraquedistas.',radio3:'Baldo: quatro canhões! Desta vez eu fiz as contas!',radio4:'Lia: a plataforma caiu. Agora, para os vagões!',radio5:'Mara: Moloch à frente! Cuidado com os trilhos laterais.',radio6:'Bento: a caldeira abriu! O vapor deixa espaços seguros.',engineerRadio:'Engenheira: o console adiante guarda um regulador do Horizonte.',trainRadio:'Mara: três vagões! O trem se move; a passarela inferior é segura.',engineeringDone:'REGULADOR 1/4 PRESERVADO',valveDone:'VAPOR INTERROMPIDO',component:'COMPONENTE RECUPERADO',dismount:'E · DEIXE A MULA E EMBARQUE A PÉ',trackChange:'TROCA DE TRILHOS',steam:'VAPOR',componentPrompt:'E · RECUPERAR REGULADOR',valvePrompt:'E · FECHAR VÁLVULA',engineer:'ENGENHEIRA',routeLabel:'ROTA'},en:{slice:'CAMPAIGN · MISSION 02',mission:'BROKEN RAIL',goal:'INTERCEPT THE TRAIN',mini:'BALDO AND THE PLATFORM',boss:'MOLOCH LOCOMOTIVE',core:'BOILER EXPOSED',tank:'STEEL MULE',route:'UNDERGROUND OR OVER THE ROOFS?',routeText:'Both routes meet at the station. An engineer is in the tunnel; the roofs offer rockets and a moving walkway.',routeA:'A · TUNNEL',routeB:'B · ROOFTOPS',routeAd:'Shields, steam and a part to save Horizon.',routeBd:'Paratroopers, moving walkways and weapons.',workshop:'CROSSING',dock:'SIEGE TRAIN',briefText:'The Copper Bay logs reveal a train carrying navigation codes. Cross the railway town and fuel depot. Take Steel Mule, defeat Baldo and board three cars. Moloch must not reach the Salt Sea.',briefQuote:'“We do not need to stop every train. Just the one armed up to its chimney.”',objectiveText:'Free seven workers. Use E at steam valves. In the tunnel, rescue the engineer and retrieve the regulator at the console: the first Ending B objective. Take Steel Mule (L drops mines). Defeat Baldo, cross three cars and expose Moloch’s boiler. Secrets: signal box, station clock and mail car.',end:'DESTINATION: SALT SEA',endText:'Mara: “Codes secured. Drones are being loaded at the Salt Sea.”\nBaldo: “Did anyone catch that truck’s plate?”\nBento: “It is still stuck in your platform.”',endNote:'Missions 1 and 2 are available. Sky of Salt is not implemented yet.',radio1:'Mara: the radio operator can call reinforcements. Be quick.',radio2:'Mara: an engineer is in the tunnel. Paratroopers are above.',radio3:'Baldo: four cannons! I did the math this time!',radio4:'Lia: the platform is down. Now, onto the cars!',radio5:'Mara: Moloch ahead! Watch the side tracks.',radio6:'Bento: the boiler is open! Steam leaves safe gaps.',engineerRadio:'Engineer: the next console holds a Horizon regulator.',trainRadio:'Mara: three cars! The train moves; the lower walkway is safe.',engineeringDone:'REGULATOR 1/4 PRESERVED',valveDone:'STEAM SHUT OFF',component:'COMPONENT RECOVERED',dismount:'E · LEAVE THE MULE AND BOARD ON FOOT',trackChange:'CHANGING TRACKS',steam:'STEAM',componentPrompt:'E · RETRIEVE REGULATOR',valvePrompt:'E · CLOSE VALVE',engineer:'ENGINEER',routeLabel:'PATH'}};
