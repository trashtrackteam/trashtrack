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

export class UserUpdatePasswordDTO {
    @IsString()
    oldPassword: string;

    @IsString()
    newPassword: string;

    @IsString()
    confirmPassword: string;
}

export class UserUpdateActiveDTO {
    @IsBoolean()
    active: boolean;
}
