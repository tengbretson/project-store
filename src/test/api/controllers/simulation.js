import should from 'should';
import request from 'supertest';
import server from '../../..';

describe('controllers', () => {
  describe('simulation', () => {
    let new_project;
    beforeEach(done => {
      const name = 'test';
      request(server).post('/project').send({name}).end((err, res) => {
        should.not.exist(err);
        new_project = res.header.location;
        done();
      });
    });
    describe('POST /project/{ID}/simulation', () => {
      it('should fail to create a simulation for a bogus project', done => {
        request(server)
          .post('/project/999999/simulation')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
      it('should create a simulation for a valid project', done => {
        request(server)
          .post(`${new_project}/simulation`)
          .set('Content-Type', 'application/json')
          .accept('json')
          .expect(201)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
    });
    describe('GET /project/{ID}/simulation', () => {
      it('should retrieve a list of simulations for the project', done => {
        request(server)
          .post(`${new_project}/simulation`)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            should.not.exist(err);
            request(server)
              .post(`${new_project}/simulation`)
              .set('Content-Type', 'application/json')
              .end((err, res) => {
                should.not.exist(err);
                request(server)
                  .get(`${new_project}/simulation`)
                  .set('Content-Type', 'application/json')
                  .accept('json')
                  .expect(200)
                  .end((err, res) => {
                    should.not.exist(err);
                    should(res.body.length).equal(2);
                    done();
                  });
            });
        });
      });
    });
    describe('GET /simulation/{ID}', () => {
      it('should fail to retrieve a simulation that does not exist', done => {
        request(server)
          .get('/simulation/8999888')
          .set('Content-Type', 'application/json')
          .expect(404)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
      it('should retrieve a valid simulation', done => {
        request(server)
          .post(`${new_project}/simulation`)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            should.not.exist(err);
            const {location} = res.header;
            request(server)
              .get(location)
              .set('Content-Type', 'application/json')
              .accept('json')
              .expect(200)
              .end((err, res) => {
                should.not.exist(err);
                done();
              });
          });
      });
    });
    describe('PUT /simulation/{ID}', () => {
      it('should fail to update a simulation that doesnt exist', done => {
        request(server)
          .put('/simulation/4012341293')
          .set('Content-Type', 'application/json')
          .expect(404)
          .send({annotation: 'test'})
          .end((err, res) => {
            should.not.exist(err);
            done();
        });
      });
      it('should update a simulations annotation', done => {
        request(server)
          .post(`${new_project}/simulation`)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            should.not.exist(err);
            const {location} = res.header;
            request(server)
              .put(location)
              .set('Content-Type', 'application/json')
              .expect(204)
              .send({annotation: 'test'})
              .end((err, res) => {
                should.not.exist(err);
                done();
            });
        });
      });
    });
    describe('DELETE /simulation/{ID}', () => {
      it('should fail to delete a simulation that doesnt exist', done => {
        request(server)
          .delete('/simulation/4012341293')
          .set('Content-Type', 'application/json')
          .expect(404)
          .end((err, res) => {
            should.not.exist(err);
            done();
        });
      });
      it('should delete a simulation', done => {
        request(server)
          .post(`${new_project}/simulation`)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            should.not.exist(err);
            const {location} = res.header;
            request(server)
              .delete(location)
              .set('Content-Type', 'application/json')
              .expect(204)
              .end((err, res) => {
                should.not.exist(err);
                done();
            });
        });
      });
    });
  });
});
