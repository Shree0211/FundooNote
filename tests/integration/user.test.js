  import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
let loginToken;

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
    describe('POST /registration', () => {
      it('give new user when added should return status 201', (done) => {
        const userdetails={
          "firstname":"maanvi",
          "lastname":"maheta",
          "email":"kotonas992@azteen.com",
          "password":"12345"
        };
        request(app)
          .post('/api/v1/users')
          .send(userdetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
            done();
          });
      });
      it('give new user when added invalid details returns', (done) => {
        const userdetails={
          "firstname":"ma",
          "lastname":"maheta",
          "email":"kotonas992@azteen.com",
          "password":"12345"
        };
        request(app)
          .post('/api/v1/users')
          .send(userdetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
            done();
          });
      });
      describe('POST /login', () => {
        it('Login details are successfull', (done) => {
          const userdetails={
            "email":"kotonas992@azteen.com",
            "password":"12345"
          };
          request(app)
            .post('/api/v1/users/login')
            .send(userdetails)
            .end((err, res) => {
               loginToken=res.body.data;
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
      describe('POST /forgotpassword', () => {
        it('send reset link when email id matches', (done) => {
          const userdetails={
            "email":"kotonas992@azteen.com"
          };
          request(app)
            .post('/api/v1/users/forgotpassword')
            .send(userdetails)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
       
  });
});
});
});