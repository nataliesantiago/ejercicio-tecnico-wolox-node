const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../../config/connection');

describe('api user', () => {
  let token = '';

  beforeAll(async () => {
    mongoDB.connect();
    jest.setTimeout(20000);
    request(app)
    const responseLogin = await request(app)
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({
        user_name: "natalie",
        password: "natalie1234"
      })

    token = responseLogin.body.token;
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  describe('get list top N coins', () => {
    test('list coins by user', async () => {
      const response = await request(app)
        .get('/api/users/list-top-coins')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .query({
          top: 25
        })
      expect(response.statusCode).toBe(200);
    })
    test('list coins by user without token', async () => {
      const response = await request(app)
        .get('/api/users/list-top-coins')
        .set('Accept', 'application/json')
        .query({
          page: 1
        })
      expect(response.statusCode).toBe(400);
    })
  })

});
