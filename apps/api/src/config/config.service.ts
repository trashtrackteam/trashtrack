import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
    constructor(private readonly nestConfigService: NestConfigService) {}

    getPort(): number {
        return this.nestConfigService.get<number>("port");
    }

    getDatabaseURL(): string {
        return this.nestConfigService.get<string>("databaseURL");
    }
}
