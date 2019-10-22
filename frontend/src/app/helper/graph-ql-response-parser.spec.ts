import { GraphQlResponseParser } from './graph-ql-response-parser';
import {Headers, Response, ResponseOptions} from '@angular/http';

describe('GraphQlResponseParser', () => {
    it('should build valid Query without parameters and requested fields', () => {
        const response = new Response(new ResponseOptions({
            body: JSON.stringify({data: {"exampleFunction":[{"id":15,"message":"Hello World"}]}}),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }));
        const expectation = {
            functionName: 'exampleFunction',
            data: [{
                id: 15,
                message: 'Hello World'
            }]
        };
        const actual = GraphQlResponseParser.parse(response);
        expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectation));

    });
});
