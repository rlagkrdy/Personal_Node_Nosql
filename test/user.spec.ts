import * as express from 'express';
import * as mocha from 'mocha';
import * as should from 'should';
import * as request from 'supertest';

import { Response } from 'supertest';

import App from '../src/App';

const app: express.Application = new App().app;

describe('/user should', () => {
    it('/user is return array', (done: MochaDone) => {
        request(app)
            .get('/user')
            .expect(200)
            .end((err: any, res: Response) => {
                should(res.body).be.instanceOf(Array);
                done();
            });
    });
    it('/user if have limit array length should be limit', (done: MochaDone) => {
        request(app)
            .get('/user?limit=2')
            .expect(200)
            .end((err: ErrorEvent, res: Response) => {
                should(res.body).be.length(2);
                done();
            });
    });
    it('/user if limit is not number response return 400', done => {
        request(app)
            .get('/user?limit=two')
            .expect(400)
            .end(done);
    });
});
describe('/user/1 should', () => {
    describe('When success', () => {
        it('id가 1인 유저 객체를 반환한다', (done: MochaDone) => {
            request(app)
                .get('/user/1')
                .expect(200)
                .end((err: ErrorEvent, res: Response) => {
                    should(res.body).have.property('id', 1);
                    done();
                });
        });
    });

    describe('When false', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다', (done: MochaDone) => {
            request(app)
                .get('/user/one')
                .expect(400)
                .end(done);
        });

        it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done: MochaDone) => {
            request(app)
                .get('/user/5')
                .expect(404)
                .end(done);
        });
    });
});
