var mongoose = require("mongoose");

let connectMongo = () => {
    /*var conn = mongoose.createConnection('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]', options);*/
   mongoose.createConnection('mongodb://localhost/mongo');
}