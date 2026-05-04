const request = require('supertest');

process.env.NODE_ENV = 'test';

const app = require('../../src/app');

describe('GET /health', () => {
  test('returns status ok and a timestamp', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('timestamp');
    expect(new Date(res.body.timestamp).toString()).not.toBe('Invalid Date');
  });
});
