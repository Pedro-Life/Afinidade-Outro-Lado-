import test from 'node:test';
import assert from 'node:assert/strict';
import {QUESTIONS,getQuestions} from '../questions.js';
import {calculate,allAnswers} from '../scoring.js';
import {PRONOUNS,describeResult} from '../profiles.js';
import {ORDER} from '../data.js';

test('quatro opções de tratamento incluindo Prefiro não dizer',()=>{
 assert.deepEqual(PRONOUNS.map(x=>x.key),['ele','ela','neutro','nao_dizer']);
 assert.equal(PRONOUNS.at(-1).label,'Prefiro não dizer');
});
test('os 12 pares ordenados têm arquétipos originais e textos',()=>{
 const names=new Set();
 for(const first of ORDER)for(const second of ORDER){
  if(first===second)continue;
  const r={results:[{key:first,name:first,percentage:90},{key:second,name:second,percentage:60},...ORDER.filter(x=>x!==first&&x!==second).map((x,i)=>({key:x,name:x,percentage:40-i*10}))]};
  const p=describeResult(r);
  assert.ok(p.title.length>=10,`${first}/${second}`);
  assert.ok(p.reading.length>65,`${first}/${second}`);
  assert.ok(!names.has(p.title),`duplicado: ${p.title}`);names.add(p.title);
 }
 assert.equal(names.size,12);
});
test('quatro tratamentos produzem texto correto do match',()=>{
 const q=getQuestions('rapido');const ans=Object.fromEntries(q.map(item=>[item.id,item.element==='conhecimento'?'completamente':'discordo']));
 const r=calculate(q,ans);
 assert.match(describeResult(r,'ele').matchText,/ele,/);
 assert.match(describeResult(r,'ela').matchText,/ela,/);
 assert.match(describeResult(r,'neutro').matchText,/essa pessoa,/);
 assert.doesNotMatch(describeResult(r,'nao_dizer').matchText,/(?:ele,|ela,|essa pessoa,)/);
});
test('empate geral não define sombra nem força classificação única',()=>{
 const q=getQuestions(),r=calculate(q,allAnswers(q));const s=describeResult(r);
 assert.equal(s.allEqual,true);
 assert.equal(s.shadowName,'Sem sombra definida');
 assert.equal(s.title,'Na Fronteira');
});
