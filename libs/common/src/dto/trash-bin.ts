import { IsNumber, IsOptional, IsString } from "class-validator";

export class TrashBinCreateDTO {
    @IsString()
    name: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsString()
    description?: string;
}

export class TrashBinUpdateDTO {
    @IsString()
    name: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsString()
    description?: string;
}
