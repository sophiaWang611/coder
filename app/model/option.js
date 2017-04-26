/**
 * Created by sophia on 17/4/6.
 */
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    return app.model.define('option', {
        id: { type: INTEGER(11), autoIncrement: true, primaryKey: true},
        name: STRING(250),
        tip: STRING(250),
        is_answer: INTEGER(2),
        question_id: INTEGER(11)
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};