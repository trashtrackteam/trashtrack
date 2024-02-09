import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
    controllers: [ReportController],
    providers: [PrismaService, ReportService],
})
export class ReportModule {}
