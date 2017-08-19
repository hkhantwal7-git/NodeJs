const Sequelize = require("./Sequelize");
const DataTypes = Sequelize.Sequelize.DataTypes;
const generateSequelizeModelName = require("./Utills").generateSequelizeModelName;
const normalizedPath = require("path").join(__dirname, "sequelizeModels");
const sequelizeModels = {};

require("fs").readdirSync(normalizedPath).forEach(file  => {
    const modelName = generateSequelizeModelName(file.replace(".js",""));
    sequelizeModels[modelName] = ( require("./sequelizeModels/" + file) )(Sequelize,DataTypes);
    sequelizeModels[modelName].modelName = modelName
});

const defineModelRelation = models => {
    Object.keys(models).forEach( modelName => {
        const currentModel = models[modelName];
        const modelAttributes = currentModel.attributes;
        for(var key in modelAttributes){
            const currentAttrObj = modelAttributes[key];
            if(currentAttrObj.hasOwnProperty("references")){
                const foreignModelName = generateSequelizeModelName(currentAttrObj.references.model)
                currentModel.belongsTo(models[foreignModelName], {as: 'bId'});
            }
        }
    })
};
defineModelRelation(sequelizeModels);
module.exports = sequelizeModels;