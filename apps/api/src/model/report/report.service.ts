import { Injectable } from "@nestjs/common";
import { ReportCreateDTO, ReportModel, ReportUpdateDTO } from "@trashtrack/common";

import { ExtendService } from "../extend.service";

import { PrismaService } from "../../provider/prisma.service";

interface ReportServiceInterface {}

@Injectable()
export class ReportService
    extends ExtendService<ReportModel, ReportCreateDTO, ReportUpdateDTO>
    implements ReportServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(ReportService.name, prismaService, { user: true, feedback: true });
    }
}
