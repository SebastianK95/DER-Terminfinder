export class Token {

  private _id: number; // unique, primary key, ai
  private _userId: number;
  private _tokenString: string; // unique
  private _type: string;
  private _expirationDate: number;
  private _used: number;

  private constructor(tokenString: string, userId: number, id: number, type: string, expirationDate: number, used: number) {
    this._tokenString = tokenString;
    this._userId = userId;
    this._id = id;
    this._type = type;
    this._expirationDate = expirationDate;
    this._used = used;
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get tokenString(): string {
    return this._tokenString;
  }

  get type(): string {
    return this._type;
  }

  get expirationDate(): number {
    return this._expirationDate;
  }

  get used(): number {
    return this._used;
  }

  public static fromData(data) {
    return new Token(data.tokenString, data.userId, data.id, data.type, data.expirationDate, data.used);
  }

  toData() {
    return {
      tokenString: this.tokenString,
      userId: this.userId,
      id: this.id,
      type: this.type,
      expirationDate: this.expirationDate,
      used: this.used
    }
  }
}
