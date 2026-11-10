// Bundle já commitado: visitantes não precisam de Node, npm ou rede externa.
import {build} from 'esbuild';
import {readFileSync,writeFileSync} from 'node:fs';
const {version}=JSON.parse(readFileSync('package.json','utf8'));
const outfile=`game-v${version}.js`;
await build({entryPoints:['src/main.js'],bundle:true,minify:true,format:'iife',target:['es2020'],outfile,banner:{js:`/* BRASA DE ACO ${version} — código e arte originais; fonte em src/. */`}});
const html=readFileSync('index.html','utf8');
writeFileSync('index.html',html.replace(/<script[^>]*src="(?:src\/main\.js|game-v[\d.]+\.js)"[^>]*><\/script>/,`<script defer src="${outfile}"></script>`));
console.log(`Bundle estático: ${outfile}`);
