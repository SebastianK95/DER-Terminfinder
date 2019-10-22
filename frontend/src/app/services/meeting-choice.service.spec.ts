import { TestBed, inject, async } from '@angular/core/testing';

import { MeetingChoiceService } from './meeting-choice.service';
import { Headers, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MeetingChoiceApiGatewayService } from './gateways/meeting-choice-api-gateway.service';
import { MeetingChoice } from '../entity/meeting-choice';

var using = require('jasmine-data-provider');

describe('MeetingChoiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [MeetingChoiceService, {
                provide: XHRBackend,
                useClass: MockBackend
            }, MeetingChoiceApiGatewayService]
        });
    });

    it('should be created', inject([MeetingChoiceService], (service: MeetingChoiceService) => {
        expect(service).toBeTruthy();
    }));

    describe('get MeetingChoice by id Parameter', () => {
        using([
            {
                returnedData: [{
                    "id": 1,
                    "finderId": 2,
                    "date": 20180215,
                    "time": 1150,
                    "isprivat": 1
                }],
                expected: MeetingChoice.fromData({
                    id: 1,
                    finderId: 2,
                    date: 20180215,
                    time: 1150,
                    isprivat: 1
                }),
                message: 'should return MeetingChoice when MeetingChoice was found'
            },
            {
                returnedData: [],
                expected: null,
                message: 'should return null if no MeetingChoice was found'
            }
        ], (data) => {
            it(data.message, async(
                inject([MeetingChoiceService, XHRBackend], (service: MeetingChoiceService, mockBackend) => {
                    const mockGetMeetingChoicesResponse = {
                        data: {
                            "getMeetingChoices": data.returnedData
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetMeetingChoicesResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.getById(1).then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        })
    });


    describe('getMeetingChoices without parameters', () => {
        using([
            {
                returnedData: [{
                    "id": 1,
                    "finderId": 2,
                    "date": 20180215,
                    "time": 1150,
                    "isprivat": 0
                },
                {
                    "id": 2,
                    "finderId": 2,
                    "date": 20180216,
                    "time": 1150,
                    "isprivat": 1
                }],
                expected: [
                    MeetingChoice.fromData({
                        id: 1,
                        finderId: 2,
                        date: 20180215,
                        time: 1150,
                        isprivat: 0
                    }),
                    MeetingChoice.fromData({
                        id: 2,
                        finderId: 2,
                        date: 20180216,
                        time: 1150,
                        isprivat: 1
                    })],
                message: 'should return MeetingChoices when MeetingChoices were found'
            },
            {
                returnedData: [],
                expected: [],
                message: 'should return empty array if there are no MeetingChoices'
            }
        ], (data) => {
            it(data.message, async(
                inject([MeetingChoiceService, XHRBackend], (service: MeetingChoiceService, mockBackend) => {
                    const mochGetMeetingChoicesResponse = {
                        data: {
                            "getMeetingChoices": data.returnedData
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mochGetMeetingChoicesResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.getAll().then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });
    describe('createMeetingChoices', () => {
        using([
            { success: true, expected: true, message: 'should return true if successful' },
            { success: false, expected: false, message: 'should return false if not successful' }], (data) => {
                it(data.message, async(
                    inject([MeetingChoiceService, XHRBackend], (service: MeetingChoiceService, mockBackend) => {
                        const mockCreateMeetingChoiceResponse = {
                            data: {
                                "createMeetingChoice": data.success
                            }
                        };
                        mockBackend.connections.subscribe((connection) => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify(mockCreateMeetingChoiceResponse),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                })
                            })));
                        });
                        service.createMeetingChoice(1, 20180215, 1150, 0).then((actual) => {
                            expect(actual).toEqual(data.expected);
                        });
                    })
                ))
            });
    });

    describe('deleteMeetingChoice', () => {
        using([
            { success: true, expected: true, message: 'should return true if successful' },
            { success: false, expected: false, message: 'should return false if not successful' }], (data) => {
                it(data.message, async(
                    inject([MeetingChoiceService, XHRBackend], (service: MeetingChoiceService, mockBackend) => {
                        const mockDeleteMeetingChoiceResponse = {
                            data: {
                                "deleteMeetingChoice": data.success
                            }
                        };
                        mockBackend.connections.subscribe((connection) => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify(mockDeleteMeetingChoiceResponse),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                })
                            })));
                        });
                        service.deleteMeetingChoice(1).then((actual) => {
                            expect(actual).toEqual(data.expected);
                        });
                    })
                ))
            });
    });
    describe('MeetingChoiceExists', () => {
        using([
            { success: true, expected: true, message: 'should return true if successful' },
            { success: false, expected: false, message: 'should return false if not successful' }], (data) => {
                it(data.message, async(
                    inject([MeetingChoiceService, XHRBackend], (service: MeetingChoiceService, mockBackend) => {
                        const mockMeetingChoiceResponse = {
                            data: {
                                "meetingChoiceExists": data.success
                            }
                        };
                        mockBackend.connections.subscribe((connection) => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify(mockMeetingChoiceResponse),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                })
                            })));
                        });
                        service.meetingChoiceExists(1).then((actual) => {
                            expect(actual).toEqual(data.expected);
                        });
                    })
                ))
            });
    });

    describe('updateMeetingChoiceDate', () => {
        using([
            { success: true, expected: true, message: 'should return true if successful' },
            { success: false, expected: false, message: 'should return false if not successful' }], (data) => {
                it(data.message, async(
                    inject([MeetingChoiceService, XHRBackend], (service: MeetingChoiceService, mockBackend) => {
                        const mockUpdateMeetingChoiceDateResponse = {
                            data: {
                                "updateMeetingChoiceDate": data.success
                            }
                        };
                        mockBackend.connections.subscribe((connection) => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify(mockUpdateMeetingChoiceDateResponse),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                })
                            })));
                        });
                        service.updateMeetingChoiceDate(1, 20180215).then((actual) => {
                            expect(actual).toEqual(data.expected);
                        });
                    })
                ))
            });
    });
    describe('updateMeetingChoiceTime', () => {
        using([
            { success: true, expected: true, message: 'should return true if successful' },
            { success: false, expected: false, message: 'should return false if not successful' }], (data) => {
                it(data.message, async(
                    inject([MeetingChoiceService, XHRBackend], (service: MeetingChoiceService, mockBackend) => {
                        const mockUpdateMeetingChoiceTimeResponse = {
                            data: {
                                "updateMeetingChoiceTime": data.success
                            }
                        };
                        mockBackend.connections.subscribe((connection) => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify(mockUpdateMeetingChoiceTimeResponse),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                })
                            })));
                        });
                        service.updateMeetingChoiceTime(1, 1150).then((actual) => {
                            expect(actual).toEqual(data.expected);
                        });
                    })
                ))
            });
    });
});
