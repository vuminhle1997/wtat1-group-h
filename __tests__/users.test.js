const request = require('supertest');
const app = require('../app');

describe('Test auth', () => {
    it('Login an user, who is not registered', async() => {
        const res = await request(app)
            .post('/api/v1.0/users/login')
            .send({
                user: {
                    email: 'kevin@nguyen.de',
                    password: 'Kevin123'
                }
            });
        expect(res.statusCode).toEqual(201);
    });
    it('Login an Admin', async() => {
        const res = await request(app)
            .post('/api/v1.0/users/login')
            .send({
                user: {
                    email: '97.le.vuminh@gmail.com',
                    password: 'Liming1475369'
                }
            });

        expect(res.statusCode).toEqual(200);
    })
})