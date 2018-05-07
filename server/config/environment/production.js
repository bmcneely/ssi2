'use strict';

// Production specific configuration
// =================================
module.exports = {
	// Server IP
	ip: process.env.OPENSHIFT_NODEJS_IP ||
		process.env.IP ||
		undefined,

	// Server port
	port: process.env.OPENSHIFT_NODEJS_PORT ||
		process.env.PORT ||
		8080,
	
	mysql: {
    	uri: process.env.CLEARDB_DATABASE_URL || 'mysql://bmac:*RIzA1a}vo8P@ssievents.cuh8psl1hdtu.us-east-2.rds.amazonaws.com:3306/ssievents'  
	}
};