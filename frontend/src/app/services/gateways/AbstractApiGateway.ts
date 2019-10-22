import {GraphQlParameter} from '../../types/GraphQlParameter';
import {GraphQlQueryBuilder, GraphQlResponseParser} from '../../helper/GraphQlHelpers';
import {Headers, Http, RequestOptions, URLSearchParams} from '@angular/http';
import {GraphQlMutationBuilder} from '../../helper/graph-ql-mutation-builder';
import {GraphQlParameterBuilder} from '../../helper/graph-ql-parameter-builder';

export abstract class AbstractApiGateway {
    private static readonly GRAPHQL_URL = "http://localhost:4000/graphql";

    constructor(private http: Http) {
    }
    
    async dynamicQuery(tableName: string, felder = [], filter = {}, joins = []){
        var parameters = [], filterKeys = Object.keys(filter);
        
        // GraphQl-Parameter
        for(var i = 0; i < filterKeys.length; i++) {
          parameters.push(GraphQlParameterBuilder.createParameterObject(filterKeys[i], filter[filterKeys[i]]));
        }
        
        // GraphQlQuery
        let query = GraphQlQueryBuilder.buildSimpleQuery(
            'getData',
            null,
            felder
        );

        let parsedResult = null;

        await this.http.get(AbstractApiGateway.GRAPHQL_URL + "?" + query +
          '&filter=' + JSON.stringify(filter) +
          '&felder=' + JSON.stringify(felder) +
          '&join=' + JSON.stringify(joins) +
          '&tableName=' + tableName
        )
            .toPromise()
            .then((result) => {
              console.log(result);
                parsedResult = GraphQlResponseParser.parse(result);
            }).catch((error) => {
                console.log(error);
            });
        return parsedResult;
    }
    
    async dynamicMutation(tableName, felderData, filter = {}, typ = ''){
        let graphQlQueryName = '', parameter = {};
        parameter['table'] = tableName;
        if(typ === 'aendern') {
          parameter['aendernFelder'] = felderData;
          parameter['filter'] = filter;
          graphQlQueryName = 'updateData';
        } else if(typ === 'hinzufuegen') {
          parameter['hinzufuegenFelder'] = felderData;
          graphQlQueryName = 'setData';
        }
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            params: parameter
        });
        let mutation = GraphQlMutationBuilder.buildSimpleMutation(
            graphQlQueryName,
            null
        );
        let parsedResult = null;
        await this.http.post(AbstractApiGateway.GRAPHQL_URL, mutation, options)
            .toPromise()
            .then((result) => {
                parsedResult = GraphQlResponseParser.parse(result);
            }).catch((error) => {
                console.log(error);
            });
        return parsedResult;
    }
    
    async sendMailRequest(emailTo:string, subject:string, message:string) {
      let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            params: {
              emailTo: emailTo,
              subject: subject,
              message: message
            }
        });
        let mutation = GraphQlMutationBuilder.buildSimpleMutation(
            'sendMail',
            null
        );
        let parsedResult = null;
        await this.http.post(AbstractApiGateway.GRAPHQL_URL, mutation, options)
            .toPromise()
            .then((result) => {
                parsedResult = GraphQlResponseParser.parse(result);
            }).catch((error) => {
                console.log(error);
            });
        return parsedResult;
    };
    
    async query(queryName: string, parameters: Array<GraphQlParameter>, requestedValues: Array<string>){
        let query = GraphQlQueryBuilder.buildSimpleQuery(
            queryName,
            parameters,
            requestedValues
        );

        let parsedResult = null;

        await this.http.get(AbstractApiGateway.GRAPHQL_URL + "?" + query)
            .toPromise()
            .then((result) => {
                parsedResult = GraphQlResponseParser.parse(result);
            }).catch((error) => {
                console.log(error);
            });
        return parsedResult;
    }
    
    async mutate(queryName: string, parameters: Array<GraphQlParameter>){
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        let mutation = GraphQlMutationBuilder.buildSimpleMutation(
            queryName,
            parameters
        );
        let parsedResult = null;
        await this.http.post(AbstractApiGateway.GRAPHQL_URL, mutation, options)
            .toPromise()
            .then((result) => {
                parsedResult = GraphQlResponseParser.parse(result);
            }).catch((error) => {
                console.log(error);
            });
        return parsedResult;
    }

}