'use strict';
/**
 * db config
 * @type {Object}
 */

exports.__esModule = true;
exports.default = {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '45.32.250.247',
      port: '3306',
      database: 'vs',
      user: 'root',
      password: 'caoyifeng2b',
      prefix: 'vs_',
      encoding: 'utf8'
    },
    mongo: {}
  }
};
//# sourceMappingURL=db.js.map