import { Application, Router } from 'express';

import { UserController } from './controller/userController';
import { UsrController } from './controller/usrController';

export class CtrlModule {
    public userController: Router = new UserController().router;
    public usrCtrl: Router = new UsrController().router;

    constructor(App: Application) {
        App.use('/user', this.userController);
        App.use('/usr', this.usrCtrl);
    }
}
