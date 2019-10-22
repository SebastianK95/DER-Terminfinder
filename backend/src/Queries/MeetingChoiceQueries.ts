import {GraphQLBoolean, GraphQLID, GraphQLList} from 'graphql';
import {DB} from '../DB';
import {MeetingChoiceRepository} from '../Repository/MeetingChoiceRepository';
import {MeetingChoiceType} from '../GQLType/MeetingChoiceType';

const meetingChoiceRepository = new MeetingChoiceRepository(DB);
export const MeetingChoiceQueries = {
    getMeetingChoices: {
        type: new GraphQLList(MeetingChoiceType),
        description: 'Returns a Meeting Choice by id or finderId, if no arguments are given all Meeting Choices will be returned',
        args: {
            id: {type: GraphQLID},
            finderId: {type: GraphQLID}
        },
        resolve(request, args) {
            if (args.id) {
                return meetingChoiceRepository.getMeetingChoiceById(args.id);
            }
            if (args.finderId) {
                return meetingChoiceRepository.getMeetingChoicesByFinderId(args.finderId);
            }
            return meetingChoiceRepository.getMeetingChoices();
        }
    },
    meetingChoiceExists: {
        type: GraphQLBoolean,
        description: 'checks if the meeting choice with id x exists',
        args: {
            id: {type: GraphQLID}
        },
        resolve(request, args) {
            if (args.id) {
                return meetingChoiceRepository.meetingChoiceExists(args.id);
            }
            return false;
        }
    }
};