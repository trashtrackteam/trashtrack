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
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

@Controller("user")
@UseInterceptors(ResponseFormatInterceptor)
export class UserController {
    private readonly loggerService: LoggerService = new LoggerService(UserController.name);

    constructor(private readonly userService: UserService) {}

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
