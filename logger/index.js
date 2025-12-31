const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const rTracer = require('cls-rtracer')


const errorFormat = printf(({ level, message, timestamp, stack }) => {
    const rid = rTracer.id();
    const requestId = rid ? `[ID: ${rid}]` : '';
    return `${timestamp} ${level} ${requestId}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({format: "HH:mm:ss"}),
        errorFormat
    ),
    transports: [
        new transports.Console({format: combine(
            format.colorize(),
            errorFormat
        )}),
        new transports.File({ filename: 'errors.log'})
    ]
});

module.exports = logger;