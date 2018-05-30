import * as mocha from 'mocha';
import * as should from 'should';
import { ParamsUtils, UsrSql } from '../src/utils/param/paramUtils';

const pu = new ParamsUtils();
let param = {
    USR_KEY: '1',
    START: '0',
    LIMIT: '2',
    USR_CREATE: '2018-05-22',
    ORDER: 'DESC',
    BY: 'USR_KEY'
};
let paramAr = pu.objectConvertArray(param);

describe('paramsUtils 테스트', () => {
    it('url 파라미터를 배열로 변경한다', () => {
        should(paramAr).be.instanceof(Array);
    });

    it('order,by 파라미터는 ORDER BY USR_KEY DESC여야 한다', () => {
        should(pu.makeQuery(paramAr, 'ORDER')).be.exactly(
            ' ORDER BY USR_KEY DESC'
        );
    });

    it('order,by 파마미터가 없을 때는 ""이여야한다', () => {
        let param2 = {
            USR_KEY: '1',
            LIMIT: '2',
            USR_CREATE: '2018-05-22'
        };
        let paramAr2 = pu.objectConvertArray(param2);
        should(pu.makeQuery(paramAr2, 'ORDER')).be.exactly('');
    });

    it('start, limit 파라미터는 limit 0, 1이여야 한다', () => {
        should(pu.makeQuery(paramAr, 'LIMIT')).be.exactly(' LIMIT 0,2');
    });

    it('start, limit 파마미터가 없을 때는 ""이여야한다', () => {
        let param2 = {
            USR_KEY: '1',
            USR_CREATE: '2018-05-22',
            START: '',
            LIMIT: ''
        };
        let paramAr2 = pu.objectConvertArray(param2);
        should(pu.makeQuery(paramAr2, 'LIMIT')).be.exactly('');
    });

    it('WHERE 조건인 파마미터는 WHERE 조건 키= 조건 값 AND ...형태여야 한다.', () => {
        let param2 = {
            START: '0',
            LIMIT: '4'
        };
        let paramAr2 = pu.objectConvertArray(param2);
        should(pu.makeQuery(paramAr2, 'WHERE')).be.exactly('');
    });
});
