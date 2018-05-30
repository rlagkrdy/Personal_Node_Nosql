import { mysqlConfig } from './config';

const promiseMysql = require('promise-mysql');
const pool = promiseMysql.createPool(mysqlConfig);

export const transaction = (fn: Function) => async (...args: any[]) => {
    const con = await pool.getConnection();
    await con.connection.beginTransaction();
    const result = await fn(con, ...args).catch(async (error: any) => {
        await con.rollback();
        con.connection.release();
        throw error;
    });
    await con.commit();
    con.connection.release();

    console.log('query result : ', result);
    return result;
};
