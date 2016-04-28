'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  async __before () {
      let auth = this.header('authorization');
      if (auth) {
        let base64Str = /^basic +(\w+=*) *$/ig.exec(auth);
        let userData = new Buffer(base64Str[1] || '', 'base64').toString().split(':');
        let username = userData[0] || '';
        let psw = userData[1] || '';
        if (!think.isEmpty(username)) {
          let data = await this.model('users').field('password').where({username:username}).select();
          if (data[0].password === psw) {
            this.assign({
              isLogined: true
            });
          }
        }
      }

    }
}