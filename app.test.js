const request = require('supertest');
const app = require('./app');


describe('GET /', () => {

    test('should respond with a welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toEqual('Welcome to the Calculator!');
    });
  
    test('should return 404 when user is not found', async () => {
      const response = await request(app).get('/users/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Path not found' });
    });
});