import {GraphQlParameter} from '../types/GraphQlParameter';
import {GraphQlParameterBuilder} from './graph-ql-parameter-builder';

export class GraphQlMutationBuilder {
    static buildSimpleMutation(functionName: string, parameters: Array<GraphQlParameter> = null) {
        let mutation: string = `mutation{${functionName}`;
        mutation = this.addParametersToMutation(parameters, mutation);
        mutation += "}";
        return '{"query":"' + mutation + '","variables":null}';
    }

    private static addParametersToMutation(parameters: Array<GraphQlParameter>, mutation: string): string {
        if (parameters != null) {
            mutation += GraphQlParameterBuilder.convertParametersToString(parameters);
        }
        return mutation;
    }
}
