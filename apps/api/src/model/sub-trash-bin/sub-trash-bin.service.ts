import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import {
    SubTrashBinCreateDTO,
    SubTrashBinModel,
    SubTrashBinUpdateCapacityDTO,
    SubTrashBinUpdateDTO,
} from "@trashtrack/common";

import { ExtendService } from "../../global/extend.service";

import { PrismaService } from "../../provider/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface SubTrashBinServiceInterface {}

@Injectable()
export class SubTrashBinService
    extends ExtendService<SubTrashBinModel, SubTrashBinCreateDTO, SubTrashBinUpdateDTO>
    implements SubTrashBinServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(SubTrashBinService.name, prismaService, { trash: true, history: true });
    }

    public async changeCapacity(id: number, payload: SubTrashBinUpdateCapacityDTO): Promise<SubTrashBinModel> {
        try {
            const model: SubTrashBinModel = await this.prismaService[this.modelName].update({
                where: { id },
                data: { payload },
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Change Capacity: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Capacity: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Change Capacity: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Change Capacity: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
