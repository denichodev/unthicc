const appRootDir = require('app-root-dir');
const { resolve } = require('path');

const dir = process.env.DIR;
const entryPath = `./${dir}/src/index.js`;

module.exports = {
  webpack: (config) => {
    // Perform customizations to config
    // Important: return the modified config

    // changes the name of the entry point from index -> main.js
    config.entry.main = [
      resolve(appRootDir.get(), entryPath),
    ];

    config.output.path = resolve(appRootDir.get(), `build/${dir}`);

    config.context = resolve(appRootDir.get(), `./${dir}`);

    return config;
  }
};
