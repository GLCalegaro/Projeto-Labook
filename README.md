<h1 align="center">Labook</h1>

## ℹ️ Introdução:
O Projeto "Labook" é uma API que funciona como uma rede social com o objetivo de promover a conexão e interação entre pessoas.

Dentro da API será possível realizar o login, cadastro e edição de cadastro de usuários, criação, edição, remoção e também será possível curtir e descurtir publicações.

🗒️ <a href="https://documenter.getpostman.com/view/24465148/2s93CPrYBk">Acesse aqui a documentação da API no Postman!</a>

![image](https://user-images.githubusercontent.com/111308068/221442007-aeb25612-d0a0-48b6-972c-0fe0c69dcb82.png)

## Instalação de dependências: 
- npm install: Instala todas as dependências listadas no package.json;
- npm i cors: biblioteca para liberar acesso externo ao servido;
- npm i express : framework para criar o servidor (API);
- npm i knex: biblioteca query builder para conectar com banco de dados;
- npm i sqlite3: biblioteca do banco de dados SQLite;
- npm install uuid: biblioteca para geração de Identificador Único Universal;
- npm install dotenv: biblioteca de variáveis de ambiente;
- npm install jsonwebtoken: biblioteca para geração de tokens;
- npm i bcryptjs: biblioteca para criptografia de senhas;

## Execução de projeto:
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost toda a vez que o projeto for alterado e salvo.

## Endpoints:
- Get Users: Retorna todos os usuários cadastrados;
- Post Signup: Cadastro de nova conta.
- Post Login: Informe de Login e Senha para acesso a aplicação.
- Get Posts: Retorna todos as publicações cadastradas.
- Create Post: Cadastra uma nova publicação.
- Put Edit Post: Edita uma publicação a partir do 'Id' da publicação.
- Delete Post: Deleta uma publicação existente a partir do 'Id' da publicação.
- Put Like or Dislike: Envia um 'like' (1) ou 'dislike' (0) em uma publicação.

## - 🛠️ Tecnologias:

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" width="40" height="40"/> <img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original-wordmark.svg"  width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original-wordmark.svg" width="40" height="40"/>

## Programas utilizados:
* Visual Studio Code
* Postman
