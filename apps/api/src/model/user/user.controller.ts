import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseInterceptors,
} from "@nestjs/common";
import {
    UserModel,
    UserCreateDTO,
    UserUpdateDTO,
    ResponseFormatInterface,
    UserUpdateActiveDTO,
    UserUpdatePasswordDTO,
} from "@trashtrack/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { ResponseFormatInterceptor, formatResponse } from "../../interceptor/response-format.interceptor";

import { BaseController } from "../global/base.controller";

import { UserService } from "./user.service";

interface UserControllerInterface {
    findUsername(username: string): Promise<ResponseFormatInterface<UserModel>>;
    changePassword(id: number, payload: UserUpdatePasswordDTO): Promise<ResponseFormatInterface<UserModel>>;
    changeActive(id: number, payload: UserUpdateActiveDTO): Promise<ResponseFormatInterface<UserModel>>;
}

@Controller("user")
@UseInterceptors(ResponseFormatInterceptor)
export class UserController
    extends BaseController<UserModel, UserCreateDTO, UserUpdateDTO, UserService>
    implements UserControllerInterface
{
    constructor(modelService: UserService) {
        super(UserController.name, modelService);
    }

    @Get("username/:username")
    public async findUsername(@Param("username") username: string): Promise<ResponseFormatInterface<UserModel>> {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                200,
                "Username Found",
                await this.modelService.findUsername(username)
            );

            this.loggerService.log(`Find Username: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Username: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find Username: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Post("compare-password/:username")
    public async comparePassword(
        @Param("username") username: string,
        @Body() payload: { password: string }
    ): Promise<ResponseFormatInterface<boolean>> {
        try {
            this.loggerService.log(`Username: ${username}`);
            this.loggerService.log(`Payload: ${JSON.stringify(payload)}`);

            const isPasswordMatched: boolean = await this.modelService.comparePassword(username, payload.password);

            const response: ResponseFormatInterface<boolean> = formatResponse<boolean>(
                true,
                200,
                "Password Compared",
                isPasswordMatched ? true : false
            );

            this.loggerService.log(`Compare Password: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Compare Password: ${error.message}`);
                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Compare Password: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

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
                await this.modelService.changePassword(id, payload)
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

    @Put(":id/active")
    public async changeActive(@Param("id", ParseIntPipe) id: number, @Body() payload: UserUpdateActiveDTO) {
        try {
            const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
                true,
                200,
                "Active Changed",
                await this.modelService.changeActive(id, payload)
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
}
