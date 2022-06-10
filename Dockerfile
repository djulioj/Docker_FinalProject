FROM node:16

WORKDIR /main

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]