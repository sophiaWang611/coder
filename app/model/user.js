/**
 * Created by sophia on 17/4/5.
 */
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    return app.model.define('user', {
        id: { type: INTEGER(11), autoIncrement: true, primaryKey: true},
        name: STRING(100),
        sex: INTEGER(1)
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};