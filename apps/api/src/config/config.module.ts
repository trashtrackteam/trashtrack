import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule, ConfigService as NestConfigService } from "@nestjs/config";

import config from "./config";
import { validate } from "./config.validation";

import { ConfigService } from "./config.service";

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [config],
            validate: validate,
        }),
    ],
    exports: [NestConfigService, ConfigService],
    providers: [NestConfigService, ConfigService],
})
export class ConfigModule {}
