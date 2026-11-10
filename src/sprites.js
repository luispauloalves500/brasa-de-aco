// Biblioteca autoral de pixel art. Frames rasterizados uma vez, sem assets externos.
export const PALETTES={
 lia:{skin:['#77453c','#bd7855','#edb17c','#ffdaa0'],cloth:['#492d40','#a14e43','#e08158','#ffc184'],pants:['#172d40','#30495a','#597985'],hair:['#242335','#553346','#86504b'],accent:'#ffcf69'},
 bento:{skin:['#593c35','#a56c4e','#d7a078','#f4c592'],cloth:['#173641','#2b6973','#59a0a2','#b0d9c2'],pants:['#182837','#354a5c','#71848d'],hair:['#252535','#48383b','#806058'],accent:'#f3c05e'},
 soldier:{skin:['#564137','#a27b50','#d9b47b','#eed3a0'],cloth:['#263b37','#536848','#93a56b','#cfcd91'],pants:['#243342','#425354','#73817b'],hair:['#283339','#455348','#889377'],accent:'#e3a963'},
 grenadier:{skin:['#5b3c32','#a7754d','#deb47b','#ffe0a3'],cloth:['#4c3c35','#9d7445','#ceaa66','#e5cd94'],pants:['#30323a','#565647','#969478'],hair:['#303632','#676342','#a3a178'],accent:'#ffb273'},
 radio:{skin:['#5b4235','#a97d57','#dcb47d','#f3d7aa'],cloth:['#203d43','#3f7169','#81a18a','#b4c8a0'],pants:['#1e303a','#3a5558','#6e8580'],hair:['#233637','#47665c','#8ea991'],accent:'#b3ecda'},
 sniper:{skin:['#614435','#ae8556','#dbb982','#f3d9ab'],cloth:['#443e38','#8b865f','#bdb58a','#e5d5a6'],pants:['#28333b','#4b5e5c','#859287'],hair:['#353d3c','#69725d','#a2ab86'],accent:'#f8b574'},
 elite:{skin:['#514443','#9f8066','#d0b08c','#f2d8af'],cloth:['#282c3b','#586373','#93a2a0','#cfdbbe'],pants:['#1e2d3c','#45505f','#7a8d99'],hair:['#202d36','#526770','#adc1b1'],accent:'#ff9873'},
 civilian:{skin:['#68473e','#ba875d','#e5ba8a','#ffe1ae'],cloth:['#54463e','#a49268','#d0bc8b','#f3dfac'],pants:['#253541','#49606a','#809793'],hair:['#312e37','#69503f','#ae8257'],accent:'#b0e8da'}
};
export function aimOctant(x=1,y=0){return (Math.round(Math.atan2(y,x)*4/Math.PI)+8)%8;}
export function poseFor(p,win=false){if(p.dead>0)return 'death';if(win)return 'victory';if(p.hurtPose>0)return 'hurt';if(p.melee>0)return 'melee';if(p.throwPose>0)return 'throw';if(p.dodge>0)return 'dodge';if(p.crouch)return 'crouch';if(!p.ground)return p.vy<0?'rise':'fall';return Math.abs(p.vx)>8?'run':'idle';}
export class SpriteLibrary{
 constructor(){this.cache=new Map();this.limit=384;}
 frame(kind,pose='idle',phase=0,aim=0,weapon=1,flash=false,reduced=false){
  const key=[kind,pose,phase,aim,weapon,Number(flash),Number(reduced)].join('/');if(this.cache.has(key))return this.cache.get(key);
  const cv=document.createElement('canvas');cv.width=72;cv.height=56;const c=cv.getContext('2d');c.translate(29,8);drawActor(c,kind,pose,phase,aim,weapon,flash,reduced);
  while(this.cache.size>=Math.max(1,this.limit))this.cache.delete(this.cache.keys().next().value);this.cache.set(key,cv);return cv;
 }
}
export function drawActor(c,kind,pose,phase,aim,weapon,flash,reduced=false){
 const P=PALETTES[kind]||PALETTES.soldier,enemy=!['lia','bento','civilian'].includes(kind),big=kind==='bento',skin=P.skin,cl=pose==='hurt'&&!reduced?['#5d6571','#b6bdac','#eee0ba','#fff2d1']:P.cloth,pa=P.pants,ha=P.hair;
 const r=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
 const poly=(points,col)=>{c.fillStyle=col;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));c.closePath();c.fill();};
 const line=(x,y,xx,yy,col,w=1)=>{c.strokeStyle=col;c.lineWidth=w;c.lineCap='square';c.beginPath();c.moveTo(Math.round(x)+.5,Math.round(y)+.5);c.lineTo(Math.round(xx)+.5,Math.round(yy)+.5);c.stroke();};
 const outline='#111e2d',cycle=phase*Math.PI/4,run=pose==='run',air=pose==='rise'||pose==='fall',duck=pose==='crouch'||pose==='dodge',swing=run?Math.sin(cycle):0;
 if(pose==='death'){
  const roll=Math.min(1,phase/4);c.save();c.translate(-4+roll*2,28);c.rotate(-Math.PI*.5*roll);c.translate(0,-28);
  drawActor(c,kind,'hurt',0,0,0,false,reduced);c.restore();r(7,31,12,2,'#182b33');return;
 }
 const bob=duck?17:run?(phase%4===1?-1:0):pose==='idle'?Number(phase>3):air?-1:0;
 const lean=pose==='hurt'?-2:pose==='melee'?3:pose==='throw'?-1:0;
 // Back leg, boot soles, kneepads and cloth folds: eight deliberately different run poses.
 if(!duck){for(const back of [true,false]){const sign=back?-1:1,hip=back?-4:3;const foot=air?(back?(pose==='rise'?-8:-5):(pose==='rise'?7:9)):hip+Math.round(swing*sign*5),knee=air?(back?(pose==='rise'?23:27):(pose==='rise'?26:24)):27-Math.abs(swing)*(back?2:4);poly([[hip-3,21+bob],[hip+3,21+bob],[foot+3,knee],[foot+3,32],[foot-3,32],[foot-3,knee+2]],outline);poly([[hip-2,22+bob],[hip+2,22+bob],[foot+2,knee],[foot+2,30],[foot-2,30],[foot-2,knee]],back?pa[0]:pa[1]);r(foot-2,knee,4,3,pa[2]);r(foot-4,31,9,3,outline);r(foot-3,31,7,1,'#6e6f62');r(foot,30,4,1,'#8d927c');}}
 else{poly([[-9,27],[2,25],[10,29],[11,33],[0,34],[-10,32]],outline);r(-7,28,13,4,pa[1]);r(-6,29,6,1,pa[2]);r(2,31,11,3,outline);r(3,31,8,1,'#828979');}
 c.save();c.translate(lean,bob);if(duck)c.scale(1,.65);
 // Backpack and straps; broad mechanic vs lean pilot silhouettes.
 r(-10,12,6,12,outline);r(-9,13,5,9,cl[0]);r(-9,14,1,7,cl[2]);r(-10,20,5,2,'#b29868');
 poly([[-7,10],[-3,9],[5,10],[big?10:8,15],[8,23],[-7,23],[-9,16]],outline);
 poly([[-6,11],[-1,10],[5,11],[big?8:6,16],[6,22],[-6,22],[-7,16]],cl[1]);r(-5,11,3,10,cl[2]);r(-4,12,1,6,cl[3]);r(2,12,4,10,cl[0]);r(3,13,2,5,cl[2]);r(-4,20,9,1,cl[0]);
 // Webbing, magazine pouches and sidearm holster.
 r(-6,12,2,10,'#c7b183');r(0,12,1,9,'#d4c096');r(-5,17,4,5,'#5e6250');r(-4,17,3,1,'#e1c28b');r(2,19,4,4,'#9c8c5f');r(3,19,2,1,'#d0bc83');r(-7,22,15,3,outline);r(-6,22,13,1,'#8e8865');r(-1,22,3,3,'#eac782');r(0,23,1,1,'#795a40');r(6,24,3,5,cl[0]);
 // Neck, jaw and five-tone face, not a flat rectangle.
 r(-3,8,6,5,outline);r(-2,9,4,3,skin[1]);poly([[-6,0],[3,-1],[7,3],[7,8],[3,12],[-3,11],[-6,7]],outline);poly([[-5,1],[2,0],[5,3],[5,5],[8,5],[8,7],[5,7],[4,10],[-2,10],[-5,7]],skin[2]);r(-5,4,2,4,skin[1]);r(-3,2,6,1,skin[3]);r(0,7,4,2,skin[1]);r(2,4,3,1,outline);r(3,5,2,1,'#f6f0d0');r(4,5,1,2,outline);r(5,8,2,1,skin[3]);r(2,9,3,1,outline);r(-5,5,2,3,skin[2]);r(-4,5,1,1,skin[3]);
 if(enemy){poly([[-7,-1],[-3,-4],[4,-4],[8,0],[8,3],[-8,3]],outline);poly([[-6,-1],[-2,-3],[3,-3],[6,0],[6,2],[-6,2]],ha[1]);r(-5,-1,9,1,ha[2]);r(-8,2,17,2,ha[0]);r(-6,3,13,1,ha[2]);r(-3,-2,2,3,cl[2]);if(kind==='sniper'){r(1,3,6,3,outline);r(2,3,5,1,'#f6a270');r(-6,6,5,6,ha[1]);}if(kind==='elite'){r(-4,4,10,3,outline);r(-3,4,9,1,'#ffad7b');r(-3,6,8,1,'#c66b5b');r(2,9,4,3,ha[1]);}}
 else if(kind==='civilian'){r(-7,-2,14,4,'#d7bc80');r(-9,1,18,2,'#886844');r(-5,-1,10,1,'#ffdea0');}
 else if(big){poly([[-7,0],[-5,-3],[4,-3],[7,0],[7,2],[-7,3]],ha[0]);r(-5,-2,10,2,ha[1]);r(-6,0,12,2,P.accent);r(-5,-1,10,1,'#f7dea1');r(-2,8,5,3,ha[1]);r(-1,10,4,1,ha[0]);r(-6,3,3,2,ha[1]);r(-4,-3,2,2,ha[2]);}
 else{poly([[-6,1],[-5,-3],[3,-4],[7,-1],[7,3],[3,1],[-2,2]],ha[0]);r(-4,-2,8,2,ha[1]);r(-2,-2,5,1,ha[2]);poly([[-6,3],[-10,5],[-11,13],[-8,11],[-7,6]],ha[1]);r(-8,6,1,5,ha[2]);r(-6,0,12,2,P.accent);r(-4,0,3,1,'#ffe5a1');r(-3,-2,7,3,'#283f50');r(-2,-2,5,1,'#a7e3dc');r(1,-1,3,2,'#538c9d');}
 if(!enemy&&kind!=='civilian'){poly([[-4,11],[-9,14],[-14-Math.round(swing*2),12],[-11,17],[-4,14]],P.accent);r(-8,12,3,1,'#ffebbb');}
 if(kind==='radio'){r(-13,10,7,14,outline);r(-12,11,5,10,'#587675');r(-11,13,3,3,'#cce0aa');r(-11,18,3,1,'#e1b065');r(-12,1,1,9,'#a8bc9c');r(-13,0,2,2,'#eac589');}
 // Arms follow eight octants. Movement and throw/melee poses retain readable anatomy.
 let angle=aim*Math.PI/4;if(aim>4)angle-=Math.PI*2;
 if(pose==='victory')angle=-Math.PI*.6;else if(pose==='throw')angle=-Math.PI*.7+phase*.09;
 c.save();c.translate(3,15);c.rotate(angle);if(pose==='hurt')c.translate(-2,1);
 r(-3,-3,12,7,outline);r(-2,-2,9,5,cl[1]);r(-1,-2,7,1,cl[3]);r(4,-1,6,5,skin[0]);r(5,-1,5,3,skin[2]);r(7,-1,3,1,skin[3]);r(8,2,3,2,outline);
 if(pose==='throw'){r(8,-5,6,7,outline);r(9,-4,4,5,'#98ad75');r(10,-5,2,2,'#ded49b');}
 else if(pose==='victory'){r(8,-4,6,6,skin[0]);r(9,-3,4,4,skin[2]);r(10,-4,2,3,skin[3]);}
 else if(kind!=='civilian'){
  const len=weapon===0?12:weapon===3?25:22;const wood=weapon===2?'#bd8450':'#6e8b81';r(6,-4,len,6,outline);r(7,-4,len-2,1,'#b4c3ad');r(10,-3,len-7,2,weapon===3?'#8a9e62':'#435e68');r(6,-1,9,2,wood);r(10,2,4,4,outline);r(11,2,2,3,'#73918b');r(len+3,-4,3,6,'#758f8c');r(len+4,-3,2,2,'#d8dcc2');r(15,-6,5,2,outline);r(16,-6,2,1,'#a5bab0');if(weapon===3){r(13,-3,12,2,'#b9b983');r(16,-2,2,2,'#364944');}
  if(pose==='melee'){poly([[15,-7],[33,-5],[22,-3],[13,-3]],'#eff4d3');r(15,-5,13,1,'#9fccc1');r(13,-7,2,7,'#aa9063');}
  if(flash){poly([[len+5,-3],[len+10,-7],[len+11,-4],[len+18,-3],[len+11,0],[len+12,4],[len+6,1]],'#ffb956');r(len+6,-2,7,3,'#fff8cf');}
 }
 c.restore();
 if(kind==='shield'||kind==='elite'&&pose==='guard'){poly([[8,10],[17,8],[20,13],[20,31],[10,33],[8,28]],outline);r(10,12,8,17,'#708b8c');r(11,12,2,16,'#c4c5a4');r(12,14,6,4,'#253e4b');r(13,14,4,1,'#9dcbbf');r(11,26,6,2,'#ddb46c');r(15,21,1,3,'#3f585e');}
 c.restore();
}
