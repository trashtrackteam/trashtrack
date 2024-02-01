import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

/**
 * The ConfigService class provides methods for retrieving configuration values.
 */
@Injectable()
export class ConfigService {
    /**
     * Constructs a new instance of the ConfigService class.
     * @param nestConfigService The NestConfigService instance.
     */
    constructor(private readonly nestConfigService: NestConfigService) {}

    /**
     * Retrieves the port number from the configuration.
     * @returns The port number.
     */
    public getPort(): number {
        return this.nestConfigService.get<number>("port");
    }

    /**
     * Retrieves the database URL from the configuration.
     * @returns The database URL.
     */
    public getDatabaseURL(): string {
        return this.nestConfigService.get<string>("databaseURL");
    }
}
