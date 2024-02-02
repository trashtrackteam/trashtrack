import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as utils from "@trashtrack/utils";

import { LoggerService } from "../../provider/logger.service";
import { PrismaService } from "../../provider/prisma.service";

import { UserModel } from "./user.model";
import { UserCreateDTO, UserUpdateActiveDTO, UserUpdateDTO, UserUpdatePasswordDTO } from "./user.dto";

/**
 * Service for handling user-related operations.
 */
@Injectable()
export class UserService {
    private readonly loggerService: LoggerService = new LoggerService(UserService.name);

    /**
     * Constructs a new instance of the UserService class.
     * @param prismaService The PrismaService instance used for database operations.
     */
    constructor(private readonly prismaService: PrismaService) {}

    /**
     * Retrieves all users from the database.
     * @returns A promise that resolves to an array of UserModel objects representing the users.
     * @throws InternalServerErrorException if there is an error retrieving the users.
     */
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

    /**
     * Retrieves a user by their ID.
     * @param id The ID of the user to retrieve.
     * @returns A promise that resolves to a UserModel object representing the user.
     * @throws NotFoundException if the user with the specified ID is not found.
     * @throws InternalServerErrorException if there is an error retrieving the user.
     */
    public async findId(id: number): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService.user.findUnique({ where: { id } });

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

    /**
     * Retrieves a user by their username.
     * @param username The username of the user to retrieve.
     * @returns A promise that resolves to a UserModel object representing the user.
     * @throws NotFoundException if the user with the specified username is not found.
     * @throws InternalServerErrorException if there is an error retrieving the user.
     */
    public async findUsername(username: string) {
        try {
            const model: UserModel = await this.prismaService.user.findUnique({ where: { username } });

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

    /**
     * Adds a new user to the database.
     * @param payload The data for the new user.
     * @returns A promise that resolves to a UserModel object representing the newly created user.
     * @throws InternalServerErrorException if there is an error adding the user.
     */
    public async add(payload: UserCreateDTO): Promise<UserModel> {
        try {
            if (!/^[a-zA-Z0-9_]+$/.test(payload.username)) {
                throw new BadRequestException(`Username Must Contain Only Letters, Numbers, and Underscores`);
            }

            if (payload.username.length < 3) {
                throw new BadRequestException(`Username Must Be At Least 3 Characters Long`);
            }

            const validationModel: UserModel = await this.prismaService.user.findUnique({
                where: { username: payload.username },
            });

            if (validationModel) {
                throw new BadRequestException(`Username Already Exists`);
            }

            if (payload.password.length < 8) {
                throw new BadRequestException(`Password Must Be At Least 8 Characters Long`);
            }

            payload.password = await utils.hash(payload.password);

            const model: UserModel = await this.prismaService.user.create({ data: payload });

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

    /**
     * Updates a user in the database.
     * @param id The ID of the user to update.
     * @param payload The updated data for the user.
     * @returns A promise that resolves to a UserModel object representing the updated user.
     * @throws NotFoundException if the user with the specified ID is not found.
     * @throws InternalServerErrorException if there is an error updating the user.
     */
    public async change(id: number, payload: UserUpdateDTO): Promise<UserModel> {
        try {
            if (!/^[a-zA-Z0-9_]+$/.test(payload.username)) {
                throw new BadRequestException(`Username Must Contain Only Letters, Numbers, and Underscores`);
            }

            if (payload.username.length < 3) {
                throw new BadRequestException(`Username Must Be At Least 3 Characters Long`);
            }

            const validationModel: UserModel = await this.prismaService.user.findUnique({
                where: { username: payload.username },
            });

            if (validationModel) {
                throw new BadRequestException(`Username Already Exists`);
            }

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

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                this.loggerService.error(`Change: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Change: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    /**
     * Updates a user's password in the database.
     * @param id The ID of the user to update.
     * @param payload The updated password data for the user.
     * @returns A promise that resolves to a UserModel object representing the updated user.
     * @throws NotFoundException if the user with the specified ID is not found.
     * @throws BadRequestException if the old password does not match the current password or if the new password does not match the confirmation password.
     * @throws InternalServerErrorException if there is an error updating the user's password.
     */
    public async changePassword(id: number, payload: UserUpdatePasswordDTO): Promise<UserModel> {
        try {
            if (payload.newPassword.length < 8) {
                throw new BadRequestException(`New Password Must Be At Least 8 Characters Long`);
            }

            const validationModel: { password: string } = await this.prismaService.user.findUnique({
                where: { id },
                select: { password: true },
            });

            if (!validationModel) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (!(await utils.compare(payload.oldPassword, validationModel.password))) {
                throw new BadRequestException(`Old Password Does Not Match With Current Password`);
            }

            if (payload.newPassword !== payload.confirmPassword) {
                throw new BadRequestException(`New Password Does Not Match Confirmation Password`);
            }

            const model: UserModel = await this.prismaService.user.update({
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

    /**
     * Updates a user's active status in the database.
     * @param id The ID of the user to update.
     * @param payload The updated active status data for the user.
     * @returns A promise that resolves to a UserModel object representing the updated user.
     * @throws NotFoundException if the user with the specified ID is not found.
     * @throws InternalServerErrorException if there is an error updating the user's active status.
     */
    public async changeActive(id: number, payload: UserUpdateActiveDTO): Promise<UserModel> {
        try {
            const model: UserModel = await this.prismaService.user.update({
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

    /**
     * Removes a user from the database.
     * @param id The ID of the user to remove.
     * @returns A promise that resolves to a UserModel object representing the removed user.
     * @throws NotFoundException if the user with the specified ID is not found.
     * @throws InternalServerErrorException if there is an error removing the user.
     */
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
