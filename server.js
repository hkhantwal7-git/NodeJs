require('babel-register'); 
var app = (require('express'))();
var config = require("./config/config");
var Connection = require("./models/Connection");

//for adding post data in req.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test' , (req, res) => {
   res.send('Hello World');
})
app.get("/mysqlTest.ns",(req,res) => {
    Connection.query("SELECT 1")
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