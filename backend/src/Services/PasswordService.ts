import {UserRepository, TokenRepository} from "../Repository/Repositories";
import {SMTP_FROM} from "../config";
import {MailerContent} from "../Mailer/MailerContent";
import {v4 as uuid} from "uuid";
import {DB} from "../DB";
import {Mailer} from "../Mailer/Mailer";
import {Logger} from './Logger';

const userRepository = new UserRepository(DB);
const tokenRepository = new TokenRepository(DB);
const mailer = new Mailer();

export class PasswordService {
    async sendPasswordResetMail(email: string, expirationDate: number) {
        let token = uuid();
        let user = (await userRepository.getUserByEmail(email))[0];
        let result = await tokenRepository.createToken({
            tokenString: token,
            userId: user.id,
            type: 'passwordReset',
            expirationDate: expirationDate
        });
        if (result !== false) {
            let content = new MailerContent();
            content.from = SMTP_FROM;
            content.html = 'Hallo <b>' + user.name + '</b>, <br><br> es wurde ein Zurücksetzen deines Passworts angefordert. Nutze dazu bitte folgendenen Link, der in <b>30 Minuten</b> abläuft. <br><a href="http://localhost:4200/changePassword/' + token + '"> Passwort zurücksetzen </a><br><br> Gruß, <br> Dein DerTerminfinder Team';
            content.to = email;
            content.subject = 'Passwort zurücksetzen';
            mailer.send(content);
            Logger.info('sent password reset mail to: '+ email);
            return true;
        }
        return false;
    }

    async sendPasswordChangedMail(userId: number){
        let user  = (await userRepository.getUserById(userId))[0];
        if(user){
            let content = new MailerContent();
            content.from = SMTP_FROM;
            content.html = 'Hallo <b>' + user.name + '</b>, <br><br> dein Passwort wurde erfolgreich geändert. <br><br> Gruß, <br> Dein DerTerminfinder Team';
            content.to = user.email;
            content.subject = 'Passwort Geändert';
            mailer.send(content);
            Logger.info('sent password was changed mail to: '+ user.email);
            return true;
        }
        return false;
    }
}