import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../provider/prisma.service";
import { UserModel } from "./user.model";
import { UserCreateDTOInterface } from "./user.interface";

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

    async add(payload: UserCreateDTOInterface): Promise<UserModel> {
        return await this.prisma.user.create({ data: payload });
    }

    async change(id: number, payload: UserCreateDTOInterface): Promise<UserModel> {
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
