const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../../config/connection');

describe('api coins', () => {
  let token = '';

  beforeAll(async () => {
    mongoDB.connect();
    jest.setTimeout(10000);
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

  describe('get coins list', () => {
    test('list coins', async () => {
      const response = await request(app)
        .get('/api/coins/coins-list')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .query({
          page: 1
        })
      expect(response.statusCode).toBe(200);
    })
    test('list coins without token', async () => {
      const response = await request(app)
        .get('/api/coins/coins-list')
        .set('Accept', 'application/json')
        .query({
          page: 1
        })
      expect(response.statusCode).toBe(400);
    })
  })
});
