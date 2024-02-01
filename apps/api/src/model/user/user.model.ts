import { Prisma } from "@prisma/client";

/**
 * Represents a user in the system.
 */
export class UserModel implements Prisma.UserCreateInput {
    id: number;
    username: string;
    password: string;
}
