# Ensure an up-to-date version of Chromium 
# can be installed (solves Problem 2)
FROM node:16-bullseye 
# Install a working version of Chromium (solves Problem 1)
RUN apt-get update
RUN apt-get install chromium -y
ENV HOME=/home/app-user
RUN useradd -m -d $HOME -s /bin/bash app-user 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3443
CMD [ "node", "index.js"]