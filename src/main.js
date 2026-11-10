import {DEFAULT_KEYS,TEXT,DT} from './data.js';
import {Game,clamp} from './core.js';
import {Art} from './art.js';
import {Sound} from './audio.js';
import {Input} from './input.js';
import {Storage} from './storage.js';
const storage=new Storage(),options=storage.options,t=key=>TEXT[options.lang][key]||key;
const canvas=document.getElementById('game'),overlay=document.getElementById('overlay'),stage=document.getElementById('stage');
const sound=new Sound(options),input=new Input(options),art=new Art(canvas,options,t);
let screen='main',parent='main',selected='lia',difficulty='veteran',remapping=null,active=false,menuScene=true,focusIndex=0,frames=0,frameMS=[],lastTime=0,acc=0;
const game=new Game(options,(event,data)=>{
 if(event==='fx')art.fx(data);
 else if(event==='sound')sound.play(data);
 else if(event==='music')sound.song(data);
 else if(event==='notice'||event==='weapon')art.notice={text:event==='weapon'?`${t('weapon')}: ${data}`:t(data),life:2.5};
 else if(event==='radio')art.radio={text:t(data),life:5};
 else if(event==='route'){game.state='route';show('route');}
 else if(event==='checkpoint')storage.write(data);
 else if(event==='gameover')show('gameover');
 else if(event==='win'){storage.record(data);show('results');}
});
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
function button(text,action,cls=''){const b=el('button',cls,text);b.type='button';b.addEventListener('click',()=>{sound.unlock();sound.play('ui');input.clear();action();});return b;}
function heading(panel,title,kicker=t('slice')){panel.append(el('div','kicker',kicker),el('h2','',title));}
function actions(panel,buttons){const a=el('div','actions');for(const b of buttons)a.append(b);panel.append(a);}
function info(panel,text){panel.append(el('p','',text));}
function back(to=parent){show(to);}
function show(name,from=null){if(from!==null)parent=from;screen=name;remapping=null;overlay.replaceChildren();document.documentElement.lang=options.lang==='pt'?'pt-BR':'en';sound.pause(name!=='play'&&active);input.clear();
 if(name==='play'){game.state='play';menuScene=false;canvas.focus();return;}
 let panel=el('section','panel');panel.setAttribute('aria-label',t(name));overlay.append(panel);
 if(name==='main'){
  active=false;menuScene=true;sound.pause(false);sound.song('menu');panel.className='hero';panel.append(el('div','kicker','AURORA SUL, 1987-A'),el('h1','','BRASA\nDE AÇO'));panel.querySelector('h1').style.whiteSpace='pre-line';panel.append(el('div','subtitle',t('title')),el('p','tag',options.lang==='pt'?'Um arquipélago ocupado.\nUma brigada que não se rende.':'An occupied archipelago.\nA brigade that will not yield.'));
  const menu=el('nav','menu');menu.setAttribute('aria-label','Menu');const saved=storage.read();const cont=button(t('continue'),()=>{const save=storage.read();if(save){game.load(save);active=true;show('play');sound.song('mission');}});cont.disabled=!saved;menu.append(button(t('campaign'),()=>show('setup')),cont,button(t('options'),()=>show('options','main')),button(t('controls'),()=>show('controls','main')),button(t('credits'),()=>show('credits','main')));panel.append(menu,el('p','note',t('slice')+' · PT-BR / EN'));if(storage.bad)panel.append(el('p','note',t('savedBad')));
 }else if(name==='setup'){
  panel.classList.add('wide');heading(panel,t('choose'));const cards=el('div','cards');for(const hero of ['lia','bento']){const b=button('',()=>{selected=hero;show('setup');},'card');b.setAttribute('aria-pressed',selected===hero);b.append(el('div','kicker',hero==='lia'?'01 / PILOTO':'02 / MECÂNICO'),el('strong','',hero==='lia'?'LIA TORV':'BENTO ARCOS'),el('span','',t(hero)));cards.append(b);}panel.append(cards);
  const row=el('div','row');const label=el('label','note',t('difficulty')+' ');const select=el('select');for(const d of ['recruit','veteran','legend']){const o=el('option','',t(d));o.value=d;o.selected=d===difficulty;select.append(o);}select.onchange=()=>difficulty=select.value;label.append(select);row.append(label);panel.append(row);info(panel,t('training'));actions(panel,[button(t('start'),()=>{storage.allowNew();show('briefing');},'primary'),button(t('back'),()=>show('main'))]);
 }else if(name==='briefing'){
  panel.classList.add('wide');heading(panel,t('mission'),t('brief'));const strip=el('div','mapstrip');for(const s of [options.lang==='pt'?'PRAIA':'BEACH',options.lang==='pt'?'COMPORTA':'SLUICE',t('workshop'),t('dock')])strip.append(el('span','',`◆ ${s}`));panel.append(strip);info(panel,t('briefText'));panel.append(el('div','kicker',t('mara')));info(panel,t('briefQuote'));actions(panel,[button(t('start'),()=>{game.reset(selected,difficulty);art.particles=[];game.checkpoint(0);active=true;show('play');sound.song('mission');},'primary'),button(t('back'),()=>show('setup'))]);
 }else if(name==='route'){
  panel.classList.add('wide');heading(panel,t('route'));info(panel,t('routeText'));const cards=el('div','cards');for(const r of ['A','B']){const b=button('',()=>{game.chooseRoute(r);show('play');},'card');b.append(el('strong','',t('route'+r)),el('span','',t('route'+r+'d')));cards.append(b);}panel.append(cards);
 }else if(name==='pause'){
  heading(panel,t('pause'));const menu=el('div','menu');menu.append(button(t('resume'),()=>show('play'),'primary'),button(t('restart'),()=>{game.restore(true);show('play');}),button(t('objective'),()=>show('objectives','pause')),button(t('controls'),()=>show('controls','pause')),button(t('options'),()=>show('options','pause')),button(t('menu'),()=>show('confirm','pause')));panel.append(menu);
 }else if(name==='objectives'){
  heading(panel,t('objective'));info(panel,t('objectiveText'));info(panel,`${t('rescues')}: ${game.rescued.length}/8 · ${t('secrets')}: ${game.found.length}/3`);actions(panel,[button(t('back'),()=>show('pause'))]);
 }else if(name==='options'){
  heading(panel,t('options'));const settings=el('div','settings');const lang=el('label','',t('language'));const sel=el('select');for(const [v,s]of [['pt','PORTUGUÊS'],['en','ENGLISH']]){const o=el('option','',s);o.value=v;o.selected=options.lang===v;sel.append(o);}sel.onchange=()=>{options.lang=sel.value;storage.saveOptions();show('options');};lang.append(sel);settings.append(lang);
  for(const key of ['master','music','sfx','shake']){const label=el('label','',t(key));const i=el('input');i.type='range';i.min=0;i.max=1;i.step=.05;i.value=options[key];i.setAttribute('aria-label',t(key));i.oninput=()=>{options[key]=Number(i.value);storage.saveOptions();sound.apply();};label.append(i);settings.append(label);}
  for(const key of ['reduced','shield','assist','melee','mono']){const label=el('label','',t(key));const i=el('input');i.type='checkbox';i.checked=options[key];i.onchange=()=>{options[key]=i.checked;storage.saveOptions();sound.apply();};label.append(i);settings.append(label);}panel.append(settings);actions(panel,[button(t('remap'),()=>show('remap')),button(t('fullscreen'),()=>{if(!document.fullscreenElement)stage.requestFullscreen?.();else document.exitFullscreen?.();}),button(t('back'),()=>back())]);
 }else if(name==='controls'){
  heading(panel,t('controls'));panel.classList.add('wide');const controls=el('div','controls');const left=el('div'),right=el('div');for(const a of ['move','aim','crouch','shoot','jump','grenade','switch','interact','dodge','pause','objectives']){const key={move:'A D / ← →',aim:'W / ↑',crouch:'S / ↓',shoot:options.keys.shoot,jump:options.keys.jump+' / SPACE',grenade:options.keys.grenade,switch:options.keys.switch,interact:options.keys.interact,dodge:options.keys.dodge,pause:'ESC / P',objectives:'TAB'}[a];const line=el('div');line.append(el('kbd','',key.replaceAll('Key','')+' — '),document.createTextNode(t(a)));left.append(line);}right.textContent=options.lang==='pt'?'GAMEPAD\nAnalógico / direcional: mover e mirar\nX / □: tiro · A / ×: pulo\nB / ○: granada · Y / △: arma\nRB: interagir · RT: esquiva\nMenu: pausa · View: objetivos\n\nSegure tiro para disparar. Solte o pulo para saltar mais baixo. Agache para evitar rajadas.':'GAMEPAD\nStick / D-pad: move and aim\nX / □: fire · A / ×: jump\nB / ○: grenade · Y / △: weapon\nRB: interact · RT: dodge\nMenu: pause · View: objectives\n\nHold fire to shoot. Release jump for a shorter hop. Crouch beneath bursts.';right.style.whiteSpace='pre-line';controls.append(left,right);panel.append(controls);actions(panel,[button(t('remap'),()=>show('remap')),button(t('back'),()=>back())]);
 }else if(name==='remap'){
  heading(panel,t('remap'));const keys=el('div','keymap');for(const a of Object.keys(DEFAULT_KEYS)){const b=button(`${t(a==='left'||a==='right'?'move':a)}: ${options.keys[a]}`,()=>{remapping=a;b.textContent=t('pressKey');});keys.append(b);}panel.append(keys);actions(panel,[button(t('reset'),()=>{options.keys={...DEFAULT_KEYS};storage.saveOptions();show('remap');}),button(t('back'),()=>show('options'))]);
 }else if(name==='results'){
  heading(panel,t('results'));panel.append(el('div','stamp','BAÍA COBRE / LIVRE'));const stats=el('div','stats');const sec=Math.floor(game.time);for(const [k,v]of [['score',game.score.toLocaleString()],['time',`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`],['rescues',`${game.rescued.length}/8`],['secrets',`${game.found.length}/3`],['deaths',game.deaths],['grade',game.deaths===0&&game.rescued.length>=6?'S':game.rescued.length>=4?'A':'B']]){const d=el('div','',t(k));d.append(el('strong','',String(v)));stats.append(d);}panel.append(stats);actions(panel,[button(t('continue'),()=>show('ending'),'primary')]);
 }else if(name==='ending'){
  heading(panel,t('end'));const p=el('p','',t('endText'));p.style.whiteSpace='pre-line';panel.append(p);info(panel,t('endNote'));actions(panel,[button(t('credits'),()=>show('credits','ending')),button(t('menu'),()=>show('main'))]);
 }else if(name==='credits'){
  heading(panel,t('credits'));const p=el('p','',t('creditText'));p.style.whiteSpace='pre-line';panel.append(p);info(panel,t('creditNote'));actions(panel,[button(t('back'),()=>back())]);
 }else if(name==='gameover'){
  heading(panel,t('fail'));info(panel,t('failText'));actions(panel,[button(t('restart'),()=>{game.restore(true);show('play');},'primary'),button(t('again'),()=>show('briefing')),button(t('menu'),()=>show('main'))]);
 }else if(name==='confirm'){
  heading(panel,t('menu'));info(panel,t('quit'));actions(panel,[button(t('yes'),()=>show('main')),button(t('cancel'),()=>show('pause'),'primary')]);
 }
 focusIndex=0;const first=overlay.querySelector('button:not(:disabled),select');first?.focus({preventScroll:true});
}
function escape(){if(screen==='play')show('pause');else if(screen==='pause')show('play');else if(['objectives','confirm'].includes(screen))show('pause');else if(['options','controls','credits'].includes(screen))back();else if(screen==='remap')show('options');else if(screen==='setup'||screen==='briefing')show('main');}
window.addEventListener('keydown',e=>{
 if(remapping){e.preventDefault();if(e.code==='Escape'){remapping=null;show('remap');return;}if(Object.entries(options.keys).some(([a,v])=>a!==remapping&&v===e.code)){const focused=document.activeElement;focused.textContent=t('conflict');return;}options.keys[remapping]=e.code;storage.saveOptions();show('remap');return;}
 const isPause=e.code===options.keys.pause||e.code==='KeyP'||e.code==='Escape';if(isPause&&!e.repeat){e.preventDefault();escape();return;}
 if(screen==='play'){if(e.code==='Tab'||Object.values(options.keys).includes(e.code)||e.code.startsWith('Arrow')||e.code==='Space')e.preventDefault();input.key(e.code,true);}else if(['ArrowUp','ArrowDown'].includes(e.code)&&!['SELECT','INPUT'].includes(document.activeElement?.tagName)){e.preventDefault();navigate(e.code==='ArrowDown'?1:-1);}
});window.addEventListener('keyup',e=>input.key(e.code,false));
function navigate(dir){const buttons=[...overlay.querySelectorAll('button:not(:disabled),select,input')];if(!buttons.length)return;let index=buttons.indexOf(document.activeElement);focusIndex=(index+dir+buttons.length)%buttons.length;buttons[focusIndex].focus({preventScroll:true});}
window.addEventListener('blur',()=>{input.clear();if(screen==='play')show('pause');});document.addEventListener('visibilitychange',()=>{if(document.hidden){input.clear();if(screen==='play')show('pause');}});
window.addEventListener('gamepadconnected',()=>{art.notice={text:t('gamepad'),life:3};sound.unlock();});window.addEventListener('gamepaddisconnected',()=>{if(screen==='play')show('pause');art.notice={text:t('noPad'),life:8};});
for(const b of document.querySelectorAll('#touch button')){b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);sound.unlock();if(b.dataset.key==='Escape')escape();else input.key(b.dataset.key,true);});b.addEventListener('pointerup',e=>{e.preventDefault();input.key(b.dataset.key,false);});b.addEventListener('pointercancel',()=>input.clear());}
if(navigator.maxTouchPoints>0)document.getElementById('touch').hidden=false;
let last=performance.now();function frame(now){const elapsed=Math.min((now-last)/1000,.1);last=now;frames++;if(frameMS.length<3600)frameMS.push(elapsed*1000);if(screen==='play'){
 acc+=elapsed;let steps=0;while(acc>=DT&&steps<4){const keys=input.sample();if(keys.pausePressed){show('pause');acc=0;break;}if(keys.objectivesPressed){show('objectives','pause');acc=0;break;}game.update(keys,DT);acc-=DT;steps++;if(screen!=='play')break;}if(steps===4&&acc>DT)acc=0;art.update(elapsed);
 }else {acc=0;if(menuScene||screen==='results'||screen==='ending'||screen==='credits'&&!active)art.update(elapsed);const edges=input.menu();if(edges){if(edges[0])navigate(-1);if(edges[1])navigate(1);if(edges[2])document.activeElement?.click();if(edges[3]||edges[4])escape();}}
 art.render(game,menuScene);requestAnimationFrame(frame);}
show('main');requestAnimationFrame(frame);
// Explicit QA opt-in: never active in normal play or saved sessions.
if(new URLSearchParams(location.search).get('qa')==='1')globalThis.__BRASA__={game,art,show,get screen(){return screen},start:(char='lia',diff='veteran')=>{game.reset(char,diff);active=true;show('play');},get metrics(){return {frames,meanMS:frameMS.reduce((a,b)=>a+b,0)/frameMS.length,p99:[...frameMS].sort((a,b)=>a-b)[Math.floor(frameMS.length*.99)]};}};
