const { query, mysqlEscape } = require("../Database/Connection");
const errorJson = require("../../config/errorStrings.json");

module.exports = {
    async validateSession(req,res,next){
        const userSession = req.session || {};
        const userId = userSession.userId || 1;
        if( !userId ){
            return res.status(401)
            .send({
                isSucess : false,
                error : errorJson.unauthorized
            });
        }
        const strQuery = `SELECT USER_ID as userId, USER_ROLE as userRole FROM USER_DETAIL_MASTER WHERE USER_ID = ${mysqlEscape(userId)} LIMIT 1`;
        try{
            const [ userData ] = await query(strQuery);
            if( !userData ){
                return res.status(401)
                .send({
                    isSucess : false,
                    error : errorJson.unauthorized
                });
            }
            req.session.userId = userData.USER_ID;
            req.session.userRole = userData.userRole;
            next();
        }catch(err){
            return res.status(501)
            .send({
                isSucess : false,
                error : 'Unexpected Error'
            });
        };
    }
};