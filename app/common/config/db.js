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
      host: 'x',
      port: '3306',
      database: 'vs',
      user: 'root',
      password: 'x',
      prefix: 'vs_',
      encoding: 'utf8'
    },
    mongo: {}
  }
};
//# sourceMappingURL=db.js.map