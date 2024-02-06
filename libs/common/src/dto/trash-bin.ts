import { IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Data transfer object for creating a trash bin.
 */
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

/**
 * Data transfer object for updating a trash bin.
 */
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
