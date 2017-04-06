/**
 * Created by sophia on 17/3/29.
 */

module.exports = app => {
    class User extends app.Service {
        find(uid) {
            return this.ctx.model.User.findById(uid);
        }
        findOrCreate(name) {
            return this.ctx.model.User.findOrCreate(
                {where: {name: name}, defaults: {name: name, sex: 1}})
                .spread(function(user, created) {
                    const returnVal = user.get({plain: true});
                    returnVal.created = created;
                    return returnVal;
                });
        }
    }
    return User;
};