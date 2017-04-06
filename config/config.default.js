'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {
    sequelize: {
      dialect: 'mysql',
      database: 'coder',
      host: 'doubit.com',
      port: '3306',
      username: 'root',
      password: '12121212Wxy!@'
    },
    view: {
      defaultViewEngine: 'nunjucks',
      defaultExtension: '.nj',
      mapping: {
        '.nj': 'nunjucks'
      },
      root: [
        path.join(appInfo.baseDir, 'app/view')
      ].join(',')
    },
    security: {
      csrf: false
    },
    keys: appInfo.name + '_1490753429923_9687'
  };


  return config;
};
