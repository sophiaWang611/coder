/**
 * Created by sophia on 17/5/2.
 */
const _ = require("underscore");
var CONST = require("../const");

module.exports = app => {
    class Answer extends app.Service {

        * doSaveObj(conn, newData) {
            newData.updated_at = new Date();
            newData.created_at = new Date();
            const result = yield conn.insert("answers", newData);
            if (!result) {
                throw new Error("更新失败");
            }
        }
    }
    return Answer;
};