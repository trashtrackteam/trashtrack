import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../provider/prisma.service";
import { UserModel } from "./user.model";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    public async find(): Promise<UserModel[]> {
        return await this.prismaService.user.findMany();
    }

    public async findId(id: number): Promise<UserModel> {
        return await this.prismaService.user.findUnique({
            where: { id },
        });
    }

    public async add(payload: UserCreateDTO): Promise<UserModel> {
        return await this.prismaService.user.create({ data: payload });
    }

    public async change(id: number, payload: UserUpdateDTO): Promise<UserModel> {
        return await this.prismaService.user.update({
            where: { id },
            data: payload,
        });
    }

    public async remove(id: number): Promise<UserModel> {
        return await this.prismaService.user.delete({
            where: { id },
        });
    }
}
