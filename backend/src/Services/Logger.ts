'use strict';
const winston = require('winston');
const fs = require('fs');
const logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();

const Logger = new (winston.Logger)({
    levels: {info: 3, warning: 2, error: 1},
    transports: [
        new (winston.transports.Console)({
            name: 'infoConsole',
            timestamp: tsFormat,
            colorize: true,
            level: 'info',
            json: false,
            stringify: false,
            prettyPrint: true,
        }),
        new (winston.transports.File)({
            name: 'infoFile',
            filename: `${logDir}/general.log`,
            timestamp: tsFormat,
            level: 'info',
            json: false,
            stringify: false,
            prettyPrint: true,
        }),
        new (winston.transports.File)({
            name: 'errorFile',
            filename: `${logDir}/error.log`,
            timestamp: tsFormat,
            level: 'error',
            json: false,
            stringify: false,
            prettyPrint: true,
        })
    ]
});

const RequestLogger = new (winston.Logger)({
    levels: {request: 1},
    transports: [
        new (winston.transports.File)({
            name: 'requestFIle',
            filename: `${logDir}/request.log`,
            timestamp: tsFormat,
            level: 'request',
            json: false,
            stringify: false,
            prettyPrint: true,
        }),
    ]
});
const ResponseLogger = new (winston.Logger)({
    levels: {response: 1},
    transports: [
        new (winston.transports.File)({
            name: 'responseFile',
            filename: `${logDir}/response.log`,
            timestamp: tsFormat,
            level: 'response',
            json: false,
            stringify: false,
            prettyPrint: true,
        }),
    ]
});


function requestResponseLogging(request, res, next) {
    if (!isEmpty(request.body)) {
        RequestLogger.request(JSON.stringify(request.body));
        Logger.info('request: ' + JSON.stringify(request.body));
    }
    if (!isEmpty(request.query)) {
        RequestLogger.request(JSON.stringify(request.query));
        Logger.info('request: ' + JSON.stringify(request.query));
    }
    let originalSend = res.send;
    res.send = function (body?: any ) {
        ResponseLogger.response(JSON.stringify(body));
        Logger.info('response: ' + JSON.stringify(body));
        return originalSend.apply(res, Array.from(arguments));
    };
    next();
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export {Logger, RequestLogger, ResponseLogger, requestResponseLogging};