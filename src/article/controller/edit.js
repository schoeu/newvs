'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
      async indexAction(){
            var method = this.method();
            if (method === 'post') {
                let postData = this.post();

                var filePath = this.file('image').path;

                // 这里的 key 需要和 form 表单里的 name 值保持一致
                var file = think.extend({}, this.file('image'));

                // 上传文件处理
                if (filePath) {
                    var uploadPath = think.RESOURCE_PATH + '/static/upload';
                    think.mkdir(uploadPath);
                    var basename = path.basename(filePath);
                    fs.renameSync(filePath, uploadPath + '/' + basename);

                    file.path = uploadPath + '/' + basename;
                }


                let updataData = {
                    title: postData.title || '',
                    description: postData.description || '',
                    classify_first: postData.classify_first || '',
                    classify_second: postData.classify_second || '',
                    date: postData.date || '',
                    is_safe: postData.safe || '',
                    images: file.path || '',
                    authorization: postData.authorization || ''
                };

                let result = await this.model('articles').add(updataData);

                // res

                this.redirect('/');
            }
            else if (method === 'get'){
                this.assign({
                    username: this.session('islogin')
                });
                return this.display();
            }


      }
}