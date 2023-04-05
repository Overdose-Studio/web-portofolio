// Import dependencies
import dotenv from "dotenv";
import moment from "moment-timezone";
import path from "path";
import pino from "pino";
import { createStream } from "rotating-file-stream";

// Load environment variables
dotenv.config();

// Get environment variables
const logLevel = process.env.LOG_LEVEL ?? "info";
const logFile = process.env.LOG_FILE ?? "access.log";
const logDirectory = process.env.LOG_DIRECTORY ?? "logs";
const logMaxFiles = process.env.LOG_MAX_FILES ?? "7";
const logCompress = process.env.LOG_COMPRESS === "true";
const logInterval = process.env.LOG_INTERVAL ?? "1d";
const logTimezone = process.env.LOG_TIMEZONE ?? "Asia/Jakarta";

// Create name format for log files
const pad = (num: number) => {
    return num < 10 ? "0" + num : num;
};
const filename = (time: Date = new Date()) => {
  var year = time.getFullYear();
  var month = pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  return `${year}-${month}-${day}-${logFile}`;
};

// Create write stream for log files (rotate daily)
const accessLogStream = createStream(filename(), {
    interval: logInterval,                                  // rotate daily
    path: path.join(__dirname, `../../${logDirectory}`),    // log files are stored in this directory
    maxFiles: parseInt(logMaxFiles),                        // keep back copies
    compress: logCompress ? "gzip" : false                  // compress rotated files
});

// Create logger
const logger = pino({
    timestamp: () => `,"time":"${moment().tz(logTimezone).format('HH:mm:ss.SSSZ')}"`,
    level: logLevel,
    stream: accessLogStream,
    transport: {
        targets: [
            {
                // Write to log file
                level: logLevel,
                target: "pino/file",
                options: { destination: `${logDirectory}/${filename()}` }
            },
            {
                // Write to console
                level: logLevel,
                target: "pino-pretty",
                options: { colorize: true }
            }
        ]
    }
});

// Export module
export default logger;