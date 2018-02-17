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
    }

    getList(req: Request, res: Response) {
        res.json(this.users);
    }
}
