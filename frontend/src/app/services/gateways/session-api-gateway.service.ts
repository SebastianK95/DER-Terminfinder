import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GraphQlParameterBuilder} from '../../helper/graph-ql-parameter-builder';
import {GraphQlResponse} from '../../types/GraphQlResponse';
import {AbstractApiGateway} from './AbstractApiGateway';

@Injectable()
export class SessionApiGatewayService extends AbstractApiGateway{
    constructor(http: Http) {
        super(http);
    }

    async userIsLoggedIn(userId: number, tokenString: string): Promise<GraphQlResponse> {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('tokenString', tokenString),
            GraphQlParameterBuilder.createParameterObject('userId', userId)
        ];
        return await super.query('userIsLoggedIn', parameters, null);
    }

    async loginUser(userId: number, ip: string = null): Promise<GraphQlResponse> {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('userId', userId),
            GraphQlParameterBuilder.createParameterObject('ip', ip)
        ];
        return await super.mutate('loginUser', parameters);
    }

    async logoutUser(userId: number, tokenString: string) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('tokenString', tokenString),
            GraphQlParameterBuilder.createParameterObject('userId', userId),
        ];
        return await super.mutate('logoutUser', parameters);
    }
}
