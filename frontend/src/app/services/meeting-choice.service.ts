import { Injectable } from '@angular/core';
import { MeetingChoiceApiGatewayService } from './gateways/meeting-choice-api-gateway.service';
import { MeetingChoice } from '../entity/meeting-choice';

@Injectable()
export class MeetingChoiceService {
    constructor(private meetingChoiceApiGateway: MeetingChoiceApiGatewayService) {
    }

    async getById(id: number): Promise<MeetingChoice> {
        let meetingChoice = null
        let finderData = await this.meetingChoiceApiGateway.getById(id);
        let data = finderData.data[0];
        if (data) {
            meetingChoice = MeetingChoice.fromData(data);
        }
        return meetingChoice;
    }

    async getAll(): Promise<MeetingChoice[]> {
        let meetingChoiceData = await this.meetingChoiceApiGateway.getByParameters(null, ['id', 'finderId', 'date', 'time']);
        let data = meetingChoiceData.data;
        let choices = [];
        for (let choiceIndex = 0; choiceIndex < data.length; choiceIndex++) {
            choices.push(MeetingChoice.fromData(data[choiceIndex]))
        }
        return choices;
    }

    async createMeetingChoice(finderId: number, date: number, time: number, isprivat: number): Promise<boolean> {
        let meetingChoice = MeetingChoice.fromFinderIdDateAndTime(finderId, date, time, isprivat);
        let response = await this.meetingChoiceApiGateway.create(meetingChoice);
        return response.data;
    }

    async deleteMeetingChoice(id: number): Promise<boolean> {
        let response = await this.meetingChoiceApiGateway.delete(id);
        return response.data;
    }

    async meetingChoiceExists(id: number): Promise<boolean> {
        let response = await this.meetingChoiceApiGateway.exists(id);
        return response.data;
    }

    async updateMeetingChoiceDate(id: number, date: number): Promise<boolean> {
        let response = await this.meetingChoiceApiGateway.updateDate(id, date);
        return response.data;
    }

    async updateMeetingChoiceTime(id: number, time: number): Promise<boolean> {
        let response = await this.meetingChoiceApiGateway.updateTime(id, time);
        return response.data;
    }
}
