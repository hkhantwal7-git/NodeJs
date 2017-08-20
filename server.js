/* 
    Things Need to implement in this
    --- Set up sequelize
    --- set up mongoose
    --- set up authentication using passportJS/own module

*/

"use strict";
const app = (require('express'))();
const config = require("./config/config");
const ConnectionModel = require("./models/Connection");

//for adding post data in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test' , (req, res) => {
   res.send('Hello World');
})

app.get("/mysqlTest.ns",(req,res) => {
    ConnectionModel.query("SELECT 1")
    .then(function(rows){
        res.send({
           isSuccess : true,
           rows : rows[0] 
        })
    }).catch(function(err){
        res.send({
           isSuccess : false,
           error : err
        })    
    })
})

app.listen( config.serverPort, () => console.log("Server listening at port", config.serverPort) )

process.on("uncaughtException", err => console.log(err) )