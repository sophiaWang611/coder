'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index(ctx) {
        const data = { name: 'egg' };
        yield ctx.render('index.html', data);
    }
  }
  return HomeController;
};
