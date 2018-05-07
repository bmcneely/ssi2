'use strict';

var app = require('../..');
import request from 'supertest';

var newEvents;

describe('Events API:', function() {

  describe('GET /api/events', function() {
    var eventss;

    beforeEach(function(done) {
      request(app)
        .get('/api/events')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          eventss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      eventss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/events', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/events')
        .send({
          name: 'Test Event',
          info: 'This is the new test event.',
          UserId: '1'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEvents = res.body;
          done();
        });
    });

    it('should respond with the newly created events', function() {
      newEvents.name.should.equal('Test Event');
      newEvents.info.should.equal('This is the new test event.');
    });

  });

  describe('GET /api/events/:id', function() {
    var events;

    beforeEach(function(done) {
      request(app)
        .get('/api/events/' + newEvents._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          events = res.body;
          done();
        });
    });

    afterEach(function() {
      events = {};
    });

    it('should respond with the requested events', function() {
      events.name.should.equal('Test Event');
      events.info.should.equal('This is the new test event.');
    });

  });

  describe('PUT /api/events/:id', function() {
    var updatedEvents;

    beforeEach(function(done) {
      request(app)
        .put('/api/events/' + newEvents._id)
        .send({
          name: 'Updated Test Event',
          info: 'Updated Test Event'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEvents = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvents = {};
    });

    it('should respond with the updated events', function() {
      updatedEvents.name.should.equal('Updated Test Event');
      updatedEvents.info.should.equal('Updated Test Event');
    });

  });

  describe('DELETE /api/events/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/events/' + newEvents._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when events does not exist', function(done) {
      request(app)
        .delete('/api/events/' + newEvents._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
