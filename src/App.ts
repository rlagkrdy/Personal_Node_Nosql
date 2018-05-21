import * as express from 'express';
import { Application, Request, Response, NextFunction, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as Promise from 'promise';
import * as morgan from 'morgan';
import HakyoMail from './utils/mail/Mail';
import { CtrlModule } from './ctrl.module';
import { con } from './mysql/mysql';

export default class App {
    public app: Application;
    private mail: HakyoMail = new HakyoMail();
    private CrlModule: CtrlModule;

    constructor() {
        this.app = express();
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(this.setHeader);

        this.CrlModule = new CtrlModule(this.app);

        this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
            const sql: string = 'select * from Y_USR';
            con
                .then((con: any) => {
                    return con.query(sql, '');
                })
                .then((rows: any) => {
                    console.log('primise mysql', rows);
                });
            res.send('Hello world22222222');
        });

        this.app.get('/sendMail', (req, res, next) => {
            let html = '<div>테스트</div>';
            this.mail.sendMail('rlagkrdy3883@naver.com', '메일 테스트', html);
            res.send('메일 보내기 완료');
        });
    }

    setHeader(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.header('X-Frame-Options', 'SAMEORIGIN');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
        res.header(
            'Access-Control-Allow-Headers',
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
        );
        next();
    }
}
