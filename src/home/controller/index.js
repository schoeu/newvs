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
        // 展示作品
        let data = await this.model('articles').select();
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
        let auth = this.header('authorization');
        if (!auth) {
            this.status(401);
            this.header('WWW-authenticate','Basic');
        }
        else {
            let base64Str = /^basic +(\w+=*) *$/ig.exec(auth);
            let userData = new Buffer(base64Str[1] || '', 'base64').toString().split(':');
            let username = userData[0] || '';
            let psw = userData[1] || '';
            if (!think.isEmpty(username)) {
                let data = await this.model('users').field('password').where({username:username}).select();
                if (data[0].password === psw) {
                    this.redirect('/article/edit/');
                }
                else {
                    this.redirect('/index/login/');
                }
            }
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

    // 个人信息
    async epinfoAction() {
        let username = await this.session('islogin');
        var postData = this.post();
        if (this.isPost()) {
            var updataData = {
                title: postData.title || '',
                description: postData.description || '',
                classify_first: postData.classify_first || '',
                classify_second: postData.classify_second || '',
                date: postData.date || '',
                is_safe: postData.safe || '',
                images: file.path || '',
                authorization: postData.authorization || ''
            };
        }

        let data = await this.model('users').add(updataData);
        this.redirect('info');
    }
}
