// Das Request wird als erste Variable des GraphQL Objekts in Schema.ts übergeben.
// Von dem request-Objekt kann einfach auf .session zugegriffen werden.
// Das Session-Objekt speichert die Session automatisch bei Änderungen.
// Die Sessions werden in /sessions/SESSION-ID.json gespeichert

// Beispiel
// /backend/Schema.ts

import {GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLBoolean, GraphQLString} from 'graphql';

import {ExampleRepository} from './Repository/Repositories';
import {ExampleType, ExampleTypeInput} from './GQLType/Types';
import {DB} from './DB';

const exampleRepository = new ExampleRepository(DB);

const query = new GraphQLObjectType({
    name: 'root',
    fields: {
        getExamples: { // Query
            type: new GraphQLList(ExampleType), // Return Type
            description: "Returns Example by id or all Examples if no id is given", // Description shown in Graphiql-GUI
            args: { // Arguments
                id: { type: GraphQLID } // Argument Type
            },
            resolve(request, args) { // Resolver function
                // Zähle wie oft der User zugegriffen hat
                if (!request.session.access_counter) {
                    request.session.access_counter = 0;
                }
                request.session.access_counter++;

                // Weiter übergeben
                return args.id ? exampleRepository.getExample(args.id) : exampleRepository.getAllExamples()
            }
        }
    }
});