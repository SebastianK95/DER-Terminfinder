import {GraphQlParameterBuilder} from './graph-ql-parameter-builder';

describe('GraphQlParameterBuilder', () =>{
   it('should build valid GraphQlParameter', () =>{
       const expectation = {key: 'message', value: 'Hello World'};
       const actual = GraphQlParameterBuilder.createParameterObject('message', 'Hello World');
       expect(actual).toEqual(expectation);
   });

   it('should throw error if object is given as parameter', () =>{
       expect(()=> {
           const parameters = GraphQlParameterBuilder.createParameterObject('message', {message: 'bla'});
           GraphQlParameterBuilder.convertParametersToString([parameters])
       }).toThrow(new Error('Method no yet implemented'));
   });
});
