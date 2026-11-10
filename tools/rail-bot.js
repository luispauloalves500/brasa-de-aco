// Deterministic QA player: normal inputs only. No teleports, HP changes or damage API.
const memory=new WeakMap();
export function railBotInput(g,tick){
 const p=g.player,boss=g.boss?.active,heavy=g.mini.active&&!g.mini.dead;
 let right=p.x<(boss?3970:4200),left=!!boss&&p.x>3985;
 if(boss){const danger=g.railHazards.find(h=>h.life>0&&p.x+p.w>h.x-8&&p.x<h.x+h.w+8);if(danger){left=p.x>3890;right=!left;}else if(g.boss.warning>0&&g.boss.pattern===1&&Math.abs(p.x-g.boss.targetX)<40){left=p.x>3900;right=!left;}}
 const incoming=g.bullets.some(b=>b.hostile&&b.x>p.x&&b.x-p.x<55&&b.y>p.y+10&&b.y<p.y+35);
 let hold=memory.get(g)||0;const jumpPressed=!p.vehicle&&((!boss&&tick%90===0)||(incoming&&p.ground));if(jumpPressed)hold=tick+30;memory.set(g,hold);
 const gun=g.gun(),rockets=p.slots.some(s=>s.id===3&&s.ammo>0);
 const switchPressed=!p.vehicle&&((!boss&&!heavy&&gun.id===3)||(boss&&rockets&&gun.id!==3));
 return {right,left,shoot:true,jump:tick<hold,jumpPressed,switchPressed,grenadePressed:(heavy||boss)&&tick%70===0,
 interactPressed:p.vehicle&&p.x>2955||!g.route&&p.x>935||!p.vehicle&&p.x<2850&&!g.vehicle.dead&&Math.abs(p.x-g.vehicle.x)<30||g.route==='A'&&[1585,1770].some(x=>Math.abs(p.x-x)<12)};
}
