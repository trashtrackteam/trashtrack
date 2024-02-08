import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { BaseService } from "./base.service";

import { PrismaService } from "../provider/prisma.service";

interface ExtendInterface {
    [key: string]: boolean;
}

export class ExtendService<ModelType, ModelCreateDTO, ModelUpdateDTO> extends BaseService<
    ModelType,
    ModelCreateDTO,
    ModelUpdateDTO
> {
    protected readonly extend: ExtendInterface;

    constructor(serviceName: string, prismaService: PrismaService, extend: ExtendInterface) {
        super(serviceName, prismaService);

        this.extend = extend;
    }

    public async findExtend(): Promise<ModelType[]> {
        try {
            const models: ModelType[] = await this.prismaService[this.modelName].findMany({ include: this.extend });

            this.loggerService.log(`Find Extend: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Extend: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findIdExtend(id: number): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaService[this.modelName].findUnique({
                where: { id },
                include: this.extend,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find Id Extend: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id Extend: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find Id Extend: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
