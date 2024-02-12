FROM node:21-alpine

RUN mkdir /build
WORKDIR /build

COPY package.json ./
COPY tsconfig.json ./
COPY .eslintrc ./
COPY jest.config.json ./
COPY src ./src/
COPY tests ./tests/

RUN npm install
RUN npm run lint
RUN npm run test
RUN npm run build

WORKDIR /build/dist
CMD ["sh"]