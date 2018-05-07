'use strict';

// Test specific configuration
// ===========================
module.exports = {
  //connection options
  mysql: {
    //uri: 'mysql://bmac:*RI@A1a}vo8P@160.153.75.160:3306/ssi-events'
    uri: 'mysql://bmac:*RIzA1a}vo8P@ssievents.cuh8psl1hdtu.us-east-2.rds.amazonaws.com:3306/ssievents'
   },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
