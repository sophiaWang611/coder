/**
 * Created by sophia on 17/3/29.
 */
'use strict';

module.exports = app => {
    class UserController extends app.Controller {
        * index(ctx) {
            const userId = ctx.params.id;
            const user = yield ctx.service.user.find(userId);
            ctx.body = user || {};
        }
        * findOrCreate(ctx) {
            const userName = ctx.params.name;
            const user = yield ctx.service.user.findOrCreate(userName);
            ctx.body = user || {};
        }
    }
    return UserController;
};
