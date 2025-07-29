const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'log.jsonl');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

function log(level, message, metadata = {}) {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...metadata
    };
    fs.appendFileSync(logFilePath, JSON.stringify(entry) + '\n');
}

module.exports = {
    info: (msg, meta) => log('info', msg, meta),
    error: (msg, meta) => log('error', msg, meta),
    warn: (msg, meta) => log('warn', msg, meta),
};
