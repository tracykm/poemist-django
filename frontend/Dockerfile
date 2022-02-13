FROM node:12.14.1

WORKDIR /app
COPY package.json /usr/src/app/package.json
RUN npm install --silent

COPY . .
CMD npm run start
