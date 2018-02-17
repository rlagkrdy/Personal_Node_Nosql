import * as express from 'express';
import * as mocha from 'mocha';
import * as should from 'should';
import * as request from 'supertest';
import { Response } from 'supertest';

import App from '../src/App';

const app: express.Application = new App().app;

describe('/ Route should', () => {
    it('return status 200', done => {
        request(app)
            .get('/user')
            .expect(200)
            .end((err: any, res: Response) => {
                should(res.body).be.instanceOf(Array);
                done();
            });
    });
});
