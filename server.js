"use strict";
const app = (require('express'))();
const config = require("./config/config");
const ConnectionModel = require("./models/Database/Connection");

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const UtilityModel = require("./models/utills");
const AuthorizationModel = require("./models/Authorization/authorization");

process.env.NODE_ENV = config.environment || 'production';

const sessionObj = {
    name : 'SESSIONID',
    secret: 'jndjbcfhbvrbeh382u823u',
    resave : false,
    saveUninitialized : true,
    store:new MySQLStore(Object.assign({},config.mysqlOptions,{
        schema: {
            tableName: 'USER_SESSION_DATA',
            columnNames: {
                session_id: 'SESSIONID',
                expires: 'SESSION_EXPIRE_TSTAMP',
                data: 'SESSION_JSON_DATA'
            }
        }
    })),
    unset : 'destroy',
    cookie: {
        expires : 12,
        maxAge : 30 * 60 * 1000
    }
};
   
/* if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) ;// trust first proxy 
    sess.cookie.secure = true; // serve secure cookies 
} */
app.use(session(sessionObj));

//for adding post data in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
    req.session.count = (req.session.count || 0)+1;
    next();
});

app.get('/helloWorld' , (req, res) => res.send('Hello World') );

app.get("/mysqlTest", (req,res) => {
    UtilityModel.taskRunner(function *(){
        try{
            let rows = yield ConnectionModel.query("SELECT 1");
            res.send({
                isSuccess : true,
                rows : rows[0]
            });
        }catch(error){
            res.send({
                error,
                isSuccess : false
            }); 
        }
    });
});

app.listen( config.serverPort, () => console.log("Server listening at port", config.serverPort) );

process.on("uncaughtException", err => {
    //write your error handler here
    var errorStackTrace =  `
        Error Occured On ${new Date().toUTCString()}
        Error Message Is ${err.message}
        Stack Trace Is ${err.statck}
    `;
});