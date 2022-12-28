FROM node:18

WORKDIR /usr/src/app

EXPOSE 3000

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]
