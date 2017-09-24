"use strict";
const app = (require('express'))();
const config = require("./config/config");
const ConnectionModel = require("./models/Connection");

process.env.NODE_ENV = config.environment || 'production';
//for adding post data in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/helloWorld' , (req, res) => res.send('Hello World') );

app.get("/mysqlTest", (req,res) => {
    ConnectionModel.query("SELECT 1")
    .then(rows => {
        res.send({
            isSuccess : true,
            rows : rows[0] 
        });
    }).catch(error => {
        res.send({
            error,
            isSuccess : false
        });  
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