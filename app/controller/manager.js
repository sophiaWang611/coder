/**
 * Created by sophia on 17/4/18.
 */
'use strict';
var _ = require("underscore");
var CONST = require("../const");
var Promise = require("bluebird");

module.exports = app => {
    class ManagerController extends app.Controller {
        * index(ctx) {
            yield ctx.render("manager.html", {
                questionTypes: CONST.QUESTION_TYPE,
                languageTypes: CONST.LANGUAGE_TYPE
            });
        }

        * list(ctx) {
            const language = ctx.query.language || "";
            ctx.body = yield ctx.service.question.findList(language, true);
        }

        * addOrUpQuestion(ctx) {
            var postData = {};
            try {postData = JSON.parse(ctx.request.body.data);} catch (e) {console.log("parse data fail: ", ctx.request.body)}
            if (_.isEmpty(postData)) {
                return ctx.body = {errCode: -1, errMsg: "提交数据不能为空"};
            }

            const question = _.omit(postData, "options");
            const options = postData.options;
            const conn = yield app.mysql.beginTransaction();
            try {
                yield ctx.service.question.doUpOrSaveObj(conn, question, "questions");
                var index = 0;
                while(index < options.length) {
                    yield ctx.service.question.doUpOrSaveObj(conn, options[index], "options");
                    index++;
                }
                conn.commit();
                ctx.body = {success: true};
            } catch (e) {
                console.log(e);
                yield conn.rollback();
                ctx.body = {success: false};
            }
        }
    }
    return ManagerController;
};