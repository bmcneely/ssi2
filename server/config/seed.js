/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';

var User = sqldb.User;
var Events = sqldb.Events;



User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }],{returning: true})
      .then((users) => {
        Events.sync()
          .then(() => {
            return Events.destroy({ where: {} });
          })
          .then(() => {
            Events.bulkCreate([
              { "title": "All Day Event", "description": "long description","start":null,"end":null, "icon": "mdi-alert-warning", "className": "green", UserId: users[0]._id },
              { "title": "Long Event", "icon": "mdi-alert-warning", "className": "red", "start":null,"end":null, },
              { "title": "Repeating Event", "icon": "mdi-alert-warning", "className": "yellow","start":null,"end":null, },
              { "title": "Repeating Event", "icon": "mdi-action-event", "className": "blue","start":null,"end":null, },
              { "title": "Meeting", "className": "red","start":null,"end":null, },
              { "title": "Lunch", "className": "green","start":null,"end":null, },
              { "title": "Birthday Party", "className": "red","start":null,"end":null, },
              { "title": "Smartadmin Open Day", "className": "indigo","start":null,"end":null, }]);
              console.log('finished populating users',);
          });

      
    });
  });
