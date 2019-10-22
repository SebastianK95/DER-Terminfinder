export class User {
    private _id: number; // unique, primary key, ai
    private _name: string;
    private _email: string; // unique
    private _password: string;

    private constructor(name: string, email: string, id: number = null, password: string = null) {
        this._name = name;
        this._email = email;
        this._id = id;
        this._password = password;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    public static fromData(data){
        return new User(data.name, data.email, data.id, data.password);
    }

    toData(){
      return {name: this.name, email: this.email, id: this.id}
    }

    public static fromNameEmailPassword(name: string, email:string, password: string){
        return new User(name, email, null, password);
    }
}
