/**
 * Created by sophia on 17/4/6.
 */

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    return app.model.define('answer', {
        id: { type: INTEGER(11), autoIncrement: true, primaryKey: true },
        question_id: INTEGER(11),
        option_id: INTEGER(11),
        user_id: INTEGER(11)
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};