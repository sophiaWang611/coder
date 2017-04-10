'use strict';

module.exports = app => {
  app.get('/', 'question.index');
  app.get("/questions/list", "question.list");
  app.post("/questions/getScore", "question.getScore");

  app.get("/user/:id", "user.index");
  app.get("/user/findOrCreate/:name", "user.findOrCreate");

};