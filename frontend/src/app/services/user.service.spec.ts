import {Headers, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {User} from '../entity/user';
import {UserApiGatewayService} from './gateways/user-api-gateway.service';

var using = require('jasmine-data-provider');


describe('UserService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [UserService, {provide: XHRBackend, useClass: MockBackend}, UserApiGatewayService]
        });
    }));

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    describe('getUsers with id parameter', () => {
        using([
            {
                returnedData: [
                    {"id": 1, "name": "test", "email": "test@test.de"},
                ],
                expected: User.fromData({
                    id: 1,
                    name: 'test',
                    email: 'test@test.de'
                }),
                message: 'should return user with id x'
            },
            {
                returnedData: [],
                expected: null,
                message: 'should return null if there is no user with id x'
            }], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "getUsers": data.returnedData
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
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
        });
    });

    describe('getUsers without parameters', () => {
        using([{
            returnedData: [
                {"id": 1, "name": "test", "email": "test@test.de"},
                {"id": 2, "name": "Dummy", "email": "dummy@dummy.de"}
            ],
            expected: [
                User.fromData({
                    id: 1,
                    name: 'test',
                    email: 'test@test.de'
                }),
                User.fromData({
                    id: 2,
                    name: 'Dummy',
                    email: 'dummy@dummy.de'
                }),
            ],
            message: 'should return users if there are users'
        },
            {returnedData: [], expected: [], message: 'should return empty array if there are no users'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "getUsers": data.returnedData
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
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

    describe('createUser', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "createUser": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.createUser('username', 'test@test.de', 'password').then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('userIsAuthorizedByEmail', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "userIsAuthorizedByEmail": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.userIsAuthorizedByEmail('test@test.de', 'password').then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('userIsAuthorizedById', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "userIsAuthorizedById": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.userIsAuthorizedById(1, 'password').then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('updatePassword', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "updatePassword": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.updatePassword(1, 'newPassword').then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('updateUsername', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "updateUsername": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.updateUsername(1, 'newUsername').then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('deleteUser', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "deleteUser": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.deleteUser(1).then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });

    describe('userExists', () => {
        using([
            {success: true, expected: true, message: 'should return true if successful'},
            {success: false, expected: false, message: 'should return false if not successful'}], (data) => {
            it(data.message, async(
                inject([UserService, XHRBackend], (service: UserService, mockBackend) => {
                    const mockGetUsersResponse = {
                        data: {
                            "userExists": data.success
                        }
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetUsersResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            })
                        })));
                    });
                    service.userExists(1).then((actual) => {
                        expect(actual).toEqual(data.expected);
                    });
                })
            ))
        });
    });
});
