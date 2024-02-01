import { Injectable } from "@nestjs/common";

import { LoggerService } from "../../provider/logger.service";
import { PrismaService } from "../../provider/prisma.service";

import { UserModel } from "./user.model";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

@Injectable()
export class UserService {
    constructor(private readonly loggerService: LoggerService, private readonly prismaService: PrismaService) {
        this.loggerService.setContext(UserService.name);
    }

    public async find(): Promise<UserModel[]> {
        const models: UserModel[] = await this.prismaService.user.findMany();

        this.loggerService.log(`Find: ${JSON.stringify(models)}`);

        return models;
    }

    public async findId(id: number): Promise<UserModel> {
        const model: UserModel = await this.prismaService.user.findUnique({
            where: { id },
        });

        this.loggerService.log(`FindId: ${JSON.stringify(model)}`);

        return model;
    }

    public async add(payload: UserCreateDTO): Promise<UserModel> {
        const model: UserModel = await this.prismaService.user.create({ data: payload });

        this.loggerService.log(`Add: ${JSON.stringify(model)}`);

        return model;
    }

    public async change(id: number, payload: UserUpdateDTO): Promise<UserModel> {
        const model: UserModel = await this.prismaService.user.update({
            where: { id },
            data: payload,
        });

        this.loggerService.log(`Change: ${JSON.stringify(model)}`);

        return model;
    }

    public async remove(id: number): Promise<UserModel> {
        const model: UserModel = await this.prismaService.user.delete({
            where: { id },
        });

        this.loggerService.log(`Remove: ${JSON.stringify(model)}`);

        return model;
    }
}
