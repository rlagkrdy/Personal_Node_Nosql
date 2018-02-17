import * as express from 'express';
import { Request, Response, NextFunction, Router } from 'express';

export class UserController {
    public router: Router = express.Router();

    private users: Array<any> = [
        { id: 1, name: 'kim hak yo1', age: 30 },
        { id: 2, name: 'kim hak yo2', age: 31 },
        { id: 3, name: 'kim hak yo3', age: 32 }
    ];

    constructor() {
        this.router.get('/', this.getList.bind(this));
        this.router.get('/:id', this.getInfo.bind(this));
    }

    getList(req: Request, res: Response): void {
        const queryLimit: any = req.query.limit || 10;
        const limit: number = parseInt(queryLimit, 10);
        if (Number.isNaN(limit)) {
            return res.status(400).end();
        }
        res.json(this.users.slice(0, limit));
    }

    getInfo(req: Request, res: Response): void {
        const paramId = req.params.id,
            id = parseInt(paramId, 10);

        if (Number.isNaN(id)) {
            return res.status(400).end();
        }

        const userInfo = this.users.filter(item => item.id === id)[0];

        if (!userInfo) {
            return res.status(404).end();
        }

        res.json(userInfo);
    }
}
