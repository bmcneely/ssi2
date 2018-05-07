'use strict';

// Development specific configuration
// ==================================
module.exports = {

	// MongoDB connection options
	// mongo: {
	// 	uri: 'mongodb://localhost/msqladmin-dev'
	// },

	mysql: {
	 //uri: 'mysql://bmac:*RI@A1a}vo8P@160.153.75.160:3306/ssi-events'
	 uri: 'mysql://bmac:*RIzA1a}vo8P@ssievents.cuh8psl1hdtu.us-east-2.rds.amazonaws.com:3306/ssievents'
	},

	// Sequelize connection opions
	sequelize: {
		uri: 'sqlite://',
		options: {
			logging: false,
			storage: 'dev.sqlite',
			define: {
				timestamps: false
			}
		}
	},

	// Seed database on startup
  seedDB: false

};