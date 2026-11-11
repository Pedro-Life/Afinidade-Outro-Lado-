import test from 'node:test';
import assert from 'node:assert/strict';
import {drawResultCard} from '../share-card.js';
import {getQuestions} from '../questions.js';
import {calculate,allAnswers} from '../scoring.js';

function mockCanvas(){
 const recorded=[];
 const gradient=()=>({addColorStop(){}});
 const context={
  beginPath(){},moveTo(){},lineTo(){},quadraticCurveTo(){},closePath(){},arc(){},
  stroke(){},fill(){},fillRect(){},strokeRect(){},save(){},restore(){},setLineDash(){},
  drawImage(){},createLinearGradient:gradient,createRadialGradient:gradient,
  fillText(text){recorded.push(text)},measureText(text){return {width:text.length*15}}
 };
 return {width:0,height:0,recorded,getContext(){return context}};
}

test('cartão é gerado em 1080x1920 e contém elemento, espectro, match e endereço',async()=>{
 const savedImage=globalThis.Image;
 globalThis.Image=class {set src(value){this._src=value;queueMicrotask(()=>this.onload?.())}};
 try{
  const q=getQuestions('rapido');const ans=Object.fromEntries(q.map(item=>[item.id,item.element==='conhecimento'?'completamente':'discordo']));
  const c=mockCanvas();await drawResultCard(c,calculate(q,ans),{name:'Pedro',pronoun:'ele'});
  assert.deepEqual([c.width,c.height],[1080,1920]);
  const content=c.recorded.join(' | ');
  for(const word of ['RESULTADO DE PEDRO','CONHECIMENTO','ESPECTRO','MATCH DE ESPECTRO','SOMBRA','afinidade-outro-lado.pages.dev'])assert.ok(content.includes(word),word);
 }finally{globalThis.Image=savedImage}
});
