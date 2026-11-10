// QA somente por comandos normais. Reage a avisos, conserva foguetes e não altera o mundo.
const holds=new WeakMap();
export function campaignBotInput(g,tick){
 const p=g.player,boss=g.boss?.active,mini=g.mini.active&&!g.mini.dead;
 let right=p.x<(boss?3970:mini?2390:4200),left=boss&&p.x>3985;
 const b=g.boss;
 if(boss&&b.warning>0&&b.pattern===0&&Math.abs(p.x-b.targetX)<46){left=p.x>3890;right=!left;}
 const incoming=g.bullets.some(a=>a.hostile&&a.x>p.x&&a.x-p.x<65&&a.y>p.y+8&&a.y<p.y+35);
 const sweep=boss&&b.pattern===2&&(b.warning>0||g.hazards.some(h=>h.type==='sweep'));
 const grenade=g.grenades.some(a=>a.hostile&&a.timer<.55&&Math.abs(a.x-p.x)<55);
 let until=holds.get(g)||0;const jumpPressed=!p.vehicle&&p.ground&&(incoming||sweep||grenade||!mini&&!boss&&tick%90===0);if(jumpPressed)until=tick+30;holds.set(g,until);
 const gun=g.gun(),rockets=p.slots.some(s=>s.id===3&&s.ammo>0);
 return {right,left,shoot:true,jump:tick<until,jumpPressed,switchPressed:!p.vehicle&&((!boss&&!mini&&gun.id===3)||(boss&&rockets&&gun.id!==3)),grenadePressed:(mini||boss)&&tick%70===0,interactPressed:!g.route&&p.x>935||g.mini.dead&&!p.vehicle&&!g.vehicle.dead&&Math.abs(p.x-g.vehicle.x)<30};
}
