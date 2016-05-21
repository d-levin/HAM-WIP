var path = require('path'),
  rootPath = __dirname + '/server',
  env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-seed'
    },
    port: process.env.port || 3000,
    db: 'mongodb://localhost/express-seed-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-seed'
    },
    port: process.env.port || 3000,
    db: 'mongodb://localhost/express-seed-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-seed'
    },
    port: process.env.port || 3000,
    db: 'mongodb://dbuser:dbpassword@ds019101.mlab.com:19101/ham-wip'
  }
};

module.exports = config[env];
