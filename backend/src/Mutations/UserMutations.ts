import {GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString} from 'graphql';
import {UserRepository} from '../Repository/Repositories';
import {DB} from '../DB';
import {PasswordService} from "../Services/PasswordService";

const userRepository = new UserRepository(DB);
const passwordService = new PasswordService();

export const UserMutations = {
    createUser: {
        type: GraphQLBoolean,
        description: "Inserts one User into the Database",
        args: {
            name: {type: GraphQLString},
            email: {type: GraphQLString},
            password: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.name && args.email && args.password) {
                return userRepository.createUser(args);
            }
            return false;
        }
    },
    sendResetPasswordMail: {
        type: GraphQLBoolean,
        description: "resets Password Of User with email",
        args: {
            email: {type: GraphQLString},
            expirationDate: {type: GraphQLInt},
        },
        resolve(request, args) {
            if (args.email) {
                return passwordService.sendPasswordResetMail(args.email, args.expirationDate)
            }
            return false;
        }
    },
    updateUsername: {
        type: GraphQLBoolean,
        description: "Updates a users username",
        args: {
            id: {type: GraphQLID},
            name: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.id && args.name) {
                return userRepository.updateUsername(args);
            }
            return false;
        }
    },
    updatePassword: {
        type: GraphQLBoolean,
        description: "Updates a users password",
        args: {
            id: {type: GraphQLID},
            password: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.id && args.password) {
                let result = userRepository.updatePassword(args);
                if(result){
                    passwordService.sendPasswordChangedMail(args.id);
                }
                return result;
            }
            return false;
        }
    },
    deleteUser: {
        type: GraphQLBoolean,
        description: "Deletes one User by id",
        args: {
            id: {type: GraphQLID}
        },
        resolve(request, args) {
            return args.id ? userRepository.deleteUserById(args.id) : false
        }
    },
}