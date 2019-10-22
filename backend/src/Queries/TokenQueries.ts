import {GraphQLBoolean, GraphQLString} from 'graphql';
import {DB} from '../DB';
import {TokenRepository} from "../Repository/Repositories";
import {TokenType} from "../GQLType/Types";

const tokenRepository = new TokenRepository(DB);

export const TokenQueries = {
    getToken: {
        type: TokenType,
        description: 'Returns a token by tokenString',
        args: {
            tokenString: {type: GraphQLString}
        },
        async resolve(request, args) {
            if (args.tokenString) {
                return await tokenRepository.getToken(args.tokenString);
            }
            return null;
        }
    },
    tokenIsNotExpired: {
        type: GraphQLBoolean,
        description: 'checks if a token is not expired or used',
        args: {
            tokenString: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.tokenString) {
                return tokenRepository.tokenIsNotExpired(args.tokenString)
            }
            return false;
        }
    },
    tokenExists: {
        type: GraphQLBoolean,
        description: 'checks if a token with tokenString exists',
        args: {
            tokenString: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.tokenString) {
                return tokenRepository.tokenExists(args.tokenString)
            }
            return false;
        }
    }
};