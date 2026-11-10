export class Input{
 constructor(options){this.options=options;this.down=new Set();this.pressed=new Set();this.padPrev={};this.connected=false;this.menuPrev=[];}
 key(code,down){if(down){if(!this.down.has(code))this.pressed.add(code);this.down.add(code);}else this.down.delete(code);}
 clear(){this.down.clear();this.pressed.clear();this.padPrev={};}
 sample(){const k=this.options.keys,d=this.down,p=this.pressed,g=(navigator.getGamepads?.()||[])[0],b=n=>g?.buttons[n]?.pressed||false,axis=n=>g?.axes[n]||0;
  const pad={left:axis(0)<-.35||b(14),right:axis(0)>.35||b(15),up:axis(1)<-.45||b(12),down:axis(1)>.45||b(13),shoot:b(2),jump:b(0),grenade:b(1),switch:b(3),interact:b(5),dodge:b(7),pause:b(9),objectives:b(8)};
  const extra={left:['ArrowLeft'],right:['ArrowRight'],up:['ArrowUp'],down:['ArrowDown'],jump:['Space'],pause:['KeyP']};let out={};
  for(const a of Object.keys(k)){out[a]=d.has(k[a])||(extra[a]||[]).some(x=>d.has(x))||pad[a];out[a+'Pressed']=p.has(k[a])||(extra[a]||[]).some(x=>p.has(x))||(pad[a]&&!this.padPrev[a]);}
  this.padPrev=pad;this.pressed.clear();return out;
 }
 menu(){const g=(navigator.getGamepads?.()||[])[0];if(!g)return;const b=n=>!!g.buttons[n]?.pressed,a=g.axes[1]||0;const actions=[a<-.5||b(12),a>.5||b(13),b(0),b(1),b(9)];const edges=actions.map((v,i)=>v&&!this.menuPrev[i]);this.menuPrev=actions;return edges;}
}
