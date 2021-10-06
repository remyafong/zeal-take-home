FROM node:14.17.6

WORKDIR /usr/app
COPY ["package.json", "package-lock.json*", "./"]

RUN yarn
RUN npm install react react-router react-router-dom --save --legacy-peer-deps

COPY . ./

CMD yarn start