export interface MailConfigOption {
    host: string;
    port: number;
    auth: MailAuthOption;
}

export interface MailAuthOption {
    user: string;
    pass: string;
}

export default class MailConfig {
    static readonly config: MailConfigOption = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'rlagkrdy',
            pass: 'bwuenofmyrcjmccw'
        }
    };

    static readonly from: '"김학요" <rlagkrdy@gamil.net>';
}
