import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('GET /users', () => {
    it('should return empty array', (done) => {
      request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('array');

          done();
        });
    });
    describe('POST /registration', () => {
      it('give new user when added should return status 201', (done) => {
        const userdetails={
          "firstname":"maanvi",
          "lastname":"maheta",
          "email":"m`@gmail.com",
          "password":"12345"
        };
        request(app)
          .get('/api/v1/users')
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
            done();
          });
      });
      it('give new user when added invalid details returns', (done) => {
        const userdetails={
          "firstname":"abc",
          "lastname":"shah",
          "email":"s@gmail.com",
          "password":"12345"
        };
        request(app)
          .get('/api/v1/users')
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
            done();
          });
      });
  });
});
});