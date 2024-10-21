# Agro Producers API

## Tecnologias Usadas

- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Swagger**
- **Passport**
- **JWT**
- **Docker**
- **Yarn**

## Como Rodar Localmente

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/agro-producers-api.git
   cd agro-producers-api
   yarn install
   ```

## Crie um Arquivo .env:

env

DB_HOST=database
DB_PORT=5432
DB_USERNAME=agro_producers_api_user
DB_PASSWORD=suasenha
DB_DATABASE=agro_producers_api
JWT_SECRET=seusegredo

## Rodar a Aplicação:

docker-compose up app

## Acessar a Aplicação: A aplicação estará rodando em http://localhost:3000.

## Acessar a Documentação Swagger: A documentação da API estará disponível em http://localhost:3000/api.

## Rodar os Testes:

docker-compose run test
