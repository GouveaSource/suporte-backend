# Projeto de Suporte - API Backend

Esta é a API backend para o Projeto de Suporte. Ela é responsável pela lógica de negócio, autenticação de usuários, gerenciamento de dados e comunicação com o banco de dados.

## Tecnologias

-   **Linguagem**: TypeScript
-   **Framework**: Node.js com Express.js
-   **Banco de Dados**: PostgreSQL
-   **ORM**: Prisma para interação com o banco de dados
-   **Autenticação**: JWT (JSON Web Tokens)

---

## Estrutura de Pastas
src/
├── controllers/  # Controladores que lidam com as requisições HTTP
├── database/     # Configuração da conexão com o banco (Prisma Client)
├── middlewares/  # Funções que rodam antes das rotas (autenticação, permissões)
├── routes/       # Definição dos endpoints da API
└── server.ts     # Ponto de entrada da aplicação
prisma/
├── migrations/   # Histórico de alterações do banco de dados
├── seed.ts       # Script para popular o banco com dados iniciais
└── schema.prisma # Definição dos modelos de dados

---

## Como Rodar (Modo Standalone)

Embora o método recomendado seja usar o Docker Compose na raiz do projeto, você pode rodar o backend de forma isolada seguindo estes passos:

### 1. Pré-requisitos

-   Node.js (versão 18 ou superior)
-   Uma instância do PostgreSQL rodando localmente ou em um serviço.

### 2. Instalação

Clone o repositório, navegue até a pasta `backend` e instale as dependências:

bash
cd backend
npm install

### 3. Variáveis de Ambiente
Crie um arquivo .env na raiz da pasta backend com base no exemplo abaixo. Atenção: a DATABASE_URL deve apontar para a sua instância do PostgreSQL.

# Exemplo de arquivo .env

# URL de conexão com o Banco de Dados PostgreSQL
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"

# Chave secreta para gerar os tokens JWT
JWT_SECRET="um-segredo-muito-forte-aqui"

# Porta em que a API vai rodar
PORT=3333

### 4. Preparar o Banco de Dados
Execute os comandos do Prisma para criar as tabelas e popular o banco com os dados iniciais:

Bash

# Aplica as migrations (cria a estrutura do banco)
npx prisma migrate dev

# Roda o script para criar o usuário administrador e as permissões
npx prisma db seed

### 5. Iniciar o Servidor
Bash

npm run dev
