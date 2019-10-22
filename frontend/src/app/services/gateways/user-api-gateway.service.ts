import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GraphQlResponse} from '../../types/GraphQlResponse';
import {GraphQlParameter} from '../../types/GraphQlParameter';
import {AbstractApiGateway} from './AbstractApiGateway';
import {GatewayServiceInterface} from './GatewayServiceInterface';
import {GraphQlParameterBuilder} from '../../helper/graph-ql-parameter-builder';
import {User} from '../../entity/user';

@Injectable()
export class UserApiGatewayService extends AbstractApiGateway implements GatewayServiceInterface {
    constructor(http: Http) {
        super(http);
    }

    /**
     * Diese Methode prueft, ob ein User existiert.
     * @author Sebastian Koers
     * @param    (object)    filter    Ein Objekt, welches Filterargumente enthaelt.
     *                                 {
     *                                   feldname: wert
     *                                 }
     */
    async getUser(filter = {}): Promise<GraphQlResponse> {
        let parameters = [], filterKeys = Object.keys(filter);
        for (let i = 0; i < filterKeys.length; i++) {
            parameters.push(GraphQlParameterBuilder.createParameterObject(filterKeys[i], filter[filterKeys[i]]));
        }
        return await super.query('getUsers', parameters, ['id', 'email', 'name']);
    }

    async getById(id: number): Promise<GraphQlResponse> {
        let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
        let requestedValues = ['id', 'name', 'email'];
        return await super.query('getUsers', parameters, requestedValues);
    }

    async getByParameters(parameters: Array<GraphQlParameter>, requestedValues: string[]): Promise<GraphQlResponse> {
        return await super.query('getUsers', parameters, requestedValues);
    }

    async create(user: User): Promise<GraphQlResponse> {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('name', user.name),
            GraphQlParameterBuilder.createParameterObject('email', user.email),
            GraphQlParameterBuilder.createParameterObject('password', user.password),
        ];
        return await super.mutate('createUser', parameters)
    }

    async exists(id: number): Promise<GraphQlResponse> {
        let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
        return await super.query('userExists', parameters, null);
    }

    async existsByEmail(email: string): Promise<GraphQlResponse> {
        let parameters = [GraphQlParameterBuilder.createParameterObject('email', email)];
        return await super.query('userExists', parameters, null);
    }

    async delete(id: number): Promise<GraphQlResponse> {
        let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
        return await super.mutate('deleteUser', parameters);
    }

    async userIsAuthorizedById(id: number, password: string) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('id', id),
            GraphQlParameterBuilder.createParameterObject('password', password),
        ];
        return await super.query('userIsAuthorizedById', parameters, null);
    }

    async userIsAuthorizedByEmail(email: string, password: string) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('email', email),
            GraphQlParameterBuilder.createParameterObject('password', password),
        ];
        return await super.query('userIsAuthorizedByEmail', parameters, null);
    }

    async updatePassword(id: number, password: string) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('id', id),
            GraphQlParameterBuilder.createParameterObject('password', password),
        ];
        return await super.mutate('updatePassword', parameters);
    }

    async updateUsername(id: number, name: string) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('id', id),
            GraphQlParameterBuilder.createParameterObject('name', name),
        ];
        return await super.mutate('updateUsername', parameters);
    }

    async resetPassword(email: string) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('email', email),
            GraphQlParameterBuilder.createParameterObject('expirationDate', Math.floor(Date.now() / 1000) + (60 * 30))
        ];
        return await super.mutate('sendResetPasswordMail', parameters);
    }

    async userDoLogout(request: any) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('request ', request),
        ];
        return await super.mutate('userDoLogout', parameters);
    }
}
