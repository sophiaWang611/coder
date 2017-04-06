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
        score: INTEGER(10),
        type: STRING(20)
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};