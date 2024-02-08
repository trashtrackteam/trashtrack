import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { LoggerService } from "../provider/logger.service";
import { PrismaService } from "../provider/prisma.service";

export class BaseService<ModelType, ModelCreateDTO, ModelUpdateDTO> {
    protected readonly loggerService: LoggerService;
    protected readonly modelName: string;

    constructor(serviceName: string, protected readonly prismaService: PrismaService) {
        this.loggerService = new LoggerService(serviceName);

        const rawServiceName: string = serviceName.slice(0, -"Service".length);
        this.modelName = rawServiceName.charAt(0).toLowerCase() + rawServiceName.slice(1);
    }

    public async find(): Promise<ModelType[]> {
        try {
            const models: ModelType[] = await this.prismaService[this.modelName].findMany();

            this.loggerService.log(`Find: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findId(id: number): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaService[this.modelName].findUnique({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find Id: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find Id: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async add(payload: ModelCreateDTO): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaService[this.modelName].create({ data: payload });

            this.loggerService.log(`Add: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Add: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async change(id: number, payload: ModelUpdateDTO): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaService[this.modelName].update({
                where: { id },
                data: payload,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Change: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Change: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Change: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async remove(id: number): Promise<ModelType> {
        try {
            const model: ModelType = await this.prismaService[this.modelName].delete({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Remove: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Remove: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Remove: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Remove: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
