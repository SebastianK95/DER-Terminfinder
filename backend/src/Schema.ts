import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {UserQueries} from './Queries/UserQueries';
import {UserMutations} from './Mutations/UserMutations';
import {FinderQueries} from './Queries/FinderQueries';
import {FinderMutations} from './Mutations/FinderMutations';
import {MeetingChoiceQueries} from './Queries/MeetingChoiceQueries';
import {MeetingChoiceMutations} from './Mutations/MeetingChoiceMutations';
import {TokenQueries} from "./Queries/TokenQueries";
import {TokenMutations} from "./Mutations/TokenMutations";
import {SessionQueries} from './Queries/SessionQueries';
import {SessionMutations} from './Mutations/SessionMutations';
import {GroupMutations} from './Mutations/GroupMutations';

export const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'root',
        fields: { // make sure the queries and mutations have unique names since they will be overwritten otherwise
            ...UserQueries,
            ...FinderQueries,
            ...MeetingChoiceQueries,
            ...TokenQueries,
            ...SessionQueries
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'mutate',
        fields: {
            ...UserMutations,
            ...FinderMutations,
            ...MeetingChoiceMutations,
            ...TokenMutations,
            ...SessionMutations,
            ...GroupMutations
        }
    })
});
