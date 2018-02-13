import * as express from 'express';
import * as Promise from 'promise';
import HakyoMail from './utils/mail/Mail';
import * as morgan from 'morgan';

//하나의 모듈이 하나의 export만 가지는 경우 default를 사용한다.
export default class App {
    public app: express.Application;
    public mail: HakyoMail = new HakyoMail();

    constructor() {
        this.app = express();

        this.app.use(morgan('dev'));
        this.app.use(this.setHeader);

        this.app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let p1 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('Enter to SetTimeout 3000');
                    resolve();
                }, 3000);
            });

            p1.then(result => {
                console.log(`setTimeout Test`);
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
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    }
}
