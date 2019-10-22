import {UserType} from '../GQLType/Types';
import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLString} from 'graphql';
import {UserRepository} from '../Repository/Repositories';
import {GeneralRepository} from '../Repository/Repositories';
import {DB} from '../DB';

const userRepository = new UserRepository(DB);
const generalRepository = new GeneralRepository(DB);
export const UserQueries = {
    getUsers: {
        type: new GraphQLList(UserType),
        description: 'Returns a User by id or email, if no arguments are given all users will be returned',
        args: {
            id: {type: GraphQLID},
            email: {type: GraphQLString}
        },
        resolve(request, args) {
            if(args.id){
                return generalRepository.select('User', '*', {id: args.id});
            }
            if(args.email){
                return generalRepository.select('User', '*', {email: args.email});
            }
            return userRepository.getUsers();
        } 
    },
    userIsAuthorizedById: {
        type: GraphQLBoolean,
        description: 'checks if the password for this user is correct',
        args: {
            id: {type: GraphQLID},
            password: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.id && args.password) {
                return userRepository.userExistsAndIsAuthorizedById(args.id, args.password);
            }
            return false;
        }
    },
    userIsAuthorizedByEmail: {
        type: GraphQLBoolean,
        description: 'checks if the password for this user is correct',
        args: {
            email: {type: GraphQLString},
            password: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.email && args.password) {
                return userRepository.userExistsAndIsAuthorizedByEmail(args.email, args.password);
            }
            return false;
        }
    },
    userExists: {
        type: GraphQLBoolean,
        description: 'checks if the user with id x exists',
        args: {
            id: {type: GraphQLID},
            email: {type: GraphQLString},
        },
        resolve(request, args) {
            if (args.id) {
                return userRepository.userExists(args.id);
            }
            if (args.email) {
                return userRepository.userExistsByEmail(args.email);
            }
            return false;
        }
    }
};