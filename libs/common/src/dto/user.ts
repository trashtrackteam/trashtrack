import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "../enum/role";

export class UserCreateDTO {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    phoneNumber: string;

    @IsEnum(Role)
    role: Role;

    @IsBoolean()
    active: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}

/**
 * Data transfer object for updating a user.
 */
export class UserUpdateDTO {
    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    phoneNumber: string;

    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsString()
    description?: string;
}

/**
 * Data transfer object for updating a user's password.
 */
export class UserUpdatePasswordDTO {
    @IsString()
    oldPassword: string;

    @IsString()
    newPassword: string;

    @IsString()
    confirmPassword: string;
}

/**
 * Data transfer object for updating a user's active status.
 */
export class UserUpdateActiveDTO {
    @IsBoolean()
    active: boolean;
}
