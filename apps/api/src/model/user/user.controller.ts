import { Get, Post, Put, Delete, Body, Param, Controller, ParseIntPipe } from "@nestjs/common";

import { LoggerService } from "../../provider/logger.service";

import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly loggerService: LoggerService, private readonly userService: UserService) {
        this.loggerService.setContext(UserController.name);
    }

    @Get()
    public async find(): Promise<UserModel[]> {
        const models: UserModel[] = await this.userService.find();

        this.loggerService.log(`Find: ${JSON.stringify(models)}`);

        return models;
    }

    @Get(":id")
    public async findId(@Param("id", ParseIntPipe) id: number): Promise<UserModel> {
        const model: UserModel = await this.userService.findId(id);

        this.loggerService.log(`FindId: ${JSON.stringify(model)}`);

        return model;
    }

    @Post()
    public async add(@Body() payload: UserCreateDTO): Promise<UserModel> {
        const model: UserModel = await this.userService.add(payload);

        this.loggerService.log(`Add: ${JSON.stringify(model)}`);

        return model;
    }

    @Put(":id")
    public async change(@Param("id", ParseIntPipe) id: number, @Body() payload: UserUpdateDTO): Promise<UserModel> {
        const model: UserModel = await this.userService.change(id, payload);

        this.loggerService.log(`Change: ${JSON.stringify(model)}`);

        return model;
    }

    @Delete(":id")
    public async remove(@Param("id", ParseIntPipe) id: number): Promise<UserModel> {
        const model: UserModel = await this.userService.remove(id);

        this.loggerService.log(`Remove: ${JSON.stringify(model)}`);

        return model;
    }
}
