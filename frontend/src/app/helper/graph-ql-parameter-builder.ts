import {GraphQlParameter} from '../types/GraphQlParameter';

export class GraphQlParameterBuilder {
    public static createParameterObject(key: string, value: any): GraphQlParameter {
        return {key: key, value: value};
    }

    public static convertParametersToString(parameters: Array<GraphQlParameter>) {
        let append = "(";
        for (let index = 0; index < parameters.length; index++) {
            let value = parameters[index].value;
            let key = parameters[index].key;

            append += key + ':' + this.convertValue(value) + ',';
        }
        append = append.substring(0, append.length - 1);
        append += ")";
        return append;
    }

    private static convertValue(value: any) {
        let append = '';
        if (Array.isArray(value)) {
            append = this.convertArray(value);
        } else if (typeof value === 'object') {
            throw new Error('Method no yet implemented');
        } else if (typeof value === 'number') {
            append = this.convertInt(value);
        } else{
            append = this.convertString(value);
        }
        return append;
    }

    private static convertArray(value: any) {
        let append = "[";
        for (let arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
            append += this.convertValue(value[arrayIndex]) + ',';
        }
        append = append.substring(0, append.length - 1);
        append += "]";
        return append;
    }

    private static convertString(value: any) {
        return "\\\"" + value + "\\\"";
    }

    private static convertInt(value: any) {
        return value;
    }
}
