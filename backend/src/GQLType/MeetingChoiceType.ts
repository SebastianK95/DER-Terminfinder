import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLBoolean, } from 'graphql';

export const MeetingChoiceType: GraphQLObjectType = new GraphQLObjectType({
    name: 'meetingChoice',
    fields: {
        id: { type: GraphQLID },
        finderId: { type: GraphQLID },
        date: { type: GraphQLInt },
        time: { type: GraphQLInt },
        isprivate: { type: GraphQLInt }
    }
});
