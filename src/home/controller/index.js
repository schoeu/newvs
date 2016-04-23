'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  loginAction(){
      console.log(this.isPost());
      if (this.isPost()) {
          let postData = this.post();
          this.success(postData);
      }
      else {
        return this.display();
      }
      
  }

  signinAction(){
    let postData = this.post();
    console.log(postData);
    return this.success(postData);
  }
}