import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";

import { UserModule } from "./model/user/user.module";

@Module({
    imports: [ConfigModule, UserModule],
    exports: [ConfigService],
    providers: [ConfigService],
})
export class AppModule {}
