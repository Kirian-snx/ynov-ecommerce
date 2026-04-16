const {expect} = require('chai');
const request = require('supertest');
const express = require('express');
const routes = require('../../src/routes/orders');

describe('/api/products', () => {
    const app = express();
    app.use(express.json());
    app.use('/', routes);

    it('ok', async () => {
        const response = await request(app).post('/').send({userId: 1,productIds: [1]});
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('status', 'pending');
        expect(response.body).to.have.property('total', 0);
        expect(response.body).to.have.property('userId', 1);
    });

    it('missing body', async () => {
        const response = await request(app).post('/').send({userId: 1});
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({error: 'userId and productIds[] are required'});
    });

    it('missing userId', async () => {
        const response = await request(app).post('/').send({productIds: [1]});
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({error: 'userId and productIds[] are required'});
    });


    it('missing productIds', async () => {
        const response = await request(app).post('/').send({userId: 1});
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({error: 'userId and productIds[] are required'});
    });

});