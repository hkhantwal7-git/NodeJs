const Sequelize = require('sequelize');
const config = require("../config/config");

const sequelize = new Sequelize(config.sequelizeOption);

//override the query method to support debugging
const originalQuery = sequelize.query
Sequelize.prototype.query =  function(){
    return originalQuery.apply(this, arguments)
    .catch( err => {
        //Do error reporting here
        throw err;
    });
};

//require all the sequlize models from sequelizeModels 
const generateSequelizeModelName = require("./Utills").generateSequelizeModelName;
const normalizedPath = require("path").join(__dirname, "sequelizeModels");
const sequelizeModels = {};
require("fs").readdirSync(normalizedPath).forEach(file  => {
    const modelName = generateSequelizeModelName(file.replace(".js",""));
    sequelizeModels[modelName] = ( require("./sequelizeModels/" + file) )(sequelize,Sequelize.DataTypes);
    sequelizeModels[modelName].modelName = modelName
});

const defineModelRelation = models => {
    Object.keys(models).forEach( modelName => {
        const currentModel = models[modelName];
        const modelAttributes = currentModel.attributes;
        for(const key in modelAttributes){
            const currentAttrObj = modelAttributes[key];
            if(currentAttrObj.hasOwnProperty("references")){
               const foreignModelName = generateSequelizeModelName(currentAttrObj.references.model)
               
               currentModel.belongsTo(models[foreignModelName], {foreignKey: key, targetKey: currentAttrObj.references.key});
               
               models[foreignModelName].hasMany(currentModel, { foreignKey : key});
            }
        }
    })
};
defineModelRelation(sequelizeModels);

sequelizeModels.sequelize = sequelize
module.exports = sequelizeModels;

sequelizeModels.customerInfoModel.findAll({
    include: [{
        model: sequelizeModels.orderMasterModel
    }],
    raw: true
}).then(function(data){
    console.log(data)
}).catch(function(err){
    console.log(err)
})

sequelizeModels.orderMasterModel.findAll({
    include: [{
        model: sequelizeModels.customerInfoModel
    }],
    raw: true
}).then(function(data){
    console.log(data)
}).catch(function(err){
    console.log(err)
})