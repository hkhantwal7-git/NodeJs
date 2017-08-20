module.exports = {
    generateSequelizeModelName : tableName => {
        tableName = (tableName || "").toLowerCase().replace(/_/g," ") + " model";
        return tableName.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
            if (+match === 0){
                return "";
            }
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }
}