FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install express

RUN npm install mysql2

COPY . .

EXPOSE 3000

CMD ["node", "app/index.js"]
