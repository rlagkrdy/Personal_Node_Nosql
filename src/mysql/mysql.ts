import { mysqlConfig } from './config';

const promiseMysql = require('promise-mysql');
const pool = promiseMysql.createPool(mysqlConfig);

export function transaction(fn: Function) {
    return async (...args: any[]) => {
        const con = await pool.getConnection();

        await con.connection.beginTransaction();

        const result = await fn(con, ...args).catch(async (error: any) => {
            await con.rollback();
            con.connection.release();
            throw error;
        });
        /* commit을 해준다. */
        await con.commit();

        con.connection.release();
        return result;
    };
}
