const express = require('express');
const cors = require('cors');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const log4js = require('log4js');

const port = process.env.PORT || 3000;

const app = express();

const logger = log4js.getLogger();

/** configure lo4js using JSON type file*/
log4js.configure(
    './config/log4js.json'
);

/** enable cors */
app.use(cors());

/** parse application/x-www-form-urlencoded body for @module app*/
app.use(bodyParser.urlencoded({
    extended: false
}))

/** parse application json for @module app*/
app.use(bodyParser.json())

/** use expressValidator on @module app */
app.use(expressValidator());

/** use consign for autoload scripts into @module app*/
consign({
        cwd: 'app'
    })
    .include('routes')
    .into(app);

/** server listening message at @module app*/
app.listen(port, (err) => {
    if (err) {
        logger.error(`Failed to listen on port ${port}.`);
        return process.exit(1);
    }
    logger.info(`Listening on port ${port}.`);
});

/** * Express App. * @module app */
module.exports = app;