import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { TrashController } from "./trash.controller";
import { TrashService } from "./trash.service";

@Module({
    controllers: [TrashController],
    providers: [PrismaService, TrashService],
})
export class TrashModule {}
