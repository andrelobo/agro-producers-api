# Use a imagem base do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o restante do código da aplicação, incluindo tsconfig.json
COPY . .

# Exponha a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "start:dev"]
