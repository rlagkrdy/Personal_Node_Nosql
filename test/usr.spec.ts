import * as express from 'express';
import * as mocha from 'mocha';
import * as should from 'should';
import * as request from 'supertest';
import { Response } from 'supertest';
import App from '../src/App';
import { UsrSql } from '../src/utils/param/paramUtils';

const app: express.Application = new App().app;

describe('UsrControll 테스트', () => {
    it('if url path is /usr return instanceof array', (done: MochaDone) => {
        request(app)
            .get(
                '/usr?USR_KEY=1&LIMIT=2&USR_CREATE=2018-05-22&USR_SNS_WAY=GOOGLE'
            )
            .expect(200)
            .end((err: any, res: Response) => {
                should(res.body).be.instanceOf(Array);
                done();
            });
    });

    it('if url path is /usr and have limit parameter, array length shoud be less then array length', (done: MochaDone) => {
        request(app)
            .get('/usr?LIMIT=2')
            .expect(200)
            .end((err: any, res: Response) => {
                should(res.body.length).be.lessThanOrEqual(2);
                done();
            });
    });

    // it('test', () => {
    //     let param = {
    //         USR_KEY: '1',
    //         START: '0',
    //         LIMIT: '2',
    //         USR_CREATE: '2018-05-22',
    //         ORDER: 'DESC',
    //         BY: 'USR_KEY'
    //     };
    //     let usrSql: UsrSql = new UsrSql();
    //     console.log('aaaaaaa', usrSql.select(param));
    // });
});
