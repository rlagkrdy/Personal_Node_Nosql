import { Application, Router } from 'express';

import { UserController } from './controller/userController';

export class CtlModule {
    public userController: Router = new UserController().router;

    constructor(App: Application) {
        App.use('/user', this.userController);
    }
}
