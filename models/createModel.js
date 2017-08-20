var config = require("../config/config")
var SequelizeAuto = require('sequelize-auto')
var databaseOptions = config.mysqlOptions;

var auto = new SequelizeAuto( 
    databaseOptions.database, databaseOptions.user, databaseOptions.password, {
        'host'     : databaseOptions.host,
        'dialect'  : 'mysql',
        'additional': {
            timestamps: true,
            createdAt : 'CREATION_TSTAMP',
            updatedAt : 'LAST_MODIFIED_TSTAMP'
        },
        directory: './sequelizeModels'
    }
)
auto.run(function (err) {
    if (err) throw err;
  
    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
  });