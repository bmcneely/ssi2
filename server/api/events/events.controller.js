/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  update
 * DELETE  /api/events/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Events} from '../../sqldb';
import {User} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
        res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(200).json(entity);
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}
// Gets a list of Events by user
export function indexByUser(req, res) {
  console.log("-----index by user-----");
  console.log(req.params);
  console.log("----------");
  Events.findAll({
    where: {
      UserId: req.params.userId
    },
    include: [{model: User, attributes: ['name', '_id']}]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a list of Eventss
export function index(req, res) {
  console.log("----index------");
  console.log(req.params);
  console.log("----------");
  Events.findAll({
    include: [{model: User, attributes: ['name', '_id']}]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Events from the DB
export function show(req, res) {
  console.log("----show------");
  console.log(req.params);
  console.log("----------");
  Events.find({
    where: {
      _id: req.params.id
    },
    include: [{model: User, attributes: ['name', '_id']}]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Events in the DB
export function create(req, res) {
  Events.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Events in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Events.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Events from the DB
export function destroy(req, res) {
  Events.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
