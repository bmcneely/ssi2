/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;
var Events = sqldb.Events;

Thing.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    }]);
  });

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
