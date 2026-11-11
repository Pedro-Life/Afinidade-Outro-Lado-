import { getQuestions } from './questions.js';
import { calculate, CHOICES } from './scoring.js';
import { ELEMENTS, ORDER } from './data.js';

const app=document.querySelector('#app');
const STORE_KEY='afinidade-outro-lado-session-v2';
const LEGACY_STORE_KEY='afinidade-outro-lado-session-v1';
const ICONS={conhecimento:'sigil-conhecimento.svg',energia:'sigil-energia.svg',sangue:'sigil-sangue.svg',morte:'sigil-morte.svg'};
const ASSETS='./assets/';
const state={screen:'home',mode:'completo',questions:[],current:0,answers:{},name:'',result:null};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const percent=n=>`${Math.round(n)}%`;
function persist(){try{localStorage.setItem(STORE_KEY,JSON.stringify({mode:state.mode,current:state.current,answers:state.answers,name:state.name,finished:state.screen==='result'}))}catch{}}
function clear(){try{localStorage.removeItem(STORE_KEY);localStorage.removeItem(LEGACY_STORE_KEY)}catch{}}
function restore(){
  try{
    const current=localStorage.getItem(STORE_KEY);
    const isLegacy=!current && Boolean(localStorage.getItem(LEGACY_STORE_KEY));
    const d=JSON.parse(current||localStorage.getItem(LEGACY_STORE_KEY)||'null');
    if(!d || !['rapido','completo'].includes(d.mode) || !d.answers || typeof d.answers!=='object') return false;
    const questions=getQuestions(d.mode), permitted=new Set(CHOICES.map(c=>c.key));
    const answers=Object.fromEntries(Object.entries(d.answers).map(([id,a])=>[id,isLegacy&&a==='discordo'?'discordo_parcialmente':a]).filter(([id,a])=>questions.some(q=>q.id===id)&&permitted.has(a)));
    if(!Object.keys(answers).length)return false;
    Object.assign(state,{mode:d.mode,questions,answers,name:String(d.name||'').slice(0,28),current:Math.min(Math.max(Number(d.current)||0,0),questions.length-1)});
    if(d.finished&&questions.every(q=>answers[q.id])){state.result=calculate(questions,answers);state.screen='result'}
    else state.screen='home';
    if(isLegacy){persist();localStorage.removeItem(LEGACY_STORE_KEY)}
    return true;
  }catch{return false}
}
function header(){return `<header class="site-header"><a class="brand" href="./" data-home aria-label="Voltar ao início"><span class="brand-mark">✧</span><span>AFINIDADE<span class="brand-sub">O OUTRO LADO</span></span></a><span class="header-tail">UM TESTE DE ELEMENTOS</span></header>`}
function footer(){return `<footer class="site-footer"><span>Uma experiência de fãs inspirada em Ordem Paranormal</span><span>Quatro elementos · Infinitas histórias</span></footer>`}
function appShell(contents){app.innerHTML=`<div class="page-shell">${header()}${contents}${footer()}</div>`;bindCommon();}
function bindCommon(){document.querySelectorAll('[data-home]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();state.screen='home';render()}));}
function sigil(key,extra=''){return `<img ${extra} src="${ASSETS}${ICONS[key]}" width="160" height="160" alt="Símbolo original de ${esc(ELEMENTS[key].name)}">`}
function renderHome(){
  const hasSaved=Object.keys(state.answers).length>0;
  appShell(`<section class="intro" aria-labelledby="intro-title">
    <div class="intro-decoration" aria-hidden="true"><img src="${ASSETS}orbe.svg" alt=""></div>
    <p class="eyebrow"><span class="mini-star">✦</span> UMA ESCOLHA ALÉM DA REALIDADE <span class="mini-star">✦</span></p>
    <h1 id="intro-title">O que existe<br><em>do outro lado</em> de você?</h1>
    <p class="intro-text">Sua curiosidade, seus vínculos, sua relação com o tempo e com o imprevisível. Explore as afinidades que atravessam suas escolhas.</p>
    <div class="mode-grid" role="group" aria-label="Escolher duração">
       <button class="mode-card" data-mode="rapido"><span class="mode-icon" aria-hidden="true">◇</span><strong>Ritual breve</strong><span>24 perguntas</span><small>Uma primeira leitura da sua afinidade</small><span class="mode-action">COMEÇAR <span aria-hidden="true">↗</span></span></button>
       <button class="mode-card featured" data-mode="completo"><span class="mode-icon" aria-hidden="true">✧</span><span class="featured-tag">EXPERIÊNCIA COMPLETA</span><strong>Ritual profundo</strong><span>56 perguntas</span><small>Mais nuances, mais histórias, mais detalhes</small><span class="mode-action">COMEÇAR <span aria-hidden="true">↗</span></span></button>
    </div>
    ${hasSaved?`<div class="continue-row"><button class="ghost-button" id="resume">Continuar meu teste <span aria-hidden="true">→</span></button><button class="link-button" id="erase">Descartar progresso</button></div>`:''}
    <div class="element-strip" aria-label="Os quatro elementos">${ORDER.map(k=>`<div class="element-chip">${sigil(k,'class="element-mini" loading="lazy"')}<span>${ELEMENTS[k].name}</span></div>`).join('')}</div>
  </section>`);
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>start(b.dataset.mode)));
  document.querySelector('#resume')?.addEventListener('click',()=>{state.screen='quiz';render()});
  document.querySelector('#erase')?.addEventListener('click',()=>{clear();Object.assign(state,{answers:{},current:0,questions:[],result:null});render()});
}
function start(mode){state.mode=mode;state.questions=getQuestions(mode);state.current=0;state.answers={};state.result=null;state.screen='quiz';persist();render();}
function questionMarkup(){
  const q=state.questions[state.current],n=state.current+1,total=state.questions.length;
  const currentAnswer=state.answers[q.id];
  const completed=state.questions.filter(item=>Boolean(state.answers[item.id])).length;
  return `<section class="quiz" aria-labelledby="question-title">
     <div class="quiz-top"><div class="breadcrumb">RITUAL <span class="breadcrumb-separator">/</span> ${state.mode==='rapido'?'BREVE':'PROFUNDO'}</div><button class="small-back" id="back-home">Sair <span aria-hidden="true">×</span></button></div>
     <div class="progress-top"><span>QUESTÃO ${String(n).padStart(2,'0')} <span class="progress-dim">/ ${String(total).padStart(2,'0')}</span></span><span>${Math.round(completed/total*100)}% RESPONDIDO</span></div>
     <div class="progress-track" role="progressbar" aria-label="Progresso" aria-valuenow="${completed}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-fill" style="width:${completed/total*100}%"></div></div>
     <div class="question-panel" key="${q.id}">
       <div class="question-ornament" aria-hidden="true">✥</div>
       <p class="question-kicker">CONSIDERE O QUANTO ESTA AFIRMAÇÃO COMBINA COM VOCÊ</p>
       <h1 id="question-title" class="question-title">${esc(q.text)}</h1>
       <div class="answer-options" role="group" aria-label="Escolha uma resposta">
         ${CHOICES.map(c=>`<button type="button" class="answer ${currentAnswer===c.key?'selected':''}" data-answer="${c.key}" aria-pressed="${currentAnswer===c.key?'true':'false'}"><span class="answer-dot" aria-hidden="true"></span><span class="answer-label">${esc(c.label)}</span></button>`).join('')}
       </div>
       <div class="quiz-actions"><button class="outline-button" id="prev" ${n===1?'disabled':''}><span aria-hidden="true">←</span> Voltar</button><button class="solid-button" id="next" ${!currentAnswer?'disabled':''}>${n===total?'VER MINHA AFINIDADE':'CONTINUAR'} <span aria-hidden="true">→</span></button></div>
     </div>
     <p class="quiz-tip">Responda como você realmente costuma agir ou pensar, não como gostaria de parecer.</p>
   </section>`;
}
function renderQuestion(){appShell(questionMarkup());
  document.querySelector('#back-home').addEventListener('click',()=>{state.screen='home';persist();render()});
  document.querySelector('#prev').addEventListener('click',()=>{state.current=Math.max(0,state.current-1);persist();render()});
  document.querySelector('#next').addEventListener('click',next);
  document.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{
    const key=state.questions[state.current].id;state.answers[key]=b.dataset.answer;persist();
    document.querySelectorAll('[data-answer]').forEach(btn=>{const active=btn===b;btn.classList.toggle('selected',active);btn.setAttribute('aria-pressed',String(active))});
    document.querySelector('#next').disabled=false;
    const completed=state.questions.filter(item=>Boolean(state.answers[item.id])).length;
    document.querySelector('.progress-fill').style.width=`${completed/state.questions.length*100}%`;
    document.querySelector('.progress-top span:last-child').textContent=`${Math.round(completed/state.questions.length*100)}% RESPONDIDO`;
  }));
}
function next(){
 const q=state.questions[state.current];if(!state.answers[q.id])return;
 if(state.current<state.questions.length-1){state.current++;persist();render();document.querySelector('#question-title')?.focus?.();window.scrollTo({top:0,behavior:'instant'})}
 else {
  const absent=state.questions.findIndex(q=>!state.answers[q.id]);
  if(absent>=0){state.current=absent;persist();render();return}
  state.result=calculate(state.questions,state.answers);state.screen='result';persist();render();window.scrollTo({top:0,behavior:'instant'});
 }
}
function resultsRows(r){return r.results.map((e,i)=>{
  const m=ELEMENTS[e.key];return `<div class="spectrum-entry ${i===0?'dominant':''}" style="--bar-color:${m.color}"><div class="spectrum-head"><span class="spectrum-name"><span class="spectrum-icon">${sigil(e.key)}</span>${esc(e.name)}${i===0 && r.primary.percentage>r.secondary.percentage?'<span class="tag-top">MAIOR AFINIDADE</span>':''}</span><b>${percent(e.percentage)}</b></div><div class="spectrum-track" role="progressbar" aria-valuenow="${e.percentage}" aria-valuemin="0" aria-valuemax="100" aria-label="Afinidade com ${e.name}"><div class="spectrum-bar" style="width:${e.percentage}%"></div></div></div>`}).join('');}
function renderResult(){const r=state.result; if(!r){state.screen='home';render();return}const key=r.primary.key,m=ELEMENTS[key],sub=m.facets[r.subtype.id];
 const follow=r.primary.facets.slice(1).map(f=>m.facets[f.id].name).join(' • ');
 const other=r.secondary;
 const tied=r.primary.percentage===r.secondary.percentage;
 const topTied=r.results.filter(x=>x.percentage===r.primary.percentage);
 const displayName=tied?'Afinidades':m.name;
 const displaySubtype=tied?'Em equilíbrio':r.subtype.name;
 const displayQuote=tied?'Mais de um caminho pode revelar a mesma força.':m.quote;
 const interpretation=tied?'<p>Suas respostas produziram afinidades igualmente altas com '+topTied.map(x=>esc(x.name)).join(', ')+'. Nenhum desses elementos se destacou dos demais. Explore as quatro porcentagens abaixo para conhecer seu espectro.</p>':`<p>${esc(sub.text)}</p><div class="hairline"></div><h3>${esc(m.name)}</h3><p>${esc(m.text)}</p><div class="lore-small">${esc(m.related)}</div>`;
 appShell(`<section class="result" style="--accent:${m.color};--accent-light:${m.light};--accent-deep:${m.shadow}" aria-labelledby="result-title">
   <div class="result-hero">
      <div class="hero-orb" aria-hidden="true"><img src="${ASSETS}orbe.svg" alt=""></div>
      <span class="eyebrow result-eyebrow">O OUTRO LADO RECONHECE SUA ESSÊNCIA</span>
      <div class="hero-sigil">${tied?`<img src="${ASSETS}orbe.svg" alt="Símbolo de equilíbrio" width="150" height="150">`:sigil(key)}</div>
      <h1 class="result-title" id="result-title">${esc(displayName)}</h1>
      <p class="result-subtitle">${esc(displaySubtype)}</p>
      <p class="result-quote">${esc(displayQuote)}</p>
   </div>
   <div class="result-body">
     <article class="lore-card">
       <p class="section-label">SUA MANIFESTAÇÃO</p>
       <h2>${tied?'Conexões que se encontram':esc(sub.title)}</h2>
       ${interpretation}
     </article>
     <section class="spectrum-card" aria-labelledby="spectrum-title">
       <div class="card-heading"><div><span class="section-label">O SEU ESPECTRO</span><h2 id="spectrum-title">Quatro afinidades</h2></div><div class="spectrum-emblem" aria-hidden="true">✧</div></div>
       ${resultsRows(r)}
       ${r.close?`<p class="spectrum-note">${r.balanced?'Suas afinidades ficaram muito próximas. Nenhum elemento se destacou com clareza.':`Sua afinidade com ${esc(other.name)} também ficou próxima da principal.`}</p>`:''}
     </section>
     <section class="subtype-card" aria-label="Nuances do resultado"><div class="section-label">O OUTRO LADO TAMBÉM PERCEBEU</div><div class="subtype-tags">${r.primary.facets.slice(1).map(f=>`<span class="facet-pill">${esc(f.name)}</span>`).join('')}<span class="facet-pill mixed">${esc(other.name)}</span></div><p>Seu perfil não precisa caber em uma única característica. Essas afinidades podem coexistir.</p></section>
     <div class="result-actions"><button class="solid-button" id="share">COMPARTILHAR RESULTADO <span aria-hidden="true">↗</span></button><button class="outline-button" id="restart">FAZER NOVAMENTE <span aria-hidden="true">↺</span></button></div>
     <div class="disclaimer">Experiência independente de fãs inspirada no universo de Ordem Paranormal. O resultado interpreta suas respostas e não determina uma afinidade canônica.</div>
   </div>
 </section>`);
 document.querySelector('#restart').addEventListener('click',()=>{clear();state.screen='home';state.answers={};state.questions=[];state.current=0;state.result=null;render();window.scrollTo({top:0,behavior:'instant'})});
 document.querySelector('#share').addEventListener('click',async()=>{
  const resultText=`Minha afinidade em O Outro Lado: ${m.name} (${r.primary.percentage}%) — ${r.subtype.name}.\n${r.results.map(e=>`${e.name}: ${e.percentage}%`).join(' · ')}\nTeste: ${location.origin+location.pathname}`;
  try{if(navigator.share){await navigator.share({title:'Minha afinidade — O Outro Lado',text:resultText})}else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(resultText);toast('Resultado copiado para compartilhar.')}else{copyFallback(resultText);toast('Resultado copiado para compartilhar.')}}catch(e){if(e?.name!=='AbortError')toast('Não foi possível compartilhar. Você pode fazer uma captura de tela.');}
 });
}
function copyFallback(value){const area=document.createElement('textarea');area.value=value;area.style.position='fixed';area.style.left='-9999px';document.body.append(area);area.select();document.execCommand('copy');area.remove()}
function toast(msg){let n=document.querySelector('.toast');if(!n){n=document.createElement('div');n.className='toast';n.setAttribute('role','status');document.body.appendChild(n)}n.textContent=msg;n.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>n.classList.remove('visible'),3000)}
function render(){document.body.classList.toggle('result-page',state.screen==='result'); if(state.screen==='quiz')renderQuestion();else if(state.screen==='result')renderResult();else renderHome()}
document.addEventListener('keydown',e=>{
 if(state.screen!=='quiz'||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea'))return;
 if(/^[1-7]$/.test(e.key)){document.querySelectorAll('[data-answer]')[Number(e.key)-1]?.click()}
 if(e.key==='Enter' && e.target.tagName!=='BUTTON' && !document.querySelector('#next')?.disabled)next();
});
restore();render();
