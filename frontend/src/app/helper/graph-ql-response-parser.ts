import {GraphQlResponse} from '../types/GraphQlResponse';

export class GraphQlResponseParser {
    public static parse(response): GraphQlResponse{
        let parsedResponse = response.json().data;
        let functionName = Object.keys(parsedResponse)[0];
        let data = parsedResponse[functionName];
        return {functionName: functionName, data: data}
    }
}
