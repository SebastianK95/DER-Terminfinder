export class Finder {
    private _id: number;
    private _name: string;
    private _userId: number;
    private _description: string;

    constructor(name: string, userId: number, id: number = null, description: string = null) {
        this._id = id;
        this._name = name;
        this._userId = userId;
        this._description = description;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get userId(): number {
        return this._userId;
    }

    public static fromData(data){
        return new Finder(data.name, data.userId, data.id, data.description);
    }
    public static fromNameAndUserId(name: string, userId: number, description: string = null){
        return new Finder(name, userId, null, description);
    }
}
