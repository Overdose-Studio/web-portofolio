// Import dependencies
import dotenv from "dotenv";
import moment from "moment-timezone";
import path from "path";
import pino from "pino";
import { createStream } from "rotating-file-stream";

// Load environment variables
dotenv.config();

// Get environment variables
const log = {
    level: process.env.LOG_LEVEL ?? "info",
    file: process.env.LOG_FILE ?? "access.log",
    directory: process.env.LOG_DIRECTORY ?? "logs",
    maxFiles: process.env.LOG_MAX_FILES ?? "7",
    compress: process.env.LOG_COMPRESS === "true",
    interval: process.env.LOG_INTERVAL ?? "1d",
    timezone: process.env.LOG_TIMEZONE ?? "Asia/Jakarta"
};

// Create name format for log files
const pad = (num: number) => {
    return num < 10 ? "0" + num : num;
};
const filename = (time: Date = new Date()) => {
  var year = time.getFullYear();
  var month = pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  return `${year}-${month}-${day}-${log.file}`;
};

// Create write stream for log files (rotate daily)
const accessLogStream = createStream(filename(), {
    interval: log.interval,                                  // rotate daily
    path: path.join(__dirname, `../../${log.directory}`),    // log files are stored in this directory
    maxFiles: parseInt(log.maxFiles),                        // keep back copies
    compress: log.compress ? "gzip" : false                  // compress rotated files
});

// Create logger
const logger = pino({
    timestamp: () => `,"time":"${moment().tz(log.timezone).format('HH:mm:ss.SSSZ')}"`,
    level: log.level,
    stream: accessLogStream,
    transport: {
        targets: [
            {
                // Write to log file
                level: log.level,
                target: "pino/file",
                options: { destination: `${log.directory}/${filename()}` }
            },
            {
                // Write to console
                level: log.level,
                target: "pino-pretty",
                options: { colorize: true }
            }
        ]
    }
});

// Export module
export default logger;