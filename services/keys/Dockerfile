#
## Base Node image
FROM node:alpine AS base

RUN apk update && \
  apk add \
  bash \
  yarn

WORKDIR /usr/app/unthicc

#
## Install dev & prod dependencies for build & test
FROM base AS dependencies

COPY package.json ./
COPY yarn.lock ./
COPY babel.config.js ./

RUN yarn

COPY services/keys ./services/keys

#
## Build the app
FROM dependencies AS build

COPY --from=dependencies /usr/app/unthicc/node_modules ./
COPY backpack.config.js ./

RUN NODE_ENV=production yarn keys:build

#
## Runtime dependencies
FROM base AS runtimeDeps

WORKDIR services/keys

COPY services/keys/package.json ./
COPY services/keys/yarn.lock ./

RUN yarn install --production

#
## Final release deps
FROM base AS release

WORKDIR /usr/app/unthicc

COPY --from=build /usr/app/unthicc/build ./build
COPY --from=runtimeDeps /usr/app/unthicc/services/keys/node_modules ./node_modules

EXPOSE 3123

CMD ["node", "build/services/keys/main.js"]
