import { Get, Post, Put, Delete, Body, Param, Controller, ParseIntPipe } from "@nestjs/common";
import { UserModel } from "./user.model";
import { UserService } from "./user.service";
import { UserDTOInterface } from "./user.interface";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async find(): Promise<UserModel[]> {
        return await this.userService.find();
    }

    @Get(":id")
    async findId(@Param("id", ParseIntPipe) id: number): Promise<UserModel> {
        return await this.userService.findId(id);
    }

    @Post()
    async add(@Body() payload: UserDTOInterface): Promise<UserModel> {
        return await this.userService.add(payload);
    }

    @Put(":id")
    async change(@Param("id", ParseIntPipe) id: number, @Body() payload: UserDTOInterface): Promise<UserModel> {
        return await this.userService.change(id, payload);
    }

    @Delete(":id")
    async remove(@Param("id", ParseIntPipe) id: number): Promise<UserModel> {
        return await this.userService.remove(id);
    }
}
