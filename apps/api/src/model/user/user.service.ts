import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserModel,
    UserCreateDTO,
    UserUpdateActiveDTO,
    UserUpdateDTO,
    UserUpdatePasswordDTO,
    Override,
} from "@trashtrack/common";

import * as encryption from "../../util/encryption";

import { BaseService } from "../global/base.service";

import { PrismaService } from "../../provider/prisma.service";

interface UserServiceInterface {
    findUsername(username: string): Promise<UserModel>;
    changePassword(id: number, payload: UserUpdatePasswordDTO): Promise<UserModel>;
    changeActive(id: number, payload: UserUpdateActiveDTO): Promise<UserModel>;
}

@Injectable()
export class UserService extends BaseService<UserModel, UserCreateDTO, UserUpdateDTO> implements UserServiceInterface {
    constructor(prismaService: PrismaService) {
        super(UserService.name, prismaService);
    }

    public async findUsername(username: string): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService[this.modelName].findUnique({ where: { username } });

            if (!model) {
                throw new NotFoundException(`Username ${username} Not Found`);
            }

            this.loggerService.log(`Find Username: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Username: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find Username: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Override
    public async add(payload: UserCreateDTO): Promise<UserModel> {
        try {
            if (!/^[a-zA-Z0-9_]+$/.test(payload.username)) {
                throw new BadRequestException(`Username Must Contain Only Letters, Numbers, and Underscores`);
            }

            if (payload.username.length < 3) {
                throw new BadRequestException(`Username Must Be At Least 3 Characters Long`);
            }

            const validationModel: UserModel = await this.prismaService[this.modelName].findUnique({
                where: { username: payload.username },
            });

            if (validationModel) {
                throw new BadRequestException(`Username Already Exists`);
            }

            if (payload.password.length < 8) {
                throw new BadRequestException(`Password Must Be At Least 8 Characters Long`);
            }

            payload.password = await encryption.hash(payload.password);
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Add: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }

        return super.add(payload);
    }

    @Override
    public async change(id: number, payload: UserUpdateDTO): Promise<UserModel> {
        try {
            if (!/^[a-zA-Z0-9_]+$/.test(payload.username)) {
                throw new BadRequestException(`Username Must Contain Only Letters, Numbers, and Underscores`);
            }

            if (payload.username.length < 3) {
                throw new BadRequestException(`Username Must Be At Least 3 Characters Long`);
            }

            const validationModel: UserModel = await this.prismaService[this.modelName].findUnique({
                where: { username: payload.username },
            });

            if (validationModel) {
                throw new BadRequestException(`Username Already Exists`);
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                this.loggerService.error(`Change: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Change: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }

        return super.change(id, payload);
    }

    public async comparePassword(username: string, password: string): Promise<boolean> {
        try {
            const model: { password: string } = await this.prismaService[this.modelName].findUnique({
                where: { username },
                select: { password: true },
            });

            if (!model) {
                throw new NotFoundException(`Username ${username} Not Found`);
            }

            return await encryption.compare(password, model.password);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Compare Password: Username ${username} Not Found`);
                throw new NotFoundException(`Id ${username} Not Found`);
            }

            this.loggerService.error(`Compare Password: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async changePassword(id: number, payload: UserUpdatePasswordDTO): Promise<UserModel> {
        try {
            if (payload.newPassword.length < 8) {
                throw new BadRequestException(`New Password Must Be At Least 8 Characters Long`);
            }

            const validationModel: { password: string } = await this.prismaService[this.modelName].findUnique({
                where: { id },
                select: { password: true },
            });

            if (!validationModel) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (!(await encryption.compare(payload.oldPassword, validationModel.password))) {
                throw new BadRequestException(`Old Password Does Not Match With Current Password`);
            }

            if (payload.newPassword !== payload.confirmPassword) {
                throw new BadRequestException(`New Password Does Not Match Confirmation Password`);
            }

            const model: UserModel = await this.prismaService[this.modelName].update({
                where: { id },
                data: { password: payload.newPassword },
            });

            this.loggerService.log(`Change Password: ${JSON.stringify(model)}`);
            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Password: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                this.loggerService.error(`Change Password: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Change Password: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async changeActive(id: number, payload: UserUpdateActiveDTO): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService[this.modelName].update({
                where: { id },
                data: { active: payload.active },
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Change Active: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Active: Id ${id} Not Found`);
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Change Active: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Change Active: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
