'use strict';

module.exports = app => {
    class QuestionController extends app.Controller {
        * list(ctx) {
            const type = ctx.params.type || "";
            const list = yield ctx.service.question.findList(type);
            yield ctx.render("question-list.html", {data: list});
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
