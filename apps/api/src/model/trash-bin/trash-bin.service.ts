import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TrashBinCreateDTO, TrashBinModel, TrashBinUpdateDTO } from "@trashtrack/common";

import { ExtendService } from "../extend.service";

import { PrismaService } from "../../provider/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface TrashBinServiceInterface {
    increaseOpenCount(id: number): Promise<TrashBinModel>;
}

@Injectable()
export class TrashBinService
    extends ExtendService<TrashBinModel, TrashBinCreateDTO, TrashBinUpdateDTO>
    implements TrashBinServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(TrashBinService.name, prismaService, {
            subTrashBin: { include: { trash: true, history: true } },
            report: true,
        });
    }

    public async increaseOpenCount(id: number): Promise<TrashBinModel> {
        try {
            const dataModel: { openCount: number } = await this.prismaService[this.modelName].findUnique({
                where: { id: id },
                select: { openCount: true },
            });

            if (!dataModel) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            const model: TrashBinModel = await this.prismaService[this.modelName].update({
                where: { id },
                data: { openCount: dataModel.openCount + 1 },
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Increase Open Count: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Increase Open Count: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Increase Open Count: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Increase Open Count: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
