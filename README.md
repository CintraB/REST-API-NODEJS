# REST-API-NODEJS

Esta é uma aplicação de API RESTful em Node.js que utiliza Express e MongoDB para gerenciar uma coleção de livros.

## Configuração

Antes de executar o aplicativo, é necessário configurar as variáveis de ambiente no arquivo `.env`.

```plaintext
DB_CONNECTION_STRING=sua_string_de_conexão_com_o_banco_de_dados_mongodb

## Instalação

Clone o repositório:

```plaintext
git clone https://github.com/CintraB/REST-API-NODEJS

Instale as dependências:

```plaintext
npm install

## Execução

Execute o comando

```plaintext
npm run dev

O servidor estará acessível em http://localhost:3000.

### Endpoints
####Livros
GET /livros: Obtém todos os livros.
GET /livros/:id: Obtém um livro específico pelo ID.
POST /livros: Cria um novo livro.
PUT /livros/:id: Atualiza um livro existente pelo ID.
DELETE /livros/:id: Exclui um livro pelo ID.

####Autores
GET /autores: Obtém todos os autores.
GET /autores/:id: Obtém um autor específico pelo ID.
POST /autores: Cria um novo autor.
PUT /autores/:id: Atualiza um autor existente pelo ID.
DELETE /autores/:id: Exclui um autor pelo ID.

###Estrutura de Arquivos
server.js: Arquivo de entrada da aplicação.
app.js: Configuração do aplicativo Express.
config/dbConnect.js: Conexão com o banco de dados MongoDB.
routes/index.js: Arquivo de roteamento principal.
routes/livrosRoutes.js: Rotas relacionadas aos livros.
routes/autoresRoutes.js: Rotas relacionadas aos autores.
controllers/livroController.js: Controlador para operações relacionadas aos livros.
controllers/autorController.js: Controlador para operações relacionadas aos autores.
models/Livro.js: Definição do modelo de dados para livros.
models/Autor.js: Definição do modelo de dados para autores.
package.json: Arquivo de configuração do Node.js que lista as dependências do projeto.
.env: Arquivo de variáveis de ambiente.

###Tecnologias Utilizadas
Node.js
Express.js
MongoDB
Mongoose
dotenv
nodemon