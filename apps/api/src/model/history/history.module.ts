import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";

@Module({
    controllers: [HistoryController],
    providers: [PrismaService, HistoryService],
})
export class HistoryModule {}
