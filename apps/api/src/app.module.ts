import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { UserModule } from "./model/user/user.module";

/**
 * The main module of the application.
 * It imports the necessary modules for the application to run.
 */
@Module({
    imports: [ConfigModule, UserModule],
})
export class AppModule {}
