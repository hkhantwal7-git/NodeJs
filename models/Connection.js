var mysql  = require('mysql');
var config = require("../config/config");
var config1 = require("./SequelizeModels");
var pool = mysql.createPool(config.databaseOptions);    

module.exports = {
    query : (query) => {
        
        return new Promise( (resolve,reject) => {
            
            let sendResponse = (err,rows) => {
                if(err){
                    return reject(err);
                }
                return resolve(rows);
            }
            
            pool.getConnection( (err,connection) => {
                if (err) {
                    console.log("-----Error getting Connection",query,err);
                    return sendResponse(err,[])
                }   
                
                connection.query(query, (err,rows) => {
                    connection.release();
                    console.log("-----",query,err);
                    sendResponse(err,rows)           
                });
                
                connection.on('error', (err) => {
                    console.log("-----Unexpected Connection Error",query,err);     
                    connection.release();
                    sendResponse(err,rows)     
                });
                
            });
        })
    },
    mysqlEscape : value => mysql.escape(value)
}