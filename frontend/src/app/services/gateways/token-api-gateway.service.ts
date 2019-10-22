import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GraphQlResponse} from '../../types/GraphQlResponse';
import {AbstractApiGateway} from './AbstractApiGateway';
import {GraphQlParameterBuilder} from '../../helper/graph-ql-parameter-builder';

@Injectable()
export class TokenApiGatewayService extends AbstractApiGateway {
  constructor(http: Http) {
    super(http);
  }

  async getByTokenString(tokenString: string): Promise<GraphQlResponse> {
    let parameters = [GraphQlParameterBuilder.createParameterObject('tokenString', tokenString)];
    let requestedValues = ['id', 'userId', 'expirationDate', 'used', 'type', 'tokenString'];
    return await super.query('getToken', parameters, requestedValues);
  }

  async exists(tokenString: string): Promise<GraphQlResponse> {
    let parameters = [GraphQlParameterBuilder.createParameterObject('tokenString', tokenString)];
    return await super.query('tokenExists', parameters, null);
  }

  async isNotExpired(tokenString: string): Promise<GraphQlResponse> {
    let parameters = [GraphQlParameterBuilder.createParameterObject('tokenString', tokenString)];
    return await super.query('tokenIsNotExpired', parameters, null);
  }

  async setAsUsed(tokenString: string) {
    let parameters = [
      GraphQlParameterBuilder.createParameterObject('tokenString', tokenString),
    ];
    return await super.mutate('setTokenAsUsed', parameters);
  }
}
