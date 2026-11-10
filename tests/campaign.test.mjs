import test from 'node:test';import assert from 'node:assert/strict';import {Game} from '../src/core.js';import {DT,DEFAULT_OPTIONS} from '../src/data.js';
import{campaignBotInput}from '../tools/campaign-bot.js';
for(const route of ['A','B'])test(`campanha simulada da praia aos resultados pela rota ${route}`,()=>{
 let events=[],g;g=new Game({...DEFAULT_OPTIONS,shield:true},(e,d)=>{events.push(e);if(e==='route')g.chooseRoute(route);});g.reset('lia','recruit');let ticks=0;
 for(;ticks<72000&&!g.done;ticks++){
  if(g.gameover){g.restore(true);}
  g.update(campaignBotInput(g,ticks),DT);
 }
 assert.ok(g.done,`Não concluiu: x=${g.player.x} mini=${g.mini.hp} boss=${g.boss?.hp} lives=${g.player.lives}`);assert.equal(g.route,route);assert.ok(g.mini.dead);assert.ok(g.boss.dead);assert.ok(events.includes('win'));assert.ok(g.time>30);console.log(JSON.stringify({route,seconds:Math.round(g.time),deaths:g.deaths,continues:g.continues,rescues:g.rescued.length,score:g.score}));
});
