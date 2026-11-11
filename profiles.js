/** Leituras narrativas autorais. Sem inferências sobre compatibilidade real. */
export const PRONOUNS = Object.freeze([
  {key:'ele', label:'Ele'},
  {key:'ela', label:'Ela'},
  {key:'neutro', label:'Neutro'},
  {key:'nao_dizer', label:'Prefiro não dizer'},
]);

const ARCHETYPES = Object.freeze({
  'conhecimento:energia': {
    name:'Cartógrafo do Impossível',
    reading:'Você procura padrões onde tudo parece mudar. Sua curiosidade encontra caminhos novos mesmo quando ninguém entregou um mapa.'
  },
  'conhecimento:sangue': {
    name:'Decifrador de Laços',
    reading:'Você quer entender o mundo, mas não ignora quem vive nele. Entre pistas e sentimentos, encontra perguntas que também são pessoais.'
  },
  'conhecimento:morte': {
    name:'Arquivista dos Ecos',
    reading:'Você investiga o presente sem esquecer o que veio antes. Detalhes e memórias ajudam a dar sentido ao tempo.'
  },
  'energia:conhecimento': {
    name:'Inventor de Caminhos',
    reading:'Você gosta de descobrir como algo funciona — e de imaginar como poderia funcionar de outro jeito. Seu plano favorito talvez seja o próximo.'
  },
  'energia:sangue': {
    name:'Chama Fora do Roteiro',
    reading:'Você busca movimento, mas seus vínculos dão direção à aventura. O inesperado é melhor quando há algo que realmente importa.'
  },
  'energia:morte': {
    name:'Viajante dos Ciclos',
    reading:'Você se transforma sem perder de vista o que já viveu. Cada recomeço pode abrir um caminho que antes parecia invisível.'
  },
  'sangue:conhecimento': {
    name:'Guardião de Segredos',
    reading:'Você sente intensamente e quer entender o que está por trás disso. Cuidar também pode significar perguntar, escutar e decifrar.'
  },
  'sangue:energia': {
    name:'Coração Sem Roteiro',
    reading:'Quando algo importa, você se envolve de verdade. E, se o mundo muda de direção, encontra outras maneiras de continuar.'
  },
  'sangue:morte': {
    name:'Memória em Chamas',
    reading:'Você sente o peso das experiências que marcaram sua história. Algumas conexões não desaparecem só porque o tempo passou.'
  },
  'morte:conhecimento': {
    name:'Leitor de Ecos',
    reading:'Você observa, relembra e investiga. Nem toda resposta aparece de imediato: algumas se revelam quando os detalhes se encontram.'
  },
  'morte:energia': {
    name:'Artífice dos Recomeços',
    reading:'Você enxerga o valor de cada fase, mas não teme uma mudança de rota. Sabe que até o inesperado pode virar parte da história.'
  },
  'morte:sangue': {
    name:'Guardião do Inesquecível',
    reading:'Você reconhece o valor do que passou e dos laços que ficaram. Há momentos que merecem ser lembrados mesmo depois do fim.'
  }
});

const SHADOWS = Object.freeze({
  morte:'Paciência? Só se der para pular a parte da espera.',
  sangue:'Se o assunto vira drama, você já procura o botão de silenciar.',
  energia:'Surpresas são ótimas — quando avisam com três dias de antecedência.',
  conhecimento:'Você gosta de respostas. De preferência, sem quarenta páginas de explicação.'
});

const QUOTES = Object.freeze({
  conhecimento:'Para alguns, o desconhecido assusta. Para você, ele faz perguntas.',
  energia:'Quando o mundo muda as regras, você procura uma saída no mapa.',
  sangue:'Nem toda força faz barulho. Algumas apenas se recusam a abandonar.',
  morte:'O tempo passa. Certas histórias continuam falando.'
});

const REFERRALS = Object.freeze({
  ele: 'Para acompanhar ele, vale alguém com',
  ela: 'Para acompanhar ela, vale alguém com',
  neutro: 'Para acompanhar essa pessoa, vale alguém com',
  nao_dizer: 'Um match que renderia história tem'
});

export function describeResult(result, pronoun='nao_dizer') {
  if (!result || !result.results?.length) throw new Error('Resultado ausente');
  const first=result.results[0],second=result.results[1],lowest=result.results.at(-1);
  const tie = first.percentage === second.percentage;
  const allEqual = first.percentage === lowest.percentage;
  const pair=ARCHETYPES[`${first.key}:${second.key}`];
  if (!pair) throw new Error('Combinação de elementos sem perfil.');
  const pronounKey=Object.hasOwn(REFERRALS,pronoun) ? pronoun : 'nao_dizer';
  const matchKeys= [lowest,first];
  return {
    title: tie ? 'Na Fronteira' : pair.name,
    composite: tie ? `Entre ${first.name} e ${second.name}` : `${first.name} + ${second.name}`,
    reading: allEqual ? 'Os quatro elementos responderam na mesma intensidade. Nem o Outro Lado conseguiu decidir de que lado você está.' :
      tie ? `Sua afinidade com ${first.name} e ${second.name} ficou empatada. Duas forças dividem o protagonismo no seu espectro.` : pair.reading,
    shadowName: allEqual ? 'Sem sombra definida' : lowest.name,
    shadowText: allEqual ? 'Quando tudo empata, até o Outro Lado pede um critério de desempate.' : SHADOWS[lowest.key],
    quote:tie ? 'Há caminhos que se encontram antes de escolher uma direção.' : QUOTES[first.key],
    matchName: allEqual ? 'Todos os elementos' : `${matchKeys[0].name} + ${matchKeys[1].name}`,
    matchText:allEqual ? 'Com esse equilíbrio, qualquer combinação pode render uma boa história.' : `${REFERRALS[pronounKey]} ${lowest.name} em destaque e ${first.name} na bagagem. Um pouco de contraste costuma render boas histórias.`,
    matchSecondary: 'É uma brincadeira entre espectros, não uma previsão sobre relacionamentos.',
    primary:first,
    secondary:second,
    shadow:lowest,
    tie,
    allEqual
  };
}
