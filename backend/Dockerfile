FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3005

CMD ["npm", "run", "start:prod"]
