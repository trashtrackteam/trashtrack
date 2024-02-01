import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { LoggerService } from "../../provider/logger.service";
import { PrismaService } from "../../provider/prisma.service";

import { UserModel } from "./user.model";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

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

    /**
     * Adds a new user to the database.
     * @param payload The data for the new user.
     * @returns A promise that resolves to a UserModel object representing the newly created user.
     * @throws InternalServerErrorException if there is an error adding the user.
     */
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
