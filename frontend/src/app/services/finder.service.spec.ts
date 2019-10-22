import {async, inject, TestBed} from '@angular/core/testing';

import {FinderService} from './finder.service';
import {Headers, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {FinderApiGatewayService} from './gateways/finder-api-gateway.service';
import {Finder} from '../entity/finder';
import {MockBackend} from '@angular/http/testing';

var using = require('jasmine-data-provider');

describe('FinderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [FinderService, {provide: XHRBackend, useClass: MockBackend}, FinderApiGatewayService]
        });
    });

    it('should be created', inject([FinderService], (service: FinderService) => {
        expect(service).toBeTruthy();
    }));

    describe('get User by id Parameter', () => {
        using([
            {
                returnedData: [{
                    "id": 1,
                    "name": "Daily Scrum",
                    "userId": "1"
                }],
                expected: Finder.fromData({
                    id: 1,
                    name: "Daily Scrum",
                    userId: "1"
                }),
                message: 'should return finder when finder was found'
            },
            {
                returnedData: [],
                expected: null,
                message: 'should return null if no finder was found'
            }
        ], (data) => {
            it(data.message, async(
                inject([FinderService, XHRBackend], (service: FinderService, mockBackend) => {
                    const mockGetFindersResponse = {
                        data: {
                            "getFinders": data.returnedData
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetFindersResponse),
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

    describe('getFinders without parameters', () => {
        using([
            {
                returnedData: [{
                    "id": 1,
                    "name": "Daily Scrum",
                    "userId": "1"
                }, {
                    "id": 2,
                    "name": "Planning",
                    "userId": "1"
                }],
                expected: [Finder.fromData({
                    id: 1,
                    name: "Daily Scrum",
                    userId: "1"
                }), Finder.fromData({
                    id: 2,
                    name: "Planning",
                    userId: "1"
                })],
                message: 'should return finders when finders were found'
            },
            {
                returnedData: [],
                expected: [],
                message: 'should return empty array if there are no finders'
            }
            ], (data) => {
            it(data.message, async(
                inject([FinderService, XHRBackend], (service: FinderService, mockBackend) => {
                    const mockGetFindersResponse = {
                        data: {
                            "getFinders": data.returnedData
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetFindersResponse),
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
    describe('createFinder', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            xit(data.message, async(
                inject([FinderService, XHRBackend], (service: FinderService, mockBackend) => {
                    const mockCreateFinderResponse = {
                        data: {
                            "createFinder": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockCreateFinderResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.createFinder({name: 'finder', userId: 2, description: 'bla'}).then( (actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('deleteFinder', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([FinderService, XHRBackend], (service: FinderService, mockBackend) => {
                    const mockDeleteFinderResponse = {
                        data: {
                            "deleteFinder": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockDeleteFinderResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.deleteFinder(1).then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('finderExists', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([FinderService, XHRBackend], (service: FinderService, mockBackend) => {
                    const mockFinderExistsResponse = {
                        data: {
                            "finderExists": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockFinderExistsResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.finderExists(1).then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });
    describe('updateFindername', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([FinderService, XHRBackend], (service: FinderService, mockBackend) => {
                    const mockUpdateFinderNameResponse = {
                        data: {
                            "updateFindername": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockUpdateFinderNameResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.updateFinderName(1, 'newFinderNae').then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });
});
