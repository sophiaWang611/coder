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
    }
    return Question;
};