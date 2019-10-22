import {GraphQLID, GraphQLInt, GraphQLObjectType} from 'graphql';

export const SessionType: GraphQLObjectType = new GraphQLObjectType({
    name: 'token',
    fields: {
        id: {type: GraphQLID},
        userId: {type: GraphQLInt},
        expirationDate: {type: GraphQLInt},
    }
});
