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

            const conn = yield app.mysql.beginTransaction();
            try {
                var answerIndex = 0, answerList = postData.answers;
                while(answerIndex < answerList.length) {
                    const answer = answerList[answerIndex];
                    var index = 0, optionIds = answer.optionIds;
                    while(index < optionIds.length) {
                        yield ctx.service.answer.doSaveObj(conn, {
                            user_id: 1,
                            question_id: answer.questionId,
                            option_id: optionIds[index]
                        });
                        index++;
                    }
                    answerIndex++;
                }
                conn.commit();
                var score = yield ctx.service.question.getScore(ctx, postData);
                ctx.body = _.extend(score, {success: true});
            } catch (e) {
                console.log(e);
                yield conn.rollback();
                ctx.body = {success: false, errMsg: e.message};
            }
        }
    }
    return QuestionController;
};
