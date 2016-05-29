var path = require('path'),
  rootPath = __dirname + '/server',
  env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-seed'
    },
    port: process.env.port || 8080,
    db: 'mongodb://localhost/ham-wip'
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-seed'
    },
    port: process.env.port || 8080,
    db: 'mongodb://localhost/ham-wip'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-seed'
    },
    port: process.env.port || 8080,
    db: 'mongodb://dbuser:dbpassword@ds036789.mlab.com:36789/hamwip-azure'
  }
};

module.exports = config[env];
