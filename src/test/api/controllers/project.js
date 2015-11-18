import should from 'should';
import request from 'supertest';
import server from '../../..';

describe('controllers', () => {
  describe('project', () => {
    describe('GET /project', () => {
      it('should return an array of available projects', done => {
        request(server)
          .get('/project')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
      it('should accept a name parameter', (done) => {
        request(server)
          .get('/project')
          .query({name: 'my_project'})
          .accept('json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
    });
    describe('POST /project', () => {
      it('should create a new project, returning its URI', done => {
        request(server)
          .post('/project')
          .send({name: 'my_project'})
          .accept('json')
          .expect(201)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
    });
    describe('GET /project/{id}', () => {
      it('should fail to return a project with a bogus id', done => {
        request(server)
          .get('/project/1001001')
          .set('Content-Type', 'application/json')
          .expect(400)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
      it('should successfully retrieve a created project', done => {
        const name = 'test';
        request(server).post('/project').send({name}).end((err, res) => {
          should.not.exist(err);
          const {location} = res.header;
          request(server)
            .get(location)
            .accept('json')
            .expect(200)
            .end((err, res) => {
              should.not.exist(err);
              done();
            });
        });
      });
    });
    describe('PUT /project/{id}', () => {
      it('should fail to update a project with a bogus id', done => {
        request(server)
          .put('/project/10010010100')
          .send({name: 'test'})
          .set('Content-Type', 'application/json')
          .expect(400)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
      it('should update a projects properties if one is present', done => {
        const name = 'test';
        request(server).post('/project').send({name}).end((err, res) => {
          should.not.exist(err);
          const {location} = res.header;
          request(server)
            .put(location)
            .send({name: 'new_name'})
            .set('Content-Type', 'application/json')
            .accept('json')
            .expect(204)
            .end((err, res) => {
              should.not.exist(err);
              done();
            });
        });
      });
    });
    describe('DELETE /project/{id}', () => {
      it('should fail to delete a non-existent project', done => {
        request(server)
          .delete('/project/990231409203')
          .set('Content-Type', 'application/json')
          .expect(404)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });
      it('should delete successfully delete a project', done => {
        const name = 'delete_test';
        request(server).post('/project').send({name}).end((err, res) => {
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
