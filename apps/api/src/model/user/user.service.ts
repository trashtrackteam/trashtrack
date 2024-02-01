import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../provider/prisma.service";
import { UserModel } from "./user.model";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async find(): Promise<UserModel[]> {
        return await this.prisma.user.findMany();
    }

    async findId(id: number): Promise<UserModel> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async add(payload: UserCreateDTO): Promise<UserModel> {
        return await this.prisma.user.create({ data: payload });
    }

    async change(id: number, payload: UserUpdateDTO): Promise<UserModel> {
        return await this.prisma.user.update({
            where: { id },
            data: payload,
        });
    }

    async remove(id: number): Promise<UserModel> {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
}
