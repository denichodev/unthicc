#
## Base Node image
FROM node:lts-alpine AS base

RUN apk update && \
  apk add \
  bash \
  yarn

WORKDIR /usr/app/unthicc/services/keys

#
## Install dev & prod dependencies for build & test
FROM base AS dependencies

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production && \
    cp -R node_modules prod_node_modules

RUN yarn

COPY ./ ./

#
## Build the app
FROM dependencies AS build

COPY --from=dependencies /usr/app/unthicc/services/keys/node_modules ./

RUN NODE_ENV=production yarn build

#
## Final release deps
FROM base AS release

COPY --from=build /usr/app/unthicc/services/keys/build ./build
COPY --from=dependencies /usr/app/unthicc/services/keys/prod_node_modules ./node_modules

EXPOSE 3123

CMD ["node", "build/main.js"]
