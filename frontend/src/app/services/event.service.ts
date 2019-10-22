import {Injectable} from '@angular/core';
import {Event} from '../Event';

@Injectable()
export class EventService {

    public loginStateUpdated = new Event('loginStateUpdated');
    public appStarted = new Event('appStarted');
    public errorOccurred = new Event('errorOccurred');
    public successOccurred = new Event('successOccurred');
    public redirectOccurred = new Event('redirectOccurred');

    constructor() {
        // this.errorOccurred.subscribe((EventService.name), (payload => {
        //     console.log(payload);
        // }));
    }
}
