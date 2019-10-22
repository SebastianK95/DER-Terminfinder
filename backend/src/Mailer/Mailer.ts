import { createTransport } from 'nodemailer';
import { MailerContent } from './MailerContent';

import * as CONFIG from '../config';

export class Mailer {

    private transporter;
    constructor() {
        this.transporter = createTransport({
            host: CONFIG.SMTP_HOST,
            port: CONFIG.SMTP_PORT,
            secure: CONFIG.SMTP_SSL,
            auth: {
                user: CONFIG.SMTP_USER,
                pass: CONFIG.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    public send(content: MailerContent) : void {
        let error = '';
        if (!content.from) {
            content.from = CONFIG.SMTP_FROM;
        }
        if (!content.to) {
            throw new Error("Please set the receiver of your mail.");
        }
        if (!content.subject) {
            throw new Error("Please set the subject of your mail.");
        }
        if (!content.text && !content.html) {
            throw new Error("Please set the content of your mail.");
        }
        
        this.transporter.sendMail(content, (error) => {
            if (error) {
                throw new Error("Could not send mail: " + error);
            }
        });
    }
}

