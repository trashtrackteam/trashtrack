import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
    constructor(private readonly nestConfigService: NestConfigService) {}

    public getPort(): number {
        return this.nestConfigService.get<number>("port");
    }

    public getDatabaseURL(): string {
        return this.nestConfigService.get<string>("databaseURL");
    }
}
