import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import * as bodyparser from "body-parser";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap(): Promise<void> {
    const app: INestApplication<AppModule> = await NestFactory.create<INestApplication<AppModule>>(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    const globalPrefix: string = "api";

    app.use(
        bodyparser.json({
            limit: "50mb",
        })
    );
    app.use(
        bodyparser.urlencoded({
            limit: "50mb",
            extended: true,
        })
    );

    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(configService.getPort());

    Logger.log(`🚀 Application is running on: http://localhost:${configService.getPort()}/${globalPrefix}`);
}

bootstrap();
