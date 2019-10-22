import {GraphQlMutationBuilder} from './graph-ql-mutation-builder';

describe('GraphQlMutationBuilder', () => {
    it('should build valid Mutation with multiple parameters', () => {
        const expectation = '{"query":"mutation{updateMutation(id:15,message:\\"Mutated Value\\")}","variables":null}';
        const actual = GraphQlMutationBuilder.buildSimpleMutation(
            'updateMutation',
            [{key: 'id', value: 15}, {key: 'message', value: 'Mutated Value'}]
        );
        expect(actual).toEqual(expectation);
    });

    it('should build valid Mutation with one parameter', () => {
        const expectation = '{"query":"mutation{insertMutation(message:\\"Inserted Value\\")}","variables":null}';
        const actual = GraphQlMutationBuilder.buildSimpleMutation(
            'insertMutation',
            [{key: 'message', value: 'Inserted Value'}]
        );
        expect(actual).toEqual(expectation);
    });

    it('should build valid Mutation with array as parameter', () => {
        const expectation = '{"query":"mutation{insertMultipleMutation(messages:[\\"TEST!\\",\\"TEST2\\",\\"TEST3\\"])}","variables":null}';
        const actual = GraphQlMutationBuilder.buildSimpleMutation(
            'insertMultipleMutation',
            [{key: 'messages', value: ["TEST!", "TEST2", "TEST3"]}]
        );
        expect(actual).toEqual(expectation);
    });
});