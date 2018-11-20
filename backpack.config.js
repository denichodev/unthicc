/* eslint-disable */
const { resolve } = require('path');
const appRootDir = require('app-root-dir');
const dir = process.env.DIR;
const targetConfig = `./${dir}/backpack.config.js`;

const config = require(resolve(appRootDir.get(), targetConfig));

module.exports = config;
