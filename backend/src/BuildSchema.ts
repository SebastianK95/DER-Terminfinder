import {GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean} from 'graphql';
import {DB} from './DB';
import {Schema} from './Schema';
import {GeneralRepository} from './Repository/Repositories';
// Queries und Mutations
import {UserQueries} from './Queries/UserQueries';
import {UserMutations} from './Mutations/UserMutations';
import {FinderQueries} from './Queries/FinderQueries';
import {FinderMutations} from './Mutations/FinderMutations';
import {MeetingChoiceQueries} from './Queries/MeetingChoiceQueries';
import {MeetingChoiceMutations} from './Mutations/MeetingChoiceMutations';
import {TokenQueries} from './Queries/TokenQueries';
import {TokenMutations} from './Mutations/TokenMutations';
import {SessionQueries} from './Queries/SessionQueries';
import {SessionMutations} from './Mutations/SessionMutations';
import {GroupMutations} from './Mutations/GroupMutations';

const generalRepository = new GeneralRepository(DB);

export class BuildSchema {

    constructor() {
    }

    /**
     Diese Methode baut ein DB - Schema.
     @author Sebastian Koers
     @param    {object}    request    Der abgesetzte Request.
     @return   {object}    schema     Das DB - Schema.
     */
    public build(request) {
        let felder = [], types = {}, schema = null;
        // Generierung eines dynamischen GraphQlQueries
        if (typeof request.query.felder !== 'undefined'
          || typeof request.query.hinzufuegenFelder !== 'undefined'
          || typeof request.query.emailTo !== 'undefined'
          || typeof request.query.aendernFelder !== 'undefined'
          ) {
            let GeneralQuery;
            if(typeof request.query.felder !== 'undefined') {
                felder = JSON.parse(request.query.felder);
                for (let i = 0; i < felder.length; i++) {
                    types[felder[i]] = {type: GraphQLString};
                }
                GeneralQuery = {
                    getData: {
                        type: new GraphQLList(new GraphQLObjectType({
                            name: 'dynamicTypes',
                            fields: types
                        })),
                        description: 'Returns a Finder by id or userId, if no arguments are given all finders will be returned',
                        resolve(request, args) {
                            return generalRepository.dynamicSelect(
                                request.query.tableName,
                                JSON.parse(request.query.felder),
                                JSON.parse(request.query.filter),
                                JSON.parse(request.query.join)
                            );
                        }
                    }
                };
            } else if (typeof request.query.hinzufuegenFelder !== 'undefined') {
                let hinzufuegenFelder = JSON.parse(request.query.hinzufuegenFelder);
                GeneralQuery = {
                    setData: {
                        type: GraphQLBoolean,
                        description: 'Returns a Finder by id or userId, if no arguments are given all finders will be returned',
                        resolve(request, args) {
                            return generalRepository.dynamicInsert(
                                request.query.table,
                                hinzufuegenFelder
                            );
                        }
                    }
                };
            } else if (typeof request.query.emailTo !== 'undefined') {
                console.log('wertest');
                GeneralQuery = {
                    sendMail: {
                        type: GraphQLBoolean,
                        description: 'Returns a Finder by id or userId, if no arguments are given all finders will be returned',
                        resolve(request, args) {
                            return generalRepository.sendMail(
                                request.query.emailTo,
                                request.query.subject,
                                request.query.message
                            );
                        }
                    }
                };
            } else if(typeof request.query.aendernFelder !== 'undefined') {
              let aendernFelder = JSON.parse(request.query.aendernFelder),
                filter = JSON.parse(request.query.filter)
              ;
                GeneralQuery = {
                    updateData: {
                        type: GraphQLBoolean,
                        description: 'Returns a Finder by id or userId, if no arguments are given all finders will be returned',
                        resolve(request, args) {
                            return generalRepository.dynamicUpdate(
                                request.query.table,
                                aendernFelder,
                                filter
                            );
                        }
                    }
                };
            }
            // DB - Schema erzeugen
            schema = new GraphQLSchema({
                query: new GraphQLObjectType({
                    name: 'root',
                    fields: {
                        ...UserQueries,
                        ...FinderQueries,
                        ...MeetingChoiceQueries,
                        ...TokenQueries,
                        ...GeneralQuery,
                        ...SessionQueries
                    }
                }),
                mutation: new GraphQLObjectType({
                    name: 'mutate',
                    fields: {
                        ...UserMutations,
                        ...FinderMutations,
                        ...TokenMutations,
                        ...MeetingChoiceMutations,
                        ...SessionMutations,
                        ...GeneralQuery,
                        ...GroupMutations
                    }
                })
            });
        } else {
            schema = Schema;
        }
        return schema;
    }
}