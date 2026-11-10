import test from 'node:test';import assert from 'node:assert/strict';import {Game} from '../src/core.js';import {DT,DEFAULT_OPTIONS} from '../src/data.js';
for(const route of ['A','B'])test(`campanha simulada da praia aos resultados pela rota ${route}`,()=>{
 let events=[],g;g=new Game({...DEFAULT_OPTIONS,shield:true},(e,d)=>{events.push(e);if(e==='route')g.chooseRoute(route);});g.reset('lia','recruit');let ticks=0;
 for(;ticks<72000&&!g.done;ticks++){
  if(g.gameover){g.restore(true);}
  const p=g.player;const jumping=ticks%90===0;
  const nearBoss=g.boss?.active,nearMini=g.mini.active&&!g.mini.dead;
  g.update({right:p.x<(nearBoss?3970:4200),left:nearBoss&&p.x>3985,shoot:true,jump: ticks%90<28,jumpPressed:jumping,grenadePressed:(nearBoss||nearMini)&&ticks%70===0,interactPressed:!g.route&&p.x>935||g.mini.dead&&!p.vehicle&&!g.vehicle.dead&&Math.abs(p.x-g.vehicle.x)<30},DT);
 }
 assert.ok(g.done,`Não concluiu: x=${g.player.x} mini=${g.mini.hp} boss=${g.boss?.hp} lives=${g.player.lives}`);assert.equal(g.route,route);assert.ok(g.mini.dead);assert.ok(g.boss.dead);assert.ok(events.includes('win'));assert.ok(g.time>30);console.log(JSON.stringify({route,seconds:Math.round(g.time),deaths:g.deaths,continues:g.continues,rescues:g.rescued.length,score:g.score}));
});
