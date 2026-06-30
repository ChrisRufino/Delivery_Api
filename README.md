# 📦 Delivery API

API REST desenvolvida para o gerenciamento de entregas de encomendas.

## 📌 Descrição

Esta API permite cadastrar usuários, autenticar sessões, criar entregas, atualizar o status dos pedidos e acompanhar o histórico de movimentações.

O projeto também possui controle de acesso por perfil de usuário, garantindo que cada usuário tenha acesso apenas às funcionalidades permitidas.

---

## 🚀 Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* JSON Web Token (JWT)
* Zod
* Jest
* Supertest
* Docker

---

## ⚙️ Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/delivery-api.git
cd delivery-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rocketlog?schema=public"
JWT_SECRET="sua-chave-secreta"
PORT=3333
```

### 4. Inicie o banco de dados

```bash
docker compose up -d
```

### 5. Execute as migrations

```bash
npx prisma generate
npx prisma migrate deploy
```

### 6. Inicie o servidor

```bash
npm run dev
```

O servidor estará rodando em:

```text
http://localhost:3333
```

---

## 📁 Estrutura do projeto

```text
src/
 ├── configs/        # Configurações da aplicação
 ├── controllers/    # Lógica das requisições
 ├── database/       # Configuração do banco de dados
 ├── middlewares/    # Autenticação e tratamento de erros
 ├── routes/         # Rotas da aplicação
 ├── tests/          # Testes de integração
 ├── types/          # Tipagens adicionais
 ├── utils/          # Funções utilitárias
 ├── app.ts          # Configuração do Express
 └── server.ts       # Inicialização da aplicação
```

---

## 📌 Funcionalidades

* Cadastro de usuários
* Autenticação com JWT
* Controle de acesso por perfil
* Criação e listagem de entregas
* Atualização do status das entregas
* Registro do histórico de movimentações
* Consulta de entregas e seus respectivos logs

---

## 📬 Endpoints

### ➤ Cadastrar usuário

```http
POST /users
```

### ➤ Realizar login

```http
POST /sessions
```

### ➤ Criar entrega

```http
POST /deliveries
```

### ➤ Listar entregas

```http
GET /deliveries
```

### ➤ Atualizar status

```http
PATCH /deliveries/:id/status
```

### ➤ Adicionar registro ao histórico

```http
POST /delivery-logs
```

### ➤ Consultar histórico da entrega

```http
GET /delivery-logs/:delivery_id/show
```

---

## 🔐 Autenticação

As rotas protegidas utilizam um token JWT enviado no cabeçalho da requisição:

```http
Authorization: Bearer SEU_TOKEN
```

A aplicação possui os perfis:

* `customer` — consulta suas próprias entregas
* `sale` — cria, lista e atualiza entregas

---

## 🧪 Testes

Para executar os testes:

```bash
npm run test:dev
```

Também é possível testar os endpoints utilizando ferramentas como:

* Insomnia
* Postman

---

## 🗄️ Banco de dados

O projeto utiliza **PostgreSQL** com **Prisma ORM**.

O modelo do banco de dados está localizado em:

```text
prisma/schema.prisma
```

Para visualizar os registros pelo Prisma Studio:

```bash
npx prisma studio
```

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

Desenvolvido por **Christian Rufino**.

---

## ⭐ Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests!
