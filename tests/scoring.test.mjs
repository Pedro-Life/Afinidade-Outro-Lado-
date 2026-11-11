import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS,getQuestions } from '../questions.js';
import { CHOICES,calculate,allAnswers } from '../scoring.js';
import { ELEMENTS,ORDER } from '../data.js';

test('as duas modalidades têm 24/56 perguntas originais',()=>{
  assert.equal(QUESTIONS.length,56);
  assert.equal(getQuestions('rapido').length,24);
  assert.equal(getQuestions('completo').length,56);
  assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,56);
  assert.equal(CHOICES.length,7);
  assert.deepEqual(CHOICES.map(c=>c.value),[2,1,0.5,0,-0.5,-1,-2]);
});
test('os quatro elementos estão equilibrados em cada modalidade',()=>{
  for(const mode of ['rapido','completo']){
    const items=getQuestions(mode),counts=Object.fromEntries(ORDER.map(k=>[k,items.filter(q=>q.element===k).length]));
    assert.deepEqual(Object.values(counts),[items.length/4,items.length/4,items.length/4,items.length/4]);
    for (const q of items)assert.ok(ELEMENTS[q.element].facets[q.facet],q.id);
  }
});
test('resposta neutra produz 50% em cada elemento',()=>{
 for(const mode of ['rapido','completo']){
   const q=getQuestions(mode),r=calculate(q,allAnswers(q));
   assert.deepEqual(r.results.map(e=>e.percentage),[50,50,50,50]);
 }
});
test('concordância integral com todas retorna 100% e sem decimais',()=>{
 const q=getQuestions(),r=calculate(q,allAnswers(q,'completamente'));
 assert.deepEqual(r.results.map(e=>e.percentage),[100,100,100,100]);
 assert.ok(r.balanced);
});
test('cada elemento pode vencer sozinho, nos dois modos',()=>{
 for(const mode of ['rapido','completo']){
  const q=getQuestions(mode);
  for(const key of ORDER){
   const a=Object.fromEntries(q.map(x=>[x.id,x.element===key?'completamente':'discordo']));
   const r=calculate(q,a);
   assert.equal(r.primary.key,key);
   assert.equal(r.primary.percentage,100);
   assert.deepEqual(r.results.slice(1).map(x=>x.percentage),[25,25,25]);
  }
 }
});
test('as respostas discordantes respeitam a escala simétrica',()=>{
 const qs=getQuestions('rapido');
 for (const [key,want] of [['completamente',100],['concordo',75],['parcialmente',63],['neutro',50],['discordo_parcialmente',38],['discordo',25],['discordo_completamente',0]]) {
  const r=calculate(qs,allAnswers(qs,key));
  assert.deepEqual(r.results.map(e=>e.percentage),[want,want,want,want],key);
 }
});
test('questões 10, 20, 30, 40 e 50 têm peso duplicado, sem duplicar as outras',()=>{
 const qs=getQuestions('completo');
 const base=allAnswers(qs);
 const single=(i)=>calculate(qs,{...base,[qs[i-1].id]:'completamente'}).results.find(r=>r.key===qs[i-1].element).percentage;
 for(const [a,b] of [[9,10],[19,20],[29,30],[39,40],[49,50]]){
  const small=single(a),large=single(b);
  // Com os elementos diferentes em algumas posições, a escala é normalizada por peso de cada elemento.
  assert.ok(large>small,`a questão ${b} (${large}%) deve pesar mais do que a ${a} (${small}%)`);
 }
 const start=single(1),fifth=single(5);
 assert.equal(start,fifth,'a quinta questão não recebe peso adicional');
});
test('no ritual breve são reforçadas apenas as questões 10 e 20',()=>{
 const qs=getQuestions('rapido');
 const base=allAnswers(qs);
 for (const [i,expectedWeight] of [[1,1],[5,1],[10,2],[20,2],[21,1]]) {
  const q=qs[i-1];
  const r=calculate(qs,{...base,[q.id]:'completamente'}).results.find(x=>x.key===q.element);
  const count=qs.filter(x=>x.element===q.element).length;
  const totalWeight=count+qs.filter((x,idx)=>x.element===q.element&&(idx+1)%10===0).length;
  assert.equal(r.percentage,Math.round(50+50*expectedWeight/totalWeight),`questão ${i}`);
 }
});
test('uma resposta faltante não produz porcentagem',()=>{
 const q=getQuestions('rapido');assert.throws(()=>calculate(q,{}),/ausente/);
});
