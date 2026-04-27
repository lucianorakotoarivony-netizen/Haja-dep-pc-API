FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install class-validator class-transformer
RUN apt-get update -y && apt-get install -y openssl

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]