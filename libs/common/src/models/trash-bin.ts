import { Prisma } from "@prisma/client";
import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsOptional()
    @IsArray()
    subTrashBin?: Prisma.SubTrashBinCreateNestedManyWithoutTrashBinInput | undefined;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
