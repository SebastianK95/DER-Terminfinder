import {SessionService} from './services/session.service';
import {EventService} from './services/event.service';

export interface InfrastructureAwareInterface{
    getSessionService(): SessionService;
    getEventService(): EventService;
}