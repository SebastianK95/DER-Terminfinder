import bodyParser = require('body-parser');
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
// import * as session from 'express-session';
// import * as FileStore from 'session-file-store';
import * as cors from 'cors';
import {spawnSync} from 'child_process';
import {DB_EXISTS, DB_PATH, PORT, ROUTE} from './config';
import {BuildSchema} from './BuildSchema';
import {Logger, requestResponseLogging} from './Services/Logger';

if (!DB_EXISTS) {
    console.log('Database File did not exist but was created for you: ' + DB_PATH + '.');
}
// Migrations
console.log('Migrations are being executed for you automatically.');

let command = spawnSync('node', ['node_modules/db-migrate/bin/db-migrate', 'up']);
if (command.stderr != null) {
    console.log(command.stderr.toString());
}
if (command.stdout != null) {
    console.log(command.stdout.toString());
}

const app = express();
app.use(cors());

// Session Storage
// const SessionFileStore = FileStore(session);
// app.use(session({
//     name: 'DER-Terminfinder-Session',
//     secret: 'Ganz sicherer String...',
//     resave: true,
//     saveUninitialized: true,
//     store: new SessionFileStore()
// }));

// Logging
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(requestResponseLogging);

// GraphQL
let bs = new BuildSchema();
app.use(ROUTE, graphqlHTTP(
    function (request) {
        return {
            schema: bs.build(request),
            rootValue: request,
            graphiql: true,
            formatError: error => {
                const params = {
                    message: error.message,
                    locations: error.locations,
                    stack: error.stack
                };
                Logger.error(`message: "${error.message}", QUERY: "${request.body.query}"`);
                return (params);
            }
        };
    }
));

app.listen(PORT);
console.log(
    `Running a GraphQL API server at localhost:${PORT}${ROUTE}`
);