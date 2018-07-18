export const sqlHandle = async (con: any, sql: string, values: any) =>
    await con.query(sql, values);

export const errorHandle = (err: any) => {
    const result: any = {};
    result['error'] = !err.code
        ? err
        : {
              code: err.code,
              no: err.errno,
              msg: err.sqlMessage,
              sql: err.sql
          };
    return result;
};
