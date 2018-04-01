/**
 * Events model events
 */

'use strict';

import {EventEmitter} from 'events';
var Events = require('../../sqldb').Events;
var db = require('../../sqldb');
var EventsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventsEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Events.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    // EventsEvents.emit(event + ':' + doc._id, doc);
    // EventsEvents.emit(event, doc);
    // done(null);
    
      if (event === "save") {
          db.sequelize.models.Events.find({
              where: {
                  _id: doc._id
              },
              include: [{ model: db.sequelize.models.User, attributes: ['name', '_id'] }],
              transaction: options.transaction
          }).then(eventDoc => {
              EventsEvents.emit(event + ':' + eventDoc._id, doc);
              EventsEvents.emit(event, eventDoc);
              done(null);
          });
      }
      else {
          EventsEvents.emit(event + ':' + doc._id, doc);
          EventsEvents.emit(event, doc);
          done(null);
      }
    
    
  }
}

export default EventsEvents;
