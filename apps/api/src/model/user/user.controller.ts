import {
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Controller,
    ParseIntPipe,
    UseInterceptors,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
    ResponseFormatInterceptor,
    ResponseFormatInterface,
    formatResponse,
} from "../../interceptor/response-format.interceptor";

import { LoggerService } from "../../provider/logger.service";

import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { UserCreateDTO, UserUpdateActiveDTO, UserUpdateDTO, UserUpdatePasswordDTO } from "./user.dto";

/**
 * Controller for handling user-related operations.
 */
@Controller("user")
@UseInterceptors(ResponseFormatInterceptor)
export class UserController {
    private readonly loggerService: LoggerService = new LoggerService(UserController.name);

    constructor(private readonly userService: UserService) {}

    /**
     * Get all users.
     * @returns A promise that resolves to an array of UserModel.
     */
    @Get()
    public async find(): Promise<ResponseFormatInterface<UserModel[]>> {
        try {
            const response: ResponseFormatInterface<UserModel[]> = formatResponse<UserModel[]>(
                true,
                200,
                "Found",
                await this.userService.find()
            );

            this.loggerService.log(`Find: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    /**
     * Get a user by ID.
     * @param id - The ID of the user.
     * @returns A promise that resolves to a UserModel.
     */
    @Get(":id")
    public async findId(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<UserModel>> {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                200,
                "Id Found",
                await this.userService.findId(id)
            );

            this.loggerService.log(`FindId: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`FindId: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`FindId: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    /**
     * Add a new user.
     * @param payload - The user data to be added.
     * @returns A promise that resolves to a UserModel.
     */
    @Post()
    public async add(@Body() payload: UserCreateDTO): Promise<ResponseFormatInterface<UserModel>> {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                201,
                "Added",
                await this.userService.add(payload)
            );

            this.loggerService.log(`Add: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Add: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    /**
     * Update a user by ID.
     * @param id - The ID of the user to be updated.
     * @param payload - The updated user data.
     * @returns A promise that resolves to a UserModel.
     */
    @Put(":id")
    public async change(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: UserUpdateDTO
    ): Promise<ResponseFormatInterface<UserModel>> {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                200,
                "Changed",
                await this.userService.change(id, payload)
            );

            this.loggerService.log(`Change: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    /**
     * Update a user's password by ID.
     * @param id - The ID of the user to be updated.
     * @param payload - The updated user password data.
     * @returns A promise that resolves to a UserModel.
     */
    @Put(":id/password")
    public async changePassword(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: UserUpdatePasswordDTO
    ): Promise<ResponseFormatInterface<UserModel>> {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                200,
                "Password Changed",
                await this.userService.changePassword(id, payload)
            );

            this.loggerService.log(`Change Password: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Change Password: ${error.message}`);
                return formatResponse<null>(false, 400, error.message, null);
            }

            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Password: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change Password: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    /**
     * Update a user's active status by ID.
     * @param id - The ID of the user to be updated.
     * @param payload - The updated user active status data.
     * @returns A promise that resolves to a UserModel.
     */
    @Put(":id/active")
    public async changeActive(@Param("id", ParseIntPipe) id: number, @Body() payload: UserUpdateActiveDTO) {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                200,
                "Active Changed",
                await this.userService.changeActive(id, payload)
            );

            this.loggerService.log(`Change Active: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change Active: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change Active: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    /**
     * Delete a user by ID.
     * @param id - The ID of the user to be deleted.
     * @returns A promise that resolves to a UserModel.
     */
    @Delete(":id")
    public async remove(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<UserModel>> {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                200,
                "Removed",
                await this.userService.remove(id)
            );

            this.loggerService.log(`Remove: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Remove: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Remove: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
