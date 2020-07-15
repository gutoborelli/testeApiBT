const winston = require('winston');

const consoleLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(                
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, ...args
                    } = info;

                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return `${ts} [${level}]:${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                }))
        }),
        new winston.transports.File({
            filename: 'info.log',
            format: winston.format.combine(                
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, ...args
                    } = info;

                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return `${ts} [${level}]:${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                }))
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.combine(                
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info) => {
                    const {
                        timestamp, level, message, ...args
                    } = info;

                    const ts = timestamp.slice(0, 19).replace('T', ' ');
                    return `${ts} [${level}]:${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                }))
        }),        
    ]
});

let defaultLogger = consoleLogger;

const getDefaultLogger = () => {
    return defaultLogger;
}

module.exports = {
    getDefaultLogger
}





