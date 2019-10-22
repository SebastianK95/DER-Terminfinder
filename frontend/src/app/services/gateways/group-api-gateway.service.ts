import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GraphQlResponse} from '../../types/GraphQlResponse';
import {GraphQlParameter} from '../../types/GraphQlParameter';
import {AbstractApiGateway} from './AbstractApiGateway';
import {GatewayServiceInterface} from './GatewayServiceInterface';
import {GraphQlParameterBuilder} from '../../helper/graph-ql-parameter-builder';

@Injectable()
export class GroupApiGatewayService extends AbstractApiGateway {
    constructor(http: Http) {
        super(http);
        
    }
    async addMembers(memberIds, groupId): Promise<GraphQlResponse> {
        let parameters = [
          GraphQlParameterBuilder.createParameterObject('memberIds', (typeof memberIds === 'string' ? memberIds : '')),
          GraphQlParameterBuilder.createParameterObject('groupId', (typeof groupId === 'number' ? groupId : 0))
        ];
        return await super.mutate('addMembers', parameters);
    }
    async deleteMembers(userRemoveId, groupId): Promise<GraphQlResponse> {
        let parameters = [
          GraphQlParameterBuilder.createParameterObject('userRemoveId', (typeof userRemoveId === 'number' ? userRemoveId : 0)),
          GraphQlParameterBuilder.createParameterObject('groupId', (typeof groupId === 'number' ? groupId : 0))
        ];
        return await super.mutate('deleteMembers', parameters);
    }
    async addToFinder(finderId, groupId): Promise<GraphQlResponse> {
        let parameters = [
          GraphQlParameterBuilder.createParameterObject('finderId', (typeof finderId === 'number' ? finderId : 0)),
          GraphQlParameterBuilder.createParameterObject('groupId', (typeof groupId === 'number' ? groupId : 0))
        ];
        return await super.mutate('addToFinder', parameters);
    }
    async removeFromFinder(finderId, groupId): Promise<GraphQlResponse> {
        let parameters = [
          GraphQlParameterBuilder.createParameterObject('finderId', (typeof finderId === 'number' ? finderId : 0)),
          GraphQlParameterBuilder.createParameterObject('groupId', (typeof groupId === 'number' ? groupId : 0))
        ];
        return await super.mutate('removeFromFinder', parameters);
    }
}
