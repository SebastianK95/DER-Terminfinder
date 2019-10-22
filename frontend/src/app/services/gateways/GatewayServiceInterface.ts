import {GraphQlParameter} from '../../types/GraphQlParameter';
import {GraphQlResponse} from '../../types/GraphQlResponse';

export interface GatewayServiceInterface{
    getById(id: number): Promise<GraphQlResponse>;
    create(args: any): Promise<GraphQlResponse>;
    exists(id: number): Promise<GraphQlResponse>;
    delete(id: number): Promise<GraphQlResponse>;
    getByParameters(parameters: Array<GraphQlParameter>, requestedValues: string[], functionName: string): Promise<GraphQlResponse>;
}