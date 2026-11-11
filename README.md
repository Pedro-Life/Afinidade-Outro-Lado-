# Afinidade — O Outro Lado

**Versão oficial:** 1.0.0 (estável).

Site independente de fãs inspirado no universo de **Ordem Paranormal**, criado para funcionar em celulares e computadores sem instalar aplicativo.

**Site:** https://afinidade-outro-lado.pages.dev

## O que há nesta versão

- Dois modos: **Ritual breve** (24 perguntas) e **Ritual profundo** (56 perguntas).
- Nome opcional e escolha de como aparecer no resultado: **Ele, Ela, Neutro ou Prefiro não dizer**.
- Resultado com elemento predominante, **quatro porcentagens inteiras**, arquétipo composto, descrição da dualidade, Sombra bem-humorada e Match de espectro.
- **Gerador de imagem PNG 1080 × 1920 (9:16)**, com prévia, download e compartilhamento pelo próprio navegador quando disponível.
- Página inicial com prévia do resultado e opção de continuar um teste interrompido.
- Dados e respostas salvos **somente neste navegador**, sem envio para um servidor do projeto.
- Arquivos estáticos, sem cadastro ou infraestrutura paga para o funcionamento básico.

A leitura dos elementos e do match é temática, não científica. Os textos, as perguntas e os símbolos desta implementação são autorais. Esta experiência não é oficial.

## Atualização do site publicado

O projeto do usuário está no repositório público [MPandu1/Afinidade-Outro-Lado-](https://github.com/MPandu1/Afinidade-Outro-Lado-). Basta atualizar os arquivos na branch `main` para que o Cloudflare Pages publique uma versão nova automaticamente. O `index.html` deve continuar na raiz.

Pelo Android com Termux, pode-se usar o script distribuído separadamente, script de publicação para a versão 1.0.0 (disponibilizado separadamente, quando solicitado), após baixar o ZIP para a pasta Downloads e autenticar o GitHub CLI com a conta certa.

## Testar localmente

Como há módulos JavaScript, abra com servidor HTTP, e não como arquivo `file://`:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000/`. Para executar os testes automatizados, use:

```bash
node --test
```

## Arquivos principais

- `index.html`, `styles.css`, `app.js`: interface e navegação.
- `questions.js`, `data.js`, `scoring.js`: perguntas e funcionamento do teste.
- `profiles.js`: nomes dos arquétipos, textos de Sombra e Match.
- `share-card.js`: cartão vertical desenhado no navegador.
- `assets/`: símbolos vetoriais, ícone e arte de compartilhamento.
- `tests/`: verificações automatizadas de funcionamento.
- `.github/workflows/pages.yml`: publicação alternativa via GitHub Pages.
- `PLANO_DO_PROJETO.md`: decisões e limitações para continuidade técnica.
