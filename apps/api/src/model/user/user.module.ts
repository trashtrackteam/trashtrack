import { Module } from "@nestjs/common";

import { ConfigService } from "../../config/config.service";
import { PrismaService } from "../../provider/prisma.service";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [ConfigService, PrismaService, UserService],
})
export class UserModule {}
