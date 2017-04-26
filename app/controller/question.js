'use strict';
var _ = require("underscore");

module.exports = app => {
    class QuestionController extends app.Controller {
        * index(ctx) {
            yield ctx.render("index.html");
        }

        * list(ctx) {
            const language = ctx.query.language || "";
            ctx.body = yield ctx.service.question.findList(language, false);
        }

        * getScore(ctx) {
            var postData = {};
            try {postData = JSON.parse(ctx.request.body.data);} catch (e) {console.log("parse data fail: ", ctx.request.body)}
            if (_.isEmpty(postData)) {
                return ctx.body = {errCode: -1, errMsg: "提交数据不能为空"};
            }

            const errMsg = ctx.service.question.validateAnswer(ctx, postData);
            if (!_.isEmpty(errMsg)) {
                return ctx.body = {errCode: -1, errMsg: errMsg};
            }

            ctx.body = yield ctx.service.question.getScore(ctx, postData);
        }
    }
    return QuestionController;
};
