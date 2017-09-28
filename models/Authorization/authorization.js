const ConnectionModel = require("../Database/Connection");
const ErrorJson = require("../../config/errorStrings.json");

module.exports = {
    validateSession(req,res,next){
        const userSession = req.session;
        const userId = userSession && userSession.userId ? userSession.userId : null;
        if(!userId){
            return res.status(401)
            .send({
                isSucess : false,
                error : ErrorJson.unauthorized
            });
        }
        const strQuery = "SELECT * FROM USER_DETAIL_MASTER WHERE USER_ID = " + ConnectionModel.mysqlEscape(userId) + " LIMIT 1";
        ConnectionModel.query(strQuery)
        .then(function(rows){
            const userData = rows && rows[0] ? rows[0] : null;
            if(!userData){
                return res.status(401)
                .send({
                    isSucess : false,
                    error : ErrorJson.unauthorized
                });
            }
            req.session.userId = userData.USER_ID;
            req.session.userType = userData.USER_TYPE;
            next();
        }).catch(function(err){
            return res.status(501)
            .send({
                isSucess : false,
                error : 'Unexpected Error'
            });
        });
    }
};