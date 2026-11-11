# Afinidade — O Outro Lado

Teste interativo de afinidade inspirado no universo de **Ordem Paranormal**, com quatro elementos e resultados visuais. Projeto independente de fãs, com ilustrações vetoriais e perguntas originais.

## Publicar gratuitamente no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `afinidade-outro-lado`.
2. Extraia o ZIP e envie **o conteúdo da pasta `afinidade-outro-lado`** para a raiz do repositório. O `index.html` precisa ficar na raiz, não dentro de outra pasta.
3. Em **Settings → Pages**, escolha **GitHub Actions** como fonte de publicação.
4. A página será publicada automaticamente após enviar os arquivos. Acompanhe **Actions** para ver a publicação.
5. Acesse `https://SEU-USUARIO.github.io/afinidade-outro-lado/` (substitua usuário e nome do repositório).

A pessoa que responder ao teste precisa apenas do endereço, inclusive no Android ou iPhone. Não precisa instalar programas, criar conta ou baixar o ZIP.

## Abrir no computador

Como o projeto utiliza módulos JavaScript, abra com um servidor local simples. Por exemplo, na pasta do projeto:

```bash
python -m http.server 8000
```

Visite `http://localhost:8000/`. Alternativamente, publique pelo GitHub Pages.

## Arquivos

- `index.html`: entrada da aplicação.
- `styles.css`: aparência e adaptação ao celular.
- `app.js`: interface, navegação e resultados.
- `questions.js`: banco de perguntas.
- `data.js`: descrições dos elementos e perfis.
- `scoring.js`: cálculo dos resultados.
- `assets/`: ilustrações vetoriais autorais.
- `tests/`: verificações de funcionamento.
- `.github/workflows/pages.yml`: publicação automática.

## Verificações

Se tiver Node.js instalado, execute:

```bash
node --test
```

Os testes não precisam ser executados para a página funcionar no GitHub Pages.

## Referências e créditos

**Ordem Paranormal** e suas denominações pertencem aos respectivos criadores. Este é um projeto de fã, não oficial, sem vínculo com os detentores da obra. As perguntas, descrições e artes deste repositório são originais, inspiradas em seus temas gerais.

Referências consultadas: [Elementos do Outro Lado](https://ordemparanormal.fandom.com/wiki/Elementos_do_Outro_Lado), [RPGpedia — Transcender](https://rpgpedia.com/transcender), [4Elementos](https://github.com/04Elementos/4elementos).
