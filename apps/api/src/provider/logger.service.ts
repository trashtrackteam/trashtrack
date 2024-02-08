import { Logger as NestLogger } from "@nestjs/common";

export class LoggerService {
    private readonly logger: NestLogger = new NestLogger();
    private readonly context: string;

    constructor(context: string) {
        this.context = context;
    }

    public log(message: string): void {
        this.logger.log(`[${this.context}] ${message}`);
    }
    public warn(message: string): void {
        this.logger.warn(`[${this.context}] ${message}`);
    }

    public error(message: string): void {
        this.logger.error(`[${this.context}] ${message}`);
    }

    public debug(message: string): void {
        this.logger.debug(`[${this.context}] ${message}`);
    }
}
