FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY ./dist/ .

EXPOSE 3000

CMD ["node", "./app.js" ]

#docker build -t app1 .
#docker run -d -p 3000:3000 --name app1 app1