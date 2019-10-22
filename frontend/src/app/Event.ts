export class Event {

    private subscribers: Array<{ name: string, callback: (payload: any) => void}> = [];
    private _eventName: string;


    get eventName(): string {
        return this._eventName;
    }

    constructor(eventName: string) {
        this._eventName = eventName;
    }

    emit(payload: {} = null) {
        this.subscribers.forEach((subscriber) => {
            console.info('emitting event ' + this._eventName + ' to subscriber ' + subscriber.name + ' with payload ' + JSON.stringify(payload));
            subscriber.callback(payload);
        })
    }

    subscribe(subscriberName: string, callback: (payload: any) => void) {
        this.subscribers.push({name: subscriberName, callback: callback});
    }

    unsubscribe(subscriberName: string) {
        this.subscribers = this.subscribers.filter((subscriber) => {
            return subscriber.name !== subscriberName
        });
    }
}