var Sequelize = require('sequelize');
var config = require("../config/config");


var databaseOptions = config.databaseOptions;
var sequelize = new Sequelize({
    'host'     : databaseOptions.host,
    'username' : databaseOptions.user,
    'password' : databaseOptions.password,
    'database' : databaseOptions.database,
    'dialect'  : 'mysql'
});
var originalQuery = sequelize.query
Sequelize.prototype.query =  function(){
    return originalQuery.apply(this, arguments)
    .catch( err => {
        //Do error reporting here
        throw err;
    });
};

module.exports = sequelize;