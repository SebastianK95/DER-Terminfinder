import {GraphQLBoolean, GraphQLString} from 'graphql';
import {DB} from '../DB';
import {TokenRepository} from "../Repository/TokenRepository";

const tokenRepository = new TokenRepository(DB);

export const TokenMutations = {
    setTokenAsUsed: {
        type: GraphQLBoolean,
        description: "sets a token as used",
        args: {
            tokenString: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.tokenString) {
                return tokenRepository.setTokenAsUsed(args.tokenString);
            }
            return false;
        }
    }
}