FROM node:latest

RUN apt-get update \
  && apt-get install default-jre -y \
  && apt-get install default-jdk -y

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --global nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]