const request = require('supertest');
const app = require('../../app');
const mongoDB = require('../../config/connection');

describe('api auth', () => {
  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });
  describe('user not register', () => {
    test('POST /login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'testauth',
          password: '1234789'
        })
      expect(response.statusCode).toBe(400);
    })
  })
  describe('login user', () => {
    const userDto = {
      user_name: "natalie",
      password: "natalie1234"
    }
    test('POST /login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send(userDto)

      expect(response.statusCode).toBe(200);
    })
  })
});
