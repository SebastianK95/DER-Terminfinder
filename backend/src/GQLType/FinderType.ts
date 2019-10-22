import {GraphQLID, GraphQLObjectType, GraphQLString} from 'graphql';

export const FinderType: GraphQLObjectType = new GraphQLObjectType({
    name: 'finder',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        userId: {type: GraphQLID},
        description: {type: GraphQLString}
    }
});
