# PROJETO AFINIDADE — Documento de continuidade

**Versão:** 1.1 (correções de interface e escala, 10/11/2026)  
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
1. Website estático publicado pelo GitHub Pages; público acessa o link pelo navegador, sem download.
2. Modo breve com 24 perguntas e modo profundo com 56.
3. Cada pergunta apresenta sete alternativas fixas e ordenadas: concordo completamente, concordo, concordo parcialmente, neutro, discordo parcialmente, discordo e discordo completamente.
4. Valores brutos: +2, +1, +0,5, 0, −0,5, −1, −2. Questões em posições múltiplas de dez têm peso 2; todas as demais têm peso 1. Normalização por elemento leva em conta a soma dos pesos das próprias questões, com 0=50% e extremos −2=0%, +2=100%.
5. Todos os elementos possuem uma pontuação independente de 0 a 100, sem casas decimais e sem exigência de somar 100%.
6. Resultado apresenta o elemento predominante, uma faceta específica e as porcentagens dos quatro elementos. Empates precisam ser identificados, não mascarados por desempate arbitrário na interface.
7. Experiência visual: interface de pergunta minimalista; resultado cerimonial com fundo escuro ornamentado, sigilo vetorial autoral, título grande, painel de descrição e espectro.
8. Não expor os pesos ou parâmetros de cálculo na interface do teste nem no README voltado à publicação.
9. Todas as artes vetoriais deste projeto são originais e não reproduzem os símbolos oficiais diretamente.
10. Tudo deve funcionar sem dependência de servidor, API, banco de dados ou conta de usuário.

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

Testes da versão 1.1 passaram em Node.js (9 casos) e foram complementados por simulação de interface em Chromium com tela de celular 412×915. Foram exercitados os fluxos de 24 e 56 perguntas, sete alternativas, textos revisados e porcentagens inteiras no resultado. O navegador do ambiente bloqueia navegação local direta; por isso os testes visuais foram executados com os mesmos conteúdos HTML/CSS/JS injetados na página. O endereço publicado no GitHub Pages ainda precisa de validação no celular.

## Próximos passos
1. Testar uso real em celular depois de publicar no GitHub Pages.
2. Convidar participantes de diferentes perfis e coletar **consentimento** para eventual pesquisa; no protótipo não há coleta remota.
3. Revisar perguntas que confundam curiosidade, planejamento, agressividade, tristeza e coragem com elementos específicos.
4. Avaliar empiricamente vieses de aquiescência e desejabilidade social, além do impacto dos pesos de questões especiais.
5. Validar subfacetas e reduzir ambiguidades com usuários e fãs experientes.
6. Incluir situações de escolha contextual, preservando as sete opções por pergunta definidas para esta versão.
7. Acrescentar opção de exportar imagem do resultado, sem alterar o visual principal.

## Publicação
Subir todos os arquivos para a raiz do repositório, confirmar o workflow de Pages, habilitar GitHub Actions em Settings → Pages, enviar o link final. O ZIP sozinho não é interpretado como página pelo GitHub Pages; os arquivos precisam ser extraídos e enviados ao repositório.
