import {FinderType} from '../GQLType/Types';
import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLString} from 'graphql';
import {DB} from '../DB';
import {FinderRepository} from '../Repository/Repositories';
import {GeneralRepository} from '../Repository/Repositories';

const generalRepository = new GeneralRepository(DB);
const finderRepository = new FinderRepository(DB);
export const FinderQueries = {
    getFinders: {
        type: new GraphQLList(FinderType),
        description: 'Returns a Finder by id or userId, if no arguments are given all finders will be returned',
        args: {
            id: {type: GraphQLID},
            userId: {type: GraphQLID},
            name: {type: GraphQLString}
        },
        resolve(request, args) {
            if(args) {
              return generalRepository.select('Finder', '*', args);
            }
        }
    },
    finderExists: {
        type: GraphQLBoolean,
        description: 'checks if the finder with id x exists',
        args: {
            id: {type: GraphQLID}
        },
        resolve(request, args) {
            if (args.id) {
                return finderRepository.finderExists(args.id);
            }
            return false;
        }
    }
};