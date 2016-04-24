'use strict';

import Base from './base.js';
import path from 'path';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  // index.html
  async indexAction(){
    //auto render template file index_index.html
    var username = await this.session('islogin');
    if (username) {
        this.assign({
            username: username
        });
    }
    else {
        this.assign({
            username: ''
        });
    }

      // 展示作品
      let data = await this.model('articles').select();

      for (let i=0;i<data.length;i++) {
          var oriImg = data[i].images || '';
          var oriDate = data[i].date || new Date();
          var pathArr = oriImg.split(path.sep) || [];
          data[i].date = think.datetime(oriDate).split(' ')[0];
          data[i].images = '/static/' + pathArr.splice(-2,2).join(path.sep);
      }
      this.assign({
          datalist: data || []
      });

    return this.display();
  }
    // 登录操作
    async loginAction(){

      if (this.isPost()) {
          let postData = this.post();
          let username = postData.username;
          let data = await this.model('users').field('password').where({username:username}).select();

          if (data[0].password === postData.password) {
              await this.session('islogin', username);
              this.success({
                  logined: true,
                  username: username
              });
          }
          else {
              this.redirect('/index/login/');
          }
      }
      else {
        return this.display();
      }
      
    }

    // 个人信息
    async infoAction() {
        let username = await this.session('islogin');
        let data = await this.model('users').where({username:username}).select();
        let rowData = data[0];
        this.assign({
            nickname: rowData.nickname || '',
            qq: rowData.qq || '',
            email: rowData.email || '',
            skills: rowData.skills || '',
            years: rowData.years || '',
            description: rowData.description || ''
        });
        this.assign({
            username: username
        });
        this.display();
    }
}