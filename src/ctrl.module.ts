import { Application, Router } from 'express';

import { UserController } from './controller/userController';

export class CtrlModule {
    public userController: Router = new UserController().router;

    constructor(App: Application) {
        App.use('/user', this.userController);
    }
}
