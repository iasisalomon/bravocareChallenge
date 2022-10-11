const Model = require('sequelize').Model;
const DataTypes = require('sequelize').DataTypes;

class Facilities extends Model {}

Facilities.init(
	{
		facility_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		facility_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'facilities',
		timestamps: false,
	}
);

module.exports = Facilities;
