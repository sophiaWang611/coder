/**
 * Created by sophia on 17/4/14.
 */
var app = new Vue({
    el: "#container-questionList",
    delimiters: ['${', '}'],
    data: {
        questions: [],
        answers: [],
        language: "js",
        enableBtn: false,
        showBtn: true
    },
    methods: {
        init: function() {
            $.get("/questions/list/", {language: this.language}, function(data) {
                app.questions = data.questions;
                _.each(data.questions, function(ques) {
                    app.answers.push({questionId: ques.id, optionIds: []});
                });
            });
        },
        choseOpt: function(optId, quesId) {
            $(event.target).toggleClass("active");
            var index = _.findIndex(this.answers, {questionId: quesId});
            if (index < 0) {
                this.answers.push({questionId: quesId, optionIds: []});
                index = _.findIndex(this.answers, {questionId: quesId});
            }

            var answers = this.answers[index];
            if ($(event.target).hasClass("active")) {
                answers.optionIds.push(optId);
            } else {
                answers.optionIds = _.without(answers.optionIds, optId);
            }
            this.answers[index] = answers;

            this.enableBtn = this.validateAnswers();
        },
        submit: function() {
            if (!this.validateAnswers()) {
                return;
            }
            var postData = {language: this.language, answers: this.answers};
            $.post("/questions/getScore", {data: JSON.stringify(postData)}, function(resp) {
                console.log(resp);
                _.each(resp, function(answer) {
                    var question = _.findWhere(app.questions, {id: answer.questionId});
                    Vue.set(question, "isRight", answer.isRight);
                    app.showBtn = false;
                });
            });
        },
        validateAnswers: function() {
            var allAnswer = true;
            _.each(this.answers, function(arr) {
                if (!arr || !_.isArray(arr.optionIds) || _.isEmpty(arr.optionIds)) {
                    allAnswer = false;
                }
            });
            return allAnswer;
        }
    }
});
app.init();