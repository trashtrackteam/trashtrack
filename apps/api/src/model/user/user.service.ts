import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { LoggerService } from "../../provider/logger.service";
import { PrismaService } from "../../provider/prisma.service";

import { UserModel } from "./user.model";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

@Injectable()
export class UserService {
    private readonly loggerService: LoggerService = new LoggerService(UserService.name);

    constructor(private readonly prismaService: PrismaService) {}

    public async find(): Promise<UserModel[]> {
        try {
            const models: UserModel[] = await this.prismaService.user.findMany();

            this.loggerService.log(`Find: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findId(id: number): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService.user.findUnique({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`FindId: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`FindId: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`FindId: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async add(payload: UserCreateDTO): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService.user.create({ data: payload });

            this.loggerService.log(`Add: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            this.loggerService.error(`Add: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async change(id: number, payload: UserUpdateDTO): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService.user.update({
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

    public async remove(id: number): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService.user.delete({ where: { id } });

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
