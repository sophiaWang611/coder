/**
 * Created by sophia on 17/4/6.
 */

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    return app.model.define('question', {
        id: { type: INTEGER(11), autoIncrement: true, primaryKey: true },
        title: STRING(250),
        question: STRING(250),
        tip: STRING(250),
        language: STRING(20),
        score: INTEGER(10),
        type: INTEGER(20) //1-选择题；2-填空题
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};