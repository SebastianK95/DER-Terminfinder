import {Injectable} from '@angular/core';
import {EventService} from './event.service';

@Injectable()
export class MessageBoxService {

    /**
     * Fenstersttatus
     * TRUE: sichtbar, FALSE: versteckt
     * @access private
     * var Boolean
     */
    public state: boolean = false;

    /**
     * Titel
     * @access private
     * var String
     */
    public title: string = '';

    /**
     * Nachricht
     * @access private
     * var String
     */
    public message: string = '';
    
    public config = {};

    constructor(private eventService: EventService) {
        eventService.errorOccurred.subscribe(MessageBoxService.name, (payload) => {
            if (payload.title === undefined) {
                payload.title = 'Ein Fehler ist aufgetreten';
            }
            this.show(payload.title, payload.message);
        });
        eventService.successOccurred.subscribe(MessageBoxService.name, (payload => {
            if (payload.title === undefined) {
                payload.title = 'Erfolg!';
            }
            this.show(payload.title, payload.message);
        }));
        eventService.redirectOccurred.subscribe(MessageBoxService.name, (payload) => {
            if (payload.title === undefined) {
                payload.title = 'Weiterleitung!';
            }
            this.show(payload.title, payload.message);
        })
    }

    show(title: string, message: string) {
        if (title !== '' && message !== '') {
          this.showBox({
            typ: 'message',
            title: title,
            message: message
          });
        }
    }
    
    /**
     * Diese Methode zeigt eine MessageBox an.
     * @param   {Object}   config    Konfiguratonsobjekt
     *                               {
     *                                 typ: Der Typ der Box
     *                                       'message', 'trueFalse'
     *                                 title:
     *                                 message:
     *                                 [trueFalse]: {
     *                                   ok: function() {}
     *                                   abort: function() {}
     *                                 }
     *                               }
     */
    showBox(config) {
      var self = this;
      if(typeof config !== 'object') {
        config = {};
      }
      if(typeof config.title !== 'string') {
        config.title = '';
      }
      if(typeof config.message !== 'string' && typeof config.message !== 'function') {
        config.message = '';
      }
      if(typeof config.message === 'function') {
        config.message = config.message();
      }
      if(typeof config.typ !== 'string') {
        config.typ = 'message';
      }
      if(config.typ === 'trueFalse' && typeof config.trueFalse !== 'object') {
        config.trueFalse = {
          ok: function() {
            self.state = false;
          },
          abort: function() {
            self.state = false;
          }
        };
      } else if(config.typ === 'trueFalse' && typeof config.trueFalse === 'object') {
        if(typeof config.trueFalse.ok !== 'function') {
          config.trueFalse.ok = function() {
            self.state = false;
          }
        }
        if(typeof config.trueFalse.abort !== 'function') {
          config.trueFalse.abort = function() {
            self.state = false;
          }
        }
      }
      
      this.state = true;
      this.config = config;
    }
}
