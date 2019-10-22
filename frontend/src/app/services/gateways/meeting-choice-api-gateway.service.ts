import { Injectable } from '@angular/core';
import { AbstractApiGateway } from './AbstractApiGateway';
import { GatewayServiceInterface } from './GatewayServiceInterface';
import { Http } from '@angular/http';
import { GraphQlResponse } from '../../types/GraphQlResponse';
import { GraphQlParameterBuilder } from '../../helper/graph-ql-parameter-builder';
import { GraphQlParameter } from '../../types/GraphQlParameter';
import { MeetingChoice } from '../../entity/meeting-choice';

@Injectable()
export class MeetingChoiceApiGatewayService extends AbstractApiGateway implements GatewayServiceInterface {
    constructor(http: Http) {
        super(http);
    }
    async getById(id: number): Promise<GraphQlResponse> {
        let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
        let requestedValues = ['id', 'finderId', 'date', 'time', 'privat'];
        return await super.query('getMeetingChoices', parameters, requestedValues);
    }

    async getByParameters(parameters: Array<GraphQlParameter>, requestedValues: string[]): Promise<GraphQlResponse> {
        return await super.query('getMeetingChoices', parameters, requestedValues);
    }

    async create(meetingChoice: MeetingChoice): Promise<GraphQlResponse> {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('finderId', meetingChoice.finderId),
            GraphQlParameterBuilder.createParameterObject('date', meetingChoice.date),
            GraphQlParameterBuilder.createParameterObject('time', meetingChoice.time),
            GraphQlParameterBuilder.createParameterObject('isprivat', meetingChoice.isprivate)
        ];
        return await super.mutate('createMeetingChoice', parameters)
    }

    async exists(id: number): Promise<GraphQlResponse> {
        let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
        return await super.query('meetingChoiceExists', parameters, null);
    }

    async delete(id: number): Promise<GraphQlResponse> {
        let parameters = [GraphQlParameterBuilder.createParameterObject('id', id)];
        return await super.mutate('deleteMeetingChoice', parameters);
    }

    async updateDate(id: number, date: number) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('id', id),
            GraphQlParameterBuilder.createParameterObject('date', date),
        ];
        return await super.mutate('updateMeetingChoiceDate', parameters)
    }

    async updateTime(id: number, time: number) {
        let parameters = [
            GraphQlParameterBuilder.createParameterObject('id', id),
            GraphQlParameterBuilder.createParameterObject('time', time),
        ];
        return await super.mutate('updateMeetingChoiceTime', parameters)
    }
}
