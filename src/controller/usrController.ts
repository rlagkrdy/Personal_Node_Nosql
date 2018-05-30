import * as express from 'express';
import { Request, Response, NextFunction, Router } from 'express';
import { transaction } from '../mysql/mysql';
import { sqlHandle, errorHandle } from '../mysql/sqlHandle';
import { ParamsUtils, UsrSql } from '../utils/param/paramUtils';

export class UsrController {
    public router: Router = express.Router();
    private pu: ParamsUtils = new ParamsUtils();

    constructor() {
        this.router.get('/', this.getList.bind(this));
    }

    private getList(req: Request, res: Response): void {
        let query: string = 'select * from Y_USR';
        // let paramAr = this.pu.objectConvertArray(req.query);
        // query +=
        //     this.pu.makeQuery(paramAr, 'WHERE') +
        //     this.pu.makeQuery(paramAr, 'ORDER') +
        //     this.pu.makeQuery(paramAr, 'LIMIT');
        let usrSql: UsrSql = new UsrSql();
        query = usrSql.select(req.query);

        transaction(sqlHandle)(query)
            .catch(errorHandle)
            .then(result => {
                res.json(result);
            });
    }
}
