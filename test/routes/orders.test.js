const request = require('supertest');
const express = require('express');
const routes = require('../../src/routes/orders');

describe('/api/orders', () => {
    const app = express();
    app.use(express.json());
    app.use('/', routes);

    it('ok', async () => {
        const response = await request(app).post('/').send({userId: 1, productIds: [1]});
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', 'pending');
        expect(response.body).toHaveProperty('total', 1299.99);
        expect(response.body).toHaveProperty('userId', 1);
    });

    it('missing body', async () => {
        const response = await request(app).post('/').send({userId: 1});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({error: 'userId and productIds[] are required'});
    });

    it('missing userId', async () => {
        const response = await request(app).post('/').send({productIds: [1]});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({error: 'userId and productIds[] are required'});
    });

    it('missing productIds', async () => {
        const response = await request(app).post('/').send({userId: 1});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({error: 'userId and productIds[] are required'});
    });
});
