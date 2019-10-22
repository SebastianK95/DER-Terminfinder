export class MeetingChoice {
    private _id: number; // unique, primary key, ai // not null
    private _finderId: number; // not null
    private _date: number; // not null
    private _time: number; // nullable
    private _isprivat: number;

    private constructor(finderId: number, date: number, time: number = null, isprivat: number, id: number = null) {
        this._finderId = finderId;
        this._date = date;
        this._time = time;
        this._isprivat = isprivat;
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    get finderId(): number {
        return this._finderId;
    }

    get date(): number {
        return this._date;
    }

    get time(): number {
        return this._time;
    }

    get isprivate(): number {
        return this._isprivat;
    }

    public static fromData(data) {
        return new MeetingChoice(data.finderId, data.date, data.time, data.isprivate, data.id);
    }

    public static fromFinderIdDateAndTime(finderId: number, date: number, time: number = null, isprivat: number) {
        return new MeetingChoice(finderId, date, time, isprivat, null);
    }
}
