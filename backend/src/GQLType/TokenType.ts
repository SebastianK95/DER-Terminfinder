import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from 'graphql';

export const TokenType: GraphQLObjectType = new GraphQLObjectType({
    name: 'token',
    fields: {
        id: {type: GraphQLID},
        userId: {type: GraphQLInt},
        tokenString: {type: GraphQLString},
        expirationDate: {type: GraphQLInt},
        used: {type: GraphQLInt},
        type: {type: GraphQLString}
    }
});
