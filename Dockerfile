FROM node:alpine

WORKDIR /usr/src/app

EXPOSE 3000

COPY package.json ./
COPY package-lock.json ./

RUN yarn

COPY ./ ./

CMD ["yarn", "start"]
