const user = process.env.POSTGRES_USER || 'user1';
const host = 'localhost';
const database = process.env.POSTGRES_DB || 'tododb';
const password = process.env.POSTGRES_PW || 'changeme';
const port = process.env.POSTGRES_PORT || '5432';

const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(database, user, password, {
	host,
	port,
	dialect: 'postgres',
	logging: false,
});

module.exports = sequelize;
