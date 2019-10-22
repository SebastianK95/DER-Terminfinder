import {TestBed, inject, async} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {Headers, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

var using = require('jasmine-data-provider');

describe('ConfigService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [ConfigService, {provide: XHRBackend, useClass: MockBackend}]
        });
    });

    it('should be created', inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
    }));

    it('should return an Object', inject([ConfigService], (service: ConfigService) => {
        expect(typeof (service)).toEqual('object');

    }));

    describe('getConfiguration', () => {
        using([
            {key: 'graphpath', value: 'http://localhost:4000/graphql', message: 'should return value for key'},
            {key: 'nonexistentKey', value: null, message: 'should return null when key is not found'},
        ], (data) => {
            it(data.message, async(
                inject([ConfigService, XHRBackend], (service: ConfigService, mockBackend) => {
                    const mockGetConfigResponse = {
                        "graphpath": "http://localhost:4000/graphql",
                        "type": "simple entry"
                    };
                    mockBackend.connections.subscribe((connection) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(mockGetConfigResponse),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        })));
                    });

                    service.getConfiguration(data.key).then((actual) => {
                        expect(actual).toEqual(data.value);
                    });
                })
            ));
        })
    });
});
