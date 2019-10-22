import { GraphQLBoolean, GraphQLID, GraphQLInt } from 'graphql';
import { DB } from '../DB';
import { MeetingChoiceRepository } from '../Repository/Repositories';

const meetingChoiceRepository = new MeetingChoiceRepository(DB);

export const MeetingChoiceMutations = {
    createMeetingChoice: {
        type: GraphQLBoolean,
        description: "Inserts one Meeting Choice into the Database",
        args: {
            finderId: { type: GraphQLID },
            date: { type: GraphQLInt },
            time: { type: GraphQLInt },
            isprivat: { type: GraphQLInt }
        },
        resolve(request, args) {
            if (args.finderId && args.date) {
                return meetingChoiceRepository.createMeetingChoice(args);
            }
            return false;
        }
    },
    updateMeetingChoiceDate: {
        type: GraphQLBoolean,
        description: "Updates a meeting choice date",
        args: {
            id: { type: GraphQLID },
            date: { type: GraphQLInt }
        },
        resolve(request, args) {
            if (args.id && args.date) {
                return meetingChoiceRepository.updateMeetingChoiceDate(args);
            }
            return false;
        }
    },


    updateMeetingChoiceTime: {
        type: GraphQLBoolean,
        description: "Updates a meeting choice date",
        args: {
            id: { type: GraphQLID },
            time: { type: GraphQLInt }
        },
        resolve(request, args) {
            if (args.id && args.time) {
                return meetingChoiceRepository.updateMeetingChoiceTime(args);
            }
            return false;
        }
    },
    deleteMeetingChoice: {
        type: GraphQLBoolean,
        description: "Deletes one Meeting choice by id",
        args: {
            id: { type: GraphQLID }
        },
        resolve(request, args) {
            return args.id ? meetingChoiceRepository.deleteMeetingChoiceById(args.id) : false
        }
    },
};