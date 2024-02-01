import { Get, Post, Put, Delete, Body, Param, Controller, ParseIntPipe, UseInterceptors } from "@nestjs/common";

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
        const response: ResponseFormatInterface<UserModel[]> = formatResponse<UserModel[]>(
            true,
            200,
            "Found",
            await this.userService.find()
        );

        this.loggerService.log(`Find: ${JSON.stringify(response)}`);

        return response;
    }

    @Get(":id")
    public async findId(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<UserModel>> {
        const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
            true,
            200,
            "Found",
            await this.userService.findId(id)
        );

        this.loggerService.log(`FindId: ${JSON.stringify(response)}`);

        return response;
    }

    @Post()
    public async add(@Body() payload: UserCreateDTO): Promise<ResponseFormatInterface<UserModel>> {
        const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
            true,
            201,
            "Added",
            await this.userService.add(payload)
        );

        this.loggerService.log(`Add: ${JSON.stringify(response)}`);

        return response;
    }

    @Put(":id")
    public async change(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: UserUpdateDTO
    ): Promise<ResponseFormatInterface<UserModel>> {
        const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
            true,
            200,
            "Changed",
            await this.userService.change(id, payload)
        );

        this.loggerService.log(`Change: ${JSON.stringify(response)}`);

        return response;
    }

    @Delete(":id")
    public async remove(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<UserModel>> {
        const response: ResponseFormatInterface<UserModel> = formatResponse<UserModel>(
            true,
            200,
            "Removed",
            await this.userService.remove(id)
        );

        this.loggerService.log(`Remove: ${JSON.stringify(response)}`);

        return response;
    }
}
