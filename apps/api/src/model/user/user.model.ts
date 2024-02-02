import { $Enums, Prisma } from "@prisma/client";
import { Role } from "../../common/enum/role.enum";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";

/**
 * Represents a user in the system.
 */
export class UserModel implements Prisma.UserCreateInput {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    phoneNumber: string;

    @IsEnum(Role)
    role: $Enums.Role;

    @IsBoolean()
    active: boolean;

    @IsString()
    description?: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
