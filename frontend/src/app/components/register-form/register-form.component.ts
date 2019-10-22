import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

    /**
     * Benutzername
     * var String
     * access private
     */
    private username: string = '';

    /**
     * E-Mail
     * var String
     * access private
     */
    private email: string = '';

    /**
     * Kennwort
     * var String
     * access private
     */
    private password: string = '';

    /**
     * Kennwort Wiederholung
     * var String
     * access private
     */
    private password_retry: string = '';

    /**
     * Fehlerstatus
     * var Boolean
     * access private
     */
    private errors = false;

    /**
     * Array mit Fehlermeldungen
     * var Array
     * access private
     */
    private errorMessages = [];

    /**
     * Status, ob eine Mailadresse valide ist
     * var Boolean
     * access private
     */
    private mailValid: Boolean = false;

    /**
     * Konstruktor
     */
    constructor(private User: UserService, private eventService: EventService) {
    }

    /**
     * Diese Methode valiidiert eine E-Mailadresse nach DIN 5008.
     * (Regex: https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript)
     * @author Sebastian Koers
     * @return    Boolean    Status ob die Mailadresse valide ist oder nicht. (TRUE: ist valide, FALSE: ist nicht valide)
     */
    checkEmail() {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.mailValid = emailRegex.test(this.email.toLowerCase());
        return this.mailValid;
    }

    /**
     * Diese Methode valiidiert das Registrierungsformular.
     * @author Sebastian Koers
     */
    async submit() {
        // Zuruecksetzen des Fehlerstatus
        if (this.errors || this.errorMessages.length > 0) {
            this.errorMessages = [];
            this.errors = false;
        }

        // Valiidierung der Werte
        if (this.username !== '' && this.email !== '' && this.password !== '' && this.password_retry !== '') {
            // E-Mailvalidiierung
            if (!this.checkEmail) {
                this.errorMessages.push({text: 'Bitte geben Sie eine gueltige Mailadresse ein'});
                this.errors = true;
            }
            // Kennwortuebereinstimmung
            if (this.password !== this.password_retry) {
                this.errorMessages.push({text: 'Die angegebenen Kennwörter stimmen nicht überein'});
                this.errors = true;
            }

            if (!this.errors && this.errorMessages.length === 0) {
                let user = await this.User.getUser({email: this.email});

                if (user) {
                    this.errorMessages.push({text: 'Es existiert bereits ein Konto mit der angegebenen E-Mailaddresse'});
                    this.errors = true;
                } else {
                    if (this.User.createUser(this.username, this.email, this.password)) {
                        this.eventService.successOccurred.emit({
                            title: 'Erfolgreich registriert',
                            message: 'Die E-Mailadresse ' + this.email + ' wurde erfolgreich registriert.'
                        });
                    }
                }
            }

        } else {
            // einzelne Fehlermekdungen
            if (this.username === '') {
                this.errorMessages.push({text: 'Sie müssen einen Benutzernamen angeben'});
                this.errors = true;
            }
            if (this.email === '') {
                this.errorMessages.push({text: 'Sie müssen eine E-Mailadresse angeben'});
                this.errors = true;
            }
            if (this.password === '') {
                this.errorMessages.push({text: 'Sie müssen ein Kennwort angeben'});
                this.errors = true;
            }
            if (this.password_retry === '') {
                this.errorMessages.push({text: 'Sie müssen eine Kennwort-Wiedreholung angeben'});
                this.errors = true;
            }
        }
        if (this.errorMessages.length > 0) {
            let messageString = '';
            this.errorMessages.forEach((message) => {
                console.log(message);
                messageString += message.text + " "
            });
            this.eventService.errorOccurred.emit({title: 'Es traten Fehler auf', message: messageString});
        }
    }

    ngOnInit() {
    }

}
