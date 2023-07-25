FROM node:lts-alpine
ENV TZ="Europe/Berlin"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3443
EXPOSE 8000
EXPOSE 9999
CMD [ "node", "index.js"]