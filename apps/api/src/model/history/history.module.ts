import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { PrismaService } from "../../provider/prisma.service";

import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers: [HistoryController],
    providers: [PrismaService, HistoryService],
})
export class HistoryModule {}
