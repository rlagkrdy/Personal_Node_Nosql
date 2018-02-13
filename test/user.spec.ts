import * as express from 'express';
import * as mocha from 'mocha';
import * as request from 'supertest';
import App from '../src/App';

const app: express.Application = new App().app;

describe('/ Route should', () => {
    it('return status 200', done => {
        request(app)
            .get('/')
            .expect(200)
            .end((err: any, res: any) => {
                done();
            });
    });
});
