import {GraphQLBoolean, GraphQLID, GraphQLString} from 'graphql';
import {DB} from '../DB';
import {SessionRepository} from '../Repository/SessionRepository';

const sessionRepository = new SessionRepository(DB);


export const SessionMutations = {
    loginUser: {
        type: GraphQLString,
        description: "Creates a user session",
        args: {
            userId: {type: GraphQLID},
            ip: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.userId) {
                let ip = args.ip != undefined ? args.ip : null;
                return sessionRepository.createSession(args.userId, ip);
            }
            return '';
        }
    },

    logoutUser: {
        type: GraphQLBoolean,
        description: "destroys a user session",
        args: {
            userId: {type: GraphQLID},
            tokenString: {type: GraphQLString}
        },
        resolve(request, args) {
            if(args.tokenString && args.userId){
                return sessionRepository.destroySession(args.tokenString, args.userId);
            }
            return false;
        }
    },
};