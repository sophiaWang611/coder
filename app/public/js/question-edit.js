/**
 * Created by sophia on 17/4/26.
 */

var app = new Vue({
    el: "#container-addQuestions",
    delimiters: ['${', '}'],
    data: {
        language: "js",
        itemList: []
    },
    methods: {
        init: function() {
            this.search();
        },
        search: function() {
            $.get("/manager/list", {language: this.language}, function(data) {
                app.itemList = data.questions;
            });
        },
        add: function() {
            this.edit({});
        },
        edit: function(item) {
            $("#addQuestion").modal('show');
            editModal.setData(item);
        },
        del: function(item) {
            if (confirm("操作不可逆，确定删除该问题吗？")) {
                $.post("/manager/delQuestion", {id: item.id}, function(resp) {
                    if (resp.success) {
                        app.search();
                    } else {
                        alert(resp.errMsg || "保存失败");
                    }
                });
            }
        }
    }
});

var editModal = new Vue({
    el: "#addQuestion",
    delimiters: ['${', '}'],
    data: {
        id: -1,
        type: "",
        language: "",
        title: "",
        question: "",
        score: 0,
        options: [],
        newOpt: {},
        errMsg: ""
    },
    methods: {
        setData: function(data) {
            if (data.type) {
                this.type = data.type.id;
            }
            this.language = data.language;
            this.title = data.title;
            this.question = data.question;
            this.score = data.score;
            this.id = data.id;
            this.options = data.options || [];
            this.errMsg = "";
        },
        addOpt: function() {
            $("#add-option").removeClass('hidden');
        },
        confirmOpt: function() {
            if (_.isEmpty(this.newOpt.name)) {
                return this.errMsg = "选项的内容不能为空";
            }
            this.errMsg = "";
            this.options.push({
                name: this.newOpt.name,
                is_answer: this.newOpt.is_answer,
                question_id: this.id
            });
            this.newOpt = {};
        },
        save: function() {
            var data = {
                type: this.type,
                language: this.language,
                title: this.title,
                question: this.question,
                score: this.score,
                id: this.id,
                options: this.options
            };
            $.post("/manager/addOrUpQuestion", {data: JSON.stringify(data)}, function(resp) {
                if (resp.success) {
                    $("#addQuestion").modal('hide');
                    app.search();
                } else {
                    editModal.errMsg = resp.errMsg || "保存失败";
                }
            });
        }
    }
});
app.init();