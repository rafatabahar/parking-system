FROM node:lts-alpine3.9

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "start"]