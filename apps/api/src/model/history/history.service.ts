import { Injectable } from "@nestjs/common";
import { HistoryCreateDTO, HistoryModel, HistoryUpdateDTO } from "@trashtrack/common";

import { BaseService } from "../base.service";

import { PrismaService } from "../../provider/prisma.service";

interface HistoryServiceInterface {}

@Injectable()
export class HistoryService
    extends BaseService<HistoryModel, HistoryCreateDTO, HistoryUpdateDTO>
    implements HistoryServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(HistoryService.name, prismaService);
    }
}
