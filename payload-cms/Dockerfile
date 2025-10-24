FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src/

RUN mkdir -p public/media

EXPOSE 3000

CMD ["npx", "tsx", "src/server.ts"]