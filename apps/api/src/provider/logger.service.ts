import { Logger as NestLogger } from "@nestjs/common";

/**
 * LoggerService class for logging messages with context.
 */
export class LoggerService {
    private readonly logger: NestLogger = new NestLogger();
    private readonly context: string;

    /**
     * Constructs a new LoggerService instance with the specified context.
     * @param context The context for the logger.
     */
    constructor(context: string) {
        this.context = context;
    }

    /**
     * Logs a message with the specified context.
     * @param message The message to be logged.
     */
    public log(message: string): void {
        this.logger.log(`[${this.context}] ${message}`);
    }

    /**
     * Logs a warning message with the specified context.
     * @param message The warning message to be logged.
     */
    public warn(message: string): void {
        this.logger.warn(`[${this.context}] ${message}`);
    }

    /**
     * Logs an error message with the specified context.
     * @param message The error message to be logged.
     */
    public error(message: string): void {
        this.logger.error(`[${this.context}] ${message}`);
    }

    /**
     * Logs a debug message with the specified context.
     * @param message The debug message to be logged.
     */
    public debug(message: string): void {
        this.logger.debug(`[${this.context}] ${message}`);
    }
}
