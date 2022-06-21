FROM node:16.13-alpine3.14
RUN apk update -v
RUN apk upgrade -v --no-progress 
RUN apk add curl
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8000
USER node
CMD [ "npm", "start" ]