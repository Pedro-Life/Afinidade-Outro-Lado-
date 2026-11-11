import test from 'node:test';
import assert from 'node:assert/strict';
import {getQuestions} from '../questions.js';
import {allAnswers} from '../scoring.js';

function fakeDOM(saved){
 const app={innerHTML:''};
 const stub={addEventListener(){},classList:{add(){},remove(){},toggle(){}},style:{}};
 globalThis.document={
  body:{classList:{toggle(){},add(){},remove(){}}},
  querySelector(selector){return selector==='#app'?app:stub},
  querySelectorAll(){return []},addEventListener(){}
 };
 globalThis.localStorage={getItem:(k)=>k==='afinidade-outro-lado-session-v2'?saved:null,setItem(){},removeItem(){}};
 return app;
}

test('tela inicial mostra a prévia do resultado e os modos do ritual',async()=>{
 const app=fakeDOM(null);
 await import('../app.js?unit=home');
 for(const txt of ['Um resultado que vale compartilhar','99%','Ritual profundo','Ritual breve'])assert.ok(app.innerHTML.includes(txt),txt);
 assert.ok(!app.innerHTML.includes('SEU NOME'));
});
test('resultado abre com arquétipo, sombra, match e botão 9:16, sem injeção de HTML no nome',async()=>{
 const qs=getQuestions('rapido'),answers=Object.fromEntries(qs.map(q=>[q.id,q.element==='conhecimento'?'completamente':'discordo']));
 const saved=JSON.stringify({mode:'rapido',current:23,answers,name:'<Pedro>',pronoun:'ela',finished:true});
 const app=fakeDOM(saved);
 await import('../app.js?unit=result');
 for(const txt of ['SEU ARQUÉTIPO COMPOSTO','SUA SOMBRA','MATCH DE ESPECTRO','GERAR CARTÃO 9:16','Para acompanhar ela'])assert.ok(app.innerHTML.includes(txt),txt);
 assert.ok(!app.innerHTML.includes('<Pedro>'));
 assert.ok(app.innerHTML.includes('&lt;Pedro&gt;'));
});
