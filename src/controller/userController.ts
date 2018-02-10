import * as express from 'express';
import { Router } from 'express';

export class UserController {
    private router: Router = express.Router();
    public title: string = 'aaa';
    constructor() { }
}
