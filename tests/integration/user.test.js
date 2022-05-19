import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
let loginToken;
let resetToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2NmOGI2YzcwNzRhMDZiODdjYmUwZiIsImVtYWlsIjoibWlyYWhlZzc1OEBkdWV0dWJlLmNvbSIsImlhdCI6MTY1MjM1NzMzN30.UO5CV3mi3cRsQ8AIJ2ruV_4Pmholu1nxJIjuwn1vSNU';
let noteId= '627f0ed542a9690514eb7bed';
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
          firstname:"maanvi",
          lastname:"maheta",
          email:"miraheg758@duetube.com",
          password:"12345"
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
          firstname:"ma",
          lastname:"maheta",
          email:"miraheg758@duetube.com",
          password:"12345"
        };
        request(app)
          .post('/api/v1/users')
          .send(userdetails)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
            done();
          });
       });
      });
      describe('POST /login', () => {
        it('Login details are successfull', (done) => {
          const userdetails={
            email:"miraheg758@duetube.com",
            password:"12345"
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
      });
      describe('POST /forgotpassword', () => {
        it('send reset link when email id matches', (done) => {
          const userdetails={
            email:"miraheg758@duetube.com"
          };
          request(app)
            .post('/api/v1/users/forgotpassword')
            .send(userdetails)
            .end((err, res) => {
             resetToken= res.body.data;
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
        });
      });
      describe('PUT /resetpassword', () => {
        it('when user successfully rest password', (done) => {
          const userdetails={
            password:"miraheg758@duetube.com"
          };
          request(app)
            .put('/api/v1/users/resetpassword')
            .set('token', `${resetToken}`)
            .send(userdetails)
            .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.OK);
              done();
            });
            });
        });

         describe('POST/addNewNote', () => {
          it('user adding new note', (done) => {
            const notedetails={
              Title:"Hello World",
              Description:"Helloworld note"
            };
            request(app)
              .post('/api/v1/note')
              .send(notedetails)
              .set('token', `${loginToken}`)
              .end((err,res)=>{
                expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
                done();
              });
          });
        });
         describe('PUT /updateNote', () => {
          it('note is updated with id', (done) => {
            const notedetails={
              Title:"Hello World ",
              Description:"Helloworld note updated"
            };
            request(app)
              .put('/api/v1/note/${noteId')
              .send(notedetails)
              .set('token', `${loginToken}`)
              .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
                done();
              });
          });
        });
});  
