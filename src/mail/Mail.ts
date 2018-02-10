import * as nodemailer from 'nodemailer';
import MailConfig, { MailConfigOption } from './config/config';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

export default class HakyoMail {
    public nodeMailer: nodemailer.Transporter;

    constructor() {
        this.nodeMailer = nodemailer.createTransport(MailConfig.config);
    }

    sendMail(_to: string, _subject: string, _textHtml: string): void {
        this.nodeMailer.sendMail(
            {
                from: MailConfig.from,
                to: _to,
                subject: _subject,
                html: _textHtml
            },
            this.errHandle
        );
    }

    errHandle(err: Error | null, info: SentMessageInfo): void {
        if (err) {
            console.log('Fail to send mail');
            console.log('error : ', err);
        }

        if (info) {
            console.log('Complete to send mail');
        }
    }
}
