const databaseHost = 'localhost',
    databaseUser = 'root',
    databasePassword = 'password',
    databaseName = 'testDatabase';

module.exports = {
    serverPort : 3000,
    mysqlOptions : {
        connectionLimit : 10,
        host            : databaseHost,
        user            : databaseUser,
        password        : databasePassword,
        database        : databaseName,
        connectTimeout  : 5000
    },
    sequelizeOption : {
        host     : databaseHost,
        username : databaseUser,
        password : databasePassword,
        database :databaseName,
        dialect  : 'mysql'
    }
}