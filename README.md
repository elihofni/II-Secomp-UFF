# II Secomp UFF

## Escreva menos, produza mais: Conceito de componentes

Elihofni Guirra Lima - Ciência da Computação - UFF

[Roteiro do mini curso](https://trello.com/b/FsQZB7U7/secomp-uff-escreva-menos-produza-mais)

---

## Pré-requisitos
- Vontade de aprender
- Paciência
- Prog. 1
- [npm + Node.js](https://www.npmjs.com/get-npm)
- [git](https://git-scm.com/downloads)
- Alguma IDE para programar([WebStorm](https://www.jetbrains.com/webstorm/), [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), [Sublime](https://www.sublimetext.com/), [Brackets](http://brackets.io/))

---

## Comandos

`npm install` instala dependências do projeto

`npm start` inicia o projeto localmente na porta 3000 (`http://localhost:3000/`)

`npm run lint` para verificar erros de padrão de código no JS e SCSS

`npm run build` para gerar o pacote final(index.html, main.css e bundle.js)

---

## Padrão de código
### Ferramentas
* [Husky](https://github.com/typicode/husky) cria githooks e previne commits fora do padrão
* [stylelint](https://github.com/stylelint/stylelint) linter de SCSS
* [ESLint](http://eslint.org/) linter de JS

---

## Outras ferramentas
* [webpack 3](https://webpack.js.org/) como um empacotador de código para juntar os módulos de ES6 e gerar um pacote final(index.html, main.css e bundle.js)
* [babel](http://babeljs.io/) para transpilar código ES6+ para JavaScript compatível com os browsers mais antigos

---

## O que cada branch contém
- 1: spinner e botão - master
- 2: 1 + campinho - feature/campinho
- 3: 2 + penaltis - feature/penaltis
