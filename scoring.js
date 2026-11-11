import { ELEMENTS, ORDER } from './data.js';

export const CHOICES = Object.freeze([
  {key:'completamente', label:'Concordo completamente', value:2},
  {key:'concordo', label:'Concordo', value:1},
  {key:'parcialmente', label:'Concordo parcialmente', value:0.5},
  {key:'neutro', label:'Neutro', value:0},
  {key:'discordo_parcialmente', label:'Discordo parcialmente', value:-0.5},
  {key:'discordo', label:'Discordo', value:-1},
  {key:'discordo_completamente', label:'Discordo completamente', value:-2},
]);
const ANSWER_VALUES = Object.fromEntries(CHOICES.map(c => [c.key,c.value]));
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const round=n=>Math.round(n);

/** Mapear respostas ordinais para uma escala centralizada no ponto neutro. */
function preference(value){
  if (value === undefined || !Number.isFinite(value)) return null;
  return clamp(50 + value * 25, 0, 100);
}

/** A resposta de cada elemento é independente. Não há exigência de soma 100%. */
export function calculate(questions, answers){
  if (!Array.isArray(questions) || !questions.length) throw new Error('Perguntas inválidas.');
  const stats = Object.fromEntries(ORDER.map(key=>[key,{sum:0,weight:0,facets:{},count:0}]));
  questions.forEach((q,index)=>{
    if(!q || !ELEMENTS[q.element] || !ELEMENTS[q.element].facets[q.facet]) throw new Error('Pergunta com elemento ou faceta inválidos.');
    const code=answers[q.id];
    if (!Object.hasOwn(ANSWER_VALUES,code)) throw new Error(`Resposta ausente ou inválida: ${q.id}`);
    const response=preference(ANSWER_VALUES[code]);
    const weight=(index+1)%10===0 ? 2 : 1;
    const current=stats[q.element];
    current.sum+=response*weight; current.weight+=weight; current.count++;
    const f=current.facets[q.facet]??{sum:0,weight:0};
    f.sum+=response*weight; f.weight+=weight;
    current.facets[q.facet]=f;
  });
  const results=ORDER.map(key=>{
    const stat=stats[key];
    const percentage=stat.weight ? round(clamp(stat.sum/stat.weight,0,100)):0;
    const facets=Object.entries(ELEMENTS[key].facets).map(([facet,desc])=>{
      const s=stat.facets[facet] ?? {sum:0,weight:0};
      return {id:facet,name:desc.name,percentage:s.weight ? round(clamp(s.sum/s.weight,0,100)):0,weight:s.weight};
    }).sort((a,b)=>b.percentage-a.percentage || a.id.localeCompare(b.id));
    return {key,name:ELEMENTS[key].name,percentage,facets,count:stat.count};
  }).sort((a,b)=>b.percentage-a.percentage||ORDER.indexOf(a.key)-ORDER.indexOf(b.key));
  const lead=results[0], runner=results[1];
  return {results,primary:lead,secondary:runner, subtype:lead.facets[0], close:lead.percentage-runner.percentage<=5, balanced:lead.percentage-results.at(-1).percentage<=5,
     answered:questions.length};
}

export function allAnswers(questions,choice='neutro') {
 return Object.fromEntries(questions.map(q=>[q.id,choice]));
}
