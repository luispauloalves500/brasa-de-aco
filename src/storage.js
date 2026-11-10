import {DEFAULT_OPTIONS,DEFAULT_KEYS} from './data.js';
import {validSave} from './core.js';
export const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return(h>>>0).toString(16);};
export const pack=data=>{let body=JSON.stringify(data);return JSON.stringify({body,checksum:hash(body)});};
export function unpack(s){if(typeof s!=='string'||s.length>250000)throw Error('Invalid envelope');let x=JSON.parse(s);if(typeof x.body!=='string'||hash(x.body)!==x.checksum)throw Error('Checksum mismatch');const data=JSON.parse(x.body);if(!validSave(data))throw Error('Invalid schema');return data;}
export class Storage{
 constructor(){this.available=true;this.bad=false;try{this.opts=JSON.parse(localStorage.getItem('brasa-options')||'{}');}catch{this.opts={};}if(!this.opts||typeof this.opts!=='object'||Array.isArray(this.opts))this.opts={};this.options={...DEFAULT_OPTIONS,keys:{...DEFAULT_KEYS}};for(const [k,v]of Object.entries(this.opts)){if(k==='keys'&&v&&typeof v==='object'){for(const a of Object.keys(DEFAULT_KEYS))if(typeof v[a]==='string'&&v[a].length<25)this.options.keys[a]=v[a];}else if(k==='lang'&&['pt','en'].includes(v))this.options[k]=v;else if(typeof DEFAULT_OPTIONS[k]==='boolean'&&typeof v==='boolean')this.options[k]=v;else if(typeof DEFAULT_OPTIONS[k]==='number'&&Number.isFinite(v)&&v>=0&&v<=1)this.options[k]=v;}}
 read(){try{const raw=localStorage.getItem('brasa-save');if(!raw)return null;return unpack(raw);}catch{this.bad=true;return null;}}
 write(data){if(this.bad)return false;try{const old=localStorage.getItem('brasa-save');if(old){localStorage.setItem('brasa-save-backup2',localStorage.getItem('brasa-save-backup1')||old);localStorage.setItem('brasa-save-backup1',old);}localStorage.setItem('brasa-save',pack(data));return true;}catch{this.available=false;return false;}}
 allowNew(){if(this.bad){try{localStorage.setItem('brasa-invalid-preserved',localStorage.getItem('brasa-save')||'');}catch{}this.bad=false;}}
 saveOptions(){try{localStorage.setItem('brasa-options',JSON.stringify(this.options));}catch{this.available=false;}}
 record(data){const key=`brasa-record-${data.difficulty}-${this.options.shield||this.options.assist?'assisted':'standard'}`;try{const prev=JSON.parse(localStorage.getItem(key)||'null');if(!prev||data.score>prev.score)localStorage.setItem(key,JSON.stringify({score:data.score,time:data.time,rescues:data.rescued.length}));}catch{}}
}
