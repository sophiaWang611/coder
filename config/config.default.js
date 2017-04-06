'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {
    sequelize: {
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
