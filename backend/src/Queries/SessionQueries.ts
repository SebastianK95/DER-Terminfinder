import {GraphQLBoolean, GraphQLID, GraphQLString} from 'graphql';
import {DB} from '../DB';
import {SessionRepository} from '../Repository/SessionRepository';

const sessionRepository = new SessionRepository(DB);
export const SessionQueries = {
    userIsLoggedIn: {
        type: GraphQLBoolean,
        description: 'checks if a session with userId exists',
        args: {
            userId: {type: GraphQLID},
            tokenString: {type: GraphQLString},
        },
        resolve(request, args) {
            if (args.userId && args.tokenString) {
                return sessionRepository.userSessionExistsAndIsNotExpired(args.userId, args.tokenString);
            }
            return false;
        }
    },
};