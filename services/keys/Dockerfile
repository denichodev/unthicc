#
## Base Node
FROM node:alpine AS base

RUN apk update
RUN apk add bash
RUN apk add yarn

#
## -- service inner deps --
FROM base AS dependencies

WORKDIR /usr/app/unthicc/services/keys

COPY services/keys/package.json ./
COPY services/keys/yarn.lock ./

RUN yarn install --production

#
## -- build --
FROM base AS build

WORKDIR /usr/app/unthicc

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY backpack.config.js ./
COPY services/keys ./services/keys

RUN yarn keys:build

#
## -- build deps --
FROM base AS entry

WORKDIR /usr/app/unthicc

COPY --from=build /usr/app/unthicc/build ./build
COPY --from=dependencies /usr/app/unthicc/services/keys/node_modules ./node_modules

CMD ["node", "build/services/keys/main.js"]
