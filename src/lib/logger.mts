import winston from "winston"

// Define log formats
const logFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    let logMessage = `${timestamp} [${level}]: ${message}`
    if (Object.keys(meta).length) {
      logMessage += ` - ${JSON.stringify(meta)}`
    }
    return logMessage
  }
)

// Create the logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // Default to 'info' if no env variable is set
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      // Output to console
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Error logs to file
    new winston.transports.File({ filename: "logs/combined.log" }), // All logs to file
  ],
})

// Optional: Log uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new winston.transports.Console({ format: winston.format.simple() }),
  new winston.transports.File({ filename: "logs/exceptions.log" })
)

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason)
})

export default logger
