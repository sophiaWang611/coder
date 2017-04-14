/**
 * Created by sophia on 17/3/29.
 */
var _ = require("underscore");

module.exports = app => {
    class Question extends app.Service {
        * findList(type) {
            var ctx = this.ctx, returnVal = {type: type};
            return ctx.model.Question.findAll({where: {type: type}}).then((rows)=>{
                returnVal.questions = rows;
                var questionIds = _.pluck(rows, "id");
                return ctx.model.Option.findAll({where: {question_id: {$in: questionIds}}});
            }).map((row)=>{
                delete row.is_answer;
                return row;
            }).then((rows)=>{
                _.each(returnVal.questions, (v, k)=>{
                    var options = v.dataValues.options || [], opt = _.where(rows, {question_id: v.id});
                    if (opt && _.isArray(opt)) {
                        options = options.concat(opt);
                    } else if (opt) {
                        options.push(opt);
                    }
                    v.dataValues.options = options;
                });
                return returnVal;
            });
        }

        * validateAnswer(ctx, postData) {
            const createRule = {
                type: {type: 'string', required: true},//问题的类型
                answers: {
                    type: 'array',
                    itemType: 'object',
                    required: true,
                    rule: {questionId: 'int', optionIds: 'array'}
                }
            };
            try {
                ctx.validate(createRule, postData);
            } catch (err) {
                return JSON.stringify(err.errors);
            }
            return "";
        }

        * getScore(ctx, postData) {
            var questionIds = _.pluck(postData.answers, 'questionId');
            var quesOptMap = {}, resultMap = [];
            //TODO: 记录当前用户提交的内容

            return ctx.model.Option.findAll({where: {question_id: {$in: questionIds}, is_answer: 1}})
                .map((row)=>{
                    const answers = quesOptMap[row.question_id + ""] || [];
                    answers.push(row.id);
                    quesOptMap[row.question_id + ""] = answers;
                    return row;
                }).then(()=>{
                    _.each(postData.answers, (value)=>{
                        const rightArr = quesOptMap[value.questionId + ""];
                        const diffArr1 = _.difference(rightArr, value.optionIds),
                              diffArr2 = _.difference(value.optionIds, rightArr);
                        resultMap.push({questionId: value.questionId, isRight: _.isEmpty(diffArr1)&&_.isEmpty(diffArr2)});
                    });
                    return resultMap;
                })

        }


    }
    return Question;
};