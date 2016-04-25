'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  async indexAction(){
    //auto render template file index_index.html
   
  }

  async infoAction() {
    let username = await this.session('islogin');
    if (!username) {
      this.redirect('/');
    }
  }
}