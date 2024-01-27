import { Prisma } from "@prisma/client";

export class UserModel implements Prisma.UserCreateInput {
    id: number;
    username: string;
    password: string;
}
