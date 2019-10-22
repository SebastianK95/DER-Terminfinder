import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ConfigService {
    constructor(private http: Http) {
    }

    private result: Object;

    async getConfiguration(key) {
        await this.http.get('../config.json').subscribe((res) => {
            this.result = res.json();
        }, (error) => {
            if(error){
                console.log(error.message);
            }
        });
        return this.result[key] != undefined ? this.result[key] : null;
    }
}
