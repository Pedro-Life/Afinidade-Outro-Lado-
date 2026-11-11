# PROJETO AFINIDADE — Documento de continuidade

**Versão:** 1.2 (compartilhamento e personalização, 11/11/2026)  
**Status:** website completo para publicação estática; calibração empírica ainda pendente.

## Objetivo
Construir um teste independente de afinidade narrativa com Sangue, Morte, Conhecimento e Energia, inspirado principalmente no universo de Ordem Paranormal, em personagens humanos e nas contradições entre estereótipos e afinidade confirmada. As Relíquias representam extremos narrativos, não perfis humanos alcançáveis nem porcentagens canônicas.

## Fontes de referência
- Universo: https://ordemparanormal.fandom.com/wiki/Elementos_do_Outro_Lado
- Quiz de referência: https://rpgpedia.com/transcender
- Outro teste: https://github.com/04Elementos/4elementos
- Vídeos fornecidos pelo solicitante: https://youtu.be/5bw2ty15fuM e https://youtu.be/aS4FB8Qkv5E
- Capturas e gravações enviadas durante o planejamento, usadas como referência de apresentação e fluxo, sem copiar artes ou perguntas integrais.

## Decisões de produto
1. Website estático publicado no Cloudflare Pages (`https://afinidade-outro-lado.pages.dev`) com atualização automática via GitHub `MPandu1/Afinidade-Outro-Lado-`; público acessa pelo navegador.
2. Modo breve com 24 perguntas e modo profundo com 56.
3. Cada pergunta apresenta sete alternativas fixas e ordenadas: concordo completamente, concordo, concordo parcialmente, neutro, discordo parcialmente, discordo e discordo completamente.
4. Valores brutos: +2, +1, +0,5, 0, −0,5, −1, −2. Questões em posições múltiplas de dez têm peso 2; todas as demais têm peso 1. Normalização por elemento leva em conta a soma dos pesos das próprias questões, com 0=50% e extremos −2=0%, +2=100%.
5. Todos os elementos possuem uma pontuação independente de 0 a 100, sem casas decimais e sem exigência de somar 100%.
6. Resultado apresenta o elemento predominante, uma faceta específica e as porcentagens dos quatro elementos. Empates precisam ser identificados, não mascarados por desempate arbitrário na interface.
7. Experiência visual: interface de pergunta minimalista; resultado cerimonial com fundo escuro ornamentado, sigilo vetorial autoral, título grande, painel de descrição e espectro.
8. Campos opcionais de nome e forma de tratamento (Ele, Ela, Neutro, Prefiro não dizer); a última opção não gera pronome atribuído. Nenhum campo altera a pontuação.
9. Arquétipos compostos autorais para as 12 combinações ordenadas dos dois elementos dominantes. A leitura da Sombra do elemento menor é deliberadamente bem-humorada, não constitui julgamento pessoal.
10. Match narrativo e fictício, usando o elemento mais forte e o mais fraco como contraste; não se apresenta como compatibilidade real.
11. Cartão vertical PNG 1080×1920 feito com Canvas, sem dependências externas de exportação e com prévia e download.
12. Arte de compartilhamento para o link (Open Graph); nenhuma coleta ou transmissão remota de nomes, respostas ou resultados.
13. Não expor os pesos ou parâmetros de cálculo na interface do teste nem no README voltado à publicação.
14. Todas as artes vetoriais deste projeto são originais e não reproduzem os símbolos oficiais diretamente.
15. Tudo deve funcionar sem dependência de servidor, API, banco de dados ou conta de usuário.

## Interpretação atual dos elementos
- Conhecimento: investigação, compreensão, interpretação.
- Energia: mudança, adaptação, autonomia.
- Sangue: vínculos, intensidade, compromisso.
- Morte: tempo, ciclos, contemplação.

## Referências humanas para revisão narrativa
- Carina e Gal: Conhecimento pode coexistir com emoção.
- Kaiser e Rubens: Energia pode coexistir com planejamento e cautela.
- Arthur: Sangue pode ser vínculo e proteção, não violência.
- Dante: Morte pode coexistir com investigação e análise.

## Limites atuais
- O instrumento **não foi validado com participantes**; as porcentagens refletem o modelo de pontuação autoral, não uma probabilidade científica.
- A escala de sete alternativas é simétrica, mas as perguntas atualmente medem cada elemento separadamente e não têm calibração psicométrica com participantes. O maior peso das perguntas em múltiplos de dez deve ser avaliado em estudo empírico.
- Ainda não foi feito estudo de estabilidade teste-reteste, consistência por faceta ou concordância com avaliações independentes do lore.
- O teste não mede exposição paranormal, NEX nem afinidade escolhida oficialmente pela entidade dentro do jogo.

## Testes automatizados incluídos
- 24/56 perguntas, sete alternativas e IDs únicos;
- representação quantitativa igual dos quatro elementos;
- pontuação neutra idêntica para os quatro elementos;
- cada elemento capaz de vencer isoladamente;
- diferenciação das perguntas 10, 20, 30, 40 e 50;
- rejeição de respostas ausentes.

Os testes da versão 1.2 passaram em Node.js (16 casos), cobrindo pontuação, 12 combinações, preferências de tratamento, empates e geração lógica do Canvas. A navegação real do navegador Chromium foi bloqueada por política do ambiente, portanto o visual e o compartilhamento precisam de conferência manual no navegador Android antes de anunciar a versão como completamente testada.

## Próximos passos
1. Testar uso real em celular depois de publicar no GitHub Pages.
2. Convidar participantes de diferentes perfis e coletar **consentimento** para eventual pesquisa; no protótipo não há coleta remota.
3. Revisar perguntas que confundam curiosidade, planejamento, agressividade, tristeza e coragem com elementos específicos.
4. Avaliar empiricamente vieses de aquiescência e desejabilidade social, além do impacto dos pesos de questões especiais.
5. Validar subfacetas e reduzir ambiguidades com usuários e fãs experientes.
6. Incluir situações de escolha contextual, preservando as sete opções por pergunta definidas para esta versão.
7. Testar acessibilidade e exportação de imagens em dispositivos Android reais.

## Publicação
Atualizar os arquivos na raiz da branch `main` do repositório `MPandu1/Afinidade-Outro-Lado-`; a hospedagem principal é Cloudflare Pages com deploy automático. O ZIP sozinho não é interpretado como página; seu conteúdo precisa ser enviado ao repositório.
