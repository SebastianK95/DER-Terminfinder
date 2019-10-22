import {GraphQlParameter} from '../types/GraphQlParameter';

export class GraphQlQueryBuilder {
    public static buildSimpleQuery(functionName: string, parameters: Array<GraphQlParameter> = null, requestedValues: Array<string> = ['id']): string {
        let query: string = `query={${functionName}`;
        query = this.addParametersToQuery(parameters, query);
        query = this.addRequestedValuesToQuery(requestedValues, query);
        query += "}";
        return query;
    }

    private static addParametersToQuery(parameters: Array<GraphQlParameter>, query: string): string {
        if (parameters != null) {
            query += "(";
            for (let index = 0; index < parameters.length; index++) {
                query += parameters[index].key + ":\"" + parameters[index].value + "\",";
            }
            query = query.substring(0, query.length - 1);
            query += ")";
        }
        return query;
    }

    private static addRequestedValuesToQuery(requestedValues: Array<string>, query: string): string {
        if (requestedValues != null) {
            query += "{";
            for (let index = 0; index < requestedValues.length; index++) {
                query += requestedValues[index] + ",";
            }
            query = query.substring(0, query.length - 1);
            query += "}";
        }
        return query;
    }
}

