/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap(): Promise<void> {
    const app: INestApplication<AppModule> = await NestFactory.create<INestApplication<AppModule>>(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    const globalPrefix: string = "api";

    app.setGlobalPrefix(globalPrefix);

    await app.listen(configService.getPort());

    Logger.log(`🚀 Application is running on: http://localhost:${configService.getPort()}/${globalPrefix}`);
}

bootstrap();
