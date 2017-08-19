/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('A', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		bID: {
			type: DataTypes.INTEGER(10),
			allowNull: true,
			references: {
				model: 'A',
				key: 'ID'
			}
		}
	}, {
		tableName: 'A',
		timestamps: true,
		createdAt: 'CREATION_TSTAMP',
		updatedAt: 'LAST_MODIFIED_TSTAMP'
	});
};
