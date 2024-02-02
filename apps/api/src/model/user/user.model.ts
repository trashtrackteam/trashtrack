import { $Enums, Prisma } from "@prisma/client";
import { Role } from "@trashtrack/common";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsOptional()
    @IsString()
    description?: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
