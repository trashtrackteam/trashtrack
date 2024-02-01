import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";

import { UserModule } from "./model/user/user.module";

@Module({
    imports: [ConfigModule, UserModule],
})
export class AppModule {}
