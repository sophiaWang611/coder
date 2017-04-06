'use strict';

module.exports = app => {
  app.get('/', 'home.index');

  app.get("/user/:id", "user.index");
  app.get("/user/findOrCreate/:name", "user.findOrCreate");

  app.get("/questions/list/:type", "question.list");

  app.post("/questions/getScore", "question.getScore");
};