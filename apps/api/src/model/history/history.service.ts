import { Injectable } from "@nestjs/common";
import { HistoryCreateDTO, HistoryModel, HistoryUpdateDTO, SubTrashBinModel } from "@trashtrack/common";

import { BaseService } from "../base.service";

import { PrismaService } from "../../provider/prisma.service";
import { Cron, CronExpression } from "@nestjs/schedule";

interface HistoryServiceInterface {}

@Injectable()
export class HistoryService
    extends BaseService<HistoryModel, HistoryCreateDTO, HistoryUpdateDTO>
    implements HistoryServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(HistoryService.name, prismaService);
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    public async record(): Promise<void> {
        try {
            const models = await this.prismaService.history.createMany({
                data: (
                    await this.prismaService.subTrashBin.findMany()
                ).map((model: SubTrashBinModel): HistoryCreateDTO => {
                    return {
                        subTrashBinId: model.id,
                        maxCapacity: model.maxCapacity,
                        currentCapacity: model.currentCapacity,
                    };
                }),
            });

            this.loggerService.log(`Record: ${JSON.stringify(models.count)} Created`);
        } catch (error) {
            this.loggerService.error(`Record: ${error.message}`);
        }
    }
}
