'use strict';

module.exports = app => {
  app.get('/', 'question.index');
  app.get("/questions/list", "question.list");
  app.post("/questions/getScore", "question.getScore");

  app.get("/user/:id", "user.index");
  app.get("/user/findOrCreate/:name", "user.findOrCreate");

  app.get('/manager', 'manager.index');
  app.get('/manager/list', 'manager.list');
  app.post('/manager/addOrUpQuestion', 'manager.addOrUpQuestion');
  app.post('/manager/delQuestion', 'manager.delQuestion');
};