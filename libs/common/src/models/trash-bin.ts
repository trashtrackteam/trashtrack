import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Represents a trash bin in the system.
 */
export class TrashBinModel implements Prisma.TrashBinCreateInput {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    openCount: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
