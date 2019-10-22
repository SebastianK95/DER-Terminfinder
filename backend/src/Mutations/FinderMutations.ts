import {GraphQLBoolean, GraphQLID, GraphQLString} from 'graphql';
import {DB} from '../DB';
import {FinderRepository} from '../Repository/Repositories';
import {GeneralRepository} from '../Repository/Repositories';

const generalRepository = new GeneralRepository(DB);
const finderRepository = new FinderRepository(DB);

export const FinderMutations = {
    createFinder: {
        type: GraphQLBoolean,
        description: "Inserts one Meeting Choice into the Database",
        args: {
            name: {type: GraphQLString},
            userId: {type: GraphQLID},
            description: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args) {
                return generalRepository.insert('Finder', args);
            }
            return false;
        }
    },
    updateFinderName: {
        type: GraphQLBoolean,
        description: "Updates a finders name",
        args: {
            id: {type: GraphQLID},
            name: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.id && args.name) {
                return finderRepository.updateFinderName(args);
            }
            return false;
        }
    },
    updateFinderDescription: {
        type: GraphQLBoolean,
        description: "Updates a finders description",
        args: {
            id: {type: GraphQLID},
            description: {type: GraphQLString}
        },
        resolve(request, args) {
            if (args.id && args.description) {
                return finderRepository.updateFinderDescription(args);
            }
            return false;
        }
    },
    deleteFinder: {
        type: GraphQLBoolean,
        description: "Deletes one Finder by id",
        args: {
            id: {type: GraphQLID}
        },
        resolve(request, args) {
            return args.id ? finderRepository.deleteFinderById(args.id) : false
        }
    },
};