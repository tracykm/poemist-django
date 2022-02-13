FROM cypress/included:7.6.0

WORKDIR /app
COPY package.json app/package.json
RUN npm install --silent

COPY . .
CMD npm run start
