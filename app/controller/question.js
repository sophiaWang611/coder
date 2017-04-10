'use strict';

module.exports = app => {
    class QuestionController extends app.Controller {
        * index(ctx) {
            yield ctx.render("question-list.html");
        }

        * list(ctx) {
            const type = ctx.query.type || "";
            ctx.body = yield ctx.service.question.findList(type);
        }

        * getScore(ctx) {
            const createRule = {
                type: { type: 'string', required: true },
                answers: {
                    type: 'array',
                    itemType: 'object',
                    required: true,
                    rule: {
                        questionId: 'int',
                        optionId: 'int'
                    }
                }
            };
            ctx.validate(createRule, ctx.body)
        }
    }
    return QuestionController;
};
