import {GraphQlQueryBuilder, GraphQlParameterBuilder} from './GraphQlHelpers';

describe('GraphQlQueryBuilder', () => {
   it('should build valid Query without parameters and requested fields', () =>{
        let expectation = 'query={exampleQuery{id}}';
        const actual = GraphQlQueryBuilder.buildSimpleQuery(
            'exampleQuery'
        );
        expect(actual).toEqual(expectation);
   });

   it('should build valid Query with parameters and request fields', () =>{
       let expectation = 'query={exampleQuery(id:"15"){id,message}}';
       const actual = GraphQlQueryBuilder.buildSimpleQuery(
           'exampleQuery',
           [GraphQlParameterBuilder.createParameterObject('id', 15)],
           ['id', 'message']
       );
       expect(actual).toEqual(expectation);
   });
});
