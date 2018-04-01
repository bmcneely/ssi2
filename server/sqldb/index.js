/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var onHeroku = !!process.env.DYNO;

var db = {
	Sequelize,
	sequelize: new Sequelize(config.mysql.uri, config.mysql.options)
};


// Insert models below
db.Events = db.sequelize.import('../api/events/events.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');


// Table Relationships will go here
db.Events.belongsTo(db.User);
db.User.hasMany(db.Events);
// Relationship ends

export default db;