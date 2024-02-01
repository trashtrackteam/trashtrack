import { Module } from "@nestjs/common";

import { LoggerService } from "../../provider/logger.service";
import { PrismaService } from "../../provider/prisma.service";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [LoggerService, PrismaService, UserService],
})
export class UserModule {}
