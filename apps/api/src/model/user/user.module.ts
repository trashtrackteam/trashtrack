import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

/**
 * Represents the User module.
 */
@Module({
    controllers: [UserController],
    providers: [PrismaService, UserService],
})
export class UserModule {}
