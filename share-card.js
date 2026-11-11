import {ELEMENTS} from './data.js';
import {describeResult} from './profiles.js';

const W=1080,H=1920;
function rounded(ctx,x,y,w,h,r=20){
  const rr=Math.min(r,w/2,h/2);
  ctx.beginPath();ctx.moveTo(x+rr,y);ctx.lineTo(x+w-rr,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+rr);ctx.lineTo(x+w,y+h-rr);
  ctx.quadraticCurveTo(x+w,y+h,x+w-rr,y+h);ctx.lineTo(x+rr,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-rr);ctx.lineTo(x,y+rr);
  ctx.quadraticCurveTo(x,y,x+rr,y);ctx.closePath();
}
function wrapLines(ctx, text, maxWidth, maxLines=Infinity){
  const words=String(text).split(/\s+/).filter(Boolean),lines=[];let line='';
  for (const word of words) {
    const test=line?`${line} ${word}`:word;
    if(ctx.measureText(test).width<=maxWidth || !line){line=test;continue;}
    lines.push(line);line=word;
  }
  if(line)lines.push(line);
  if(lines.length<=maxLines)return lines;
  const cropped=lines.slice(0,maxLines),all=cropped[maxLines-1].split(/\s+/);
  while(all.length&&ctx.measureText(all.join(' ')+'…').width>maxWidth)all.pop();
  cropped[maxLines-1]=all.join(' ')+'…';return cropped;
}
function textLines(ctx,text,x,y,maxWidth,options={}){
  const {size=32,color='#eee7dd',family='Arial, sans-serif',weight='400',lineHeight=1.3,maxLines=Infinity,align='left',italic=false}=options;
  ctx.fillStyle=color;ctx.textAlign=align;
  ctx.font=`${italic?'italic ':''}${weight} ${size}px ${family}`;
  const lines=wrapLines(ctx,text,maxWidth,maxLines);
  lines.forEach((line,index)=>ctx.fillText(line,x,y+index*size*lineHeight));
  return y+lines.length*size*lineHeight;
}
function fitCenter(ctx,text,y,maxWidth,size,color,options={}){
  const {weight='400',family='Georgia, serif',min=25}=options;
  while(size>min){ctx.font=`${weight} ${size}px ${family}`;if(ctx.measureText(text).width<=maxWidth)break;size-=2}
  ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(text,W/2,y);
  return size;
}
function line(ctx,x1,y1,x2,y2,color='#d5b67f',alpha=1){
 ctx.save();ctx.strokeStyle=color;ctx.globalAlpha=alpha;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.restore();
}
function gradientRound(ctx,x,y,w,h,stroke,fill){
 ctx.save();rounded(ctx,x,y,w,h,24);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();ctx.restore();
}
function loadImage(url){return new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=url})}
function pLabel(ctx,value,x,y,color='#bda57e'){
  ctx.textAlign='left';ctx.fillStyle=color;ctx.font='700 22px Arial, sans-serif';
  ctx.fillText(String(value).toUpperCase(),x,y);
}

/** Desenha um cartão único e independente de bibliotecas remotas. */
export async function drawResultCard(canvas,result,personal={},opts={}){
  canvas.width=W;canvas.height=H;
  const ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx)throw new Error('Navegador sem Canvas 2D');
  const story=describeResult(result,personal.pronoun);
  const key=story.primary.key;
  const theme=ELEMENTS[key];
  const name=String(personal.name||'').replace(/\s+/g,' ').trim().slice(0,24);
  const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#191716');bg.addColorStop(.44,'#0b0d14');bg.addColorStop(1,'#14131a');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  const glow=ctx.createRadialGradient(W/2,330,20,W/2,340,600);glow.addColorStop(0,theme.color+'42');glow.addColorStop(1,'#00000000');ctx.fillStyle=glow;ctx.fillRect(0,0,W,780);
  // Moldura fina e cantos ornamentais.
  ctx.strokeStyle=theme.color+'72';ctx.lineWidth=2;ctx.strokeRect(38,38,1004,1844);
  ctx.strokeStyle=theme.color+'28';ctx.strokeRect(52,52,976,1816);
  for(const xx of [38,1042])for(const yy of [38,1882]){
    line(ctx,xx-13,yy,xx+13,yy,theme.color,.85);line(ctx,xx,yy-13,xx,yy+13,theme.color,.85);
  }
  pLabel(ctx,'AFINIDADE / O OUTRO LADO',84,107,'#e6cc99');
  ctx.font='500 22px Arial, sans-serif';ctx.fillStyle='#b7adb0';ctx.textAlign='right';ctx.fillText('SEU ESPECTRO',996,107);
  if(name){
    fitCenter(ctx,`RESULTADO DE ${name.toUpperCase()}`,160,880,28,'#d4c5b9',{family:'Arial, sans-serif',weight:'700',min:18});
  }else{
    fitCenter(ctx,'O OUTRO LADO RECONHECE SUA ESSÊNCIA',160,880,25,'#cab897',{family:'Arial, sans-serif',weight:'700',min:19});
  }
  // Halo e sigilo do elemento principal.
  ctx.strokeStyle=theme.color+'40';ctx.lineWidth=2;ctx.beginPath();ctx.arc(540,300,145,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(540,300,167,0,Math.PI*2);ctx.setLineDash([5,13]);ctx.stroke();ctx.setLineDash([]);
  const iconUrl=`${opts.ASSETS||'./assets/'}sigil-${key}.svg`;
  const symbol=await loadImage(iconUrl);
  if(symbol){ctx.drawImage(symbol,419,179,242,242)}
  else{fitCenter(ctx,'✧',359,320,190,theme.color)}
  fitCenter(ctx,story.tie?'AFINIDADES':theme.name.toUpperCase(),510,915,100,'#fff6ed',{weight:'400',min:64});
  fitCenter(ctx,story.composite.toUpperCase(),557,870,23,theme.light,{family:'Arial, sans-serif',weight:'700',min:18});
  pLabel(ctx,'ARQUÉTIPO COMPOSTO',84,628,theme.color);
  fitCenter(ctx,story.title,706,930,59,'#fff5e5',{min:39});
  line(ctx,84,738,996,738,theme.color,.65);
  // Espectro numericamente idêntico à tela, ordenado do maior para o menor.
  gradientRound(ctx,76,764,928,386,theme.color+'66','#15151b');
  pLabel(ctx,'ESPECTRO',112,805,'#e5c48d');
  for(let i=0;i<result.results.length;i++){
    const e=result.results[i],style=ELEMENTS[e.key];
    const y=845+i*75;
    ctx.textAlign='left';ctx.font='600 28px Arial, sans-serif';ctx.fillStyle='#e8e1da';ctx.fillText(e.name,112,y);
    ctx.textAlign='right';ctx.font='700 31px Arial, sans-serif';ctx.fillStyle='#fcf7ed';ctx.fillText(`${Math.round(e.percentage)}%`,964,y);
    rounded(ctx,112,y+18,852,17,8);ctx.fillStyle='#33323b';ctx.fill();
    if(e.percentage>0){rounded(ctx,112,y+18,852*e.percentage/100,17,Math.min(8,852*e.percentage/200));ctx.fillStyle=style.color;ctx.fill()}
  }
  // Leitura curta dos dois elementos mais fortes.
  pLabel(ctx,'LEITURA DA SUA DUALIDADE',84,1194,theme.color);
  textLines(ctx,story.reading,84,1236,912,{size:28,lineHeight:1.23,maxLines:4,color:'#eee4d9'});
  line(ctx,84,1380,996,1380,'#9c866b',.4);
  pLabel(ctx,`SOMBRA / ${story.shadowName}`,84,1419,'#dcc79f');
  textLines(ctx,story.shadowText,84,1462,912,{size:29,lineHeight:1.23,maxLines:2,color:'#e8ded5'});
  line(ctx,84,1530,996,1530,'#9c866b',.4);
  pLabel(ctx,'MATCH DE ESPECTRO',84,1568,'#dcc79f');
  fitCenter(ctx,story.matchName,1623,912,42,'#f8ead1',{weight:'400',min:30});
  textLines(ctx,story.matchText,84,1665,912,{size:25,lineHeight:1.2,maxLines:3,color:'#d5cac4'});
  line(ctx,84,1753,996,1753,theme.color,.5);
  textLines(ctx,`“${story.quote}”`,540,1793,890,{size:28,lineHeight:1.16,maxLines:2,color:'#f1e1c3',italic:true,family:'Georgia, serif',align:'center'});
  fitCenter(ctx,'afinidade-outro-lado.pages.dev',1867,920,25,'#e1c58f',{family:'Arial, sans-serif',weight:'600',min:22});
  return canvas;
}
