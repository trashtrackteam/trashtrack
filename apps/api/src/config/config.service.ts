import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
    constructor(private readonly nestConfigService: NestConfigService) {}

    getPort(): number {
        return this.nestConfigService.get<number>("port");
    }

    getDatabaseUser(): string {
        return this.nestConfigService.get("database.user");
    }

    getDatabasePassword(): string {
        return this.nestConfigService.get("database.password");
    }

    getDatabaseHost(): string {
        return this.nestConfigService.get("database.host");
    }

    getDatabasePort(): number {
        return this.nestConfigService.get<number>("database.port");
    }

    getDatabaseName(): string {
        return this.nestConfigService.get("database.name");
    }

    getDatabaseURL(): string {
        return `postgresql://${this.getDatabaseUser()}:${this.getDatabasePassword()}@${this.getDatabaseHost()}:${this.getDatabasePort()}/${this.getDatabaseName()}`;
    }
}
