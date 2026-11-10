// Original illustrated radio scenes. Main loop owns timing; no orphan timers/listeners.
export class RailCinematic{
 constructor(canvas,ending=false,english=false){this.canvas=canvas;this.c=canvas.getContext('2d');this.ending=ending;this.english=english;this.time=0;}
 draw(dt,reduced=false){if(!reduced)this.time+=dt;const c=this.c,t=this.time;const r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h);};const text=(s,x,y,col='#e6d59f')=>{c.fillStyle=col;c.font='bold 6px monospace';c.fillText(s,x,y);};c.imageSmoothingEnabled=false;r(0,0,426,76,'#1e3a48');
  for(let panel=0;panel<3;panel++){const x=panel*143;r(x+2,2,139,72,panel===1?'#6f8b89':'#9eae98');r(x+2,47,139,27,panel===2&&this.ending?'#547d80':'#7c765a');for(let a=0;a<3;a++)r(x+10+a*45,22+a%2*7,29,25,'#5b797a');}
  if(!this.ending){for(let a=0;a<5;a++){r(5+a*27,51,20,3,'#b9a375');r(8+a*27,55,2,16,'#3f5e64');}r(19,31,71,20,'#b29c71');r(21,27,68,5,'#4d6a75');r(31,37,11,8,'#324f60');r(66,37,11,8,'#324f60');r(99,20,3,46,'#3f606a');r(95,25,11,5,'#e3b47b');r(156,39,101,23,'#b7a272');r(229,20,27,39,'#aa895a');r(233,25,16,13,'#3f6671');r(171,28,8,11,'#476974');for(let i=0;i<4;i++){r(170+i*25,60,13,9,'#2c4957');r(170+i*25,60,5,2,'#a1b799');}for(let a=0;a<4;a++)r(168+a*5,23-a*5+(Math.floor(t*3)%2),13+a*3,4,'#8fa694');
   r(301,15,105,48,'#244c59');for(let a=0;a<3;a++){r(311+a*30,23,20,25,'#77958a');r(317+a*30,29,7,13,'#b8c69e');}r(307+(t*13%90),19,2,38,'#d9c68a');text(this.english?'NAV CODES':'CÓDIGOS',314,58);
  }else{
   r(12,29,114,31,'#304f5d');r(17,34,103,19,'#789b92');for(let a=0;a<8;a++)r(23+a*11,39,6,2,'#e4cd91');r(25+(t*15%80),33,2,21,'#ead49a');
   for(const [x,col]of [[169,'#ca9167'],[210,'#6d9ca0']]){r(x+1,29,11,11,'#d4b18a');r(x,26,13,4,'#50616a');r(x-2,41,17,21,col);r(x,61,5,11,'#334d5b');r(x+8,61,5,11,'#334d5b');}r(187,45,24,13,'#d6c18e');r(190,49,17,2,'#5e797b');
   for(let a=0;a<5;a++)r(291+a*25,52+Math.floor(a%2),19,1,'#a6c8b2');for(let a=0;a<3;a++){let x=310+a*30+Math.sin(t*.6+a)*3,y=21+a%2*9;r(x,y,12,3,'#2d5060');r(x+4,y-3,4,8,'#3a6170');r(x-4,y-1,20,1,'#476f78');}text(this.english?'SALT SEA':'MAR DE SAL',319,69);
  }
  r(141,0,2,76,'#0f2a38');r(284,0,2,76,'#0f2a38');r(0,0,426,11,'#142e3b');text(this.english?(this.ending?'DECODED // NEXT COORDINATES':'MARA // LIVE UPLINK'):(this.ending?'DECODIFICADO // PRÓXIMAS COORDENADAS':'MARA // TRANSMISSÃO AO VIVO'),8,8);r(414,4,4,4,reduced||Math.sin(t*4)>0?'#e0ba75':'#718c83');
 }
}
