import { Get, Post, Put, Delete, Body, Param, Controller, ParseIntPipe } from "@nestjs/common";

import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public async find(): Promise<UserModel[]> {
        return await this.userService.find();
    }

    @Get(":id")
    public async findId(@Param("id", ParseIntPipe) id: number): Promise<UserModel> {
        return await this.userService.findId(id);
    }

    @Post()
    public async add(@Body() payload: UserCreateDTO): Promise<UserModel> {
        return await this.userService.add(payload);
    }

    @Put(":id")
    public async change(@Param("id", ParseIntPipe) id: number, @Body() payload: UserUpdateDTO): Promise<UserModel> {
        return await this.userService.change(id, payload);
    }

    @Delete(":id")
    public async remove(@Param("id", ParseIntPipe) id: number): Promise<UserModel> {
        return await this.userService.remove(id);
    }
}
